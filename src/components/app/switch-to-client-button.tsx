"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SwitchToClientButton({ companyId }: { companyId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const res = await fetch("/api/clients/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId }),
      });
      if (res.ok) {
        router.push("/app/dashboard");
        router.refresh();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="btn border border-blue-100 bg-blue-50 px-4 py-1.5 text-xs text-blue-600 hover:border-blue-200 hover:bg-blue-100"
    >
      {loading ? "Ouverture…" : "Consulter"}
    </button>
  );
}
