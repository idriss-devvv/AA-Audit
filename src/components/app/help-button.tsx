"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { SupportContact } from "@/lib/support";

/**
 * Bouton « Aide » de l'espace /app : coordonnées d'assistance du cabinet qui
 * commercialise le SaaS (réglées dans l'Administration), à défaut la page Contact.
 */
export function HelpButton({ contact }: { contact: SupportContact }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasContact = Boolean(contact.email || contact.phone || contact.url);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label="Aide et assistance"
        className="flex h-10 items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 text-xs font-semibold text-ink-700 transition hover:border-ink-300"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6V14" />
          <path d="M12 17.5h.01" />
        </svg>
        <span className="hidden sm:inline">Aide</span>
      </button>

      {open && (
        <div role="dialog" aria-label="Assistance" className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border border-ink-200/70 bg-white p-4 shadow-lift">
          <p className="text-sm font-semibold text-ink-900">Besoin d&apos;aide ?</p>
          <p className="mt-1 text-xs text-ink-500">
            {contact.name ? `Contactez ${contact.name}.` : "Contactez votre cabinet."}
            {contact.hours ? ` ${contact.hours}` : ""}
          </p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            {contact.email && (
              <a href={`mailto:${contact.email}`} className="font-medium text-blue-700 underline-offset-4 hover:underline">
                {contact.email}
              </a>
            )}
            {contact.phone && (
              <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="font-medium text-blue-700 underline-offset-4 hover:underline">
                {contact.phone}
              </a>
            )}
            {contact.url && (
              <a href={contact.url} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-700 underline-offset-4 hover:underline">
                Page d&apos;assistance
              </a>
            )}
            {!hasContact && (
              <Link href="/contact" onClick={() => setOpen(false)} className="font-medium text-blue-700 underline-offset-4 hover:underline">
                Nous écrire
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
