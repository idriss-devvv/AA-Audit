"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type CompanySwitcherOption = { id: string; name: string };

export function CompanySwitcher({
  ownCompanyId,
  ownCompanyName,
  clients,
  activeCompanyId,
}: {
  ownCompanyId: string;
  ownCompanyName: string;
  clients: CompanySwitcherOption[];
  activeCompanyId: string;
}) {
  const router = useRouter();
  const [switching, setSwitching] = useState(false);

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const companyId = e.target.value;
    if (companyId === activeCompanyId) return;

    setSwitching(true);
    try {
      const res = await fetch("/api/clients/switch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyId }),
      });
      if (res.ok) {
        router.refresh();
      }
    } finally {
      setSwitching(false);
    }
  }

  return (
    <label className="flex items-center gap-2 text-xs text-ink-500">
      <span className="hidden sm:inline">Client affiché</span>
      <select
        value={activeCompanyId}
        onChange={handleChange}
        disabled={switching}
        className="rounded-lg border border-beige-200 bg-white px-3 py-1.5 text-sm font-medium text-ink-900 outline-none focus:border-blue-400 disabled:opacity-60"
      >
        <option value={ownCompanyId}>{ownCompanyName} (cabinet)</option>
        {clients.map((client) => (
          <option key={client.id} value={client.id}>
            {client.name}
          </option>
        ))}
      </select>
    </label>
  );
}
