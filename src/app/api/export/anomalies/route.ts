import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { CATEGORY_LABELS, categoryFromRuleId } from "@/lib/rules/anomaly-rules";
import {
  autoSizeColumns,
  styleHeaderRow,
  workbookToBuffer,
  xlsxResponseHeaders,
} from "@/lib/export/workbook-helpers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SEVERITY_LABELS: Record<string, string> = {
  critical: "Critique",
  warning: "Avertissement",
  info: "Info",
};

type AnomalyExportRow = {
  id: string;
  rule_id: string;
  severity: string;
  message: string;
  detected_at: string;
  payslip: { period: string | null; original_filename: string | null } | null;
};

/**
 * GET /api/export/anomalies
 *
 * Exporte au format Excel (.xlsx) la liste des anomalies détectées pour
 * l'entreprise actuellement sélectionnée.
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Vous devez être connecté." }, { status: 401 });
  }

  const { activeCompanyId, activeCompanyName } = await getActiveCompanyContext();

  const { data, error } = await supabase
    .from("anomalies")
    .select(
      "id, rule_id, severity, message, detected_at, payslip:payslips!inner(period, original_filename, company_id)"
    )
    .eq("payslip.company_id", activeCompanyId ?? "")
    .order("detected_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Impossible de récupérer les anomalies." },
      { status: 500 }
    );
  }

  const rows = (data as unknown as AnomalyExportRow[] | null) ?? [];

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "PayAudit";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Anomalies");
  sheet.addRow([
    "Sévérité",
    "Catégorie",
    "Message",
    "Fiche de paie",
    "Période",
    "Détectée le",
  ]);
  styleHeaderRow(sheet.getRow(1));

  rows.forEach((row) => {
    const category = categoryFromRuleId(row.rule_id);
    sheet.addRow([
      SEVERITY_LABELS[row.severity] ?? row.severity,
      category ? CATEGORY_LABELS[category] : "—",
      row.message,
      row.payslip?.original_filename || "—",
      row.payslip?.period || "—",
      new Date(row.detected_at).toLocaleDateString("fr-FR"),
    ]);
  });

  autoSizeColumns(sheet, [16, 20, 50, 28, 10, 14]);

  const buffer = await workbookToBuffer(workbook);
  const safeName = (activeCompanyName || "entreprise")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const fileName = `anomalies-${safeName}-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new NextResponse(buffer, { headers: xlsxResponseHeaders(fileName) });
}
