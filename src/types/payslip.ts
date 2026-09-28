export interface PaidLeaveInfo {
  acquired: number | null;
  taken: number | null;
  balance: number | null;
}

/** Ligne de cotisation dont base × taux = montant a pu être vérifiée à l'extraction. */
export interface ContributionLine {
  label: string;
  base: number;
  ratePercent: number;
  amount: number;
  /** Part patronale lue sur la même ligne (second triplet base × taux = montant). */
  employerRatePercent?: number | null;
  employerAmount?: number | null;
}

/** Ligne d'heures supplémentaires détectée sur le bulletin. */
export interface OvertimeLine {
  label: string;
  hours: number | null;
  majorationPercent: number | null;
  amount: number | null;
}

/** Mentions obligatoires du bulletin (article R3243-1 du Code du travail). */
export type MandatoryMentionKey =
  | "employeur"
  | "siret"
  | "codeApe"
  | "conventionCollective"
  | "emploi"
  | "classification"
  | "periode"
  | "heures"
  | "netAPayer"
  | "datePaiement"
  | "netImposable"
  | "netSocial"
  | "totalCotisations"
  | "congesPayes"
  | "mentionConservation";

/** Arrêt de travail lu sur le bulletin (lignes d'absence, IJSS, complément employeur). */
export interface SickLeaveInfo {
  /** Jours d'absence (quantité de la ligne d'absence si elle est en jours). */
  days: number | null;
  /** Heures d'absence (quantité de la ligne d'absence si elle est en heures). */
  hours: number | null;
  /** Retenue pour absence (valeur absolue). */
  deduction: number | null;
  /** Indemnités journalières de la Sécurité sociale portées sur le bulletin (subrogation). */
  ijss: number | null;
  /** Nombre d'indemnités journalières, si la ligne IJSS le précise. */
  ijssDays: number | null;
  /** Complément / maintien de salaire versé par l'employeur. */
  employerComplement: number | null;
  subrogation: boolean;
  /** Arrêt d'origine professionnelle (accident du travail, maladie professionnelle). */
  professional: boolean;
}

export interface PayslipData {
  employeeName: string;
  period: string;
  grossPay: number;
  netPay: number;
  contributions: { label: string; amount: number }[];
  collectiveAgreement: string | null;
  position: string | null;
  seniorityDate: string | null;
  paidLeave: PaidLeaveInfo;
  netTaxable: number | null;
  mentionsArretOuIjss: boolean;
  // Champs ajoutés pour les contrôles légaux — optionnels : les fiches
  // analysées avant leur introduction ne les contiennent pas.
  collectiveAgreementIdcc?: string | null;
  collectiveAgreementName?: string | null;
  /** Convention détectée dont les critères de contrôle sont stockés en base (tables cc_*). */
  collectiveAgreementAvailable?: boolean | null;
  contributionLines?: ContributionLine[];
  overtime?: OvertimeLine[];
  baseHourlyRate?: number | null;
  /** Montant et nombre d'heures de la ligne « Salaire de base ». */
  baseSalary?: number | null;
  baseHours?: number | null;
  /** Classification conventionnelle lue sur la fiche (niveau, coefficient, position…). */
  classification?: string | null;
  totalEmployeeContributions?: number | null;
  netBeforeTax?: number | null;
  /** « Montant net social » (obligatoire depuis juillet 2023). */
  netSocial?: number | null;
  /** Part patronale de complémentaire santé (imposable), dernière valeur de la ligne santé. */
  employerHealthContribution?: number | null;
  sickLeave?: SickLeaveInfo | null;
  /** Prime d'ancienneté versée ce mois-ci. */
  seniorityBonus?: number | null;
  /** 13e mois, prime annuelle ou gratification versée ce mois-ci. */
  annualBonus?: number | null;
  /** Majorations de nuit, dimanche ou jour férié lues avec leur taux. */
  premiumLines?: { kind: "nuit" | "dimanche" | "jour_ferie"; label: string; ratePercent: number | null; amount: number | null }[];
  /** Montant de la réduction générale des cotisations patronales (valeur absolue). */
  generalReduction?: number | null;
  /** Part salariale de complémentaire santé. */
  employeeHealthContribution?: number | null;
  incomeTaxWithheld?: number | null;
  hasNonSubjectItems?: boolean;
  mandatoryMentions?: Partial<Record<MandatoryMentionKey, boolean>>;
}

export interface Anomaly {
  ruleId: string;
  severity: "info" | "warning" | "critical";
  message: string;
  category?: string;
}
