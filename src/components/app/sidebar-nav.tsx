"use client";

import Link from "next/link";
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
  "/app/historique": (
    <>
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5M12 7v5l3 2" />
    </>
  ),
  "/app/anomalies": (
    <>
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4M12 17h.01" />
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

export function SidebarNav({
  access,
  orientation = "vertical",
}: {
  access: NavAccess;
  orientation?: "vertical" | "horizontal";
}) {
  const pathname = usePathname();
  // Onglets affichés selon la formule (Sociétés : Entreprise ; Salariés : Pro
  // et Entreprise) et le rôle (Administration : admin et gestionnaire).
  const navItems = [
    { href: "/app/dashboard", label: "Accueil" },
    ...(access.companies ? [{ href: "/app/clients", label: access.companiesLabel }] : []),
    ...(access.employees ? [{ href: "/app/salaries", label: "Salariés" }] : []),
    { href: "/app/historique", label: "Historique" },
    { href: "/app/anomalies", label: "Anomalies" },
    { href: "/app/parametres", label: "Paramètres" },
    ...(access.admin ? [{ href: "/app/admin", label: "Administration" }] : []),
  ];
  const horizontal = orientation === "horizontal";

  return (
    <nav
      className={
        horizontal
          ? "flex gap-1 overflow-x-auto px-4 pb-3 print:hidden"
          : "flex flex-col gap-0.5 print:hidden"
      }
    >
      {navItems.map((item) => {
        const active =
          pathname === item.href || pathname?.startsWith(`${item.href}/`);
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
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-[18px] w-[18px] shrink-0 transition ${
                active ? "text-blue-600" : "text-ink-400 group-hover:text-ink-600"
              }`}
              aria-hidden
            >
              {ICON_PATHS[item.href]}
            </svg>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
