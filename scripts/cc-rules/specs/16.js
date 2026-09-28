const { cite, table } = require("../gen");
const I = "16";
const BASE = "KALITEXT000005678893", CCNA1 = "KALITEXT000005678895", NUIT = "KALITEXT000005679047";
const TRM = "KALITEXT000049067154";
const V_OUV = "KALITEXT000053914012", V_EMP = "KALITEXT000053914023", V_TAM = "KALITEXT000053914046", V_IC = "KALITEXT000053914035";

const cls = new Map(); // code -> { label, category, coefficient }
const addCls = (code, label, category, coefficient) => { if (!cls.has(code)) cls.set(code, { code, label, category, coefficient, aliases: [`Coefficient ${String(coefficient).replace(".", ",")}`, `Coef. ${String(coefficient).replace(".", ",")}`] }); };
const minimums = [];
const push = (code, amount, unit, seniority, variant, src, from, note) => minimums.push({ code, amount, unit, hours: unit === "mensuel" ? 151.67 : null, seniority, variant, src, from, note });

// --- Transport routier de voyageurs (TRV), barèmes au 01/01/2026 --------------
const noteV = (t, what) => cite(I, t, "Coefficients", `${what} — transport routier de voyageurs ; salaires mensuels garantis pour 151,67 h, majorés selon l'ancienneté`);
const vOuv = table(I, V_OUV, "Coefficients").filter((r) => r.some((c) => /^\d+ V$/.test(String(c))));
for (const r of vOuv) {
  const i = r.findIndex((c) => /^\d+ V$/.test(String(c)));
  const coef = parseInt(r[i], 10), code = `${coef}V`;
  addCls(code, `Ouvrier — coefficient ${coef} V (voyageurs)`, "ouvrier", coef);
  const months = [0, 12, 60, 120, 180, 240, 300, 360];
  r.slice(i + 2).forEach((amount, k) => push(code, amount, "mensuel", months[k], "TRV", "vOuv", "2026-01-01", noteV(V_OUV, "Ouvriers")));
}
for (const [t, key, prefix, category, label] of [[V_EMP, "vEmp", "EMP", "employe", "Employé"], [V_TAM, "vTam", "TAM", "agent_maitrise", "Technicien / agent de maîtrise"]]) {
  const rows = table(I, t, "Coefficients").filter((r) => typeof r[0] === "number" && typeof r[1] === "number" && r.length >= 11);
  for (const r of rows) {
    const coef = r[1], code = `${prefix}-${coef}`;
    addCls(code, `${label} — coefficient ${String(coef).replace(".", ",")}`, category === "agent_maitrise" && coef < 175 ? "technicien" : category, coef);
    const months = [0, 36, 72, 108, 144, 180, 240, 300, 360];
    r.slice(3).forEach((amount, k) => push(code, amount, "mensuel", months[k], "TRV", key, "2026-01-01", noteV(t, label + "s")));
  }
}
const band = (s) => ({ "Jusqu'à 5 ans": 0, "5 à 10 ans": 60, "10 à 15 ans": 120, "15 à 20 ans": 180, "20 à 25 ans": 240, "25 à 30 ans": 300, "Après 30 ans": 360, "Après 15 ans": 180 })[s];
function cadres(t, key, variant, from, note) {
  let coef = null;
  for (const r of table(I, t, variant === "TRV" ? "Personnel ingénieur et cadre" : "Taux horaires à compter du 1er décembre 2023")) {
    let cells = r;
    if (typeof r[0] === "number" && typeof r[1] === "number" && typeof r[2] === "string") { coef = r[1]; cells = r.slice(2); }
    else if (typeof r[0] === "number" && typeof r[1] === "string") { coef = r[0]; cells = r.slice(1); }
    if (coef === null || band(cells[0]) === undefined || typeof cells[2] !== "number") continue;
    const code = `IC-${coef}`;
    addCls(code, `Ingénieur et cadre — coefficient ${String(coef).replace(".", ",")}`, "cadre", coef);
    push(code, cells[2], "mensuel", band(cells[0]), variant, key, from, note);
  }
}
cadres(V_IC, "vIc", "TRV", "2026-01-01", cite(I, V_IC, "Jusqu'à 5 ans", "Paiement mensuel minimum (rémunération annuelle garantie / 12) selon l'ancienneté dans le groupe — voyageurs ; +10 % en région parisienne"));

