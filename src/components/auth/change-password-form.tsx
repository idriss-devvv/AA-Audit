"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function ChangePasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (password.length < 8) {
      setStatus("error");
      setMessage("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirmation) {
      setStatus("error");
      setMessage("Les deux mots de passe ne correspondent pas.");
      return;
    }

    setStatus("loading");
    setMessage(null);

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setStatus("error");
      setMessage(error.message);
      return;
    }

    setStatus("success");
    setMessage("Mot de passe mis à jour avec succès.");
    setPassword("");
    setConfirmation("");
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <label htmlFor="new-password" className="field-label text-xs">
          Nouveau mot de passe
        </label>
        <input
          id="new-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
          required
          className="input px-3 py-2"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="confirm-password" className="field-label text-xs">
          Confirmer le mot de passe
        </label>
        <input
          id="confirm-password"
          type="password"
          value={confirmation}
          onChange={(e) => setConfirmation(e.target.value)}
          minLength={8}
          required
          className="input px-3 py-2"
        />
      </div>

      <div className="mt-1 flex items-center gap-3">
        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary btn-sm"
        >
          {status === "loading" ? "Mise à jour…" : "Modifier le mot de passe"}
        </button>
        {message && (
          <p className={`text-xs ${status === "error" ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}
      </div>
    </form>
  );
}
