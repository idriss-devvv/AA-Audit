import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cache } from "react";
import { cookies } from "next/headers";

type CookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

/**
 * Client Supabase pour les Server Components / Route Handlers.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Appelé depuis un Server Component : géré par le middleware.
          }
        },
      },
    }
  );
}

export type CurrentProfile = {
  company_id: string | null;
  app_role: string | null;
  blocked_at: string | null;
  companies: { id: string; name: string; is_cabinet: boolean } | null;
};

/**
 * Utilisateur connecté, mémoïsé par requête (React `cache`) : le layout, les
 * contextes et la page partagent un seul appel à Supabase Auth.
 */
export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

/** Profil de l'utilisateur connecté (et son entreprise), mémoïsé par requête. */
export const getCurrentProfile = cache(async (): Promise<CurrentProfile | null> => {
  const user = await getCurrentUser();
  if (!user) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("company_id, app_role, blocked_at, companies(id, name, is_cabinet)")
    .eq("id", user.id)
    .single();
  return (data as unknown as CurrentProfile | null) ?? null;
});
