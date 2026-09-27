/**
 * Grilles de salaires minimaux conventionnels (branches du registre
 * `collective_agreements`), relevées sur Légifrance le 24/09/2026 à partir du
 * dernier avenant « salaires » étendu de chaque convention.
 *
 * Principes :
 * - chaque grille est datée (`effectiveFrom`) : une fiche antérieure à cette
 *   date n'est pas contrôlée (l'ancienne grille n'est pas conservée ici) ;
 * - quand une convention prévoit plusieurs minima pour un même niveau
 *   (ancienneté, forfait, colonne A/B), on retient le plus bas, pour ne jamais
 *   signaler à tort un salaire conforme ;
 * - branches non intégrées (grilles régionales, par activité ou texte
 *   ambigu) : Bâtiment (1596, 1597, 2609), Transports routiers (16),
 *   Experts-comptables (787), Enseignement privé (3211). Pour elles, le
 *   champ manuel « Salaire minimum conventionnel » des Paramètres s'applique.
 */

export type GridUnit = "mensuel" | "horaire" | "annuel";

export type GridLevel = {
  /** Code normalisé du niveau, ex. « ETAM-310 », « C5 », « IV-2 ». */
  code: string;
  amount: number;
  unit: GridUnit;
};

export type ConventionGrid = {
  idcc: string;
  label: string;
  effectiveFrom: string; // AAAA-MM-JJ
  source: string;
  /** Diviseur d'un minimum annuel pour obtenir un mensuel (12 ou 13 mois). */
  annualDivisor: number;
  levels: GridLevel[];
  /** Déduit le code du niveau à partir de la classification lue sur la fiche. */
  levelCode: (classification: string) => string | null;
};

// ---------------------------------------------------------------------------
// Lecture des classifications
// ---------------------------------------------------------------------------

const ROMAN: Record<string, number> = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8, IX: 9, X: 10 };

function normalize(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toUpperCase();
}

function coefficient(text: string): number | null {
  const match = normalize(text).match(/COEF(?:FICIENT)?\.?\s*[:\-]?\s*(\d{2,3})\b/);
  return match ? parseInt(match[1], 10) : null;
}

/** « Niveau IV échelon 2 », « Niv. 3 Ech. B », « Niveau 4B » → { level: 4, step: "2" | "B" }. */
function niveauEchelon(text: string): { level: number; step: string | null } | null {
  const t = normalize(text);
  const match = t.match(/NIV(?:EAU)?\.?\s*([IVX]+|\d{1,2})\s*([A-D])?\b(?:[^A-Z0-9]{0,6}ECH(?:ELON)?\.?\s*(\d|[A-D])\b)?/);
  if (!match) return null;
  const level = /^\d+$/.test(match[1]) ? parseInt(match[1], 10) : ROMAN[match[1]] ?? null;
  if (!level) return null;
  return { level, step: match[3] ?? match[2] ?? null };
}

function toRoman(n: number): string {
  return Object.entries(ROMAN).find(([, v]) => v === n)?.[0] ?? String(n);
}

// ---------------------------------------------------------------------------
// Grilles
// ---------------------------------------------------------------------------

