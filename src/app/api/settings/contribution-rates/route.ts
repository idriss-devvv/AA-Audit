import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";

export const dynamic = "force-dynamic";

/**
 * POST /api/settings/contribution-rates
 *
 * Ajoute (ou remplace, si le libellé existe déjà) un taux de cotisation
 * attendu pour l'entreprise actuellement sélectionnée. Valeur entièrement
 * saisie par le client / l'expert-comptable — jamais préremplie.
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }

  const { activeCompanyId } = await getActiveCompanyContext();
  if (!activeCompanyId) {
    return NextResponse.json({ error: "Entreprise introuvable." }, { status: 400 });
  }

  const body = await req.json().catch(() => ({}));
  const label = typeof body.label === "string" ? body.label.trim() : "";
  const rate =
    typeof body.expectedRatePercent === "number"
      ? body.expectedRatePercent
      : parseFloat(String(body.expectedRatePercent).replace(",", "."));

  if (!label || !Number.isFinite(rate) || rate <= 0) {
    return NextResponse.json(
      { error: "Libellé et taux (en %, supérieur à 0) requis." },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("contribution_rate_settings").upsert(
    { company_id: activeCompanyId, label, expected_rate_percent: rate },
    { onConflict: "company_id,label" }
  );

  if (error) {
    return NextResponse.json(
      { error: `Échec de l'enregistrement : ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}

/**
 * DELETE /api/settings/contribution-rates?id=<uuid>
 */
export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }

  const id = req.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "Identifiant manquant." }, { status: 400 });
  }

  const { error } = await supabase.from("contribution_rate_settings").delete().eq("id", id);

  if (error) {
    return NextResponse.json(
      { error: `Échec de la suppression : ${error.message}` },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