// --- Transport routier de marchandises et activités auxiliaires (TRM), 01/12/2023
const trm = table(I, TRM, "Taux horaires à compter du 1er décembre 2023");
const noteM = (what) => cite(I, TRM, "Taux horaires à compter du 1er décembre 2023", `${what} — marchandises et activités auxiliaires ; dernier barème étendu (01/12/2023). Les taux à l'embauche des premiers coefficients sont inférieurs au SMIC 2026 : le SMIC s'applique`);
const block = (start, end) => trm.slice(start, end);
const idxOf = (re) => trm.findIndex((r) => re.test(String(r[0])));
const ouvH = block(idxOf(/^Personnels ouvriers roulants et sédentairesTaux/) + 1, idxOf(/^Personnels ouvriers roulants et sédentairesGaranties/)).filter((r) => /M$/.test(String(r[0])));
for (const r of ouvH) {
  const coef = parseInt(r[0], 10);
  const coefs = coef === 120 ? [110, 115, 118, 120] : [coef];
  for (const c of coefs) {
    addCls(`${c}M`, `Ouvrier — coefficient ${c} M (marchandises)`, "ouvrier", c);
    [0, 24, 60, 120, 180].forEach((m, k) => push(`${c}M`, r[k + 1], "horaire", m, "TRM", "trm", "2023-12-01", noteM("Ouvriers roulants et sédentaires, taux horaire")));
  }
}
function trmHourly(startRe, endRe, prefix, label, category, groupedFirst) {
  const rows = block(idxOf(startRe) + 1, idxOf(endRe)).filter((r) => typeof r[0] === "number");
  for (const r of rows) {
    const coefs = groupedFirst && r === rows[0] ? groupedFirst : [r[0]];
    for (const c of coefs) {
      const code = `${prefix}-${c}`;
      addCls(code, `${label} — coefficient ${String(c).replace(".", ",")}`, category === "agent_maitrise" && c < 175 ? "technicien" : category, c);
      [0, 36, 72, 108, 144, 180].forEach((m, k) => push(code, r[k + 1], "horaire", m, "TRM", "trm", "2023-12-01", noteM(label + "s, taux horaire")));
    }
  }
}
trmHourly(/^Personnels employésTaux/, /^Personnels employésGaranties/, "EMP", "Employé", "employe", [105, 110, 115, 120]);
trmHourly(/^Personnels techniciens et agents de maîtriseTaux/, /^Personnels techniciens et agents de maîtriseGaranties/, "TAM", "Technicien / agent de maîtrise", "agent_maitrise");
cadres(TRM, "trm", "TRM", "2023-12-01", noteM("Ingénieurs et cadres, paiement mensuel minimum"));

const sick = (type, rows, waiting, re, extra) => rows.flatMap(([years, d1, d2]) => [
  { type, categories: ["ouvrier", "ouvrier_roulant", "sedentaire"], seniority: years * 12, waiting, seq: 1, days: d1, rate: 100, src: "ccna1", from: "1961-06-16", note: cite(I, CCNA1, re, `Ouvriers, ancienneté ≥ ${years} an(s) : ${d1} j à 100 % puis ${d2} j à 75 %${extra}`) },
  { type, categories: ["ouvrier", "ouvrier_roulant", "sedentaire"], seniority: years * 12, waiting, seq: 2, days: d2, rate: 75, src: "ccna1", from: "1961-06-16", note: cite(I, CCNA1, re, "2e période") },
]);

