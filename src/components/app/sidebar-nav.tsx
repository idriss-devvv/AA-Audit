"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const baseNavItems = [
  { href: "/app/dashboard", label: "Accueil" },
  { href: "/app/historique", label: "Historique" },
  { href: "/app/anomalies", label: "Anomalies" },
  { href: "/app/parametres", label: "Paramètres" },
];

const cabinetNavItem = { href: "/app/clients", label: "Mes clients" };

export function SidebarNav({ isCabinet = false }: { isCabinet?: boolean }) {
  const pathname = usePathname();
  const navItems = isCabinet
    ? [baseNavItems[0], cabinetNavItem, ...baseNavItems.slice(1)]
    : baseNavItems;

  return (
    <nav className="flex w-56 shrink-0 flex-col gap-1 border-r border-beige-200 bg-white p-4">
      {navItems.map((item) => {
        const active =
          pathname === item.href || pathname?.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-blue-50 text-blue-600"
                : "text-ink-700 hover:bg-beige-100 hover:text-ink-900"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
