import type { PayslipData } from "@/types/payslip";
import type { RuleContext } from "./types";
import { regulatoryValue } from "./regulatory";
import { LEGAL_MONTHLY_HOURS } from "./referentiels/legal";

/**
 * Réduction générale dégressive unique (RGDU, 2026) des cotisations
 * patronales : calcul mensuel indicatif (CSS art. L241-13 et D241-7).
 *
 *   C = Tmin + Tdelta × [½ × (3 × SMIC / rémunération − 1)]^P
 *
 * plafonné à Tmin + Tdelta et arrondi à 4 décimales, puis montant = C × brut.
 * Tdelta dépend du taux FNAL (0,10 % sous 50 salariés, 0,50 % à partir de 50) :
 * sans taux renseigné dans Paramètres, on encadre le résultat entre les deux.
 * Le calcul réel est annuel et régularisé chaque mois : l'écart reste indicatif.
 */

export type FnalRate = 0.1 | 0.5;

export type ReductionScenario = {
  fnalRatePercent: FnalRate;
  tdelta: number;
  coefficient: number;
  expected: number;
};

export type GeneralReductionComputation = {
  grossPay: number;
  hours: number;
  hoursFromPayslip: boolean;
  smicHourly: number;
  smicMonth: number;
  thresholdSmic: number;
  limit: number;
  eligible: boolean;
  tmin: number;
  exponent: number;
  /** Taux FNAL renseigné dans Paramètres, null s'il ne l'est pas. */
  fnalRatePercent: FnalRate | null;
  /** Un scénario si le taux FNAL est connu, sinon les deux. */
  scenarios: ReductionScenario[];
  expectedMin: number;
  expectedMax: number;
  /** Montant lu sur la fiche (valeur absolue), null s'il n'y figure pas. */
  actual: number | null;
  source: string;
};

export function normalizeFnalRate(value: unknown): FnalRate | null {
  const n = typeof value === "number" ? value : parseFloat(String(value ?? "").replace(",", "."));
  if (Math.abs(n - 0.1) < 1e-9) return 0.1;
  if (Math.abs(n - 0.5) < 1e-9) return 0.5;
  return null;
}

export function payslipHours(payslip: PayslipData): { hours: number; fromPayslip: boolean } {
  const hours = payslip.baseHours ?? null;
  return hours && hours > 0 && hours <= 250 ? { hours, fromPayslip: true } : { hours: LEGAL_MONTHLY_HOURS, fromPayslip: false };
}

/** Calcul de la réduction générale attendue, ou null hors champ (avant 2026, brut nul, paramètres absents). */
export function computeGeneralReduction(payslip: PayslipData, context: RuleContext): GeneralReductionComputation | null {
  const tmin = regulatoryValue(context, "rgdu.tmin", payslip.period);
  const p = regulatoryValue(context, "rgdu.exposant", payslip.period);
  const seuil = regulatoryValue(context, "rgdu.seuil_smic", payslip.period);
  const smic = regulatoryValue(context, "rgdu.smic_horaire", payslip.period);
  const t010 = regulatoryValue(context, "rgdu.tdelta_fnal_010", payslip.period);
  const t050 = regulatoryValue(context, "rgdu.tdelta_fnal_050", payslip.period);
  if (!tmin || !p || !seuil || !smic || !t010 || !t050 || !(payslip.grossPay > 0)) return null;

  const { hours, fromPayslip } = payslipHours(payslip);
  const smicMonth = smic.value * hours;
  const limit = seuil.value * smicMonth;
  const eligible = payslip.grossPay < limit;
  const fnal = normalizeFnalRate(context.fnalRatePercent);

  const scenario = (fnalRatePercent: FnalRate, tdelta: number): ReductionScenario => {
    let coefficient = 0;
    if (eligible) {
      const inner = 0.5 * (limit / payslip.grossPay - 1);
      coefficient = Math.min(tmin.value + tdelta, Math.round((tmin.value + tdelta * Math.pow(inner, p.value)) * 10000) / 10000);
    }
    return { fnalRatePercent, tdelta, coefficient, expected: Math.round(coefficient * payslip.grossPay * 100) / 100 };
  };

  const all = [scenario(0.1, t010.value), scenario(0.5, t050.value)];
  const scenarios = fnal === null ? all : all.filter((s) => s.fnalRatePercent === fnal);
  const amounts = scenarios.map((s) => s.expected);

  return {
    grossPay: payslip.grossPay,
    hours,
    hoursFromPayslip: fromPayslip,
    smicHourly: smic.value,
    smicMonth,
    thresholdSmic: seuil.value,
    limit,
    eligible,
    tmin: tmin.value,
    exponent: p.value,
    fnalRatePercent: fnal,
    scenarios,
    expectedMin: Math.min(...amounts),
    expectedMax: Math.max(...amounts),
    actual: payslip.generalReduction ?? null,
    source: t010.source,
  };
}
