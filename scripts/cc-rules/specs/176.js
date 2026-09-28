const { cite, table } = require("../gen");
const I = "176";
const BASE = "KALITEXT000039116990", S25 = "KALITEXT000051163120", S26 = "KALITEXT000053721378";
const rows = (t, re) => table(I, t, re).filter((r) => typeof r[1] === "number" && typeof r[2] === "number" && /^\d/.test(String(r[0])));
const g25 = rows(S25, "SMC au 1er janvier 2025 \\|?"), g26 = rows(S26, "valeur du point, soit 9,36");
const g26a = table(I, S26, "grille différenciée").filter((r) => typeof r[2] === "number");
const g25a = table(I, S25, "grille différenciée").filter((r) => typeof r[2] === "number");
const group = (code) => parseInt(code, 10);
const cat = (code) => { const g = group(code); return g <= 3 ? "employe" : g <= 5 ? "technicien" : g === 6 ? "agent_maitrise" : "cadre"; };
const aliases = (code) => code.split("/").flatMap((c) => { const m = c.match(/^(\d+)([A-C])?$/); return m ? [`Groupe ${m[1]}${m[2] ? ` niveau ${m[2]}` : ""}`, `Groupe ${c}`, c] : [c]; });
const smic = "Clause SMIC (art. 2) : si le SMIC dépasse le SMC des groupes 1A à 2A, leur SMC est porté à celui du groupe supérieur (1C/2A puis 2B)";

