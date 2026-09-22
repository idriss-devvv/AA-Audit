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
  | "plausibilite";

export const CATEGORY_LABELS: Record<RuleCategory, string> = {
  coherence: "Cohérence des montants",
  cotisations: "Cotisations",
  conges: "Congés payés",
  "qualite-donnees": "Qualité des données",
  plausibilite: "Plausibilité",
};

export type RuleFinding = {
  severity: Severity;
  message: string;
};

export type AnomalyRule = {
  /** Format impératif "<categorie>.<slug>", ex: "coherence.net-superieur-brut" */
  id: string;
  category: RuleCategory;
  description: string;
  check: (payslip: PayslipData) => RuleFinding | null;
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
