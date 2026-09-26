import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { getAccountContext } from "@/lib/account";

/**
 * POST /api/employees — ajoute un salarié à la société affichée (formules
 * Pro et Entreprise). La référence reprend le format utilisé à l'import
 * (`nom:prénom nom` normalisé) pour que les fiches importées ensuite lui
 * soient rattachées automatiquement.
 */
export async function POST(req: NextRequest) {
  const account = await getAccountContext();
  if (!account.userId) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }
  if (!account.canManageEmployees) {
    return NextResponse.json({ error: "La gestion des salariés est réservée aux formules Pro et Entreprise." }, { status: 403 });
  }

  const body = await req.json().catch(() => null);
  const firstName = typeof body?.firstName === "string" ? body.firstName.trim() : "";
  const lastName = typeof body?.lastName === "string" ? body.lastName.trim() : "";
  if (!firstName || !lastName) {
    return NextResponse.json({ error: "Le prénom et le nom sont requis." }, { status: 400 });
  }

  const { activeCompanyId } = await getActiveCompanyContext();
  if (!activeCompanyId) {
    return NextResponse.json({ error: "Société introuvable." }, { status: 400 });
  }

  const fullName = `${firstName} ${lastName}`.replace(/\s+/g, " ");
  const employeeRef = `nom:${fullName.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")}`;

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("employees")
    .select("id")
    .eq("company_id", activeCompanyId)
    .eq("employee_ref", employeeRef)
    .maybeSingle();
  if (existing) {
    return NextResponse.json({ error: "Ce salarié existe déjà." }, { status: 409 });
  }

  const { error } = await supabase.from("employees").insert({
    company_id: activeCompanyId,
    first_name: firstName,
    last_name: lastName,
    employee_ref: employeeRef,
  });
  if (error) {
    return NextResponse.json({ error: `Ajout impossible : ${error.message}` }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
