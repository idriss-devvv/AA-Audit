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
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="field-label">
            Taux de CSG/CRDS non déductible (%)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Non renseigné"
            value={csgCrds}
            onChange={(e) => setCsgCrds(e.target.value)}
            className="input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="field-label">
            Salaire minimum conventionnel (€)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            placeholder="Non renseigné"
            value={salaireMinimum}
            onChange={(e) => setSalaireMinimum(e.target.value)}
            className="input"
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {saved && !error && <p className="text-sm text-green-600">Barèmes enregistrés.</p>}

      <div>
        <button
          type="submit"
          disabled={loading}
          className="btn-primary px-5 py-2.5"
        >
          {loading ? "Enregistrement…" : "Enregistrer"}
        </button>
      </div>
    </form>
  );
}
