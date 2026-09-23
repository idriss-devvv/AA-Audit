import type { PayslipData } from "@/types/payslip";

export type Severity = "info" | "warning" | "critical";

export type RuleCategory =
  | "coherence"
  | "cotisations"
  | "conges"
  | "qualite-donnees"
  | "plausibilite"
  | "baremes"
  | "arrets-travail";

export const CATEGORY_LABELS: Record<RuleCategory, string> = {
  coherence: "Cohérence des montants",
  cotisations: "Cotisations",
  conges: "Congés payés",
  "qualite-donnees": "Qualité des données",
  plausibilite: "Plausibilité",
  baremes: "Barèmes paramétrés",
  "arrets-travail": "Arrêts de travail",
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
  configuredCollectiveAgreementName?: string | null;
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
