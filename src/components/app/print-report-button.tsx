"use client";

export function PrintReportButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="print:hidden rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-beige-50 transition hover:bg-blue-700"
    >
      Imprimer / Exporter en PDF
    </button>
  );
}
