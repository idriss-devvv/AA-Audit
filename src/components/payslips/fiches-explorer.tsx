"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CATEGORY_LABELS, categoryFromRuleId } from "@/lib/rules/types";
import { AGREEMENT_UNAVAILABLE_MESSAGE } from "@/lib/collective-agreement-detection";
import {
  SEVERITY_INFO,
  formatAmount,
  formatDate,
  formatPeriod,
  statusExplanation,
  statusInfo,
} from "@/lib/payslips";
import { LockedAnomaly } from "@/components/app/locked-anomaly";
import { UpgradeNotice } from "@/components/app/upgrade-notice";
import { PayslipFileFrame, PayslipPreviewButton, fileUrl } from "@/components/payslips/payslip-preview";
import { DeletePayslipButton } from "@/components/payslips/delete-payslip-button";

export type FicheAnomaly = { id: string; rule_id: string; severity: string; message: string };

export type FicheItem = {
  id: string;
  period: string | null;
  fileName: string;
  grossPay: number | null;
  netPay: number | null;
  status: string;
  mimeType: string | null;
  errorMessage: string | null;
  uploadedAt: string;
  uploadedByMe: boolean;
  employeeId: string | null;
  employeeName: string;
  position: string | null;
  agreement: string | null;
  agreementIdcc: string | null;
  agreementAvailable: boolean | null;
  anomalies: FicheAnomaly[];
};

const SEVERITY_FILTERS = [
  { value: "all", label: "Toutes les gravités" },
  { value: "critical", label: "Avec anomalie critique" },
  { value: "warning", label: "Avec avertissement" },
  { value: "info", label: "Avec info" },
  { value: "none", label: "Sans anomalie" },
];

const STATUS_FILTERS = [
  { value: "all", label: "Tous les statuts" },
  { value: "processed", label: "Analysée" },
  { value: "error", label: "Erreur de lecture" },
  { value: "image", label: "Analyse bientôt disponible" },
  { value: "pending", label: "En attente" },
];

function sortAnomalies(anomalies: FicheAnomaly[]) {
  return [...anomalies].sort(
    (a, b) => (SEVERITY_INFO[a.severity]?.order ?? 9) - (SEVERITY_INFO[b.severity]?.order ?? 9)
  );
}

function SeverityCounts({ anomalies }: { anomalies: FicheAnomaly[] }) {
  if (anomalies.length === 0) {
    return <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Aucune</span>;
  }
  const counts = ["critical", "warning", "info"]
    .map((key) => ({ key, count: anomalies.filter((a) => a.severity === key).length }))
    .filter((c) => c.count > 0);
  return (
    <span className="flex flex-wrap gap-1">
      {counts.map(({ key, count }) => (
        <span key={key} className={`badge ${SEVERITY_INFO[key].className}`} title={SEVERITY_INFO[key].label}>
          {count} {SEVERITY_INFO[key].label.toLowerCase()}
          {count > 1 && key !== "info" ? "s" : ""}
        </span>
      ))}
    </span>
  );
}

const selectClass =
  "h-10 rounded-xl border border-ink-200 bg-white px-3 text-sm text-ink-800 transition focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100";

