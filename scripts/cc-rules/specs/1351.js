const { cite } = require("../gen");
const I = "1351";
const BASE = "KALITEXT000005680914", SAL = "KALITEXT000049067287", NUIT = "KALITEXT000005680940", DIM = "KALITEXT000005680974";
const A4 = "KALITEXT000005680928", A5 = "KALITEXT000005680930", A6 = "KALITEXT000005680932";

// Grilles 2024 / 2025 / 2026 (base mensuelle 151,67 h) — annexes de l'accord triennal.
const GRID = [
  ["EMP-120", "Agent d'exploitation / employé / technicien — niveau 2 échelon 2 (coef. 120)", "employe", "2", "2", 120, 1775.72, 1832.54, 1883.85],
  ["EMP-130", "Agent d'exploitation / employé / technicien — niveau 3 échelon 1 (coef. 130)", "employe", "3", "1", 130, 1798.99, 1856.56, 1908.54],
  ["EMP-140", "Agent d'exploitation / employé / technicien — niveau 3 échelon 2 (coef. 140)", "employe", "3", "2", 140, 1852.95, 1912.24, 1965.78],
  ["EMP-150", "Agent d'exploitation / employé / technicien — niveau 3 échelon 3 (coef. 150)", "employe", "3", "3", 150, 1922.27, 1983.78, 2039.33],
  ["EMP-160", "Agent d'exploitation / employé / technicien — niveau 4 échelon 1 (coef. 160)", "technicien", "4", "1", 160, 2028.56, 2093.47, 2152.09],
  ["EMP-175", "Agent d'exploitation / employé / technicien — niveau 4 échelon 2 (coef. 175)", "technicien", "4", "2", 175, 2193.47, 2263.66, 2327.04],
  ["EMP-190", "Agent d'exploitation / employé / technicien — niveau 4 échelon 3 (coef. 190)", "technicien", "4", "3", 190, 2358.44, 2433.91, 2502.06],
  ["EMP-210", "Agent d'exploitation / employé / technicien — niveau 5 échelon 1 (coef. 210)", "technicien", "5", "1", 210, 2578.94, 2661.47, 2735.99],
  ["EMP-230", "Agent d'exploitation / employé / technicien — niveau 5 échelon 2 (coef. 230)", "technicien", "5", "2", 230, 2798.91, 2888.48, 2969.36],
  ["EMP-250", "Agent d'exploitation / employé / technicien — niveau 5 échelon 3 (coef. 250)", "technicien", "5", "3", 250, 3018.92, 3115.53, 3202.76],
  ["AM-150", "Agent de maîtrise — niveau 1 échelon 1 (coef. 150)", "agent_maitrise", "1", "1", 150, 2106.05, 2173.44, 2234.30],
  ["AM-160", "Agent de maîtrise — niveau 1 échelon 2 (coef. 160)", "agent_maitrise", "1", "2", 160, 2222.43, 2293.55, 2357.77],
  ["AM-170", "Agent de maîtrise — niveau 1 échelon 3 (coef. 170)", "agent_maitrise", "1", "3", 170, 2338.53, 2413.36, 2480.93],
  ["AM-185", "Agent de maîtrise — niveau 2 échelon 1 (coef. 185)", "agent_maitrise", "2", "1", 185, 2513.25, 2593.67, 2666.29],
  ["AM-200", "Agent de maîtrise — niveau 2 échelon 2 (coef. 200)", "agent_maitrise", "2", "2", 200, 2687.54, 2773.54, 2851.20],
  ["AM-215", "Agent de maîtrise — niveau 2 échelon 3 (coef. 215)", "agent_maitrise", "2", "3", 215, 2861.88, 2953.46, 3036.16],
  ["AM-235", "Agent de maîtrise — niveau 3 échelon 1 (coef. 235)", "agent_maitrise", "3", "1", 235, 3094.44, 3193.46, 3282.88],
  ["AM-255", "Agent de maîtrise — niveau 3 échelon 2 (coef. 255)", "agent_maitrise", "3", "2", 255, 3326.98, 3433.44, 3529.58],
  ["AM-275", "Agent de maîtrise — niveau 3 échelon 3 (coef. 275)", "agent_maitrise", "3", "3", 275, 3559.53, 3673.43, 3776.29],
  ["CAD-300", "Ingénieur et cadre — position I (coef. 300)", "cadre", "I", null, 300, 2798.08, 2887.62, 2968.47],
  ["CAD-400", "Ingénieur et cadre — position II-A (coef. 400)", "cadre", "II", "A", 400, 3541.00, 3654.31, 3756.63],
  ["CAD-470", "Ingénieur et cadre — position II-B (coef. 470)", "cadre", "II", "B", 470, 4060.64, 4190.58, 4307.92],
  ["CAD-530", "Ingénieur et cadre — position III-A (coef. 530)", "cadre", "III", "A", 530, 4506.43, 4650.64, 4780.86],
  ["CAD-620", "Ingénieur et cadre — position III-B (coef. 620)", "cadre", "III", "B", 620, 5174.81, 5340.40, 5489.93],
  ["CAD-800", "Ingénieur et cadre — position III-C (coef. 800)", "cadre", "III", "C", 800, 6511.93, 6720.31, 6908.48],
];
const years = [["2024-01-01", "2025-01-01", 6, "date d'entrée en vigueur"], ["2025-01-01", "2026-01-01", 7, "1er janvier 2025"], ["2026-01-01", null, 8, "1er janvier 2026"]];
const gridNote = {
  "2024-01-01": cite(I, SAL, "applicable à la date d'entrée en vigueur", "Grille à la date d'entrée en vigueur (au plus tôt le 01/01/2024), base 151,67 h"),
  "2025-01-01": cite(I, SAL, "applicable au 1er janvier 2025", "Grille au 01/01/2025, base 151,67 h"),
  "2026-01-01": cite(I, SAL, "applicable au 1er janvier 2026", "Grille au 01/01/2026, base 151,67 h"),
};

