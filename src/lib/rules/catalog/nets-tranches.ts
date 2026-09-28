import type { PayslipData } from "@/types/payslip";
import type { AnomalyRule } from "../types";
import { tolerancesFor } from "../tolerances";
import { PMSS_BY_YEAR, isYearCovered, yearOfPeriod } from "../referentiels/legal";

/**
 * Net imposable, montant net social et tranches de cotisations (cahier des
 * charges V1). Les montants sont recalculés à partir des lignes lues sur le
 * bulletin ; un élément absent désactive le contrôle concerné.
 *
 * Sources :
 * - net imposable : CGI art. 79 et 83 ; BOI-RSA-BASE-30-10 (CSG non déductible
 *   et CRDS réintégrées, part patronale de complémentaire santé imposable,
 *   heures supplémentaires exonérées dans la limite annuelle — CGI art. 81 quater) ;
 * - montant net social : décret n° 2023-1060 du 20 novembre 2023 ;
 * - tranches : CSS art. L241-3 (plafond de la Sécurité sociale), ANI Agirc-Arrco
 *   du 17 novembre 2017 (T1 jusqu'à 1 PMSS, T2 de 1 à 8 PMSS).
 */

const EURO = (value: number) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);

const CSG_NON_DEDUCTIBLE = /(csg|crds).*(non\s+d[ée]ductible|non\s+imposable|imposable)|\bcrds\b/i;
const HEALTH_EMPLOYER = /(mutuelle|compl[ée]mentaire\s+sant[ée]|frais\s+de\s+sant[ée]).*(patronal|employeur)/i;

function sumLines(payslip: PayslipData, pattern: RegExp): number {
  const detailed = (payslip.contributionLines ?? []).filter((l) => pattern.test(l.label)).map((l) => l.amount);
  if (detailed.length > 0) return detailed.reduce((a, b) => a + b, 0);
  return payslip.contributions.filter((c) => pattern.test(c.label)).reduce((a, c) => a + Math.abs(c.amount), 0);
}

function overtimeTotal(payslip: PayslipData): number {
  return (payslip.overtime ?? []).reduce((sum, line) => sum + (line.amount ?? 0), 0);
}

const isT1 = (label: string) => /(plafonn|tranche\s*(1|a)\b|\bt\s*1\b)/i.test(label) && !/d[ée]plafonn|non\s+plafonn/i.test(label);
const isT2 = (label: string) => /tranche\s*(2|b)\b|\bt\s*2\b/i.test(label);

