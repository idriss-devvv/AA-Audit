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
              <span className="field-label">Vous êtes</span>
              <div className="grid grid-cols-2 gap-1 rounded-xl bg-beige-100 p-1 ring-1 ring-inset ring-ink-200/60">
                <button
                  type="button"
                  onClick={() => setAccountType("entreprise")}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    accountType === "entreprise"
                      ? "bg-white text-ink-900 shadow-soft ring-1 ring-ink-200/70"
                      : "text-ink-500 hover:text-ink-900"
                  }`}
                >
                  Une entreprise
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType("cabinet")}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                    accountType === "cabinet"
                      ? "bg-white text-ink-900 shadow-soft ring-1 ring-ink-200/70"
                      : "text-ink-500 hover:text-ink-900"
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
              <label className="field-label">
                {accountType === "cabinet" ? "Nom du cabinet" : "Nom de l'entreprise"}
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
                className="input"
              />
            </div>
          </>
        )}

        <div className="flex flex-col gap-1.5">
          <label className="field-label">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="field-label">
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            className="input"
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