module.exports = {
  idcc: I,
  name: "Industrie pharmaceutique",
  texts: [
    { key: "base", ref: BASE, kind: "texte_base", title: "Convention collective nationale de l'industrie pharmaceutique du 6 avril 1956 (mise à jour par accord du 11 avril 2019)", signed: "2019-04-11", ext: "2021-07-13", eff: "2021-08-01" },
    { key: "s25", ref: S25, kind: "avenant_salaires", signed: "2024-11-14", eff: "2025-01-01", notes: "SMC = 1 741,5515 + 9,2503 × points" },
    { key: "s26", ref: S26, kind: "avenant_salaires", signed: "2025-11-13", eff: "2026-01-01", notes: "SMC = 1 762,45 + 9,36 × points ; " + smic },
  ],
  classifications: g26.map(([code, points]) => ({
    code: String(code), label: `Groupe ${code} (${points} points)`, category: cat(String(code)), level: String(group(String(code))), coefficient: points, aliases: aliases(String(code)),
    src: "s26", from: "2021-08-01", note: cite(I, S26, "valeur du point, soit 9,36", "Groupes et niveaux de l'avenant I ; catégorie indicative (groupes 1-5 non-cadres, 6 maîtrise, 7 à 11 cadres)"),
  })),
  minimums: [
    ...g25.map(([code, , amount]) => ({ code: String(code), amount, unit: "mensuel", hours: 151.67, src: "s25", from: "2025-01-01", to: "2026-01-01", note: cite(I, S25, "grille différenciée|y = a \\+ bx", "SMC pour 151,67 h") })),
    ...g25a.slice(0, 3).map(([code, , amount]) => ({ code: String(code), amount, unit: "mensuel", hours: 151.67, seniority: 18, src: "s25", from: "2025-01-01", to: "2026-01-01", note: cite(I, S25, "grille différenciée", "SMC à partir de 18 mois d'ancienneté") })),
    ...g26.map(([code, , amount]) => ({ code: String(code), amount, unit: "mensuel", hours: 151.67, src: "s26", from: "2026-01-01", note: cite(I, S26, "valeur du point, soit 9,36", "SMC pour 151,67 h ; " + smic) })),
    ...g26a.slice(0, 3).map(([code, , amount]) => ({ code: String(code), amount, unit: "mensuel", hours: 151.67, seniority: 18, src: "s26", from: "2026-01-01", note: cite(I, S26, "grille différenciée", "SMC à partir de 18 mois d'ancienneté") })),
  ],
  seniority: [[36, 3], [72, 6], [108, 9], [144, 12], [180, 15], [216, 18]].map(([months, rate]) => ({
    categories: ["employe", "technicien"], months, rate, base: "minimum_conventionnel", src: "base", from: "2021-08-01",
    definition: "Groupes 1 à 5 (groupe 6 : clause de sauvegarde individuelle) ; calculée sur le salaire minimum de l'emploi, au prorata des heures effectives ; décompte spécial à chaque paie",
    note: cite(I, BASE, "les taux de la prime d'ancienneté sont de 3 %", `${rate} % après ${months / 12} ans`),
  })),
  workingTime: [{ weekly: 35, monthly: 151.67, src: "base", from: "2021-08-01", note: cite(I, BASE, "25 % du salaire de l'intéressé pour les 8 premières heures") }],
  payIncreases: [
    { kind: "heures_supplementaires", label: "Heures supplémentaires : 8 premières heures", from_h: 35, to_h: 43, period: "semaine", rate: 25, src: "base", from: "2021-08-01", note: cite(I, BASE, "25 % du salaire de l'intéressé pour les 8 premières heures") },
    { kind: "heures_supplementaires", label: "Heures supplémentaires au-delà de la 8e", from_h: 43, period: "semaine", rate: 50, src: "base", from: "2021-08-01", note: cite(I, BASE, "25 % du salaire de l'intéressé pour les 8 premières heures") },
    { kind: "nuit", label: "Heures de nuit (21 h – 6 h) d'un salarié non travailleur de nuit", start: "21:00", end: "06:00", rate: 25, src: "base", from: "2021-08-01", note: cite(I, BASE, "ne peut être inférieure à 25 % du montant du salaire", "Panier de nuit : 1,5 × minimum garanti pour un poste encadrant minuit ; non cumulable avec dimanche/férié") },
    { kind: "dimanche", label: "Heure travaillée le dimanche hors horaire habituel", rate: 25, src: "base", from: "2021-08-01", note: cite(I, BASE, "Toute heure de travail effectuée le dimanche") },
    { kind: "jour_ferie", label: "Heure travaillée un jour férié (hors 1er mai)", rate: 25, src: "base", from: "2021-08-01", note: cite(I, BASE, "Toute heure de travail effectuée un jour férié") },
    { kind: "premier_mai", label: "Travail le 1er mai", rate: 100, src: "base", from: "2021-08-01", note: cite(I, BASE, "Toute heure de travail effectuée un jour férié") },
  ],
  allowances: [{ kind: "panier", label: "Indemnité de panier de nuit (poste encadrant minuit)", amount: 0, mg: 150, unit: "par_nuit", src: "base", from: "2021-08-01", note: cite(I, BASE, "indemnité de panier de nuit fixée à une fois et demie") }],
  leave: [
    ["mariage_salarie", "Mariage ou Pacs du salarié", 5], ["mariage_enfant", "Mariage d'un enfant", 1], ["deces_enfant", "Décès d'un enfant", 5],
    ["deces_conjoint", "Décès du conjoint, partenaire de Pacs ou concubin", 5], ["deces_parent", "Décès du père, de la mère, des beaux-parents, d'un frère ou d'une sœur", 3],
    ["deces_grand_parent", "Décès d'un grand-parent", 1], ["naissance_adoption", "Naissance ou arrivée d'un enfant en vue de son adoption", 3],
    ["handicap_enfant", "Annonce de la survenue d'un handicap chez un enfant", 2], ["demenagement", "Déménagement (1 fois par an)", 1],
  ].map(([event, label, days]) => ({ kind: "evenement_familial", event, label, days, dayType: "ouvres", src: "base", from: "2021-08-01", note: cite(I, BASE, "congés rémunérés pour événements familiaux") }))
    .concat([{ kind: "enfant_malade", label: "Enfant malade de moins de 16 ans : 1 jour payé par an et par enfant, 3 jours maximum", days: 3, dayType: "ouvres", src: "base", from: "2021-08-01", note: cite(I, BASE, "autorisation d'absence payée sur justificatif est fixée à 1 jour") }]),
  sickPay: [
    { seniority: 12, waiting: 0, seq: 1, days: 90, rate: 100, rateBase: "net", period: 12, src: "base", from: "2021-08-01", note: cite(I, BASE, "l'employeur est tenu de payer à l'intéressé son salaire net mensuel pendant les 90 premiers", "Après 1 an : salaire net maintenu 90 jours calendaires par année civile, IJSS déduites ; réouverture après 2 mois de reprise si droits épuisés") },
    { type: "accident_travail", seniority: 12, waiting: 0, seq: 1, days: 90, rate: 100, rateBase: "net", src: "base", from: "2021-08-01", note: cite(I, BASE, "maintien de salaire pendant une durée maximale de 90 jours calendaires par arrêt", "AT/MP : 90 jours par arrêt, sans plafond annuel") },
    { type: "maternite", seniority: 12, waiting: 0, seq: 1, days: 112, rate: 100, rateBase: "net", src: "base", from: "2021-08-01", note: cite(I, BASE, "En cas d'accouchement d'une salariée ayant 1 année", "Salaire net maintenu pendant la durée légale du congé de maternité (16 semaines dans le cas général), IJSS déduites") },
    { type: "paternite", seniority: 12, waiting: 0, seq: 1, days: 25, rate: 100, rateBase: "net", src: "base", from: "2021-08-01", note: cite(I, BASE, "Le père ayant 1 année d'ancienneté", "Salaire net maintenu pendant le congé de paternité (25 jours dans le cas général), IJSS déduites") },
  ],
};
