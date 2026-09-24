"use client";

import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/connexion";
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="btn-secondary px-3.5 py-1.5 text-xs"
    >
      Se déconnecter
    </button>
  );
}
