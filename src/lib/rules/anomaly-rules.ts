import type { Anomaly, PayslipData } from "@/types/payslip";
import type { AnomalyRule, RuleContext } from "./types";
import { runRules } from "./engine";
import { coherenceRules } from "./catalog/coherence";
import { cotisationsRules } from "./catalog/cotisations";
import { congesRules } from "./catalog/conges";
import { qualiteDonneesRules } from "./catalog/qualite-donnees";
import { plausibiliteRules } from "./catalog/plausibilite";
import { arretsTravailRules } from "./catalog/arrets-travail";
import { baremesParametrablesRules } from "./catalog/baremes-parametrables";
import { controlesLegauxRules } from "./catalog/controles-legaux";
import { minimumConventionnelRules } from "./catalog/minimum-conventionnel";
import { ecartPeriodeRules } from "./catalog/ecart-periode";
import { netsTranchesRules } from "./catalog/nets-tranches";
import { cotisationsPatronalesRules } from "./catalog/cotisations-patronales";
import { maladieRules } from "./catalog/maladie";
import { conventionRules } from "./catalog/convention";

export type { AnomalyRule, RuleCategory, RuleFinding, RuleContext, ContributionRateSetting } from "./types";
export { CATEGORY_LABELS, categoryFromRuleId } from "./types";

/**
 * Registre central des règles de contrôle.
 *
 * Pour ajouter une nouvelle règle (net imposable, taux AT/MP, IJSS, taux de
 * sécurité sociale, réduction générale des cotisations patronales,
 * conventions collectives...) : créer un fichier dans src/lib/rules/catalog/
 * exportant un tableau d'AnomalyRule, puis l'ajouter ci-dessous. Le moteur
 * (engine.ts) et les points d'appel (API upload, /api/analyze) n'ont jamais
 * besoin d'être modifiés.
 */
export const RULES: AnomalyRule[] = [
  ...coherenceRules,
  ...cotisationsRules,
  ...congesRules,
  ...qualiteDonneesRules,
  ...plausibiliteRules,
  ...arretsTravailRules,
  ...baremesParametrablesRules,
  ...controlesLegauxRules,
  ...minimumConventionnelRules,
  ...ecartPeriodeRules,
  ...netsTranchesRules,
  ...cotisationsPatronalesRules,
  ...maladieRules,
  ...conventionRules,
];

export function runAnomalyRules(payslip: PayslipData, context: RuleContext = {}): Anomaly[] {
  return runRules(RULES, payslip, context);
}
