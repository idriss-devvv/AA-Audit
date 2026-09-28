import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const clean = (value: unknown, max = 200) => (typeof value === "string" && value.trim() ? value.trim().slice(0, max) : null);

/** POST /api/admin/support — coordonnées du bouton « Aide » (back-office). */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const url = clean(body.url, 500);
  if (url && !/^https?:\/\//i.test(url)) {
    return NextResponse.json({ error: "Le lien doit commencer par http:// ou https://." }, { status: 400 });
  }

  // La RLS réserve la modification au back-office : 0 ligne modifiée = refus.
  const { data, error } = await supabase
    .from("platform_settings")
    .update({
      support_name: clean(body.name),
      support_email: clean(body.email),
      support_phone: clean(body.phone, 40),
      support_url: url,
      support_hours: clean(body.hours),
      updated_at: new Date().toISOString(),
    })
    .eq("id", true)
    .select("id");
  if (error) return NextResponse.json({ error: "Enregistrement impossible." }, { status: 500 });
  if (!data?.length) return NextResponse.json({ error: "Action non autorisée pour votre rôle." }, { status: 403 });
  return NextResponse.json({ ok: true });
}
