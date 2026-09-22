import type { PayslipData } from "@/types/payslip";

/**
 * Extrait les données structurées d'une fiche de paie à partir du texte brut
 * obtenu après extraction PDF (pdf-parse) ou OCR.
 *
 * v1 : extraction par heuristiques/regex sur les libellés français les plus
 * courants (brut, net à payer, période, cotisations). À affiner au fur et à
 * mesure des vrais formats de bulletins rencontrés (logiciels de paie
 * différents = mises en page différentes).
 */

const MONTHS_FR: Record<string, string> = {
  janvier: "01",
  février: "02",
  fevrier: "02",
  mars: "03",
  avril: "04",
  mai: "05",
  juin: "06",
  juillet: "07",
  août: "08",
  aout: "08",
  septembre: "09",
  octobre: "10",
  novembre: "11",
  décembre: "12",
  decembre: "12",
};

function normalizeAmount(raw: string): number {
  const cleaned = raw
    .replace(/\s| /g, "")
    .replace(/€/g, "")
    .replace(/\.(?=\d{3}(?:,|$))/g, "") // sépare les milliers "1.234,56"
    .replace(",", ".");
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function findAmountNear(text: string, labelPattern: RegExp): number | null {
  const match = text.match(labelPattern);
  if (!match) return null;
  const amountMatch = match[0].match(/(\d[\d\s. ]*,\d{2})|(\d+[.,]\d{2})/);
  if (!amountMatch) return null;
  return normalizeAmount(amountMatch[0]);
}

function extractPeriod(text: string): string {
  const monthNames = Object.keys(MONTHS_FR).join("|");
  const monthYear = text.match(new RegExp(`(${monthNames})\\s+(\\d{4})`, "i"));
  if (monthYear) {
    const month = MONTHS_FR[monthYear[1].toLowerCase()];
    return `${monthYear[2]}-${month}`;
  }

  const numeric = text.match(/\b(0[1-9]|1[0-2])[\/\-](\d{4})\b/);
  if (numeric) {
    return `${numeric[2]}-${numeric[1]}`;
  }

  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function extractContributions(text: string): { label: string; amount: number }[] {
  const lines = text.split(/\r?\n/);
  const contributions: { label: string; amount: number }[] = [];

  for (const line of lines) {
    if (!/cotisation|s[ée]curit[ée] sociale|retraite|urssaf|mutuelle|pr[ée]voyance|ch[ôo]mage/i.test(line)) {
      continue;
    }
    const amountMatch = line.match(/(\d[\d\s. ]*,\d{2})|(\d+[.,]\d{2})/);
    if (!amountMatch) continue;

    const label = line.slice(0, amountMatch.index ?? 0).trim().replace(/\s{2,}/g, " ");
    if (!label) continue;

    contributions.push({ label, amount: normalizeAmount(amountMatch[0]) });
  }

  return contributions.slice(0, 30); // garde-fou anti faux positifs sur texte mal extrait
}

export function parsePayslip(rawContent: string): PayslipData {
  const text = rawContent.replace(/\u0000/g, "");

  const grossPay =
    findAmountNear(text, /salaire\s+brut[^\n\d]{0,40}(\d[\d\s. ]*,\d{2}|\d+[.,]\d{2})/i) ??
    findAmountNear(text, /brut\s*(?:mensuel)?[^\n\d]{0,40}(\d[\d\s. ]*,\d{2}|\d+[.,]\d{2})/i) ??
    0;

  const netPay =
    findAmountNear(text, /net\s*(?:à|a)\s*payer[^\n\d]{0,40}(\d[\d\s. ]*,\d{2}|\d+[.,]\d{2})/i) ??
    findAmountNear(text, /net\s+pay[ée][^\n\d]{0,40}(\d[\d\s. ]*,\d{2}|\d+[.,]\d{2})/i) ??
    findAmountNear(text, /net\s+imposable[^\n\d]{0,40}(\d[\d\s. ]*,\d{2}|\d+[.,]\d{2})/i) ??
    0;

  const employeeNameMatch = text.match(/(?:salarié|nom\s*(?:et\s*pr[ée]nom)?|employ[ée])\s*[:\-]?\s*([A-ZÀ-Ü][\wÀ-ÿ'\- ]{2,40})/i);

  return {
    employeeName: employeeNameMatch ? employeeNameMatch[1].trim() : "",
    period: extractPeriod(text),
    grossPay,
    netPay,
    contributions: extractContributions(text),
  };
}
