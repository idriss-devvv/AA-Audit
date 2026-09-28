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
  | "ecart-periode";

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
};

export type RuleFinding = {
  severity: Severity;
  message: string;
};

export type ContributionRateSetting = {
  label: string;
  expectedRatePercent: number;
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
