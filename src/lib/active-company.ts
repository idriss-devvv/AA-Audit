import { cache } from "react";
import { cookies } from "next/headers";
import { createClient, getCurrentProfile, getCurrentUser } from "@/lib/supabase/server";

/**
 * Support multi-sociétés : un compte (formule Entreprise, ou cabinet
 * comptable) gère plusieurs sociétés rattachées sous un seul compte. Ce module centralise la
 * résolution du "contexte" actif (quelle entreprise consulter) pour que
 * toutes les pages de l'espace /app filtrent leurs requêtes sur la même
 * entreprise, plutôt que de se reposer implicitement sur les policies RLS
 * (qui autorisent désormais l'accès à plusieurs entreprises pour un cabinet).
 */

export const ACTIVE_COMPANY_COOKIE = "active_company_id";

export type ClientCompany = { id: string; name: string };

export type ActiveCompanyContext = {
  /** Utilisateur connecté (null si non connecté). */
  userId: string | null;
  /** Entreprise propre à l'utilisateur connecté (celle de son profil). */
  ownCompanyId: string | null;
  ownCompanyName: string | null;
  /** true si le compte a été créé comme cabinet comptable (libellés « clients »). */
  isCabinet: boolean;
  /** Sociétés rattachées au compte (vide si aucune). */
  clients: ClientCompany[];
  /** Entreprise actuellement affichée : le client sélectionné, ou à défaut
   * l'entreprise propre de l'utilisateur. */
  activeCompanyId: string | null;
  activeCompanyName: string | null;
};

/**
 * Mémoïsé par requête (React `cache`) : le layout /app et la page appellent
 * tous deux cette fonction, sans refaire les requêtes.
 */
export const getActiveCompanyContext = cache(async (): Promise<ActiveCompanyContext> => {
  const empty: ActiveCompanyContext = {
    userId: null,
    ownCompanyId: null,
    ownCompanyName: null,
    isCabinet: false,
    clients: [],
    activeCompanyId: null,
    activeCompanyName: null,
  };

  const [user, profile] = await Promise.all([getCurrentUser(), getCurrentProfile()]);

  if (!user) return empty;
  const withUser = { ...empty, userId: user.id };
  if (!profile?.company_id) return withUser;

  const supabase = await createClient();
  const isCabinet = profile.companies?.is_cabinet ?? false;
  let clients: ClientCompany[] = [];

  {
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

  if (clients.length > 0) {
    const cookieStore = await cookies();
    const selected = cookieStore.get(ACTIVE_COMPANY_COOKIE)?.value ?? null;
    const match = selected ? clients.find((c) => c.id === selected) : undefined;
    if (match) {
      activeCompanyId = match.id;
      activeCompanyName = match.name;
    }
  }

  return {
    userId: user.id,
    ownCompanyId: profile.company_id,
    ownCompanyName: profile.companies?.name ?? null,
    isCabinet,
    clients,
    activeCompanyId,
    activeCompanyName,
  };
});
