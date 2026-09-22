"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function PaySettingsForm({
  initialCsgCrds,
  initialSalaireMinimum,
}: {
  initialCsgCrds: number | null;
  initialSalaireMinimum: number | null;
}) {
  const router = useRouter();
  const [csgCrds, setCsgCrds] = useState(initialCsgCrds?.toString() ?? "");
  const [salaireMinimum, setSalaireMinimum] = useState(initialSalaireMinimum?.toString() ?? "");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    const res = await fetch("/api/settings/pay-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csgCrdsNonDeductiblePercent: csgCrds || null,
        salaireMinimumConventionnel: salaireMinimum || null,
      }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error || "Échec de l'enregistrement.");
    } else {
      setSaved(true);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-4 sm:grid-cols-2">
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink-700">
          Taux de CSG/CRDS non déductible (%)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Non renseigné"
          value={csgCrds}
          onChange={(e) => setCsgCrds(e.target.value)}
          className="rounded-lg border border-beige-200 bg-beige-50 px-4 py-2.5 text-ink-900 outline-none focus:border-blue-400"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-ink-700">
          Salaire minimum conventionnel (€)
        </label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="Non renseigné"
          value={salaireMinimum}
          onChange={(e) => setSalaireMinimum(e.target.value)}
          className="rounded-lg border border-beige-200 bg-beige-50 px-4 py-2.5 text-ink-900 outline-none focus:border-blue-400"
        />
      </div>

      {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
      {saved && !error && (
        <p className="text-sm text-green-600 sm:col-span-2">Barèmes enregistrés.</p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-beige-50 transition hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
