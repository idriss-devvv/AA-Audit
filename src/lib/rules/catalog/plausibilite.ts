import type { AnomalyRule } from "../types";
import { tolerancesFor } from "../tolerances";

/**
 * Règles de plausibilité statistique — des heuristiques larges, PAS des
 * assertions basées sur un taux légal (celles-ci viendront avec les règles
 * dédiées : URSSAF, AT/MP, IJSS, réduction générale...). Toujours formulées
 * avec prudence ("à vérifier") pour éviter les faux positifs, le ratio
 * net/brut variant selon le statut (cadre/non-cadre), le secteur et la
 * convention collective.
 */
export const plausibiliteRules: AnomalyRule[] = [
  {
    id: "plausibilite.ratio-net-brut-hors-norme",
    category: "plausibilite",
    description: "Le ratio net/brut doit rester dans une fourchette usuelle",
    check: (payslip, context) => {
      if (payslip.grossPay <= 0 || payslip.netPay <= 0) return null;
      const { netGrossMinPercent: min, netGrossMaxPercent: max } = tolerancesFor(context);
      const ratio = payslip.netPay / payslip.grossPay;
      if (ratio < min / 100 || ratio > max / 100) {
        return {
          severity: "info",
          message: `Ratio net/brut de ${(ratio * 100).toFixed(1)} % : en dehors de la fourchette usuelle (${min}–${max} %) observée sur la plupart des bulletins. Cela ne constitue pas nécessairement une erreur (statut cadre, temps partiel, régularisation...) — à vérifier manuellement.`,
        };
      }
      return null;
    },
  },
];
