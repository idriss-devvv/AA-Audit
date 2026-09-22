import type { PayslipData } from "@/types/payslip";
import type { AnomalyRule, RuleContext } from "./types";

export type EngineAnomaly = {
  ruleId: string;
  severity: "info" | "warning" | "critical";
  message: string;
  category: string;
};

/**
 * Exécute l'ensemble des règles fournies sur une fiche de paie.
 *
 * Chaque règle est isolée dans un try/catch : une règle qui lève une
 * exception (champ inattendu, division par zéro...) ne doit jamais faire
 * échouer l'analyse complète de la fiche — elle est simplement journalisée
 * et ignorée pour ce contrôle-là.
 */
export function runRules(
  rules: AnomalyRule[],
  payslip: PayslipData,
  context: RuleContext = {}
): EngineAnomaly[] {
  const anomalies: EngineAnomaly[] = [];

  for (const rule of rules) {
    try {
      const finding = rule.check(payslip, context);
      if (finding) {
        anomalies.push({
          ruleId: rule.id,
          category: rule.category,
          severity: finding.severity,
          message: finding.message,
        });
      }
    } catch (err) {
      console.error(`[rules-engine] Règle "${rule.id}" en échec:`, err);
    }
  }

  const severityWeight: Record<string, number> = { critical: 0, warning: 1, info: 2 };
  return anomalies.sort((a, b) => severityWeight[a.severity] - severityWeight[b.severity]);
}
