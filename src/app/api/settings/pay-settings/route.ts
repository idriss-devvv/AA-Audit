import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";

export const dynamic = "force-dynamic";

function parseNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === "") return null;
  const n = typeof value === "number" ? value : parseFloat(String(value).replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

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
  const csgCrdsNonDeductiblePercent = parseNullableNumber(body.csgCrdsNonDeductiblePercent);
  const salaireMinimumConventionnel = parseNullableNumber(body.salaireMinimumConventionnel);

  const { error } = await supabase.from("company_pay_settings").upsert(
    {
      company_id: activeCompanyId,
      csg_crds_non_deductible_percent: csgCrdsNonDeductiblePercent,
      salaire_minimum_conventionnel: salaireMinimumConventionnel,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "company_id" }
  );

  if (error) {
    return NextResponse.json({ error: `Échec de l'enregistrement : ${error.message}` }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
