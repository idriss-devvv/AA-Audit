import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/contact
 * Reçoit le formulaire de contact du site vitrine.
 * TODO: envoyer un email (ex: Resend) et/ou stocker la demande en base.
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Champs manquants" },
      { status: 400 }
    );
  }

  // TODO: brancher un service d'envoi d'email (Resend, Postmark...)

  return NextResponse.json({ status: "ok" });
}
