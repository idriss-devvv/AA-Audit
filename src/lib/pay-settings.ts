import { createClient } from "@/lib/supabase/server";
import type { RuleContext } from "@/lib/rules/anomaly-rules";
import { sanitizeTolerances, type Tolerances } from "@/lib/rules/tolerances";

export type ContributionRateRow = {
  id: string;
  label: string;
  expected_rate_percent: number;
};

export type CollectiveAgreement = {
  idcc_code: string;
  name: string;
  sector: string;
  coverage_note: string | null;
  verified_at: string;
};

export type CompanyPaySettings = {
  csgCrdsNonDeductiblePercent: number | null;
  salaireMinimumConventionnel: number | null;
  contributionRates: ContributionRateRow[];
  /** Seuils de tolérance réglés (les autres gardent leur valeur par défaut). */
  tolerances: Partial<Tolerances>;
};

/**
 * Référentiels communs à tous les comptes (registre des conventions, IDCC
 * disponibles) : gardés 5 minutes en mémoire de l'instance serveur pour éviter
 * deux requêtes à chaque import. Un résultat vide n'est pas mis en cache.
 */
const REFERENCE_TTL_MS = 5 * 60 * 1000;
const referenceCache = new Map<string, { expiresAt: number; value: unknown }>();

async function cachedReference<T>(key: string, load: () => Promise<T>): Promise<T> {
  const hit = referenceCache.get(key);
  if (hit && hit.expiresAt > Date.now()) return hit.value as T;
  const value = await load();
  const empty = Array.isArray(value) ? value.length === 0 : value instanceof Set && value.size === 0;
  if (!empty) referenceCache.set(key, { expiresAt: Date.now() + REFERENCE_TTL_MS, value });
  return value;
}

/**
 * Charge le registre des conventions collectives prioritaires (liste
 * volontairement limitée aux plus courantes — voir la migration
 * add_collective_agreements_registry). Ne contient que des identifiants et
 * libellés vérifiés, jamais de barème chiffré. Sert à identifier
 * automatiquement la convention de chaque fiche importée.
 */
export async function listCollectiveAgreements(): Promise<CollectiveAgreement[]> {
  return cachedReference("collective_agreements", async () => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("collective_agreements")
      .select("idcc_code, name, sector, coverage_note, verified_at")
      .order("sector", { ascending: true })
      .order("name", { ascending: true });
    return (data as CollectiveAgreement[] | null) ?? [];
  });
}

/**
 * IDCC (normalisés, sans zéros de tête) des conventions dont les critères de
 * contrôle sont stockés dans le référentiel (tables cc_*, via leurs textes
 * sources). Une convention détectée mais absente de cette liste est signalée
 * « non disponible » à l'import.
 */
export async function listAvailableAgreementIdccs(): Promise<Set<string>> {
  return cachedReference("available_idccs", async () => {
    const supabase = await createClient();
    const { data } = await supabase.from("cc_texts").select("idcc_code");
    return new Set(((data as { idcc_code: string }[] | null) ?? []).map((row) => String(parseInt(row.idcc_code, 10))));
  });
}

/**
 * Charge les barèmes de contrôle paramétrés pour une entreprise. Ne renvoie
 * jamais de valeur par défaut : tant que rien n'a été saisi dans Paramètres,
 * les champs restent `null` / la liste reste vide, et les règles qui en
 * dépendent (baremes.*) restent silencieuses.
 */
export async function getCompanyPaySettings(companyId: string): Promise<CompanyPaySettings> {
  const supabase = await createClient();

  const [{ data: settings }, { data: rates }] = await Promise.all([
    supabase
      .from("company_pay_settings")
      .select(
"csg_crds_non_deductible_percent, salaire_minimum_conventionnel, tolerances"
      )
      .eq("company_id", companyId)
      .maybeSingle(),
    supabase
      .from("contribution_rate_settings")
      .select("id, label, expected_rate_percent")
      .eq("company_id", companyId)
      .order("label", { ascending: true }),
  ]);

  return {
    csgCrdsNonDeductiblePercent: settings?.csg_crds_non_deductible_percent ?? null,
    salaireMinimumConventionnel: settings?.salaire_minimum_conventionnel ?? null,
    contributionRates: (rates as ContributionRateRow[] | null) ?? [],
    tolerances: sanitizeTolerances(settings?.tolerances),
  };
}

export function toRuleContext(settings: CompanyPaySettings): RuleContext {
  return {
    csgCrdsNonDeductiblePercent: settings.csgCrdsNonDeductiblePercent,
    salaireMinimumConventionnel: settings.salaireMinimumConventionnel,
    contributionRates: settings.contributionRates.map((r) => ({
      label: r.label,
      expectedRatePercent: r.expected_rate_percent,
    })),
    tolerances: settings.tolerances,
  };
}
