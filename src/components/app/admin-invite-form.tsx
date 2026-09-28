"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PLANS, PLAN_ORDER, ROLE_LABELS, type AppRole, type PlanId } from "@/lib/plans";

/** Ajout d'un utilisateur par le back-office : il reçoit un e-mail d'invitation. */
export function AdminInviteForm({ isSuperAdmin }: { isSuperAdmin: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [isCabinet, setIsCabinet] = useState(false);
  const [plan, setPlan] = useState<PlanId>("free");
  const [quota, setQuota] = useState("");
  const [role, setRole] = useState<AppRole>("client");
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    const res = await fetch("/api/admin/invite", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        fullName,
        companyName,
        isCabinet,
        plan,
        quota: quota.trim() === "" ? null : Number(quota),
        role,
      }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setLoading(false);
    if (!res || !res.ok) {
      setFeedback({ tone: "error", text: data.error || "Invitation impossible." });
      return;
    }
    setFeedback({ tone: data.warning ? "error" : "ok", text: data.warning || `Invitation envoyée à ${email}.` });
    setEmail("");
    setFullName("");
    setCompanyName("");
    setIsCabinet(false);
    setPlan("free");
    setQuota("");
    setRole("client");
    router.refresh();
  }

  return (
    <div className="card mt-6 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="card-title">Ajouter un utilisateur</p>
          <p className="mt-1 text-xs text-ink-400">Il reçoit un e-mail pour choisir son mot de passe.</p>
        </div>
        {!open && (
          <button type="button" onClick={() => setOpen(true)} className="btn-primary">
            Ajouter un utilisateur
          </button>
        )}
      </div>

      {open && (
        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1.5">
            <span className="field-label">E-mail *</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="field-label">Nom complet</span>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="input" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="field-label">Société</span>
            <input value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="input" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="field-label">Type de compte</span>
            <select
              value={isCabinet ? "cabinet" : "entreprise"}
              onChange={(e) => setIsCabinet(e.target.value === "cabinet")}
              className="input"
            >
              <option value="entreprise">Entreprise</option>
              <option value="cabinet">Cabinet comptable</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="field-label">Formule</span>
            <select value={plan} onChange={(e) => setPlan(e.target.value as PlanId)} className="input">
              {PLAN_ORDER.map((id) => (
                <option key={id} value={id}>
                  {PLANS[id].label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="field-label">Limite de fiches</span>
            <input
              type="number"
              min={0}
              step={1}
              value={quota}
              onChange={(e) => setQuota(e.target.value)}
              placeholder={PLANS[plan].quota === null ? "Illimité (formule)" : `${PLANS[plan].quota} (formule)`}
              className="input"
            />
          </label>
          {isSuperAdmin && (
            <label className="flex flex-col gap-1.5">
              <span className="field-label">Rôle</span>
              <select value={role} onChange={(e) => setRole(e.target.value as AppRole)} className="input">
                {(["client", "admin", "super_admin"] as AppRole[]).map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
            </label>
          )}

          {feedback && (
            <p
              role="status"
              className={`text-sm sm:col-span-2 ${feedback.tone === "ok" ? "text-emerald-700" : "text-rose-700"}`}
            >
              {feedback.text}
            </p>
          )}

          <div className="flex gap-3 sm:col-span-2">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? "Envoi…" : "Envoyer l'invitation"}
            </button>
            <button type="button" onClick={() => setOpen(false)} className="btn btn-sm border border-ink-200 bg-white">
              Fermer
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
