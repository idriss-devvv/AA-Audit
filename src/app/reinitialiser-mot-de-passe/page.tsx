import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Nouveau mot de passe",
  robots: { index: false },
};

// Page ouverte par le lien de secours de l'e-mail « mot de passe oublié ».
export default function ReinitialiserMotDePassePage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="container-page relative py-20 md:py-24">
          <div className="mx-auto max-w-md text-center">
            <h1 className="heading-display text-5xl">Nouveau mot de passe</h1>
            <p className="mt-4 text-ink-500">Choisissez le mot de passe de votre compte A&A Audit.</p>
          </div>
          <div className="mt-10">
            <ResetPasswordForm />
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
