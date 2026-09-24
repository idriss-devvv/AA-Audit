"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { hideNavigationLoader, showNavigationLoader } from "@/components/ui/navigation-loader";

const CODE_LENGTH = 6;
/** Supabase limite les renvois : on évite les clics répétés. */
const RESEND_COOLDOWN_S = 60;

/**
 * Étape de confirmation de l'adresse e-mail : l'utilisateur saisit le code à
 * 6 chiffres reçu par e-mail (variable {{ .Token }} du modèle Supabase
 * « Confirm signup »). Un code valide crée la session et ouvre le tableau de
 * bord.
 */
export function EmailCodeStep({ email, onBack }: { email: string; onBack: () => void }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [verifying, setVerifying] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (code.length !== CODE_LENGTH) return;
    setVerifying(true);
    setError(null);
    setInfo(null);
    showNavigationLoader("Vérification du code…");

    const supabase = createClient();
    const { error } = await supabase.auth
      .verifyOtp({ email, token: code, type: "email" })
      .catch(() => ({ error: { message: "Vérification impossible, vérifiez votre réseau et réessayez." } }));

    if (error) {
      hideNavigationLoader();
      setError("Code incorrect ou expiré. Vérifiez le code reçu ou demandez-en un nouveau.");
      setVerifying(false);
      return;
    }
    // Adresse confirmée et session ouverte : le loader reste jusqu'au tableau de bord.
    window.location.href = "/app/dashboard";
  }

  async function handleResend() {
    if (cooldown > 0) return;
    setError(null);
    setInfo(null);
    const supabase = createClient();
    const { error } = await supabase.auth
      .resend({ type: "signup", email, options: { emailRedirectTo: `${window.location.origin}/auth/callback` } })
      .catch(() => ({ error: { message: "" } }));
    if (error) {
      setError("Impossible de renvoyer le code pour le moment, réessayez dans quelques minutes.");
      return;
    }
    setInfo("Un nouveau code vient de vous être envoyé.");
    setCooldown(RESEND_COOLDOWN_S);
    const timer = setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) clearInterval(timer);
        return s - 1;
      });
    }, 1000);
  }

  return (
    <div className="card mx-auto flex w-full max-w-md flex-col gap-6 rounded-3xl p-7 shadow-lift sm:p-9">
      <div className="text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-inset ring-blue-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </svg>
        </span>
        <h2 className="mt-5 font-display text-3xl text-ink-900">Vérifiez votre boîte mail</h2>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">
          Un code à {CODE_LENGTH} chiffres a été envoyé à <span className="font-medium text-ink-900">{email}</span>.
        </p>
      </div>

      <form onSubmit={handleVerify} className="flex flex-col gap-4">
        <label htmlFor="email-code" className="field-label text-center">
          Code de confirmation
        </label>
        <input
          id="email-code"
          value={code}
          onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH))}
          inputMode="numeric"
          autoComplete="one-time-code"
          autoFocus
          placeholder="••••••"
          aria-describedby="email-code-help"
          className="input py-3.5 text-center font-mono text-2xl tracking-[0.5em] placeholder:tracking-[0.5em]"
        />
        <p id="email-code-help" className="text-center text-xs text-ink-400">
          Pensez à vérifier vos courriers indésirables. Le code expire au bout d&apos;une heure.
        </p>

        {error && <p className="text-center text-sm text-red-600">{error}</p>}
        {info && <p className="text-center text-sm text-blue-600">{info}</p>}

        <button type="submit" disabled={verifying || code.length !== CODE_LENGTH} className="btn-primary mt-1">
          {verifying ? "Vérification…" : "Valider mon adresse"}
        </button>
      </form>

      <div className="flex items-center justify-between border-t border-ink-200/70 pt-5 text-sm">
        <button type="button" onClick={onBack} className="font-medium text-ink-500 transition hover:text-ink-900">
          ← Modifier l&apos;adresse
        </button>
        <button
          type="button"
          onClick={handleResend}
          disabled={cooldown > 0}
          className="font-semibold text-blue-600 transition hover:text-blue-800 disabled:cursor-not-allowed disabled:text-ink-400"
        >
          {cooldown > 0 ? `Renvoyer (${cooldown} s)` : "Renvoyer le code"}
        </button>
      </div>
    </div>
  );
}
