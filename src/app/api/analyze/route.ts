import { NextRequest, NextResponse } from "next/server";
import { runAnomalyRules } from "@/lib/rules/anomaly-rules";

/**
 * POST /api/analyze
 * Lance le moteur de règles sur une fiche de paie déjà extraite
 * et retourne la liste des anomalies détectées.
 */
export async function POST(req: NextRequest) {
  const payslip = await req.json();

  const anomalies = runAnomalyRules(payslip);

  return NextResponse.json({ anomalies });
}
