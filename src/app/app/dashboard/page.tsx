import Link from "next/link";
import { PayslipUploadButton } from "@/components/upload/payslip-upload-button";
import { PayslipPreviewButton } from "@/components/payslips/payslip-preview";
import { SEVERITY_INFO, formatDate, formatPeriod, statusInfo } from "@/lib/payslips";
import { DEMO_EMPLOYEES, demoEmployeeName, demoPayslipsByUploadDate } from "@/lib/demo-data";
import { getNotifications } from "@/lib/notifications";

const SEVERITY_META: Record<string, { label: string; barClassName: string }> = {
  critical: { label: "Critiques", barClassName: "bg-rose-500" },
  warning: { label: "Avertissements", barClassName: "bg-amber-400" },
  info: { label: "Infos", barClassName: "bg-blue-400" },
};

export default async function DashboardPage() {
  // Version de démonstration : statistiques calculées sur les fiches d'exemple.
  const notifications = await getNotifications(10);
  const alerts = notifications.items.filter((n) => !n.read_at && n.severity !== "info").slice(0, 4);

  const demoPayslips = demoPayslipsByUploadDate();
  const allAnomalies = demoPayslips.flatMap((p) => p.anomalies);
  const countOf = (severity: string) => allAnomalies.filter((a) => a.severity === severity).length;
  const critical = countOf("critical");
  const warningCount = countOf("warning");
  const infoCount = countOf("info");
  const anomaliesTotal = allAnomalies.length;
  const payslipsCount = demoPayslips.length;
  const latestMonth = demoPayslips[0]?.uploadedAt.slice(0, 7);
  const payslipsThisMonth = demoPayslips.filter((p) => p.uploadedAt.startsWith(latestMonth ?? "")).length;

  const stats = [
    { label: "Fiches contrôlées", value: payslipsCount, href: "/app/fiches" },
    { label: "Anomalies détectées", value: anomaliesTotal, href: "/app/fiches" },
    { label: "Salariés suivis", value: DEMO_EMPLOYEES.length, href: "/app/salaries" },
    { label: "Fiches importées ce mois-ci", value: payslipsThisMonth, href: "/app/fiches" },
  ];

  const severityBreakdown = [
    { key: "critical", count: critical },
    { key: "warning", count: warningCount },
    { key: "info", count: infoCount },
  ];

  const recentPayslips = demoPayslips.slice(0, 5).map((p) => ({
    id: p.id,
    period: p.period,
    status: "processed",
    mime_type: "application/pdf",
    uploaded_at: p.uploadedAt,
    name: demoEmployeeName(DEMO_EMPLOYEES.find((e) => e.id === p.employeeId)!),
    anomalies: p.anomalies,
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="heading-display text-4xl md:text-[2.75rem]">Tableau de bord</h1>
          <p className="mt-3 max-w-2xl text-sm text-ink-500">
            Vue d&apos;ensemble des fiches de paie analysées et des anomalies à traiter.
          </p>
        </div>
        <PayslipUploadButton variant="compact" />
      </div>

      {/* Alertes non lues (notifications) */}
      {alerts.length > 0 && (
        <section className="card mt-8 p-5" aria-label="Alertes">
          <p className="card-title">Alertes</p>
          <ul className="mt-3 divide-y divide-ink-100">
            {alerts.map((alert) => (
              <li key={alert.id} className="flex items-start gap-3 py-2.5">
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${alert.severity === "critical" ? "bg-rose-500" : "bg-amber-400"}`} />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-ink-900">{alert.title}</p>
                  {alert.body && <p className="truncate text-xs text-ink-500">{alert.body}</p>}
                </div>
                {alert.link && (
                  <Link href={alert.link} className="shrink-0 text-xs font-semibold text-blue-700 hover:text-blue-900">
                    Voir
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Priorité : anomalies critiques */}
      {critical > 0 ? (
        <Link
          href="/app/fiches?gravite=critical"
          className="group mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-rose-600 p-6 text-white shadow-lift transition hover:bg-rose-700"
        >
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-rose-100">À traiter en priorité</p>
            <p className="mt-2 font-display text-3xl leading-tight">
              {critical} anomalie{critical > 1 ? "s" : ""} critique{critical > 1 ? "s" : ""}
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
            Voir les fiches concernées
            <span aria-hidden className="transition group-hover:translate-x-0.5">→</span>
          </span>
        </Link>
      ) : (
        payslipsCount > 0 && (
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-emerald-50 p-5 text-sm font-medium text-emerald-800 ring-1 ring-inset ring-emerald-200">
            Aucune anomalie critique sur vos fiches de paie.
          </div>
        )
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="card p-6 transition hover:shadow-lift">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-500">{stat.label}</p>
            <p className="mt-4 font-display text-5xl leading-none tabular-nums text-ink-900">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        {/* Répartition des anomalies par gravité */}
        <div className="card p-6">
          <h2 className="card-title">Anomalies par gravité</h2>
          {anomaliesTotal === 0 ? (
            <p className="mt-6 text-sm text-ink-500">Aucune anomalie détectée pour le moment.</p>
          ) : (
            <div className="mt-6 space-y-5">
              {severityBreakdown.map(({ key, count }) => {
                const meta = SEVERITY_META[key];
                const percent = Math.round((count / anomaliesTotal) * 100);
                return (
                  <Link key={key} href={`/app/fiches?gravite=${key}`} className="block rounded-lg transition hover:opacity-80">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2 font-medium text-ink-700">
                        <span className={`h-2 w-2 rounded-full ${meta.barClassName}`} />
                        {meta.label}
                      </span>
                      <span className="tabular-nums text-ink-500">
                        {count} <span className="text-ink-300">· {percent}%</span>
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-beige-100">
                      <div className={`h-full rounded-full ${meta.barClassName}`} style={{ width: `${percent}%` }} />
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* Dernières fiches importées */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <h2 className="card-title">Dernières fiches importées</h2>
            <Link href="/app/fiches" className="text-xs font-semibold text-blue-600 transition hover:text-blue-800">
              Toutes les fiches
            </Link>
          </div>

          {recentPayslips.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-ink-200 bg-beige-50 p-6 text-center">
              <p className="text-sm text-ink-500">
                Aucune fiche importée pour le moment. Utilisez le bouton « Importer une fiche » en haut de la page :
                l&apos;analyse prend quelques secondes.
              </p>
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-ink-100">
              {recentPayslips.map((payslip) => {
                const st = statusInfo(payslip.status, payslip.mime_type);
                const name = payslip.name;
                const counts = ["critical", "warning", "info"]
                  .map((key) => ({ key, count: (payslip.anomalies ?? []).filter((a) => a.severity === key).length }))
                  .filter((c) => c.count > 0);
                return (
                  <li key={payslip.id} className="flex items-center gap-3 py-3">
                    <Link href={`/app/historique/${payslip.id}`} className="min-w-0 flex-1 rounded-lg transition hover:opacity-80">
                      <p className="truncate text-sm font-semibold text-ink-900">{name}</p>
                      <p className="text-xs text-ink-500">
                        {formatPeriod(payslip.period)} · importée le {formatDate(payslip.uploaded_at)}
                      </p>
                    </Link>
                    <div className="hidden shrink-0 gap-1 sm:flex">
                      {st.key === "processed" ? (
                        counts.length === 0 ? (
                          <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Conforme</span>
                        ) : (
                          counts.map(({ key, count }) => (
                            <span key={key} className={`badge ${SEVERITY_INFO[key].className}`}>
                              {count} {SEVERITY_INFO[key].label.toLowerCase()}
                            </span>
                          ))
                        )
                      ) : (
                        <span className={`badge ${st.className}`}>{st.label}</span>
                      )}
                    </div>
                    <PayslipPreviewButton payslipId={payslip.id} mimeType={payslip.mime_type} title={`${name} — ${formatPeriod(payslip.period)}`} />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