export const netsTranchesRules: AnomalyRule[] = [
  {
    id: "coherence.net-imposable",
    category: "coherence",
    description: "Net imposable = net avant impôt + CSG non déductible et CRDS (+ part patronale santé, − heures supplémentaires exonérées)",
    check: (payslip, context) => {
      const netTaxable = payslip.netTaxable ?? null;
      const netBeforeTax = payslip.netBeforeTax ?? null;
      if (netTaxable === null || netBeforeTax === null || netTaxable <= 0 || netBeforeTax <= 0) return null;
      const csg = sumLines(payslip, CSG_NON_DEDUCTIBLE);
      if (csg <= 0) return null;
      const tolerance = tolerancesFor(context).amountEuros;
      const overtime = overtimeTotal(payslip);
      const health = payslip.employerHealthContribution ?? sumLines(payslip, HEALTH_EMPLOYER);
      // Fourchette : les heures sup exonérées abaissent le net imposable, la part patronale santé le relève.
      const low = netBeforeTax + csg - overtime - tolerance;
      const high = netBeforeTax + csg + health + tolerance;
      if (netTaxable < low) {
        return {
          severity: "warning",
          message: `Net imposable (${EURO(netTaxable)}) inférieur au montant attendu : net avant impôt ${EURO(netBeforeTax)} + CSG non déductible et CRDS ${EURO(csg)}${
            overtime > 0 ? ` − heures supplémentaires exonérées ${EURO(overtime)} au plus` : ""
          } = ${EURO(low + tolerance)} au minimum. Le prélèvement à la source est alors calculé sur une base trop faible.`,
        };
      }
      if (netTaxable > high && !payslip.hasNonSubjectItems) {
        return {
          severity: "info",
          message: `Net imposable (${EURO(netTaxable)}) supérieur à net avant impôt + CSG non déductible et CRDS (${EURO(netBeforeTax + csg)})${
            health > 0 ? ` + part patronale santé (${EURO(health)})` : ""
          } : vérifier la part patronale de complémentaire santé et les avantages en nature, seuls éléments qui justifient un écart.`,
        };
      }
      return null;
    },
  },
  {
    id: "coherence.net-social",
    category: "coherence",
    description: "Montant net social présent et cohérent avec le net avant impôt (décret du 20 novembre 2023)",
    check: (payslip, context) => {
      const netSocial = payslip.netSocial ?? null;
      const netBeforeTax = payslip.netBeforeTax ?? null;
      if (netSocial === null || netBeforeTax === null || netSocial <= 0 || netBeforeTax <= 0) return null;
      if (payslip.grossPay > 0 && netSocial > payslip.grossPay + tolerancesFor(context).amountEuros) {
        return {
          severity: "warning",
          message: `Montant net social (${EURO(netSocial)}) supérieur au salaire brut (${EURO(payslip.grossPay)}) : impossible, il se calcule après déduction des cotisations salariales obligatoires.`,
        };
      }
      // Le net social ne retire pas les éléments non soumis (titres-restaurant, remboursements…) :
      // un écart important sans élément de ce type est suspect.
      const gap = Math.abs(netSocial - netBeforeTax);
      const allowed = Math.max(netBeforeTax * (tolerancesFor(context).relativePercent / 100), tolerancesFor(context).relativeMinEuros);
      if (gap > allowed && !payslip.hasNonSubjectItems) {
        return {
          severity: "info",
          message: `Montant net social (${EURO(netSocial)}) éloigné du net avant impôt (${EURO(netBeforeTax)}, écart ${EURO(gap)}) sans élément non soumis sur le bulletin : vérifier son calcul (brut − cotisations et contributions salariales obligatoires, + part patronale de prévoyance et santé non obligatoire).`,
        };
      }
      return null;
    },
  },
  {
    id: "plafonds.tranches",
    category: "plafonds",
    description: "Bases des tranches : T1 (et vieillesse plafonnée) = brut dans la limite du PMSS ; T2 = part du brut entre 1 et 8 PMSS",
    check: (payslip, context) => {
      const year = yearOfPeriod(payslip.period);
      if (!isYearCovered(year) || payslip.grossPay <= 0) return null;
      const pmss = PMSS_BY_YEAR[year];
      const gross = payslip.grossPay;
      const tolerance = Math.max(tolerancesFor(context).amountEuros, 1);
      const lines = payslip.contributionLines ?? [];
      const problems: string[] = [];

      const expectedT1 = Math.min(gross, pmss);
      for (const line of lines.filter((l) => isT1(l.label) && !isT2(l.label))) {
        // Base plus faible : plafond proratisé (entrée ou sortie en cours de mois, absence) — signalé sans être bloquant.
        if (line.base > expectedT1 + tolerance) {
          problems.push(`« ${line.label} » calculée sur ${EURO(line.base)} au lieu de ${EURO(expectedT1)} au plus (brut limité au PMSS)`);
        }
      }

      const expectedT2 = Math.max(0, Math.min(gross, 8 * pmss) - pmss);
      for (const line of lines.filter((l) => isT2(l.label))) {
        if (expectedT2 === 0 && line.base > tolerance) {
          problems.push(`« ${line.label} » sur ${EURO(line.base)} alors que le brut (${EURO(gross)}) ne dépasse pas le PMSS : aucune cotisation de tranche 2 n'est due`);
        } else if (expectedT2 > 0 && Math.abs(line.base - expectedT2) > tolerance && line.base > expectedT2) {
          problems.push(`« ${line.label} » calculée sur ${EURO(line.base)} au lieu de ${EURO(expectedT2)} (brut − 1 PMSS)`);
        }
      }

      if (gross > pmss + tolerance && lines.some((l) => isT1(l.label)) && !lines.some((l) => isT2(l.label))) {
        problems.push(`brut (${EURO(gross)}) supérieur au PMSS mais aucune ligne de tranche 2 lue (retraite complémentaire due sur ${EURO(expectedT2)})`);
      }

      if (problems.length === 0) return null;
      return {
        severity: "warning",
        message: `Tranches de cotisations à vérifier (PMSS ${year} : ${EURO(pmss)}) : ${problems.join(" ; ")}. Une régularisation progressive du plafond ou un plafond proratisé peut expliquer un écart.`,
      };
    },
  },
];
