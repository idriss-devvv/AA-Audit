-- Appliquée en production le 2026-09-28 sous une forme SQL compacte équivalente (mêmes données, identifiants générés différemment).
-- Critères de vérification de la convention collective IDCC 176 (Industrie pharmaceutique),
-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
(md5('176-t0')::uuid, '176', 'texte_base', 'Convention collective nationale de l''industrie pharmaceutique du 6 avril 1956 (mise à jour par accord du 11 avril 2019)', 'KALITEXT000039116990', '2019-04-11'::date, '2021-07-13'::date, '2021-08-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000039116990', null, '2026-09-28'),
(md5('176-t1')::uuid, '176', 'avenant_salaires', 'Accord du 14 novembre 2024 relatif aux salaires minima conventionnels', 'KALITEXT000051163120', '2024-11-14'::date, null, '2025-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000051163120', 'SMC = 1 741,5515 + 9,2503 × points', '2026-09-28'),
(md5('176-t2')::uuid, '176', 'avenant_salaires', 'Accord du 13 novembre 2025 relatif aux salaires minima conventionnels au 1er janvier 2026', 'KALITEXT000053721378', '2025-11-13'::date, null, '2026-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000053721378', 'SMC = 1 762,45 + 9,36 × points ; Clause SMIC (art. 2) : si le SMIC dépasse le SMC des groupes 1A à 2A, leur SMC est porté à celui du groupe supérieur (1C/2A puis 2B)', '2026-09-28');

