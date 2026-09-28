const { cite } = require("../gen");
const I = "1702", BASE = "KALITEXT000005658951", from = "1993-01-01";
const regional = "Salaires minima hiérarchiques fixés chaque année par accords régionaux (valeur du point × coefficient ; non intégrés : la région de l'entreprise n'est pas lue sur le bulletin) — le contrôle du minimum utilise le champ manuel des Paramètres";
const C = (re, comment) => cite(I, BASE, re, comment);

module.exports = {
  idcc: I,
  name: "Travaux publics — ouvriers",
  header: regional,
  texts: [{ key: "base", ref: BASE, kind: "texte_base", title: "Convention collective nationale des ouvriers des travaux publics du 15 décembre 1992", signed: "1992-12-15", eff: from, notes: regional }],
  classifications: [
    ["N1-P1", "Niveau I position 1", "I", "1", 100], ["N1-P2", "Niveau I position 2", "I", "2", 110], ["N2-P1", "Niveau II position 1", "II", "1", 125],
    ["N2-P2", "Niveau II position 2", "II", "2", 140], ["N3-P1", "Niveau III position 1", "III", "1", 150], ["N3-P2", "Niveau III position 2", "III", "2", 165], ["N4", "Niveau IV", "IV", null, 180],
  ].map(([code, label, level, step, coefficient]) => ({
    code, label, category: "ouvrier", level, step, coefficient,
    aliases: [`Niveau ${level}${step ? ` position ${step}` : ""}`, `N${level}${step ? `P${step}` : ""}`, `Coefficient ${coefficient}`, `Coef. ${coefficient}`],
    src: "base", from, note: C("niveau I, position 1, coefficient 100"),
  })),
  workingTime: [{ weekly: 35, monthly: 151.67, src: "base", from, note: C("Les heures supplémentaires sont payées conformément aux dispositions légales", "Majorations légales des heures supplémentaires ; repos de remplacement possible par accord d'entreprise (125 % / 150 %)") }],
  payIncreases: [
    { kind: "heures_supplementaires", label: "Heures supplémentaires : 8 premières heures (taux légal)", from_h: 35, to_h: 43, period: "semaine", rate: 25, compensation: "paiement_ou_repos", src: "base", from, note: C("Les heures supplémentaires sont payées conformément aux dispositions légales") },
    { kind: "heures_supplementaires", label: "Heures supplémentaires au-delà de la 8e (taux légal)", from_h: 43, period: "semaine", rate: 50, compensation: "paiement_ou_repos", src: "base", from, note: C("Les heures supplémentaires sont payées conformément aux dispositions légales") },
  ],
  bonuses: [
    { kind: "prime_vacances", label: "Prime de vacances : 30 % de l'indemnité de congé correspondant à 24 jours ouvrables (caisse de congés payés du BTP)", rate: 30, base: "indemnite_conges_payes", presence: "1 200 heures de travail au cours de l'année de référence dans le BTP (maladie non opposable)", src: "base", from, note: C("Le taux de la prime de vacances est de 30 %") },
  ],
  leave: [
    ["mariage_salarie", "Mariage du salarié", 4], ["pacs_salarie", "Pacs du salarié", 3], ["mariage_enfant", "Mariage d'un enfant", 1],
    ["deces_conjoint", "Obsèques du conjoint marié ou pacsé", 3], ["deces_enfant", "Obsèques d'un enfant", 3], ["deces_parent", "Obsèques du père ou de la mère", 3],
    ["deces_famille", "Obsèques d'un grand-parent, beau-parent, frère, sœur, beau-frère, belle-sœur ou petit-enfant", 1], ["naissance_adoption", "Naissance ou arrivée d'un enfant en vue de son adoption", 3],
  ].map(([event, label, days]) => ({ kind: "evenement_familial", event, label, days, src: "base", from, note: C("-mariage : 4 jours", "Minimums conventionnels ; les durées légales plus favorables s'appliquent") })),
  sickPay: [
    { seniority: 12, waiting: 3, seq: 1, days: 45, rate: 100, rateBase: "net", src: "base", from: "2003-01-01", note: C("100 % du salaire net pendant 45 jours", "Après 1 an d'ancienneté : 100 % du net du 4e au 48e jour, puis 75 % du net jusqu'au 90e jour ; IJSS et prévoyance déduites") },
    { seniority: 12, waiting: 3, seq: 2, days: 42, rate: 75, rateBase: "net", src: "base", from: "2003-01-01", note: C("100 % du salaire net pendant 45 jours", "2e période : 49e au 90e jour") },
  ],
};
