"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

/**
 * Menu du compte utilisateur (la personne connectée, pas un salarié) :
 * identité, formule, paramètres et déconnexion au même endroit.
 */
export function AccountMenu({ email, subtitle }: { email: string; subtitle: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const initial = (email || "?").charAt(0).toUpperCase();

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

  async function logout() {
    await createClient().auth.signOut();
    window.location.href = "/connexion";
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label="Mon compte"
        className="flex items-center gap-2 rounded-full border border-ink-200 bg-white py-1 pl-1 pr-3 transition hover:border-ink-300"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-xs font-semibold text-beige-50">
          {initial}
        </span>
        <span className="hidden max-w-[12rem] truncate text-xs font-medium text-ink-700 sm:block">{email}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-3.5 w-3.5 text-ink-400" aria-hidden>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-ink-200/70 bg-white p-1.5 shadow-lift">
          <div className="px-3 py-2.5">
            <p className="truncate text-sm font-medium text-ink-900">{email}</p>
            <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">{subtitle}</p>
          </div>
          <div className="my-1 h-px bg-ink-100" />
          <Link role="menuitem" href="/app/parametres" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-ink-700 hover:bg-beige-50">
            Paramètres du compte
          </Link>
          <Link role="menuitem" href="/app/parametres?onglet=abonnement" onClick={() => setOpen(false)} className="block rounded-xl px-3 py-2 text-sm text-ink-700 hover:bg-beige-50">
            Abonnement
          </Link>
          <div className="my-1 h-px bg-ink-100" />
          <button role="menuitem" type="button" onClick={logout} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-rose-700 hover:bg-rose-50">
            Se déconnecter
          </button>
        </div>
      )}
    </div>
  );
}
