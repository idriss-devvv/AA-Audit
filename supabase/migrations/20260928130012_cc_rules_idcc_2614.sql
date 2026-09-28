-- Appliquée en production le 2026-09-28 sous une forme SQL compacte équivalente (mêmes données, identifiants générés différemment).
-- Critères de vérification de la convention collective IDCC 2614 (Convention collective nationale des employés, techniciens et agents de maîtrise des travaux publics du 12 juillet 2006),
-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).
-- Barèmes de salaires minimaux négociés à l'échelon régional (non intégrés : la région de l'entreprise n'est pas lue sur le bulletin) — le contrôle du minimum utilise le champ manuel des Paramètres

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
(md5('2614-t0')::uuid, '2614', 'texte_base', 'Convention collective nationale des employés, techniciens et agents de maîtrise des travaux publics du 12 juillet 2006', 'KALITEXT000018926214', '2006-07-12'::date, null, '2007-07-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000018926214', 'Barèmes de salaires minimaux négociés à l''échelon régional (non intégrés : la région de l''entreprise n''est pas lue sur le bulletin) — le contrôle du minimum utilise le champ manuel des Paramètres', '2026-09-28');

with n(k, t) as (values
(0, 'Art. 3.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926265 — Classification de l''annexe V (niveaux A à H) ; catégorie indicative')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2614-c'||v.i)::uuid, '2614', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, case when v.s is null then null else md5('2614-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'A','ETAM travaux publics — niveau A','employe','A',null,null,array['Niveau A','Niv. A','ETAM A'],0,'t0','2007-07-01',null,0),
(1,'B','ETAM travaux publics — niveau B','employe','B',null,null,array['Niveau B','Niv. B','ETAM B'],1,'t0','2007-07-01',null,0),
(2,'C','ETAM travaux publics — niveau C','technicien','C',null,null,array['Niveau C','Niv. C','ETAM C'],2,'t0','2007-07-01',null,0),
(3,'D','ETAM travaux publics — niveau D','technicien','D',null,null,array['Niveau D','Niv. D','ETAM D'],3,'t0','2007-07-01',null,0),
(4,'E','ETAM travaux publics — niveau E','agent_maitrise','E',null,null,array['Niveau E','Niv. E','ETAM E'],4,'t0','2007-07-01',null,0),
(5,'F','ETAM travaux publics — niveau F','agent_maitrise','F',null,null,array['Niveau F','Niv. F','ETAM F'],5,'t0','2007-07-01',null,0),
(6,'G','ETAM travaux publics — niveau G','agent_maitrise','G',null,null,array['Niveau G','Niv. G','ETAM G'],6,'t0','2007-07-01',null,0),
(7,'H','ETAM travaux publics — niveau H (assimilé cadre)','agent_maitrise','H',null,null,array['Niveau H','Niv. H','ETAM H'],7,'t0','2007-07-01',null,0)
) as v(i, code, label, category, level, step, coefficient, aliases, sort_order, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 5.1.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926273')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2614-b'||v.i)::uuid, '2614', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, case when v.s is null then null else md5('2614-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'prime_vacances','Prime de vacances : 30 % de l''indemnité de congés correspondant à 24 jours ouvrables (caisse de congés payés du BTP)',null,null,30,null,'indemnite_conges_payes',null,0,'6 mois de présence dans une ou plusieurs entreprises du BTP',null,null,null,'t0','2007-07-01',null,0)
) as v(i, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 4.1.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926369 — Durée légale 35 h ; contingent : accord de branche sur la durée du travail des travaux publics')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2614-w'||v.i)::uuid, '2614', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, case when v.s is null then null else md5('2614-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,null,'standard',35,151.67,null,null,null,null,null,null,null,'t0','2007-07-01',null,0)
) as v(i, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 4.1.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926369 — Renvoi aux taux légaux (C. trav. L. 3121-36)'),
(1, 'Art. 4.1.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926369'),
(2, 'Art. 4.2.10 (1) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926395 — Non cumulable avec les majorations d''heures supplémentaires : seul le taux le plus élevé s''applique'),
(3, 'Art. 4.2.10 (1) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926395')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2614-p'||v.i)::uuid, '2614', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, case when v.s is null then null else md5('2614-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'heures_supplementaires','Heures supplémentaires : 8 premières heures (taux légal auquel la convention renvoie)',null,null,35,43,'semaine',null,null,25,null,null,'paiement',null,'t0','2007-07-01',null,0),
(1,'heures_supplementaires','Heures supplémentaires au-delà de la 8e (taux légal)',null,null,43,null,'semaine',null,null,50,null,null,'paiement',null,'t0','2007-07-01',null,1),
(2,'nuit','Travail exceptionnel de nuit (20 h – 6 h)',null,null,null,null,null,'20:00','06:00',100,null,null,'paiement',null,'t0','2007-07-01',null,2),
(3,'dimanche','Travail exceptionnel le dimanche',null,null,null,null,null,null,null,100,null,null,'paiement',null,'t0','2007-07-01',null,3),
(4,'jour_ferie','Travail exceptionnel un jour férié',null,null,null,null,null,null,null,100,null,null,'paiement',null,'t0','2007-07-01',null,3)
) as v(i, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 5.1.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926272'),
(1, 'Art. 5.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926282 — Minimums conventionnels ; les durées légales plus favorables s''appliquent')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2614-l'||v.i)::uuid, '2614', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, case when v.s is null then null else md5('2614-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'conges_anciennete',null,'Congé d''ancienneté : 2 jours ouvrables (plus de 5 ans dans l''entreprise ou plus de 10 ans dans le BTP)',null,null,60,2,'ouvrables',true,'t0','2007-07-01',null,0),
(1,'conges_anciennete',null,'Congé d''ancienneté : 3 jours ouvrables (plus de 10 ans dans l''entreprise ou plus de 20 ans dans le BTP)',null,null,120,3,'ouvrables',true,'t0','2007-07-01',null,0),
(2,'evenement_familial','mariage_salarie','Mariage du salarié',null,null,0,4,'ouvrables',true,'t0','2007-07-01',null,1),
(3,'evenement_familial','pacs_salarie','Pacs du salarié',null,null,0,3,'ouvrables',true,'t0','2007-07-01',null,1),
(4,'evenement_familial','mariage_enfant','Mariage d''un enfant',null,null,0,1,'ouvrables',true,'t0','2007-07-01',null,1),
(5,'evenement_familial','deces_conjoint','Obsèques du conjoint marié ou pacsé',null,null,0,3,'ouvrables',true,'t0','2007-07-01',null,1),
(6,'evenement_familial','deces_enfant','Obsèques d''un enfant',null,null,0,3,'ouvrables',true,'t0','2007-07-01',null,1),
(7,'evenement_familial','deces_parent','Obsèques du père ou de la mère',null,null,0,3,'ouvrables',true,'t0','2007-07-01',null,1),
(8,'evenement_familial','deces_famille','Obsèques d''un grand-parent, beau-parent, frère, sœur, beau-frère, belle-sœur ou petit-enfant',null,null,0,1,'ouvrables',true,'t0','2007-07-01',null,1),
(9,'evenement_familial','naissance_adoption','Naissance ou arrivée d''un enfant en vue de son adoption',null,null,0,3,'ouvrables',true,'t0','2007-07-01',null,1)
) as v(i, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 6.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926294 — Maladie/accident non professionnels : après 1 an dans l''entreprise (ou 5 ans dans le BTP), appointements maintenus 90 jours dès le 1er jour, IJSS déduites ; au-delà, régime de prévoyance ; 90 jours au total par année civile'),
(1, 'Art. 6.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000018926294 — AT/MP : sans condition d''ancienneté')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2614-k'||v.i)::uuid, '2614', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, case when v.s is null then null else md5('2614-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'maladie',null,null,12,0,1,90,100,'brut',true,12,'t0','2007-07-01',null,0),
(1,'accident_travail',null,null,0,0,1,90,100,'brut',true,12,'t0','2007-07-01',null,1)
) as v(i, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, s, vf, vt, nk)
left join n on n.k = v.nk;
