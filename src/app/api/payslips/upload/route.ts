import { NextResponse } from "next/server";
import { DEMO_UPLOAD_MESSAGE } from "@/lib/demo-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/payslips/upload
 * Version de démonstration : l'import et l'analyse des fiches de paie sont en
 * cours de développement.
 */
export async function POST() {
  return NextResponse.json({ error: DEMO_UPLOAD_MESSAGE, code: "COMING_SOON" }, { status: 503 });
}
