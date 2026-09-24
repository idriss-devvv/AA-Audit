/**
 * Référentiel des valeurs légales utilisées par les contrôles automatiques.
 *
 * Règle du projet : aucune valeur légale n'est ajoutée ici sans source
 * officielle vérifiable (arrêté au Journal officiel, URSSAF, Agirc-Arrco).
 * Une période non couverte par ce fichier désactive le contrôle concerné
 * plutôt que de réutiliser une valeur d'une autre année.
 *
 * Vérifié le 24/09/2026 :
 * - PMSS 2025 : arrêté du 19 décembre 2024 (JORFTEXT000050854392)
 * - PMSS 2026 : arrêté du 22 décembre 2025 (JORFTEXT000053143451)
 * - Taux salariaux URSSAF 2025-2026 : urssaf.fr, taux de cotisations secteur privé
 *   (inchangés entre 2025 et 2026)
 * - Taux Agirc-Arrco 2026 : reglementation.agirc-arrco.fr (répartition
 *   standard 60 % employeur / 40 % salarié, identique en 2025)
 * - SMIC : 11,88 € au 01/11/2024, 12,02 € au 01/01/2026 (décret n° 2025-1228
 *   du 17 décembre 2025), 12,31 € au 01/06/2026 (arrêté du 22 mai 2026)
 */

export const PMSS_BY_YEAR: Record<number, number> = {
  2025: 3925,
  2026: 4005,
};

/** SMIC horaire brut, par date d'entrée en vigueur (ordre chronologique). */
export const SMIC_HOURLY: { from: string; rate: number }[] = [
  { from: "2024-11-01", rate: 11.88 },
  { from: "2026-01-01", rate: 12.02 },
  { from: "2026-06-01", rate: 12.31 },
];

/** Durée mensuelle légale à temps plein (35 h × 52 / 12). */
export const LEGAL_MONTHLY_HOURS = 151.67;

/** SMIC horaire applicable à une période « AAAA-MM », ou null si non couverte. */
export function smicHourlyFor(period: string | null | undefined): number | null {
  if (!period || !/^\d{4}-\d{2}/.test(period)) return null;
  const start = `${period.slice(0, 7)}-01`;
  const applicable = SMIC_HOURLY.filter((s) => s.from <= start);
  return applicable.length > 0 ? applicable[applicable.length - 1].rate : null;
}

export const LEGAL_SOURCES = {
  pmss: "Arrêtés annuels fixant le plafond de la sécurité sociale (Journal officiel)",
  urssaf: "Urssaf — taux de cotisations du secteur privé",
  agircArrco: "Agirc-Arrco — cotisations au régime (répartition standard)",
  heuresSup: "Code du travail, articles L3121-33 et L3121-36",
  mentions: "Code du travail, article R3243-1",
  conges: "Code du travail, article L3141-3",
  smic: "SMIC — décret n° 2025-1228 du 17 décembre 2025 et arrêté du 22 mai 2026",
} as const;

export type ContributionRateReference = {
  id: string;
  label: string;
  /** Le libellé de la ligne doit correspondre à ce motif… */
  match: RegExp;
  /** …et ne pas correspondre à celui-ci. */
  exclude?: RegExp;
  /** Taux salariaux acceptés (plusieurs quand les bulletins regroupent des lignes). */
  employeeRates: number[];
  /** Taux patronaux acceptés — pour reconnaître une ligne lue côté employeur. */
  employerRates: number[];
  source: string;
};

const YEARS_COVERED = [2025, 2026];

/**
 * Taux de référence, du plus spécifique au plus général : la première
 * référence dont le motif correspond au libellé est retenue.
 */
export const CONTRIBUTION_RATE_REFERENCES: ContributionRateReference[] = [
  {
    id: "csg-crds-non-deductible",
    label: "CSG/CRDS non déductible",
    match: /(csg|crds).*(non\s+d[ée]ductible|non\s+imposable|imposable)|\bcrds\b/i,
    employeeRates: [2.9, 2.4, 0.5],
    employerRates: [],
    source: LEGAL_SOURCES.urssaf,
  },
  {
    id: "csg-deductible",
    label: "CSG déductible",
    match: /\bcsg\b.*d[ée]ductible/i,
    employeeRates: [6.8],
    employerRates: [],
    source: LEGAL_SOURCES.urssaf,
  },
  {
    id: "vieillesse-deplafonnee",
    label: "Sécurité sociale déplafonnée (vieillesse)",
    match: /(s[ée]curit[ée]\s+sociale|vieillesse).*(d[ée]plafonn|non\s+plafonn)/i,
    employeeRates: [0.4],
    employerRates: [2.02, 2.11],
    source: LEGAL_SOURCES.urssaf,
  },
  {
    id: "vieillesse-plafonnee",
    label: "Sécurité sociale plafonnée (vieillesse)",
    match: /(s[ée]curit[ée]\s+sociale|vieillesse).*plafonn/i,
    exclude: /d[ée]plafonn|non\s+plafonn/i,
    employeeRates: [6.9],
    employerRates: [8.55],
    source: LEGAL_SOURCES.urssaf,
  },
  {
    id: "ceg",
    label: "Contribution d'équilibre général (CEG)",
    match: /\bceg\b|[ée]quilibre\s+g[ée]n[ée]ral/i,
    employeeRates: [0.86, 1.08],
    employerRates: [1.29, 1.62],
    source: LEGAL_SOURCES.agircArrco,
  },
  {
    id: "cet",
    label: "Contribution d'équilibre technique (CET)",
    match: /\bcet\b|[ée]quilibre\s+technique/i,
    employeeRates: [0.14],
    employerRates: [0.21],
    source: LEGAL_SOURCES.agircArrco,
  },
  {
    // Les bulletins simplifiés regroupent souvent retraite + CEG (+ CET) sur
    // une seule ligne « Complémentaire Tranche 1 » : 3,15 / 4,01 / 4,15 %.
    id: "retraite-complementaire-t1",
    label: "Retraite complémentaire Tranche 1",
    match: /(compl[ée]mentaire|agirc|arrco).*(tranche\s*(1|a|un)\b|\bt\s*1\b)/i,
    employeeRates: [3.15, 4.01, 4.15],
    employerRates: [4.72, 6.01, 6.22],
    source: LEGAL_SOURCES.agircArrco,
  },
  {
    id: "retraite-complementaire-t2",
    label: "Retraite complémentaire Tranche 2",
    match: /(compl[ée]mentaire|agirc|arrco).*(tranche\s*(2|b|deux)\b|\bt\s*2\b)/i,
    employeeRates: [8.64, 9.72, 9.86],
    employerRates: [12.95, 14.57, 14.78],
    source: LEGAL_SOURCES.agircArrco,
  },
];

export function yearOfPeriod(period: string | null | undefined): number | null {
  const year = period ? parseInt(period.slice(0, 4), 10) : NaN;
  return Number.isFinite(year) ? year : null;
}

export function isYearCovered(year: number | null): year is number {
  return year !== null && YEARS_COVERED.includes(year);
}

export function findContributionReference(label: string): ContributionRateReference | null {
  return (
    CONTRIBUTION_RATE_REFERENCES.find(
      (ref) => ref.match.test(label) && !(ref.exclude && ref.exclude.test(label))
    ) ?? null
  );
}
