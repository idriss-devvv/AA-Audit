"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isDemoId } from "@/lib/demo-data";

/**
 * Suppression d'une fiche de paie, après confirmation. Le fichier et les
 * données extraites sont effacés définitivement.
 */
export function DeletePayslipButton({
  payslipId,
  label,
  redirectTo,
  onDeleted,
  compact = false,
}: {
  payslipId: string;
  label: string;
  redirectTo?: string;
  onDeleted?: () => void;
  compact?: boolean;
}) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function remove() {
    if (isDemoId(payslipId)) {
      setError("Les fiches d'exemple ne peuvent pas être supprimées.");
      return;
    }
    setPending(true);
    setError(null);
    const res = await fetch(`/api/payslips/${payslipId}`, { method: "DELETE" }).catch(() => null);
    setPending(false);
    if (!res?.ok) {
      const data = await res?.json().catch(() => ({}));
      setError(data?.error || "Suppression impossible, réessayez.");
      return;
    }
    setConfirming(false);
    onDeleted?.();
    if (redirectTo) router.push(redirectTo);
    router.refresh();
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className={
          compact
            ? "text-sm font-semibold text-rose-600 transition hover:text-rose-800"
            : "inline-flex items-center gap-2 rounded-full border border-rose-200 bg-white px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-50"
        }
      >
        Supprimer
      </button>
    );
  }

  return (
    <div role="alertdialog" aria-label="Confirmer la suppression" className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm">
      <p className="font-medium text-rose-800">Supprimer « {label} » ?</p>
      <p className="mt-1 text-xs text-rose-700">
        Le fichier, les données lues et les anomalies seront effacés définitivement. La fiche reste
        comptée dans le quota du mois.
      </p>
      {error && <p className="mt-2 text-xs font-medium text-rose-800">{error}</p>}
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={remove}
          disabled={pending}
          className="rounded-full bg-rose-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-rose-700 disabled:opacity-60"
        >
          {pending ? "Suppression…" : "Oui, supprimer"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          disabled={pending}
          className="rounded-full px-4 py-1.5 text-xs font-semibold text-ink-600 transition hover:bg-white"
        >
          Annuler
        </button>
      </div>
    </div>
  );
}
