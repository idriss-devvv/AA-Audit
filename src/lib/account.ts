import { cache } from "react";
import { createClient, getCurrentProfile, getCurrentUser } from "@/lib/supabase/server";
import { PLANS, toPlanId, type AppRole, type PlanDefinition } from "@/lib/plans";

export type AccountContext = {
  userId: string | null;
  email: string | null;
  role: AppRole;
  isStaff: boolean;
  isAdmin: boolean;
  blocked: boolean;
  /** Formule de l'entreprise propre de l'utilisateur. */
  plan: PlanDefinition;
  /** Onglets débloqués (formule, ou accès complet pour l'admin / le gestionnaire). */
  canManageCompanies: boolean;
  canManageEmployees: boolean;
};

/**
 * Rôle, blocage et formule de l'utilisateur connecté. La formule provient de
 * la fonction SQL `company_plan` (abonnement actif de l'entreprise, sinon
 * free) : la même source que celle qui applique les quotas en base.
 */
export const getAccountContext = cache(async (): Promise<AccountContext> => {
  const anonymous: AccountContext = {
    userId: null,
    email: null,
    role: "client",
    isStaff: false,
    isAdmin: false,
    blocked: false,
    plan: PLANS.free,
    canManageCompanies: false,
    canManageEmployees: false,
  };
  const [user, profile] = await Promise.all([getCurrentUser(), getCurrentProfile()]);
  if (!user) return anonymous;

  const role = (profile?.app_role as AppRole | undefined) ?? "client";
  const isStaff = role === "admin" || role === "gestionnaire";

  let plan = PLANS.free;
  if (profile?.company_id) {
    const supabase = await createClient();
    const { data: planId } = await supabase.rpc("company_plan", { p_company: profile.company_id });
    plan = PLANS[toPlanId(planId as string | null)];
  }

  return {
    userId: user.id,
    email: user.email ?? null,
    role,
    isStaff,
    isAdmin: role === "admin",
    blocked: Boolean(profile?.blocked_at),
    plan,
    canManageCompanies: isStaff || plan.companiesTab,
    canManageEmployees: isStaff || plan.employeesTab,
  };
});

/** Nombre de fiches déjà importées sur la période de quota de la formule. */
export async function getQuotaUsage(companyId: string, plan: PlanDefinition): Promise<number> {
  const supabase = await createClient();
  // Même règle que le trigger enforce_payslip_quota : les fiches supprimées
  // restent comptées, les images (pas encore analysées) ne le sont pas.
  let query = supabase
    .from("payslips")
    .select("id", { count: "exact", head: true })
    .eq("company_id", companyId)
    .or("mime_type.is.null,mime_type.not.like.image/*");
  if (plan.quotaPeriod === "month") {
    const now = new Date();
    query = query.gte("uploaded_at", new Date(now.getFullYear(), now.getMonth(), 1).toISOString());
  }
  const { count } = await query;
  return count ?? 0;
}

/**
 * Résultats masqués pour cette société ? (formule Free, sauf back-office).
 * Les pages n'envoient alors au navigateur que la première anomalie en clair.
 */
export async function areResultsLocked(companyId: string | null): Promise<boolean> {
  if (!companyId) return false;
  // Rôle déjà connu via le contexte mémoïsé : pas d'appel is_staff en plus.
  const account = await getAccountContext();
  if (account.isStaff) return false;
  const supabase = await createClient();
  const { data: planId } = await supabase.rpc("company_plan", { p_company: companyId });
  return PLANS[toPlanId(planId as string | null)].blurredResults;
}
