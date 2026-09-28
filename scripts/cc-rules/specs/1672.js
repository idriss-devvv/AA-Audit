const { cite, table } = require("../gen");
const I = "1672";
const BASE = "KALITEXT000005654646", S25 = "KALITEXT000052226828", S26 = "KALITEXT000054887698";
const rma = (t, re) => table(I, t, re).filter((r) => typeof r[0] === "number" && typeof r[1] === "number");
const g25 = rma(S25, "Classes"), g26 = rma(S26, "Rémunérations minimales annuelles à effet");
const cat = (c) => (c <= 3 ? "employe" : c === 4 ? "agent_maitrise" : "cadre");
const nonEtendu = "Protocole non étendu : obligatoire pour les entreprises adhérentes de France Assureurs (organisation signataire)";
const structure = "RMA annuelle brute comparée à l'ensemble des éléments du salaire effectif de l'année (hors prime d'expérience, diplômes, éléments exceptionnels, heures au-delà de la durée annuelle, remboursements de frais) ; structure de référence : 12 mensualités + 13e mois + prime de vacances de 50 % d'une mensualité — contrôle mensuel indicatif sur 14 mensualités";

module.exports = {
  idcc: I,
  name: "Sociétés d'assurances",
  texts: [
    { key: "base", ref: BASE, kind: "texte_base", title: "Convention collective nationale des sociétés d'assurances du 27 mai 1992", signed: "1992-05-27", eff: "1992-07-01" },
    { key: "s25", ref: S25, kind: "protocole", signed: "2025-06-16", eff: "2025-01-01", notes: nonEtendu },
    { key: "s26", ref: S26, kind: "protocole", signed: "2026-06-10", eff: "2026-01-01", notes: nonEtendu },
  ],
  classifications: g26.map(([c]) => ({
    code: `CLASSE-${c}`, label: `Classe ${c}`, category: cat(c), level: String(c), aliases: [`Classe ${c}`, `Cl. ${c}`, `Classe ${["", "I", "II", "III", "IV", "V", "VI", "VII"][c]}`],
    src: "base", from: "1992-07-01", note: cite(I, BASE, "le premier collège comprend les salariés exerçant des fonctions relevant des classes 1, 2, 3 et 4", "Classes 1 à 4 : non-cadres (catégorie indicative : 1-3 employés, 4 agents de maîtrise) ; classes 5 à 7 : cadres"),
  })),
  minimums: [
    ...g25.map(([c, amount]) => ({ code: `CLASSE-${c}`, amount, unit: "annuel", divisor: 14, base: "remuneration_annuelle", src: "s25", from: "2025-01-01", to: "2026-01-01", note: cite(I, S25, "Classes", "RMA 2025 — " + structure) })),
    ...g26.map(([c, amount]) => ({ code: `CLASSE-${c}`, amount, unit: "annuel", divisor: 14, base: "remuneration_annuelle", src: "s26", from: "2026-01-01", note: cite(I, S26, "Rémunérations minimales annuelles à effet", "RMA 2026 — " + structure) })),
  ],
  seniority: [
    ["CLASSE-1", 20], ["CLASSE-2", 15], ["CLASSE-3", 10], ["CLASSE-4", 5],
  ].map(([code, maxYears]) => ({
    codes: [code], months: 36, rate: 1, base: "minimum_conventionnel", src: "base", from: "1992-07-01",
    definition: `Prime d'expérience : 1 % de la RMA de la classe par année de présence effective, à partir du mois suivant la 3e année révolue, dans la limite de ${maxYears} années ; exclue de la vérification de la RMA`,
    note: cite(I, BASE, "Une prime prenant en compte les acquis d'expérience", `Classe ${code.slice(-1)} : plafond de ${maxYears} années`),
  })),
  bonuses: [
    { kind: "treizieme_mois", label: "13e mois (structure de référence)", rate: 100, base: "salaire_base", months: [12], inMinimum: true, src: "base", from: "1992-07-01", note: cite(I, BASE, "douze mensualités auxquelles s'ajoutent un treizième mois", "Structure modifiable par accord d'entreprise ; pris en compte pour la RMA") },
    { kind: "prime_vacances", label: "Prime de vacances égale à 50 % d'une mensualité (structure de référence)", rate: 50, base: "salaire_base", inMinimum: true, src: "base", from: "1992-07-01", note: cite(I, BASE, "douze mensualités auxquelles s'ajoutent un treizième mois") },
  ],
  leave: [
    { kind: "conges_anciennete", label: "Congé anniversaire : année du 10e anniversaire d'entrée", seniority: 120, days: 5, dayType: "ouvres", src: "base", from: "1992-07-01", note: cite(I, BASE, "année du 10e anniversaire") },
    { kind: "conges_anciennete", label: "Congé anniversaire : année du 20e anniversaire d'entrée", seniority: 240, days: 10, dayType: "ouvres", src: "base", from: "1992-07-01", note: cite(I, BASE, "année du 10e anniversaire") },
    { kind: "conges_anciennete", label: "Congé anniversaire : année du 30e anniversaire d'entrée", seniority: 360, days: 15, dayType: "ouvres", src: "base", from: "1992-07-01", note: cite(I, BASE, "année du 10e anniversaire") },
    { kind: "evenement_familial", event: "mariage_salarie", label: "Mariage du salarié (congé légal porté à 5 jours ouvrés)", seniority: 12, days: 5, dayType: "ouvres", src: "base", from: "1992-07-01", note: cite(I, BASE, "porté à 5 jours ouvrés", "Condition de présence de 12 mois (3 mois si 12 mois dans la branche au cours des 5 dernières années)") },
    { kind: "evenement_familial", event: "mariage_frere_soeur", label: "Mariage d'un frère ou d'une sœur du salarié ou de son conjoint", seniority: 12, days: 1, dayType: "ouvres", src: "base", from: "1992-07-01", note: cite(I, BASE, "porté à 5 jours ouvrés") },
    { kind: "evenement_familial", event: "deces_beau_frere_soeur", label: "Décès d'un frère ou d'une sœur du conjoint", seniority: 12, days: 1, dayType: "ouvres", src: "base", from: "1992-07-01", note: cite(I, BASE, "porté à 5 jours ouvrés") },
    { kind: "enfant_malade", label: "Maladie d'enfants de moins de 12 ans : 3 jours rémunérés par an minimum", seniority: 12, days: 3, dayType: "ouvres", src: "base", from: "1992-07-01", note: cite(I, BASE, "3 jours par an en cas de maladie", "Plus 1 jour pour la rentrée scolaire d'enfants de moins de 7 ans") },
  ],
  sickPay: [
    { seniority: 12, waiting: 0, seq: 1, days: 90, rate: 100, rateBase: "net", src: "base", from: "1992-07-01", note: cite(I, BASE, "Pendant les trois premiers mois de son arrêt de travail", "Après 12 mois de présence (3 mois sous condition) : complément jusqu'au salaire net mensuel pendant 3 mois (même maladie : 3 mois par année civile) ; au-delà, régime professionnel de prévoyance") },
  ],
};
