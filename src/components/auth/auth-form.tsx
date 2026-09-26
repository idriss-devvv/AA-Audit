"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { GoogleIcon } from "./google-icon";
import { hideNavigationLoader, showNavigationLoader } from "@/components/ui/navigation-loader";
import { EmailCodeStep } from "./email-code-step";
import { PasswordInput } from "./password-input";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  // Étape de saisie du code reçu par e-mail (après inscription, ou connexion
  // d'un compte dont l'adresse n'a pas encore été confirmée).
  const [awaitingCode, setAwaitingCode] = useState(false);

  async function handleGoogle() {
    setError(null);
    showNavigationLoader();
    const supabase = createClient();
    const { error } = await supabase.auth
      .signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      .catch(() => ({ error: { message: "Connexion Google impossible pour le moment, réessayez." } }));
    if (error) {
      hideNavigationLoader();
      setError(error.message);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();

    if (mode === "signup") {
      showNavigationLoader("Création de votre compte…");
      const { error } = await supabase.auth
        .signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
            // La formule (Free, Starter, Pro, Entreprise) se choisit ensuite, au paiement.
            data: { company_name: companyName },
          },
        })
        .catch(() => ({ error: { message: "Inscription impossible, vérifiez votre réseau et réessayez." } }));
      // On reste sur la page (message de confirmation ou d'erreur) : loader masqué.
      hideNavigationLoader();
      if (error) {
        setError(error.message);
      } else {
        setAwaitingCode(true);
      }
    } else {
      showNavigationLoader();
      const { error } = await supabase.auth
        .signInWithPassword({ email, password })
        .catch(() => ({ error: { message: "Connexion impossible, vérifiez votre réseau et réessayez." } }));
      if (error) {
        hideNavigationLoader();
        if (/email not confirmed/i.test(error.message)) {
          // Compte créé mais adresse jamais confirmée : on renvoie un code.
          await supabase.auth
            .resend({ type: "signup", email, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } })
            .catch(() => null);
          setAwaitingCode(true);
        } else {
          setError(error.message);
        }
      } else {
        // Le loader reste affiché jusqu'au chargement du tableau de bord.
        window.location.href = "/app/dashboard";
        return;
      }
    }

    setLoading(false);
  }

  if (awaitingCode) {
    return (
      <EmailCodeStep
        email={email}
        onBack={() => {
          setAwaitingCode(false);
          setLoading(false);
        }}
      />
    );
  }

  return (
    <div className="card mx-auto flex w-full max-w-md flex-col gap-6 rounded-3xl p-7 shadow-lift sm:p-9">
      <button
        type="button"
        onClick={handleGoogle}
        className="btn-secondary gap-3"
      >
        <GoogleIcon />
        Continuer avec Google
      </button>

      <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-400">
        <span className="h-px flex-1 bg-ink-200/70" />
        ou
        <span className="h-px flex-1 bg-ink-200/70" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "signup" && (
          <>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="account-name" className="field-label">
                Nom de l&apos;entreprise ou votre nom
              </label>
              <input
                id="account-name"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                autoComplete="organization"
                required
                className="input"
              />
            </div>
          </>
        )}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="auth-email" className="field-label">Email</label>
          <input
            id="auth-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor="auth-password" className="field-label">
              Mot de passe
            </label>
            {mode === "login" && (
              <Link
                href="/mot-de-passe-oublie"
                className="text-xs font-semibold text-blue-600 underline-offset-4 hover:underline"
              >
                Mot de passe oublié ?
              </Link>
            )}
          </div>
          <PasswordInput
            id="auth-password"
            value={password}
            onChange={setPassword}
            autoComplete={mode === "login" ? "current-password" : "new-password"}
            minLength={6}
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-blue-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="btn-primary mt-2"
        >
          {loading
            ? "Veuillez patienter…"
            : mode === "signup"
              ? "Créer mon compte"
              : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
