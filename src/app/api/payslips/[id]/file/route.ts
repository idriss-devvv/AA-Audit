import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ouvre le fichier d'origine d'une fiche de paie (bouton « œil »). L'accès est
 * vérifié par RLS (entreprise de la fiche), puis le navigateur est redirigé
 * vers un lien signé valable 2 minutes : le fichier n'est jamais public.
 */
export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { data: payslip } = await supabase
    .from("payslips")
    .select("file_url, deleted_at")
    .eq("id", params.id)
    .maybeSingle();

  if (!payslip || payslip.deleted_at || !payslip.file_url) {
    return NextResponse.json({ error: "Fiche introuvable." }, { status: 404 });
  }

  const { data, error } = await supabase.storage.from("payslips").createSignedUrl(payslip.file_url, 120);
  if (error || !data?.signedUrl) {
    return NextResponse.json({ error: "Fichier indisponible." }, { status: 404 });
  }

  return NextResponse.redirect(data.signedUrl, { headers: { "Cache-Control": "no-store" } });
}
