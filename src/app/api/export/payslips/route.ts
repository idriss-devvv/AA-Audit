import { NextResponse } from "next/server";
import ExcelJS from "exceljs";
import { createClient } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import {
  autoSizeColumns,
  styleHeaderRow,
  workbookToBuffer,
  xlsxResponseHeaders,
} from "@/lib/export/workbook-helpers";
import type { PayslipData } from "@/types/payslip";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUS_LABELS: Record<string, string> = {
  processed: "Analysée",
  pending: "En attente",
  error: "Erreur",
};

type PayslipExportRow = {
  id: string;
  period: string | null;
  original_filename: string | null;
  gross_pay: number | null;
  net_pay: number | null;
  status: string;
  uploaded_at: string;
  extracted_data: PayslipData | null;
  anomalies: { count: number }[] | null;
};

/**
 * GET /api/export/payslips
 *
 * Exporte au format Excel (.xlsx) l'historique complet des fiches de paie
 * de l'entreprise actuellement sélectionnée (la sienne, ou un client du
 * cabinet). Les policies RLS garantissent que seules les fiches accessibles
 * à l'utilisateur sont incluses.
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
    .from("payslips")
    .select(
      "id, period, original_filename, gross_pay, net_pay, status, uploaded_at, extracted_data, anomalies(count)"
    )
    .eq("company_id", activeCompanyId ?? "")
    .order("uploaded_at", { ascending: false });

  if (error) {
    return NextResponse.json(
      { error: "Impossible de récupérer les fiches de paie." },
      { status: 500 }
    );
  }

  const rows = (data as unknown as PayslipExportRow[] | null) ?? [];

  const workbook = new ExcelJS.Workbook();
  workbook.creator = "PayAudit";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("Fiches de paie");
  sheet.addRow([
    "Fichier",
    "Salarié",
    "Période",
    "Brut (€)",
    "Net (€)",
    "Anomalies",
    "Statut",
    "Convention collective",
    "Importée le",
  ]);
  styleHeaderRow(sheet.getRow(1));

  rows.forEach((row) => {
    sheet.addRow([
      row.original_filename || "Fiche de paie",
      row.extracted_data?.employeeName || "—",
      row.period || "—",
      row.gross_pay ?? "",
      row.net_pay ?? "",
      row.anomalies?.[0]?.count ?? 0,
      STATUS_LABELS[row.status] ?? row.status,
      row.extracted_data?.collectiveAgreement || "—",
      new Date(row.uploaded_at).toLocaleDateString("fr-FR"),
    ]);
  });

  sheet.getColumn(4).numFmt = "#,##0.00 €";
  sheet.getColumn(5).numFmt = "#,##0.00 €";
  autoSizeColumns(sheet, [28, 22, 10, 12, 12, 10, 14, 20, 14]);

  const buffer = await workbookToBuffer(workbook);
  const safeName = (activeCompanyName || "entreprise")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const fileName = `fiches-de-paie-${safeName}-${new Date().toISOString().slice(0, 10)}.xlsx`;

  return new NextResponse(buffer, { headers: xlsxResponseHeaders(fileName) });
}
