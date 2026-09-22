import Link from "next/link";

const navLinks = [
  { href: "/#fonctionnalites", label: "Fonctionnalités" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-beige-200 bg-beige-50/80 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-bold text-beige-50">
            PA
          </span>
          <span className="text-lg font-bold tracking-tight text-ink-900">
            PayAudit
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-700 transition hover:text-blue-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/connexion"
            className="rounded-full border border-beige-300 bg-white px-5 py-2 text-sm font-semibold text-ink-900 transition hover:border-blue-400 hover:text-blue-600"
          >
            Se connecter
          </Link>
          <Link
            href="/inscription"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-beige-50 shadow-soft transition hover:bg-blue-700"
          >
            S&apos;inscrire
          </Link>
        </div>
      </div>
    </header>
  );
}
