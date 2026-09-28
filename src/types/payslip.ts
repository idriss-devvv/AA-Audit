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
