import type { PayslipData } from "@/types/payslip";

/**
 * Framework de règles de contrôle — conçu pour rester extensible au fur et à
 * mesure que de nouvelles règles (net imposable, taux AT/MP, IJSS, taux de
 * sécurité sociale, réduction générale, conventions collectives...) viennent
 * s'ajouter aux règles génériques déjà présentes.
 *
 * Chaque nouvelle règle se déclare dans un fichier de src/lib/rules/catalog/
 * et s'ajoute simplement au tableau exporté par ce fichier — le moteur
 * (engine.ts) n'a jamais besoin d'être modifié.
 */

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

/**
 * Barèmes de contrôle paramétrables — jamais de valeur légale par défaut.
 * Ces valeurs ne sont renseignées que si l'entreprise (ou le cabinet qui la
 * gère) les a explicitement configurées dans Paramètres ; sinon les règles
 * qui en dépendent restent silencieuses (pas de faux contrôle basé sur une
 * hypothèse non confirmée).
 */
export type ContributionRateSetting = {
  label: string;
  expectedRatePercent: number;
};

export type RuleContext = {
  contributionRates?: ContributionRateSetting[];
  csgCrdsNonDeductiblePercent?: number | null;
  salaireMinimumConventionnel?: number | null;
};

export type AnomalyRule = {
  /** Format impératif "<categorie>.<slug>", ex: "coherence.net-superieur-brut" */
  id: string;
  category: RuleCategory;
  description: string;
  check: (payslip: PayslipData, context: RuleContext) => RuleFinding | null;
};

/**
 * Déduit la catégorie d'une anomalie à partir de son rule_id (préfixe avant
 * le point). Permet d'afficher un badge de catégorie côté UI sans avoir à
 * stocker de colonne supplémentaire en base pour les anomalies déjà en base.
 */
export function categoryFromRuleId(ruleId: string): RuleCategory | null {
  const prefix = ruleId.split(".")[0] as RuleCategory;
  return prefix in CATEGORY_LABELS ? prefix : null;
}
