import type { AnomalyRule } from "../types";

/**
 * Règles de qualité d'extraction — signalent quand un champ important n'a
 * pas pu être détecté automatiquement. Sévérité "info" : ce n'est pas une
 * erreur de paie, mais un point à vérifier ou à compléter manuellement.
 */
export const qualiteDonneesRules: AnomalyRule[] = [
  {
    id: "qualite-donnees.identite-manquante",
    category: "qualite-donnees",
    description: "Le nom du salarié doit être détecté pour un suivi fiable",
    check: (payslip) => {
      if (!payslip.employeeName) {
        return {
          severity: "info",
          message: "Nom du salarié non détecté automatiquement — vérifier l'extraction.",
        };
      }
      return null;
    },
  },
  {
    id: "qualite-donnees.convention-non-detectee",
    category: "qualite-donnees",
    description: "La convention collective doit être identifiée pour activer les contrôles conventionnels",
    check: (payslip) => {
      if (!payslip.collectiveAgreement) {
        return {
          severity: "info",
          message: "Convention collective non détectée sur cette fiche — les contrôles spécifiques à une convention ne pourront pas s'appliquer tant qu'elle n'est pas renseignée.",
        };
      }
      return null;
    },
  },
];
