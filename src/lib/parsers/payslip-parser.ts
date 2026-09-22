import type { PayslipData } from "@/types/payslip";

/**
 * Extrait les données structurées d'une fiche de paie brute
 * (PDF, texte OCR, ou export logiciel de paie).
 *
 * À implémenter selon le format des fiches à traiter
 * (ex: pdf-parse + règles regex, ou un service OCR).
 */
export function parsePayslip(_rawContent: string | Buffer): PayslipData {
  throw new Error("parsePayslip: à implémenter");
}
