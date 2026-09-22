import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { ACTIVE_COMPANY_COOKIE } from "@/lib/active-company";

/**
 * POST /api/clients/switch
 *
 * Change l'entreprise cliente actuellement affichée pour un compte cabinet
 * (stockée dans un cookie httpOnly, lu par getActiveCompanyContext()).
 * Un cabinet ne peut basculer que vers sa propre entreprise ou l'un de ses
 * clients rattachés — vérifié ici, et de toute façon garanti par les
 * policies RLS pour toute lecture/écriture ultérieure.
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }

  const body = await req.json().catch(() => null);
  const companyId = typeof body?.companyId === "string" ? body.companyId : null;

  if (!companyId) {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("company_id")
    .eq("id", user.id)
    .single();

  if (!profile?.company_id) {
    return NextResponse.json({ error: "Profil introuvable." }, { status: 400 });
  }

  let allowed = companyId === profile.company_id;

  if (!allowed) {
    const { data: link } = await supabase
      .from("client_companies")
      .select("company_id")
      .eq("cabinet_id", profile.company_id)
      .eq("company_id", companyId)
      .maybeSingle();
    allowed = Boolean(link);
  }

  if (!allowed) {
    return NextResponse.json({ error: "Vous n'avez pas accès à cette entreprise." }, { status: 403 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ACTIVE_COMPANY_COOKIE, companyId, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}
