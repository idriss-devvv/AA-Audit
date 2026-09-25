import Link from "next/link";
import { Logo } from "@/components/ui/logo";

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgu", label: "CGU" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
  { href: "/cookies", label: "Politique de cookies" },
];

const productLinks = [
  { href: "/#fonctionnalites", label: "Fonctionnalités" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
  { href: "/app/dashboard", label: "Dashboard" },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-ink-300">
      <div aria-hidden className="bg-grid-light mask-fade-b pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-page relative grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo tone="light" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-400">
            La vérification automatique des fiches de paie : anomalies,
            erreurs de cotisations et écarts détectés en quelques secondes.
          </p>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
            Produit
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {productLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-300 transition hover:text-beige-50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500">
            Légal
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-300 transition hover:text-beige-50">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <p className="container-page py-6 text-xs text-ink-500">
          © {new Date().getFullYear()} A&A Audit. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
