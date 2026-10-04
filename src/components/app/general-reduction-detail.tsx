import type { GeneralReductionComputation } from "@/lib/rules/reduction-generale";

const EURO = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
const NUM = (value: number, digits = 2) => value.toLocaleString("fr-FR", { maximumFractionDigits: digits });
const COEF = (value: number) => value.toLocaleString("fr-FR", { minimumFractionDigits: 4, maximumFractionDigits: 4 });

type Verdict = { label: string; className: string };

function verdictFor(calc: GeneralReductionComputation, margin: number): Verdict {
  const ok = { label: "Conforme", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
  if (!calc.eligible) {
    return calc.actual !== null && calc.actual > margin
      ? { label: "Réduction indue", className: "bg-rose-50 text-rose-700 ring-rose-200" }
      : ok;
  }
  if (calc.actual === null) return { label: "Non lue sur la fiche", className: "bg-amber-50 text-amber-700 ring-amber-200" };
  if (calc.actual < calc.expectedMin - margin || calc.actual > calc.expectedMax + margin) {
    return { label: "Écart à vérifier", className: "bg-blue-50 text-blue-700 ring-blue-200" };
  }
  return ok;
}

function Row({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 border-b border-dashed border-ink-200/70 py-1.5 last:border-0">
      <dt className="text-ink-600">
        {label}
        {hint && <span className="ml-1 text-xs text-ink-400">{hint}</span>}
      </dt>
      <dd className="text-right font-medium tabular-nums text-ink-900">{value}</dd>
    </div>
  );
}

/** Détail du calcul de la réduction générale (RGDU 2026) dans le rapport d'une fiche. */
export function GeneralReductionDetail({ calc, margin }: { calc: GeneralReductionComputation; margin: number }) {
  const verdict = verdictFor(calc, margin);
  const expected = calc.expectedMin === calc.expectedMax ? EURO(calc.expectedMin) : `${EURO(calc.expectedMin)} à ${EURO(calc.expectedMax)}`;
  const gap =
    calc.actual === null
      ? null
      : calc.actual < calc.expectedMin
        ? calc.actual - calc.expectedMin
        : calc.actual > calc.expectedMax
          ? calc.actual - calc.expectedMax
          : 0;

  return (
    <div className="mt-6 rounded-2xl border border-ink-200/70 bg-white p-5 print:break-inside-avoid">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="card-title">Réduction générale des cotisations patronales</p>
        <span className={`badge ${verdict.className}`}>{verdict.label}</span>
      </div>

      <dl className="mt-3 text-sm">
        <Row label="Salaire brut du mois" value={EURO(calc.grossPay)} />
        <Row
          label="SMIC du mois"
          hint={`(${NUM(calc.smicHourly)} € × ${NUM(calc.hours)} h${calc.hoursFromPayslip ? "" : ", durée légale"})`}
          value={EURO(calc.smicMonth)}
        />
        <Row label={`Seuil d'éligibilité (${NUM(calc.thresholdSmic, 0)} SMIC)`} value={EURO(calc.limit)} />
        {calc.eligible ? (
          calc.scenarios.map((s) => (
            <Row
              key={s.fnalRatePercent}
              label={`Coefficient${calc.scenarios.length > 1 ? ` (FNAL ${NUM(s.fnalRatePercent)} %)` : ""}`}
              hint={`(Tmin ${NUM(calc.tmin)} + Tdelta ${NUM(s.tdelta, 4)}, exposant ${NUM(calc.exponent)})`}
              value={COEF(s.coefficient)}
            />
          ))
        ) : (
          <Row label="Coefficient" hint="(brut au-dessus du seuil)" value={COEF(0)} />
        )}
        <Row label="Réduction attendue" value={calc.eligible ? expected : EURO(0)} />
        <Row label="Réduction lue sur la fiche" value={calc.actual === null ? "Non lue" : EURO(calc.actual)} />
        {gap !== null && gap !== 0 && <Row label="Écart" value={`${gap > 0 ? "+" : "−"}${EURO(Math.abs(gap))}`} />}
      </dl>

      <p className="mt-3 text-xs text-ink-400">
        C = Tmin + Tdelta × [½ × (3 × SMIC / brut − 1)]^P, plafonné à Tmin + Tdelta.
        {calc.fnalRatePercent === null &&
          " Taux FNAL non renseigné : fourchette entre 0,10 % et 0,50 % (Paramètres › Calcul et barèmes pour un montant exact)."}{" "}
        Calcul mensuel indicatif : la réduction est annuelle et régularisée chaque mois. Source : {calc.source}.
      </p>
    </div>
  );
}
