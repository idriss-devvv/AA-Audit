import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Supprime une fiche de paie : le fichier, les données extraites et les
 * anomalies sont effacés. La ligne est conservée anonymisée (deleted_at) pour
 * que le quota de la formule ne puisse pas être contourné.
 */
export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: payslip } = await supabase
    .from("payslips")
    .select("id, file_url, deleted_at")
    .eq("id", params.id)
    .maybeSingle();

  if (!payslip || payslip.deleted_at) {
    return NextResponse.json({ error: "Fiche introuvable." }, { status: 404 });
  }

  if (payslip.file_url) {
    await supabase.storage.from("payslips").remove([payslip.file_url]);
  }

  const [{ error: anomaliesError }, { error: updateError }] = await Promise.all([
    supabase.from("anomalies").delete().eq("payslip_id", payslip.id),
    supabase
      .from("payslips")
      .update({
        deleted_at: new Date().toISOString(),
        file_url: null,
        original_filename: null,
        extracted_data: null,
        gross_pay: null,
        net_pay: null,
        file_hash: null,
        error_message: null,
      })
      .eq("id", payslip.id),
  ]);

  if (anomaliesError || updateError) {
    return NextResponse.json({ error: "Suppression impossible, réessayez." }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
