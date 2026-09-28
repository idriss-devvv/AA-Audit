-- Appliquée en production le 2026-09-28 sous une forme SQL compacte équivalente (mêmes données, identifiants générés différemment).
-- Critères de vérification de la convention collective IDCC 1351 (Entreprises de prévention et de sécurité),
-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
(md5('1351-t0')::uuid, '1351', 'texte_base', 'Convention collective nationale des entreprises de prévention et de sécurité du 15 février 1985', 'KALITEXT000005680914', '1985-02-15'::date, '1985-07-30'::date, '1985-08-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005680914', null, '2026-09-28'),
(md5('1351-t1')::uuid, '1351', 'avenant_salaires', 'Accord collectif triennal du 25 septembre 2023 relatif aux revalorisations salariales pour 2024, 2025 et 2026', 'KALITEXT000049067287', '2023-09-25'::date, null, '2024-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000049067287', 'Revalorisations +5 % (entrée en vigueur), +3,2 % au 01/01/2025, +2,8 % au 01/01/2026', '2026-09-28'),
(md5('1351-t2')::uuid, '1351', 'annexe', 'Annexe IV : Agents d''exploitation, employés administratifs et techniciens ', 'KALITEXT000005680928', null, null, '1985-08-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005680928', null, '2026-09-28'),
(md5('1351-t3')::uuid, '1351', 'annexe', 'Annexe  V : Agents de maîtrise ', 'KALITEXT000005680930', null, null, '1985-08-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005680930', null, '2026-09-28'),
(md5('1351-t4')::uuid, '1351', 'annexe', 'Annexe  VI : Cadres ', 'KALITEXT000005680932', null, null, '1985-08-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005680932', null, '2026-09-28'),
(md5('1351-t5')::uuid, '1351', 'avenant', 'Avenant du 25 septembre 2001 relatif au travail de nuit ', 'KALITEXT000005680940', '2001-09-25'::date, null, '2002-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005680940', null, '2026-09-28'),
(md5('1351-t6')::uuid, '1351', 'accord', 'Accord du 29 octobre 2003 relatif aux modalités de rémunération du travail du dimanche ', 'KALITEXT000005680974', '2003-10-29'::date, null, '2004-07-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005680974', null, '2026-09-28');

