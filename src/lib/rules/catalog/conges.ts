import type { AnomalyRule } from "../types";

/**
 * Règles sur les congés payés — s'appuient sur les champs best-effort
 * (acquired/taken/balance) extraits par le parser. Ces champs ne sont pas
 * toujours présents selon le format du bulletin ; les règles ne se
 * déclenchent que lorsque les valeurs nécessaires ont été détectées.
 */
export const congesRules: AnomalyRule[] = [
  {
    id: "conges.solde-negatif",
    category: "conges",
    description: "Le solde de congés payés ne devrait pas être négatif sans explication",
    check: (payslip) => {
      const { balance } = payslip.paidLeave;
      if (balance !== null && balance < 0) {
        return {
          severity: "warning",
          message: `Solde de congés payés négatif détecté (${balance} j) — à vérifier auprès du service RH.`,
        };
      }
      return null;
    },
  },
  {
    id: "conges.pris-superieur-acquis",
    category: "conges",
    description: "Les jours de congés pris ne devraient pas dépasser les jours acquis",
    check: (payslip) => {
      const { acquired, taken } = payslip.paidLeave;
      if (acquired !== null && taken !== null && taken > acquired) {
        return {
          severity: "warning",
          message: `Jours de congés pris (${taken} j) supérieurs aux jours acquis (${acquired} j).`,
        };
      }
      return null;
    },
  },
];
