import { createClient } from "@supabase/supabase-js";

/**
 * Client Supabase « service role » : contourne la RLS. Réservé aux routes
 * serveur, après vérification du rôle de l'appelant. null si la clé
 * SUPABASE_SERVICE_ROLE_KEY n'est pas configurée.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}
