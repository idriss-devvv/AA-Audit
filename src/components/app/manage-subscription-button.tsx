"use client";

import { useState } from "react";

export function ManageSubscriptionButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/billing/portal", { method: "POST" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.error || "Impossible d'ouvrir la gestion d'abonnement.");
        setLoading(false);
        return;
      }

      window.location.href = data.url || data.redirect || "/#tarifs";
    } catch {
      setError("Impossible d'ouvrir la gestion d'abonnement.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded-full border border-beige-300 bg-white px-5 py-2 text-xs font-semibold text-ink-900 transition hover:border-blue-400 hover:text-blue-600 disabled:opacity-60"
      >
        {loading ? "Ouverture…" : "Gérer mon abonnement"}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
