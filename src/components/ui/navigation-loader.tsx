"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LogoMark } from "@/components/ui/logo";

/** Délai avant affichage : une navigation instantanée ne fait pas clignoter le loader. */
const SHOW_DELAY_MS = 120;

const SHOW_EVENT = "payaudit:loader-show";
const HIDE_EVENT = "payaudit:loader-hide";

/**
 * Affiche le loader pour une action qui ne passe pas par un lien : envoi de
 * formulaire, redirection après connexion, OAuth, import de fichier…
 * Le message optionnel s'affiche sous l'anneau (ex. « Analyse en cours… »).
 */
export function showNavigationLoader(message?: string) {
  window.dispatchEvent(new CustomEvent<string | undefined>(SHOW_EVENT, { detail: message }));
}

/** Masque le loader (ex. : la connexion a échoué, on reste sur la page). */
export function hideNavigationLoader() {
  window.dispatchEvent(new Event(HIDE_EVENT));
}

/**
 * Loader centré affiché pendant les changements de page. Next.js ne signale
 * pas le début d'une navigation : il apparaît au clic sur un lien interne et
 * disparaît quand l'URL affichée change, c'est-à-dire quand la nouvelle page
 * est rendue.
 */
export function NavigationLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const showTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as HTMLElement | null)?.closest("a");
      if (!anchor || anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      // Ancre sur la même page (#faq…) : pas de chargement.
      if (url.pathname === window.location.pathname && url.search === window.location.search) return;
      // Exports Excel et autres routes d'API : téléchargement, pas de navigation.
      if (url.pathname.startsWith("/api/")) return;

      if (showTimer.current) clearTimeout(showTimer.current);
      setMessage(null);
      showTimer.current = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    }

    function onShow(event: Event) {
      if (showTimer.current) clearTimeout(showTimer.current);
      showTimer.current = null;
      setMessage((event as CustomEvent<string | undefined>).detail ?? null);
      setVisible(true);
    }
    function onHide() {
      if (showTimer.current) clearTimeout(showTimer.current);
      showTimer.current = null;
      setVisible(false);
    }

    document.addEventListener("click", onClick, true);
    window.addEventListener(SHOW_EVENT, onShow);
    window.addEventListener(HIDE_EVENT, onHide);
    // Retour arrière depuis une page quittée par redirection : pas de loader figé.
    window.addEventListener("pageshow", onHide);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener(SHOW_EVENT, onShow);
      window.removeEventListener(HIDE_EVENT, onHide);
      window.removeEventListener("pageshow", onHide);
    };
  }, []);

  // La nouvelle page est affichée : on masque le loader.
  useEffect(() => {
    if (showTimer.current) clearTimeout(showTimer.current);
    showTimer.current = null;
    setVisible(false);
  }, [pathname, searchParams]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-hidden={!visible}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-beige-50/55 backdrop-blur-[2px] transition-opacity duration-200 print:hidden ${
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-4">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <span className="absolute inset-0 rounded-full border-[3px] border-ink-200/70" />
          <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-blue-600 [animation-duration:0.8s]" />
          <LogoMark className="h-7 w-7" />
        </div>
        {message ? (
          <p className="rounded-full bg-white/80 px-4 py-1.5 text-sm font-medium text-ink-700 shadow-soft ring-1 ring-ink-200/70">
            {message}
          </p>
        ) : (
          <span className="sr-only">{visible ? "Chargement de la page…" : ""}</span>
        )}
      </div>
    </div>
  );
}
