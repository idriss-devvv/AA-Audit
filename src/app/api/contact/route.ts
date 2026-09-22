import { NextRequest, NextResponse } from "next/server";

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

  return NextResponse.json({ status: "ok" });
}
