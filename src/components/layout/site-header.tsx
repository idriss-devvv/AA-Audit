import Link from "next/link";
import { Logo } from "@/components/ui/logo";
import { createClient } from "@/lib/supabase/server";

const navLinks = [
  { href: "/#fonctionnalites", label: "Fonctionnalités" },
  { href: "/#tarifs", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

async function isSignedIn(): Promise<boolean> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return Boolean(user);
  } catch {
    // Supabase indisponible : on affiche les boutons de connexion par défaut.
    return false;
  }
}

export async function SiteHeader() {
  const signedIn = await isSignedIn();

  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/60 bg-beige-50/75 backdrop-blur-xl backdrop-saturate-150">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" aria-label="A&A Audit — accueil" className="shrink-0">
          <Logo className="[&>span:last-child]:hidden min-[420px]:[&>span:last-child]:inline" />
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-ink-200/70 bg-white/60 p-1 shadow-[0_1px_2px_rgba(23,25,29,0.04)] md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-1.5 text-[13px] font-medium text-ink-600 transition hover:bg-beige-100 hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {signedIn ? (
            <Link href="/app/dashboard" className="btn-dark whitespace-nowrap px-4 py-2 text-[13px] sm:px-5">
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/connexion"
                className="whitespace-nowrap rounded-full px-3 py-2 text-[13px] font-semibold text-ink-700 transition hover:text-ink-900 sm:px-4"
              >
                Se connecter
              </Link>
              <Link href="/inscription" className="btn-dark whitespace-nowrap px-4 py-2 text-[13px] sm:px-5">
                S&apos;inscrire
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
