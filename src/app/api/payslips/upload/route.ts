import { NextRequest, NextResponse } from "next/server";

const MAX_SIZE = 10 * 1024 * 1024; // 10 Mo
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

/**
 * POST /api/payslips/upload
 * Reçoit une fiche de paie (PDF ou image) et la stocke avant analyse.
 * À implémenter : stockage (Vercel Blob/S3) + parsing (src/lib/parsers).
 */
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json(
      { error: "Fichier trop volumineux (10 Mo maximum)" },
      { status: 400 }
    );
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Format non supporté (PDF, JPG ou PNG uniquement)" },
      { status: 400 }
    );
  }

  // TODO: stocker le fichier (Vercel Blob/S3), extraire les données
  // (src/lib/parsers) et créer l'entrée Payslip en base (src/lib/db.ts).

  return NextResponse.json({ status: "received", fileName: file.name });
}
