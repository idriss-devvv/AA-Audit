import type { Metadata } from "next";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { ForgotPasswordFlow } from "@/components/auth/forgot-password-flow";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
  robots: { index: false },
};

export default function MotDePasseOubliePage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="container-page relative py-20 md:py-24">
          <div className="mx-auto max-w-md text-center">
            <h1 className="heading-display text-5xl">Mot de passe oublié</h1>
            <p className="mt-4 text-ink-500">Choisissez un nouveau mot de passe en deux étapes.</p>
          </div>
          <div className="mt-10">
            <ForgotPasswordFlow />
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
