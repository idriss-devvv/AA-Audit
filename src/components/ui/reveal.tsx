"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Délai en millisecondes avant le déclenchement de l'animation. */
  delay?: number;
};

/**
 * Fait apparaître son contenu en fondu + léger décalage vertical dès qu'il
 * entre dans le viewport (IntersectionObserver). Pas de dépendance externe :
 * animation pilotée par les classes Tailwind `animate-fade-in-up` déjà
 * définies dans tailwind.config.ts.
 *
 * Respecte `prefers-reduced-motion` : si l'utilisateur préfère un mouvement
 * réduit, le contenu est affiché directement sans animation.
 */
export function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={visible ? { animationDelay: `${delay}ms` } : undefined}
      className={`${visible ? "animate-fade-in-up" : "opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}
