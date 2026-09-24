"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CollectiveAgreement } from "@/lib/pay-settings";

const CUSTOM_OPTION_VALUE = "__custom__";

export function PaySettingsForm({
  initialCsgCrds,
  initialSalaireMinimum,
  agreements,
  initialCollectiveAgreementIdcc,
  initialCollectiveAgreementCustomName,
}: {
  initialCsgCrds: number | null;
  initialSalaireMinimum: number | null;
  agreements: CollectiveAgreement[];
  initialCollectiveAgreementIdcc: string | null;
  initialCollectiveAgreementCustomName: string | null;
}) {
  const router = useRouter();
  const [csgCrds, setCsgCrds] = useState(initialCsgCrds?.toString() ?? "");
  const [salaireMinimum, setSalaireMinimum] = useState(initialSalaireMinimum?.toString() ?? "");
  const [selectValue, setSelectValue] = useState(
    initialCollectiveAgreementIdcc ?? (initialCollectiveAgreementCustomName ? CUSTOM_OPTION_VALUE : "")
  );
  const [customName, setCustomName] = useState(initialCollectiveAgreementCustomName ?? "");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bySector = agreements.reduce<Record<string, CollectiveAgreement[]>>((acc, a) => {
    (acc[a.sector] ??= []).push(a);
    return acc;
  }, {});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSaved(false);

    const isCustom = selectValue === CUSTOM_OPTION_VALUE;

    const res = await fetch("/api/settings/pay-settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        csgCrdsNonDeductiblePercent: csgCrds || null,
        salaireMinimumConventionnel: salaireMinimum || null,
        collectiveAgreementIdcc: isCustom || !selectValue ? null : selectValue,
        collectiveAgreementCustomName: isCustom ? customName : null,
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
      <div className="flex flex-col gap-1.5">
        <label className="field-label">Convention collective applicable</label>
        <select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
          className="input"
        >
          <option value="">Non renseignée</option>
          {Object.entries(bySector).map(([sector, items]) => (
            <optgroup key={sector} label={sector}>
              {items.map((a) => (
                <option key={a.idcc_code} value={a.idcc_code}>
                  {a.name} (IDCC {a.idcc_code})
                </option>
              ))}
            </optgroup>
          ))}
          <option value={CUSTOM_OPTION_VALUE}>Autre / non listée — saisir le nom</option>
        </select>
        {selectValue === CUSTOM_OPTION_VALUE && (
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Nom de la convention collective"
            className="input mt-1"
          />
        )}
        <p className="text-xs text-ink-500">
          Liste limitée à une sélection de conventions parmi les plus courantes (~1 000
          conventions existent au total en France) — sert uniquement à un contrôle de
          cohérence avec le texte détecté sur les fiches, jamais à déduire un barème chiffré.
        </p>
      </div>

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
