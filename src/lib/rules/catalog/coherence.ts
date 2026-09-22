import type { AnomalyRule } from "../types";

/**
 * Règles de cohérence interne des montants (brut / net), sans référence à un
 * taux légal externe — uniquement des invariants qui doivent toujours être
 * vrais quelle que soit la situation du salarié.
 */
export const coherenceRules: AnomalyRule[] = [
  {
    id: "coherence.net-superieur-brut",
    category: "coherence",
    description: "Le net ne doit jamais dépasser le brut",
    check: (payslip) => {
      if (payslip.netPay > payslip.grossPay) {
        return {
          severity: "critical",
          message: `Net à payer (${payslip.netPay.toFixed(2)} €) supérieur au salaire brut (${payslip.grossPay.toFixed(2)} €).`,
        };
      }
      return null;
    },
  },
  {
    id: "coherence.montant-negatif",
    category: "coherence",
    description: "Le brut et le net ne doivent jamais être négatifs",
    check: (payslip) => {
      if (payslip.grossPay < 0 || payslip.netPay < 0) {
        return {
          severity: "critical",
          message: "Montant négatif détecté sur le salaire brut ou le net à payer.",
        };
      }
      return null;
    },
  },
  {
    id: "coherence.brut-non-detecte",
    category: "coherence",
    description: "Le salaire brut doit être renseigné",
    check: (payslip) => {
      if (payslip.grossPay === 0) {
        return {
          severity: "warning",
          message: "Salaire brut non détecté ou nul — vérifier l'extraction ou la fiche d'origine.",
        };
      }
      return null;
    },
  },
  {
    id: "coherence.net-non-detecte",
    category: "coherence",
    description: "Le net à payer doit être renseigné",
    check: (payslip) => {
      if (payslip.netPay === 0) {
        return {
          severity: "warning",
          message: "Net à payer non détecté ou nul — vérifier l'extraction ou la fiche d'origine.",
        };
      }
      return null;
    },
  },
  {
    id: "coherence.net-egal-brut",
    category: "coherence",
    description: "Un net strictement égal au brut suggère une absence de cotisations",
    check: (payslip) => {
      if (payslip.grossPay > 0 && payslip.netPay === payslip.grossPay) {
        return {
          severity: "warning",
          message: "Le net à payer est strictement égal au brut : aucune cotisation ne semble avoir été retenue, à vérifier.",
        };
      }
      return null;
    },
  },
];
