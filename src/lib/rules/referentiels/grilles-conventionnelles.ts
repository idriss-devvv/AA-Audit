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
 * - registre aligné sur les 20 conventions du cahier des charges V1 ;
 * - branches sans grille nationale (salaires minima fixés par accords
 *   régionaux) : Bâtiment ouvriers (1596, 1597), Bâtiment ETAM (2609),
 *   Travaux publics ouvriers (1702) et ETAM (2614). Pour elles, le champ
 *   manuel « Salaire minimum conventionnel » des Paramètres s'applique.
 * Le détail sourcé de chaque grille (historique, variantes, ancienneté) est
 * dans les tables cc_* (migrations 20260927140001… et 20260928130001…).
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
  /** Diviseur d'un minimum annuel pour obtenir un mensuel (12, 13 ou 14 mensualités). */
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
    idcc: "1351",
    label: "Prévention et sécurité — accord triennal du 25 septembre 2023, grille au 1er janvier 2026 (étendu)",
    effectiveFrom: "2026-01-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000049067287",
    annualDivisor: 12,
    levels: [
      ...[
        [120, 1883.85], [130, 1908.54], [140, 1965.78], [150, 2039.33], [160, 2152.09], [175, 2327.04], [190, 2502.06], [210, 2735.99], [230, 2969.36], [250, 3202.76],
      ].map(([coef, amount]) => ({ code: `EMP-${coef}`, amount, unit: "mensuel" as const })),
      ...[
        [150, 2234.3], [160, 2357.77], [170, 2480.93], [185, 2666.29], [200, 2851.2], [215, 3036.16], [235, 3282.88], [255, 3529.58], [275, 3776.29],
      ].map(([coef, amount]) => ({ code: `AM-${coef}`, amount, unit: "mensuel" as const })),
      ...[
        [300, 2968.47], [400, 3756.63], [470, 4307.92], [530, 4780.86], [620, 5489.93], [800, 6908.48],
      ].map(([coef, amount]) => ({ code: `CAD-${coef}`, amount, unit: "mensuel" as const })),
    ],
    // Les coefficients 150 et 160 existent chez les agents d'exploitation et chez les agents de maîtrise.
    levelCode: (c) => {
      const coef = coefficient(c);
      if (coef === null) return null;
      if (coef >= 300) return `CAD-${coef}`;
      return /MAITRISE|\bAM\b/.test(normalize(c)) ? `AM-${coef}` : `EMP-${coef}`;
    },
  },
  {
    idcc: "1517",
    label: "Commerces de détail non alimentaires — avenant n° 15 du 6 février 2026 (étendu)",
    effectiveFrom: "2026-06-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054303837",
    annualDivisor: 12,
    levels: [1829, 1838, 1843, 1867, 1967, 2146, 2741, 3583, 4034].map((amount, i) => ({ code: `N${i + 1}`, amount, unit: "mensuel" as const })),
    levelCode: (c) => {
      const n = niveauEchelon(c);
      return n && n.level <= 9 ? `N${n.level}` : null;
    },
  },
  {
    idcc: "1996",
    label: "Pharmacie d'officine — accord du 19 janvier 2026 relatif aux salaires (étendu)",
    effectiveFrom: "2026-04-18",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054162007",
    annualDivisor: 12,
    levels: [
      [100, 1824], [115, 1834.42], [125, 1841.36], [130, 1844.84], [135, 1848.31], [140, 1851.78], [145, 1855.25], [150, 1858.73],
      [155, 1862.2], [160, 1865.67], [165, 1869.14], [170, 1872.62], [175, 1876.09], [190, 1886.51], [200, 1893.45], [220, 1907.34],
      [225, 1910.81], [230, 1914.29], [240, 1921.23], [250, 2001.29], [260, 2081.34], [270, 2161.39], [280, 2241.44], [290, 2321.49],
      [300, 2401.54], [310, 2481.59], [320, 2561.65], [330, 2641.7], [340, 2721.75], [350, 2801.8], [400, 3202.06], [430, 3442.21],
      [470, 3762.42], [500, 4002.57], [520, 4162.67], [530, 4242.73], [540, 4322.78], [550, 4402.83], [600, 4803.09], [800, 6404.11],
    ].map(([coef, amount]) => ({ code: `COEF-${coef}`, amount, unit: "mensuel" as const })),
    levelCode: (c) => {
      const coef = coefficient(c);
      return coef === null ? null : `COEF-${coef}`;
    },
  },
  {
    idcc: "176",
    label: "Industrie pharmaceutique — accord du 13 novembre 2025, salaires minima au 1er janvier 2026 (étendu)",
    effectiveFrom: "2026-01-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000053721378",
    annualDivisor: 12,
    // Barème à l'embauche (le plus bas) ; une case « 1A/1B » couvre les deux libellés.
    levels: [
      ["1A/1B", 1837.34], ["1C/2A", 1856.06], ["2B", 1893.51], ["2C/3A", 1977.76], ["3B", 2024.57], ["3C/4A", 2193.07], ["4B", 2267.96],
      ["4C/5A", 2483.27], ["5B", 2586.24], ["5C/6A", 2867.08], ["6B", 2998.14], ["6C", 3344.51], ["7A", 3475.57], ["7B", 4065.33],
      ["8A", 4196.39], ["8B", 4898.49], ["9A", 5029.55], ["9B", 5862.7], ["10", 6386.93], ["11", 6911.17],
    ].flatMap(([codes, amount]) => (codes as string).split("/").map((code) => ({ code, amount: amount as number, unit: "mensuel" as const }))),
    levelCode: (c) => {
      const match = normalize(c).match(/GROUPE\s*(\d{1,2})\s*(?:NIVEAU\s*)?([A-C])?\b/);
      if (!match) return null;
      const group = parseInt(match[1], 10);
      if (group >= 10) return String(group);
      return match[2] ? `${group}${match[2]}` : null;
    },
  },
  {
    idcc: "1672",
    label: "Sociétés d'assurances — protocole du 10 juin 2026, RMA 2026 (non étendu), minima annuels",
    effectiveFrom: "2026-01-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054887698",
    // Structure de référence : 12 mensualités + 13e mois + prime de vacances (50 %) ; contrôle mensuel indicatif sur 14.
    annualDivisor: 14,
    levels: [22680, 24120, 25580, 30140, 35430, 45030, 60940].map((amount, i) => ({ code: `CLASSE-${i + 1}`, amount, unit: "annuel" as const })),
    levelCode: (c) => {
      const match = normalize(c).match(/CLASSE\s*([1-7]|[IV]+)\b/);
      if (!match) return null;
      const n = /^\d$/.test(match[1]) ? parseInt(match[1], 10) : ROMAN[match[1]];
      return n && n <= 7 ? `CLASSE-${n}` : null;
    },
  },
  {
    idcc: "2420",
    label: "Bâtiment cadres — avenant n° 75 du 25 janvier 2023, appointements minimaux (non étendu), base 39 h",
    effectiveFrom: "2023-02-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000047416384",
    annualDivisor: 12,
    // Appointements mensuels pour 169 h, convertis en taux horaire pour la proratisation.
    levels: [
      [60, 2212], [65, 2396], [70, 2573], [75, 2680], [80, 2853], [85, 3004], [90, 3150], [95, 3293], [100, 3404], [103, 3477], [108, 3607], [120, 3944], [130, 4198], [162, 5208],
    ].map(([coef, amount]) => ({ code: `COEF-${coef}`, amount: Math.floor((amount / 169) * 10000) / 10000, unit: "horaire" as const })),
    levelCode: (c) => {
      const coef = coefficient(c);
      return coef === null ? null : `COEF-${coef}`;
    },
  },
  {
    idcc: "16",
    label: "Transports routiers — ouvriers voyageurs (avenant n° 120, 01/01/2026) et barèmes marchandises (accord du 11 octobre 2023)",
    effectiveFrom: "2026-01-01",
    source: "https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000053914012",
    annualDivisor: 12,
    // Barèmes à l'embauche ; employés, TAM et cadres : barème marchandises (le plus bas des deux secteurs).
    levels: [
      ...[
        [110, 1884.8], [115, 1884.8], [120, 1884.8], [123, 1884.8], [128, 1884.8], [131, 1913.45], [136, 1929.86],
        [137, 1936.02], [138, 1989.86], [140, 2004.41], [142, 2024.46], [145, 2045.88], [150, 2095.58], [155, 2200.6],
      ].map(([coef, amount]) => ({ code: `${coef}V`, amount, unit: "mensuel" as const })),
      ...[
        [110, 12.09], [115, 12.09], [118, 12.09], [120, 12.09], [128, 12.12], [138, 12.14], [150, 12.43],
      ].map(([coef, amount]) => ({ code: `${coef}M`, amount, unit: "horaire" as const })),
      ...[
        [105, 12.09], [110, 12.09], [115, 12.09], [120, 12.09], [125, 12.1], [132.5, 12.12], [140, 12.15], [148.5, 12.43],
      ].map(([coef, amount]) => ({ code: `EMP-${coef}`, amount, unit: "horaire" as const })),
      ...[
        [150, 12.6], [157.5, 12.73], [165, 13.34], [175, 14.17], [185, 14.94], [200, 16.17], [215, 17.37], [225, 18.21],
      ].map(([coef, amount]) => ({ code: `TAM-${coef}`, amount, unit: "horaire" as const })),
      ...[
        [100, 2621.8], [106.5, 2791.96], [113, 2962.15], [119, 3119.15], [132, 3459.5], [145, 3799.85],
      ].map(([coef, amount]) => ({ code: `IC-${coef}`, amount, unit: "mensuel" as const })),
    ],
    levelCode: (c) => {
      const t = normalize(c);
      const ouvrier = t.match(/\b(\d{3})\s*([VM])\b/);
      if (ouvrier) return `${ouvrier[1]}${ouvrier[2]}`;
      const coef = t.match(/COEF(?:FICIENT)?\.?\s*[:\-]?\s*(\d{2,3}(?:[.,]5)?)\b/);
      if (!coef) return null;
      const value = parseFloat(coef[1].replace(",", "."));
      if (/CADRE|INGENIEUR/.test(t)) return `IC-${value}`;
      if (/TECHNICIEN|MAITRISE|\bTAM\b/.test(t)) return `TAM-${value}`;
      return /EMPLOYE/.test(t) ? `EMP-${value}` : null;
    },
  },
];

export function findConventionGrid(idcc: string | null | undefined): ConventionGrid | null {
  if (!idcc) return null;
  const normalized = String(parseInt(idcc, 10));
  return CONVENTION_GRIDS.find((grid) => grid.idcc === normalized) ?? null;
}
