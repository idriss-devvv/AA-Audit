"use client";

import { useState } from "react";

export function SubscribeButton({
  priceId,
  label = "S'abonner",
  variant = "primary",
}: {
  priceId: string;
  label?: string;
  variant?: "primary" | "outline";
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
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json().catch(() => ({}));

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

  const base = "w-full rounded-full px-6 py-3 text-sm font-semibold transition";
  const styles =
    variant === "primary"
      ? "bg-blue-600 text-beige-50 hover:bg-blue-700"
      : "border border-beige-300 bg-white text-ink-900 hover:border-blue-400 hover:text-blue-600";

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className={`${base} ${styles} disabled:opacity-60`}
      >
        {loading ? "Redirection…" : label}
      </button>
      {error && <p className="text-center text-xs text-red-600">{error}</p>}
    </div>
  );
}
