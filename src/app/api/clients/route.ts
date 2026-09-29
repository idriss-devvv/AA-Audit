import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";

/**
 * POST /api/clients
 *
 * Crée une nouvelle société et la rattache au compte de l'utilisateur
 * connecté. Réservé à la formule Entreprise (et au back-office) : les
 * policies RLS (companies_cabinet_insert, client_companies_cabinet_insert)
 * appliquent la même règle via la fonction can_manage_companies() ; cette
 * vérification côté API renvoie simplement un message clair plus tôt.
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }

  const [{ data: profile }, { data: canManage }] = await Promise.all([
    supabase.from("profiles").select("company_id").eq("id", user.id).single(),
    supabase.rpc("can_manage_companies"),
  ]);

  if (!canManage || !profile?.company_id) {
    return NextResponse.json(
      { error: "La gestion de plusieurs sociétés est réservée à la formule Cabinet." },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Le nom de la société est requis." }, { status: 400 });
  }

  // Identifiant généré ici : la société n'est lisible (RLS) qu'une fois
  // rattachée au compte, on ne la relit donc pas juste après sa création.
  const companyId = randomUUID();
  const { error: companyError } = await supabase.from("companies").insert({ id: companyId, name, is_cabinet: false });

  if (companyError) {
    return NextResponse.json({ error: `Impossible de créer la société : ${companyError.message}` }, { status: 500 });
  }

  const { error: linkError } = await supabase
    .from("client_companies")
    .insert({ cabinet_id: profile.company_id, company_id: companyId });

  if (linkError) {
    return NextResponse.json(
      { error: `Société créée mais non rattachée à votre compte : ${linkError.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ client: { id: companyId, name } });
}
