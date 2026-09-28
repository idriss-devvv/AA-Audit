import type { PayslipData } from "@/types/payslip";
import type { AnomalyRule, RuleFinding } from "../types";
import { findConventionGrid, type ConventionGrid, type GridLevel } from "../referentiels/grilles-conventionnelles";
import { LEGAL_MONTHLY_HOURS, LEGAL_SOURCES, smicHourlyFor } from "../referentiels/legal";
import { tolerancesFor } from "../tolerances";

const EURO = (value: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);


function periodStart(payslip: PayslipData): string | null {
  return /^\d{4}-\d{2}/.test(payslip.period) ? `${payslip.period.slice(0, 7)}-01` : null;
}

/** Heures de la ligne « Salaire de base », à défaut temps plein légal. */
function monthlyHours(payslip: PayslipData): number {
  const hours = payslip.baseHours ?? null;
  return hours && hours > 0 && hours <= 250 ? hours : LEGAL_MONTHLY_HOURS;
}

/** Minimum mensuel exigé par le niveau, proratisé selon les heures de la fiche. */
function monthlyMinimum(level: GridLevel, grid: ConventionGrid, hours: number): number {
  const prorata = Math.min(hours, LEGAL_MONTHLY_HOURS) / LEGAL_MONTHLY_HOURS;
  switch (level.unit) {
    case "horaire":
      return level.amount * hours;
    case "mensuel":
      return level.amount * prorata;
    case "annuel":
      return (level.amount / grid.annualDivisor) * prorata;
  }
}

export const minimumConventionnelRules: AnomalyRule[] = [
  {
    id: "baremes.minimum-conventionnel",
    category: "baremes",
    description:
      "Compare la rémunération au salaire minimum de la grille conventionnelle (niveau lu sur la fiche) et au SMIC",
    check: (payslip, context): RuleFinding | null => {
      // Tolérance d'arrondi (les grilles sont souvent exprimées à l'euro près), réglable.
      const TOLERANCE_EUROS = tolerancesFor(context).minimumEuros;
      const start = periodStart(payslip);
      if (!start || payslip.grossPay <= 0) return null;
      const hours = monthlyHours(payslip);
      const base = payslip.baseSalary ?? null;

      // 1. Grille conventionnelle, si la convention et le niveau sont identifiés.
      const grid = findConventionGrid(payslip.collectiveAgreementIdcc);
      let conventional: { amount: number; level: GridLevel } | null = null;
      if (grid && payslip.classification && start >= grid.effectiveFrom) {
        const code = grid.levelCode(payslip.classification);
        const level = code ? grid.levels.find((l) => l.code === code) : undefined;
        if (level) conventional = { amount: monthlyMinimum(level, grid, hours), level };
      }

      // 2. SMIC, toujours applicable (il prime quand il est plus élevé que la grille).
      const smicRate = smicHourlyFor(payslip.period);
      const smic = smicRate ? smicRate * hours : null;

      const floors = [conventional?.amount ?? 0, smic ?? 0];
      const required = Math.max(...floors);
      if (required <= 0) return null;
      const fromSmic = smic !== null && smic >= (conventional?.amount ?? 0);
      const reference = fromSmic
        ? `SMIC (${smicRate!.toLocaleString("fr-FR")} €/h × ${hours.toLocaleString("fr-FR")} h = ${EURO(smic!)} — ${LEGAL_SOURCES.smic})`
        : `minimum conventionnel du niveau ${conventional!.level.code} (${EURO(conventional!.amount)} pour ${hours.toLocaleString("fr-FR")} h — ${grid!.label})`;

      const isAnnual = !fromSmic && conventional?.level.unit === "annuel";

      if (payslip.grossPay + TOLERANCE_EUROS < required) {
        return {
          // Un minimum annuel s'apprécie sur l'année (13e mois, primes) : écart mensuel indicatif.
          severity: isAnnual ? "info" : "critical",
          message: `Salaire brut (${EURO(payslip.grossPay)}) inférieur au ${reference}.${
            isAnnual ? " Ce minimum s'apprécie sur l'année (primes et 13e mois compris) — à vérifier sur la rémunération annuelle." : ""
          }`,
        };
      }
      if (base !== null && base + TOLERANCE_EUROS < required) {
        return {
          severity: "info",
          message: `Salaire de base (${EURO(base)}) inférieur au ${reference}, atteint seulement grâce aux autres éléments du brut — vérifier que ces éléments entrent bien dans l'assiette de comparaison.`,
        };
      }
      return null;
    },
  },
];
