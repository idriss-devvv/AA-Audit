import type { RuleContext } from "./types";

/**
 * Paramètres réglementaires datés (table regulatory_parameters, modifiable
 * dans l'Administration). Chaque fiche est contrôlée avec la valeur en
 * vigueur à sa période : une évolution (loi de financement, décret, accord)
 * s'ajoute sous forme de nouvelle ligne datée, sans changer le code.
 */
export type RegulatoryParameter = {
  key: string;
  label: string;
  value: number;
  unit: string;
  valid_from: string;
  valid_to: string | null;
  source: string;
};

/** Valeurs de repli si la table n'a pas pu être lue (identiques à la migration initiale). */
export const DEFAULT_REGULATORY_PARAMETERS: RegulatoryParameter[] = [
  { key: "sante.part_employeur_min", label: "Complémentaire santé : part patronale minimale", value: 50, unit: "pourcent", valid_from: "2016-01-01", valid_to: null, source: "Code de la sécurité sociale, art. L911-7" },
  { key: "prevoyance.cadres_taux_min_t1", label: "Prévoyance des cadres : cotisation patronale minimale sur la tranche 1", value: 1.5, unit: "pourcent", valid_from: "2018-01-01", valid_to: null, source: "ANI du 17 novembre 2017 relatif à la prévoyance des cadres, art. 7" },
  { key: "maladie.taux_plein", label: "Assurance maladie : taux patronal plein", value: 13, unit: "pourcent", valid_from: "2019-01-01", valid_to: null, source: "Code de la sécurité sociale, art. D242-3" },
  { key: "maladie.taux_reduit", label: "Assurance maladie : taux patronal réduit", value: 7, unit: "pourcent", valid_from: "2019-01-01", valid_to: null, source: "Code de la sécurité sociale, art. D242-3" },
  { key: "maladie.seuil_smic", label: "Assurance maladie : seuil du taux réduit (nombre de SMIC)", value: 2.5, unit: "smic", valid_from: "2019-01-01", valid_to: "2025-01-01", source: "Code de la sécurité sociale, art. L241-2-1 et D242-3" },
  { key: "maladie.seuil_smic", label: "Assurance maladie : seuil du taux réduit (nombre de SMIC)", value: 2.25, unit: "smic", valid_from: "2025-01-01", valid_to: null, source: "Code de la sécurité sociale, art. L241-2-1 et D242-3" },
  { key: "famille.taux_plein", label: "Allocations familiales : taux patronal plein", value: 5.25, unit: "pourcent", valid_from: "2016-04-01", valid_to: null, source: "Code de la sécurité sociale, art. D241-3-1" },
  { key: "famille.taux_reduit", label: "Allocations familiales : taux patronal réduit", value: 3.45, unit: "pourcent", valid_from: "2016-04-01", valid_to: null, source: "Code de la sécurité sociale, art. L241-6-1 et D241-3-1" },
  { key: "famille.seuil_smic", label: "Allocations familiales : seuil du taux réduit (nombre de SMIC)", value: 3.5, unit: "smic", valid_from: "2016-04-01", valid_to: null, source: "Code de la sécurité sociale, art. L241-6-1" },
];

/** Valeur d'un paramètre en vigueur au premier jour de la période « AAAA-MM ». */
export function regulatoryValue(context: RuleContext, key: string, period: string | null | undefined): RegulatoryParameter | null {
  if (!period || !/^\d{4}-\d{2}/.test(period)) return null;
  const day = `${period.slice(0, 7)}-01`;
  const list = context.regulatory && context.regulatory.length > 0 ? context.regulatory : DEFAULT_REGULATORY_PARAMETERS;
  const candidates = list
    .filter((p) => p.key === key && p.valid_from <= day && (!p.valid_to || p.valid_to > day))
    .sort((a, b) => b.valid_from.localeCompare(a.valid_from));
  return candidates[0] ?? null;
}
