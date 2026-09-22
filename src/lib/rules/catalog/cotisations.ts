import type { AnomalyRule } from "../types";

/**
 * Règles portant sur les lignes de cotisations extraites de la fiche.
 * Ne présument d'aucun taux légal officiel (ceux-ci arriveront avec les
 * règles dédiées — URSSAF, AT/MP, IJSS...) : uniquement des invariants
 * structurels sur les montants eux-mêmes.
 */
export const cotisationsRules: AnomalyRule[] = [
  {
    id: "cotisations.aucune-detectee",
    category: "cotisations",
    description: "Une fiche avec un brut renseigné doit normalement comporter des cotisations",
    check: (payslip) => {
      if (payslip.grossPay > 0 && payslip.contributions.length === 0) {
        return {
          severity: "warning",
          message: "Aucune ligne de cotisation détectée alors qu'un salaire brut est renseigné — vérifier l'extraction.",
        };
      }
      return null;
    },
  },
  {
    id: "cotisations.montant-negatif",
    category: "cotisations",
    description: "Une cotisation salariale ne doit pas apparaître comme un montant négatif",
    check: (payslip) => {
      const negative = payslip.contributions.find((c) => c.amount < 0);
      if (negative) {
        return {
          severity: "critical",
          message: `Cotisation « ${negative.label} » avec un montant négatif (${negative.amount.toFixed(2)} €).`,
        };
      }
      return null;
    },
  },
  {
    id: "cotisations.superieure-au-brut",
    category: "cotisations",
    description: "Une seule ligne de cotisation ne doit pas dépasser le salaire brut total",
    check: (payslip) => {
      if (payslip.grossPay <= 0) return null;
      const tooHigh = payslip.contributions.find((c) => c.amount > payslip.grossPay);
      if (tooHigh) {
        return {
          severity: "warning",
          message: `Cotisation « ${tooHigh.label} » (${tooHigh.amount.toFixed(2)} €) supérieure au salaire brut (${payslip.grossPay.toFixed(2)} €).`,
        };
      }
      return null;
    },
  },
];
