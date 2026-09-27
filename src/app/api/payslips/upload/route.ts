import { NextRequest, NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { getQuotaUsage } from "@/lib/account";
import { PLANS, quotaLabel, toPlanId } from "@/lib/plans";
import { parsePayslip } from "@/lib/parsers/payslip-parser";
import { extractPdfLines } from "@/lib/parsers/pdf-text";
import { runAnomalyRules } from "@/lib/rules/anomaly-rules";
import {
  getCompanyPaySettings,
  listAvailableAgreementIdccs,
  listCollectiveAgreements,
  toRuleContext,
} from "@/lib/pay-settings";
import { detectCollectiveAgreement } from "@/lib/collective-agreement-detection";
import type { PayslipData } from "@/types/payslip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ["application/pdf", "image/jpeg", "image/png"];

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  // Contexte mémoïsé : un seul getUser + une seule lecture du profil.
  const { userId, ownCompanyId, activeCompanyId } = await getActiveCompanyContext();

  if (!userId) {
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

  if (!ownCompanyId) {
    return NextResponse.json({ error: "Profil ou entreprise introuvable pour cet utilisateur." }, { status: 400 });
  }

  const targetCompanyId = activeCompanyId ?? ownCompanyId;

  // Quota de la formule, vérifié avant tout envoi pour un message clair (la
  // base applique la même règle via le trigger enforce_payslip_quota).
  const [{ data: planId }, { data: isStaff }] = await Promise.all([
    supabase.rpc("company_plan", { p_company: targetCompanyId }),
    supabase.rpc("is_staff"),
  ]);
  const plan = PLANS[toPlanId(planId as string | null)];
  if (!isStaff && plan.quota !== null) {
    const used = await getQuotaUsage(targetCompanyId, plan);
    if (used >= plan.quota) {
      return NextResponse.json(
        {
          error:
            plan.id === "free"
              ? "Votre fiche d'essai gratuite a déjà été utilisée. Choisissez une formule pour continuer à contrôler vos fiches de paie."
              : `Limite de la formule ${plan.label} atteinte (${quotaLabel(plan)}). Passez à la formule supérieure pour importer davantage de fiches ce mois-ci.`,
          code: "QUOTA_EXCEEDED",
        },
        { status: 403 }
      );
    }
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const extension = file.name.split(".").pop()?.toLowerCase() || "pdf";
  const storagePath = `${userId}/${randomUUID()}.${extension}`;

  // Étapes indépendantes lancées en parallèle : stockage du fichier, lecture
  // du PDF (avec les référentiels) et barèmes de l'entreprise.
  const [{ error: uploadError }, analysis, paySettings] = await Promise.all([
    supabase.storage.from("payslips").upload(storagePath, buffer, { contentType: file.type, upsert: false }),
    file.type === "application/pdf" ? analyzePdf(buffer) : Promise.resolve(null),
    getCompanyPaySettings(targetCompanyId),
  ]);

  if (uploadError) {
    return NextResponse.json({ error: `Échec du stockage du fichier : ${uploadError.message}` }, { status: 500 });
  }

  const extracted: PayslipData | null = analysis?.extracted ?? null;
  const status: "processed" | "pending" | "error" = analysis ? (analysis.extracted ? "processed" : "error") : "pending";

  // Salarié : reconnu par le nom lu sur le bulletin (référence normalisée),
  // créé à la première fiche. À défaut de nom, fiche rattachée à un salarié
  // « non identifié » de l'entreprise.
  const detectedName = extracted?.employeeName?.trim().replace(/\s+/g, " ") || "";
  const employeeRef = detectedName
    ? `nom:${detectedName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`
    : "non-identifie";
  const { data: existingEmployee } = await supabase
    .from("employees")
    .select("id")
    .eq("company_id", targetCompanyId)
    .eq("employee_ref", employeeRef)
    .maybeSingle();

  let employeeId: string | undefined = existingEmployee?.id;

  if (!employeeId) {
    const [firstName, ...rest] = detectedName ? detectedName.split(" ") : ["Salarié", "non identifié"];

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

    if (employeeError?.code === "23505") {
      // Créé au même instant par un autre import (index unique) : on le relit.
      const { data: concurrentEmployee } = await supabase
        .from("employees")
        .select("id")
        .eq("company_id", targetCompanyId)
        .eq("employee_ref", employeeRef)
        .maybeSingle();
      employeeId = concurrentEmployee?.id;
    } else if (newEmployee) {
      employeeId = newEmployee.id;
    }

    if (!employeeId) {
      return NextResponse.json({ error: "Impossible de créer la fiche salarié associée." }, { status: 500 });
    }
  }

  const { data: payslip, error: payslipError } = await supabase
    .from("payslips")
    .insert({
      company_id: targetCompanyId,
      employee_id: employeeId,
      uploaded_by: userId,
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
    // Fichier déjà stocké : on le retire pour ne pas laisser d'orphelin.
    await supabase.storage.from("payslips").remove([storagePath]);
    if (payslipError?.message?.includes("QUOTA_EXCEEDED")) {
      return NextResponse.json(
        { error: `Limite de la formule ${plan.label} atteinte (${quotaLabel(plan)}).`, code: "QUOTA_EXCEEDED" },
        { status: 403 }
      );
    }
    return NextResponse.json({ error: `Échec de l'enregistrement de la fiche : ${payslipError?.message ?? ""}` }, { status: 500 });
  }

  let anomaliesCount = 0;
  if (extracted) {
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
    agreementUnavailable: extracted?.collectiveAgreementAvailable === false,
  });
}

/**
 * Lecture du PDF et identification de la convention collective (IDCC imprimé
 * sur le bulletin, sinon rapprochement du libellé avec le registre). Les
 * référentiels sont chargés pendant la lecture du PDF.
 */
async function analyzePdf(buffer: Buffer): Promise<{ extracted: PayslipData | null }> {
  const agreementsPromise = listCollectiveAgreements();
  const availablePromise = listAvailableAgreementIdccs();
  // Évite un rejet non géré si l'extraction échoue avant leur lecture.
  agreementsPromise.catch(() => undefined);
  availablePromise.catch(() => undefined);

  try {
    const text = await extractPdfLines(new Uint8Array(buffer));
    const extracted = parsePayslip(text);
    const agreement = detectCollectiveAgreement(
      extracted.collectiveAgreementIdcc,
      extracted.collectiveAgreement,
      await agreementsPromise
    );
    if (agreement) {
      extracted.collectiveAgreementIdcc = agreement.idcc;
      extracted.collectiveAgreementName = agreement.name;
    }
    // Convention détectée mais sans critères de contrôle stockés : signalée
    // « non disponible pour le moment » (fiche contrôlée sans les règles
    // conventionnelles).
    if (extracted.collectiveAgreementIdcc || extracted.collectiveAgreement) {
      const idcc = extracted.collectiveAgreementIdcc ? String(parseInt(extracted.collectiveAgreementIdcc, 10)) : null;
      extracted.collectiveAgreementAvailable = idcc !== null && (await availablePromise).has(idcc);
    }
    return { extracted };
  } catch (err) {
    console.error("[payslips/upload] Échec extraction PDF:", err);
    return { extracted: null };
  }
}
