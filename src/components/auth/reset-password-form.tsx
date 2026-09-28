"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { hideNavigationLoader, showNavigationLoader } from "@/components/ui/navigation-loader";
import { PasswordInput } from "./password-input";

const MIN_PASSWORD_LENGTH = 8;

/**
 * Nouveau mot de passe après ouverture du lien de secours de l'e-mail
 * (la session de récupération est ouverte par /auth/callback) ou du lien
 * d'invitation envoyé par le back-office (jetons dans le fragment « # »).
 */
export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lien d'invitation : Supabase renvoie la session dans le fragment de l'URL,
  // que le client (flux PKCE) ne lit pas de lui-même.
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    const accessToken = params.get("access_token");
    const refreshToken = params.get("refresh_token");
    if (params.get("error_description")) {
      setError("Le lien a expiré. Demandez un nouveau code depuis la page « Mot de passe oublié ».");
    }
    if (!accessToken || !refreshToken) return;
    window.history.replaceState(null, "", window.location.pathname);
    createClient()
      .auth.setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        if (error) setError("Le lien a expiré. Demandez un nouveau code depuis la page « Mot de passe oublié ».");
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
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
    const { error } = await createClient()
      .auth.updateUser({ password })
      .catch(() => ({ error: { message: "" } }));
    if (error) {
      hideNavigationLoader();
      setLoading(false);
      setError(
        /session/i.test(error.message)
          ? "Le lien a expiré. Demandez un nouveau code depuis la page « Mot de passe oublié »."
          : /different|same/i.test(error.message)
            ? "Le nouveau mot de passe doit être différent de l'ancien."
            : "Mise à jour impossible pour le moment, réessayez."
      );
      return;
    }
    window.location.href = "/app/dashboard";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="card mx-auto flex w-full max-w-md flex-col gap-4 rounded-3xl p-7 shadow-lift sm:p-9"
    >
      <div className="flex flex-col gap-1.5">
        <label htmlFor="new-password" className="field-label">
          Nouveau mot de passe
        </label>
        <PasswordInput
          id="new-password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
        />
        <p className="text-xs text-ink-400">{MIN_PASSWORD_LENGTH} caractères minimum.</p>
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="new-password-confirmation" className="field-label">
          Confirmer le mot de passe
        </label>
        <PasswordInput
          id="new-password-confirmation"
          value={confirmation}
          onChange={setConfirmation}
          autoComplete="new-password"
          minLength={MIN_PASSWORD_LENGTH}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}{" "}
          {/expiré/.test(error) && (
            <Link href="/mot-de-passe-oublie" className="font-semibold underline underline-offset-4">
              Recevoir un code
            </Link>
          )}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary mt-1">
        {loading ? "Mise à jour…" : "Enregistrer le nouveau mot de passe"}
      </button>
    </form>
  );
}
