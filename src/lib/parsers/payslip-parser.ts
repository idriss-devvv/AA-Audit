import type {
  ContributionLine,
  MandatoryMentionKey,
  OvertimeLine,
  PaidLeaveInfo,
  PayslipData,
} from "@/types/payslip";

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
  const contributions: { label: string; amount: number }[] = [];

  for (const line of text.split(/\r?\n/)) {
    if (!CONTRIBUTION_LINE.test(line) || /^\s*total/i.test(line)) continue;
    const numbers = decimalsInLine(line);
    if (numbers.length === 0) continue;

    // Quand la ligne détaille base × taux = montant, le montant est celui du
    // triplet (et non la base, qui apparaît en premier).
    const amount = findRateTriple(numbers)?.amount ?? numbers[0];
    const label = labelOf(line);
    if (!label) continue;

    contributions.push({ label, amount });
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
  const fromLine = (keyword: RegExp): number | null => {
    for (const line of text.split(/\r?\n/)) {
      if (!/cong[ée]s|\bcp\b/i.test(line)) continue;
      const match = line.match(new RegExp(`${keyword.source}[^\\n\\d]{0,15}(\\d+(?:[.,]\\d+)?)`, "i"));
      if (match) return parseFloat(match[1].replace(",", "."));
    }
    return null;
  };

  return {
    acquired: acquired ?? fromLine(/\bacquis\b/),
    taken: taken ?? fromLine(/\bpris\b/),
    balance: balance ?? fromLine(/\bsolde\b/),
  };
}


// ---------------------------------------------------------------------------
// Extraction structurée ligne à ligne (bases, taux, montants) pour les
// contrôles légaux. Tout est best-effort : un champ non reconnu reste null /
// absent, et les règles correspondantes restent silencieuses plutôt que de
// produire un faux positif.
// ---------------------------------------------------------------------------

const DECIMAL_TOKEN = /\d{1,3}(?:[   .]\d{3})+,\d+|\d+,\d+|\d+\.\d+/g;

function parseDecimalToken(token: string): number {
  const compact = token.replace(/[   ]/g, "");
  const normalized = compact.includes(",") ? compact.replace(/\./g, "").replace(",", ".") : compact;
  const value = parseFloat(normalized);
  return Number.isFinite(value) ? value : NaN;
}

function decimalsInLine(line: string): number[] {
  return (line.match(DECIMAL_TOKEN) ?? []).map(parseDecimalToken).filter((n) => Number.isFinite(n));
}

function labelOf(line: string): string {
  const first = line.search(new RegExp(DECIMAL_TOKEN.source));
  return (first > 0 ? line.slice(0, first) : line).trim().replace(/\s{2,}/g, " ");
}

function closeTo(expected: number, actual: number): boolean {
  return Math.abs(expected - actual) <= Math.max(0.02, Math.abs(actual) * 0.002);
}

/** Cherche trois nombres consécutifs tels que base × taux % = montant. */
function findRateTriple(numbers: number[]): { base: number; rate: number; amount: number } | null {
  for (let i = 0; i + 2 < numbers.length; i++) {
    const [base, rate, amount] = [numbers[i], numbers[i + 1], numbers[i + 2]];
    if (base > 0 && rate > 0 && rate < 100 && closeTo((base * rate) / 100, amount)) {
      return { base, rate, amount };
    }
  }
  return null;
}

/** Cherche trois nombres consécutifs tels que quantité × prix unitaire = montant. */
function findQuantityTriple(numbers: number[]): { quantity: number; unit: number; amount: number } | null {
  for (let i = 0; i + 2 < numbers.length; i++) {
    const [quantity, unit, amount] = [numbers[i], numbers[i + 1], numbers[i + 2]];
    if (quantity > 0 && unit > 0 && closeTo(quantity * unit, amount)) {
      return { quantity, unit, amount };
    }
  }
  return null;
}

const CONTRIBUTION_LINE =
  /cotisation|s[ée]curit[ée] sociale|retraite|urssaf|mutuelle|pr[ée]voyance|ch[ôo]mage|accident|maladie|vieillesse|allocations?\s+familiales|csg|crds|at\s*\/\s*mp|compl[ée]mentaire|tranche|\bceg\b|\bcet\b|agirc|arrco|plafonn/i;

function extractContributionLines(lines: string[]): ContributionLine[] {
  const result: ContributionLine[] = [];
  for (const line of lines) {
    if (!CONTRIBUTION_LINE.test(line) || /^\s*total/i.test(line)) continue;
    const triple = findRateTriple(decimalsInLine(line));
    if (!triple) continue;
    result.push({ label: labelOf(line), base: triple.base, ratePercent: triple.rate, amount: triple.amount });
  }
  return result.slice(0, 40);
}

function extractBaseHourlyRate(lines: string[]): number | null {
  for (const line of lines) {
    if (!/salaire\s+de\s+base|taux\s+horaire/i.test(line)) continue;
    const triple = findQuantityTriple(decimalsInLine(line));
    if (triple) return triple.unit;
  }
  return null;
}

function extractOvertime(lines: string[], baseHourlyRate: number | null): OvertimeLine[] {
  const result: OvertimeLine[] = [];
  for (const line of lines) {
    if (!/heures?\s+suppl|heures?\s+sup\b|\bh\.?\s*sup\b/i.test(line)) continue;
    const percentInLabel = line.match(/(\d{1,3}(?:[.,]\d+)?)\s*%/);
    const triple = findQuantityTriple(decimalsInLine(line));

    let majorationPercent: number | null = percentInLabel
      ? parseFloat(percentInLabel[1].replace(",", "."))
      : null;
    if (majorationPercent === null && triple && baseHourlyRate) {
      const ratio = triple.unit / baseHourlyRate;
      // Certains bulletins détaillent la majoration seule (ratio < 1),
      // d'autres le taux horaire majoré complet (ratio > 1).
      majorationPercent = Math.round((ratio < 1 ? ratio : ratio - 1) * 1000) / 10;
    }

    result.push({
      label: labelOf(line),
      hours: triple?.quantity ?? null,
      majorationPercent,
      amount: triple?.amount ?? null,
    });
  }
  return result.slice(0, 10);
}

