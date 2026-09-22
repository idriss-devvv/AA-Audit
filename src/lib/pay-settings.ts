import { createClient } from "@/lib/supabase/server";
import type { RuleContext } from "@/lib/rules/anomaly-rules";

export type ContributionRateRow = {
  id: string;
  label: string;
  expected_rate_percent: number;
};

export type CompanyPaySettings = {
  csgCrdsNonDeductiblePercent: number | null;
  salaireMinimumConventionnel: number | null;
  contributionRates: ContributionRateRow[];
};

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
      .select("csg_crds_non_deductible_percent, salaire_minimum_conventionnel")
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
  };
}