module.exports = {
  idcc: I,
  name: "Transports routiers et activités auxiliaires du transport",
  header: "Barèmes intégrés : transport routier de voyageurs (TRV, 01/01/2026) et transport routier de marchandises / activités auxiliaires (TRM, 01/12/2023, dernier barème étendu), distingués par la colonne variant.\nNon intégrés : déménagement, logistique, transport sanitaire, transport de fonds.",
  texts: [
    { key: "base", ref: BASE, kind: "texte_base", title: "Convention collective nationale des transports routiers et activités auxiliaires du transport du 21 décembre 1950", signed: "1950-12-21", eff: "1950-12-21" },
    { key: "ccna1", ref: CCNA1, kind: "annexe", eff: "1961-06-16" },
    { key: "nuit", ref: NUIT, kind: "accord", signed: "2001-11-14", eff: "2002-01-01" },
    { key: "trm", ref: TRM, kind: "avenant_salaires", signed: "2023-10-11", eff: "2023-12-01", notes: "Barèmes TRM (marchandises et activités auxiliaires) : ouvriers, employés, TAM, cadres" },
    { key: "vOuv", ref: V_OUV, kind: "avenant_salaires", signed: "2025-11-27", eff: "2026-01-01" },
    { key: "vEmp", ref: V_EMP, kind: "avenant_salaires", signed: "2025-11-27", eff: "2026-01-01" },
    { key: "vTam", ref: V_TAM, kind: "avenant_salaires", signed: "2025-11-27", eff: "2026-01-01" },
    { key: "vIc", ref: V_IC, kind: "avenant_salaires", signed: "2025-11-27", eff: "2026-01-01" },
  ],
  classifications: [...cls.values()].map((c) => ({ ...c, src: "base", from: "1950-12-21", note: "Coefficients des annexes I à IV (suffixe M : marchandises, V : voyageurs) — " + cite(I, TRM, "Taux horaires à compter du 1er décembre 2023") })),
  minimums,
  payIncreases: [
    { kind: "nuit", label: "Travail de nuit (TRM, activités auxiliaires, déménagement) : prime horaire de 20 % du taux horaire à l'embauche du coefficient 150 M", rate: 20, src: "nuit", from: "2002-01-01", note: cite(I, NUIT, "prime horaire est égale à 20 %", "Repos compensateur supplémentaire à partir de 50 h de nuit par mois") },
    { kind: "dimanche", label: "Dimanche travaillé (TRM) : indemnité de 12,45 € si moins de 3 h, 28,94 € à partir de 3 h", fixed: 28.94, fixedUnit: "jour", src: "trm", from: "2023-12-01", note: cite(I, TRM, "Indemnités pour dimanches et jours fériés travaillés") },
    { kind: "jour_ferie", label: "Jour férié travaillé (TRM) : indemnité de 12,45 € si moins de 3 h, 28,94 € à partir de 3 h", fixed: 28.94, fixedUnit: "jour", src: "trm", from: "2023-12-01", note: cite(I, TRM, "Indemnités pour dimanches et jours fériés travaillés") },
    { kind: "dimanche", label: "Dimanche travaillé (voyageurs) : 48,85 € quel que soit le nombre d'heures", fixed: 48.85, fixedUnit: "jour", src: "vOuv", from: "2026-01-01", note: cite(I, V_OUV, "Coefficients", "Montant au 01/01/2026") },
    { kind: "jour_ferie", label: "Jour férié travaillé hors 1er mai (voyageurs) : 48,85 € quel que soit le nombre d'heures", fixed: 48.85, fixedUnit: "jour", src: "vOuv", from: "2026-01-01", note: cite(I, V_OUV, "Coefficients", "Montant au 01/01/2026") },
  ],
  sickPay: [
    ...sick("maladie", [[3, 35, 30], [5, 65, 60], [10, 95, 90]], 5, "délai de franchise de 5 jours", " ; franchise de 5 jours (3 jours en cas d'hospitalisation en TRM) ; période à 75 % prolongée de 30 jours en cas d'hospitalisation"),
    ...sick("accident_travail", [[1, 30, 60], [5, 60, 90], [10, 90, 120]], 0, "sans application d'un délai de franchise", " ; sans franchise ; après 1 an : AT avec hospitalisation d'au moins 3 jours ou arrêt d'au moins 28 jours"),
  ],
};
