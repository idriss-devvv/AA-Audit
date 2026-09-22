export interface PayslipData {
  employeeName: string;
  period: string;
  grossPay: number;
  netPay: number;
  contributions: { label: string; amount: number }[];
}

export interface Anomaly {
  ruleId: string;
  severity: "info" | "warning" | "critical";
  message: string;
}
