import { cache } from "react";
import { createClient, getCurrentProfile, getCurrentUser } from "@/lib/supabase/server";
import { PLANS, toPlanId, type AppRole, type PlanDefinition } from "@/lib/plans";

export type AccountContext = {
  userId: string | null;
  email: string | null;
  role: AppRole;
  /** Super admin ou admin : accès au back-office. */
  isStaff: boolean;
  /** Super admin (développeurs) : gère aussi les rôles. */
  isSuperAdmin: boolean;
  blocked: boolean;
  /** Formule de l'entreprise propre de l'utilisateur. */
  plan: PlanDefinition;
  /** Limite de fiches effective (personnalisée ou celle de la formule) ; null = illimité. */
  quota: number | null;
  /** Onglets débloqués (formule, ou accès complet pour le super admin / l'admin). */
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
    isSuperAdmin: false,
    blocked: false,
    plan: PLANS.free,
    quota: PLANS.free.quota,
    canManageCompanies: false,
    canManageEmployees: false,
  };
  const [user, profile] = await Promise.all([getCurrentUser(), getCurrentProfile()]);
  if (!user) return anonymous;

  const role = (profile?.app_role as AppRole | undefined) ?? "client";
  const isStaff = role === "super_admin" || role === "admin";

  let plan = PLANS.free;
  let quota = plan.quota;
  if (profile?.company_id) {
    const supabase = await createClient();
    const [{ data: planId }, { data: quotaValue }] = await Promise.all([
      supabase.rpc("company_plan", { p_company: profile.company_id }),
      supabase.rpc("company_quota", { p_company: profile.company_id }),
    ]);
    plan = PLANS[toPlanId(planId as string | null)];
    quota = (quotaValue as number | null) ?? null;
  }

  return {
    userId: user.id,
    email: user.email ?? null,
    role,
    isStaff,
    isSuperAdmin: role === "super_admin",
    blocked: Boolean(profile?.blocked_at),
    plan,
    quota,
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
  // Au total pour free, par mois pour les autres formules (y compris une
  // limite personnalisée sur la formule Entreprise).
  if (plan.id !== "free") {
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
