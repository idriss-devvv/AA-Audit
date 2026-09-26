import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { LogoutButton } from "@/components/auth/logout-button";

export const metadata: Metadata = {
  title: "Compte suspendu",
  robots: { index: false },
};

// Page affichée à un utilisateur bloqué par l'administration (profiles.blocked_at).
export default function CompteBloquePage() {
  return (
    <MarketingShell>
      <section className="container-page py-24 md:py-32">
        <div className="card mx-auto max-w-lg rounded-3xl p-8 text-center shadow-lift sm:p-10">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
          </span>
          <h1 className="heading-display mt-6 text-4xl">Compte suspendu</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-500">
            L&apos;accès à votre espace A&amp;A Audit a été suspendu par l&apos;administration.
            Vos données sont conservées. Contactez-nous pour en connaître la raison ou
            demander la réactivation de votre compte.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/contact" className="btn-primary">
              Nous contacter
            </Link>
            <LogoutButton />
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
