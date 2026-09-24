import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { extractText, getDocumentProxy } from "unpdf";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { parsePayslip } from "@/lib/parsers/payslip-parser";
import { runAnomalyRules } from "@/lib/rules/anomaly-rules";
import { getCompanyPaySettings, listCollectiveAgreements, toRuleContext } from "@/lib/pay-settings";
import { detectCollectiveAgreement } from "@/lib/collective-agreement-detection";
import type { PayslipData } from "@/types/payslip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");

  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "Aucun fichier reçu" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Fichier trop volumineux (10 Mo maximum)" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "Format non supporté (PDF, JPG ou PNG uniquement)" }, { status: 400 });
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("company_id, full_name")
    .eq("id", user.id)
    .single();

  if (profileError || !profile?.company_id) {
    return NextResponse.json({ error: "Profil ou entreprise introuvable pour cet utilisateur." }, { status: 400 });
  }

  const { activeCompanyId } = await getActiveCompanyContext();
  const targetCompanyId = activeCompanyId ?? profile.company_id;

  const buffer = Buffer.from(await file.arrayBuffer());

  const extension = file.name.split(".").pop()?.toLowerCase() || "pdf";
  const storagePath = `${user.id}/${randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from("payslips")
    .upload(storagePath, buffer, { contentType: file.type, upsert: false });

  if (uploadError) {
    return NextResponse.json({ error: `Échec du stockage du fichier : ${uploadError.message}` }, { status: 500 });
  }

  let extracted: PayslipData | null = null;
  let status: "processed" | "pending" | "error" = "pending";
  let extractionError: string | null = null;

  if (file.type === "application/pdf") {
    try {
      const pdf = await getDocumentProxy(new Uint8Array(buffer));
      const { text } = await extractText(pdf, { mergePages: true });
      extracted = parsePayslip(text);
      // Identification automatique de la convention collective (IDCC imprimé
      // sur le bulletin, sinon rapprochement du libellé avec le registre).
      const agreement = detectCollectiveAgreement(
        extracted.collectiveAgreementIdcc,
        extracted.collectiveAgreement,
        await listCollectiveAgreements()
      );
      if (agreement) {
        extracted.collectiveAgreementIdcc = agreement.idcc;
        extracted.collectiveAgreementName = agreement.name;
      }
      status = "processed";
    } catch (err) {
      status = "error";
      extractionError = err instanceof Error ? `${err.name}: ${err.message}` : String(err);
      console.error("[payslips/upload] Échec extraction PDF:", err);
    }
  }

  const employeeRef = user.id;
  const { data: existingEmployee } = await supabase
    .from("employees")
    .select("id")
    .eq("company_id", targetCompanyId)
    .eq("employee_ref", employeeRef)
    .maybeSingle();

  let employeeId: string | undefined = existingEmployee?.id;

  if (!employeeId) {
    const fullName = profile.full_name || user.email || "Salarié";
    const [firstName, ...rest] = fullName.split(" ").filter(Boolean);

    const { data: newEmployee, error: employeeError } = await supabase
      .from("employees")
      .insert({
        company_id: targetCompanyId,
        first_name: firstName || "Salarié",
        last_name: rest.join(" ") || "-",
        employee_ref: employeeRef,
      })
      .select("id")
      .single();

    if (employeeError || !newEmployee) {
      return NextResponse.json({ error: "Impossible de créer la fiche employé associée." }, { status: 500 });
    }
    employeeId = newEmployee.id;
  }

  const { data: payslip, error: payslipError } = await supabase
    .from("payslips")
    .insert({
      company_id: targetCompanyId,
      employee_id: employeeId,
      uploaded_by: user.id,
      period: extracted?.period ?? new Date().toISOString().slice(0, 7),
      file_url: storagePath,
      gross_pay: extracted?.grossPay ?? null,
      net_pay: extracted?.netPay ?? null,
      status,
      original_filename: file.name,
      mime_type: file.type,
      extracted_data: extracted,
    })
    .select("id")
    .single();

  if (payslipError || !payslip) {
    return NextResponse.json({ error: `Échec de l'enregistrement de la fiche : ${payslipError?.message ?? ""}` }, { status: 500 });
  }

  let anomaliesCount = 0;
  if (extracted) {
    const paySettings = await getCompanyPaySettings(targetCompanyId);
    const anomalies = runAnomalyRules(extracted, toRuleContext(paySettings));
    anomaliesCount = anomalies.length;

    if (anomalies.length > 0) {
      await supabase.from("anomalies").insert(
        anomalies.map((anomaly) => ({
          payslip_id: payslip.id,
          rule_id: anomaly.ruleId,
          severity: anomaly.severity,
          message: anomaly.message,
        }))
      );
    }
  }

  return NextResponse.json({
    status,
    payslipId: payslip.id,
    fileName: file.name,
    extracted,
    anomaliesCount,
  });
}
