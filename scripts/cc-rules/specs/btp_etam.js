const { cite } = require("../gen");

/** ETAM du bâtiment (2609) et des travaux publics (2614), conventions du 12 juillet 2006 — règles nationales. */
module.exports = (I, BASE, name, sector) => {
  const regional = "Barèmes de salaires minimaux négociés à l'échelon régional (non intégrés : la région de l'entreprise n'est pas lue sur le bulletin) — le contrôle du minimum utilise le champ manuel des Paramètres";
  const C = (re, comment) => cite(I, BASE, re, comment);
  const from = "2007-07-01";
  const levels = [["A", "employe"], ["B", "employe"], ["C", "technicien"], ["D", "technicien"], ["E", "agent_maitrise"], ["F", "agent_maitrise"], ["G", "agent_maitrise"], ["H", "agent_maitrise"]];
  return {
    idcc: I,
    name,
    header: regional,
    texts: [{ key: "base", ref: BASE, kind: "texte_base", title: name, signed: "2006-07-12", eff: from, notes: regional }],
    classifications: levels.map(([l, category]) => ({
      code: l, label: `ETAM ${sector} — niveau ${l}${l === "H" ? " (assimilé cadre)" : ""}`, category, level: l, aliases: [`Niveau ${l}`, `Niv. ${l}`, `ETAM ${l}`],
      src: "base", from, note: C("classification des employés, techniciens et agents de maîtrise|contenues dans les annexes V et VI", "Classification de l'annexe V (niveaux A à H) ; catégorie indicative"),
    })),
    workingTime: [(() => { try { return { weekly: 35, monthly: 151.67, quota: 145, src: "base", from, note: C("dans la limite de 145 heures", "Contingent de 145 h, porté à 180 h (+35 h) si l'horaire n'est pas annualisé ; majorations légales des heures supplémentaires") }; } catch { return { weekly: 35, monthly: 151.67, src: "base", from, note: C("majorées conformément aux dispositions légales", "Durée légale 35 h ; contingent : accord de branche sur la durée du travail des travaux publics") }; } })()],
    payIncreases: [
      { kind: "heures_supplementaires", label: "Heures supplémentaires : 8 premières heures (taux légal auquel la convention renvoie)", from_h: 35, to_h: 43, period: "semaine", rate: 25, src: "base", from, note: C("majorées conformément aux dispositions légales", "Renvoi aux taux légaux (C. trav. L. 3121-36)") },
      { kind: "heures_supplementaires", label: "Heures supplémentaires au-delà de la 8e (taux légal)", from_h: 43, period: "semaine", rate: 50, src: "base", from, note: C("majorées conformément aux dispositions légales") },
      { kind: "nuit", label: "Travail exceptionnel de nuit (20 h – 6 h)", start: "20:00", end: "06:00", rate: 100, src: "base", from, note: C("sont majorées de 100 %", "Non cumulable avec les majorations d'heures supplémentaires : seul le taux le plus élevé s'applique") },
      { kind: "dimanche", label: "Travail exceptionnel le dimanche", rate: 100, src: "base", from, note: C("sont majorées de 100 %") },
      { kind: "jour_ferie", label: "Travail exceptionnel un jour férié", rate: 100, src: "base", from, note: C("sont majorées de 100 %") },
    ],
    bonuses: [
      { kind: "prime_vacances", label: "Prime de vacances : 30 % de l'indemnité de congés correspondant à 24 jours ouvrables (caisse de congés payés du BTP)", rate: 30, base: "indemnite_conges_payes", presence: "6 mois de présence dans une ou plusieurs entreprises du BTP", src: "base", from, note: C("prime de vacances égale à 30 %") },
    ],
    leave: [
      { kind: "conges_anciennete", label: "Congé d'ancienneté : 2 jours ouvrables (plus de 5 ans dans l'entreprise ou plus de 10 ans dans le BTP)", seniority: 60, days: 2, src: "base", from, note: C("jours de congés payés supplémentaires d'ancienneté") },
      { kind: "conges_anciennete", label: "Congé d'ancienneté : 3 jours ouvrables (plus de 10 ans dans l'entreprise ou plus de 20 ans dans le BTP)", seniority: 120, days: 3, src: "base", from, note: C("jours de congés payés supplémentaires d'ancienneté") },
      ...[
        ["mariage_salarie", "Mariage du salarié", 4], ["pacs_salarie", "Pacs du salarié", 3], ["mariage_enfant", "Mariage d'un enfant", 1],
        ["deces_conjoint", "Obsèques du conjoint marié ou pacsé", 3], ["deces_enfant", "Obsèques d'un enfant", 3], ["deces_parent", "Obsèques du père ou de la mère", 3],
        ["deces_famille", "Obsèques d'un grand-parent, beau-parent, frère, sœur, beau-frère, belle-sœur ou petit-enfant", 1], ["naissance_adoption", "Naissance ou arrivée d'un enfant en vue de son adoption", 3],
      ].map(([event, label, days]) => ({ kind: "evenement_familial", event, label, days, src: "base", from, note: C("autorisations d'absence exceptionnelles non déductibles", "Minimums conventionnels ; les durées légales plus favorables s'appliquent") })),
    ],
    sickPay: [
      { seniority: 12, waiting: 0, seq: 1, days: 90, rate: 100, src: "base", from, note: C("Pendant les 90 premiers jours", "Maladie/accident non professionnels : après 1 an dans l'entreprise (ou 5 ans dans le BTP), appointements maintenus 90 jours dès le 1er jour, IJSS déduites ; au-delà, régime de prévoyance ; 90 jours au total par année civile") },
      { type: "accident_travail", seniority: 0, waiting: 0, seq: 1, days: 90, rate: 100, src: "base", from, note: C("Pendant les 90 premiers jours", "AT/MP : sans condition d'ancienneté") },
    ],
  };
};
