import type { RuleContext } from "./types";

/**
 * Seuils de tolérance de la détection d'anomalies (cahier des charges V1 :
 * « seuils de tolérance configurables »). Les valeurs par défaut sont celles
 * appliquées jusqu'ici ; chaque entreprise peut les ajuster dans Paramètres.
 */
export type Tolerances = {
  /** Écart toléré sur un montant recalculé (net à payer, net avant impôt), en €. */
  amountEuros: number;
  /** Marge sous un minimum (SMIC, minimum conventionnel), en €. */
  minimumEuros: number;
  /** Écart toléré sur un taux de cotisation, en points de %. */
  ratePoints: number;
  /** Écart toléré sur un solde de congés payés, en jours. */
  leaveDays: number;
  /** Écart relatif toléré sur une cotisation paramétrée ou une estimation, en %. */
  relativePercent: number;
  /** Écart minimal en € en dessous duquel un écart relatif n'est pas signalé. */
  relativeMinEuros: number;
  /** Fourchette usuelle du ratio net / brut, en %. */
  netGrossMinPercent: number;
  netGrossMaxPercent: number;
  /** Variation d'un mois sur l'autre au-delà de laquelle un écart N / N-1 est signalé, en %. */
  periodVariationPercent: number;
};

export const DEFAULT_TOLERANCES: Tolerances = {
  amountEuros: 1,
  minimumEuros: 0.5,
  ratePoints: 0.005,
  leaveDays: 0.5,
  relativePercent: 8,
  relativeMinEuros: 3,
  netGrossMinPercent: 60,
  netGrossMaxPercent: 90,
  periodVariationPercent: 20,
};

export const TOLERANCE_FIELDS: { key: keyof Tolerances; label: string; unit: string; step: string }[] = [
  { key: "amountEuros", label: "Écart sur un montant recalculé (net à payer, net avant impôt)", unit: "€", step: "0.01" },
  { key: "minimumEuros", label: "Marge sous le SMIC ou le minimum conventionnel", unit: "€", step: "0.01" },
  { key: "ratePoints", label: "Écart sur un taux de cotisation", unit: "points", step: "0.001" },
  { key: "leaveDays", label: "Écart sur le solde de congés payés", unit: "jours", step: "0.5" },
  { key: "relativePercent", label: "Écart relatif sur une cotisation paramétrée", unit: "%", step: "0.5" },
  { key: "relativeMinEuros", label: "Écart minimal signalé sur une cotisation paramétrée", unit: "€", step: "0.5" },
  { key: "netGrossMinPercent", label: "Ratio net / brut minimum usuel", unit: "%", step: "1" },
  { key: "netGrossMaxPercent", label: "Ratio net / brut maximum usuel", unit: "%", step: "1" },
  { key: "periodVariationPercent", label: "Variation d'un mois sur l'autre (écart N / N-1)", unit: "%", step: "1" },
];

/** Nettoie une saisie : seuls les champs connus, numériques et positifs sont gardés. */
export function sanitizeTolerances(input: unknown): Partial<Tolerances> {
  const out: Partial<Tolerances> = {};
  if (!input || typeof input !== "object") return out;
  for (const { key } of TOLERANCE_FIELDS) {
    const raw = (input as Record<string, unknown>)[key];
    if (raw === null || raw === undefined || raw === "") continue;
    const n = typeof raw === "number" ? raw : parseFloat(String(raw).replace(",", "."));
    if (Number.isFinite(n) && n >= 0 && n <= 1_000_000) out[key] = n;
  }
  return out;
}

/** Seuils applicables : réglages de l'entreprise, à défaut valeurs par défaut. */
export function tolerancesFor(context: RuleContext): Tolerances {
  return { ...DEFAULT_TOLERANCES, ...(context.tolerances ?? {}) };
}
