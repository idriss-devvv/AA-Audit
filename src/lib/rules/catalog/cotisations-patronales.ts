import type { ContributionLine, PayslipData } from "@/types/payslip";
import type { AnomalyRule, RuleContext } from "../types";
import { tolerancesFor } from "../tolerances";
import { regulatoryValue } from "../regulatory";
import { LEGAL_MONTHLY_HOURS, smicHourlyFor } from "../referentiels/legal";

/**
 * Cotisations patronales (cahier des charges V1 : sécurité sociale, mutuelle,
 * accident du travail, prévoyance). Les taux et seuils viennent des
 * paramètres réglementaires datés (Administration) ; le taux AT/MP, propre à
 * chaque entreprise, se saisit dans Paramètres.
 */

const EURO = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
const PCT = (value: number) => `${value.toLocaleString("fr-FR", { maximumFractionDigits: 3 })} %`;

/** Taux patronal d'une ligne : second triplet, à défaut le seul taux lu s'il correspond à une valeur attendue. */
function employerRate(line: ContributionLine, expected: number[], tolerance: number): number | null {
  if (line.employerRatePercent != null) return line.employerRatePercent;
  return expected.some((r) => Math.abs(r - line.ratePercent) <= tolerance) ? line.ratePercent : null;
}

function hoursOf(payslip: PayslipData): number {
  const hours = payslip.baseHours ?? null;
  return hours && hours > 0 && hours <= 250 ? hours : LEGAL_MONTHLY_HOURS;
}

/** Taux plein / réduit selon un seuil exprimé en SMIC (maladie, allocations familiales). */
function reducedRateRule(id: string, prefix: "maladie" | "famille", pattern: RegExp, label: string): AnomalyRule {
  return {
    id,
    category: "cotisations",
    description: `${label} : taux réduit uniquement sous le seuil en SMIC en vigueur (paramètre réglementaire daté)`,
    check: (payslip, context) => {
      const full = regulatoryValue(context, `${prefix}.taux_plein`, payslip.period);
      const reduced = regulatoryValue(context, `${prefix}.taux_reduit`, payslip.period);
      const threshold = regulatoryValue(context, `${prefix}.seuil_smic`, payslip.period);
      const smic = smicHourlyFor(payslip.period);
      if (!full || !smic || payslip.grossPay <= 0) return null;
      const tolerance = tolerancesFor(context).ratePoints;
      const line = (payslip.contributionLines ?? []).find((l) => pattern.test(l.label));
      if (!line) return null;
      // Taux réduit supprimé (2026 : fusion dans la réduction générale dégressive unique).
      if (!reduced || !threshold) {
        const oldReduced = prefix === "maladie" ? 7 : 3.45;
        const rate = line.employerRatePercent ?? line.ratePercent;
        if (Math.abs(rate - oldReduced) > tolerance) return null;
        return {
          severity: "critical",
          message: `${label} au taux réduit de ${PCT(oldReduced)} : ce taux réduit n'existe plus depuis le 1er janvier 2026, il est intégré à la réduction générale dégressive unique. Le taux applicable est ${PCT(full.value)}, l'allègement passant par la ligne de réduction générale (Code de la sécurité sociale, art. L241-13).`,
        };
      }
      const rate = employerRate(line, [full.value, reduced.value], tolerance);
      if (rate === null) return null;
      // Seuil mensuel indicatif : le seuil légal s'apprécie sur la rémunération annuelle.
      const limit = threshold.value * smic * hoursOf(payslip);
      if (Math.abs(rate - reduced.value) <= tolerance && payslip.grossPay > limit + tolerancesFor(context).amountEuros) {
        return {
          severity: "critical",
          message: `${label} au taux réduit (${PCT(reduced.value)}) alors que le brut (${EURO(payslip.grossPay)}) dépasse ${threshold.value.toLocaleString("fr-FR")} SMIC (${EURO(limit)} pour ${hoursOf(payslip).toLocaleString("fr-FR")} h) : le taux plein de ${PCT(full.value)} est dû (${threshold.source}). Le seuil s'apprécie sur l'année : vérifier en cas de prime ponctuelle.`,
        };
      }
      if (Math.abs(rate - full.value) <= tolerance && payslip.grossPay <= limit) {
        return {
          severity: "info",
          message: `${label} au taux plein (${PCT(full.value)}) alors que le brut (${EURO(payslip.grossPay)}) ne dépasse pas ${threshold.value.toLocaleString("fr-FR")} SMIC (${EURO(limit)}) : le taux réduit de ${PCT(reduced.value)} aurait pu s'appliquer, sauf rémunération annuelle supérieure au seuil (${threshold.source}).`,
        };
      }
      return null;
    },
  };
}