with n(k, t) as (values
(0, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000049067305 — Grille au 01/01/2026, base 151,67 h')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1351-c'||v.i)::uuid, '1351', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, case when v.s is null then null else md5('1351-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'EMP-120','Agent d''exploitation / employé / technicien — niveau 2 échelon 2 (coef. 120)','employe','2','2',120,array['Coefficient 120','Coef. 120','Coef 120'],0,'t1','2024-01-01',null,0),
(1,'EMP-130','Agent d''exploitation / employé / technicien — niveau 3 échelon 1 (coef. 130)','employe','3','1',130,array['Coefficient 130','Coef. 130','Coef 130'],1,'t1','2024-01-01',null,0),
(2,'EMP-140','Agent d''exploitation / employé / technicien — niveau 3 échelon 2 (coef. 140)','employe','3','2',140,array['Coefficient 140','Coef. 140','Coef 140'],2,'t1','2024-01-01',null,0),
(3,'EMP-150','Agent d''exploitation / employé / technicien — niveau 3 échelon 3 (coef. 150)','employe','3','3',150,array['Coefficient 150','Coef. 150','Coef 150'],3,'t1','2024-01-01',null,0),
(4,'EMP-160','Agent d''exploitation / employé / technicien — niveau 4 échelon 1 (coef. 160)','technicien','4','1',160,array['Coefficient 160','Coef. 160','Coef 160'],4,'t1','2024-01-01',null,0),
(5,'EMP-175','Agent d''exploitation / employé / technicien — niveau 4 échelon 2 (coef. 175)','technicien','4','2',175,array['Coefficient 175','Coef. 175','Coef 175'],5,'t1','2024-01-01',null,0),
(6,'EMP-190','Agent d''exploitation / employé / technicien — niveau 4 échelon 3 (coef. 190)','technicien','4','3',190,array['Coefficient 190','Coef. 190','Coef 190'],6,'t1','2024-01-01',null,0),
(7,'EMP-210','Agent d''exploitation / employé / technicien — niveau 5 échelon 1 (coef. 210)','technicien','5','1',210,array['Coefficient 210','Coef. 210','Coef 210'],7,'t1','2024-01-01',null,0),
(8,'EMP-230','Agent d''exploitation / employé / technicien — niveau 5 échelon 2 (coef. 230)','technicien','5','2',230,array['Coefficient 230','Coef. 230','Coef 230'],8,'t1','2024-01-01',null,0),
(9,'EMP-250','Agent d''exploitation / employé / technicien — niveau 5 échelon 3 (coef. 250)','technicien','5','3',250,array['Coefficient 250','Coef. 250','Coef 250'],9,'t1','2024-01-01',null,0),
(10,'AM-150','Agent de maîtrise — niveau 1 échelon 1 (coef. 150)','agent_maitrise','1','1',150,array['Coefficient 150','Coef. 150','Coef 150'],10,'t1','2024-01-01',null,0),
(11,'AM-160','Agent de maîtrise — niveau 1 échelon 2 (coef. 160)','agent_maitrise','1','2',160,array['Coefficient 160','Coef. 160','Coef 160'],11,'t1','2024-01-01',null,0),
(12,'AM-170','Agent de maîtrise — niveau 1 échelon 3 (coef. 170)','agent_maitrise','1','3',170,array['Coefficient 170','Coef. 170','Coef 170'],12,'t1','2024-01-01',null,0),
(13,'AM-185','Agent de maîtrise — niveau 2 échelon 1 (coef. 185)','agent_maitrise','2','1',185,array['Coefficient 185','Coef. 185','Coef 185'],13,'t1','2024-01-01',null,0),
(14,'AM-200','Agent de maîtrise — niveau 2 échelon 2 (coef. 200)','agent_maitrise','2','2',200,array['Coefficient 200','Coef. 200','Coef 200'],14,'t1','2024-01-01',null,0),
(15,'AM-215','Agent de maîtrise — niveau 2 échelon 3 (coef. 215)','agent_maitrise','2','3',215,array['Coefficient 215','Coef. 215','Coef 215'],15,'t1','2024-01-01',null,0),
(16,'AM-235','Agent de maîtrise — niveau 3 échelon 1 (coef. 235)','agent_maitrise','3','1',235,array['Coefficient 235','Coef. 235','Coef 235'],16,'t1','2024-01-01',null,0),
(17,'AM-255','Agent de maîtrise — niveau 3 échelon 2 (coef. 255)','agent_maitrise','3','2',255,array['Coefficient 255','Coef. 255','Coef 255'],17,'t1','2024-01-01',null,0),
(18,'AM-275','Agent de maîtrise — niveau 3 échelon 3 (coef. 275)','agent_maitrise','3','3',275,array['Coefficient 275','Coef. 275','Coef 275'],18,'t1','2024-01-01',null,0),
(19,'CAD-300','Ingénieur et cadre — position I (coef. 300)','cadre','I',null,300,array['Coefficient 300','Coef. 300','Coef 300'],19,'t1','2024-01-01',null,0),
(20,'CAD-400','Ingénieur et cadre — position II-A (coef. 400)','cadre','II','A',400,array['Coefficient 400','Coef. 400','Coef 400'],20,'t1','2024-01-01',null,0),
(21,'CAD-470','Ingénieur et cadre — position II-B (coef. 470)','cadre','II','B',470,array['Coefficient 470','Coef. 470','Coef 470'],21,'t1','2024-01-01',null,0),
(22,'CAD-530','Ingénieur et cadre — position III-A (coef. 530)','cadre','III','A',530,array['Coefficient 530','Coef. 530','Coef 530'],22,'t1','2024-01-01',null,0),
(23,'CAD-620','Ingénieur et cadre — position III-B (coef. 620)','cadre','III','B',620,array['Coefficient 620','Coef. 620','Coef 620'],23,'t1','2024-01-01',null,0),
(24,'CAD-800','Ingénieur et cadre — position III-C (coef. 800)','cadre','III','C',800,array['Coefficient 800','Coef. 800','Coef 800'],24,'t1','2024-01-01',null,0)
) as v(i, code, label, category, level, step, coefficient, aliases, sort_order, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000049067303 — Grille à la date d''entrée en vigueur (au plus tôt le 01/01/2024), base 151,67 h'),
(1, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000049067304 — Grille au 01/01/2025, base 151,67 h'),
(2, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000049067305 — Grille au 01/01/2026, base 151,67 h')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1351-m'||v.i)::uuid, '1351', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, case when v.s is null then null else md5('1351-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'EMP-120',1775.72,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(1,'EMP-120',1832.54,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(2,'EMP-120',1883.85,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(3,'EMP-130',1798.99,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(4,'EMP-130',1856.56,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(5,'EMP-130',1908.54,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(6,'EMP-140',1852.95,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(7,'EMP-140',1912.24,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(8,'EMP-140',1965.78,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(9,'EMP-150',1922.27,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(10,'EMP-150',1983.78,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(11,'EMP-150',2039.33,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(12,'EMP-160',2028.56,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(13,'EMP-160',2093.47,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(14,'EMP-160',2152.09,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(15,'EMP-175',2193.47,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(16,'EMP-175',2263.66,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(17,'EMP-175',2327.04,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(18,'EMP-190',2358.44,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(19,'EMP-190',2433.91,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(20,'EMP-190',2502.06,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(21,'EMP-210',2578.94,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(22,'EMP-210',2661.47,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(23,'EMP-210',2735.99,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(24,'EMP-230',2798.91,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(25,'EMP-230',2888.48,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(26,'EMP-230',2969.36,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(27,'EMP-250',3018.92,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(28,'EMP-250',3115.53,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(29,'EMP-250',3202.76,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(30,'AM-150',2106.05,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(31,'AM-150',2173.44,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(32,'AM-150',2234.3,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(33,'AM-160',2222.43,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(34,'AM-160',2293.55,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(35,'AM-160',2357.77,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(36,'AM-170',2338.53,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(37,'AM-170',2413.36,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(38,'AM-170',2480.93,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(39,'AM-185',2513.25,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(40,'AM-185',2593.67,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(41,'AM-185',2666.29,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(42,'AM-200',2687.54,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(43,'AM-200',2773.54,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(44,'AM-200',2851.2,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(45,'AM-215',2861.88,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(46,'AM-215',2953.46,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(47,'AM-215',3036.16,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(48,'AM-235',3094.44,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(49,'AM-235',3193.46,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(50,'AM-235',3282.88,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(51,'AM-255',3326.98,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(52,'AM-255',3433.44,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(53,'AM-255',3529.58,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(54,'AM-275',3559.53,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(55,'AM-275',3673.43,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(56,'AM-275',3776.29,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(57,'CAD-300',2798.08,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(58,'CAD-300',2887.62,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(59,'CAD-300',2968.47,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(60,'CAD-400',3541,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(61,'CAD-400',3654.31,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(62,'CAD-400',3756.63,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(63,'CAD-470',4060.64,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(64,'CAD-470',4190.58,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(65,'CAD-470',4307.92,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(66,'CAD-530',4506.43,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(67,'CAD-530',4650.64,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(68,'CAD-530',4780.86,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(69,'CAD-620',5174.81,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(70,'CAD-620',5340.4,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(71,'CAD-620',5489.93,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2),
(72,'CAD-800',6511.93,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2024-01-01','2025-01-01',0),
(73,'CAD-800',6720.31,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-01-01','2026-01-01',1),
(74,'CAD-800',6908.48,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2026-01-01',null,2)
) as v(i, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853757 — 2 % après 4 ans ; cadres exclus'),
(1, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853757 — 5 % après 7 ans ; cadres exclus'),
(2, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853757 — 8 % après 10 ans ; cadres exclus'),
(3, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853757 — 10 % après 12 ans ; cadres exclus'),
(4, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853757 — 12 % après 15 ans ; cadres exclus')
)
insert into public.cc_seniority_bonuses (id, idcc_code, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1351-s'||v.i)::uuid, '1351', v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.prorata_working_time::boolean, v.seniority_definition::text, case when v.s is null then null else md5('1351-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,array['employe','technicien','agent_maitrise'],null,48,2,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimal conventionnel de la qualification, à compter du mois suivant la date anniversaire','t0','1985-08-01',null,0),
(1,array['employe','technicien','agent_maitrise'],null,84,5,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimal conventionnel de la qualification, à compter du mois suivant la date anniversaire','t0','1985-08-01',null,1),
(2,array['employe','technicien','agent_maitrise'],null,120,8,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimal conventionnel de la qualification, à compter du mois suivant la date anniversaire','t0','1985-08-01',null,2),
(3,array['employe','technicien','agent_maitrise'],null,144,10,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimal conventionnel de la qualification, à compter du mois suivant la date anniversaire','t0','1985-08-01',null,3),
(4,array['employe','technicien','agent_maitrise'],null,180,12,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimal conventionnel de la qualification, à compter du mois suivant la date anniversaire','t0','1985-08-01',null,4)
) as v(i, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000049067305 — Prime de panier portée à 4,48 € au 01/01/2026 (6,87 € pour l''annexe VIII sûreté aérienne)'),
(1, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000049067305 — 8,78 € nets par mois au 01/01/2026'),
(2, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054226430 — 2 des 4 semaines du congé principal prises hors période estivale et hors périodes de pointe')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1351-b'||v.i)::uuid, '1351', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, case when v.s is null then null else md5('1351-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'prime_panier','Indemnité de panier (vacation de 6 h minimum)',array['employe','technicien'],null,null,4.48,'forfait',null,0,null,null,null,null,'t1','2026-01-01',null,0),
(1,'prime_habillage','Prime d''entretien des tenues (nette, par mois)',null,null,null,8.78,'forfait',null,0,null,null,null,null,'t1','2026-01-01',null,1),
(2,'prime_vacances','Prime d''étalement des vacances : 4 % de l''indemnité de congés payés de la période prise hors 1er juin – 30 septembre',null,null,4,null,'indemnite_conges_payes',null,0,null,null,null,null,'t0','1985-08-01',null,2)
) as v(i, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054226430 — Contingent de 329 h ; cycles de 8 semaines maximum ; 48 h par semaine au plus, 46 h en moyenne sur 12 semaines ; 12 h par jour')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1351-w'||v.i)::uuid, '1351', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, case when v.s is null then null else md5('1351-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,null,'standard',35,151.67,null,329,null,null,null,null,null,'t0','1985-08-01',null,0)
) as v(i, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853871'),
(1, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853996 — Calculée sur le taux horaire minimum conventionnel de base, hors autres majorations'),
(2, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853757 — 1er mai : régime légal')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1351-p'||v.i)::uuid, '1351', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, case when v.s is null then null else md5('1351-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'nuit','Heures de nuit (21 h – 6 h) : +10 % du taux horaire minimum conventionnel, plus repos compensateur de 1 % par heure',null,null,null,null,null,'21:00','06:00',10,null,null,'paiement_et_repos',1,'t5','2002-01-01',null,0),
(1,'dimanche','Heures du dimanche (0 h – 24 h) : +10 % du taux horaire minimum conventionnel',null,null,null,null,null,null,null,10,null,null,'paiement',null,'t6','2004-07-01',null,1),
(2,'jour_ferie','Jour férié travaillé : indemnité égale au salaire du jour (soit +100 %) ou repos équivalent pris dans le mois',null,null,null,null,null,null,null,100,null,null,'paiement_ou_repos',null,'t0','1985-08-01',null,2)
) as v(i, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054226430 — Après 1 an d''ancienneté ; sans réduction de rémunération ; minimum légal en dessous d''1 an')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1351-l'||v.i)::uuid, '1351', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, case when v.s is null then null else md5('1351-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'evenement_familial','mariage_salarie','Mariage du salarié',null,null,12,7,'calendaires',true,'t0','1985-08-01',null,0),
(1,'evenement_familial','mariage_enfant','Mariage d''un enfant',null,null,12,2,'ouvres',true,'t0','1985-08-01',null,0),
(2,'evenement_familial','mariage_frere_soeur','Mariage d''un frère ou d''une sœur',null,null,12,1,'ouvres',true,'t0','1985-08-01',null,0),
(3,'evenement_familial','deces_conjoint','Décès du conjoint',null,null,12,3,'ouvres',true,'t0','1985-08-01',null,0),
(4,'evenement_familial','deces_parent','Décès du père ou de la mère',null,null,12,1,'ouvres',true,'t0','1985-08-01',null,0),
(5,'evenement_familial','deces_enfant','Décès d''un enfant (cas général)',null,null,12,13,'ouvrables',true,'t0','1985-08-01',null,0),
(6,'evenement_familial','deces_beau_parent','Décès du père ou de la mère du conjoint',null,null,12,1,'ouvres',true,'t0','1985-08-01',null,0),
(7,'evenement_familial','deces_frere_soeur','Décès d''un frère ou d''une sœur',null,null,12,1,'ouvres',true,'t0','1985-08-01',null,0),
(8,'evenement_familial','naissance_adoption','Naissance ou arrivée d''un enfant en vue de son adoption',null,null,12,3,'ouvres',true,'t0','1985-08-01',null,0),
(9,'evenement_familial','handicap_enfant','Annonce du handicap ou d''une pathologie d''un enfant',null,null,12,6,'ouvrables',true,'t0','1985-08-01',null,0)
) as v(i, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — Ancienneté > 3 an(s) : 30 j à 90 %, puis 30 j à 70 % ; carence 10 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(1, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — 2e période, ancienneté > 3 an(s)'),
(2, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — Ancienneté > 8 an(s) : 45 j à 90 %, puis 45 j à 70 % ; carence 10 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(3, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — 2e période, ancienneté > 8 an(s)'),
(4, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — Ancienneté > 13 an(s) : 60 j à 90 %, puis 45 j à 70 % ; carence 10 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(5, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — 2e période, ancienneté > 13 an(s)'),
(6, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — Ancienneté > 18 an(s) : 60 j à 90 %, puis 75 j à 70 % ; carence 10 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(7, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — 2e période, ancienneté > 18 an(s)'),
(8, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — Ancienneté > 23 an(s) : 75 j à 90 %, puis 75 j à 70 % ; carence 10 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(9, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — 2e période, ancienneté > 23 an(s)'),
(10, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — Ancienneté > 28 an(s) : 90 j à 90 %, puis 90 j à 70 % ; carence 10 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(11, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853820 — 2e période, ancienneté > 28 an(s)'),
(12, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — Ancienneté > 2 an(s) : 30 j à 90 %, puis 30 j à 75 % ; carence 3 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(13, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — 2e période, ancienneté > 2 an(s)'),
(14, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — Ancienneté > 8 an(s) : 45 j à 90 %, puis 45 j à 75 % ; carence 3 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(15, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — 2e période, ancienneté > 8 an(s)'),
(16, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — Ancienneté > 13 an(s) : 60 j à 90 %, puis 60 j à 75 % ; carence 3 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(17, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — 2e période, ancienneté > 13 an(s)'),
(18, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — Ancienneté > 18 an(s) : 75 j à 90 %, puis 75 j à 75 % ; carence 3 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(19, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — 2e période, ancienneté > 18 an(s)'),
(20, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — Ancienneté > 23 an(s) : 90 j à 90 %, puis 90 j à 75 % ; carence 3 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(21, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — 2e période, ancienneté > 23 an(s)'),
(22, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — Ancienneté > 28 an(s) : 105 j à 90 %, puis 105 j à 75 % ; carence 3 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(23, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853831 — 2e période, ancienneté > 28 an(s)'),
(24, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — Ancienneté > 1 an(s) : 30 j à 100 %, puis 45 j à 75 % ; carence 0 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(25, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — 2e période, ancienneté > 1 an(s)'),
(26, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — Ancienneté > 5 an(s) : 45 j à 100 %, puis 60 j à 75 % ; carence 0 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(27, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — 2e période, ancienneté > 5 an(s)'),
(28, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — Ancienneté > 10 an(s) : 60 j à 100 %, puis 90 j à 75 % ; carence 0 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(29, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — 2e période, ancienneté > 10 an(s)'),
(30, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — Ancienneté > 15 an(s) : 90 j à 100 %, puis 120 j à 75 % ; carence 0 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(31, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — 2e période, ancienneté > 15 an(s)'),
(32, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — Ancienneté > 20 an(s) : 120 j à 100 %, puis 150 j à 75 % ; carence 0 j en maladie (aucune en accident) ; cycle de 12 mois ; IJSS et prévoyance déduites'),
(33, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005853842 — 2e période, ancienneté > 20 an(s)')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1351-k'||v.i)::uuid, '1351', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, case when v.s is null then null else md5('1351-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'maladie',array['employe','technicien'],null,36,10,1,30,90,'brut',true,12,'t2','1985-08-01',null,0),
(1,'maladie',array['employe','technicien'],null,36,10,2,30,70,'brut',true,12,'t2','1985-08-01',null,1),
(2,'maladie',array['employe','technicien'],null,96,10,1,45,90,'brut',true,12,'t2','1985-08-01',null,2),
(3,'maladie',array['employe','technicien'],null,96,10,2,45,70,'brut',true,12,'t2','1985-08-01',null,3),
(4,'maladie',array['employe','technicien'],null,156,10,1,60,90,'brut',true,12,'t2','1985-08-01',null,4),
(5,'maladie',array['employe','technicien'],null,156,10,2,45,70,'brut',true,12,'t2','1985-08-01',null,5),
(6,'maladie',array['employe','technicien'],null,216,10,1,60,90,'brut',true,12,'t2','1985-08-01',null,6),
(7,'maladie',array['employe','technicien'],null,216,10,2,75,70,'brut',true,12,'t2','1985-08-01',null,7),
(8,'maladie',array['employe','technicien'],null,276,10,1,75,90,'brut',true,12,'t2','1985-08-01',null,8),
(9,'maladie',array['employe','technicien'],null,276,10,2,75,70,'brut',true,12,'t2','1985-08-01',null,9),
(10,'maladie',array['employe','technicien'],null,336,10,1,90,90,'brut',true,12,'t2','1985-08-01',null,10),
(11,'maladie',array['employe','technicien'],null,336,10,2,90,70,'brut',true,12,'t2','1985-08-01',null,11),
(12,'maladie',array['agent_maitrise'],null,24,3,1,30,90,'brut',true,12,'t3','1985-08-01',null,12),
(13,'maladie',array['agent_maitrise'],null,24,3,2,30,75,'brut',true,12,'t3','1985-08-01',null,13),
(14,'maladie',array['agent_maitrise'],null,96,3,1,45,90,'brut',true,12,'t3','1985-08-01',null,14),
(15,'maladie',array['agent_maitrise'],null,96,3,2,45,75,'brut',true,12,'t3','1985-08-01',null,15),
(16,'maladie',array['agent_maitrise'],null,156,3,1,60,90,'brut',true,12,'t3','1985-08-01',null,16),
(17,'maladie',array['agent_maitrise'],null,156,3,2,60,75,'brut',true,12,'t3','1985-08-01',null,17),
(18,'maladie',array['agent_maitrise'],null,216,3,1,75,90,'brut',true,12,'t3','1985-08-01',null,18),
(19,'maladie',array['agent_maitrise'],null,216,3,2,75,75,'brut',true,12,'t3','1985-08-01',null,19),
(20,'maladie',array['agent_maitrise'],null,276,3,1,90,90,'brut',true,12,'t3','1985-08-01',null,20),
(21,'maladie',array['agent_maitrise'],null,276,3,2,90,75,'brut',true,12,'t3','1985-08-01',null,21),
(22,'maladie',array['agent_maitrise'],null,336,3,1,105,90,'brut',true,12,'t3','1985-08-01',null,22),
(23,'maladie',array['agent_maitrise'],null,336,3,2,105,75,'brut',true,12,'t3','1985-08-01',null,23),
(24,'maladie',array['cadre'],null,12,0,1,30,100,'brut',true,12,'t4','1985-08-01',null,24),
(25,'maladie',array['cadre'],null,12,0,2,45,75,'brut',true,12,'t4','1985-08-01',null,25),
(26,'maladie',array['cadre'],null,60,0,1,45,100,'brut',true,12,'t4','1985-08-01',null,26),
(27,'maladie',array['cadre'],null,60,0,2,60,75,'brut',true,12,'t4','1985-08-01',null,27),
(28,'maladie',array['cadre'],null,120,0,1,60,100,'brut',true,12,'t4','1985-08-01',null,28),
(29,'maladie',array['cadre'],null,120,0,2,90,75,'brut',true,12,'t4','1985-08-01',null,29),
(30,'maladie',array['cadre'],null,180,0,1,90,100,'brut',true,12,'t4','1985-08-01',null,30),
(31,'maladie',array['cadre'],null,180,0,2,120,75,'brut',true,12,'t4','1985-08-01',null,31),
(32,'maladie',array['cadre'],null,240,0,1,120,100,'brut',true,12,'t4','1985-08-01',null,32),
(33,'maladie',array['cadre'],null,240,0,2,150,75,'brut',true,12,'t4','1985-08-01',null,33)
) as v(i, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, s, vf, vt, nk)
left join n on n.k = v.nk;
