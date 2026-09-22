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
      className="rounded-full border border-beige-300 bg-white px-4 py-1.5 text-xs font-semibold text-ink-900 transition hover:border-blue-400 hover:text-blue-600"
    >
      Se déconnecter
    </button>
  );
}