function firstDecimalOnMatchingLine(lines: string[], pattern: RegExp, exclude?: RegExp): number | null {
  for (const line of lines) {
    if (!pattern.test(line) || (exclude && exclude.test(line))) continue;
    const numbers = decimalsInLine(line.slice(line.search(pattern)));
    if (numbers.length > 0) return numbers[0];
  }
  return null;
}

function lastDecimalOnMatchingLine(lines: string[], pattern: RegExp): number | null {
  for (const line of lines) {
    if (!pattern.test(line)) continue;
    const numbers = decimalsInLine(line);
    if (numbers.length > 0) return numbers[numbers.length - 1];
  }
  return null;
}

function extractIdcc(text: string): string | null {
  const match = text.match(/\bidcc\s*(?:n[°o]\s*)?[:\-]?\s*(\d{1,4})\b/i);
  return match ? String(parseInt(match[1], 10)) : null;
}

const MANDATORY_MENTION_PATTERNS: Record<MandatoryMentionKey, RegExp> = {
  employeur: /employeur|soci[ée]t[ée]|raison\s+sociale|\bsarl\b|\bsas\b|\bsa\b|\beurl\b/i,
  siret: /\bsiret\b|\bsiren\b/i,
  codeApe: /\bape\b|\bnaf\b/i,
  conventionCollective: /convention\s+collective|\bidcc\b/i,
  emploi: /emploi|poste|fonction|qualification/i,
  classification: /classification|coefficient|niveau|[ée]chelon|cat[ée]gorie|position/i,
  periode: /p[ée]riode|du\s+\d{1,2}[\/.]\d{1,2}[\/.]\d{2,4}\s+au/i,
  heures: /heures|horaire|temps\s+de\s+travail|forfait\s+jours?/i,
  netAPayer: /net\s+(?:(?:à|a)\s+payer|pay[ée])/i,
  datePaiement: /date\s+de\s+paiement|pay[ée]\s+le|vers[ée]\s+le|date\s+de\s+versement|virement\s+du/i,
  netImposable: /net\s+imposable|imp[ôo]t\s+sur\s+le\s+revenu|pr[ée]l[èe]vement\s+(?:à|a)\s+la\s+source/i,
  netSocial: /net\s+social/i,
  totalCotisations: /total\s+(?:des\s+)?cotisations/i,
  congesPayes: /cong[ée]s/i,
  mentionConservation: /conservez\s+ce\s+bulletin|sans\s+limitation\s+de\s+dur[ée]e/i,
};

function detectMandatoryMentions(text: string): Partial<Record<MandatoryMentionKey, boolean>> {
  const result: Partial<Record<MandatoryMentionKey, boolean>> = {};
  for (const [key, pattern] of Object.entries(MANDATORY_MENTION_PATTERNS) as [MandatoryMentionKey, RegExp][]) {
    result[key] = pattern.test(text);
  }
  return result;
}

const NON_SUBJECT_ITEMS =
  /titres?[- ]restaurant|tickets?[- ]restaurant|frais\s+de\s+transport|transport\s+en\s+commun|remboursement|acompte|avance|avantages?\s+en\s+nature|indemnit[ée]s?\s+non\s+soumises?|non\s+soumis|saisie|pr[êe]t|indemnit[ée]s?\s+kilom[ée]triques?/i;

export function parsePayslip(rawContent: string): PayslipData {
  const text = rawContent.replace(/\u0000/g, "");

  const grossPay =
    findAmountNear(text, /salaire\s+brut[^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    findAmountNear(text, /brut\s*(?:mensuel)?[^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    0;

  const lines = text.split(/\r?\n/);

  // Net à payer réellement versé (après prélèvement à la source) : on écarte
  // explicitement la ligne « net à payer avant impôt ».
  const netPaidLine = firstDecimalOnMatchingLine(lines, /net\s+(?:(?:à|a)\s+payer|pay[ée])/i, /avant/i);

  const netPay =
    netPaidLine ??
    findAmountNear(text, /net\s*(?:à|a)\s*payer[^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    findAmountNear(text, /net\s+pay[ée][^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    findAmountNear(text, /net\s+imposable[^\n\d]{0,40}(\d[\d\s . ]*,\d{2}|\d+[.,]\d{2})/i) ??
    0;

  const baseHourlyRate = extractBaseHourlyRate(lines);

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
    collectiveAgreementIdcc: extractIdcc(text),
    contributionLines: extractContributionLines(lines),
    overtime: extractOvertime(lines, baseHourlyRate),
    baseHourlyRate,
    totalEmployeeContributions: firstDecimalOnMatchingLine(lines, /total\s+(?:des\s+)?cotisations/i),
    netBeforeTax: firstDecimalOnMatchingLine(lines, /net\s+(?:(?:à|a)\s+payer\s+)?avant\s+imp[ôo]t/i),
    incomeTaxWithheld: lastDecimalOnMatchingLine(
      lines,
      /imp[ôo]t\s+sur\s+le\s+revenu\s+pr[ée]lev[ée]|pr[ée]l[èe]vement\s+(?:à|a)\s+la\s+source/i
    ),
    hasNonSubjectItems: NON_SUBJECT_ITEMS.test(text),
    mandatoryMentions: detectMandatoryMentions(text),
  };
}
