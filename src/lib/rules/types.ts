import type { PayslipData } from "@/types/payslip";

export type Severity = "info" | "warning" | "critical";

export type RuleCategory =
  | "coherence"
  | "cotisations"
  | "conges"
  | "qualite-donnees"
  | "plausibilite"
  | "baremes"
  | "arrets-travail"
  | "heures-sup"
  | "plafonds"
  | "mentions-obligatoires"
  | "ecart-periode"
  | "conventions";

export const CATEGORY_LABELS: Record<RuleCategory, string> = {
  coherence: "Cohérence des montants",
  cotisations: "Cotisations",
  conges: "Congés payés",
  "qualite-donnees": "Qualité des données",
  plausibilite: "Plausibilité",
  baremes: "Barèmes paramétrés",
  "arrets-travail": "Arrêts de travail",
  "heures-sup": "Heures supplémentaires",
  plafonds: "Plafond de la Sécurité sociale",
  "mentions-obligatoires": "Mentions obligatoires",
  "ecart-periode": "Écart N / N-1",
  conventions: "Convention collective",
};

export type RuleFinding = {
  severity: Severity;
  message: string;
};

export type ContributionRateSetting = {
  label: string;
  expectedRatePercent: number;
};

/** Règle conventionnelle de maintien de salaire (table cc_sick_pay). */
export type ConventionSickPayRule = {
  absence_type: string;
  categories: string[] | null;
  seniority_min_months: number;
  waiting_days: number;
  sequence: number | null;
  duration_days: number;
  rate_percent: number;
  rate_base: string;
};

/** Règles de la convention collective de la fiche (tables cc_*), en vigueur à la période. */
export type ConventionRules = {
  idcc: string;
  name: string | null;
  seniority: {
    categories: string[] | null;
    classification_codes: string[] | null;
    seniority_min_months: number;
    rate_percent: number | null;
    fixed_amount: number | null;
    calculation_base: string;
    seniority_definition: string | null;
    notes: string | null;
  }[];
  payIncreases: {
    kind: string;
    label: string;
    categories: string[] | null;
    hours_from: number | null;
    rate_percent: number | null;
    notes: string | null;
  }[];
  bonuses: {
    kind: string;
    label: string;
    categories: string[] | null;
    payment_months: number[] | null;
    seniority_min_months: number | null;
    notes: string | null;
  }[];
};

export type RuleContext = {
  contributionRates?: ContributionRateSetting[];
  csgCrdsNonDeductiblePercent?: number | null;
  salaireMinimumConventionnel?: number | null;
  /** Seuils de tolérance réglés par l'entreprise (voir tolerances.ts). */
  tolerances?: Partial<import("./tolerances").Tolerances>;
  /** Fiche précédente du même salarié (écart N / N-1), si elle existe. */
  previousPayslip?: PayslipData | null;
  /** Paramètres réglementaires datés (table regulatory_parameters). */
  regulatory?: import("./regulatory").RegulatoryParameter[];
  /** Taux AT/MP notifié à l'entreprise, en %. */
  atMpRatePercent?: number | null;
  /** Jusqu'à 3 fiches précédentes du même salarié, la plus récente d'abord (IJSS). */
  previousPayslips?: PayslipData[];
  /** Maintien de salaire prévu par la convention collective de la fiche. */
  conventionSickPay?: ConventionSickPayRule[];
  /** Autres règles de la convention collective de la fiche. */
  conventionRules?: ConventionRules | null;
};

export type AnomalyRule = {
  id: string;
  category: RuleCategory;
  description: string;
  check: (payslip: PayslipData, context: RuleContext) => RuleFinding | null;
};

export function categoryFromRuleId(ruleId: string): RuleCategory | null {
  const prefix = ruleId.split(".")[0] as RuleCategory;
  return prefix in CATEGORY_LABELS ? prefix : null;
}
