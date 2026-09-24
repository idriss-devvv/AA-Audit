"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type ContributionRateItem = {
  id: string;
  label: string;
  expected_rate_percent: number;
};

export function ContributionRatesManager({ rates }: { rates: ContributionRateItem[] }) {
  const router = useRouter();
  const [label, setLabel] = useState("");
  const [rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/settings/contribution-rates", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label, expectedRatePercent: rate }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Échec de l'ajout.");
    } else {
      setLabel("");
      setRate("");
      router.refresh();
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    await fetch(`/api/settings/contribution-rates?id=${id}`, { method: "DELETE" });
    router.refresh();
    setDeletingId(null);
  }

  return (
    <div className="mt-4">
      {rates.length === 0 ? (
        <p className="text-sm text-ink-500">Aucun taux de cotisation paramétré pour l&apos;instant.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {rates.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between rounded-xl border border-ink-200/70 bg-beige-50 px-4 py-2.5 text-sm"
            >
              <span className="font-medium text-ink-900">{r.label}</span>
              <div className="flex items-center gap-3">
                <span className="text-ink-700">{r.expected_rate_percent} % du brut</span>
                <button
                  type="button"
                  onClick={() => handleDelete(r.id)}
                  disabled={deletingId === r.id}
                  className="text-xs font-semibold text-ink-400 transition hover:text-rose-600 disabled:opacity-60"
                >
                  Supprimer
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleAdd} className="mt-4 flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="field-label text-xs">Libellé de la cotisation</label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ex: Accident du travail"
            required
            className="input w-56 px-3 py-2"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="field-label text-xs">Taux attendu (% du brut)</label>
          <input
            type="number"
            step="0.01"
            min="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            placeholder="Ex: 1.20"
            required
            className="input w-32 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-secondary px-4 py-2"
        >
          {loading ? "Ajout…" : "Ajouter"}
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
    </div>
  );
}
