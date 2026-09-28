-- Appliquée en production le 2026-09-28 sous une forme SQL compacte équivalente (mêmes données, identifiants générés différemment).
-- Critères de vérification de la convention collective IDCC 2420 (Bâtiment — cadres),
-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).
-- Convention et avenant de salaires non étendus : obligatoires pour les seules entreprises adhérentes d'une organisation signataire

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
(md5('2420-t0')::uuid, '2420', 'texte_base', 'Convention collective nationale des cadres du bâtiment du 1er juin 2004', 'KALITEXT000017941844', '2004-06-01'::date, null, '2004-06-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000017941844', 'Convention et avenant de salaires non étendus : obligatoires pour les seules entreprises adhérentes d''une organisation signataire', '2026-09-28'),
(md5('2420-t1')::uuid, '2420', 'avenant_salaires', 'Avenant n° 75 du 25 janvier 2023 relatif aux appointements minimaux au 1er février 2023', 'KALITEXT000047416384', '2023-01-25'::date, null, '2023-02-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000047416384', 'Appointements minimaux nationaux pour 39 heures hebdomadaires, toutes zones (hiérarchie de la convention du 30 avril 1951) ; Convention et avenant de salaires non étendus : obligatoires pour les seules entreprises adhérentes d''une organisation signataire', '2026-09-28');

