"use client";

import { useRef, useState } from "react";

type UploadState = "idle" | "uploading" | "success" | "error";

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
      className="h-6 w-6"
    >
      <path d="M12 16V4" />
      <path d="M6 10l6-6 6 6" />
      <path d="M4 20h16" />
    </svg>
  );
}

export function PayslipUploadButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<UploadState>("idle");
  const [fileName, setFileName] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    setErrorMessage(null);
    setStatus("uploading");

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

      setStatus("success");
    } catch {
      setErrorMessage("Une erreur est survenue, réessayez.");
      setStatus("error");
    } finally {
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
        className="flex cursor-pointer items-center gap-3 rounded-full bg-blue-600 px-10 py-5 text-lg font-bold text-beige-50 shadow-soft transition hover:bg-blue-700 active:scale-[0.98]"
      >
        <UploadIcon />
        Importer ma fiche de paie
      </label>

      <p className="text-xs text-ink-500">
        PDF, JPG ou PNG — 10&nbsp;Mo max, traitement sécurisé
      </p>

      {status === "uploading" && (
        <p className="text-sm font-medium text-blue-600">
          Envoi de {fileName}…
        </p>
      )}
      {status === "success" && (
        <p className="text-sm font-medium text-blue-600">
          {fileName} reçu ✓ — l&apos;analyse automatique arrive bientôt.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm font-medium text-red-600">{errorMessage}</p>
      )}
    </div>
  );
}
