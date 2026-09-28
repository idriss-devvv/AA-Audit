import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getAccountContext } from "@/lib/account";
import { PLANS, PLAN_ORDER, ROLE_LABELS, toPlanId } from "@/lib/plans";
import { AdminAccountsTable, type AdminAccount } from "@/components/app/admin-accounts-table";
import { AdminInviteForm } from "@/components/app/admin-invite-form";
import { AdminSupportForm } from "@/components/app/admin-support-form";
import { getSupportContact } from "@/lib/support";

export const dynamic = "force-dynamic";

type Overview = {
  users: number;
  blocked: number;
  companies: number;
  payslips_total: number;
  payslips_month: number;
  plans: Record<string, number> | null;
};

/**
 * Back-office (super admin et admin) : vue d'ensemble du SaaS, ajout
 * d'utilisateurs, formules, limites de fiches et blocages. Les données viennent de fonctions SQL
 * security definer qui refusent tout appel d'un simple client.
 */
export default async function AdminPage() {
  const account = await getAccountContext();
  if (!account.isStaff || !account.userId) notFound();

  const supabase = await createClient();
  const [{ data: overviewData }, { data: accountsData }, supportContact] = await Promise.all([
    supabase.rpc("admin_overview"),
    supabase.rpc("admin_list_accounts"),
    getSupportContact(),
  ]);
  const overview = (overviewData as Overview | null) ?? null;
  const accounts = (accountsData as AdminAccount[] | null) ?? [];

  const revenue = accounts.reduce((sum, a) => sum + PLANS[toPlanId(a.plan)].price, 0);
  const stats = [
    { label: "Utilisateurs", value: overview?.users ?? accounts.length },
    { label: "Revenu mensuel (formules)", value: `${revenue.toLocaleString("fr-FR")} €` },
    { label: "Fiches ce mois-ci", value: overview?.payslips_month ?? 0 },
    { label: "Comptes bloqués", value: overview?.blocked ?? 0 },
  ];

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="heading-display text-4xl md:text-[2.75rem]">Administration</h1>
        <span className="badge bg-ink-900 text-beige-50 ring-ink-900">{ROLE_LABELS[account.role]}</span>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">
        Vue d&apos;ensemble du SaaS : utilisateurs, formules et accès.{" "}
        {account.isSuperAdmin
          ? "En tant que super admin, vous pouvez aussi nommer des admins."
          : "Les changements de rôle sont réservés aux super admins."}
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className={i === 0 ? "rounded-2xl bg-blue-800 p-6 text-beige-50 shadow-lift" : "card p-6"}>
            <p className={`text-[11px] font-semibold uppercase tracking-[0.14em] ${i === 0 ? "text-blue-200" : "text-ink-500"}`}>{stat.label}</p>
            <p className={`mt-4 font-display text-4xl leading-none tabular-nums ${i === 0 ? "text-beige-50" : "text-ink-900"}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="card mt-6 p-6">
        <p className="card-title">Répartition par formule</p>
        <div className="mt-4 grid gap-3 sm:grid-cols-4">
          {PLAN_ORDER.map((id) => (
            <div key={id} className="rounded-xl bg-beige-50 p-4">
              <p className="text-xs font-semibold text-ink-500">{PLANS[id].label}</p>
              <p className="mt-1 font-display text-3xl text-ink-900">{overview?.plans?.[id] ?? 0}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-ink-400">
          Tant que le paiement Stripe n&apos;est pas branché, les formules se changent ici manuellement.
        </p>
      </div>

      <AdminInviteForm isSuperAdmin={account.isSuperAdmin} />

      <AdminSupportForm contact={supportContact} />

      <AdminAccountsTable accounts={accounts} currentUserId={account.userId} isSuperAdmin={account.isSuperAdmin} />
    </div>
  );
}
