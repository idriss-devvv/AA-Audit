const { cite, table } = require("../gen");
const I = "1996";
const BASE = "KALITEXT000005671152", S25 = "KALITEXT000051834683", S26 = "KALITEXT000054162007";
const grid = (t) => table(I, t, "courbe de raccordement").filter((r) => typeof r[0] === "number" && typeof r[1] === "number");
const g25 = grid(S25), g26 = grid(S26);
// Catégorie indicative d'après les seuils de la convention (art. 16) : < 330 non-cadres, 330-399 assimilés cadres, ≥ 400 cadres.
const cat = (c) => (c >= 400 ? "cadre" : c >= 330 ? "agent_maitrise" : c >= 230 ? "technicien" : "employe");

module.exports = {
  idcc: I,
  name: "Pharmacie d'officine",
  texts: [
    { key: "base", ref: BASE, kind: "texte_base", title: "Convention collective nationale de la pharmacie d'officine du 3 décembre 1997", signed: "1997-12-03", ext: "1998-09-08", eff: "1998-09-08" },
    { key: "s25", ref: S25, kind: "avenant_salaires", signed: "2025-03-10", eff: "2025-05-24", notes: "Valeur du point 5,215 € ; coefficient 100 : 1 802 €" },
    { key: "s26", ref: S26, kind: "avenant_salaires", signed: "2026-01-19", eff: "2026-04-18", notes: "Valeur du point 5,278 € ; coefficient 100 : 1 824 € (inférieur au SMIC au 01/06/2026 : le SMIC s'applique)" },
  ],
  classifications: g26.map(([c]) => ({
    code: `COEF-${c}`, label: `Coefficient ${c}`, category: cat(c), coefficient: c, aliases: [`Coefficient ${c}`, `Coef. ${c}`, `Coef ${c}`],
    src: "s26", from: "1998-09-08", note: cite(I, S26, "courbe de raccordement", "Catégorie indicative : < 330 non-cadres, 330 à 399 assimilés cadres, ≥ 400 cadres (art. 16 de la convention)"),
  })),
  minimums: [
    ...g25.map(([c, amount]) => ({ code: `COEF-${c}`, amount, unit: "mensuel", hours: 151.67, src: "s25", from: "2025-05-24", to: "2026-04-18", note: cite(I, S25, "courbe de raccordement", "Salaire minimum hiérarchique mensuel pour 35 h, hors primes") })),
    ...g26.map(([c, amount]) => ({ code: `COEF-${c}`, amount, unit: "mensuel", hours: 151.67, src: "s26", from: "2026-04-18", note: cite(I, S26, "courbe de raccordement", "Salaire minimum hiérarchique mensuel pour 35 h, hors primes ; la prime d'ancienneté n'entre pas dans la comparaison") })),
  ],
  seniority: [[36, 3], [72, 6], [108, 9], [144, 12], [180, 15]].map(([months, rate]) => ({
    months, rate, base: "minimum_conventionnel", src: "base", from: "1998-09-08",
    definition: "Ancienneté dans l'entreprise ; calculée sur le salaire minimum du coefficient du salarié, au prorata des heures effectives (hors majorations d'heures supplémentaires) ; ligne spécifique du bulletin ; exclue de la comparaison au minimum",
    note: cite(I, BASE, "Le taux de la prime d'ancienneté est de 3 %", `${rate} % après ${months / 12} ans, à compter du 1er jour du mois anniversaire`),
  })),
  workingTime: [
    { weekly: 35, monthly: 151.67, quota: 150, src: "base", from: "1998-09-08", note: cite(I, BASE, "contingent égal à 150 heures", "Repos compensateur obligatoire au-delà : 50 % (≤ 20 salariés) ou 100 % (> 20 salariés)") },
  ],
  payIncreases: [
    { kind: "heures_supplementaires", label: "Heures supplémentaires : 8 premières heures (36e à 43e)", from_h: 35, to_h: 43, period: "semaine", rate: 25, compensation: "paiement_ou_repos", src: "base", from: "1998-09-08", note: cite(I, BASE, "25 % pour les 8 premières heures supplémentaires") },
    { kind: "heures_supplementaires", label: "Heures supplémentaires au-delà de la 8e", from_h: 43, period: "semaine", rate: 50, compensation: "paiement_ou_repos", src: "base", from: "1998-09-08", note: cite(I, BASE, "50 % pour les heures supplémentaires au-delà de la 8e") },
    { kind: "nuit", label: "Travail entre 20 h et 22 h ou entre 5 h et 8 h (officine ouverte au public)", start: "20:00", end: "22:00", rate: 20, src: "base", from: "1998-09-08", note: cite(I, BASE, "majoration horaire de 20 %", "Même majoration de 20 % entre 5 h et 8 h") },
    { kind: "nuit", label: "Travail entre 22 h et 5 h (officine ouverte au public)", start: "22:00", end: "05:00", rate: 40, src: "base", from: "1998-09-08", note: cite(I, BASE, "majoration horaire de 20 %") },
    { kind: "jour_ferie", label: "Jour férié travaillé (hors 1er mai) : repos compensateur de même durée en plus du salaire", rest: 100, compensation: "repos", src: "base", from: "1998-09-08", note: cite(I, BASE, "repos compensateur de même durée", "1er mai travaillé en service de garde : régime des gardes et urgences") },
  ],
  leave: [
    ["mariage_salarie", "Mariage ou Pacs du salarié", 4, 6], ["mariage_enfant", "Mariage d'un enfant", 1, 2], ["mariage_frere_soeur", "Mariage d'un frère ou d'une sœur", 0, 1],
    ["naissance", "Naissance", 3, 3], ["adoption", "Adoption", 3, 3], ["deces_conjoint", "Décès du conjoint, partenaire de Pacs ou concubin", 3, 4],
    ["deces_parent", "Décès du père ou de la mère", 3, 3], ["deces_grand_parent", "Décès d'un grand-parent", 1, 2], ["deces_frere_soeur", "Décès d'un frère ou d'une sœur", 3, 3],
    ["deces_enfant", "Décès d'un enfant ou d'une personne de moins de 25 ans à charge", 7, 7], ["deces_beau_parent", "Décès du beau-père ou de la belle-mère", 3, 3], ["handicap_enfant", "Annonce de la survenue d'un handicap chez l'enfant", 2, 2],
  ].flatMap(([event, label, d0, d1]) => {
    const note = cite(I, BASE, "des congés exceptionnels décomptés en jours ouvrés pour événements familiaux", "Jours ouvrés, sans réduction de rémunération");
    const rows = [];
    if (d0 > 0) rows.push({ kind: "evenement_familial", event, label, days: d0, dayType: "ouvres", src: "base", from: "1998-09-08", note });
    if (d1 !== d0) rows.push({ kind: "evenement_familial", event, label: `${label} (plus de 3 mois d'ancienneté)`, days: d1, seniority: 3, dayType: "ouvres", src: "base", from: "1998-09-08", note });
    return rows;
  }).concat([
    { kind: "enfant_malade", label: "Enfant handicapé de moins de 20 ans : 3 jours rémunérés par an", days: 3, dayType: "ouvres", src: "base", from: "1998-09-08", note: cite(I, BASE, "congé rémunéré de 3 jours par année civile") },
  ]),
  sickPay: [
    { categories: ["agent_maitrise"], seniority: 12, waiting: 3, seq: 1, days: 27, rate: 100, src: "base", from: "1998-09-08", note: cite(I, BASE, "du quatrième au trentième jour d'absence inclus", "Assimilés cadres (coef. 330 à 399) après 1 an : salaire brut maintenu du 4e au 30e jour (dès le 1er jour en AT/MP) ; non-cadres (< 330) et cadres : indemnisation par les régimes de prévoyance de branche (annexe IV)") },
    { type: "accident_travail", categories: ["agent_maitrise"], seniority: 12, waiting: 0, seq: 1, days: 30, rate: 100, src: "base", from: "1998-09-08", note: cite(I, BASE, "du quatrième au trentième jour d'absence inclus", "AT/MP : maintien dès le 1er jour") },
  ],
};
