import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { AuthForm } from "@/components/auth/auth-form";

export default function InscriptionPage() {
  return (
    <MarketingShell>
      <section className="container-page py-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-extrabold text-ink-900">
            Créer un compte
          </h1>
          <p className="mt-2 text-ink-500">
            Commencez à contrôler vos fiches de paie en quelques minutes.
          </p>
        </div>

        <div className="mt-10">
          <AuthForm mode="signup" />
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Déjà un compte ?{" "}
          <Link
            href="/connexion"
            className="font-semibold text-blue-600 hover:underline"
          >
            Se connecter
          </Link>
        </p>
      </section>
    </MarketingShell>
  );
}