function isCadre(payslip: PayslipData): boolean {
  const text = `${payslip.classification ?? ""} ${payslip.position ?? ""}`;
  if (/non[\s-]?cadre/i.test(text)) return false;
  return /\bcadres?\b|ing[ée]nieur/i.test(text) || (payslip.contributionLines ?? []).some((l) => /\bapec\b/i.test(l.label));
}

function atMpRate(context: RuleContext): number | null {
  const rate = context.atMpRatePercent ?? null;
  return rate !== null && rate > 0 ? rate : null;
}

/** Réduction générale dégressive unique (2026) : coefficient mensuel indicatif, régularisé sur l'année. */
function rgduCoefficient(context: RuleContext, payslip: PayslipData, tdelta: number): { coefficient: number; limit: number } | null {
  const tmin = regulatoryValue(context, "rgdu.tmin", payslip.period);
  const p = regulatoryValue(context, "rgdu.exposant", payslip.period);
  const seuil = regulatoryValue(context, "rgdu.seuil_smic", payslip.period);
  const smic = regulatoryValue(context, "rgdu.smic_horaire", payslip.period);
  if (!tmin || !p || !seuil || !smic || payslip.grossPay <= 0) return null;
  const smicMonth = smic.value * hoursOf(payslip);
  const limit = seuil.value * smicMonth;
  if (payslip.grossPay >= limit) return { coefficient: 0, limit };
  const inner = 0.5 * (limit / payslip.grossPay - 1);
  const coefficient = Math.min(tmin.value + tdelta, Math.round((tmin.value + tdelta * Math.pow(inner, p.value)) * 10000) / 10000);
  return { coefficient, limit };
}

