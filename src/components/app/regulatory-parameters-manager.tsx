"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type RegulatoryRow = {
  id: string;
  key: string;
  label: string;
  value: number;
  unit: string;
  valid_from: string;
  valid_to: string | null;
  source: string;
};

const UNIT_LABELS: Record<string, string> = { pourcent: "%", smic: "SMIC", euros: "€" };

function formatDate(value: string | null) {
  return value ? new Date(`${value}T00:00:00`).toLocaleDateString("fr-FR") : "—";
}

/** Veille réglementaire : valeurs datées des paramètres utilisés par les contrôles. */
export function RegulatoryParametersManager({ rows }: { rows: RegulatoryRow[] }) {
  const router = useRouter();
  const keys = useMemo(() => Array.from(new Map(rows.map((r) => [r.key, r.label])).entries()), [rows]);
  const [form, setForm] = useState({ key: keys[0]?.[0] ?? "", value: "", validFrom: "", source: "" });
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);
  const today = new Date().toISOString().slice(0, 10);

  async function call(method: "POST" | "DELETE", body?: unknown, id?: string) {
    setPending(true);
    setFeedback(null);
    const res = await fetch(`/api/admin/regulatory${id ? `?id=${id}` : ""}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined,
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setPending(false);
    if (!res || !res.ok) {
      setFeedback({ tone: "error", text: data.error || "Action impossible." });
      return false;
    }
    router.refresh();
    return true;
  }

  return (
    <div className="card mt-6 overflow-hidden">
      <div className="p-6">
        <p className="card-title">Veille réglementaire</p>
        <p className="mt-1 text-xs text-ink-400">
          Valeurs datées utilisées par les contrôles (mutuelle, prévoyance, taux réduits). À chaque évolution
          (loi de financement, décret, accord), ajoutez la nouvelle valeur avec sa date d&apos;effet : les fiches
          antérieures restent contrôlées avec l&apos;ancienne.
        </p>
      </div>

      <div className="overflow-x-auto border-t border-ink-100">
        <table className="w-full text-left text-sm">
          <thead className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
            <tr>
              <th className="px-5 py-3">Paramètre</th>
              <th className="px-5 py-3">Valeur</th>
              <th className="whitespace-nowrap px-5 py-3">En vigueur</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3" aria-label="Actions" />
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-100">
            {rows.map((r) => {
              const current = r.valid_from <= today && (!r.valid_to || r.valid_to > today);
              return (
                <tr key={r.id} className={current ? "" : "text-ink-400"}>
                  <td className="px-5 py-3">{r.label}</td>
                  <td className="whitespace-nowrap px-5 py-3 font-semibold tabular-nums">
                    {r.value.toLocaleString("fr-FR")} {UNIT_LABELS[r.unit] ?? r.unit}
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-xs">
                    {formatDate(r.valid_from)} → {r.valid_to ? formatDate(r.valid_to) : "en cours"}
                  </td>
                  <td className="px-5 py-3 text-xs">{r.source}</td>
                  <td className="px-5 py-3 text-right">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => window.confirm("Supprimer cette valeur ?") && call("DELETE", undefined, r.id)}
                      className="text-xs font-semibold text-rose-700 hover:text-rose-900"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          if (await call("POST", form)) {
            setFeedback({ tone: "ok", text: "Nouvelle valeur enregistrée." });
            setForm((f) => ({ ...f, value: "", validFrom: "", source: "" }));
          }
        }}
        className="grid gap-4 border-t border-ink-100 bg-beige-50 p-6 sm:grid-cols-4"
      >
        <label className="flex flex-col gap-1.5 sm:col-span-2">
          <span className="field-label">Paramètre</span>
          <select value={form.key} onChange={(e) => setForm((f) => ({ ...f, key: e.target.value }))} className="input">
            {keys.map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Nouvelle valeur</span>
          <input type="number" step="0.0001" required value={form.value} onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))} className="input" />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="field-label">Date d&apos;effet</span>
          <input type="date" required value={form.validFrom} onChange={(e) => setForm((f) => ({ ...f, validFrom: e.target.value }))} className="input" />
        </label>
        <label className="flex flex-col gap-1.5 sm:col-span-4">
          <span className="field-label">Source officielle (texte, article, Journal officiel)</span>
          <input required value={form.source} onChange={(e) => setForm((f) => ({ ...f, source: e.target.value }))} className="input" />
        </label>
        {feedback && (
          <p role="status" className={`text-sm sm:col-span-4 ${feedback.tone === "ok" ? "text-emerald-700" : "text-rose-700"}`}>
            {feedback.text}
          </p>
        )}
        <div className="sm:col-span-4">
          <button type="submit" disabled={pending} className="btn-primary">
            Ajouter la valeur
          </button>
        </div>
      </form>
    </div>
  );
}
