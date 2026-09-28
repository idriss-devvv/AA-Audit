import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { PLAN_ORDER, type AppRole } from "@/lib/plans";

const ROLES: AppRole[] = ["super_admin", "admin", "client"];

const ERRORS: Record<string, string> = {
  FORBIDDEN: "Action non autorisée pour votre rôle.",
  CANNOT_BLOCK_SELF: "Vous ne pouvez pas bloquer votre propre compte.",
  CANNOT_CHANGE_OWN_ROLE: "Vous ne pouvez pas modifier votre propre rôle.",
  INVALID_PLAN: "Formule inconnue.",
  INVALID_ROLE: "Rôle inconnu.",
  INVALID_QUOTA: "Limite de fiches invalide.",
};

/**
 * POST /api/admin/accounts — actions du back-office (super admin, admin).
 * Chaque action appelle une fonction SQL security definer qui revérifie le
 * rôle de l'appelant : cette route ne fait que valider et traduire.
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });

  const body = await req.json().catch(() => null);
  const action = body?.action;
  let result;

  if (action === "plan" && typeof body.companyId === "string" && PLAN_ORDER.includes(body.value)) {
    result = await supabase.rpc("admin_set_plan", { p_company: body.companyId, p_plan: body.value });
  } else if (action === "block" && typeof body.userId === "string" && typeof body.value === "boolean") {
    result = await supabase.rpc("admin_set_blocked", { p_user: body.userId, p_blocked: body.value });
  } else if (
    action === "quota" &&
    typeof body.companyId === "string" &&
    (body.value === null || (Number.isInteger(body.value) && body.value >= 0))
  ) {
    // null : retour à la limite de la formule.
    result = await supabase.rpc("admin_set_quota", { p_company: body.companyId, p_quota: body.value });
  } else if (action === "role" && typeof body.userId === "string" && ROLES.includes(body.value)) {
    result = await supabase.rpc("admin_set_role", { p_user: body.userId, p_role: body.value });
  } else {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  if (result.error) {
    const code = Object.keys(ERRORS).find((key) => result.error?.message.includes(key));
    return NextResponse.json({ error: code ? ERRORS[code] : "Action impossible." }, { status: code === "FORBIDDEN" ? 403 : 400 });
  }
  return NextResponse.json({ ok: true });
}
