"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/** Ajout manuel d'un salarié dans la société affichée (onglet Salariés). */
export function AddEmployeeForm() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/employees", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName }),
    }).catch(() => null);
    const data = res ? await res.json().catch(() => ({})) : {};
    setLoading(false);
    if (!res || !res.ok) {
      setError(data.error || "Ajout impossible, réessayez.");
      return;
    }
    setFirstName("");
    setLastName("");
    setOpen(false);
    router.refresh();
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn-primary">
        + Ajouter un salarié
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card flex w-full flex-col gap-3 p-5 sm:w-auto sm:flex-row sm:items-end">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="employee-first-name" className="field-label">Prénom</label>
        <input id="employee-first-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required className="input sm:w-44" />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="employee-last-name" className="field-label">Nom</label>
        <input id="employee-last-name" value={lastName} onChange={(e) => setLastName(e.target.value)} required className="input sm:w-44" />
      </div>
      <div className="flex gap-2">
        <button type="submit" disabled={loading} className="btn-primary py-2.5">
          {loading ? "Ajout…" : "Ajouter"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="btn-secondary py-2.5">
          Annuler
        </button>
      </div>
      {error && <p className="text-sm text-red-600 sm:basis-full">{error}</p>}
    </form>
  );
}
