import { createClient } from "@/lib/supabase/server";
import type { RuleContext } from "@/lib/rules/anomaly-rules";

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
  collectiveAgreementIdcc: string | null;
  collectiveAgreementCustomName: string | null;
};

/**
 * Charge le registre des conventions collectives prioritaires (liste
 * volontairement limitée aux plus courantes — voir la migration
 * add_collective_agreements_registry). Ne contient que des identifiants et
 * libellés vérifiés, jamais de barème chiffré.
 */
export async function listCollectiveAgreements(): Promise<CollectiveAgreement[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("collective_agreements")
    .select("idcc_code, name, sector, coverage_note, verified_at")
    .order("sector", { ascending: true })
    .order("name", { ascending: true });
  return (data as CollectiveAgreement[] | null) ?? [];
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
        "csg_crds_non_deductible_percent, salaire_minimum_conventionnel, collective_agreement_idcc, collective_agreement_custom_name"
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
    collectiveAgreementIdcc: settings?.collective_agreement_idcc ?? null,
    collectiveAgreementCustomName: settings?.collective_agreement_custom_name ?? null,
  };
}

/**
 * Résout le nom d'affichage de la convention paramétrée : celui du registre
 * si un IDCC a été sélectionné, sinon le texte libre saisi par le client.
 */
export async function resolveCollectiveAgreementName(
  settings: CompanyPaySettings
): Promise<string | null> {
  if (settings.collectiveAgreementIdcc) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("collective_agreements")
      .select("name")
      .eq("idcc_code", settings.collectiveAgreementIdcc)
      .maybeSingle();
    if (data?.name) return data.name;
  }
  return settings.collectiveAgreementCustomName ?? null;
}

export async function toRuleContext(settings: CompanyPaySettings): Promise<RuleContext> {
  return {
    csgCrdsNonDeductiblePercent: settings.csgCrdsNonDeductiblePercent,
    salaireMinimumConventionnel: settings.salaireMinimumConventionnel,
    contributionRates: settings.contributionRates.map((r) => ({
      label: r.label,
      expectedRatePercent: r.expected_rate_percent,
    })),
    configuredCollectiveAgreementName: await resolveCollectiveAgreementName(settings),
  };
}
