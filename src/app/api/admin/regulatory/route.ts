import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DATE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * POST /api/admin/regulatory — nouvelle valeur datée d'un paramètre
 * réglementaire { key, value, validFrom, source, label?, unit? }. La valeur
 * précédente encore ouverte est close à la date d'effet de la nouvelle.
 * DELETE /api/admin/regulatory?id=… — supprime une valeur (saisie erronée).
 * Écriture réservée au back-office (RLS).
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  const { data: isStaff } = await supabase.rpc("is_staff");
  if (!isStaff) return NextResponse.json({ error: "Action non autorisée pour votre rôle." }, { status: 403 });

  const body = await req.json().catch(() => ({}));
  const key = typeof body.key === "string" ? body.key.trim() : "";
  const value = typeof body.value === "number" ? body.value : parseFloat(String(body.value ?? "").replace(",", "."));
  const validFrom = typeof body.validFrom === "string" ? body.validFrom : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";
  if (!/^[a-z_]+\.[a-z0-9_]+$/.test(key) || !Number.isFinite(value) || !DATE.test(validFrom) || source.length < 5) {
    return NextResponse.json({ error: "Renseignez le paramètre, une valeur, une date d'effet et la source officielle." }, { status: 400 });
  }

  const { data: existing } = await supabase
    .from("regulatory_parameters")
    .select("label, unit, valid_from")
    .eq("key", key)
    .order("valid_from", { ascending: false });
  const label = (typeof body.label === "string" && body.label.trim()) || existing?.[0]?.label;
  const unit = (typeof body.unit === "string" && body.unit.trim()) || existing?.[0]?.unit;
  if (!label || !unit) return NextResponse.json({ error: "Libellé et unité requis pour un nouveau paramètre." }, { status: 400 });
  if (existing?.some((p) => p.valid_from === validFrom)) {
    return NextResponse.json({ error: "Une valeur existe déjà à cette date d'effet." }, { status: 409 });
  }

  // Valeur précédente encore ouverte, antérieure à la nouvelle date : close à cette date.
  await supabase.from("regulatory_parameters").update({ valid_to: validFrom, updated_at: new Date().toISOString() }).eq("key", key).is("valid_to", null).lt("valid_from", validFrom);
  // Valeur postérieure déjà saisie : la nouvelle s'arrête à sa date d'effet.
  const next = (existing ?? []).filter((p) => p.valid_from > validFrom).sort((a, b) => a.valid_from.localeCompare(b.valid_from))[0];

  const { error } = await supabase.from("regulatory_parameters").insert({
    key,
    label,
    unit,
    value,
    valid_from: validFrom,
    valid_to: next?.valid_from ?? null,
    source,
    notes: typeof body.notes === "string" && body.notes.trim() ? body.notes.trim() : null,
  });
  if (error) return NextResponse.json({ error: "Enregistrement impossible." }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Identifiant manquant." }, { status: 400 });
  const { data, error } = await supabase.from("regulatory_parameters").delete().eq("id", id).select("id");
  if (error) return NextResponse.json({ error: "Suppression impossible." }, { status: 500 });
  if (!data?.length) return NextResponse.json({ error: "Action non autorisée pour votre rôle." }, { status: 403 });
  return NextResponse.json({ ok: true });
}
