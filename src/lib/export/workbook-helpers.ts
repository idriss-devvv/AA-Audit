import ExcelJS from "exceljs";

/**
 * En-tête commun appliqué à chaque feuille exportée : style léger, sans
 * dépendre d'un thème externe (les fichiers sont ouverts tels quels dans
 * Excel/LibreOffice/Google Sheets par le client final).
 */
export function styleHeaderRow(row: ExcelJS.Row) {
  row.font = { bold: true, color: { argb: "FFFFFFFF" } };
  row.fill = {
    type: "pattern",
    pattern: "solid",
    fgColor: { argb: "FF1D4ED8" },
  };
  row.alignment = { vertical: "middle" };
  row.height = 20;
}

export function autoSizeColumns(
  worksheet: ExcelJS.Worksheet,
  minWidths: number[]
) {
  worksheet.columns.forEach((column, index) => {
    let maxLength = minWidths[index] ?? 10;
    column.eachCell?.({ includeEmpty: false }, (cell) => {
      const length = cell.value ? String(cell.value).length : 0;
      if (length > maxLength) maxLength = length;
    });
    column.width = Math.min(maxLength + 2, 60);
  });
}

export async function workbookToBuffer(workbook: ExcelJS.Workbook) {
  const arrayBuffer = await workbook.xlsx.writeBuffer();
  return Buffer.from(arrayBuffer);
}

export function xlsxResponseHeaders(fileName: string): HeadersInit {
  return {
    "Content-Type":
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "Content-Disposition": `attachment; filename="${fileName}"`,
    "Cache-Control": "no-store",
  };
}
