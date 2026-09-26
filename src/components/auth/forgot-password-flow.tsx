"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { hideNavigationLoader, showNavigationLoader } from "@/components/ui/navigation-loader";
import { PasswordInput } from "./password-input";

const CODE_LENGTH = 6;
const MIN_PASSWORD_LENGTH = 8;
/** Supabase limite les envois : on évite les clics répétés. */
const RESEND_COOLDOWN_S = 60;

function recoveryRedirect() {
  // Lien de secours de l'e-mail : ouvre la page de nouveau mot de passe.
  return `${window.location.origin}/auth/callback?next=/reinitialiser-mot-de-passe`;
}

/**
 * Mot de passe oublié, en deux étapes :
 * 1. l'utilisateur saisit son e-mail → Supabase envoie un code à 6 chiffres
 *    (modèle « Reset Password », variable {{ .Token }}) ;
 * 2. il saisit le code et son nouveau mot de passe → session ouverte,
 *    mot de passe mis à jour, redirection vers le tableau de bord.
 * Le code fonctionne quel que soit l'appareil sur lequel l'e-mail est ouvert.
 */
export function ForgotPasswordFlow() {
  const [step, setStep] = useState<"email" | "code">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  function startCooldown() {
    setCooldown(RESEND_COOLDOWN_S);
    const timer = setInterval(() => {
      setCooldown((s) => {
        if (s <= 1) clearInterval(timer);
        return s - 1;
      });
    }, 1000);
  }

  async function sendCode() {
    const supabase = createClient();
    const { error } = await supabase.auth
      .resetPasswordForEmail(email, { redirectTo: recoveryRedirect() })
      .catch(() => ({ error: { message: "" } }));
    return !error;
  }

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    showNavigationLoader("Envoi du code…");
    const ok = await sendCode();
    hideNavigationLoader();
    setLoading(false);
    if (!ok) {
      setError("Envoi impossible pour le moment. Vérifiez l'adresse ou réessayez dans quelques minutes.");
      return;
    }
    // Message identique que le compte existe ou non (ne révèle pas les adresses inscrites).
    setStep("code");
    startCooldown();
  }

  async function handleResend() {
    if (cooldown > 0) return;
    setError(null);
    setInfo(null);
    if (await sendCode()) {
      setInfo("Un nouveau code vient de vous être envoyé.");
      startCooldown();
    } else {
      setError("Impossible de renvoyer le code pour le moment, réessayez dans quelques minutes.");
    }
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(`Le mot de passe doit contenir au moins ${MIN_PASSWORD_LENGTH} caractères.`);
      return;
    }
    if (password !== confirmation) {
      setError("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    showNavigationLoader("Mise à jour du mot de passe…");
    const supabase = createClient();

    const { error: codeError } = await supabase.auth
      .verifyOtp({ email, token: code, type: "recovery" })
      .catch(() => ({ error: { message: "" } }));
    if (codeError) {
      hideNavigationLoader();
      setLoading(false);
      setError("Code incorrect ou expiré. Vérifiez le code reçu ou demandez-en un nouveau.");
      return;
    }

    const { error: updateError } = await supabase.auth
      .updateUser({ password })
      .catch(() => ({ error: { message: "" } }));
    if (updateError) {
      hideNavigationLoader();
      setLoading(false);
      setError(
        updateError.message && /different|same/i.test(updateError.message)
          ? "Le nouveau mot de passe doit être différent de l'ancien."
          : "Mise à jour impossible pour le moment, réessayez."
      );
      return;
    }
    // Code valide = session ouverte : le loader reste jusqu'au tableau de bord.
    window.location.href = "/app/dashboard";
  }

  return (
    <div className="card mx-auto flex w-full max-w-md flex-col gap-6 rounded-3xl p-7 shadow-lift sm:p-9">
      {step === "email" ? (
        <form onSubmit={handleRequest} className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-ink-500">
            Indiquez l&apos;adresse e-mail de votre compte : nous vous enverrons un code à{" "}
            {CODE_LENGTH} chiffres pour choisir un nouveau mot de passe.
          </p>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reset-email" className="field-label">
              Email
            </label>
            <input
              id="reset-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              required
              className="input"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary mt-1">
            {loading ? "Envoi…" : "Recevoir un code"}
          </button>
        </form>
      ) : (
        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <p className="text-sm leading-relaxed text-ink-500">
            Si un compte existe pour <span className="font-medium text-ink-900">{email}</span>, un code
            vient de lui être envoyé. Pensez à vérifier vos courriers indésirables.
          </p>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="reset-code" className="field-label">
              Code reçu par e-mail
            </label>
            <input
              id="reset-code"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, CODE_LENGTH))}
              inputMode="numeric"
              autoComplete="one-time-code"
              autoFocus
              placeholder="••••••"
              required
              className="input py-3 text-center font-mono text-xl tracking-[0.5em] placeholder:tracking-[0.5em]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reset-password" className="field-label">
              Nouveau mot de passe
            </label>
            <PasswordInput
              id="reset-password"
              value={password}
              onChange={setPassword}
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
            />
            <p className="text-xs text-ink-400">{MIN_PASSWORD_LENGTH} caractères minimum.</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <label htmlFor="reset-confirmation" className="field-label">
              Confirmer le mot de passe
            </label>
            <PasswordInput
              id="reset-confirmation"
              value={confirmation}
              onChange={setConfirmation}
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {info && <p className="text-sm text-blue-600">{info}</p>}

          <button type="submit" disabled={loading || code.length !== CODE_LENGTH} className="btn-primary mt-1">
            {loading ? "Mise à jour…" : "Changer mon mot de passe"}
          </button>

          <div className="flex items-center justify-between border-t border-ink-200/70 pt-5 text-sm">
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setCode("");
                setError(null);
                setInfo(null);
              }}
              className="font-medium text-ink-500 transition hover:text-ink-900"
            >
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
        </form>
      )}

      <p className="text-center text-sm text-ink-500">
        <Link href="/connexion" className="font-semibold text-blue-600 underline-offset-4 hover:underline">
          Retour à la connexion
        </Link>
      </p>
    </div>
  );
}
