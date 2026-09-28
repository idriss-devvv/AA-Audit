-- Critères de vérification de la convention collective IDCC 1596 (Convention collective nationale des ouvriers des entreprises du bâtiment occupant jusqu'à 10 salariés du 8 octobre 1990),
-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).
-- Salaires minimaux fixés par accords régionaux (non intégrés : la région de l'entreprise n'est pas lue sur le bulletin) — le contrôle du minimum utilise le champ manuel des Paramètres

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
(md5('1596-t0')::uuid, '1596', 'texte_base', 'Convention collective nationale des ouvriers des entreprises du bâtiment occupant jusqu''à 10 salariés du 8 octobre 1990', 'KALITEXT000005647125', '1990-10-08'::date, null, '1990-10-08'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005647125', 'Salaires minimaux fixés par accords régionaux (non intégrés : la région de l''entreprise n''est pas lue sur le bulletin) — le contrôle du minimum utilise le champ manuel des Paramètres', '2026-09-28');

with n(k, t) as (values
(0, 'Art. 12-3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778368 — Classification nationale du 12 juillet 1990 (coefficients hiérarchiques)')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1596-c'||v.i)::uuid, '1596', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, case when v.s is null then null else md5('1596-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'N1-P1','Niveau I position 1','ouvrier','I','1',150,array['Niveau I position 1','NIP1','Coefficient 150','Coef. 150'],0,'t0','1990-10-08',null,0),
(1,'N1-P2','Niveau I position 2','ouvrier','I','2',170,array['Niveau I position 2','NIP2','Coefficient 170','Coef. 170'],1,'t0','1990-10-08',null,0),
(2,'N2','Niveau II','ouvrier','II',null,185,array['Niveau II','NII','Coefficient 185','Coef. 185'],2,'t0','1990-10-08',null,0),
(3,'N3-P1','Niveau III position 1','ouvrier','III','1',210,array['Niveau III position 1','NIIIP1','Coefficient 210','Coef. 210'],3,'t0','1990-10-08',null,0),
(4,'N3-P2','Niveau III position 2','ouvrier','III','2',230,array['Niveau III position 2','NIIIP2','Coefficient 230','Coef. 230'],4,'t0','1990-10-08',null,0),
(5,'N4-P1','Niveau IV position 1 (maître-ouvrier / chef d''équipe)','ouvrier','IV','1',250,array['Niveau IV position 1','NIVP1','Coefficient 250','Coef. 250'],5,'t0','1990-10-08',null,0),
(6,'N4-P2','Niveau IV position 2 (maître-ouvrier / chef d''équipe)','ouvrier','IV','2',270,array['Niveau IV position 2','NIVP2','Coefficient 270','Coef. 270'],6,'t0','1990-10-08',null,0)
) as v(i, code, label, category, level, step, coefficient, aliases, sort_order, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 5-25 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778313')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1596-b'||v.i)::uuid, '1596', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, case when v.s is null then null else md5('1596-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'prime_vacances','Prime de vacances : 30 % de l''indemnité de congé correspondant à 24 jours ouvrables (versée par la caisse de congés payés du BTP)',null,null,30,null,'indemnite_conges_payes',null,0,'1 675 heures de travail au cours de l''année de référence dans le BTP (maladie non opposable)',null,null,null,'t0','1990-10-08',null,0)
) as v(i, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 3-13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778277 — Contingent de 145 h, porté à 180 h (+35 h) si l''horaire n''est pas annualisé')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1596-w'||v.i)::uuid, '1596', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, case when v.s is null then null else md5('1596-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,null,'standard',35,151.67,null,145,null,null,null,null,null,'t0','1990-10-08',null,0)
) as v(i, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 3-17 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778282')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1596-p'||v.i)::uuid, '1596', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, case when v.s is null then null else md5('1596-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'heures_supplementaires','Heures supplémentaires : 8 premières heures (36e à 43e)',null,null,35,43,'semaine',null,null,25,null,null,'paiement',null,'t0','1990-10-08',null,0),
(1,'heures_supplementaires','Heures supplémentaires au-delà de la 8e',null,null,43,null,'semaine',null,null,50,null,null,'paiement',null,'t0','1990-10-08',null,0)
) as v(i, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 5-12 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778305 — Minimums conventionnels ; les durées légales plus favorables s''appliquent (C. trav. L. 3142-4)')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1596-l'||v.i)::uuid, '1596', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, case when v.s is null then null else md5('1596-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'evenement_familial','mariage_salarie','Mariage du salarié',null,null,0,4,'ouvrables',true,'t0','1990-10-08',null,0),
(1,'evenement_familial','mariage_enfant','Mariage d''un enfant',null,null,0,1,'ouvrables',true,'t0','1990-10-08',null,0),
(2,'evenement_familial','deces_conjoint','Obsèques du conjoint',null,null,0,3,'ouvrables',true,'t0','1990-10-08',null,0),
(3,'evenement_familial','deces_enfant','Obsèques d''un enfant',null,null,0,3,'ouvrables',true,'t0','1990-10-08',null,0),
(4,'evenement_familial','deces_parent','Obsèques du père ou de la mère',null,null,0,3,'ouvrables',true,'t0','1990-10-08',null,0),
(5,'evenement_familial','deces_famille','Obsèques d''un grand-parent, beau-parent, frère, sœur, beau-frère, belle-sœur ou petit-enfant',null,null,0,1,'ouvrables',true,'t0','1990-10-08',null,0),
(6,'evenement_familial','naissance_adoption','Naissance ou arrivée d''un enfant en vue de son adoption',null,null,0,3,'ouvrables',true,'t0','1990-10-08',null,0)
) as v(i, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 6-13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778318 — Ancienneté : 3 mois (1 mois si moins de 25 ans ou 750 points CNRO) ; 100 % du 4e au 48e jour puis 75 % jusqu''au 90e ; base 1/30 du dernier salaire mensuel ; 90 jours maximum par année civile ; versé par le régime professionnel (PRO BTP)'),
(1, 'Art. 6-13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778318 — 2e période : 49e au 90e jour'),
(2, 'Art. 6-13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778318 — AT/MP ≤ 30 jours : 90 % du 1er au 15e jour, puis 100 % jusqu''au 30e ; > 30 jours : 100 % du 1er au 90e jour, sans condition d''ancienneté'),
(3, 'Art. 6-13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005778318 — 16e au 30e jour')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1596-k'||v.i)::uuid, '1596', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, case when v.s is null then null else md5('1596-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'maladie',null,null,3,3,1,45,100,'brut',true,12,'t0','1990-10-08',null,0),
(1,'maladie',null,null,3,3,2,42,75,'brut',true,12,'t0','1990-10-08',null,1),
(2,'accident_travail',null,null,3,0,1,15,90,'brut',true,12,'t0','1990-10-08',null,2),
(3,'accident_travail',null,null,3,0,2,15,100,'brut',true,12,'t0','1990-10-08',null,3)
) as v(i, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, s, vf, vt, nk)
left join n on n.k = v.nk;
