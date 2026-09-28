import type { MandatoryMentionKey } from "@/types/payslip";
import type { AnomalyRule } from "../types";
import { tolerancesFor } from "../tolerances";
import {
  LEGAL_SOURCES,
  PMSS_BY_YEAR,
  findContributionReference,
  isYearCovered,
  yearOfPeriod,
} from "../referentiels/legal";

/**
 * Contrôles légaux issus de la base « Règles de contrôle » du Notion de
 * pilotage (sévérités : Bloquante → critical, Majeure → warning,
 * Mineure → info). Chaque règle ne s'exécute que si les données dont elle a
 * besoin ont été extraites de la fiche : un champ absent rend la règle
 * silencieuse, jamais source d'une anomalie.
 */

const EURO = (value: number) =>
  new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
const PCT = (value: number) => `${value.toLocaleString("fr-FR", { maximumFractionDigits: 3 })} %`;

/** 8 heures par semaine rapportées au mois (8 × 52 / 12). */
const MONTHLY_HOURS_AT_25_PERCENT = (8 * 52) / 12;

const MENTION_LABELS: Record<MandatoryMentionKey, string> = {
  employeur: "identité de l'employeur",
  siret: "numéro SIRET",
  codeApe: "code APE / NAF",
  conventionCollective: "convention collective applicable",
  emploi: "emploi occupé",
  classification: "position dans la classification conventionnelle",
  periode: "période de paie",
  heures: "nombre d'heures ou forfait",
  netAPayer: "net à payer",
  datePaiement: "date de paiement",
  netImposable: "net imposable / prélèvement à la source",
  netSocial: "montant net social",
  totalCotisations: "total des cotisations et contributions",
  congesPayes: "congés payés",
  mentionConservation: "mention de conservation du bulletin sans limitation de durée",
};

