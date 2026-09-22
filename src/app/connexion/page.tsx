import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { AuthForm } from "@/components/auth/auth-form";

export default function ConnexionPage() {
  return (
    <MarketingShell>
      <section className="container-page py-20">
        <div className="mx-auto max-w-md text-center">
          <h1 className="text-3xl font-extrabold text-ink-900">Connexion</h1>
          <p className="mt-2 text-ink-500">Accédez à votre espace PayAudit.</p>
        </div>

        <div className="mt-10">
          <AuthForm mode="login" />
        </div>

        <p className="mt-6 text-center text-sm text-ink-500">
          Pas encore de compte ?{" "}
          <Link
            href="/inscription"
            className="font-semibold text-blue-600 hover:underline"
          >
            Créer un compte
          </Link>
        </p>
      </section>
    </MarketingShell>
  );
}
