import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";

/**
 * Support multi-tenant "cabinet" : un cabinet comptable gère plusieurs
 * entreprises clientes sous un seul compte. Ce module centralise la
 * résolution du "contexte" actif (quelle entreprise consulter) pour que
 * toutes les pages de l'espace /app filtrent leurs requêtes sur la même
 * entreprise, plutôt que de se reposer implicitement sur les policies RLS
 * (qui autorisent désormais l'accès à plusieurs entreprises pour un cabinet).
 */

export const ACTIVE_COMPANY_COOKIE = "active_company_id";

export type ClientCompany = { id: string; name: string };

export type ActiveCompanyContext = {
  /** Entreprise propre à l'utilisateur connecté (celle de son profil). */
  ownCompanyId: string | null;
  ownCompanyName: string | null;
  /** true si le compte est un cabinet comptable pouvant gérer des clients. */
  isCabinet: boolean;
  /** Entreprises clientes rattachées au cabinet (vide si non-cabinet). */
  clients: ClientCompany[];
  /** Entreprise actuellement affichée : le client sélectionné, ou à défaut
   * l'entreprise propre de l'utilisateur. */
  activeCompanyId: string | null;
  activeCompanyName: string | null;
};

type ProfileWithCompany = {
  company_id: string | null;
  companies: { id: string; name: string; is_cabinet: boolean } | null;
};

export async function getActiveCompanyContext(): Promise<ActiveCompanyContext> {
  const empty: ActiveCompanyContext = {
    ownCompanyId: null,
    ownCompanyName: null,
    isCabinet: false,
    clients: [],
    activeCompanyId: null,
    activeCompanyName: null,
  };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return empty;

  const { data: profileData } = await supabase
    .from("profiles")
    .select("company_id, companies(id, name, is_cabinet)")
    .eq("id", user.id)
    .single();

  const profile = profileData as unknown as ProfileWithCompany | null;
  if (!profile?.company_id) return empty;

  const isCabinet = profile.companies?.is_cabinet ?? false;
  let clients: ClientCompany[] = [];

  if (isCabinet) {
    const { data: clientRows } = await supabase
      .from("client_companies")
      .select("company:companies(id, name)")
      .eq("cabinet_id", profile.company_id);

    clients = (
      (clientRows as unknown as { company: ClientCompany | null }[] | null) ?? []
    )
      .map((row) => row.company)
      .filter((c): c is ClientCompany => Boolean(c))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }

  let activeCompanyId = profile.company_id;
  let activeCompanyName = profile.companies?.name ?? null;

  if (isCabinet) {
    const cookieStore = await cookies();
    const selected = cookieStore.get(ACTIVE_COMPANY_COOKIE)?.value ?? null;
    const match = selected ? clients.find((c) => c.id === selected) : undefined;
    if (match) {
      activeCompanyId = match.id;
      activeCompanyName = match.name;
    }
  }

  return {
    ownCompanyId: profile.company_id,
    ownCompanyName: profile.companies?.name ?? null,
    isCabinet,
    clients,
    activeCompanyId,
    activeCompanyName,
  };
}
