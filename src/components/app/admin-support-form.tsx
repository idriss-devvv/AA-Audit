"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SupportContact } from "@/lib/support";

/** Coordonnées affichées par le bouton « Aide » de tous les utilisateurs. */
export function AdminSupportForm({ contact }: { contact: SupportContact }) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: contact.name ?? "",
    email: contact.email ?? "",
    phone: contact.phone ?? "",
    url: contact.url ?? "",
    hours: contact.hours ?? "",
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  const fields: { key: keyof typeof values; label: string; type?: string; placeholder: string }[] = [
    { key: "name", label: "Nom affiché", placeholder: "A&A Paye" },
    { key: "email", label: "E-mail d'assistance", type: "email", placeholder: "support@cabinet.fr" },
    { key: "phone", label: "Téléphone", placeholder: "01 23 45 67 89" },
    { key: "url", label: "Page d'assistance (lien)", type: "url", placeholder: "https://…" },
    { key: "hours", label: "Horaires", placeholder: "Du lundi au vendredi, 9 h – 18 h" },
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setFeedback(null);
    const res = await fetch("/api/admin/support", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setLoading(false);
    if (!res || !res.ok) {
      setFeedback({ tone: "error", text: data.error || "Enregistrement impossible." });
      return;
    }
    setFeedback({ tone: "ok", text: "Coordonnées d'assistance enregistrées." });
    router.refresh();
  }

  return (
    <div className="card mt-6 p-6">
      <p className="card-title">Assistance (bouton « Aide »)</p>
      <p className="mt-1 text-xs text-ink-400">Coordonnées du cabinet affichées à tous les utilisateurs quand ils cliquent sur « Aide ».</p>
      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
        {fields.map((f) => (
          <label key={f.key} className="flex flex-col gap-1.5">
            <span className="field-label">{f.label}</span>
            <input
              type={f.type ?? "text"}
              value={values[f.key]}
              placeholder={f.placeholder}
              onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
              className="input"
            />
          </label>
        ))}
        {feedback && (
          <p role="status" className={`text-sm sm:col-span-2 ${feedback.tone === "ok" ? "text-emerald-700" : "text-rose-700"}`}>
            {feedback.text}
          </p>
        )}
        <div className="sm:col-span-2">
          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? "Enregistrement…" : "Enregistrer"}
          </button>
        </div>
      </form>
    </div>
  );
}
