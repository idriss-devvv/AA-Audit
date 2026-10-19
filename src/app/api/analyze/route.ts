import { NextResponse } from "next/server";
import { DEMO_UPLOAD_MESSAGE } from "@/lib/demo-data";

/**
 * POST /api/analyze
 * Version de démonstration : l'analyse des fiches de paie est en cours de
 * développement.
 */
export async function POST() {
  return NextResponse.json({ error: DEMO_UPLOAD_MESSAGE, code: "COMING_SOON" }, { status: 503 });
}
