"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

/**
 * Boutons du header du site vitrine. La session est lue dans le navigateur
 * (cookie local, sans appel réseau) : les pages publiques restent statiques
 * et servies par le CDN au lieu d'être recalculées à chaque visite.
 */
export function HeaderAuthButtons() {
  const [signedIn, setSignedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth
      .getSession()
      .then(({ data }) => setSignedIn(Boolean(data.session)))
      .catch(() => setSignedIn(false));
    const { data } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session)));
    return () => data.subscription.unsubscribe();
  }, []);

  if (signedIn) {
    return (
      <Link href="/app/dashboard" className="btn-dark whitespace-nowrap px-4 py-2 text-[13px] sm:px-5">
        Dashboard
      </Link>
    );
  }

  // Tant que la session n'est pas connue, les boutons gardent leur place sans
  // s'afficher (pas de saut de mise en page).
  return (
    <div className={`flex items-center gap-2 transition-opacity ${signedIn === null ? "opacity-0" : "opacity-100"}`}>
      <Link
        href="/connexion"
        className="whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold text-ink-700 transition hover:text-ink-900 sm:px-4"
      >
        Se connecter
      </Link>
      <Link href="/inscription" className="btn-dark whitespace-nowrap px-4 py-2 text-[13px] sm:px-5">
        S&apos;inscrire
      </Link>
    </div>
  );
}
