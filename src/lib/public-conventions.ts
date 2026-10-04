import { createClient } from "@supabase/supabase-js";

export type PublicConvention = {
  idcc_code: string;
  name: string;
  sector: string;
  coverage_note: string | null;
  salary_text_title: string | null;
  salary_text_effective_from: string | null;
  salary_text_url: string | null;
  texts_count: number;
  classifications_count: number;
  seniority_rules: number;
  pay_increase_rules: number;
  bonus_rules: number;
  sick_pay_rules: number;
  last_update: string | null;
};

/** Durée de mise en cache du référentiel sur les pages publiques (secondes). */
export const PUBLIC_CONVENTIONS_REVALIDATE = 3600;

/**
 * Résumé public des conventions collectives intégrées (fonction
 * public_conventions_summary, accessible sans connexion). Liste vide si la
 * base est injoignable : la page se replie alors sur les grilles du code.
 */
export async function listPublicConventions(): Promise<PublicConvention[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return [];
  try {
    const supabase = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
      global: {
        fetch: (input, init) => fetch(input, { ...init, next: { revalidate: PUBLIC_CONVENTIONS_REVALIDATE } }),
      },
    });
    const { data, error } = await supabase.rpc("public_conventions_summary");
    if (error) return [];
    return (data as PublicConvention[] | null) ?? [];
  } catch {
    return [];
  }
}
