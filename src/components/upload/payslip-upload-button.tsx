"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { hideNavigationLoader, showNavigationLoader } from "@/components/ui/navigation-loader";

type UploadState = "idle" | "uploading" | "success" | "error";

type UploadResult = {
  status: "processed" | "pending" | "error";
  anomaliesCount?: number;
};

function UploadIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M12 16V4" />
      <path d="M6 10l6-6 6 6" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function PayslipUploadButton() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [result, setResult] = useState<UploadResult | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setErrorMessage(null);
    setResult(null);
    setStatus("uploading");
    showNavigationLoader("Analyse de la fiche de paie…");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/payslips/upload", {
        method: "POST",
        body: formData,
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setErrorMessage(data.error || "Une erreur est survenue, réessayez.");
        setStatus("error");
        return;
      }

      setResult(data);
      setStatus("success");
      router.refresh();
    } catch {
      setErrorMessage("Une erreur est survenue, réessayez.");
      setStatus("error");
    } finally {
      hideNavigationLoader();
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        ref={inputRef}
        id="payslip-upload-input"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
        onChange={handleFileChange}
        className="hidden"
      />

      <label
        htmlFor="payslip-upload-input"
        className="btn-primary cursor-pointer gap-3 px-8 py-4 text-[15px]"
      >
        <UploadIcon />
        Importer ma fiche de paie
      </label>

      <p className="text-xs text-ink-400">
        PDF, JPG ou PNG — 10&nbsp;Mo max, traitement sécurisé
      </p>

      {status === "uploading" && (
        <p className="text-sm font-medium text-blue-600">
          Envoi de {fileName}…
        </p>
      )}
      {status === "success" && (
        <p className="text-sm font-medium text-blue-600">
          {result?.status === "processed"
            ? result.anomaliesCount && result.anomaliesCount > 0
              ? `${fileName} analysé ✓ — ${result.anomaliesCount} anomalie(s) détectée(s), consultez l'onglet Anomalies.`
              : `${fileName} analysé ✓ — aucune anomalie détectée.`
            : `${fileName} reçu ✓ — stocké en sécurité, analyse en attente.`}
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
