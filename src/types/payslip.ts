export interface PaidLeaveInfo {
  acquired: number | null;
  taken: number | null;
  balance: number | null;
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
}

export interface Anomaly {
  ruleId: string;
  severity: "info" | "warning" | "critical";
  message: string;
  category?: string;
}
