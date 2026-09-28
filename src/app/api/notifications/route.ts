import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getNotifications } from "@/lib/notifications";

export const dynamic = "force-dynamic";

/** GET /api/notifications — dernières notifications et nombre de non lues. */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  return NextResponse.json(await getNotifications());
}

/** POST /api/notifications — { ids?: string[] } : marque comme lues (toutes si ids absent). */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const ids = Array.isArray(body?.ids) ? body.ids.filter((id: unknown) => typeof id === "string").slice(0, 100) : null;
  let query = supabase.from("notifications").update({ read_at: new Date().toISOString() }).is("read_at", null);
  if (ids) query = query.in("id", ids);
  const { error } = await query;
  if (error) return NextResponse.json({ error: "Mise à jour impossible." }, { status: 500 });
  return NextResponse.json({ ok: true });
}
