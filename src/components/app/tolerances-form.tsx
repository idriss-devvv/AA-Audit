"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_TOLERANCES, TOLERANCE_FIELDS, type Tolerances } from "@/lib/rules/tolerances";

/** Seuils de tolérance de la détection d'anomalies, propres à l'entreprise active. */
export function TolerancesForm({ initial }: { initial: Partial<Tolerances> }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(TOLERANCE_FIELDS.map(({ key }) => [key, initial[key] === undefined ? "" : String(initial[key])]))
  );
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  async function save(next: Record<string, string>) {
    setLoading(true);
    setFeedback(null);
    const res = await fetch("/api/settings/tolerances", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(next),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setLoading(false);
    if (!res || !res.ok) {
      setFeedback({ tone: "error", text: data.error || "Échec de l'enregistrement." });
      return;
    }
    setFeedback({ tone: "ok", text: "Seuils enregistrés. Ils s'appliquent aux prochaines fiches analysées." });
    router.refresh();
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save(values);
      }}
      className="mt-4 flex flex-col gap-4"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {TOLERANCE_FIELDS.map(({ key, label, unit, step }) => (
          <label key={key} className="flex flex-col gap-1.5">
            <span className="field-label">
              {label} ({unit})
            </span>
            <input
              type="number"
              min="0"
              step={step}
              value={values[key]}
              placeholder={`${DEFAULT_TOLERANCES[key].toLocaleString("fr-FR")} (par défaut)`}
              onChange={(e) => setValues((v) => ({ ...v, [key]: e.target.value }))}
              className="input"
            />
          </label>
        ))}
      </div>

      {feedback && (
        <p role="status" className={`text-sm ${feedback.tone === "ok" ? "text-green-600" : "text-red-600"}`}>
          {feedback.text}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={loading} className="btn-primary px-5 py-2.5">
          {loading ? "Enregistrement…" : "Enregistrer les seuils"}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => {
            const empty = Object.fromEntries(TOLERANCE_FIELDS.map(({ key }) => [key, ""]));
            setValues(empty);
            save(empty);
          }}
          className="btn btn-sm border border-ink-200 bg-white"
        >
          Revenir aux valeurs par défaut
        </button>
      </div>
    </form>
  );
}
