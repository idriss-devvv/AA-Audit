import type { PaidLeaveInfo, PayslipData } from "@/types/payslip";

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
    .replace(/\.(?=\d{3}(?:,|$))/g, "")
    .replace(",", ".");
  const value = parseFloat(cleaned);
  return Number.isFinite(value) ? value : 0;
}

function findAmountNear(text: string, labelPattern: RegExp): number | null {
  const match = text.match(labelPattern);
  if (!match) return null;
  const amountMatch = match[0].match(/(\d[\d\s . ]*,\d{2})|(\d+[.,]\d{2})/);
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
    if (
      !/cotisation|s[ée]curit[ée] sociale|retraite|urssaf|mutuelle|pr[ée]voyance|ch[ôo]mage|accident|maladie|vieillesse|allocations?\s+familiales|csg|crds|at\s*\/\s*mp|compl[ée]mentaire/i.test(
        line
      )
    ) {
      continue;
    }
    const amountMatch = line.match(/(\d[\d\s . ]*,\d{2})|(\d+[.,]\d{2})/);
    if (!amountMatch) continue;

    const label = line.slice(0, amountMatch.index ?? 0).trim().replace(/\s{2,}/g, " ");
    if (!label) continue;

    contributions.push({ label, amount: normalizeAmount(amountMatch[0]) });
  }

  return contributions.slice(0, 30);
}

function extractCollectiveAgreement(text: string): string | null {
  const match = text.match(/convention\s+collective(?:\s+applicable)?\s*[:\-]?\s*([^\n]{3,90})/i);
  return match ? match[1].trim().replace(/\s{2,}/g, " ") : null;
}

function extractPosition(text: string): string | null {
  const match = text.match(/(?:emploi|poste)\s*[:\-]?\s*([A-Za-zÀ-ÿ0-9'\- ]{2,60})/i);
  return match ? match[1].trim().replace(/\s{2,}/g, " ") : null;
}

function extractSeniorityDate(text: string): string | null {
  const match = text.match(/date\s+d['’]entr[ée]e\s*[:\-]?\s*(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})/i);
  return match ? match[1] : null;
}

function findDaysNear(text: string, labelPattern: RegExp): number | null {
  const match = text.match(labelPattern);
  if (!match) return null;
  const numberMatches = match[0].match(/\d+(?:[.,]\d+)?/g);
  if (!numberMatches || numberMatches.length === 0) return null;
  const value = parseFloat(numberMatches[numberMatches.length - 1].replace(",", "."));
  return Number.isFinite(value) ? value : null;
}

function extractNetTaxable(text: string): number | null {
  return findAmountNear(text, /net\s+imposable[^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i);
}

function detectArretOuIjss(text: string): boolean {
  return /\bijss\b|indemnit[ée]s?\s+journali[èe]res?|subrogation|arr[êe]t\s+(?:de\s+travail|maladie)/i.test(text);
}

function extractPaidLeave(text: string): PaidLeaveInfo {
  const acquired = findDaysNear(text, /cong[ée]s?\s+pay[ée]s?[^\n\d]{0,40}acquis[^\n\d]{0,15}\d+(?:[.,]\d+)?/i);
  const taken = findDaysNear(text, /cong[ée]s?\s+pay[ée]s?[^\n\d]{0,60}pris[^\n\d]{0,15}\d+(?:[.,]\d+)?/i);
  const balance = findDaysNear(
    text,
    /(?:solde[^\n\d]{0,30}cong[ée]s?\s+pay[ée]s?|cong[ée]s?\s+pay[ée]s?[^\n\d]{0,60}solde)[^\n\d]{0,15}\d+(?:[.,]\d+)?/i
  );
  return { acquired, taken, balance };
}

export function parsePayslip(rawContent: string): PayslipData {
  const text = rawContent.replace(/\u0000/g, "");

  const grossPay =
    findAmountNear(text, /salaire\s+brut[^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    findAmountNear(text, /brut\s*(?:mensuel)?[^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    0;

  const netPay =
    findAmountNear(text, /net\s*(?:à|a)\s*payer[^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    findAmountNear(text, /net\s+pay[ée][^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    findAmountNear(text, /net\s+imposable[^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    0;

  const employeeNameMatch = text.match(/(?:salarié|nom\s*(?:et\s*pr[ée]nom)?|employ[ée])\s*[:\-]?\s*([A-ZÀ-Ü][\wÀ-ÿ'\- ]{2,40})/i);

  return {
    employeeName: employeeNameMatch ? employeeNameMatch[1].trim() : "",
    period: extractPeriod(text),
    grossPay,
    netPay,
    contributions: extractContributions(text),
    collectiveAgreement: extractCollectiveAgreement(text),
    position: extractPosition(text),
    seniorityDate: extractSeniorityDate(text),
    paidLeave: extractPaidLeave(text),
    netTaxable: extractNetTaxable(text),
    mentionsArretOuIjss: detectArretOuIjss(text),
  };
}