export function FichesExplorer({
  items,
  locked,
  initialSeverity,
  initialEmployee,
}: {
  items: FicheItem[];
  locked: boolean;
  initialSeverity: string;
  initialEmployee: string;
}) {
  const [query, setQuery] = useState("");
  const [employee, setEmployee] = useState(initialEmployee);
  const [period, setPeriod] = useState("all");
  const [severity, setSeverity] = useState(initialSeverity);
  const [status, setStatus] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const employees = useMemo(() => {
    const map = new Map<string, string>();
    items.forEach((i) => map.set(i.employeeId ?? i.employeeName, i.employeeName));
    return [...map.entries()].sort((a, b) => a[1].localeCompare(b[1], "fr"));
  }, [items]);

  const periods = useMemo(
    () => [...new Set(items.map((i) => i.period).filter((p): p is string => Boolean(p)))].sort().reverse(),
    [items]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (q && !`${i.employeeName} ${i.fileName} ${formatPeriod(i.period)}`.toLowerCase().includes(q)) return false;
      if (employee !== "all" && (i.employeeId ?? i.employeeName) !== employee) return false;
      if (period !== "all" && i.period !== period) return false;
      if (severity === "none" && i.anomalies.length > 0) return false;
      if (["critical", "warning", "info"].includes(severity) && !i.anomalies.some((a) => a.severity === severity)) return false;
      if (status !== "all" && statusInfo(i.status, i.mimeType).key !== status) return false;
      return true;
    });
  }, [items, query, employee, period, severity, status]);

  const hasFilters = query || employee !== "all" || period !== "all" || severity !== "all" || status !== "all";
  const selected = items.find((i) => i.id === selectedId) ?? null;

  function resetFilters() {
    setQuery("");
    setEmployee("all");
    setPeriod("all");
    setSeverity("all");
    setStatus("all");
  }

  if (items.length === 0) {
    return (
      <div className="mt-10 rounded-2xl border border-dashed border-ink-200 bg-beige-100/50 p-10 text-center">
        <p className="font-display text-2xl text-ink-900">Aucune fiche de paie pour le moment</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">
          Importez une première fiche avec le bouton « Importer une fiche » : elle est analysée en quelques
          secondes et apparaîtra ici avec ses anomalies.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Filtres */}
      <div className="card mt-8 p-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
          <label className="relative">
            <span className="sr-only">Rechercher</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un salarié, une période…"
              className={`${selectClass} w-full pl-9`}
            />
          </label>
          <label>
            <span className="sr-only">Salarié</span>
            <select value={employee} onChange={(e) => setEmployee(e.target.value)} className={`${selectClass} w-full`}>
              <option value="all">Tous les salariés</option>
              {employees.map(([id, name]) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Période</span>
            <select value={period} onChange={(e) => setPeriod(e.target.value)} className={`${selectClass} w-full`}>
              <option value="all">Toutes les périodes</option>
              {periods.map((p) => (
                <option key={p} value={p}>
                  {formatPeriod(p)}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Gravité</span>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)} className={`${selectClass} w-full`}>
              {SEVERITY_FILTERS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Statut</span>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className={`${selectClass} w-full`}>
              {STATUS_FILTERS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-500">
          <p aria-live="polite">
            {filtered.length} fiche{filtered.length > 1 ? "s" : ""}
            {hasFilters ? ` sur ${items.length}` : ""}
            {hasFilters && (
              <button type="button" onClick={resetFilters} className="ml-2 font-semibold text-blue-600 hover:text-blue-800">
                Réinitialiser les filtres
              </button>
            )}
          </p>
          <div className="flex gap-3">
            <a href="/api/export/payslips" className="font-semibold text-ink-600 hover:text-ink-900">
              Exporter les fiches (Excel)
            </a>
            {!locked && (
              <a href="/api/export/anomalies" className="font-semibold text-ink-600 hover:text-ink-900">
                Exporter les anomalies (Excel)
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Liste */}
      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-ink-200 bg-beige-100/50 p-8 text-center">
          <p className="text-sm text-ink-500">Aucune fiche ne correspond à ces filtres.</p>
          <button type="button" onClick={resetFilters} className="mt-3 text-sm font-semibold text-blue-600 hover:text-blue-800">
            Réinitialiser les filtres
          </button>
        </div>
      ) : (
        <ul className="card mt-6 divide-y divide-ink-100 overflow-hidden">
          {filtered.map((item) => {
            const st = statusInfo(item.status, item.mimeType);
            return (
              <li key={item.id} className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-beige-50/70 sm:px-5 ${selectedId === item.id ? "bg-beige-50" : ""}`}>
                <button
                  type="button"
                  onClick={() => setSelectedId(item.id)}
                  className="grid min-w-0 flex-1 grid-cols-1 items-center gap-x-4 gap-y-1.5 text-left sm:grid-cols-[minmax(0,1.6fr)_7rem_minmax(0,1.3fr)_auto] focus-visible:outline-none"
                  aria-label={`Ouvrir le détail : ${item.employeeName}, ${formatPeriod(item.period)}`}
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink-900">{item.employeeName}</span>
                    <span className="block truncate text-xs text-ink-500">
                      {formatPeriod(item.period)} · importée le {formatDate(item.uploadedAt)}
                    </span>
                  </span>
                  <span className="text-sm tabular-nums text-ink-700">
                    <span className="text-xs text-ink-400 sm:hidden">Net : </span>
                    {formatAmount(item.netPay)}
                  </span>
                  <span>{item.status === "processed" ? <SeverityCounts anomalies={item.anomalies} /> : null}</span>
                  <span className={`badge justify-self-start whitespace-nowrap ${st.className}`}>{st.label}</span>
                </button>
                <div className="flex shrink-0 items-center gap-1.5">
                  <PayslipPreviewButton payslipId={item.id} mimeType={item.mimeType} title={`${item.employeeName} — ${formatPeriod(item.period)}`} />
                  <button
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    aria-label="Voir le détail"
                    title="Voir le détail"
                    className="hidden h-9 w-9 items-center justify-center rounded-lg text-ink-400 transition hover:bg-beige-100 hover:text-ink-900 sm:flex"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden>
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {selected && <FicheDrawer item={selected} locked={locked} onClose={() => setSelectedId(null)} />}
    </>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="card-title">{label}</p>
      <p className="mt-0.5 text-sm text-ink-900">{value}</p>
    </div>
  );
}

function FicheDrawer({ item, locked, onClose }: { item: FicheItem; locked: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const st = statusInfo(item.status, item.mimeType);
  const explanation = statusExplanation(item.status, item.mimeType, item.errorMessage);
  const anomalies = sortAnomalies(item.anomalies);
  const title = `${item.employeeName} — ${formatPeriod(item.period)}`;

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end print:hidden" role="dialog" aria-modal="true" aria-label={title}>
      <button type="button" aria-label="Fermer le détail" className="absolute inset-0 bg-ink-900/40 backdrop-blur-[2px]" onClick={onClose} />
      <div className="relative flex h-full w-full max-w-5xl flex-col bg-beige-50 shadow-lift">
        {/* En-tête */}
        <div className="flex items-start justify-between gap-3 border-b border-ink-200/70 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-400">Salarié</p>
            <h2 className="truncate font-display text-2xl text-ink-900">{item.employeeName}</h2>
            <p className="mt-0.5 text-sm text-ink-500">
              {formatPeriod(item.period)} · <span className={`badge ${st.className}`}>{st.label}</span>
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-500 transition hover:bg-beige-100 hover:text-ink-900"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-5 w-5" aria-hidden>
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="grid min-h-0 flex-1 overflow-y-auto lg:grid-cols-2 lg:overflow-hidden">
          {/* Fiche d'origine */}
          <div className="min-h-[60vh] border-b border-ink-200/70 p-3 lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r">
            <PayslipFileFrame payslipId={item.id} mimeType={item.mimeType} title={title} />
          </div>

          {/* Analyse */}
          <div className="space-y-6 p-5 sm:p-6 lg:overflow-y-auto">
            {explanation && (
              <p className={`rounded-xl px-4 py-3 text-sm ring-1 ring-inset ${st.key === "error" ? "bg-rose-50 text-rose-800 ring-rose-200" : "bg-blue-50 text-blue-800 ring-blue-200"}`}>
                {explanation}
              </p>
            )}

            {item.status === "processed" && (
              <div className="grid grid-cols-3 gap-3 rounded-2xl border border-ink-200/70 bg-white p-4">
                <InfoRow label="Brut" value={formatAmount(item.grossPay, "Non lu")} />
                <InfoRow label="Net" value={formatAmount(item.netPay, "Non lu")} />
                <InfoRow label="Anomalies" value={String(anomalies.length)} />
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <InfoRow label="Poste" value={item.position || "Non détecté"} />
              <InfoRow
                label="Convention collective"
                value={
                  <>
                    {item.agreement || "Non détectée"}
                    {item.agreementIdcc ? ` · IDCC ${item.agreementIdcc}` : ""}
                    {item.agreementAvailable === false && (
                      <span className="mt-0.5 block text-xs font-medium text-amber-700">{AGREEMENT_UNAVAILABLE_MESSAGE}</span>
                    )}
                  </>
                }
              />
              <InfoRow label="Fichier" value={<span className="break-all">{item.fileName}</span>} />
              <InfoRow
                label="Importée"
                value={`le ${formatDate(item.uploadedAt)} ${item.uploadedByMe ? "par vous" : "par un autre utilisateur du compte"}`}
              />
            </div>

            {item.status === "processed" && (
              <div>
                <p className="font-display text-xl text-ink-900">Anomalies ({anomalies.length})</p>
                {anomalies.length === 0 ? (
                  <p className="mt-2 text-sm text-ink-500">Aucune anomalie détectée sur cette fiche.</p>
                ) : (
                  <div className="mt-3 flex flex-col gap-2">
                    {anomalies.map((anomaly, index) => {
                      const sev = SEVERITY_INFO[anomaly.severity] ?? SEVERITY_INFO.info;
                      if (locked && index > 0) {
                        return <LockedAnomaly key={anomaly.id} compact severityLabel={sev.label} severityClassName={sev.className} />;
                      }
                      const category = categoryFromRuleId(anomaly.rule_id);
                      return (
                        <div key={anomaly.id} className="relative overflow-hidden rounded-xl border border-ink-200/70 bg-white p-4 pl-5">
                          <span aria-hidden className={`absolute inset-y-0 left-0 w-1 ${sev.accentClassName}`} />
                          <div className="flex flex-wrap gap-2">
                            <span className={`badge ${sev.className}`}>{sev.label}</span>
                            {category && <span className="badge bg-beige-100 font-medium text-ink-600 ring-ink-200/70">{CATEGORY_LABELS[category]}</span>}
                          </div>
                          <p className="mt-2 text-sm font-medium text-ink-900">{anomaly.message}</p>
                        </div>
                      );
                    })}
                    {locked && anomalies.length > 1 && (
                      <UpgradeNotice
                        compact
                        title="Débloquez toutes les anomalies"
                        text="Choisissez une formule pour afficher le détail de toutes les anomalies de cette fiche."
                        requiredPlan="starter"
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap items-start gap-2 border-t border-ink-200/70 pt-5">
              {item.status === "processed" && (
                <Link href={`/app/historique/${item.id}`} className="btn-dark px-4 py-2 text-sm">
                  Rapport complet
                </Link>
              )}
              <a href={fileUrl(item.id)} target="_blank" rel="noopener noreferrer" className="btn-secondary px-4 py-2 text-sm">
                Ouvrir la fiche dans un onglet
              </a>
              <DeletePayslipButton payslipId={item.id} label={title} onDeleted={onClose} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
