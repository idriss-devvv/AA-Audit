"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddClientForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Une erreur est survenue, réessayez.");
        return;
      }

      setName("");
      router.refresh();
    } catch {
      setError("Une erreur est survenue, réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex flex-1 flex-col gap-1.5">
        <label htmlFor="client-name" className="field-label">
          Nom de l&apos;entreprise cliente
        </label>
        <input
          id="client-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex : Boulangerie Martin"
          required
          className="input"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="btn-primary py-2.5"
      >
        {loading ? "Ajout…" : "Ajouter le client"}
      </button>
      {error && <p className="text-sm text-red-600 sm:basis-full">{error}</p>}
    </form>
  );
}
