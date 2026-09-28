"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const ICON_PATHS: Record<string, React.ReactNode> = {
  "/app/dashboard": (
    <>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </>
  ),
  "/app/clients": (
    <>
      <rect x="4" y="3" width="16" height="18" rx="1.5" />
      <path d="M9 7h1M14 7h1M9 11h1M14 11h1M9 15h1M14 15h1" />
    </>
  ),
  "/app/salaries": (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  "/app/admin": (
    <>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="M9.5 12.5 11 14l3.5-3.5" />
    </>
  ),
  "/app/fiches": (
    <>
      <path d="M14 3H7a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7l-4-4Z" />
      <path d="M14 3v4h4M9 13h6M9 17h4" />
    </>
  ),
  "/app/parametres": (
    <>
      <path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0" />
      <circle cx="16" cy="6" r="2" />
      <circle cx="10" cy="12" r="2" />
      <circle cx="18" cy="18" r="2" />
    </>
  ),
};

export type NavAccess = {
  companies: boolean;
  employees: boolean;
  admin: boolean;
  companiesLabel: string;
};

function navItemsFor(access: NavAccess) {
  // Onglets affichés selon la formule (Sociétés : Entreprise ; Salariés : Pro
  // et Entreprise) et le rôle (Administration : super admin et admin).
  return [
    { href: "/app/dashboard", label: "Tableau de bord", short: "Accueil" },
    { href: "/app/fiches", label: "Fiches de paie", short: "Fiches" },
    ...(access.employees ? [{ href: "/app/salaries", label: "Salariés", short: "Salariés" }] : []),
    ...(access.companies ? [{ href: "/app/clients", label: access.companiesLabel, short: "Sociétés" }] : []),
    { href: "/app/parametres", label: "Paramètres", short: "Paramètres" },
    ...(access.admin ? [{ href: "/app/admin", label: "Administration", short: "Admin" }] : []),
  ];
}

function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  if (href === "/app/fiches" && pathname.startsWith("/app/historique")) return true;
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavIcon({ href, active, className = "h-[18px] w-[18px]" }: { href: string; active: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${className} shrink-0 transition ${active ? "text-blue-600" : "text-ink-400 group-hover:text-ink-600"}`}
      aria-hidden
    >
      {ICON_PATHS[href]}
    </svg>
  );
}

/** Barre latérale (bureau). */
export function SidebarNav({ access }: { access: NavAccess }) {
  const pathname = usePathname();
  const navItems = navItemsFor(access);

  return (
    <nav aria-label="Navigation principale" className="flex flex-col gap-0.5 print:hidden">
      {navItems.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`group relative flex shrink-0 items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium transition ${
              active
                ? "bg-white text-ink-900 shadow-soft ring-1 ring-ink-200/70"
                : "text-ink-500 hover:bg-white/60 hover:text-ink-900"
            }`}
          >
            <NavIcon href={item.href} active={active} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * Barre de navigation mobile, fixée en bas de l'écran : 5 entrées au plus,
 * les suivantes dans « Plus ».
 */
export function MobileNav({ access }: { access: NavAccess }) {
  const pathname = usePathname();
  const navItems = navItemsFor(access);
  const [moreOpen, setMoreOpen] = useState(false);
  const primary = navItems.length > 5 ? navItems.slice(0, 4) : navItems;
  const overflow = navItems.length > 5 ? navItems.slice(4) : [];
  const overflowActive = overflow.some((item) => isActive(pathname, item.href));

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ink-200/70 bg-beige-50/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl print:hidden md:hidden"
    >
      {moreOpen && overflow.length > 0 && (
        <div className="absolute bottom-full right-2 mb-2 w-52 rounded-2xl border border-ink-200/70 bg-white p-1.5 shadow-lift">
          {overflow.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMoreOpen(false)}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-beige-50"
            >
              <NavIcon href={item.href} active={isActive(pathname, item.href)} />
              {item.label}
            </Link>
          ))}
        </div>
      )}
      <div className="flex">
        {primary.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={`group flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium ${active ? "text-ink-900" : "text-ink-500"}`}
            >
              <NavIcon href={item.href} active={active} className="h-5 w-5" />
              {item.short}
            </Link>
          );
        })}
        {overflow.length > 0 && (
          <button
            type="button"
            onClick={() => setMoreOpen((v) => !v)}
            aria-expanded={moreOpen}
            className={`group flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium ${overflowActive ? "text-ink-900" : "text-ink-500"}`}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className={`h-5 w-5 ${overflowActive ? "text-blue-600" : "text-ink-400"}`} aria-hidden>
              <circle cx="5" cy="12" r="1.8" />
              <circle cx="12" cy="12" r="1.8" />
              <circle cx="19" cy="12" r="1.8" />
            </svg>
            Plus
          </button>
        )}
      </div>
    </nav>
  );
}
