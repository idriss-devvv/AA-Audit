/**
 * Illustrations animées des pages par public. Données fictives, purement
 * décoratives (aria-hidden) : elles montrent le type de résultat obtenu.
 */

export type HeroVisualKind = "particulier" | "entreprise" | "cabinet";

function Badge({ tone, children }: { tone: "rose" | "amber" | "emerald" | "blue"; children: React.ReactNode }) {
  const tones = {
    rose: "bg-rose-50 text-rose-700 ring-rose-200",
    amber: "bg-amber-50 text-amber-700 ring-amber-200",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    blue: "bg-blue-50 text-blue-700 ring-blue-200",
  };
  return <span className={`badge ${tones[tone]}`}>{children}</span>;
}

function WindowBar({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 border-b border-ink-100 bg-beige-50/80 px-4 py-2.5">
      <span className="h-2 w-2 rounded-full bg-ink-200" />
      <span className="h-2 w-2 rounded-full bg-ink-200" />
      <span className="h-2 w-2 rounded-full bg-ink-200" />
      <span className="ml-2 truncate text-[11px] font-medium text-ink-400">{label}</span>
    </div>
  );
}

/** Carte flottante superposée à l'illustration. */
function FloatingNote({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`absolute z-10 animate-pop-in rounded-2xl border border-ink-200/70 bg-white/95 px-4 py-3 shadow-lift backdrop-blur [animation-delay:700ms] ${className}`}
    >
      <div className="animate-float">{children}</div>
    </div>
  );
}

function ParticulierVisual() {
  const rows = [
    { label: "Salaire de base", value: "1 850,00 €" },
    { label: "Minimum conventionnel (ETAM 2.2)", value: "1 905,00 €", flagged: true },
    { label: "Heures supplémentaires 25 %", value: "Conforme", ok: true },
    { label: "Solde de congés payés", value: "Conforme", ok: true },
  ];
  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-lift">
        <WindowBar label="Mon bulletin · mars 2026" />
        <div className="relative overflow-hidden p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">Camille M.</p>
              <p className="mt-1 font-display text-2xl text-ink-900">Syntec · IDCC 1486</p>
            </div>
            <Badge tone="blue">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-blue-500" />
              Analysé
            </Badge>
          </div>
          <ul className="mt-6 space-y-2">
            {rows.map((row, i) => (
              <li
                key={row.label}
                style={{ animationDelay: `${200 + i * 120}ms` }}
                className={`flex animate-fade-in-up items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-[13px] ${
                  row.flagged ? "bg-rose-50 ring-1 ring-inset ring-rose-200" : "bg-beige-50"
                }`}
              >
                <span className="truncate text-ink-600">{row.label}</span>
                <span className={`shrink-0 font-semibold tabular-nums ${row.ok ? "text-emerald-700" : "text-ink-900"}`}>
                  {row.value}
                </span>
              </li>
            ))}
          </ul>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-blue-100/40 to-transparent" />
        </div>
      </div>
      <FloatingNote className="-bottom-10 -left-4 sm:-left-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-600">Anomalie critique</p>
        <p className="mt-1 text-sm font-semibold text-ink-900">Salaire sous le minimum : −55,00 €</p>
      </FloatingNote>
    </>
  );
}

function EntrepriseVisual() {
  const stats = [
    { label: "Fiches contrôlées", value: "48" },
    { label: "Anomalies", value: "3" },
    { label: "Salariés suivis", value: "24" },
  ];
  const bars = [
    { label: "Critiques", width: "18%", color: "bg-rose-500" },
    { label: "Avertissements", width: "42%", color: "bg-amber-400" },
    { label: "Infos", width: "30%", color: "bg-blue-400" },
  ];
  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-lift">
        <WindowBar label="Tableau de bord · mars 2026" />
        <div className="p-6">
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                style={{ animationDelay: `${200 + i * 120}ms` }}
                className={`animate-fade-in-up rounded-2xl p-4 ${i === 0 ? "bg-blue-800 text-beige-50" : "bg-beige-50"}`}
              >
                <p className={`text-[10px] font-semibold uppercase tracking-[0.1em] ${i === 0 ? "text-blue-200" : "text-ink-400"}`}>
                  {stat.label}
                </p>
                <p className={`mt-2 font-display text-3xl leading-none ${i === 0 ? "text-beige-50" : "text-ink-900"}`}>{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-4">
            {bars.map((bar, i) => (
              <div key={bar.label}>
                <div className="flex justify-between text-[12px] text-ink-500">
                  <span>{bar.label}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-beige-100">
                  <div
                    style={{ width: bar.width, animationDelay: `${500 + i * 150}ms` }}
                    className={`h-full origin-left animate-grow-x rounded-full ${bar.color}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FloatingNote className="-bottom-6 -right-2 sm:-right-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-amber-600">Paramétrage</p>
        <p className="mt-1 text-sm font-semibold text-ink-900">Taux erroné repéré dès la 1re fiche</p>
      </FloatingNote>
    </>
  );
}

function CabinetVisual() {
  const clients = [
    { name: "Boulangerie Martin", detail: "12 fiches · Boulangerie", tone: "rose" as const, status: "2 anomalies" },
    { name: "Garage Dupuis", detail: "8 fiches · Services auto", tone: "emerald" as const, status: "Conforme" },
    { name: "Studio Nova", detail: "15 fiches · Syntec", tone: "amber" as const, status: "1 avertissement" },
    { name: "Hôtel du Port", detail: "21 fiches · HCR", tone: "emerald" as const, status: "Conforme" },
  ];
  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-ink-200/80 bg-white shadow-lift">
        <WindowBar label="Mes clients · cabinet" />
        <div className="p-6">
          <div className="flex items-center justify-between">
            <p className="font-display text-2xl text-ink-900">4 clients</p>
            <span className="rounded-full border border-ink-200 px-3 py-1 text-[11px] font-medium text-ink-500">
              Client affiché : tous
            </span>
          </div>
          <ul className="mt-5 divide-y divide-ink-100">
            {clients.map((client, i) => (
              <li
                key={client.name}
                style={{ animationDelay: `${200 + i * 120}ms` }}
                className="flex animate-fade-in-up items-center justify-between gap-3 py-3"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-beige-100 text-xs font-bold text-ink-600">
                    {client.name
                      .split(" ")
                      .filter((w) => /^[A-ZÀ-Ý]/.test(w))
                      .map((w) => w[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-ink-900">{client.name}</p>
                    <p className="truncate text-xs text-ink-400">{client.detail}</p>
                  </div>
                </div>
                <Badge tone={client.tone}>{client.status}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <FloatingNote className="-bottom-6 -left-4 sm:-left-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-600">Rapport prêt</p>
        <p className="mt-1 text-sm font-semibold text-ink-900">Export Excel · 56 fiches</p>
      </FloatingNote>
    </>
  );
}

export function HeroVisual({ kind }: { kind: HeroVisualKind }) {
  return (
    <div aria-hidden className="relative mx-auto w-full max-w-lg animate-fade-in-up [animation-delay:200ms]">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-blue-200/50 via-beige-100/40 to-transparent blur-2xl" />
      <div className="relative">
        {kind === "particulier" && <ParticulierVisual />}
        {kind === "entreprise" && <EntrepriseVisual />}
        {kind === "cabinet" && <CabinetVisual />}
      </div>
    </div>
  );
}
