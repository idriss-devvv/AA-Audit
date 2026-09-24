"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { LogoMark } from "@/components/ui/logo";

/** Délai avant affichage : une navigation instantanée ne fait pas clignoter le loader. */
const SHOW_DELAY_MS = 120;

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
      showTimer.current = setTimeout(() => setVisible(true), SHOW_DELAY_MS);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
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
      <div className="relative flex h-16 w-16 items-center justify-center">
        <span className="absolute inset-0 rounded-full border-[3px] border-ink-200/70" />
        <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-blue-600 [animation-duration:0.8s]" />
        <LogoMark className="h-7 w-7" />
      </div>
      <span className="sr-only">{visible ? "Chargement de la page…" : ""}</span>
    </div>
  );
}
