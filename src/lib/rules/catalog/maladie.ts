import type { PayslipData } from "@/types/payslip";
import type { AnomalyRule, ConventionSickPayRule, RuleContext } from "../types";
import { tolerancesFor } from "../tolerances";
import { regulatoryValue } from "../regulatory";
import { LEGAL_MONTHLY_HOURS, smicHourlyFor } from "../referentiels/legal";

/**
 * Cas maladie et contrôle des IJSS (cahier des charges V1).
 * - IJSS : 50 % du salaire journalier de base (3 derniers salaires bruts,
 *   chacun plafonné, divisés par 91,25) — CSS R323-4 et R323-5 ;
 * - maintien de salaire : minimum légal (C. trav. L1226-1, D1226-1 à D1226-3)
 *   ou règles de la convention collective quand elles sont intégrées
 *   (table cc_sick_pay), la plus favorable s'appliquant.
 * Les paramètres viennent de la veille réglementaire datée.
 */

const EURO = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
/** IJSS versées nettes de CSG (6,2 %) et CRDS (0,5 %) : fourchette brut / net acceptée. */
const IJSS_NET_RATIO = 0.933;

/** Ancienneté en mois à la fin de la période, à partir de la date d'entrée « JJ/MM/AAAA ». */
export function seniorityMonths(payslip: PayslipData): number | null {
  const match = payslip.seniorityDate?.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  const period = payslip.period?.match(/^(\d{4})-(\d{2})/);
  if (!match || !period) return null;
  const year = match[3].length === 2 ? 2000 + Number(match[3]) : Number(match[3]);
  const months = (Number(period[1]) - year) * 12 + (Number(period[2]) - Number(match[2]));
  return months >= 0 ? months : null;
}

/** Tranche conventionnelle applicable (ancienneté la plus élevée atteinte) pour un type d'absence. */
function conventionTier(context: RuleContext, payslip: PayslipData, professional: boolean, months: number): ConventionSickPayRule[] {
  const rows = (context.conventionSickPay ?? []).filter((r) =>
    professional ? ["accident_travail", "maladie_professionnelle"].includes(r.absence_type) : r.absence_type === "maladie"
  );
  if (rows.length === 0) return [];
  const eligible = rows.filter((r) => r.seniority_min_months <= months);
  if (eligible.length === 0) return [];
  const best = Math.max(...eligible.map((r) => r.seniority_min_months));
  const tier = eligible.filter((r) => r.seniority_min_months === best);
  // Plusieurs catégories dans une même convention : on garde les règles sans catégorie ou toutes.
  const general = tier.filter((r) => !r.categories || r.categories.length === 0);
  return (general.length > 0 ? general : tier).sort((a, b) => (a.sequence ?? 1) - (b.sequence ?? 1));
}

/** Durée de chaque période du maintien légal selon l'ancienneté (30 j + 10 j par 5 ans au-delà d'un an, 90 j max). */
function legalPeriodDays(months: number): number {
  return Math.min(90, 30 + 10 * Math.floor(Math.max(0, months - 12) / 60));
}

