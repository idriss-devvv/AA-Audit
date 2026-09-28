"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PLANS, PLAN_ORDER, ROLE_LABELS, quotaLabel, toPlanId, type AppRole, type PlanId } from "@/lib/plans";

export type AdminAccount = {
  user_id: string;
  email: string;
  full_name: string | null;
  app_role: AppRole;
  blocked_at: string | null;
  created_at: string;
  last_sign_in_at: string | null;
  company_id: string | null;
  company_name: string | null;
  plan: string;
  /** Limite personnalisée (null = celle de la formule). */
  custom_quota: number | null;
  /** Limite effective (null = illimité). */
  quota: number | null;
  payslips_month: number;
  payslips_total: number;
  sub_companies: number;
};

const PLAN_BADGE: Record<PlanId, string> = {
  free: "bg-beige-100 text-ink-600 ring-ink-200",
  starter: "bg-blue-50 text-blue-700 ring-blue-200",
  pro: "bg-violet-50 text-violet-700 ring-violet-200",
  entreprise: "bg-amber-50 text-amber-800 ring-amber-200",
};

function formatDate(value: string | null) {
  return value ? new Date(value).toLocaleDateString("fr-FR") : "—";
}

/** Liste des comptes du back-office, avec recherche, filtres et actions. */
export function AdminAccountsTable({
  accounts,
  currentUserId,
  isSuperAdmin,
}: {
  accounts: AdminAccount[];
  currentUserId: string;
  isSuperAdmin: boolean;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [planFilter, setPlanFilter] = useState<PlanId | "all">("all");
  const [pending, setPending] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return accounts.filter((a) => {
      if (planFilter !== "all" && toPlanId(a.plan) !== planFilter) return false;
      if (!q) return true;
      return [a.email, a.full_name, a.company_name].some((v) => v?.toLowerCase().includes(q));
    });
  }, [accounts, query, planFilter]);

  async function run(key: string, payload: Record<string, unknown>, success: string) {
    setPending(key);
    setFeedback(null);
    const res = await fetch("/api/admin/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setPending(null);
    if (!res || !res.ok) {
      setFeedback({ tone: "error", text: data.error || "Action impossible." });
      return;
    }
    setFeedback({ tone: "ok", text: success });
    router.refresh();
  }

  function editQuota(account: AdminAccount) {
    const plan = PLANS[toPlanId(account.plan)];
    const current = account.custom_quota === null ? "" : String(account.custom_quota);
    const answer = window.prompt(
      `Limite de fiches de ${account.email} (${plan.id === "free" ? "au total" : "par mois"}).
` +
        `Laisser vide pour revenir à la limite de la formule ${plan.label} (${quotaLabel(plan)}).`,
      current
    );
    if (answer === null) return;
    const trimmed = answer.trim();
    const value = trimmed === "" ? null : Number(trimmed);
    if (value !== null && !(Number.isInteger(value) && value >= 0)) {
      setFeedback({ tone: "error", text: "La limite doit être un nombre entier positif." });
      return;
    }
    run(
      `quota-${account.user_id}`,
      { action: "quota", companyId: account.company_id, value },
      value === null
        ? `${account.email} revient à la limite de la formule.`
        : `Limite de ${account.email} : ${quotaLabel(plan, value)}.`
    );
  }

  return (
    <div className="card mt-6 overflow-hidden">
      <div className="flex flex-col gap-3 border-b border-ink-200/70 bg-beige-50 p-4 sm:flex-row sm:items-center sm:justify-between">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un e-mail, un nom, une société…"
          aria-label="Rechercher un compte"
          className="input sm:max-w-sm"
        />
        <div className="flex flex-wrap gap-1" role="group" aria-label="Filtrer par formule">
          {(["all", ...PLAN_ORDER] as const).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setPlanFilter(id)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                planFilter === id ? "bg-ink-900 text-beige-50" : "text-ink-500 hover:bg-white hover:text-ink-900"
              }`}
            >
              {id === "all" ? "Toutes" : PLANS[id].label}
            </button>
          ))}
        </div>
      </div>

      {feedback && (
        <p
          role="status"
          className={`border-b px-4 py-2.5 text-sm ${
            feedback.tone === "ok" ? "border-emerald-100 bg-emerald-50 text-emerald-700" : "border-rose-100 bg-rose-50 text-rose-700"
          }`}
        >
          {feedback.text}
        </p>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-ink-200/70 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
            <tr>
              <th className="px-5 py-3">Compte</th>
              <th className="px-5 py-3">Formule</th>
              <th className="whitespace-nowrap px-5 py-3">Fiches (mois / total)</th>
              <th className="px-5 py-3">Limite</th>
              <th className="px-5 py-3">Rôle</th>
              <th className="px-5 py-3">Statut</th>
              <th className="px-5 py-3" aria-label="Actions" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {filtered.map((account) => {
              const plan = toPlanId(account.plan);
              const isSelf = account.user_id === currentUserId;
              const blocked = Boolean(account.blocked_at);
              // Un admin ne peut agir que sur les comptes clients.
              const canBlock = !isSelf && (isSuperAdmin || account.app_role === "client");
              return (
                <tr key={account.user_id} className={blocked ? "bg-rose-50/40" : "transition-colors hover:bg-beige-50/70"}>
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink-900">{account.email}</p>
                    <p className="text-xs text-ink-400">
                      {account.company_name || "—"}
                      {account.sub_companies > 0 ? ` · +${account.sub_companies} société(s)` : ""} · inscrit le{" "}
                      {formatDate(account.created_at)}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    {account.company_id ? (
                      <select
                        value={plan}
                        disabled={pending !== null}
                        aria-label={`Formule de ${account.email}`}
                        onChange={(e) =>
                          run(
                            `plan-${account.user_id}`,
                            { action: "plan", companyId: account.company_id, value: e.target.value },
                            `Formule de ${account.email} : ${PLANS[e.target.value as PlanId].label}.`
                          )
                        }
                        className={`badge cursor-pointer border-0 py-1.5 pr-7 ${PLAN_BADGE[plan]}`}
                      >
                        {PLAN_ORDER.map((id) => (
                          <option key={id} value={id}>
                            {PLANS[id].label}
                          </option>
                        ))}
                      </select>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 tabular-nums text-ink-700">
                    {account.payslips_month} / {account.payslips_total}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4">
                    {account.company_id ? (
                      <button
                        type="button"
                        disabled={pending !== null}
                        onClick={() => editQuota(account)}
                        title="Modifier la limite de fiches"
                        className="text-left text-xs font-semibold text-ink-700 underline decoration-ink-200 underline-offset-4 hover:decoration-ink-500"
                      >
                        {quotaLabel(PLANS[plan], account.quota)}
                        {account.custom_quota !== null && (
                          <span className="ml-1.5 font-normal text-blue-700">(personnalisée)</span>
                        )}
                      </button>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {isSuperAdmin && !isSelf ? (
                      <select
                        value={account.app_role}
                        disabled={pending !== null}
                        aria-label={`Rôle de ${account.email}`}
                        onChange={(e) =>
                          run(
                            `role-${account.user_id}`,
                            { action: "role", userId: account.user_id, value: e.target.value },
                            `${account.email} est maintenant ${ROLE_LABELS[e.target.value as AppRole]}.`
                          )
                        }
                        className="input w-auto rounded-full py-1.5 pl-3 pr-8 text-xs font-semibold"
                      >
                        {(["client", "admin", "super_admin"] as AppRole[]).map((role) => (
                          <option key={role} value={role}>
                            {ROLE_LABELS[role]}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-xs font-semibold text-ink-600">{ROLE_LABELS[account.app_role]}</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {blocked ? (
                      <span className="badge bg-rose-50 text-rose-700 ring-rose-200">Bloqué</span>
                    ) : (
                      <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Actif</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {canBlock && (
                      <button
                        type="button"
                        disabled={pending !== null}
                        onClick={() => {
                          if (!blocked && !window.confirm(`Bloquer l'accès de ${account.email} ?`)) return;
                          run(
                            `block-${account.user_id}`,
                            { action: "block", userId: account.user_id, value: !blocked },
                            blocked ? `${account.email} est débloqué.` : `${account.email} est bloqué.`
                          );
                        }}
                        className={`btn btn-sm border ${
                          blocked
                            ? "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
                            : "border-rose-200 bg-white text-rose-700 hover:bg-rose-50"
                        }`}
                      >
                        {blocked ? "Débloquer" : "Bloquer"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-ink-500">
                  Aucun compte ne correspond à la recherche.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