with n(k, t) as (values
(0, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000017941911 — Hiérarchie de la convention du 30 avril 1951 (coefficients 60 à 162)')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2420-c'||v.i)::uuid, '2420', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, case when v.s is null then null else md5('2420-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'COEF-60','Cadre — coefficient 60','cadre',null,null,60,array['Coefficient 60','Coef. 60','Coef 60'],0,'t0','2004-06-01',null,0),
(1,'COEF-65','Cadre — coefficient 65','cadre',null,null,65,array['Coefficient 65','Coef. 65','Coef 65'],1,'t0','2004-06-01',null,0),
(2,'COEF-70','Cadre — coefficient 70','cadre',null,null,70,array['Coefficient 70','Coef. 70','Coef 70'],2,'t0','2004-06-01',null,0),
(3,'COEF-75','Cadre — coefficient 75','cadre',null,null,75,array['Coefficient 75','Coef. 75','Coef 75'],3,'t0','2004-06-01',null,0),
(4,'COEF-80','Cadre — coefficient 80','cadre',null,null,80,array['Coefficient 80','Coef. 80','Coef 80'],4,'t0','2004-06-01',null,0),
(5,'COEF-85','Cadre — coefficient 85','cadre',null,null,85,array['Coefficient 85','Coef. 85','Coef 85'],5,'t0','2004-06-01',null,0),
(6,'COEF-90','Cadre — coefficient 90','cadre',null,null,90,array['Coefficient 90','Coef. 90','Coef 90'],6,'t0','2004-06-01',null,0),
(7,'COEF-95','Cadre — coefficient 95','cadre',null,null,95,array['Coefficient 95','Coef. 95','Coef 95'],7,'t0','2004-06-01',null,0),
(8,'COEF-100','Cadre — coefficient 100','cadre',null,null,100,array['Coefficient 100','Coef. 100','Coef 100'],8,'t0','2004-06-01',null,0),
(9,'COEF-103','Cadre — coefficient 103','cadre',null,null,103,array['Coefficient 103','Coef. 103','Coef 103'],9,'t0','2004-06-01',null,0),
(10,'COEF-108','Cadre — coefficient 108','cadre',null,null,108,array['Coefficient 108','Coef. 108','Coef 108'],10,'t0','2004-06-01',null,0),
(11,'COEF-120','Cadre — coefficient 120','cadre',null,null,120,array['Coefficient 120','Coef. 120','Coef 120'],11,'t0','2004-06-01',null,0),
(12,'COEF-130','Cadre — coefficient 130','cadre',null,null,130,array['Coefficient 130','Coef. 130','Coef 130'],12,'t0','2004-06-01',null,0),
(13,'COEF-162','Cadre — coefficient 162','cadre',null,null,162,array['Coefficient 162','Coef. 162','Coef 162'],13,'t0','2004-06-01',null,0)
) as v(i, code, label, category, level, step, coefficient, aliases, sort_order, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047416388 — Appointements minimaux mensuels pour 39 h/semaine, toutes zones ; +10 % en cas de forfait annuel en jours (art. 3.3 de la convention)')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2420-m'||v.i)::uuid, '2420', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, case when v.s is null then null else md5('2420-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'COEF-60',2212,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(1,'COEF-65',2396,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(2,'COEF-70',2573,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(3,'COEF-75',2680,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(4,'COEF-80',2853,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(5,'COEF-85',3004,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(6,'COEF-90',3150,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(7,'COEF-95',3293,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(8,'COEF-100',3404,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(9,'COEF-103',3477,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(10,'COEF-108',3607,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(11,'COEF-120',3944,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(12,'COEF-130',4198,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0),
(13,'COEF-162',5208,'mensuel',null,169,'standard',null,0,'salaire_base','t1','2023-02-01',null,0)
) as v(i, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 4.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000017941875')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2420-b'||v.i)::uuid, '2420', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, case when v.s is null then null else md5('2420-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'prime_vacances','Prime de vacances : 30 % de l''indemnité de congés correspondant à 24 jours ouvrables (caisse de congés payés du BTP)',null,null,30,null,'indemnite_conges_payes',null,0,'6 mois de présence dans une ou plusieurs entreprises du BTP',null,null,null,'t0','2004-06-01',null,0)
) as v(i, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 3.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027456848 — Forfait jours dans la limite légale (218 jours) ; salaire minimum majoré de 10 %')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2420-w'||v.i)::uuid, '2420', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, case when v.s is null then null else md5('2420-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,array['cadre'],null,'forfait_jours',null,null,null,null,218,null,null,null,110,'t0','2004-06-01',null,0)
) as v(i, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 4.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000017941875'),
(1, 'Art. 4.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000017941881 — Minimums conventionnels ; les durées légales plus favorables s''appliquent')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2420-l'||v.i)::uuid, '2420', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, case when v.s is null then null else md5('2420-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'conges_anciennete',null,'Congé d''ancienneté : 2 jours ouvrables (plus de 5 ans dans l''entreprise ou plus de 10 ans dans le BTP)',null,null,60,2,'ouvrables',true,'t0','2004-06-01',null,0),
(1,'conges_anciennete',null,'Congé d''ancienneté : 3 jours ouvrables (plus de 10 ans dans l''entreprise ou plus de 20 ans dans le BTP)',null,null,120,3,'ouvrables',true,'t0','2004-06-01',null,0),
(2,'evenement_familial','mariage_salarie','Mariage du salarié',null,null,0,4,'ouvrables',true,'t0','2004-06-01',null,1),
(3,'evenement_familial','pacs_salarie','Pacs du salarié',null,null,0,3,'ouvrables',true,'t0','2004-06-01',null,1),
(4,'evenement_familial','mariage_enfant','Mariage d''un enfant',null,null,0,1,'ouvrables',true,'t0','2004-06-01',null,1),
(5,'evenement_familial','deces_conjoint','Obsèques du conjoint marié ou pacsé',null,null,0,3,'ouvrables',true,'t0','2004-06-01',null,1),
(6,'evenement_familial','deces_enfant','Obsèques d''un enfant',null,null,0,3,'ouvrables',true,'t0','2004-06-01',null,1),
(7,'evenement_familial','deces_parent','Obsèques du père ou de la mère',null,null,0,3,'ouvrables',true,'t0','2004-06-01',null,1),
(8,'evenement_familial','deces_famille','Obsèques d''un grand-parent, beau-parent, frère, sœur, beau-frère, belle-sœur ou petit-enfant',null,null,0,1,'ouvrables',true,'t0','2004-06-01',null,1),
(9,'evenement_familial','naissance_adoption','Naissance ou arrivée d''un enfant en vue de son adoption',null,null,0,3,'ouvrables',true,'t0','2004-06-01',null,1)
) as v(i, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 5.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000017941886 — Maladie/accident non professionnels : après 1 an dans l''entreprise (ou 5 ans dans le BTP), appointements intégralement maintenus 90 jours, IJSS reversées ; au-delà, prévoyance cadres'),
(1, 'Art. 5.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000017941886 — AT/MP : sans condition d''ancienneté')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('2420-k'||v.i)::uuid, '2420', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, case when v.s is null then null else md5('2420-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'maladie',array['cadre'],null,12,0,1,90,100,'brut',true,12,'t0','2004-06-01',null,0),
(1,'accident_travail',array['cadre'],null,0,0,1,90,100,'brut',true,12,'t0','2004-06-01',null,1)
) as v(i, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, s, vf, vt, nk)
left join n on n.k = v.nk;
