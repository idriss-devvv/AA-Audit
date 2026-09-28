const { cite, table } = require("../gen");
const I = "2420", BASE = "KALITEXT000017941844", S23 = "KALITEXT000047416384", from = "2004-06-01";
const nonEtendu = "Convention et avenant de salaires non étendus : obligatoires pour les seules entreprises adhérentes d'une organisation signataire";
const C = (re, comment) => cite(I, BASE, re, comment);
const grid = table(I, S23, "Coefficients").filter((r) => typeof r[0] === "number" && typeof r[1] === "number");

module.exports = {
  idcc: I,
  name: "Bâtiment — cadres",
  header: nonEtendu,
  texts: [
    { key: "base", ref: BASE, kind: "texte_base", title: "Convention collective nationale des cadres du bâtiment du 1er juin 2004", signed: "2004-06-01", eff: from, notes: nonEtendu },
    { key: "s23", ref: S23, kind: "avenant_salaires", signed: "2023-01-25", eff: "2023-02-01", notes: "Appointements minimaux nationaux pour 39 heures hebdomadaires, toutes zones (hiérarchie de la convention du 30 avril 1951) ; " + nonEtendu },
  ],
  classifications: grid.map(([coef]) => ({
    code: `COEF-${coef}`, label: `Cadre — coefficient ${coef}`, category: "cadre", coefficient: coef, aliases: [`Coefficient ${coef}`, `Coef. ${coef}`, `Coef ${coef}`],
    src: "base", from, note: C("classification des cadres du bâtiment résulte de la convention collective nationale du 30 avril 1951", "Hiérarchie de la convention du 30 avril 1951 (coefficients 60 à 162)"),
  })),
  minimums: grid.map(([coef, amount]) => ({
    code: `COEF-${coef}`, amount, unit: "mensuel", hours: 169, src: "s23", from: "2023-02-01",
    note: cite(I, S23, "Coefficients", "Appointements minimaux mensuels pour 39 h/semaine, toutes zones ; +10 % en cas de forfait annuel en jours (art. 3.3 de la convention)"),
  })),
  workingTime: [{ categories: ["cadre"], arrangement: "forfait_jours", days: 218, minPercent: 110, src: "base", from, note: C("majoré de 10 %", "Forfait jours dans la limite légale (218 jours) ; salaire minimum majoré de 10 %") }],
  bonuses: [
    { kind: "prime_vacances", label: "Prime de vacances : 30 % de l'indemnité de congés correspondant à 24 jours ouvrables (caisse de congés payés du BTP)", rate: 30, base: "indemnite_conges_payes", presence: "6 mois de présence dans une ou plusieurs entreprises du BTP", src: "base", from, note: C("prime de vacances égale à 30 %") },
  ],
  leave: [
    { kind: "conges_anciennete", label: "Congé d'ancienneté : 2 jours ouvrables (plus de 5 ans dans l'entreprise ou plus de 10 ans dans le BTP)", seniority: 60, days: 2, src: "base", from, note: C("Congés payés d'ancienneté") },
    { kind: "conges_anciennete", label: "Congé d'ancienneté : 3 jours ouvrables (plus de 10 ans dans l'entreprise ou plus de 20 ans dans le BTP)", seniority: 120, days: 3, src: "base", from, note: C("Congés payés d'ancienneté") },
    ...[
      ["mariage_salarie", "Mariage du salarié", 4], ["pacs_salarie", "Pacs du salarié", 3], ["mariage_enfant", "Mariage d'un enfant", 1],
      ["deces_conjoint", "Obsèques du conjoint marié ou pacsé", 3], ["deces_enfant", "Obsèques d'un enfant", 3], ["deces_parent", "Obsèques du père ou de la mère", 3],
      ["deces_famille", "Obsèques d'un grand-parent, beau-parent, frère, sœur, beau-frère, belle-sœur ou petit-enfant", 1], ["naissance_adoption", "Naissance ou arrivée d'un enfant en vue de son adoption", 3],
    ].map(([event, label, days]) => ({ kind: "evenement_familial", event, label, days, src: "base", from, note: C("Mariage : 4 jours", "Minimums conventionnels ; les durées légales plus favorables s'appliquent") })),
  ],
  sickPay: [
    { categories: ["cadre"], seniority: 12, waiting: 0, seq: 1, days: 90, rate: 100, src: "base", from, note: C("Pendant les 90 premiers jours", "Maladie/accident non professionnels : après 1 an dans l'entreprise (ou 5 ans dans le BTP), appointements intégralement maintenus 90 jours, IJSS reversées ; au-delà, prévoyance cadres") },
    { type: "accident_travail", categories: ["cadre"], seniority: 0, waiting: 0, seq: 1, days: 90, rate: 100, src: "base", from, note: C("Pendant les 90 premiers jours", "AT/MP : sans condition d'ancienneté") },
  ],
};
