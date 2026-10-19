"use client";

import { useId, useRef, useState } from "react";
import Link from "next/link";
import { DEMO_UPLOAD_MESSAGE } from "@/lib/demo-data";

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
 *
 * Version de démonstration : l'analyse est en cours de développement, le
 * fichier choisi n'est pas envoyé et un message l'indique.
 */
export function PayslipUploadButton({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

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
          if (file) setFileName(file.name);
          if (inputRef.current) inputRef.current.value = "";
        }}
        className="hidden"
      />

      <label
        htmlFor={inputId}
        className={`btn-primary cursor-pointer gap-2.5 ${compact ? "px-5 py-2.5 text-sm" : "gap-3 px-8 py-4 text-[15px]"}`}
      >
        <UploadIcon />
        {compact ? "Importer une fiche" : "Importer une fiche de paie"}
      </label>

      {!compact && <p className="text-xs text-ink-400">PDF de votre logiciel de paie — 10&nbsp;Mo max, traitement sécurisé</p>}

      <div aria-live="polite" className={`max-w-md text-sm ${compact ? "sm:text-right" : "text-center"}`}>
        {fileName && (
          <div className="rounded-xl bg-blue-50 px-4 py-3 text-left text-blue-800 ring-1 ring-inset ring-blue-200">
            <p className="font-semibold">Fonctionnalité en cours de développement — bientôt disponible</p>
            <p className="mt-1">
              {fileName} n&apos;a pas été importé. {DEMO_UPLOAD_MESSAGE}
            </p>
            <div className="mt-2 flex flex-wrap gap-3 text-xs font-semibold">
              <Link href="/app/fiches" className="underline underline-offset-2">
                Voir les fiches d&apos;exemple
              </Link>
              <button type="button" onClick={() => setFileName(null)} className="underline underline-offset-2">
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
