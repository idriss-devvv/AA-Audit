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
}

export interface Anomaly {
  ruleId: string;
  severity: "info" | "warning" | "critical";
  message: string;
}
