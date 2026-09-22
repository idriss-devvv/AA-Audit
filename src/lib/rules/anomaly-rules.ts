import type { Anomaly, PayslipData } from "@/types/payslip";

type Rule = {
  id: string;
  description: string;
  check: (payslip: PayslipData) => Anomaly | null;
};

const rules: Rule[] = [
  {
    id: "net-superieur-brut",
    description: "Le net ne doit jamais dépasser le brut",
    check: (payslip) => {
      if (payslip.netPay > payslip.grossPay) {
        return {
          ruleId: "net-superieur-brut",
          severity: "critical",
          message: `Net (${payslip.netPay}) supérieur au brut (${payslip.grossPay})`,
        };
      }
      return null;
    },
  },
];

export function runAnomalyRules(payslip: PayslipData): Anomaly[] {
  return rules
    .map((rule) => rule.check(payslip))
    .filter((a): a is Anomaly => a !== null);
}
