import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { PLAN_ORDER, type AppRole, type PlanId } from "@/lib/plans";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ROLES: AppRole[] = ["super_admin", "admin", "client"];

/**
 * POST /api/admin/invite — le back-office ajoute un utilisateur.
 * Supabase envoie l'e-mail d'invitation ; le lien ouvre la page « Nouveau
 * mot de passe ». Formule, limite et rôle sont ensuite appliqués avec la
 * session de l'appelant : les fonctions SQL revérifient ses droits.
 */
export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });

  const { data: isStaff } = await supabase.rpc("is_staff");
  if (!isStaff) return NextResponse.json({ error: "Action non autorisée pour votre rôle." }, { status: 403 });

  const body = await req.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const fullName = typeof body?.fullName === "string" ? body.fullName.trim() : "";
  const companyName = typeof body?.companyName === "string" ? body.companyName.trim() : "";
  const isCabinet = body?.isCabinet === true;
  const plan: PlanId = PLAN_ORDER.includes(body?.plan) ? body.plan : "free";
  const quota = body?.quota === null || body?.quota === undefined ? null : body.quota;
  const role: AppRole = ROLES.includes(body?.role) ? body.role : "client";

  if (!EMAIL_PATTERN.test(email)) return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  if (quota !== null && !(Number.isInteger(quota) && quota >= 0)) {
    return NextResponse.json({ error: "Limite de fiches invalide." }, { status: 400 });
  }

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json(
      { error: "Invitations indisponibles : la clé SUPABASE_SERVICE_ROLE_KEY n'est pas configurée sur le serveur." },
      { status: 503 }
    );
  }

  // Le trigger handle_new_user crée la société et l'abonnement free.
  const { data: invited, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    data: {
      full_name: fullName || email,
      company_name: companyName || fullName || email,
      account_type: isCabinet ? "cabinet" : "entreprise",
    },
    redirectTo: `${req.nextUrl.origin}/reinitialiser-mot-de-passe`,
  });
  if (inviteError || !invited.user) {
    const exists = /already|exists|registered/i.test(inviteError?.message ?? "");
    return NextResponse.json(
      { error: exists ? "Un compte existe déjà avec cet e-mail." : "Invitation impossible pour le moment, réessayez." },
      { status: exists ? 409 : 500 }
    );
  }

  const { data: profile } = await admin.from("profiles").select("company_id").eq("id", invited.user.id).single();
  const companyId = profile?.company_id as string | undefined;
  const warnings: string[] = [];

  if (companyId && plan !== "free") {
    const { error } = await supabase.rpc("admin_set_plan", { p_company: companyId, p_plan: plan });
    if (error) warnings.push("formule");
  }
  if (companyId && quota !== null) {
    const { error } = await supabase.rpc("admin_set_quota", { p_company: companyId, p_quota: quota });
    if (error) warnings.push("limite de fiches");
  }
  if (role !== "client") {
    // Refusé par la base si l'appelant n'est pas super admin.
    const { error } = await supabase.rpc("admin_set_role", { p_user: invited.user.id, p_role: role });
    if (error) warnings.push("rôle");
  }

  return NextResponse.json({
    ok: true,
    warning: warnings.length ? `Invitation envoyée, mais non appliqué : ${warnings.join(", ")}.` : null,
  });
}
