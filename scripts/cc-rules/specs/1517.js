const { cite } = require("../gen");
const I = "1517";
const BASE = "KALITEXT000026803629", S14 = "KALITEXT000051191053", S15 = "KALITEXT000054303837";
const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
const G14 = [1802, 1809, 1814, 1839, 1940, 2118, 2714, 3548, 3994];
const G15 = [1829, 1838, 1843, 1867, 1967, 2146, 2741, 3583, 4034];
const cat = (i) => (i < 5 ? "employe" : i === 5 ? "agent_maitrise" : "cadre");
const smicNote = "Niveaux 1 à 4 : minimum inférieur ou égal au SMIC mensuel en vigueur (1 867,06 € au 01/06/2026) — le SMIC s'applique";

module.exports = {
  idcc: I,
  name: "Commerces de détail non alimentaires",
  texts: [
    { key: "base", ref: BASE, kind: "texte_base", title: "Convention collective nationale des commerces de détail non alimentaires du 9 mai 2012", signed: "2012-05-09", eff: "2012-05-09" },
    { key: "s14", ref: S14, kind: "avenant_salaires", signed: "2024-11-27", eff: "2025-03-01" },
    { key: "s15", ref: S15, kind: "avenant_salaires", signed: "2026-02-06", eff: "2026-06-01", notes: smicNote },
  ],
  classifications: ROMAN.map((r, i) => ({
    code: `N${i + 1}`, label: `Niveau ${r} (${cat(i) === "employe" ? "ouvriers et employés" : cat(i) === "agent_maitrise" ? "agents de maîtrise" : "cadres"})`, category: cat(i), level: r,
    aliases: [`Niveau ${r}`, `Niveau ${i + 1}`, `Niv. ${i + 1}`, `Niv ${r}`],
    src: "base", from: "2012-05-09", note: cite(I, BASE, "neuf niveaux de qualification", "5 niveaux ouvriers/employés, niveau VI agents de maîtrise, niveaux VII à IX cadres ; le niveau I ne peut s'appliquer au-delà de 6 mois (sauf employés de nettoyage)"),
  })),
  minimums: [
    ...G14.map((amount, i) => ({ code: `N${i + 1}`, amount, unit: "mensuel", hours: 151.67, src: "s14", from: "2025-03-01", to: "2026-06-01", note: cite(I, S14, "Niveau 9", "Minimum mensuel pour 151,67 h, hors partie variable") })),
    ...G15.map((amount, i) => ({ code: `N${i + 1}`, amount, unit: "mensuel", hours: 151.67, src: "s15", from: "2026-06-01", note: cite(I, S15, "Niveau 9", "Minimum mensuel pour 151,67 h, hors partie variable" + (i < 4 ? " ; " + smicNote : "")) })),
  ],
  seniority: [[36, 3], [72, 6], [108, 9], [144, 12], [180, 15]].map(([months, rate]) => ({
    codes: ["N1", "N2", "N3", "N4", "N5", "N6"], months, rate, base: "minimum_conventionnel", src: "base", from: "2012-05-09",
    definition: "Ancienneté dans l'entreprise ; taux appliqué au salaire minimum mensuel du NIVEAU I (et non du niveau du salarié) ; prorata temps partiel et absences non indemnisées ; ligne distincte sur le bulletin",
    note: cite(I, BASE, "prime d'ancienneté calculée sur le salaire minimum mensuel du niveau I", `${rate} % après ${months / 12} ans, niveaux I à VI`),
  })),
  workingTime: [
    { weekly: 35, monthly: 151.67, quota: 180, src: "base", from: "2012-05-09", note: cite(I, BASE, "contingent d'heures supplémentaires est fixé à 180 heures") },
    { categories: ["cadre", "agent_maitrise"], arrangement: "forfait_jours", days: 218, src: "base", from: "2012-05-09", note: cite(I, BASE, "fixé à 218 jours", "218 jours journée de solidarité comprise ; jours de repos rachetés majorés d'au moins 25 %") },
  ],
  payIncreases: [
    { kind: "heures_supplementaires", label: "Heures supplémentaires de la 36e à la 39e heure (moyenne)", from_h: 35, to_h: 39, period: "semaine", rate: 25, src: "base", from: "2012-05-09", note: cite(I, BASE, "entre 35 et 39 heures en moyenne") },
    { kind: "heures_supplementaires", label: "Heures supplémentaires au-delà de la 39e heure (moyenne)", from_h: 39, period: "semaine", rate: 50, src: "base", from: "2012-05-09", note: cite(I, BASE, "entre 35 et 39 heures en moyenne", "Contrepartie en repos de 50 % au-delà du contingent") },
    { kind: "jour_ferie", label: "Jour férié travaillé (hors 1er mai) : indemnité égale à 50 % des heures effectuées, ou repos de moitié", rate: 50, compensation: "paiement_ou_repos", src: "base", from: "2012-05-09", note: cite(I, BASE, "indemnité spéciale égale à la rémunération due pour 50 %", "3 jours fériés chômés et payés par an en plus du 1er mai ; si l'un d'eux est travaillé : +50 % et repos équivalent") },
  ],
  leave: [
    ...[[120, 1], [180, 2], [240, 3], [300, 4], [360, 5]].map(([months, days]) => ({ kind: "conges_anciennete", label: `Congé d'ancienneté : ${days} jour(s) ouvré(s) après ${months / 12} ans`, seniority: months, days, dayType: "ouvres", src: "base", from: "2012-05-09", note: cite(I, BASE, "congés supplémentaires seront accordés en fonction de l'ancienneté", "Ancienneté appréciée au 31 mai") })),
    ...[
      ["mariage_salarie", "Mariage ou Pacs du salarié", 4, 5], ["mariage_enfant", "Mariage d'un enfant", 1, 2], ["mariage_frere_soeur", "Mariage d'un frère ou d'une sœur", 1, 1],
      ["deces_conjoint", "Décès du conjoint, partenaire de Pacs ou concubin", 3, 4], ["deces_enfant", "Décès d'un enfant (cas général)", 5, 6],
      ["deces_parent", "Décès du père, de la mère, des beaux-parents, d'un frère ou d'une sœur", 3, 4], ["deces_grand_parent", "Décès d'un grand-parent", 1, 1],
      ["naissance", "Naissance d'un enfant", 3, 3], ["adoption", "Arrivée d'un enfant en vue de son adoption", 3, 3], ["handicap_enfant", "Annonce d'un handicap, d'une pathologie chronique ou d'un cancer chez un enfant", 2, 2],
    ].flatMap(([event, label, d0, d1]) => {
      const note = cite(I, BASE, "des congés exceptionnels payés sont accordés", "Sur justificatif ; assimilés à du travail effectif pour les congés payés");
      return d1 !== d0
        ? [{ kind: "evenement_familial", event, label, days: d0, dayType: "ouvres", src: "base", from: "2012-05-09", note }, { kind: "evenement_familial", event, label: `${label} (après 1 an d'ancienneté)`, days: d1, seniority: 12, dayType: "ouvres", src: "base", from: "2012-05-09", note }]
        : [{ kind: "evenement_familial", event, label, days: d0, dayType: "ouvres", src: "base", from: "2012-05-09", note }];
    }),
    { kind: "enfant_malade", label: "Enfant malade de moins de 16 ans : 3 jours par an dont 2 rémunérés (4 dont 3 pour 2 enfants ; 5 dont 3 si enfant de moins d'1 an ou 3 enfants)", days: 2, dayType: "ouvres", src: "base", from: "2012-05-09", note: cite(I, BASE, "3 jours par année civile \\(dont 2 rémunérés") },
  ],
  sickPay: [[12, 30], [72, 40], [132, 50], [192, 60], [252, 70], [312, 80], [372, 90]].flatMap(([months, days]) => [
    { seniority: months, waiting: 7, seq: 1, days, rate: 90, src: "base", from: "2012-05-09", note: cite(I, BASE, "à partir du 8e jour d'absence calendaire", `Ancienneté ≥ ${months / 12} an(s) : ${days} j à 90 % puis ${days} j à 70 % du brut, à partir du 8e jour ; IJSS et prévoyance (part employeur) déduites ; plafond sur 12 mois`) },
    { seniority: months, waiting: 7, seq: 2, days, rate: 70, src: "base", from: "2012-05-09", note: cite(I, BASE, "à partir du 8e jour d'absence calendaire", "2e période") },
    { type: "accident_travail", seniority: Math.max(6, months === 12 ? 6 : months), waiting: 0, seq: 1, days, rate: 90, src: "base", from: "2012-05-09", note: cite(I, BASE, "À partir de 6 mois d'ancienneté, en cas d'accident du travail", "AT/MP : dès 6 mois d'ancienneté, indemnisation dès le 1er jour, mêmes taux et durées") },
    { type: "accident_travail", seniority: Math.max(6, months === 12 ? 6 : months), waiting: 0, seq: 2, days, rate: 70, src: "base", from: "2012-05-09", note: cite(I, BASE, "À partir de 6 mois d'ancienneté, en cas d'accident du travail", "2e période") },
  ]),
};
