import type { PayslipData } from "@/types/payslip";
import type { AnomalyRule } from "../types";
import { tolerancesFor } from "../tolerances";

/**
 * Écart N / N-1 (cahier des charges V1) : comparaison de la fiche avec la
 * fiche précédente du même salarié. Une variation n'est pas une erreur en soi
 * (heures supplémentaires, absence, prime, changement de poste) : elle est
 * signalée pour vérification, avec les éléments qui peuvent l'expliquer.
 */

const EURO = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
const PCT = (value: number) => `${value.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} %`;

function monthLabel(period: string): string {
  const match = period.match(/^(\d{4})-(\d{2})/);
  if (!match) return period;
  return new Date(Number(match[1]), Number(match[2]) - 1, 1).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

function variation(current: number, previous: number): number {
  return ((current - previous) / previous) * 100;
}

/** Éléments du bulletin qui expliquent souvent une variation légitime. */
function explanations(current: PayslipData, previous: PayslipData): string[] {
  const out: string[] = [];
  const hours = current.baseHours ?? null;
  const previousHours = previous.baseHours ?? null;
  if (hours !== null && previousHours !== null && Math.abs(hours - previousHours) > 0.5) {
    out.push(`heures de base ${previousHours.toLocaleString("fr-FR")} h → ${hours.toLocaleString("fr-FR")} h`);
  }
  const overtime = (current.overtime ?? []).length;
  if (overtime > 0) out.push("heures supplémentaires ce mois-ci");
  if (current.mentionsArretOuIjss) out.push("arrêt de travail mentionné");
  if ((current.classification ?? null) !== (previous.classification ?? null) && current.classification && previous.classification) {
    out.push("classification modifiée");
  }
  return out;
}

function previousOf(context: Parameters<AnomalyRule["check"]>[1]): PayslipData | null {
  const previous = context.previousPayslip ?? null;
  return previous && previous.period && previous.grossPay > 0 ? previous : null;
}

export const ecartPeriodeRules: AnomalyRule[] = [
  {
    id: "ecart-periode.brut",
    category: "ecart-periode",
    description: "Variation du salaire brut par rapport à la fiche précédente du même salarié (seuil réglable)",
    check: (payslip, context) => {
      const previous = previousOf(context);
      if (!previous || payslip.grossPay <= 0) return null;
      const threshold = tolerancesFor(context).periodVariationPercent;
      const delta = variation(payslip.grossPay, previous.grossPay);
      if (Math.abs(delta) <= threshold) return null;
      const why = explanations(payslip, previous);
      return {
        severity: why.length > 0 ? "info" : "warning",
        message: `Salaire brut ${delta > 0 ? "en hausse" : "en baisse"} de ${PCT(Math.abs(delta))} par rapport à ${monthLabel(previous.period)} (${EURO(previous.grossPay)} → ${EURO(payslip.grossPay)}, seuil ${PCT(threshold)}).${
          why.length > 0 ? ` Éléments pouvant l'expliquer : ${why.join(", ")}.` : " Aucun élément du bulletin ne l'explique : à vérifier."
        }`,
      };
    },
  },
  {
    id: "ecart-periode.net",
    category: "ecart-periode",
    description: "Variation du net à payer par rapport à la fiche précédente, sans variation comparable du brut",
    check: (payslip, context) => {
      const previous = previousOf(context);
      if (!previous || previous.netPay <= 0 || payslip.netPay <= 0 || payslip.grossPay <= 0) return null;
      const threshold = tolerancesFor(context).periodVariationPercent;
      const netDelta = variation(payslip.netPay, previous.netPay);
      const grossDelta = variation(payslip.grossPay, previous.grossPay);
      // Le brut explique le net : déjà couvert par la règle sur le brut.
      if (Math.abs(netDelta) <= threshold || Math.abs(netDelta - grossDelta) <= threshold / 2) return null;
      return {
        severity: "warning",
        message: `Net à payer ${netDelta > 0 ? "en hausse" : "en baisse"} de ${PCT(Math.abs(netDelta))} par rapport à ${monthLabel(previous.period)} (${EURO(previous.netPay)} → ${EURO(payslip.netPay)}) alors que le brut varie de ${PCT(grossDelta)} : vérifier les cotisations, le prélèvement à la source, les acomptes et les éléments non soumis.`,
      };
    },
  },
  {
    id: "ecart-periode.salaire-base",
    category: "ecart-periode",
    description: "Baisse du salaire de base à heures égales par rapport à la fiche précédente",
    check: (payslip, context) => {
      const previous = previousOf(context);
      const base = payslip.baseSalary ?? null;
      const previousBase = previous?.baseSalary ?? null;
      if (!previous || base === null || previousBase === null || previousBase <= 0) return null;
      const hours = payslip.baseHours ?? null;
      const previousHours = previous.baseHours ?? null;
      if (hours !== null && previousHours !== null && Math.abs(hours - previousHours) > 0.5) return null;
      if (base >= previousBase - tolerancesFor(context).amountEuros) return null;
      return {
        severity: "warning",
        message: `Salaire de base en baisse à horaire égal : ${EURO(previousBase)} en ${monthLabel(previous.period)} → ${EURO(base)}. Une baisse du salaire de base suppose un avenant au contrat : à vérifier.`,
      };
    },
  },
  {
    id: "ecart-periode.taux-cotisation",
    category: "ecart-periode",
    description: "Taux d'une même cotisation modifié en cours d'année par rapport à la fiche précédente",
    check: (payslip, context) => {
      const previous = previousOf(context);
      if (!previous) return null;
      // Les taux changent légitimement au 1er janvier : comparaison dans la même année seulement.
      if (payslip.period.slice(0, 4) !== previous.period.slice(0, 4)) return null;
      const tolerance = tolerancesFor(context).ratePoints;
      const before = new Map((previous.contributionLines ?? []).map((l) => [l.label.toLowerCase().trim(), l.ratePercent]));
      const changes: string[] = [];
      for (const line of payslip.contributionLines ?? []) {
        const rate = before.get(line.label.toLowerCase().trim());
        if (rate === undefined || Math.abs(rate - line.ratePercent) <= tolerance) continue;
        changes.push(`« ${line.label} » ${PCT(rate)} → ${PCT(line.ratePercent)}`);
      }
      if (changes.length === 0) return null;
      return {
        severity: "info",
        message: `Taux modifié(s) depuis ${monthLabel(previous.period)} : ${changes.join(" ; ")}. Un changement en cours d'année est possible (taux AT/MP notifié, dépassement de seuil, changement de contrat) mais doit être justifié.`,
      };
    },
  },
];
