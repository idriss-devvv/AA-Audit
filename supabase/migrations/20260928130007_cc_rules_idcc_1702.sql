-- Critères de vérification de la convention collective IDCC 1702 (Travaux publics — ouvriers),
-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).
-- Salaires minima hiérarchiques fixés chaque année par accords régionaux (valeur du point × coefficient ; non intégrés : la région de l'entreprise n'est pas lue sur le bulletin) — le contrôle du minimum utilise le champ manuel des Paramètres

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
(md5('1702-t0')::uuid, '1702', 'texte_base', 'Convention collective nationale des ouvriers des travaux publics du 15 décembre 1992', 'KALITEXT000005658951', '1992-12-15'::date, null, '1993-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005658951', 'Salaires minima hiérarchiques fixés chaque année par accords régionaux (valeur du point × coefficient ; non intégrés : la région de l''entreprise n''est pas lue sur le bulletin) — le contrôle du minimum utilise le champ manuel des Paramètres', '2026-09-28');

with n(k, t) as (values
(0, 'Art. 12.6 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801869')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1702-c'||v.i)::uuid, '1702', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, case when v.s is null then null else md5('1702-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'N1-P1','Niveau I position 1','ouvrier','I','1',100,array['Niveau I position 1','NIP1','Coefficient 100','Coef. 100'],0,'t0','1993-01-01',null,0),
(1,'N1-P2','Niveau I position 2','ouvrier','I','2',110,array['Niveau I position 2','NIP2','Coefficient 110','Coef. 110'],1,'t0','1993-01-01',null,0),
(2,'N2-P1','Niveau II position 1','ouvrier','II','1',125,array['Niveau II position 1','NIIP1','Coefficient 125','Coef. 125'],2,'t0','1993-01-01',null,0),
(3,'N2-P2','Niveau II position 2','ouvrier','II','2',140,array['Niveau II position 2','NIIP2','Coefficient 140','Coef. 140'],3,'t0','1993-01-01',null,0),
(4,'N3-P1','Niveau III position 1','ouvrier','III','1',150,array['Niveau III position 1','NIIIP1','Coefficient 150','Coef. 150'],4,'t0','1993-01-01',null,0),
(5,'N3-P2','Niveau III position 2','ouvrier','III','2',165,array['Niveau III position 2','NIIIP2','Coefficient 165','Coef. 165'],5,'t0','1993-01-01',null,0),
(6,'N4','Niveau IV','ouvrier','IV',null,180,array['Niveau IV','NIV','Coefficient 180','Coef. 180'],6,'t0','1993-01-01',null,0)
) as v(i, code, label, category, level, step, coefficient, aliases, sort_order, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 5.8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801805')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1702-b'||v.i)::uuid, '1702', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, case when v.s is null then null else md5('1702-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'prime_vacances','Prime de vacances : 30 % de l''indemnité de congé correspondant à 24 jours ouvrables (caisse de congés payés du BTP)',null,null,30,null,'indemnite_conges_payes',null,0,'1 200 heures de travail au cours de l''année de référence dans le BTP (maladie non opposable)',null,null,null,'t0','1993-01-01',null,0)
) as v(i, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 3.8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801764 — Majorations légales des heures supplémentaires ; repos de remplacement possible par accord d''entreprise (125 % / 150 %)')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1702-w'||v.i)::uuid, '1702', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, case when v.s is null then null else md5('1702-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,null,'standard',35,151.67,null,null,null,null,null,null,null,'t0','1993-01-01',null,0)
) as v(i, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 3.8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801764')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1702-p'||v.i)::uuid, '1702', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, case when v.s is null then null else md5('1702-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'heures_supplementaires','Heures supplémentaires : 8 premières heures (taux légal)',null,null,35,43,'semaine',null,null,25,null,null,'paiement_ou_repos',null,'t0','1993-01-01',null,0),
(1,'heures_supplementaires','Heures supplémentaires au-delà de la 8e (taux légal)',null,null,43,null,'semaine',null,null,50,null,null,'paiement_ou_repos',null,'t0','1993-01-01',null,0)
) as v(i, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 5.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027220590 — Minimums conventionnels ; les durées légales plus favorables s''appliquent')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1702-l'||v.i)::uuid, '1702', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, case when v.s is null then null else md5('1702-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'evenement_familial','mariage_salarie','Mariage du salarié',null,null,0,4,'ouvrables',true,'t0','1993-01-01',null,0),
(1,'evenement_familial','pacs_salarie','Pacs du salarié',null,null,0,3,'ouvrables',true,'t0','1993-01-01',null,0),
(2,'evenement_familial','mariage_enfant','Mariage d''un enfant',null,null,0,1,'ouvrables',true,'t0','1993-01-01',null,0),
(3,'evenement_familial','deces_conjoint','Obsèques du conjoint marié ou pacsé',null,null,0,3,'ouvrables',true,'t0','1993-01-01',null,0),
(4,'evenement_familial','deces_enfant','Obsèques d''un enfant',null,null,0,3,'ouvrables',true,'t0','1993-01-01',null,0),
(5,'evenement_familial','deces_parent','Obsèques du père ou de la mère',null,null,0,3,'ouvrables',true,'t0','1993-01-01',null,0),
(6,'evenement_familial','deces_famille','Obsèques d''un grand-parent, beau-parent, frère, sœur, beau-frère, belle-sœur ou petit-enfant',null,null,0,1,'ouvrables',true,'t0','1993-01-01',null,0),
(7,'evenement_familial','naissance_adoption','Naissance ou arrivée d''un enfant en vue de son adoption',null,null,0,3,'ouvrables',true,'t0','1993-01-01',null,0)
) as v(i, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 6.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801811 — Après 1 an d''ancienneté : 100 % du net du 4e au 48e jour, puis 75 % du net jusqu''au 90e jour ; IJSS et prévoyance déduites'),
(1, 'Art. 6.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801811 — 2e période : 49e au 90e jour')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1702-k'||v.i)::uuid, '1702', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, case when v.s is null then null else md5('1702-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'maladie',null,null,12,3,1,45,100,'net',true,12,'t0','2003-01-01',null,0),
(1,'maladie',null,null,12,3,2,42,75,'net',true,12,'t0','2003-01-01',null,1)
) as v(i, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, s, vf, vt, nk)
left join n on n.k = v.nk;
