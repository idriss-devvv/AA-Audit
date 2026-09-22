"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { GoogleIcon } from "./google-icon";

type AccountType = "entreprise" | "cabinet";

export function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [accountType, setAccountType] = useState<AccountType>("entreprise");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleGoogle() {
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) setError(error.message);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    const supabase = createClient();

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: { company_name: companyName, account_type: accountType },
        },
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Vérifiez votre boîte mail pour confirmer votre compte.");
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        window.location.href = "/app/dashboard";
      }
    }

    setLoading(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-6 rounded-2xl border border-beige-200 bg-white p-8 shadow-soft">
      <button
        type="button"
        onClick={handleGoogle}
        className="flex items-center justify-center gap-3 rounded-full border border-beige-300 bg-white px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-blue-400 hover:text-blue-600"
      >
        <GoogleIcon />
        Continuer avec Google
      </button>

      <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-ink-300">
        <span className="h-px flex-1 bg-beige-200" />
        ou
        <span className="h-px flex-1 bg-beige-200" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "signup" && (
          <>
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-ink-700">Vous êtes</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setAccountType("entreprise")}
                  className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                    accountType === "entreprise"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-beige-200 bg-beige-50 text-ink-700 hover:border-blue-300"
                  }`}
                >
                  Une entreprise
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("cabinet")}
                  className={`rounded-lg border px-3 py-2.5 text-sm font-medium transition ${
                    accountType === "cabinet"
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-beige-200 bg-beige-50 text-ink-700 hover:border-blue-300"
                  }`}
                >
                  Un cabinet comptable
                </button>
              </div>
              {accountType === "cabinet" && (
                <p className="text-xs text-ink-500">
                  Vous pourrez ajouter et gérer plusieurs entreprises clientes
                  depuis votre espace.
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-ink-700">
                {accountType === "cabinet" ? "Nom du cabinet" : "Nom de l'entreprise"}
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="rounded-lg border border-beige-200 bg-beige-50 px-4 py-2.5 text-ink-900 outline-none focus:border-blue-400"
              />
            </div>
          </>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-lg border border-beige-200 bg-beige-50 px-4 py-2.5 text-ink-900 outline-none focus:border-blue-400"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-ink-700">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="rounded-lg border border-beige-200 bg-beige-50 px-4 py-2.5 text-ink-900 outline-none focus:border-blue-400"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-blue-600">{message}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-beige-50 transition hover:bg-blue-700 disabled:opacity-60"
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