export const cotisationsPatronalesRules: AnomalyRule[] = [
  reducedRateRule("cotisations.maladie-taux", "maladie", /maladie/i, "Cotisation patronale d'assurance maladie"),
  reducedRateRule("cotisations.famille-taux", "famille", /allocations?\s+familiales|\bfamille\b/i, "Cotisation d'allocations familiales"),
  {
    id: "cotisations.reduction-generale",
    category: "cotisations",
    description: "Réduction générale dégressive unique (2026) : présence sous 3 SMIC et montant cohérent avec la formule de l'article D241-7",
    check: (payslip, context) => {
      const t010 = regulatoryValue(context, "rgdu.tdelta_fnal_010", payslip.period);
      const t050 = regulatoryValue(context, "rgdu.tdelta_fnal_050", payslip.period);
      if (!t010 || !t050) return null;
      const low = rgduCoefficient(context, payslip, t010.value);
      const high = rgduCoefficient(context, payslip, t050.value);
      if (!low || !high) return null;
      const amount = payslip.generalReduction ?? null;
      const minEuros = tolerancesFor(context).relativeMinEuros;
      if (low.coefficient === 0) {
        if (amount !== null && amount > minEuros) {
          return {
            severity: "critical",
            message: `Réduction générale de ${EURO(amount)} alors que le brut (${EURO(payslip.grossPay)}) atteint ou dépasse 3 SMIC (${EURO(low.limit)} pour ${hoursOf(payslip).toLocaleString("fr-FR")} h) : aucune réduction n'est due (${t010.source}).`,
          };
        }
        return null;
      }
      const expectedMin = low.coefficient * payslip.grossPay;
      const expectedMax = high.coefficient * payslip.grossPay;
      if (amount === null) {
        const showsEmployer = (payslip.contributionLines ?? []).some((l) => l.employerRatePercent != null);
        if (!showsEmployer) return null;
        return {
          severity: "warning",
          message: `Aucune ligne de réduction générale lue alors que le brut (${EURO(payslip.grossPay)}) est inférieur à 3 SMIC : réduction attendue d'environ ${EURO(expectedMin)} à ${EURO(expectedMax)} ce mois-ci (coefficient ${low.coefficient.toLocaleString("fr-FR")} à ${high.coefficient.toLocaleString("fr-FR")} selon le taux FNAL — ${t010.source}).`,
        };
      }
      const margin = Math.max(expectedMax * (tolerancesFor(context).relativePercent / 100), minEuros);
      if (amount < expectedMin - margin || amount > expectedMax + margin) {
        return {
          severity: "info",
          message: `Réduction générale de ${EURO(amount)} éloignée du montant mensuel attendu (${EURO(expectedMin)} à ${EURO(expectedMax)}, coefficient ${low.coefficient.toLocaleString("fr-FR")} à ${high.coefficient.toLocaleString("fr-FR")}). Le calcul est annuel et régularisé chaque mois (heures supplémentaires, absences, primes) : vérifier le cumul annuel.`,
        };
      }
      return null;
    },
  },
  {
    id: "cotisations.at-mp",
    category: "cotisations",
    description: "Taux accident du travail / maladie professionnelle conforme au taux notifié à l'entreprise (Paramètres)",
    check: (payslip, context) => {
      const expected = atMpRate(context);
      if (expected === null) return null;
      const line = (payslip.contributionLines ?? []).find((l) => /accident|\bat\s*\/?\s*mp\b/i.test(l.label));
      if (!line) {
        const showsEmployer = (payslip.contributionLines ?? []).some((l) => l.employerRatePercent != null);
        return showsEmployer
          ? { severity: "info", message: `Aucune ligne « accident du travail » lue alors que le taux notifié est de ${PCT(expected)} : vérifier qu'elle figure bien sur le bulletin (parfois regroupée dans « Autres contributions »).` }
          : null;
      }
      const rate = line.employerRatePercent ?? line.ratePercent;
      if (Math.abs(rate - expected) <= tolerancesFor(context).ratePoints) return null;
      return {
        severity: "critical",
        message: `Taux accident du travail appliqué : ${PCT(rate)} au lieu du taux notifié à l'entreprise de ${PCT(expected)} (« ${line.label} », base ${EURO(line.base)}). Le taux se met à jour chaque année selon la notification de la CARSAT (Code de la sécurité sociale, art. D242-6-1 et suivants).`,
      };
    },
  },
  {
    id: "cotisations.sante-part-patronale",
    category: "cotisations",
    description: "Complémentaire santé : présence et part patronale minimale (paramètre réglementaire daté)",
    check: (payslip, context) => {
      const minimum = regulatoryValue(context, "sante.part_employeur_min", payslip.period);
      if (!minimum) return null;
      const employer = payslip.employerHealthContribution ?? null;
      const employee = payslip.employeeHealthContribution ?? null;
      if (employer === null && employee === null) {
        if ((payslip.contributionLines ?? []).length < 3) return null;
        return {
          severity: "info",
          message: `Aucune ligne de complémentaire santé lue : la couverture collective est obligatoire (${minimum.source}), sauf dispense du salarié à conserver au dossier.`,
        };
      }
      if (employer === null || employee === null || employer + employee <= 0) return null;
      const share = (employer / (employer + employee)) * 100;
      if (share + 0.5 >= minimum.value) return null;
      return {
        severity: "warning",
        message: `Part patronale de complémentaire santé de ${share.toLocaleString("fr-FR", { maximumFractionDigits: 1 })} % (${EURO(employer)} employeur / ${EURO(employee)} salarié) : l'employeur doit financer au moins ${minimum.value} % de la couverture (${minimum.source}). À vérifier si le salarié a choisi des options facultatives.`,
      };
    },
  },
  {
    id: "cotisations.prevoyance-cadres",
    category: "cotisations",
    description: "Cadres : cotisation patronale de prévoyance au moins égale au minimum sur la tranche 1 (paramètre réglementaire daté)",
    check: (payslip, context) => {
      if (!isCadre(payslip)) return null;
      const minimum = regulatoryValue(context, "prevoyance.cadres_taux_min_t1", payslip.period);
      if (!minimum) return null;
      const lines = (payslip.contributionLines ?? []).filter((l) => /pr[ée]voyance/i.test(l.label) && !/tranche\s*(2|b)\b|\bt\s*2\b/i.test(l.label));
      if (lines.length === 0) {
        return {
          severity: "warning",
          message: `Salarié cadre sans ligne de prévoyance lue : l'employeur doit cotiser au moins ${PCT(minimum.value)} de la tranche 1 (${minimum.source}). Vérifier la ligne sur le bulletin.`,
        };
      }
      const employerTotal = lines.reduce((sum, l) => sum + (l.employerRatePercent ?? 0), 0);
      if (employerTotal === 0 || employerTotal + tolerancesFor(context).ratePoints >= minimum.value) return null;
      return {
        severity: "critical",
        message: `Prévoyance des cadres : cotisation patronale de ${PCT(employerTotal)} sur la tranche 1, inférieure au minimum de ${PCT(minimum.value)} (${minimum.source}). Sanction en cas de décès : versement aux ayants droit de 3 PMSS.`,
      };
    },
  },
];
