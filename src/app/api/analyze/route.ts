import { NextRequest, NextResponse } from "next/server";
import { runAnomalyRules } from "@/lib/rules/anomaly-rules";

export async function POST(req: NextRequest) {
  const payslip = await req.json();
  const anomalies = runAnomalyRules(payslip);
  return NextResponse.json({ anomalies });
}
