import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact-entreprise
 * Reçoit une demande de devis "Entreprise" (nom, email, téléphone,
 * volume mensuel de fiches de paie, options choisies dans le simulateur).
 * TODO: envoyer un email de notification et/ou stocker le lead en base.
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const payslipVolume = formData.get("payslipVolume");

  if (!name || !email || !phone || !payslipVolume) {
    return NextResponse.json(
      { error: "Champs manquants" },
      { status: 400 }
    );
  }

  // Le champ facultatif « options » (simulateur) est à joindre à la notification.
  // TODO: brancher un service d'envoi d'email (Resend, Postmark...)
  // et/ou créer un enregistrement "lead" dans Supabase.

  return NextResponse.json({ status: "ok" });
}
