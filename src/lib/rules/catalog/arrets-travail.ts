import type { AnomalyRule } from "../types";

/**
 * Détection (purement textuelle) d'une mention d'arrêt de travail, d'IJSS ou
 * de subrogation. Le calcul de ces indemnités dépend de l'historique de
 * salaire, de la CPAM et d'un éventuel maintien conventionnel — aucune
 * formule légale n'est appliquée ici, on se contente de signaler la mention
 * pour inviter à une vérification manuelle.
 */
export const arretsTravailRules: AnomalyRule[] = [
  {
    id: "arrets-travail.mention-detectee",
    category: "arrets-travail",
    description: "Signale une mention d'arrêt de travail, IJSS ou subrogation à vérifier manuellement",
    check: (payslip) => {
      const detailed = payslip.sickLeave && (payslip.sickLeave.days !== null || payslip.sickLeave.ijss !== null || payslip.sickLeave.employerComplement !== null);
      if (payslip.mentionsArretOuIjss && !detailed) {
        return {
          severity: "info",
          message:
            "Cette fiche mentionne un arrêt de travail, des IJSS ou une subrogation. Le calcul des indemnités journalières (historique de salaire, CPAM, éventuel maintien conventionnel) n'est pas vérifié automatiquement — à contrôler manuellement.",
        };
      }
      return null;
    },
  },
];