with n(k, t) as (values
(0, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053721381 — Groupes et niveaux de l''avenant I ; catégorie indicative (groupes 1-5 non-cadres, 6 maîtrise, 7 à 11 cadres)')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('176-c'||v.i)::uuid, '176', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, case when v.s is null then null else md5('176-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'1A/1B','Groupe 1A/1B (8 points)','employe','1',null,8,array['Groupe 1 niveau A','Groupe 1A','1A','Groupe 1 niveau B','Groupe 1B','1B'],0,'t2','2021-08-01',null,0),
(1,'1C/2A','Groupe 1C/2A (10 points)','employe','1',null,10,array['Groupe 1 niveau C','Groupe 1C','1C','Groupe 2 niveau A','Groupe 2A','2A'],1,'t2','2021-08-01',null,0),
(2,'2B','Groupe 2B (14 points)','employe','2',null,14,array['Groupe 2 niveau B','Groupe 2B','2B'],2,'t2','2021-08-01',null,0),
(3,'2C/3A','Groupe 2C/3A (23 points)','employe','2',null,23,array['Groupe 2 niveau C','Groupe 2C','2C','Groupe 3 niveau A','Groupe 3A','3A'],3,'t2','2021-08-01',null,0),
(4,'3B','Groupe 3B (28 points)','employe','3',null,28,array['Groupe 3 niveau B','Groupe 3B','3B'],4,'t2','2021-08-01',null,0),
(5,'3C/4A','Groupe 3C/4A (46 points)','employe','3',null,46,array['Groupe 3 niveau C','Groupe 3C','3C','Groupe 4 niveau A','Groupe 4A','4A'],5,'t2','2021-08-01',null,0),
(6,'4B','Groupe 4B (54 points)','technicien','4',null,54,array['Groupe 4 niveau B','Groupe 4B','4B'],6,'t2','2021-08-01',null,0),
(7,'4C/5A','Groupe 4C/5A (77 points)','technicien','4',null,77,array['Groupe 4 niveau C','Groupe 4C','4C','Groupe 5 niveau A','Groupe 5A','5A'],7,'t2','2021-08-01',null,0),
(8,'5B','Groupe 5B (88 points)','technicien','5',null,88,array['Groupe 5 niveau B','Groupe 5B','5B'],8,'t2','2021-08-01',null,0),
(9,'5C/6A','Groupe 5C/6A (118 points)','technicien','5',null,118,array['Groupe 5 niveau C','Groupe 5C','5C','Groupe 6 niveau A','Groupe 6A','6A'],9,'t2','2021-08-01',null,0),
(10,'6B','Groupe 6B (132 points)','agent_maitrise','6',null,132,array['Groupe 6 niveau B','Groupe 6B','6B'],10,'t2','2021-08-01',null,0),
(11,'6C','Groupe 6C (169 points)','agent_maitrise','6',null,169,array['Groupe 6 niveau C','Groupe 6C','6C'],11,'t2','2021-08-01',null,0),
(12,'7A','Groupe 7A (183 points)','cadre','7',null,183,array['Groupe 7 niveau A','Groupe 7A','7A'],12,'t2','2021-08-01',null,0),
(13,'7B','Groupe 7B (246 points)','cadre','7',null,246,array['Groupe 7 niveau B','Groupe 7B','7B'],13,'t2','2021-08-01',null,0),
(14,'8A','Groupe 8A (260 points)','cadre','8',null,260,array['Groupe 8 niveau A','Groupe 8A','8A'],14,'t2','2021-08-01',null,0),
(15,'8B','Groupe 8B (335 points)','cadre','8',null,335,array['Groupe 8 niveau B','Groupe 8B','8B'],15,'t2','2021-08-01',null,0),
(16,'9A','Groupe 9A (349 points)','cadre','9',null,349,array['Groupe 9 niveau A','Groupe 9A','9A'],16,'t2','2021-08-01',null,0),
(17,'9B','Groupe 9B (438 points)','cadre','9',null,438,array['Groupe 9 niveau B','Groupe 9B','9B'],17,'t2','2021-08-01',null,0),
(18,'10','Groupe 10 (494 points)','cadre','10',null,494,array['Groupe 10','Groupe 10','10'],18,'t2','2021-08-01',null,0),
(19,'11','Groupe 11 (550 points)','cadre','11',null,550,array['Groupe 11','Groupe 11','11'],19,'t2','2021-08-01',null,0)
) as v(i, code, label, category, level, step, coefficient, aliases, sort_order, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000051163123 — SMC pour 151,67 h'),
(1, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000051163125 — SMC à partir de 18 mois d''ancienneté'),
(2, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053721381 — SMC pour 151,67 h ; Clause SMIC (art. 2) : si le SMIC dépasse le SMC des groupes 1A à 2A, leur SMC est porté à celui du groupe supérieur (1C/2A puis 2B)'),
(3, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053721383 — SMC à partir de 18 mois d''ancienneté')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('176-m'||v.i)::uuid, '176', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, case when v.s is null then null else md5('176-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'1A/1B',1815.55,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(1,'1C/2A',1834.05,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(2,'2B',1871.06,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(3,'2C/3A',1954.31,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(4,'3B',2000.56,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(5,'3C/4A',2167.06,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(6,'4B',2241.07,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(7,'4C/5A',2453.82,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(8,'5B',2555.57,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(9,'5C/6A',2833.08,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(10,'6B',2962.59,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(11,'6C',3304.85,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(12,'7A',3434.35,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(13,'7B',4017.12,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(14,'8A',4146.62,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(15,'8B',4840.39,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(16,'9A',4969.89,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(17,'9B',5793.17,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(18,'10',6311.18,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(19,'11',6829.19,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',0),
(20,'1A/1B',1822.69,'mensuel',null,151.67,'standard',null,18,'salaire_base','t1','2025-01-01','2026-01-01',1),
(21,'1C/2A',1841.27,'mensuel',null,151.67,'standard',null,18,'salaire_base','t1','2025-01-01','2026-01-01',1),
(22,'2B',1878.41,'mensuel',null,151.67,'standard',null,18,'salaire_base','t1','2025-01-01','2026-01-01',1),
(23,'1A/1B',1837.34,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(24,'1C/2A',1856.06,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(25,'2B',1893.51,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(26,'2C/3A',1977.76,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(27,'3B',2024.57,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(28,'3C/4A',2193.07,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(29,'4B',2267.96,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(30,'4C/5A',2483.27,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(31,'5B',2586.24,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(32,'5C/6A',2867.08,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(33,'6B',2998.14,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(34,'6C',3344.51,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(35,'7A',3475.57,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(36,'7B',4065.33,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(37,'8A',4196.39,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(38,'8B',4898.49,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(39,'9A',5029.55,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(40,'9B',5862.7,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(41,'10',6386.93,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(42,'11',6911.17,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-01-01',null,2),
(43,'1A/1B',1844.57,'mensuel',null,151.67,'standard',null,18,'salaire_base','t2','2026-01-01',null,3),
(44,'1C/2A',1863.36,'mensuel',null,151.67,'standard',null,18,'salaire_base','t2','2026-01-01',null,3),
(45,'2B',1900.95,'mensuel',null,151.67,'standard',null,18,'salaire_base','t2','2026-01-01',null,3)
) as v(i, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068 — 3 % après 3 ans'),
(1, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068 — 6 % après 6 ans'),
(2, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068 — 9 % après 9 ans'),
(3, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068 — 12 % après 12 ans'),
(4, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068 — 15 % après 15 ans'),
(5, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068 — 18 % après 18 ans')
)
insert into public.cc_seniority_bonuses (id, idcc_code, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('176-s'||v.i)::uuid, '176', v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.prorata_working_time::boolean, v.seniority_definition::text, case when v.s is null then null else md5('176-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,array['employe','technicien'],null,36,3,null,'minimum_conventionnel',true,'Groupes 1 à 5 (groupe 6 : clause de sauvegarde individuelle) ; calculée sur le salaire minimum de l''emploi, au prorata des heures effectives ; décompte spécial à chaque paie','t0','2021-08-01',null,0),
(1,array['employe','technicien'],null,72,6,null,'minimum_conventionnel',true,'Groupes 1 à 5 (groupe 6 : clause de sauvegarde individuelle) ; calculée sur le salaire minimum de l''emploi, au prorata des heures effectives ; décompte spécial à chaque paie','t0','2021-08-01',null,1),
(2,array['employe','technicien'],null,108,9,null,'minimum_conventionnel',true,'Groupes 1 à 5 (groupe 6 : clause de sauvegarde individuelle) ; calculée sur le salaire minimum de l''emploi, au prorata des heures effectives ; décompte spécial à chaque paie','t0','2021-08-01',null,2),
(3,array['employe','technicien'],null,144,12,null,'minimum_conventionnel',true,'Groupes 1 à 5 (groupe 6 : clause de sauvegarde individuelle) ; calculée sur le salaire minimum de l''emploi, au prorata des heures effectives ; décompte spécial à chaque paie','t0','2021-08-01',null,3),
(4,array['employe','technicien'],null,180,15,null,'minimum_conventionnel',true,'Groupes 1 à 5 (groupe 6 : clause de sauvegarde individuelle) ; calculée sur le salaire minimum de l''emploi, au prorata des heures effectives ; décompte spécial à chaque paie','t0','2021-08-01',null,4),
(5,array['employe','technicien'],null,216,18,null,'minimum_conventionnel',true,'Groupes 1 à 5 (groupe 6 : clause de sauvegarde individuelle) ; calculée sur le salaire minimum de l''emploi, au prorata des heures effectives ; décompte spécial à chaque paie','t0','2021-08-01',null,5)
) as v(i, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('176-w'||v.i)::uuid, '176', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, case when v.s is null then null else md5('176-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,null,'standard',35,151.67,null,null,null,null,null,null,null,'t0','2021-08-01',null,0)
) as v(i, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068'),
(1, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068 — Panier de nuit : 1,5 × minimum garanti pour un poste encadrant minuit ; non cumulable avec dimanche/férié')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('176-p'||v.i)::uuid, '176', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, case when v.s is null then null else md5('176-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'heures_supplementaires','Heures supplémentaires : 8 premières heures',null,null,35,43,'semaine',null,null,25,null,null,'paiement',null,'t0','2021-08-01',null,0),
(1,'heures_supplementaires','Heures supplémentaires au-delà de la 8e',null,null,43,null,'semaine',null,null,50,null,null,'paiement',null,'t0','2021-08-01',null,0),
(2,'nuit','Heures de nuit (21 h – 6 h) d''un salarié non travailleur de nuit',null,null,null,null,null,'21:00','06:00',25,null,null,'paiement',null,'t0','2021-08-01',null,1),
(3,'dimanche','Heure travaillée le dimanche hors horaire habituel',null,null,null,null,null,null,null,25,null,null,'paiement',null,'t0','2021-08-01',null,0),
(4,'jour_ferie','Heure travaillée un jour férié (hors 1er mai)',null,null,null,null,null,null,null,25,null,null,'paiement',null,'t0','2021-08-01',null,0),
(5,'premier_mai','Travail le 1er mai',null,null,null,null,null,null,null,100,null,null,'paiement',null,'t0','2021-08-01',null,0)
) as v(i, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117068')
)
insert into public.cc_allowances (id, idcc_code, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('176-a'||v.i)::uuid, '176', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.zone::text, v.amount::numeric, v.unit::text, v.minimum_garanti_percent::numeric, v.conditions::text, v.social_exemption_limit::numeric, case when v.s is null then null else md5('176-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'panier','Indemnité de panier de nuit (poste encadrant minuit)',null,null,null,0,'par_nuit',150,null,null,'t0','2021-08-01',null,0)
) as v(i, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 27 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117090')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('176-l'||v.i)::uuid, '176', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, case when v.s is null then null else md5('176-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'evenement_familial','mariage_salarie','Mariage ou Pacs du salarié',null,null,0,5,'ouvres',true,'t0','2021-08-01',null,0),
(1,'evenement_familial','mariage_enfant','Mariage d''un enfant',null,null,0,1,'ouvres',true,'t0','2021-08-01',null,0),
(2,'evenement_familial','deces_enfant','Décès d''un enfant',null,null,0,5,'ouvres',true,'t0','2021-08-01',null,0),
(3,'evenement_familial','deces_conjoint','Décès du conjoint, partenaire de Pacs ou concubin',null,null,0,5,'ouvres',true,'t0','2021-08-01',null,0),
(4,'evenement_familial','deces_parent','Décès du père, de la mère, des beaux-parents, d''un frère ou d''une sœur',null,null,0,3,'ouvres',true,'t0','2021-08-01',null,0),
(5,'evenement_familial','deces_grand_parent','Décès d''un grand-parent',null,null,0,1,'ouvres',true,'t0','2021-08-01',null,0),
(6,'evenement_familial','naissance_adoption','Naissance ou arrivée d''un enfant en vue de son adoption',null,null,0,3,'ouvres',true,'t0','2021-08-01',null,0),
(7,'evenement_familial','handicap_enfant','Annonce de la survenue d''un handicap chez un enfant',null,null,0,2,'ouvres',true,'t0','2021-08-01',null,0),
(8,'evenement_familial','demenagement','Déménagement (1 fois par an)',null,null,0,1,'ouvres',true,'t0','2021-08-01',null,0),
(9,'enfant_malade',null,'Enfant malade de moins de 16 ans : 1 jour payé par an et par enfant, 3 jours maximum',null,null,0,3,'ouvres',true,'t0','2021-08-01',null,0)
) as v(i, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 28 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117092 — Après 1 an : salaire net maintenu 90 jours calendaires par année civile, IJSS déduites ; réouverture après 2 mois de reprise si droits épuisés'),
(1, 'Art. 28 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117092 — AT/MP : 90 jours par arrêt, sans plafond annuel'),
(2, 'Art. 29 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117093 — Salaire net maintenu pendant la durée légale du congé de maternité (16 semaines dans le cas général), IJSS déduites'),
(3, 'Art. 29 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039117093 — Salaire net maintenu pendant le congé de paternité (25 jours dans le cas général), IJSS déduites')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('176-k'||v.i)::uuid, '176', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, case when v.s is null then null else md5('176-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'maladie',null,null,12,0,1,90,100,'net',true,12,'t0','2021-08-01',null,0),
(1,'accident_travail',null,null,12,0,1,90,100,'net',true,12,'t0','2021-08-01',null,1),
(2,'maternite',null,null,12,0,1,112,100,'net',true,12,'t0','2021-08-01',null,2),
(3,'paternite',null,null,12,0,1,25,100,'net',true,12,'t0','2021-08-01',null,3)
) as v(i, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, s, vf, vt, nk)
left join n on n.k = v.nk;
