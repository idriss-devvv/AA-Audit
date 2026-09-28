-- Appliquée en production le 2026-09-28 sous une forme SQL compacte équivalente (mêmes données, identifiants générés différemment).
-- Critères de vérification de la convention collective IDCC 1996 (Pharmacie d'officine),
-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
(md5('1996-t0')::uuid, '1996', 'texte_base', 'Convention collective nationale de la pharmacie d''officine du 3 décembre 1997', 'KALITEXT000005671152', '1997-12-03'::date, '1998-09-08'::date, '1998-09-08'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005671152', null, '2026-09-28'),
(md5('1996-t1')::uuid, '1996', 'avenant_salaires', 'Accord du 10 mars 2025 relatif aux salaires', 'KALITEXT000051834683', '2025-03-10'::date, null, '2025-05-24'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000051834683', 'Valeur du point 5,215 € ; coefficient 100 : 1 802 €', '2026-09-28'),
(md5('1996-t2')::uuid, '1996', 'avenant_salaires', 'Accord du 19 janvier 2026 relatif aux salaires', 'KALITEXT000054162007', '2026-01-19'::date, null, '2026-04-18'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054162007', 'Valeur du point 5,278 € ; coefficient 100 : 1 824 € (inférieur au SMIC au 01/06/2026 : le SMIC s''applique)', '2026-09-28');

with n(k, t) as (values
(0, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054162014 — Catégorie indicative : < 330 non-cadres, 330 à 399 assimilés cadres, ≥ 400 cadres (art. 16 de la convention)')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1996-c'||v.i)::uuid, '1996', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, case when v.s is null then null else md5('1996-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'COEF-100','Coefficient 100','employe',null,null,100,array['Coefficient 100','Coef. 100','Coef 100'],0,'t2','1998-09-08',null,0),
(1,'COEF-115','Coefficient 115','employe',null,null,115,array['Coefficient 115','Coef. 115','Coef 115'],1,'t2','1998-09-08',null,0),
(2,'COEF-125','Coefficient 125','employe',null,null,125,array['Coefficient 125','Coef. 125','Coef 125'],2,'t2','1998-09-08',null,0),
(3,'COEF-130','Coefficient 130','employe',null,null,130,array['Coefficient 130','Coef. 130','Coef 130'],3,'t2','1998-09-08',null,0),
(4,'COEF-135','Coefficient 135','employe',null,null,135,array['Coefficient 135','Coef. 135','Coef 135'],4,'t2','1998-09-08',null,0),
(5,'COEF-140','Coefficient 140','employe',null,null,140,array['Coefficient 140','Coef. 140','Coef 140'],5,'t2','1998-09-08',null,0),
(6,'COEF-145','Coefficient 145','employe',null,null,145,array['Coefficient 145','Coef. 145','Coef 145'],6,'t2','1998-09-08',null,0),
(7,'COEF-150','Coefficient 150','employe',null,null,150,array['Coefficient 150','Coef. 150','Coef 150'],7,'t2','1998-09-08',null,0),
(8,'COEF-155','Coefficient 155','employe',null,null,155,array['Coefficient 155','Coef. 155','Coef 155'],8,'t2','1998-09-08',null,0),
(9,'COEF-160','Coefficient 160','employe',null,null,160,array['Coefficient 160','Coef. 160','Coef 160'],9,'t2','1998-09-08',null,0),
(10,'COEF-165','Coefficient 165','employe',null,null,165,array['Coefficient 165','Coef. 165','Coef 165'],10,'t2','1998-09-08',null,0),
(11,'COEF-170','Coefficient 170','employe',null,null,170,array['Coefficient 170','Coef. 170','Coef 170'],11,'t2','1998-09-08',null,0),
(12,'COEF-175','Coefficient 175','employe',null,null,175,array['Coefficient 175','Coef. 175','Coef 175'],12,'t2','1998-09-08',null,0),
(13,'COEF-190','Coefficient 190','employe',null,null,190,array['Coefficient 190','Coef. 190','Coef 190'],13,'t2','1998-09-08',null,0),
(14,'COEF-200','Coefficient 200','employe',null,null,200,array['Coefficient 200','Coef. 200','Coef 200'],14,'t2','1998-09-08',null,0),
(15,'COEF-220','Coefficient 220','employe',null,null,220,array['Coefficient 220','Coef. 220','Coef 220'],15,'t2','1998-09-08',null,0),
(16,'COEF-225','Coefficient 225','employe',null,null,225,array['Coefficient 225','Coef. 225','Coef 225'],16,'t2','1998-09-08',null,0),
(17,'COEF-230','Coefficient 230','technicien',null,null,230,array['Coefficient 230','Coef. 230','Coef 230'],17,'t2','1998-09-08',null,0),
(18,'COEF-240','Coefficient 240','technicien',null,null,240,array['Coefficient 240','Coef. 240','Coef 240'],18,'t2','1998-09-08',null,0),
(19,'COEF-250','Coefficient 250','technicien',null,null,250,array['Coefficient 250','Coef. 250','Coef 250'],19,'t2','1998-09-08',null,0),
(20,'COEF-260','Coefficient 260','technicien',null,null,260,array['Coefficient 260','Coef. 260','Coef 260'],20,'t2','1998-09-08',null,0),
(21,'COEF-270','Coefficient 270','technicien',null,null,270,array['Coefficient 270','Coef. 270','Coef 270'],21,'t2','1998-09-08',null,0),
(22,'COEF-280','Coefficient 280','technicien',null,null,280,array['Coefficient 280','Coef. 280','Coef 280'],22,'t2','1998-09-08',null,0),
(23,'COEF-290','Coefficient 290','technicien',null,null,290,array['Coefficient 290','Coef. 290','Coef 290'],23,'t2','1998-09-08',null,0),
(24,'COEF-300','Coefficient 300','technicien',null,null,300,array['Coefficient 300','Coef. 300','Coef 300'],24,'t2','1998-09-08',null,0),
(25,'COEF-310','Coefficient 310','technicien',null,null,310,array['Coefficient 310','Coef. 310','Coef 310'],25,'t2','1998-09-08',null,0),
(26,'COEF-320','Coefficient 320','technicien',null,null,320,array['Coefficient 320','Coef. 320','Coef 320'],26,'t2','1998-09-08',null,0),
(27,'COEF-330','Coefficient 330','agent_maitrise',null,null,330,array['Coefficient 330','Coef. 330','Coef 330'],27,'t2','1998-09-08',null,0),
(28,'COEF-340','Coefficient 340','agent_maitrise',null,null,340,array['Coefficient 340','Coef. 340','Coef 340'],28,'t2','1998-09-08',null,0),
(29,'COEF-350','Coefficient 350','agent_maitrise',null,null,350,array['Coefficient 350','Coef. 350','Coef 350'],29,'t2','1998-09-08',null,0),
(30,'COEF-400','Coefficient 400','cadre',null,null,400,array['Coefficient 400','Coef. 400','Coef 400'],30,'t2','1998-09-08',null,0),
(31,'COEF-430','Coefficient 430','cadre',null,null,430,array['Coefficient 430','Coef. 430','Coef 430'],31,'t2','1998-09-08',null,0),
(32,'COEF-470','Coefficient 470','cadre',null,null,470,array['Coefficient 470','Coef. 470','Coef 470'],32,'t2','1998-09-08',null,0),
(33,'COEF-500','Coefficient 500','cadre',null,null,500,array['Coefficient 500','Coef. 500','Coef 500'],33,'t2','1998-09-08',null,0),
(34,'COEF-520','Coefficient 520','cadre',null,null,520,array['Coefficient 520','Coef. 520','Coef 520'],34,'t2','1998-09-08',null,0),
(35,'COEF-530','Coefficient 530','cadre',null,null,530,array['Coefficient 530','Coef. 530','Coef 530'],35,'t2','1998-09-08',null,0),
(36,'COEF-540','Coefficient 540','cadre',null,null,540,array['Coefficient 540','Coef. 540','Coef 540'],36,'t2','1998-09-08',null,0),
(37,'COEF-550','Coefficient 550','cadre',null,null,550,array['Coefficient 550','Coef. 550','Coef 550'],37,'t2','1998-09-08',null,0),
(38,'COEF-600','Coefficient 600','cadre',null,null,600,array['Coefficient 600','Coef. 600','Coef 600'],38,'t2','1998-09-08',null,0),
(39,'COEF-800','Coefficient 800','cadre',null,null,800,array['Coefficient 800','Coef. 800','Coef 800'],39,'t2','1998-09-08',null,0)
) as v(i, code, label, category, level, step, coefficient, aliases, sort_order, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000051834690 — Salaire minimum hiérarchique mensuel pour 35 h, hors primes'),
(1, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054162014 — Salaire minimum hiérarchique mensuel pour 35 h, hors primes ; la prime d''ancienneté n''entre pas dans la comparaison')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1996-m'||v.i)::uuid, '1996', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, case when v.s is null then null else md5('1996-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'COEF-100',1802,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(1,'COEF-115',1812.32,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(2,'COEF-125',1819.2,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(3,'COEF-130',1822.64,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(4,'COEF-135',1826.08,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(5,'COEF-140',1829.51,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(6,'COEF-145',1832.95,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(7,'COEF-150',1836.39,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(8,'COEF-155',1839.83,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(9,'COEF-160',1843.27,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(10,'COEF-165',1846.71,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(11,'COEF-170',1850.15,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(12,'COEF-175',1853.59,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(13,'COEF-190',1863.91,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(14,'COEF-200',1870.79,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(15,'COEF-220',1884.54,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(16,'COEF-225',1887.98,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(17,'COEF-230',1891.42,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(18,'COEF-240',1898.3,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(19,'COEF-250',1977.4,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(20,'COEF-260',2056.49,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(21,'COEF-270',2135.59,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(22,'COEF-280',2214.69,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(23,'COEF-290',2293.78,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(24,'COEF-300',2372.88,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(25,'COEF-310',2451.97,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(26,'COEF-320',2531.07,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(27,'COEF-330',2610.16,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(28,'COEF-400',3163.84,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(29,'COEF-430',3401.12,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(30,'COEF-470',3717.51,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(31,'COEF-500',3954.8,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(32,'COEF-600',4745.75,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(33,'COEF-800',6327.67,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-05-24','2026-04-18',0),
(34,'COEF-100',1824,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(35,'COEF-115',1834.42,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(36,'COEF-125',1841.36,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(37,'COEF-130',1844.84,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(38,'COEF-135',1848.31,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(39,'COEF-140',1851.78,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(40,'COEF-145',1855.25,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(41,'COEF-150',1858.73,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(42,'COEF-155',1862.2,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(43,'COEF-160',1865.67,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(44,'COEF-165',1869.14,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(45,'COEF-170',1872.62,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(46,'COEF-175',1876.09,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(47,'COEF-190',1886.51,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(48,'COEF-200',1893.45,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(49,'COEF-220',1907.34,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(50,'COEF-225',1910.81,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(51,'COEF-230',1914.29,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(52,'COEF-240',1921.23,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(53,'COEF-250',2001.29,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(54,'COEF-260',2081.34,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(55,'COEF-270',2161.39,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(56,'COEF-280',2241.44,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(57,'COEF-290',2321.49,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(58,'COEF-300',2401.54,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(59,'COEF-310',2481.59,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(60,'COEF-320',2561.65,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(61,'COEF-330',2641.7,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(62,'COEF-340',2721.75,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(63,'COEF-350',2801.8,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(64,'COEF-400',3202.06,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(65,'COEF-430',3442.21,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(66,'COEF-470',3762.42,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(67,'COEF-500',4002.57,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(68,'COEF-520',4162.67,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(69,'COEF-530',4242.73,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(70,'COEF-540',4322.78,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(71,'COEF-550',4402.83,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(72,'COEF-600',4803.09,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1),
(73,'COEF-800',6404.11,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-04-18',null,1)
) as v(i, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 11 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038106382 — 3 % après 3 ans, à compter du 1er jour du mois anniversaire'),
(1, 'Art. 11 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038106382 — 6 % après 6 ans, à compter du 1er jour du mois anniversaire'),
(2, 'Art. 11 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038106382 — 9 % après 9 ans, à compter du 1er jour du mois anniversaire'),
(3, 'Art. 11 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038106382 — 12 % après 12 ans, à compter du 1er jour du mois anniversaire'),
(4, 'Art. 11 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000038106382 — 15 % après 15 ans, à compter du 1er jour du mois anniversaire')
)
insert into public.cc_seniority_bonuses (id, idcc_code, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1996-s'||v.i)::uuid, '1996', v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.prorata_working_time::boolean, v.seniority_definition::text, case when v.s is null then null else md5('1996-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,null,36,3,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; calculée sur le salaire minimum du coefficient du salarié, au prorata des heures effectives (hors majorations d''heures supplémentaires) ; ligne spécifique du bulletin ; exclue de la comparaison au minimum','t0','1998-09-08',null,0),
(1,null,null,72,6,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; calculée sur le salaire minimum du coefficient du salarié, au prorata des heures effectives (hors majorations d''heures supplémentaires) ; ligne spécifique du bulletin ; exclue de la comparaison au minimum','t0','1998-09-08',null,1),
(2,null,null,108,9,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; calculée sur le salaire minimum du coefficient du salarié, au prorata des heures effectives (hors majorations d''heures supplémentaires) ; ligne spécifique du bulletin ; exclue de la comparaison au minimum','t0','1998-09-08',null,2),
(3,null,null,144,12,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; calculée sur le salaire minimum du coefficient du salarié, au prorata des heures effectives (hors majorations d''heures supplémentaires) ; ligne spécifique du bulletin ; exclue de la comparaison au minimum','t0','1998-09-08',null,3),
(4,null,null,180,15,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; calculée sur le salaire minimum du coefficient du salarié, au prorata des heures effectives (hors majorations d''heures supplémentaires) ; ligne spécifique du bulletin ; exclue de la comparaison au minimum','t0','1998-09-08',null,4)
) as v(i, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043992026 — Repos compensateur obligatoire au-delà : 50 % (≤ 20 salariés) ou 100 % (> 20 salariés)')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1996-w'||v.i)::uuid, '1996', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, case when v.s is null then null else md5('1996-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,null,'standard',35,151.67,null,150,null,null,null,null,null,'t0','1998-09-08',null,0)
) as v(i, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043992026'),
(1, 'Art. 13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043992026 — Même majoration de 20 % entre 5 h et 8 h'),
(2, 'Art. 13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043992026 — 1er mai travaillé en service de garde : régime des gardes et urgences')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1996-p'||v.i)::uuid, '1996', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, case when v.s is null then null else md5('1996-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'heures_supplementaires','Heures supplémentaires : 8 premières heures (36e à 43e)',null,null,35,43,'semaine',null,null,25,null,null,'paiement_ou_repos',null,'t0','1998-09-08',null,0),
(1,'heures_supplementaires','Heures supplémentaires au-delà de la 8e',null,null,43,null,'semaine',null,null,50,null,null,'paiement_ou_repos',null,'t0','1998-09-08',null,0),
(2,'nuit','Travail entre 20 h et 22 h ou entre 5 h et 8 h (officine ouverte au public)',null,null,null,null,null,'20:00','22:00',20,null,null,'paiement',null,'t0','1998-09-08',null,1),
(3,'nuit','Travail entre 22 h et 5 h (officine ouverte au public)',null,null,null,null,null,'22:00','05:00',40,null,null,'paiement',null,'t0','1998-09-08',null,0),
(4,'jour_ferie','Jour férié travaillé (hors 1er mai) : repos compensateur de même durée en plus du salaire',null,null,null,null,null,null,null,null,null,null,'repos',100,'t0','1998-09-08',null,2)
) as v(i, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 26 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043992038 — Jours ouvrés, sans réduction de rémunération'),
(1, 'Art. 16 bis — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000043992030')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1996-l'||v.i)::uuid, '1996', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, case when v.s is null then null else md5('1996-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'evenement_familial','mariage_salarie','Mariage ou Pacs du salarié',null,null,0,4,'ouvres',true,'t0','1998-09-08',null,0),
(1,'evenement_familial','mariage_salarie','Mariage ou Pacs du salarié (plus de 3 mois d''ancienneté)',null,null,3,6,'ouvres',true,'t0','1998-09-08',null,0),
(2,'evenement_familial','mariage_enfant','Mariage d''un enfant',null,null,0,1,'ouvres',true,'t0','1998-09-08',null,0),
(3,'evenement_familial','mariage_enfant','Mariage d''un enfant (plus de 3 mois d''ancienneté)',null,null,3,2,'ouvres',true,'t0','1998-09-08',null,0),
(4,'evenement_familial','mariage_frere_soeur','Mariage d''un frère ou d''une sœur (plus de 3 mois d''ancienneté)',null,null,3,1,'ouvres',true,'t0','1998-09-08',null,0),
(5,'evenement_familial','naissance','Naissance',null,null,0,3,'ouvres',true,'t0','1998-09-08',null,0),
(6,'evenement_familial','adoption','Adoption',null,null,0,3,'ouvres',true,'t0','1998-09-08',null,0),
(7,'evenement_familial','deces_conjoint','Décès du conjoint, partenaire de Pacs ou concubin',null,null,0,3,'ouvres',true,'t0','1998-09-08',null,0),
(8,'evenement_familial','deces_conjoint','Décès du conjoint, partenaire de Pacs ou concubin (plus de 3 mois d''ancienneté)',null,null,3,4,'ouvres',true,'t0','1998-09-08',null,0),
(9,'evenement_familial','deces_parent','Décès du père ou de la mère',null,null,0,3,'ouvres',true,'t0','1998-09-08',null,0),
(10,'evenement_familial','deces_grand_parent','Décès d''un grand-parent',null,null,0,1,'ouvres',true,'t0','1998-09-08',null,0),
(11,'evenement_familial','deces_grand_parent','Décès d''un grand-parent (plus de 3 mois d''ancienneté)',null,null,3,2,'ouvres',true,'t0','1998-09-08',null,0),
(12,'evenement_familial','deces_frere_soeur','Décès d''un frère ou d''une sœur',null,null,0,3,'ouvres',true,'t0','1998-09-08',null,0),
(13,'evenement_familial','deces_enfant','Décès d''un enfant ou d''une personne de moins de 25 ans à charge',null,null,0,7,'ouvres',true,'t0','1998-09-08',null,0),
(14,'evenement_familial','deces_beau_parent','Décès du beau-père ou de la belle-mère',null,null,0,3,'ouvres',true,'t0','1998-09-08',null,0),
(15,'evenement_familial','handicap_enfant','Annonce de la survenue d''un handicap chez l''enfant',null,null,0,2,'ouvres',true,'t0','1998-09-08',null,0),
(16,'enfant_malade',null,'Enfant handicapé de moins de 20 ans : 3 jours rémunérés par an',null,null,0,3,'ouvres',true,'t0','1998-09-08',null,1)
) as v(i, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 16 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050953538 — Assimilés cadres (coef. 330 à 399) après 1 an : salaire brut maintenu du 4e au 30e jour (dès le 1er jour en AT/MP) ; non-cadres (< 330) et cadres : indemnisation par les régimes de prévoyance de branche (annexe IV)'),
(1, 'Art. 16 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050953538 — AT/MP : maintien dès le 1er jour')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1996-k'||v.i)::uuid, '1996', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, case when v.s is null then null else md5('1996-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'maladie',array['agent_maitrise'],null,12,3,1,27,100,'brut',true,12,'t0','1998-09-08',null,0),
(1,'accident_travail',array['agent_maitrise'],null,12,0,1,30,100,'brut',true,12,'t0','1998-09-08',null,1)
) as v(i, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, s, vf, vt, nk)
left join n on n.k = v.nk;