export const CONVENTION_GRIDS: ConventionGrid[] = [
  {
    idcc: "1486",
    label: "Syntec — accord du 26 juin 2024 relatif aux salaires minimaux (étendu, JORF 27/11/2024)",
    effectiveFrom: "2025-01-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000050228699",
    annualDivisor: 12,
    levels: [
      ...[
        [240, 1815], [250, 1845], [275, 1875], [310, 1905], [355, 2045], [400, 2185], [450, 2340], [500, 2490],
      ].map(([coef, amount]) => ({ code: `ETAM-${coef}`, amount, unit: "mensuel" as const })),
      ...[
        [95, 2135], [100, 2240], [105, 2315], [115, 2530], [130, 2850], [150, 3275], [170, 3650], [210, 4495], [270, 5755],
      ].map(([coef, amount]) => ({ code: `IC-${coef}`, amount, unit: "mensuel" as const })),
    ],
    // Les coefficients ETAM (240-500) et cadres (95-270) ne se recouvrent pas.
    levelCode: (c) => {
      const coef = coefficient(c);
      if (coef === null) return null;
      return coef >= 240 ? `ETAM-${coef}` : `IC-${coef}`;
    },
  },
  {
    idcc: "3248",
    label: "Métallurgie — avenant du 20 février 2026 relatif aux salaires minima hiérarchiques (étendu)",
    effectiveFrom: "2026-01-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054254725",
    annualDivisor: 12,
    // Barème 35 h (le plus bas) ; classes 11 et 12 : barème « moins de 2 ans » du groupe F.
    levels: [
      21980, 22100, 22710, 23620, 24510, 25780, 26680, 28700, 30760, 33970, 28430, 29940, 40350, 44250, 47380, 52370, 59720, 68450,
    ].map((amount, i) => ({ code: `CLASSE-${i + 1}`, amount, unit: "annuel" as const })),
    levelCode: (c) => {
      const t = normalize(c);
      const match = t.match(/CLASSE\s*(?:D'?EMPLOI\s*)?[A-I]?\s*(\d{1,2})\b/) ?? t.match(/\b[A-I]\s?(\d{1,2})\b/);
      return match ? `CLASSE-${parseInt(match[1], 10)}` : null;
    },
  },
  {
    idcc: "573",
    label: "Commerces de gros — accord du 17 mars 2026 relatif aux salaires (étendu, JORF 27/06/2026)",
    effectiveFrom: "2026-03-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054454077",
    annualDivisor: 12,
    // Niveaux I à VI : minima mensuels ; cadres VII à X : minima annuels.
    levels: [
      ...[
        [1839.81, 1850.85, 1861.96], [1873.13, 1884.37, 1895.67], [1907.05, 1918.49, 1930.0],
        [1941.58, 1953.23, 1964.95], [1973.03, 2047.02, 2123.78], [2203.43, 2286.05, 2371.78],
      ].flatMap((steps, i) => steps.map((amount, j) => ({ code: `${toRoman(i + 1)}-${j + 1}`, amount, unit: "mensuel" as const }))),
      ...[
        [30338.3, 31855.22, 33447.98], [38709.35, 42580.28, 46838.31], [51522.14, 56674.36], [65175.51, 78210.61],
      ].flatMap((steps, i) => steps.map((amount, j) => ({ code: `${toRoman(i + 7)}-${j + 1}`, amount, unit: "annuel" as const }))),
    ],
    levelCode: (c) => {
      const n = niveauEchelon(c);
      return n && n.step ? `${toRoman(n.level)}-${n.step}` : null;
    },
  },
  {
    idcc: "1979",
    label: "Hôtels, cafés, restaurants — avenant n° 33 du 19 juin 2024 relatif aux salaires (étendu, JORF 09/11/2024)",
    effectiveFrom: "2024-12-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000050394790",
    annualDivisor: 12,
    levels: [
      [12.0, 12.08, 12.18], [12.28, 12.55, 13.17], [13.32, 13.54, 14.0], [14.4, 14.77, 15.4], [18.43, 21.78, 28.12],
    ].flatMap((steps, i) => steps.map((amount, j) => ({ code: `${toRoman(i + 1)}-${j + 1}`, amount, unit: "horaire" as const }))),
    levelCode: (c) => {
      const n = niveauEchelon(c);
      return n && n.step ? `${toRoman(n.level)}-${n.step}` : null;
    },
  },
  {
    idcc: "1501",
    label: "Restauration rapide — avenant n° 72 du 5 juin 2025 relatif aux minima conventionnels (étendu, JORF 07/08/2025)",
    effectiveFrom: "2025-09-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000052133132",
    annualDivisor: 12,
    levels: [
      { code: "I-A", amount: 11.88, unit: "horaire" },
      { code: "I-B", amount: 11.9, unit: "horaire" },
      { code: "II-A", amount: 12.22, unit: "horaire" },
      { code: "II-B", amount: 12.45, unit: "horaire" },
      { code: "III-A", amount: 12.82, unit: "horaire" },
      { code: "III-B", amount: 12.93, unit: "horaire" },
      { code: "III-C", amount: 13.98, unit: "horaire" },
      { code: "IV-A", amount: 15.01, unit: "horaire" },
      { code: "IV-B", amount: 15.43, unit: "horaire" },
      { code: "IV-C", amount: 16.05, unit: "horaire" },
      { code: "IV-D", amount: 17.34, unit: "horaire" },
      { code: "V-A", amount: 44645.78, unit: "annuel" },
      { code: "V-B", amount: 46032.71, unit: "annuel" },
      { code: "V-C", amount: 72408.11, unit: "annuel" },
    ],
    levelCode: (c) => {
      const n = niveauEchelon(c);
      return n && n.step ? `${toRoman(n.level)}-${n.step}` : null;
    },
  },
  {
    idcc: "2216",
    label: "Commerce à prédominance alimentaire — avenant n° 99 du 17 avril 2026 (étendu, JORF 10/07/2026)",
    effectiveFrom: "2026-08-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054434579",
    annualDivisor: 12,
    // Salaire mensuel minimum garanti (pauses payées incluses), et non le taux de base.
    levels: [
      ["1A", 1914.19], ["1B", 1915.78], ["2A", 1917.37], ["2B", 1931.7], ["3A", 1933.3], ["3B", 1950.81],
      ["4A", 1954.0], ["4B", 2054.33], ["5", 2167.03], ["6", 2290.67], ["7", 2973.57], ["8", 3996.47],
    ].map(([code, amount]) => ({ code: code as string, amount: amount as number, unit: "mensuel" as const })),
    levelCode: (c) => {
      const n = niveauEchelon(c);
      if (!n) return null;
      return n.level <= 4 && n.step ? `${n.level}${n.step}` : String(n.level);
    },
  },
  {
    idcc: "1090",
    label: "Services de l'automobile — avenant n° 110 du 22 janvier 2026 relatif aux salaires minima (étendu, JORF 16/04/2026)",
    effectiveFrom: "2026-05-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054161858",
    annualDivisor: 12,
    levels: [
      ...[1853, 1870, 1888, 1912, 1929, 1965, 1999, 2045, 2106, 2153, 2205, 2259].map((amount, i) => ({
        code: `ECH-${i + 1}`,
        amount,
        unit: "mensuel" as const,
      })),
      ...[2241, 2249, 2255, 2259, 2324, 2400, 2541, 2685, 2831].map((amount, i) => ({
        code: `ECH-${i + 17}`,
        amount,
        unit: "mensuel" as const,
      })),
      ...[
        ["I-A", 2541], ["I-B", 2685], ["I-C", 2831], ["II-A", 2978], ["II-B", 3267], ["II-C", 3560],
        ["III-A", 3852], ["III-B", 4144], ["III-C", 4438], ["IV-A", 4731], ["IV-B", 5022], ["IV-C", 5316], ["V", 5904],
      ].map(([code, amount]) => ({ code: `CADRE-${code}`, amount: amount as number, unit: "mensuel" as const })),
    ],
    levelCode: (c) => {
      const t = normalize(c);
      const cadre = t.match(/(?:CADRE|DEGRE)\s*([IV]+)\s*-?\s*([A-C])?\b/);
      if (cadre) return `CADRE-${cadre[1]}${cadre[2] ? `-${cadre[2]}` : ""}`;
      const echelon = t.match(/ECH(?:ELON)?\.?\s*(\d{1,2})\b/);
      return echelon ? `ECH-${parseInt(echelon[1], 10)}` : null;
    },
  },
  {
    idcc: "1527",
    label: "Immobilier — avenant n° 110 du 4 mars 2026 (étendu, JORF 10/05/2026), minima annuels sur 13 mois",
    effectiveFrom: "2026-04-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054303854",
    annualDivisor: 13,
    levels: [
      ["E1", 23700], ["E2", 24428], ["E3", 25080], ["AM1", 25569], ["AM2", 26415],
      ["C1", 28333], ["C2", 36932], ["C3", 44221], ["C4", 49800],
    ].map(([code, amount]) => ({ code: code as string, amount: amount as number, unit: "annuel" as const })),
    levelCode: (c) => {
      const match = normalize(c).match(/\b(E[1-3]|AM[12]|C[1-4])\b/);
      return match ? match[1] : null;
    },
  },
  {
    idcc: "3043",
    label: "Propreté — avenant n° 27 du 18 décembre 2025 (étendu, JORF 05/03/2026)",
    effectiveFrom: "2026-04-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000053748392",
    annualDivisor: 12,
    // Colonne A (la plus basse) pour les niveaux qui en ont deux.
    levels: [
      ...[
        ["ASP", 12.52], ["ASC", 12.57], ["ASCS", 12.64], ["AQS1", 12.7], ["AQS2", 12.81], ["AQS3", 12.92],
        ["ATQS1", 13.17], ["ATQS2", 13.91], ["ATQS3", 14.95], ["CE1", 14.43], ["CE2", 15.27], ["CE3", 15.44],
        ["MP1", 15.52], ["MP2", 16.39], ["MP3", 18.18], ["MP4", 20.25], ["MP5", 21.9],
        ["EA1", 12.63], ["EA2", 13.54], ["EA3", 14.89], ["EA4", 16.29], ["MA1", 18.11], ["MA2", 20.56], ["MA3", 21.68],
      ].map(([code, amount]) => ({ code: code as string, amount: amount as number, unit: "horaire" as const })),
      ...[
        ["CA1", 3279.71], ["CA2", 3868.89], ["CA3", 4323.69], ["CA4", 4998.1], ["CA5", 5304.54], ["CA6", 5795.71],
      ].map(([code, amount]) => ({ code: code as string, amount: amount as number, unit: "mensuel" as const })),
    ],
    levelCode: (c) => {
      const match = normalize(c).match(/\b(ASCS|ASP|ASC|ATQS\s?[1-3]|AQS\s?[1-3]|CE\s?[1-3]|MP\s?[1-5]|EA\s?[1-4]|MA\s?[1-3]|CA\s?[1-6])\b/);
      return match ? match[1].replace(/\s/g, "") : null;
    },
  },
  {
    idcc: "2120",
    label: "Banque — accord du 16 avril 2026 relatif aux salaires (étendu, JORF 27/06/2026), minima annuels",
    effectiveFrom: "2026-04-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054802084",
    // Salaire de base versé en 13 mensualités.
    annualDivisor: 13,
    // Minimum à l'embauche (le plus bas de chaque niveau, quelle que soit l'ancienneté).
    levels: [
      ["A", 23387], ["B", 23387], ["C", 23387], ["D", 23387], ["E", 24240], ["F", 26272],
      ["G", 28929], ["H", 31801], ["I", 38734], ["J", 46764], ["K", 55641],
    ].map(([code, amount]) => ({ code: code as string, amount: amount as number, unit: "annuel" as const })),
    levelCode: (c) => {
      const match = normalize(c).match(/NIV(?:EAU)?\.?\s*([A-K])\b/);
      return match ? match[1] : null;
    },
  },
  {
    idcc: "843",
    label: "Boulangerie-pâtisserie artisanale — avenant n° 139 du 14 janvier 2026 relatif aux salaires (étendu, JORF 17/04/2026)",
    effectiveFrom: "2026-01-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054066505",
    annualDivisor: 12,
    levels: [
      [155, 12.41], [160, 12.53], [165, 12.66], [170, 12.78], [175, 12.91], [180, 13.03], [185, 13.31], [190, 13.43], [195, 13.54], [240, 14.59],
    ].map(([coef, amount]) => ({ code: `COEF-${coef}`, amount, unit: "horaire" as const })),
    levelCode: (c) => {
      const coef = coefficient(c);
      return coef === null ? null : `COEF-${coef}`;
    },
  },
];

export function findConventionGrid(idcc: string | null | undefined): ConventionGrid | null {
  if (!idcc) return null;
  const normalized = String(parseInt(idcc, 10));
  return CONVENTION_GRIDS.find((grid) => grid.idcc === normalized) ?? null;
}