const sick = (cat, text, re, waiting, rows, rate1, rate2) =>
  rows.flatMap(([years, d1, d2]) => [
    { categories: cat, seniority: years * 12, waiting, seq: 1, days: d1, rate: rate1, src: "base", from: "1985-08-01", note: cite(I, text, re, `Ancienneté > ${years} an(s) : ${d1} j à ${rate1} %, puis ${d2} j à ${rate2} % ; carence ${waiting} j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites`) },
    { categories: cat, seniority: years * 12, waiting, seq: 2, days: d2, rate: rate2, src: "base", from: "1985-08-01", note: cite(I, text, re, `2e période, ancienneté > ${years} an(s)`) },
  ]);

module.exports = {
  idcc: I,
  name: "Entreprises de prévention et de sécurité",
  texts: [
    { key: "base", ref: BASE, kind: "texte_base", title: "Convention collective nationale des entreprises de prévention et de sécurité du 15 février 1985", signed: "1985-02-15", ext: "1985-07-30", eff: "1985-08-01" },
    { key: "sal", ref: SAL, kind: "avenant_salaires", signed: "2023-09-25", eff: "2024-01-01", notes: "Revalorisations +5 % (entrée en vigueur), +3,2 % au 01/01/2025, +2,8 % au 01/01/2026" },
    { key: "a4", ref: A4, kind: "annexe", eff: "1985-08-01" },
    { key: "a5", ref: A5, kind: "annexe", eff: "1985-08-01" },
    { key: "a6", ref: A6, kind: "annexe", eff: "1985-08-01" },
    { key: "nuit", ref: NUIT, kind: "avenant", signed: "2001-09-25", eff: "2002-01-01" },
    { key: "dim", ref: DIM, kind: "accord", signed: "2003-10-29", eff: "2004-07-01" },
  ],
  classifications: GRID.map(([code, label, category, level, step, coef]) => ({
    code, label, category, level, step, coefficient: coef,
    aliases: [`Coefficient ${coef}`, `Coef. ${coef}`, `Coef ${coef}`],
    src: "sal", from: "2024-01-01", note: gridNote["2026-01-01"],
  })),
  minimums: GRID.flatMap((g) => years.map(([from, to, col]) => ({
    code: g[0], amount: g[col], unit: "mensuel", hours: 151.67, src: "sal", from, to, note: gridNote[from],
  }))),
  seniority: [[48, 2], [84, 5], [120, 8], [144, 10], [180, 12]].map(([months, rate]) => ({
    categories: ["employe", "technicien", "agent_maitrise"], months, rate, base: "minimum_conventionnel", src: "base", from: "1985-08-01",
    definition: "Ancienneté dans l'entreprise ; taux appliqué au salaire minimal conventionnel de la qualification, à compter du mois suivant la date anniversaire",
    note: cite(I, BASE, "9\\.03\\. Prime d'ancienneté", `${rate} % après ${months / 12} ans ; cadres exclus`),
  })),
  bonuses: [
    { kind: "prime_panier", label: "Indemnité de panier (vacation de 6 h minimum)", categories: ["employe", "technicien"], fixed: 4.48, base: "forfait", src: "sal", from: "2026-01-01", note: cite(I, SAL, "applicable au 1er janvier 2026", "Prime de panier portée à 4,48 € au 01/01/2026 (6,87 € pour l'annexe VIII sûreté aérienne)") },
    { kind: "prime_habillage", label: "Prime d'entretien des tenues (nette, par mois)", fixed: 8.78, base: "forfait", src: "sal", from: "2026-01-01", note: cite(I, SAL, "applicable au 1er janvier 2026", "8,78 € nets par mois au 01/01/2026") },
    { kind: "prime_vacances", label: "Prime d'étalement des vacances : 4 % de l'indemnité de congés payés de la période prise hors 1er juin – 30 septembre", rate: 4, base: "indemnite_conges_payes", src: "base", from: "1985-08-01", note: cite(I, BASE, "prime d'étalement des vacances", "2 des 4 semaines du congé principal prises hors période estivale et hors périodes de pointe") },
  ],
  workingTime: [
    { arrangement: "standard", weekly: 35, monthly: 151.67, quota: 329, src: "base", from: "1985-08-01", note: cite(I, BASE, "7\\.10\\. Contingent annuel", "Contingent de 329 h ; cycles de 8 semaines maximum ; 48 h par semaine au plus, 46 h en moyenne sur 12 semaines ; 12 h par jour") },
  ],
  payIncreases: [
    { kind: "nuit", label: "Heures de nuit (21 h – 6 h) : +10 % du taux horaire minimum conventionnel, plus repos compensateur de 1 % par heure", start: "21:00", end: "06:00", rate: 10, rest: 1, compensation: "paiement_et_repos", src: "nuit", from: "2002-01-01", note: cite(I, NUIT, "1\\.1\\. Majorations de salaire") },
    { kind: "dimanche", label: "Heures du dimanche (0 h – 24 h) : +10 % du taux horaire minimum conventionnel", rate: 10, src: "dim", from: "2004-07-01", note: cite(I, DIM, "majoration de 10 %", "Calculée sur le taux horaire minimum conventionnel de base, hors autres majorations") },
    { kind: "jour_ferie", label: "Jour férié travaillé : indemnité égale au salaire du jour (soit +100 %) ou repos équivalent pris dans le mois", rate: 100, compensation: "paiement_ou_repos", src: "base", from: "1985-08-01", note: cite(I, BASE, "9\\.05\\. Rémunération des jours fériés", "1er mai : régime légal") },
  ],
  leave: [
    ["mariage_salarie", "Mariage du salarié", 7, "calendaires"], ["mariage_enfant", "Mariage d'un enfant", 2, "ouvres"],
    ["mariage_frere_soeur", "Mariage d'un frère ou d'une sœur", 1, "ouvres"], ["deces_conjoint", "Décès du conjoint", 3, "ouvres"],
    ["deces_parent", "Décès du père ou de la mère", 1, "ouvres"], ["deces_enfant", "Décès d'un enfant (cas général)", 13, "ouvrables"],
    ["deces_beau_parent", "Décès du père ou de la mère du conjoint", 1, "ouvres"], ["deces_frere_soeur", "Décès d'un frère ou d'une sœur", 1, "ouvres"],
    ["naissance_adoption", "Naissance ou arrivée d'un enfant en vue de son adoption", 3, "ouvres"], ["handicap_enfant", "Annonce du handicap ou d'une pathologie d'un enfant", 6, "ouvrables"],
  ].map(([event, label, days, dayType]) => ({ kind: "evenement_familial", event, label, days, dayType, seniority: 12, src: "base", from: "1985-08-01", note: cite(I, BASE, "7\\.05\\. Autorisation d'absence pour événements", "Après 1 an d'ancienneté ; sans réduction de rémunération ; minimum légal en dessous d'1 an") })),
  sickPay: [
    ...sick(["employe", "technicien"], A4, "après 3 ans d'ancienneté dans l'entreprise, en cas de maladie", 10, [[3, 30, 30], [8, 45, 45], [13, 60, 45], [18, 60, 75], [23, 75, 75], [28, 90, 90]], 90, 70),
    ...sick(["agent_maitrise"], A5, "après 2 ans d'ancienneté dans l'entreprise, en cas de maladie", 3, [[2, 30, 30], [8, 45, 45], [13, 60, 60], [18, 75, 75], [23, 90, 90], [28, 105, 105]], 90, 75),
    ...sick(["cadre"], A6, "Après 1 an d'ancienneté dans l'entreprise, en cas de maladie", 0, [[1, 30, 45], [5, 45, 60], [10, 60, 90], [15, 90, 120], [20, 120, 150]], 100, 75),
  ].map((r) => ({ ...r, src: r.categories[0] === "cadre" ? "a6" : r.categories[0] === "agent_maitrise" ? "a5" : "a4" })),
};
