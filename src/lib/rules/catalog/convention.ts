import type { PayslipData } from "@/types/payslip";
import type { AnomalyRule, ConventionRules, RuleContext } from "../types";
import { tolerancesFor } from "../tolerances";
import { findConventionGrid, type GridLevel } from "../referentiels/grilles-conventionnelles";
import { LEGAL_MONTHLY_HOURS } from "../referentiels/legal";
import { seniorityMonths } from "./maladie";

/**
 * Règles des conventions collectives intégrées (tables cc_*, relevées sur
 * Légifrance) : prime d'ancienneté, majorations conventionnelles (heures
 * supplémentaires, nuit, dimanche, jours fériés) et 13e mois. Chaque message
 * cite l'article source enregistré avec la règle.
 */

const EURO = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
const PCT = (value: number) => `${value.toLocaleString("fr-FR", { maximumFractionDigits: 2 })} %`;
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

function hoursOf(payslip: PayslipData): number {
  const hours = payslip.baseHours ?? null;
  return hours && hours > 0 && hours <= 250 ? hours : LEGAL_MONTHLY_HOURS;
}

/** Catégories probables du salarié (cadre / non-cadre), pour filtrer les règles ciblées. */
function categoriesOf(payslip: PayslipData): string[] {
  const text = `${payslip.classification ?? ""} ${payslip.position ?? ""}`;
  if (/non[\s-]?cadre/i.test(text)) return ["ouvrier", "employe", "technicien", "agent_maitrise"];
  if (/\bcadres?\b|ing[ée]nieur/i.test(text)) return ["cadre"];
  if (/ma[iî]trise|\bam\b/i.test(text)) return ["agent_maitrise"];
  if (/technicien/i.test(text)) return ["technicien"];
  if (/ouvrier/i.test(text)) return ["ouvrier"];
  return [];
}

function categoryMatches(rowCategories: string[] | null, employee: string[]): boolean {
  if (!rowCategories || rowCategories.length === 0) return true;
  // Catégorie inconnue sur la fiche : règle ciblée non appliquée (pas de faux positif).
  return employee.some((c) => rowCategories.includes(c));
}

function sourceOf(note: string | null): string {
  if (!note) return "convention collective";
  const url = note.match(/https?:\/\/\S+/)?.[0];
  const article = note.split(" — ")[0];
  return url ? `${article}, ${url}` : article;
}

function levelOf(payslip: PayslipData): { code: string; level: GridLevel; monthly: number } | null {
  const grid = findConventionGrid(payslip.collectiveAgreementIdcc);
  if (!grid || !payslip.classification) return null;
  const code = grid.levelCode(payslip.classification);
  const level = code ? grid.levels.find((l) => l.code === code) : undefined;
  if (!code || !level) return null;
  return { code, level, monthly: monthlyOf(level, grid.annualDivisor, payslip) };
}

function monthlyOf(level: GridLevel, divisor: number, payslip: PayslipData): number {
  const hours = hoursOf(payslip);
  const prorata = Math.min(hours, LEGAL_MONTHLY_HOURS) / LEGAL_MONTHLY_HOURS;
  if (level.unit === "horaire") return level.amount * hours;
  if (level.unit === "mensuel") return level.amount * prorata;
  return (level.amount / divisor) * prorata;
}

function rulesOf(context: RuleContext, payslip: PayslipData): ConventionRules | null {
  const rules = context.conventionRules ?? null;
  if (!rules || !payslip.collectiveAgreementIdcc) return null;
  return String(parseInt(payslip.collectiveAgreementIdcc, 10)) === rules.idcc ? rules : null;
}

