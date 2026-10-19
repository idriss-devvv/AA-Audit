"use client";

import { useEffect, useRef, useState } from "react";
import { demoFileUrl, isDemoId } from "@/lib/demo-data";

export function EyeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function fileUrl(payslipId: string) {
  if (isDemoId(payslipId)) return demoFileUrl(payslipId);
  return `/api/payslips/${payslipId}/file`;
}

/** Aperçu du fichier d'origine (PDF ou image) servi par un lien signé. */
export function PayslipFileFrame({ payslipId, mimeType, title }: { payslipId: string; mimeType: string | null; title: string }) {
  const src = fileUrl(payslipId);
  if (mimeType?.startsWith("image/")) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={title} className="mx-auto max-h-full w-auto rounded-lg object-contain" />;
  }
  return <iframe src={src} title={title} className="h-full w-full rounded-lg border-0 bg-white" />;
}

/**
 * Bouton « œil » : ouvre la fiche de paie d'origine dans un panneau latéral,
 * sans quitter la page.
 */
export function PayslipPreviewButton({
  payslipId,
  mimeType,
  title,
  variant = "icon",
}: {
  payslipId: string;
  mimeType: string | null;
  title: string;
  variant?: "icon" | "button";
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          aria-label={`Voir la fiche de paie : ${title}`}
          title="Voir la fiche de paie"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-500 transition hover:border-ink-300 hover:text-ink-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-600"
        >
          <EyeIcon />
        </button>
      ) : (
        <button type="button" onClick={() => setOpen(true)} className="btn-secondary gap-2 px-4 py-2">
          <EyeIcon />
          Voir la fiche
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-50 flex justify-end print:hidden" role="dialog" aria-modal="true" aria-label={`Fiche de paie : ${title}`}>
          <button type="button" aria-label="Fermer l'aperçu" className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
          <div className="relative flex h-full w-full max-w-3xl flex-col bg-beige-50 shadow-lift">
            <div className="flex items-center justify-between gap-3 border-b border-ink-200/70 px-5 py-3">
              <p className="min-w-0 truncate text-sm font-semibold text-ink-900">{title}</p>
              <div className="flex shrink-0 items-center gap-2">
                <a href={fileUrl(payslipId)} target="_blank" rel="noopener noreferrer" className="btn-secondary px-3 py-1.5 text-xs">
                  Ouvrir dans un onglet
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Fermer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-500 transition hover:bg-beige-100 hover:text-ink-900"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4" aria-hidden>
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="min-h-0 flex-1 p-3">
              <PayslipFileFrame payslipId={payslipId} mimeType={mimeType} title={title} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
