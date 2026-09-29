"use client";

import { useState } from "react";
import type { Billing, PlanId } from "@/lib/plans";

export function SubscribeButton({
  plan,
  label = "S'abonner",
  variant = "primary",
  billing = "monthly",
}: {
  plan: PlanId;
  billing?: Billing;
  label?: string;
  variant?: "primary" | "outline" | "inverse";
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, billing }),
      });
      const data = await res.json().catch(() => ({}));

      // Visiteur non connecté : inscription d'abord, la formule est conservée dans l'URL.
      if (data.redirect) {
        window.location.href = data.redirect;
        return;
      }

      if (!res.ok || !data.url) {
        setError(data.error || "Paiement indisponible pour le moment.");
        setLoading(false);
        return;
      }

      window.location.href = data.url;
    } catch {
      setError("Paiement indisponible pour le moment.");
      setLoading(false);
    }
  }

  const styles =
    variant === "primary"
      ? "btn-primary w-full"
      : variant === "inverse"
        ? "btn w-full bg-beige-50 px-6 py-3 text-blue-800 hover:bg-white active:scale-[0.98]"
        : "btn-secondary w-full";

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={styles}
      >
        {loading ? "Redirection…" : label}
      </button>
      {error && <p className="text-center text-xs text-red-600">{error}</p>}
    </div>
  );
}