export const conventionRules: AnomalyRule[] = [
  {
    id: "conventions.prime-anciennete",
    category: "conventions",
    description: "Prime d'ancienneté conventionnelle : présence et montant selon l'ancienneté (règle de la convention intégrée)",
    check: (payslip, context) => {
      const rules = rulesOf(context, payslip);
      const months = seniorityMonths(payslip);
      if (!rules || months === null || rules.seniority.length === 0) return null;
      const categories = categoriesOf(payslip);
      const level = levelOf(payslip);
      const rows = rules.seniority.filter(
        (r) => categoryMatches(r.categories, categories) && (!r.classification_codes || r.classification_codes.length === 0 || (level && r.classification_codes.includes(level.code)))
      );
      // Règle ciblée par niveau alors que le niveau n'est pas lu : pas de contrôle.
      if (rows.length === 0 || (rules.seniority.some((r) => r.classification_codes?.length) && !level)) return null;
      const eligible = rows.filter((r) => r.seniority_min_months <= months).sort((a, b) => b.seniority_min_months - a.seniority_min_months);
      const tier = eligible[0];
      if (!tier) return null;

      const prorata = Math.min(hoursOf(payslip), LEGAL_MONTHLY_HOURS) / LEGAL_MONTHLY_HOURS;
      let expected: number | null = null;
      let basis = "";
      if (tier.fixed_amount != null) {
        // Montant forfaitaire cumulatif par période (ex. immobilier : 32 € tous les 3 ans).
        const step = rows.filter((r) => r.fixed_amount != null).length === 1 && tier.seniority_min_months > 0 ? Math.floor(months / tier.seniority_min_months) : 1;
        expected = tier.fixed_amount * step * prorata;
        basis = `${EURO(tier.fixed_amount)}${step > 1 ? ` × ${step} périodes` : ""}`;
      } else if (tier.rate_percent != null) {
        if (tier.calculation_base === "minimum_conventionnel") {
          // Base « salaire minimum du niveau I » (commerce non alimentaire) ou minimum du niveau du salarié.
          const grid = findConventionGrid(payslip.collectiveAgreementIdcc);
          const levelOne = /niveau i\b/i.test(tier.seniority_definition ?? "") && grid ? grid.levels.find((l) => /^N?1$|^N1$/.test(l.code)) : null;
          const reference = levelOne && grid ? monthlyOf(levelOne, grid.annualDivisor, payslip) : level?.monthly ?? null;
          if (reference === null) return null;
          expected = (reference * tier.rate_percent) / 100;
          basis = `${PCT(tier.rate_percent)} de ${EURO(reference)} (${levelOne ? "minimum du niveau I" : "minimum conventionnel du niveau"})`;
        } else if (tier.calculation_base === "salaire_base" && payslip.baseSalary) {
          expected = (payslip.baseSalary * tier.rate_percent) / 100;
          basis = `${PCT(tier.rate_percent)} du salaire de base`;
        } else return null;
      }
      if (expected === null || expected < 1) return null;

      const paid = payslip.seniorityBonus ?? null;
      const years = Math.floor(months / 12);
      const t = tolerancesFor(context);
      if (paid === null) {
        return {
          severity: "warning",
          message: `Aucune prime d'ancienneté lue alors que le salarié a ${years} an(s) d'ancienneté : ${rules.name ?? "la convention"} prévoit environ ${EURO(expected)} par mois (${basis} — ${sourceOf(tier.notes)}). À vérifier, sauf si la prime est intégrée au salaire de base avec l'accord du salarié.`,
        };
      }
      if (paid + Math.max(t.relativeMinEuros, expected * (t.relativePercent / 100)) < expected) {
        return {
          severity: "warning",
          message: `Prime d'ancienneté de ${EURO(paid)} inférieure au montant conventionnel d'environ ${EURO(expected)} pour ${years} an(s) d'ancienneté (${basis} — ${sourceOf(tier.notes)}).`,
        };
      }
      return null;
    },
  },
  {
    id: "conventions.heures-sup",
    category: "conventions",
    description: "Majoration des heures supplémentaires au moins égale au taux de la convention collective (sauf accord d'entreprise)",
    check: (payslip, context) => {
      const rules = rulesOf(context, payslip);
      if (!rules) return null;
      const categories = categoriesOf(payslip);
      const rows = rules.payIncreases.filter((r) => r.kind === "heures_supplementaires" && r.rate_percent != null && categoryMatches(r.categories, categories));
      if (rows.length === 0) return null;
      const first = rows.sort((a, b) => (a.hours_from ?? 0) - (b.hours_from ?? 0))[0];
      const low = (payslip.overtime ?? []).filter((l) => l.majorationPercent !== null && l.majorationPercent >= 10 && l.majorationPercent + 0.5 < (first.rate_percent ?? 0));
      if (low.length === 0) return null;
      return {
        severity: "info",
        message: `Heures supplémentaires majorées à ${low.map((l) => PCT(l.majorationPercent!)).join(", ")} alors que ${rules.name ?? "la convention"} prévoit ${PCT(first.rate_percent!)} (${first.label} — ${sourceOf(first.notes)}). Conforme seulement si un accord d'entreprise fixe un taux inférieur (10 % minimum).`,
      };
    },
  },
  {
    id: "conventions.majorations",
    category: "conventions",
    description: "Majorations de nuit, dimanche et jour férié au moins égales aux taux de la convention collective",
    check: (payslip, context) => {
      const rules = rulesOf(context, payslip);
      if (!rules) return null;
      const categories = categoriesOf(payslip);
      const problems: string[] = [];
      for (const line of payslip.premiumLines ?? []) {
        if (line.ratePercent === null) continue;
        const rows = rules.payIncreases.filter((r) => r.kind === line.kind && r.rate_percent != null && categoryMatches(r.categories, categories));
        if (rows.length === 0) continue;
        const minimum = Math.min(...rows.map((r) => r.rate_percent!));
        if (line.ratePercent + 0.5 < minimum) {
          const row = rows.find((r) => r.rate_percent === minimum)!;
          problems.push(`« ${line.label} » à ${PCT(line.ratePercent)} au lieu de ${PCT(minimum)} (${sourceOf(row.notes)})`);
        }
      }
      if (problems.length === 0) return null;
      return {
        severity: "warning",
        message: `Majoration inférieure au taux de ${rules.name ?? "la convention collective"} : ${problems.join(" ; ")}. Vérifier l'existence d'un accord d'entreprise plus spécifique.`,
      };
    },
  },
  {
    id: "conventions.treizieme-mois",
    category: "conventions",
    description: "13e mois ou prime annuelle conventionnelle versé le mois prévu par la convention",
    check: (payslip, context) => {
      const rules = rulesOf(context, payslip);
      const month = payslip.period?.match(/^\d{4}-(\d{2})/)?.[1];
      if (!rules || !month) return null;
      const categories = categoriesOf(payslip);
      const months = seniorityMonths(payslip) ?? 0;
      const due = rules.bonuses.filter(
        (b) => ["treizieme_mois", "prime_annuelle", "prime_fin_annee"].includes(b.kind) && b.payment_months?.includes(Number(month)) && months >= (b.seniority_min_months ?? 0) && categoryMatches(b.categories, categories)
      );
      if (due.length === 0 || (payslip.annualBonus ?? 0) > 0) return null;
      const bonus = due[0];
      return {
        severity: "info",
        message: `${bonus.label} prévu en ${MONTHS[Number(month) - 1]} par ${rules.name ?? "la convention collective"} (${sourceOf(bonus.notes)}), mais aucune ligne de 13e mois ou de prime annuelle lue sur ce bulletin. À vérifier, sauf versement échelonné ou structure de rémunération différente fixée par accord.`,
      };
    },
  },
];
