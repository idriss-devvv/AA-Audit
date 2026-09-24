import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { AuthForm } from "@/components/auth/auth-form";

export default function ConnexionPage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="container-page relative py-20 md:py-24">
        <div className="mx-auto max-w-md text-center">
          <h1 className="heading-display text-5xl">Connexion</h1>
          <p className="mt-4 text-ink-500">Accédez à votre espace PayAudit.</p>
        </div>

        <div className="mt-10">
          <AuthForm mode="login" />
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Pas encore de compte ?{" "}
          <Link
            href="/inscription"
            className="font-semibold text-blue-600 underline-offset-4 hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      </div>
      </section>
    </MarketingShell>
  );
}
