import { NextRequest, NextResponse } from "next/server";

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

  return NextResponse.json({ status: "ok" });
}
