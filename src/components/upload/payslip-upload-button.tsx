"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { hideNavigationLoader, showNavigationLoader } from "@/components/ui/navigation-loader";
import { AGREEMENT_UNAVAILABLE_MESSAGE } from "@/lib/collective-agreement-detection";

type UploadState = "idle" | "uploading" | "success" | "error" | "duplicate";

type UploadResult = {
  status: "processed" | "pending" | "error";
  isImage?: boolean;
  errorMessage?: string | null;
  anomaliesCount?: number;
  agreementUnavailable?: boolean;
};

function UploadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
      <path d="M12 16V4" />
      <path d="M6 10l6-6 6 6" />
      <path d="M4 20h16" />
    </svg>
  );
}

/**
 * Import d'une fiche de paie. `variant="compact"` : bouton d'en-tête de page,
 * messages alignés à droite.
 */
export function PayslipUploadButton({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const router = useRouter();
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingFile = useRef<File | null>(null);
  const [status, setStatus] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [duplicateId, setDuplicateId] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  async function upload(file: File, force = false) {
    setFileName(file.name);
    setMessage(null);
    setResult(null);
    setDuplicateId(null);
    setStatus("uploading");
    showNavigationLoader("Analyse de la fiche de paie…");

    const formData = new FormData();
    formData.append("file", file);
    if (force) formData.append("force", "1");

    try {
      const res = await fetch("/api/payslips/upload", { method: "POST", body: formData });
      const data = await res.json().catch(() => ({}));

      if (res.status === 409 && data.code === "DUPLICATE") {
        pendingFile.current = file;
        setDuplicateId(data.existingId ?? null);
        setMessage(data.error);
        setStatus("duplicate");
        return;
      }
      if (!res.ok) {
        setMessage(data.error || "Une erreur est survenue, réessayez.");
        setStatus("error");
        return;
      }

      pendingFile.current = null;
      setResult(data);
      setStatus("success");
      router.refresh();
    } catch {
      setMessage("Une erreur est survenue, réessayez.");
      setStatus("error");
    } finally {
      hideNavigationLoader();
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  function successText(): string {
    if (!result) return "";
    if (result.isImage) {
      return `${fileName} reçu ✓ — l'analyse des photos et scans arrive bientôt (non décompté du quota). Importez le PDF de votre logiciel de paie pour une analyse immédiate.`;
    }
    if (result.status === "error") {
      return `${fileName} n'a pas pu être lu. ${result.errorMessage ?? ""}`.trim();
    }
    if (result.status === "processed") {
      return result.anomaliesCount && result.anomaliesCount > 0
        ? `${fileName} analysé ✓ — ${result.anomaliesCount} anomalie${result.anomaliesCount > 1 ? "s" : ""} détectée${result.anomaliesCount > 1 ? "s" : ""}.`
        : `${fileName} analysé ✓ — aucune anomalie détectée.`;
    }
    return `${fileName} reçu ✓ — analyse en attente.`;
  }

  const compact = variant === "compact";

  return (
    <div className={`flex flex-col gap-3 ${compact ? "items-start sm:items-end" : "items-center"}`}>
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) upload(file);
        }}
        className="hidden"
      />

      <label
        htmlFor={inputId}
        aria-disabled={status === "uploading"}
        className={`btn-primary cursor-pointer gap-2.5 ${compact ? "px-5 py-2.5 text-sm" : "gap-3 px-8 py-4 text-[15px]"} ${status === "uploading" ? "pointer-events-none opacity-70" : ""}`}
      >
        <UploadIcon />
        {status === "uploading" ? "Analyse en cours…" : compact ? "Importer une fiche" : "Importer une fiche de paie"}
      </label>

      {!compact && <p className="text-xs text-ink-400">PDF de votre logiciel de paie — 10&nbsp;Mo max, traitement sécurisé</p>}

      <div aria-live="polite" className={`max-w-md text-sm ${compact ? "sm:text-right" : "text-center"}`}>
        {status === "success" && (
          <p className={`font-medium ${result?.status === "error" ? "text-rose-700" : "text-blue-700"}`}>
            {successText()}{" "}
            {result?.status === "processed" && (
              <Link href="/app/fiches" className="font-semibold underline underline-offset-2">
                Voir les fiches
              </Link>
            )}
          </p>
        )}
        {status === "success" && result?.agreementUnavailable && (
          <p className="mt-1 font-medium text-amber-700">
            {AGREEMENT_UNAVAILABLE_MESSAGE} Les contrôles propres à la convention collective n&apos;ont pas été appliqués.
          </p>
        )}
        {status === "duplicate" && (
          <div className="rounded-xl bg-amber-50 px-4 py-3 text-left text-amber-800 ring-1 ring-inset ring-amber-200">
            <p className="font-medium">{message}</p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold">
              {duplicateId && (
                <Link href={`/app/historique/${duplicateId}`} className="underline underline-offset-2">
                  Voir la fiche existante
                </Link>
              )}
              <button type="button" onClick={() => pendingFile.current && upload(pendingFile.current, true)} className="underline underline-offset-2">
                Importer quand même
              </button>
            </div>
          </div>
        )}
        {status === "error" && <p className="font-medium text-rose-700">{message}</p>}
      </div>
    </div>
  );
}
