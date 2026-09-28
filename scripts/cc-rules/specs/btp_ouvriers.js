const { cite } = require("../gen");

/** Bâtiment ouvriers (1596 : jusqu'à 10 salariés ; 1597 : plus de 10 salariés) — règles nationales. */
module.exports = (I, BASE, name, signed) => {
  const regional = "Salaires minimaux fixés par accords régionaux (non intégrés : la région de l'entreprise n'est pas lue sur le bulletin) — le contrôle du minimum utilise le champ manuel des Paramètres";
  const C = (re, comment) => cite(I, BASE, re, comment);
  return {
    idcc: I,
    name,
    header: regional,
    texts: [{ key: "base", ref: BASE, kind: "texte_base", title: name, signed, eff: signed, notes: regional }],
    classifications: [
      ["N1-P1", "Niveau I position 1", "I", "1", 150], ["N1-P2", "Niveau I position 2", "I", "2", 170], ["N2", "Niveau II", "II", null, 185],
      ["N3-P1", "Niveau III position 1", "III", "1", 210], ["N3-P2", "Niveau III position 2", "III", "2", 230],
      ["N4-P1", "Niveau IV position 1 (maître-ouvrier / chef d'équipe)", "IV", "1", 250], ["N4-P2", "Niveau IV position 2 (maître-ouvrier / chef d'équipe)", "IV", "2", 270],
    ].map(([code, label, level, step, coefficient]) => ({
      code, label, category: "ouvrier", level, step, coefficient,
      aliases: [`Niveau ${level}${step ? ` position ${step}` : ""}`, `N${level}${step ? `P${step}` : ""}`, `Coefficient ${coefficient}`, `Coef. ${coefficient}`],
      src: "base", from: signed, note: C("Position 1 : 150", "Classification nationale du 12 juillet 1990 (coefficients hiérarchiques)"),
    })),
    workingTime: [{ weekly: 35, monthly: 151.67, quota: 145, src: "base", from: signed, note: C("limite de 145 heures", "Contingent de 145 h, porté à 180 h (+35 h) si l'horaire n'est pas annualisé") }],
    payIncreases: [
      { kind: "heures_supplementaires", label: "Heures supplémentaires : 8 premières heures (36e à 43e)", from_h: 35, to_h: 43, period: "semaine", rate: 25, src: "base", from: signed, note: C("25 % du salaire horaire effectif pour les 8 premières") },
      { kind: "heures_supplementaires", label: "Heures supplémentaires au-delà de la 8e", from_h: 43, period: "semaine", rate: 50, src: "base", from: signed, note: C("25 % du salaire horaire effectif pour les 8 premières") },
    ],
    bonuses: [
      { kind: "prime_vacances", label: "Prime de vacances : 30 % de l'indemnité de congé correspondant à 24 jours ouvrables (versée par la caisse de congés payés du BTP)", rate: 30, base: "indemnite_conges_payes", presence: "1 675 heures de travail au cours de l'année de référence dans le BTP (maladie non opposable)", src: "base", from: signed, note: C("prime de vacances est de 30 %") },
    ],
    leave: [
      ["mariage_salarie", "Mariage du salarié", 4], ["mariage_enfant", "Mariage d'un enfant", 1], ["deces_conjoint", "Obsèques du conjoint", 3],
      ["deces_enfant", "Obsèques d'un enfant", 3], ["deces_parent", "Obsèques du père ou de la mère", 3],
      ["deces_famille", "Obsèques d'un grand-parent, beau-parent, frère, sœur, beau-frère, belle-sœur ou petit-enfant", 1],
      ["naissance_adoption", "Naissance ou arrivée d'un enfant en vue de son adoption", 3],
    ].map(([event, label, days]) => ({ kind: "evenement_familial", event, label, days, dayType: "ouvrables", src: "base", from: signed, note: C("Se marier : 4 jours", "Minimums conventionnels ; les durées légales plus favorables s'appliquent (C. trav. L. 3142-4)") })),
    sickPay: [
      { seniority: 3, waiting: 3, seq: 1, days: 45, rate: 100, src: "base", from: signed, note: C("délai de (trois|3) jours d'arrêt de travail", "Ancienneté : 3 mois (1 mois si moins de 25 ans ou 750 points CNRO) ; 100 % du 4e au 48e jour puis 75 % jusqu'au 90e ; base 1/30 du dernier salaire mensuel ; 90 jours maximum par année civile ; versé par le régime professionnel (PRO BTP)") },
      { seniority: 3, waiting: 3, seq: 2, days: 42, rate: 75, src: "base", from: signed, note: C("délai de (trois|3) jours d'arrêt de travail", "2e période : 49e au 90e jour") },
      { type: "accident_travail", seniority: 3, waiting: 0, seq: 1, days: 15, rate: 90, src: "base", from: signed, note: C("jusqu'à concurrence de 90 % du salaire", "AT/MP ≤ 30 jours : 90 % du 1er au 15e jour, puis 100 % jusqu'au 30e ; > 30 jours : 100 % du 1er au 90e jour, sans condition d'ancienneté") },
      { type: "accident_travail", seniority: 3, waiting: 0, seq: 2, days: 15, rate: 100, src: "base", from: signed, note: C("jusqu'à concurrence de 90 % du salaire", "16e au 30e jour") },
    ],
  };
};
