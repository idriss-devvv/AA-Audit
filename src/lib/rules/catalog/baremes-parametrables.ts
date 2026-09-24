import type { AnomalyRule } from "../types";

function normalizeLabel(label: string): string {
  return label
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function labelsMatch(a: string, b: string): boolean {
  const na = normalizeLabel(a);
  const nb = normalizeLabel(b);
  if (!na || !nb) return false;
  return na.includes(nb) || nb.includes(na);
}

const TOLERANCE_RELATIVE = 0.08;
const TOLERANCE_ABSOLUTE_MIN = 3;

export const baremesParametrablesRules: AnomalyRule[] = [
  {
    id: "baremes.cotisation-ecart",
    category: "baremes",
    description: "Compare le montant d'une cotisation détectée au taux attendu paramétré par l'entreprise (% du brut)",
    check: (payslip, context) => {
      const rates = context.contributionRates ?? [];
      if (rates.length === 0 || payslip.grossPay <= 0) return null;
      const ecarts: string[] = [];
      for (const rate of rates) {
        const line = payslip.contributions.find((c) => labelsMatch(c.label, rate.label));
        if (!line) continue;
        const expected = payslip.grossPay * (rate.expectedRatePercent / 100);
        const tolerance = Math.max(expected * TOLERANCE_RELATIVE, TOLERANCE_ABSOLUTE_MIN);
        if (Math.abs(line.amount - expected) > tolerance) {
          ecarts.push(`« ${rate.label} » : attendu ~${expected.toFixed(2)} € (${rate.expectedRatePercent} % du brut) vs ${line.amount.toFixed(2)} € détecté`);
        }
      }
      if (ecarts.length === 0) return null;
      return { severity: "warning", message: `Écart(s) par rapport aux taux paramétrés : ${ecarts.join(" ; ")}.` };
    },
  },
  {
    id: "baremes.cotisation-manquante",
    category: "baremes",
    description: "Signale un taux de cotisation paramétré qui ne correspond à aucune ligne détectée sur la fiche",
    check: (payslip, context) => {
      const rates = context.contributionRates ?? [];
      if (rates.length === 0) return null;
      const manquantes = rates.filter((rate) => !payslip.contributions.some((c) => labelsMatch(c.label, rate.label))).map((rate) => `« ${rate.label} »`);
      if (manquantes.length === 0) return null;
      return { severity: "info", message: `Cotisation(s) paramétrée(s) non retrouvée(s) sur cette fiche : ${manquantes.join(", ")} — vérifier si elles doivent apparaître pour cette période.` };
    },
  },
  {
    id: "baremes.salaire-inferieur-minimum",
    category: "baremes",
    description: "Compare le salaire brut au salaire minimum conventionnel paramétré",
    check: (payslip, context) => {
      const minimum = context.salaireMinimumConventionnel;
      if (!minimum || minimum <= 0 || payslip.grossPay <= 0) return null;
      if (payslip.grossPay < minimum) {
        return { severity: "critical", message: `Salaire brut (${payslip.grossPay.toFixed(2)} €) inférieur au salaire minimum conventionnel paramétré (${minimum.toFixed(2)} €).` };
      }
      return null;
    },
  },
  {
    id: "baremes.net-imposable-a-verifier",
    category: "baremes",
    description: "Estimation approximative du net imposable à partir du taux de CSG/CRDS non déductible paramétré, à titre indicatif",
    check: (payslip, context) => {
      const rate = context.csgCrdsNonDeductiblePercent;
      if (!rate || rate <= 0) return null;
      if (!payslip.netTaxable || payslip.netPay <= 0 || payslip.grossPay <= 0) return null;
      const estimated = payslip.netPay + payslip.grossPay * (rate / 100);
      const tolerance = Math.max(estimated * TOLERANCE_RELATIVE, TOLERANCE_ABSOLUTE_MIN);
      if (Math.abs(payslip.netTaxable - estimated) > tolerance) {
        return { severity: "info", message: `Net imposable détecté (${payslip.netTaxable.toFixed(2)} €) éloigné de l'estimation approximative (${estimated.toFixed(2)} €) basée sur le taux de CSG/CRDS non déductible paramétré (${rate} % du brut). Cette estimation est indicative et ne remplace pas un contrôle détaillé.` };
      }
      return null;
    },
  },
];