export const controlesLegauxRules: AnomalyRule[] = [
  {
    id: "coherence.net-a-payer-calcul",
    category: "coherence",
    description: "Net à payer = brut − cotisations salariales − retenues (écart toléré réglable, 1 € par défaut)",
    check: (payslip, context) => {
      const NET_TOLERANCE_EUROS = tolerancesFor(context).amountEuros;
      const gross = payslip.grossPay;
      const totalContributions = payslip.totalEmployeeContributions ?? null;
      const netBeforeTax = payslip.netBeforeTax ?? null;
      const tax = payslip.incomeTaxWithheld ?? null;
      const problems: string[] = [];

      if (gross > 0 && totalContributions !== null && netBeforeTax !== null) {
        const expected = gross - totalContributions;
        if (Math.abs(netBeforeTax - expected) > NET_TOLERANCE_EUROS) {
          problems.push(
            `net avant impôt affiché ${EURO(netBeforeTax)} alors que brut − cotisations salariales = ${EURO(expected)} (écart ${EURO(netBeforeTax - expected)})`
          );
        }
      }
      if (netBeforeTax !== null && tax !== null && payslip.netPay > 0) {
        const expected = netBeforeTax - tax;
        if (Math.abs(payslip.netPay - expected) > NET_TOLERANCE_EUROS) {
          problems.push(
            `net à payer affiché ${EURO(payslip.netPay)} alors que net avant impôt − prélèvement à la source = ${EURO(expected)}`
          );
        }
      }
      if (problems.length === 0) return null;

      // Titres-restaurant, remboursements de frais, acomptes… s'ajoutent ou se
      // retranchent légitimement : l'écart est alors signalé sans être bloquant.
      if (payslip.hasNonSubjectItems) {
        return {
          severity: "info",
          message: `Incohérence possible du net : ${problems.join(" ; ")}. La fiche comporte des éléments non soumis ou des retenues (titres-restaurant, frais, acompte…) qui peuvent expliquer l'écart — à vérifier.`,
        };
      }
      return { severity: "critical", message: `Incohérence du net à payer : ${problems.join(" ; ")}.` };
    },
  },
  {
    id: "heures-sup.taux-majoration",
    category: "heures-sup",
    description: "Majoration des heures supplémentaires : 25 % puis 50 %, ou taux conventionnel d'au moins 10 %",
    check: (payslip) => {
      const lines = payslip.overtime ?? [];
      if (lines.length === 0) return null;

      const illegal = lines.filter((l) => l.majorationPercent !== null && l.majorationPercent > 0 && l.majorationPercent < 10);
      if (illegal.length > 0) {
        return {
          severity: "warning",
          message: `Heures supplémentaires majorées à ${illegal.map((l) => PCT(l.majorationPercent!)).join(", ")} : inférieur au minimum légal de 10 %, même en présence d'un accord collectif (${LEGAL_SOURCES.heuresSup}).`,
        };
      }

      const belowDefault = lines.filter((l) => l.majorationPercent !== null && l.majorationPercent >= 10 && l.majorationPercent < 25);
      if (belowDefault.length > 0) {
        return {
          severity: "info",
          message: `Heures supplémentaires majorées à ${belowDefault.map((l) => PCT(l.majorationPercent!)).join(", ")} : conforme uniquement si un accord d'entreprise ou de branche le prévoit (à défaut : 25 % pour les 8 premières heures hebdomadaires, 50 % au-delà — ${LEGAL_SOURCES.heuresSup}).`,
        };
      }

      const hoursAt25 = lines
        .filter((l) => l.majorationPercent !== null && Math.abs(l.majorationPercent - 25) < 0.5)
        .reduce((sum, l) => sum + (l.hours ?? 0), 0);
      const hasAt50 = lines.some((l) => l.majorationPercent !== null && l.majorationPercent >= 50);
      if (hoursAt25 > MONTHLY_HOURS_AT_25_PERCENT + 0.01 && !hasAt50) {
        return {
          severity: "info",
          message: `${hoursAt25.toLocaleString("fr-FR")} h supplémentaires majorées à 25 % sur le mois, sans aucune heure à 50 % : au-delà de 8 h par semaine, la majoration légale passe à 50 % sauf accord collectif — vérifier la répartition hebdomadaire.`,
        };
      }
      return null;
    },
  },
  {
    id: "cotisations.taux-urssaf",
    category: "cotisations",
    description: "Compare le taux de chaque cotisation détectée au barème officiel en vigueur pour la période",
    check: (payslip, context) => {
      const RATE_TOLERANCE = tolerancesFor(context).ratePoints;
      const year = yearOfPeriod(payslip.period);
      const lines = payslip.contributionLines ?? [];
      if (!isYearCovered(year) || lines.length === 0) return null;

      const ecarts: string[] = [];
      for (const line of lines) {
        const ref = findContributionReference(line.label);
        if (!ref) continue;
        const known = [...ref.employeeRates, ...ref.employerRates];
        if (known.some((rate) => Math.abs(rate - line.ratePercent) <= RATE_TOLERANCE)) continue;
        ecarts.push(
          `« ${line.label} » appliquée à ${PCT(line.ratePercent)} (taux salarial officiel ${ref.employeeRates.map(PCT).join(" ou ")} — ${ref.source})`
        );
      }
      if (ecarts.length === 0) return null;
      return {
        severity: "critical",
        message: `Taux de cotisation non conforme au barème ${year} : ${ecarts.join(" ; ")}. Pour la retraite complémentaire, une répartition salarié/employeur dérogatoire antérieure à 2019 peut expliquer un écart.`,
      };
    },
  },
  {
    id: "plafonds.pmss-depasse",
    category: "plafonds",
    description: "La base des cotisations plafonnées (tranche 1) ne doit pas dépasser le PMSS en vigueur",
    check: (payslip) => {
      const year = yearOfPeriod(payslip.period);
      if (!isYearCovered(year)) return null;
      const pmss = PMSS_BY_YEAR[year];
      const over = (payslip.contributionLines ?? []).filter((line) => {
        const isCapped =
          /plafonn|tranche\s*(1|a)\b|\bt\s*1\b/i.test(line.label) && !/d[ée]plafonn|non\s+plafonn/i.test(line.label);
        return isCapped && line.base > pmss + 0.01;
      });
      if (over.length === 0) return null;
      return {
        severity: "warning",
        message: `Base de cotisation plafonnée supérieure au PMSS ${year} (${EURO(pmss)}) : ${over
          .map((l) => `« ${l.label} » sur ${EURO(l.base)}`)
          .join(" ; ")}. Seule une régularisation progressive du plafond sur l'année peut le justifier — à vérifier (${LEGAL_SOURCES.pmss}).`,
      };
    },
  },
  {
    id: "mentions-obligatoires.absentes",
    category: "mentions-obligatoires",
    description: "Présence des mentions obligatoires du bulletin de paie (article R3243-1 du Code du travail)",
    check: (payslip) => {
      const mentions = payslip.mandatoryMentions;
      // Sans brut détecté, le document n'est probablement pas un bulletin lisible :
      // la règle qualité des données le signale déjà.
      if (!mentions || payslip.grossPay <= 0) return null;
      const missing = (Object.keys(MENTION_LABELS) as MandatoryMentionKey[]).filter((key) => mentions[key] === false);
      if (missing.length === 0) return null;
      return {
        severity: "critical",
        message: `Mention(s) obligatoire(s) non trouvée(s) sur le bulletin : ${missing.map((k) => MENTION_LABELS[k]).join(", ")} (${LEGAL_SOURCES.mentions}). Détection textuelle : vérifier sur le document original.`,
      };
    },
  },
  {
    id: "conges.solde-incoherent",
    category: "conges",
    description: "Solde de congés payés = congés acquis − congés pris",
    check: (payslip, context) => {
      const CONGES_TOLERANCE_DAYS = tolerancesFor(context).leaveDays;
      const { acquired, taken, balance } = payslip.paidLeave;
      if (acquired === null || taken === null || balance === null) return null;
      const expected = acquired - taken;
      if (Math.abs(balance - expected) <= CONGES_TOLERANCE_DAYS) return null;
      return {
        severity: "info",
        message: `Solde de congés payés affiché (${balance} j) différent de acquis − pris (${acquired} − ${taken} = ${expected} j) — à vérifier, notamment si le bulletin sépare les compteurs N-1 et N (${LEGAL_SOURCES.conges}).`,
      };
    },
  },
];
