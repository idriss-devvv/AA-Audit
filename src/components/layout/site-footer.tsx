import Link from "next/link";

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/cgu", label: "CGU" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
  { href: "/cookies", label: "Politique de cookies" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-beige-200 bg-beige-100">
      <div className="container-page grid gap-10 py-14 md:grid-cols-3">
        <div>
          <span className="text-lg font-bold text-ink-900">PayAudit</span>
          <p className="mt-3 max-w-xs text-sm text-ink-500">
            La vérification automatique des fiches de paie : anomalies,
            erreurs de cotisations et écarts détectés en quelques secondes.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            Produit
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/#fonctionnalites" className="text-ink-700 hover:text-blue-600">
                Fonctionnalités
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-ink-700 hover:text-blue-600">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/app/dashboard" className="text-ink-700 hover:text-blue-600">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
            Légal
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-ink-700 hover:text-blue-600">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-beige-200 py-6">
        <p className="container-page text-xs text-ink-500">
          © {new Date().getFullYear()} PayAudit. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
