import type { PayslipData } from "@/types/payslip";

export function parsePayslip(_rawContent: string | Buffer): PayslipData {
  throw new Error("parsePayslip: à implémenter");
}
