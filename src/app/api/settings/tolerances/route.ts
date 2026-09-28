import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { sanitizeTolerances } from "@/lib/rules/tolerances";

export const dynamic = "force-dynamic";

/** POST /api/settings/tolerances — seuils de tolérance de l'entreprise active. */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });

  const { activeCompanyId } = await getActiveCompanyContext();
  if (!activeCompanyId) return NextResponse.json({ error: "Entreprise introuvable." }, { status: 400 });

  const tolerances = sanitizeTolerances(await req.json().catch(() => ({})));
  if ((tolerances.netGrossMinPercent ?? 0) > (tolerances.netGrossMaxPercent ?? 100)) {
    return NextResponse.json({ error: "Le ratio net / brut minimum doit être inférieur au maximum." }, { status: 400 });
  }

  const { error } = await supabase
    .from("company_pay_settings")
    .upsert({ company_id: activeCompanyId, tolerances, updated_at: new Date().toISOString() }, { onConflict: "company_id" });
  if (error) return NextResponse.json({ error: `Échec de l'enregistrement : ${error.message}` }, { status: 500 });
  return NextResponse.json({ ok: true });
}
