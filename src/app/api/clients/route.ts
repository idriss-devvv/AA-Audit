import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type ProfileWithCabinetFlag = {
  company_id: string | null;
  companies: { is_cabinet: boolean } | null;
};

/**
 * POST /api/clients
 *
 * Crée une nouvelle entreprise cliente et la rattache au cabinet de
 * l'utilisateur connecté. Réservé aux comptes "cabinet comptable" — les
 * policies RLS (companies_cabinet_insert, client_companies_cabinet_insert)
 * appliquent la même restriction côté base, cette vérification côté API ne
 * fait que renvoyer un message d'erreur clair plus tôt.
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }

  const { data: profileData } = await supabase
    .from("profiles")
    .select("company_id, companies(is_cabinet)")
    .eq("id", user.id)
    .single();

  const profile = profileData as unknown as ProfileWithCabinetFlag | null;
  const isCabinet = profile?.companies?.is_cabinet ?? false;

  if (!isCabinet || !profile?.company_id) {
    return NextResponse.json(
      { error: "Cette action est réservée aux comptes cabinet comptable." },
      { status: 403 }
    );
  }

  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";

  if (!name) {
    return NextResponse.json({ error: "Le nom de l'entreprise cliente est requis." }, { status: 400 });
  }

  const { data: newCompany, error: companyError } = await supabase
    .from("companies")
    .insert({ name, is_cabinet: false })
    .select("id, name")
    .single();

  if (companyError || !newCompany) {
    return NextResponse.json(
      { error: `Impossible de créer le client : ${companyError?.message ?? ""}` },
      { status: 500 }
    );
  }

  const { error: linkError } = await supabase
    .from("client_companies")
    .insert({ cabinet_id: profile.company_id, company_id: newCompany.id });

  if (linkError) {
    return NextResponse.json(
      { error: `Client créé mais non rattaché à votre cabinet : ${linkError.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ client: newCompany });
}
