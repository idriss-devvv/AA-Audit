"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

/**
 * Barre de progression fine en haut de l'écran pendant les changements de
 * page. Next.js ne signale pas le début d'une navigation : on démarre la
 * barre au clic sur un lien interne, puis on la termine quand l'URL affichée
 * change (nouvelle page rendue).
 */
export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const trickle = useRef<ReturnType<typeof setInterval> | null>(null);
  const hide = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Démarrage : clic sur un lien interne vers une autre page.
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

      if (hide.current) clearTimeout(hide.current);
      if (trickle.current) clearInterval(trickle.current);
      setVisible(true);
      setProgress(12);
      // Avance de plus en plus lentement sans jamais atteindre 100 %.
      trickle.current = setInterval(() => {
        setProgress((p) => (p < 90 ? p + (90 - p) * 0.12 : p));
      }, 180);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Fin : la nouvelle page est affichée.
  useEffect(() => {
    if (trickle.current) clearInterval(trickle.current);
    trickle.current = null;
    setProgress((p) => (p > 0 ? 100 : 0));
    hide.current = setTimeout(() => {
      setVisible(false);
      setProgress(0);
    }, 350);
    return () => {
      if (hide.current) clearTimeout(hide.current);
    };
  }, [pathname, searchParams]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[100] h-[2.5px] print:hidden"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 300ms ease" }}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-blue-400 to-blue-600 shadow-[0_0_10px_rgba(53,89,143,0.55)]"
        style={{
          width: `${progress}%`,
          transition: progress === 0 ? "none" : "width 220ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}