export const maladieRules: AnomalyRule[] = [
  {
    id: "arrets-travail.ijss-montant",
    category: "arrets-travail",
    description: "IJSS portées sur le bulletin = 50 % du salaire journalier de base (3 derniers salaires plafonnés / 91,25)",
    check: (payslip, context) => {
      const sick = payslip.sickLeave;
      if (!sick || sick.professional || sick.ijss === null || !sick.ijssDays || sick.ijssDays <= 0) return null;
      const previous = (context.previousPayslips ?? []).filter((p) => p.grossPay > 0).slice(0, 3);
      if (previous.length === 0) return null;
      const rate = regulatoryValue(context, "ijss.taux", payslip.period);
      const divisor = regulatoryValue(context, "ijss.diviseur", payslip.period);
      const cap = regulatoryValue(context, "ijss.plafond_smic", payslip.period);
      if (!rate || !divisor || !cap) return null;
      const capped = previous.map((p) => {
        const smic = smicHourlyFor(p.period);
        return smic ? Math.min(p.grossPay, cap.value * smic * LEGAL_MONTHLY_HOURS) : p.grossPay;
      });
      // Moins de 3 fiches connues : moyenne ramenée à 3 mois (indicatif).
      const base = (capped.reduce((a, b) => a + b, 0) / capped.length) * 3;
      const daily = (base / divisor.value) * (rate.value / 100);
      const perDay = sick.ijss / sick.ijssDays;
      const low = daily * IJSS_NET_RATIO * (1 - tolerancesFor(context).relativePercent / 100);
      const high = daily * (1 + tolerancesFor(context).relativePercent / 100);
      if (perDay >= low && perDay <= high) return null;
      return {
        severity: "warning",
        message: `IJSS de ${EURO(perDay)} par jour (${EURO(sick.ijss)} pour ${sick.ijssDays} j) alors que le calcul donne environ ${EURO(daily)} brut par jour : ${rate.value} % du salaire journalier de base (${previous.length} dernier${previous.length > 1 ? "s" : ""} salaire${previous.length > 1 ? "s" : ""} connu${previous.length > 1 ? "s" : ""}, plafonné${previous.length > 1 ? "s" : ""} à ${cap.value.toLocaleString("fr-FR")} SMIC, / ${divisor.value.toLocaleString("fr-FR")} — ${cap.source}). Vérifier le relevé de la CPAM.`,
      };
    },
  },
  {
    id: "arrets-travail.maintien-absent",
    category: "arrets-travail",
    description: "Arrêt de travail indemnisé par l'employeur : complément présent quand l'ancienneté et la durée l'exigent (loi ou convention)",
    check: (payslip, context) => {
      const sick = payslip.sickLeave;
      if (!sick || sick.employerComplement !== null) return null;
      const months = seniorityMonths(payslip);
      if (months === null || sick.days === null || sick.days <= 0) return null;
      const tier = conventionTier(context, payslip, sick.professional, months);
      const legalSeniority = regulatoryValue(context, "maintien.anciennete_mois", payslip.period)?.value ?? 12;
      const legalWaiting = sick.professional ? 0 : regulatoryValue(context, "maintien.carence", payslip.period)?.value ?? 7;
      const waiting = tier.length > 0 ? Math.min(tier[0].waiting_days, months >= legalSeniority ? legalWaiting : Infinity) : months >= legalSeniority ? legalWaiting : null;
      if (waiting === null || sick.days <= waiting) return null;
      // Subrogation sans complément : les IJSS seules ne couvrent que 50 % du salaire.
      const source = tier.length > 0 ? `convention collective : ${tier[0].rate_percent} % après ${tier[0].waiting_days} j de carence` : `minimum légal : ${regulatoryValue(context, "maintien.taux_1", payslip.period)?.value ?? 90} % après ${legalWaiting} j de carence (Code du travail, art. L1226-1)`;
      return {
        severity: "warning",
        message: `Absence de ${sick.days} j sans complément de salaire employeur visible, alors que le salarié a ${Math.floor(months / 12)} an(s) et ${months % 12} mois d'ancienneté (${source}). Vérifier le maintien de salaire${sick.subrogation ? " : la subrogation seule ne suffit pas" : ""}.`,
      };
    },
  },
  {
    id: "arrets-travail.maintien-niveau",
    category: "arrets-travail",
    description: "Maintien de salaire : complément employeur + IJSS au moins égaux au pourcentage garanti de la rémunération perdue",
    check: (payslip, context) => {
      const sick = payslip.sickLeave;
      if (!sick || sick.employerComplement === null || sick.deduction === null || sick.deduction <= 0) return null;
      const months = seniorityMonths(payslip);
      if (months === null) return null;
      const tier = conventionTier(context, payslip, sick.professional, months);
      const legal = regulatoryValue(context, "maintien.taux_1", payslip.period)?.value ?? 90;
      const guaranteed = Math.max(legal, tier[0]?.rate_percent ?? 0);
      const ijssGross = sick.ijss !== null ? sick.ijss / IJSS_NET_RATIO : 0;
      // Retenue pour la totalité de l'absence : carence incluse, d'où un contrôle volontairement large.
      const received = sick.employerComplement + (sick.subrogation ? ijssGross : 0);
      const expected = (guaranteed / 100) * sick.deduction;
      const periodDays = legalPeriodDays(months);
      if (!sick.subrogation || received + tolerancesFor(context).relativeMinEuros >= expected * 0.75) return null;
      return {
        severity: "info",
        message: `Complément employeur (${EURO(sick.employerComplement)}) et IJSS (${EURO(sick.ijss ?? 0)}) couvrent ${Math.round((received / sick.deduction) * 100)} % de la retenue pour absence (${EURO(sick.deduction)}), loin des ${guaranteed} % garantis${tier.length > 0 ? " par la convention collective" : " par la loi"} (${periodDays} premiers jours). Vérifier la carence et les droits déjà consommés sur 12 mois.`,
      };
    },
  },
];

export { legalPeriodDays };
