export interface PaidLeaveInfo {
  acquired: number | null; // jours acquis
  taken: number | null; // jours pris sur la période
  balance: number | null; // solde restant
}

export interface PayslipData {
  employeeName: string;
  period: string; // ex: "2026-08"
  grossPay: number;
  netPay: number;
  contributions: { label: string; amount: number }[];
  // Champs complémentaires (v1, best-effort) — au-delà du simple brut/net,
  // utiles pour les futures règles de contrôle (convention collective,
  // ancienneté, droits à congés...). Les règles exploitant ces champs
  // seront paramétrées ultérieurement.
  collectiveAgreement: string | null; // convention collective
  position: string | null; // emploi / poste
  seniorityDate: string | null; // date d'entrée
  paidLeave: PaidLeaveInfo; // congés payés
  // Champs v1.1 — support des règles paramétrables (barèmes configurés par
  // l'entreprise/le cabinet, jamais de valeur légale présumée par défaut).
  netTaxable: number | null; // net imposable, si détecté distinctement du net à payer
  mentionsArretOuIjss: boolean; // arrêt de travail / IJSS / subrogation détecté dans le texte
}

export interface Anomaly {
  ruleId: string;
  severity: "info" | "warning" | "critical";
  message: string;
  // Catégorie de la règle (cohérence, cotisations, congés...), dérivable du
  // préfixe du ruleId. Fournie par le moteur pour l'affichage ; optionnelle
  // pour rester compatible avec d'éventuelles anomalies déjà en base sans
  // ce champ.
  category?: string;
}
