import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { demoPayslipsByUploadDate } from "@/lib/demo-data";
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

  const { activeCompanyName } = await getActiveCompanyContext();

  // Version de démonstration : export des anomalies des fiches d'exemple.
  const rows: AnomalyExportRow[] = demoPayslipsByUploadDate().flatMap((p) =>
    p.anomalies.map((a) => ({
      ...a,
      detected_at: p.uploadedAt,
      payslip: { period: p.period, original_filename: p.fileName },
    }))
  );

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "A&A Audit";
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
