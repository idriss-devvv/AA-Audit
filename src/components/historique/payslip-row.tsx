"use client";

import { useState } from "react";
import Link from "next/link";
import type { PayslipData } from "@/types/payslip";

type StatusInfo = { label: string; className: string };

export type PayslipRowData = {
  id: string;
  fileName: string;
  periodLabel: string;
  grossLabel: string;
  netLabel: string;
  anomaliesCount: number;
  statusInfo: StatusInfo;
  dateLabel: string;
  extracted: PayslipData | null;
};

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`h-4 w-4 shrink-0 transition-transform duration-150 ${open ? "rotate-90" : ""}`}
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="card-title">{label}</p>
      <p className="mt-0.5 text-sm text-ink-900">{value}</p>
    </div>
  );
}

function formatDays(value: number | null): string {
  if (value === null || value === undefined) return "Non détecté";
  return `${value.toLocaleString("fr-FR")} j`;
}

function formatEuros(value: number): string {
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

export function PayslipRow({ payslip }: { payslip: PayslipRowData }) {
  const [open, setOpen] = useState(false);
  const extracted = payslip.extracted;

  return (
    <>
      <tr className={`transition-colors hover:bg-beige-50/70 ${open ? "bg-beige-50" : ""}`}>
        <td className="px-3 py-4">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Masquer les détails" : "Voir plus de détails"}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-ink-200 bg-white text-ink-400 transition hover:border-ink-300 hover:text-ink-900"
          >
            <ChevronIcon open={open} />
          </button>
        </td>
        <td className="max-w-[16rem] truncate px-6 py-4 font-medium text-ink-900">{payslip.fileName}</td>
        <td className="px-6 py-4 text-ink-700">{payslip.periodLabel}</td>
        <td className="whitespace-nowrap px-6 py-4 tabular-nums text-ink-700">{payslip.grossLabel}</td>
        <td className="whitespace-nowrap px-6 py-4 tabular-nums text-ink-700">{payslip.netLabel}</td>
        <td className="px-6 py-4 text-ink-700">
          {payslip.anomaliesCount > 0 ? (
            <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-rose-50 px-2 text-xs font-semibold text-rose-700 ring-1 ring-inset ring-rose-200">{payslip.anomaliesCount}</span>
          ) : (
            "0"
          )}
        </td>
        <td className="px-6 py-4">
          <span className={`badge ${payslip.statusInfo.className}`}>
            {payslip.statusInfo.label}
          </span>
        </td>
        <td className="whitespace-nowrap px-6 py-4 tabular-nums text-ink-500">{payslip.dateLabel}</td>
        <td className="px-6 py-4">
          <Link
            href={`/app/historique/${payslip.id}`}
            className="inline-flex items-center gap-1 whitespace-nowrap text-sm font-semibold text-blue-600 transition hover:text-blue-800"
          >
            Rapport
          </Link>
        </td>
      </tr>

      {open && (
        <tr className="bg-beige-50">
          <td colSpan={9} className="px-6 pb-6 pt-1">
            {!extracted ? (
              <p className="text-sm text-ink-500">
                Aucune donnée détaillée disponible pour cette fiche (analyse en attente ou en
                erreur).
              </p>
            ) : (
              <div className="rounded-2xl border border-ink-200/70 bg-white p-6 shadow-soft">
                <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                  Détails de la fiche
                </p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <DetailItem label="Salarié" value={extracted.employeeName || "Non détecté"} />
                  <DetailItem label="Poste" value={extracted.position || "Non détecté"} />
                  <DetailItem
                    label="Convention collective"
                    value={extracted.collectiveAgreement || "Non détectée"}
                  />
                  <DetailItem
                    label="Date d'entrée"
                    value={extracted.seniorityDate || "Non détectée"}
                  />
                  <DetailItem
                    label="Congés payés acquis"
                    value={formatDays(extracted.paidLeave?.acquired ?? null)}
                  />
                  <DetailItem
                    label="Congés payés pris"
                    value={formatDays(extracted.paidLeave?.taken ?? null)}
                  />
                  <DetailItem
                    label="Solde congés payés"
                    value={formatDays(extracted.paidLeave?.balance ?? null)}
                  />
                </div>

                <div className="mt-5 border-t border-ink-100 pt-4">
                  <p className="card-title">
                    Cotisations détectées
                  </p>
                  {extracted.contributions.length === 0 ? (
                    <p className="mt-2 text-sm text-ink-500">Aucune cotisation détectée.</p>
                  ) : (
                    <ul className="mt-2 grid gap-x-6 gap-y-1 text-sm text-ink-700 sm:grid-cols-2">
                      {extracted.contributions.map((c, i) => (
                        <li key={i} className="flex items-center justify-between gap-4">
                          <span className="truncate">{c.label}</span>
                          <span className="font-medium text-ink-900">{formatEuros(c.amount)}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <p className="mt-4 text-xs text-ink-400">
                  Extraction automatique (v1) — les règles de contrôle sur la convention
                  collective, l&apos;ancienneté et les congés payés seront paramétrables
                  prochainement.
                </p>
              </div>
            )}
          </td>
        </tr>
      )}
    </>
  );
}
