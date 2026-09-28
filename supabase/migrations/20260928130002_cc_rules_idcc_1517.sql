-- Appliquée en production le 2026-09-28 sous une forme SQL compacte équivalente (mêmes données, identifiants générés différemment).
-- Critères de vérification de la convention collective IDCC 1517 (Commerces de détail non alimentaires),
-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
(md5('1517-t0')::uuid, '1517', 'texte_base', 'Convention collective nationale des commerces de détail non alimentaires du 9 mai 2012', 'KALITEXT000026803629', '2012-05-09'::date, null, '2012-05-09'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000026803629', null, '2026-09-28'),
(md5('1517-t1')::uuid, '1517', 'avenant_salaires', 'Avenant n° 14 du 27 novembre 2024 relatif à la revalorisation de la rémunération minimale', 'KALITEXT000051191053', '2024-11-27'::date, null, '2025-03-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000051191053', null, '2026-09-28'),
(md5('1517-t2')::uuid, '1517', 'avenant_salaires', 'Avenant n° 15 du 6 février 2026 relatif à la revalorisation de la rémunération minimale', 'KALITEXT000054303837', '2026-02-06'::date, null, '2026-06-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054303837', 'Niveaux 1 à 4 : minimum inférieur ou égal au SMIC mensuel en vigueur (1 867,06 € au 01/06/2026) — le SMIC s''applique', '2026-09-28');

with n(k, t) as (values
(0, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026803775 — 5 niveaux ouvriers/employés, niveau VI agents de maîtrise, niveaux VII à IX cadres ; le niveau I ne peut s''appliquer au-delà de 6 mois (sauf employés de nettoyage)')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1517-c'||v.i)::uuid, '1517', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, case when v.s is null then null else md5('1517-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'N1','Niveau I (ouvriers et employés)','employe','I',null,null,array['Niveau I','Niveau 1','Niv. 1','Niv I'],0,'t0','2012-05-09',null,0),
(1,'N2','Niveau II (ouvriers et employés)','employe','II',null,null,array['Niveau II','Niveau 2','Niv. 2','Niv II'],1,'t0','2012-05-09',null,0),
(2,'N3','Niveau III (ouvriers et employés)','employe','III',null,null,array['Niveau III','Niveau 3','Niv. 3','Niv III'],2,'t0','2012-05-09',null,0),
(3,'N4','Niveau IV (ouvriers et employés)','employe','IV',null,null,array['Niveau IV','Niveau 4','Niv. 4','Niv IV'],3,'t0','2012-05-09',null,0),
(4,'N5','Niveau V (ouvriers et employés)','employe','V',null,null,array['Niveau V','Niveau 5','Niv. 5','Niv V'],4,'t0','2012-05-09',null,0),
(5,'N6','Niveau VI (agents de maîtrise)','agent_maitrise','VI',null,null,array['Niveau VI','Niveau 6','Niv. 6','Niv VI'],5,'t0','2012-05-09',null,0),
(6,'N7','Niveau VII (cadres)','cadre','VII',null,null,array['Niveau VII','Niveau 7','Niv. 7','Niv VII'],6,'t0','2012-05-09',null,0),
(7,'N8','Niveau VIII (cadres)','cadre','VIII',null,null,array['Niveau VIII','Niveau 8','Niv. 8','Niv VIII'],7,'t0','2012-05-09',null,0),
(8,'N9','Niveau IX (cadres)','cadre','IX',null,null,array['Niveau IX','Niveau 9','Niv. 9','Niv IX'],8,'t0','2012-05-09',null,0)
) as v(i, code, label, category, level, step, coefficient, aliases, sort_order, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000051191056 — Minimum mensuel pour 151,67 h, hors partie variable'),
(1, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054303840 — Minimum mensuel pour 151,67 h, hors partie variable ; Niveaux 1 à 4 : minimum inférieur ou égal au SMIC mensuel en vigueur (1 867,06 € au 01/06/2026) — le SMIC s''applique'),
(2, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054303840 — Minimum mensuel pour 151,67 h, hors partie variable')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1517-m'||v.i)::uuid, '1517', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, case when v.s is null then null else md5('1517-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'N1',1802,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-03-01','2026-06-01',0),
(1,'N2',1809,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-03-01','2026-06-01',0),
(2,'N3',1814,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-03-01','2026-06-01',0),
(3,'N4',1839,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-03-01','2026-06-01',0),
(4,'N5',1940,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-03-01','2026-06-01',0),
(5,'N6',2118,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-03-01','2026-06-01',0),
(6,'N7',2714,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-03-01','2026-06-01',0),
(7,'N8',3548,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-03-01','2026-06-01',0),
(8,'N9',3994,'mensuel',null,151.67,'standard',null,0,'salaire_base','t1','2025-03-01','2026-06-01',0),
(9,'N1',1829,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-06-01',null,1),
(10,'N2',1838,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-06-01',null,1),
(11,'N3',1843,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-06-01',null,1),
(12,'N4',1867,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-06-01',null,1),
(13,'N5',1967,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-06-01',null,2),
(14,'N6',2146,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-06-01',null,2),
(15,'N7',2741,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-06-01',null,2),
(16,'N8',3583,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-06-01',null,2),
(17,'N9',4034,'mensuel',null,151.67,'standard',null,0,'salaire_base','t2','2026-06-01',null,2)
) as v(i, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000048586955 — 3 % après 3 ans, niveaux I à VI'),
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000048586955 — 6 % après 6 ans, niveaux I à VI'),
(2, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000048586955 — 9 % après 9 ans, niveaux I à VI'),
(3, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000048586955 — 12 % après 12 ans, niveaux I à VI'),
(4, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000048586955 — 15 % après 15 ans, niveaux I à VI')
)
insert into public.cc_seniority_bonuses (id, idcc_code, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1517-s'||v.i)::uuid, '1517', v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.prorata_working_time::boolean, v.seniority_definition::text, case when v.s is null then null else md5('1517-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,array['N1','N2','N3','N4','N5','N6'],36,3,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimum mensuel du NIVEAU I (et non du niveau du salarié) ; prorata temps partiel et absences non indemnisées ; ligne distincte sur le bulletin','t0','2012-05-09',null,0),
(1,null,array['N1','N2','N3','N4','N5','N6'],72,6,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimum mensuel du NIVEAU I (et non du niveau du salarié) ; prorata temps partiel et absences non indemnisées ; ligne distincte sur le bulletin','t0','2012-05-09',null,1),
(2,null,array['N1','N2','N3','N4','N5','N6'],108,9,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimum mensuel du NIVEAU I (et non du niveau du salarié) ; prorata temps partiel et absences non indemnisées ; ligne distincte sur le bulletin','t0','2012-05-09',null,2),
(3,null,array['N1','N2','N3','N4','N5','N6'],144,12,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimum mensuel du NIVEAU I (et non du niveau du salarié) ; prorata temps partiel et absences non indemnisées ; ligne distincte sur le bulletin','t0','2012-05-09',null,3),
(4,null,array['N1','N2','N3','N4','N5','N6'],180,15,null,'minimum_conventionnel',true,'Ancienneté dans l''entreprise ; taux appliqué au salaire minimum mensuel du NIVEAU I (et non du niveau du salarié) ; prorata temps partiel et absences non indemnisées ; ligne distincte sur le bulletin','t0','2012-05-09',null,4)
) as v(i, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047249138'),
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047249128 — 218 jours journée de solidarité comprise ; jours de repos rachetés majorés d''au moins 25 %')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1517-w'||v.i)::uuid, '1517', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, case when v.s is null then null else md5('1517-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,null,'standard',35,151.67,null,180,null,null,null,null,null,'t0','2012-05-09',null,0),
(1,array['cadre','agent_maitrise'],null,'forfait_jours',null,null,null,null,218,null,null,null,null,'t0','2012-05-09',null,1)
) as v(i, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047249138'),
(1, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047249138 — Contrepartie en repos de 50 % au-delà du contingent'),
(2, 'Art. 9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047185601 — 3 jours fériés chômés et payés par an en plus du 1er mai ; si l''un d''eux est travaillé : +50 % et repos équivalent')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1517-p'||v.i)::uuid, '1517', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, case when v.s is null then null else md5('1517-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'heures_supplementaires','Heures supplémentaires de la 36e à la 39e heure (moyenne)',null,null,35,39,'semaine',null,null,25,null,null,'paiement',null,'t0','2012-05-09',null,0),
(1,'heures_supplementaires','Heures supplémentaires au-delà de la 39e heure (moyenne)',null,null,39,null,'semaine',null,null,50,null,null,'paiement',null,'t0','2012-05-09',null,1),
(2,'jour_ferie','Jour férié travaillé (hors 1er mai) : indemnité égale à 50 % des heures effectuées, ou repos de moitié',null,null,null,null,null,null,null,50,null,null,'paiement_ou_repos',null,'t0','2012-05-09',null,2)
) as v(i, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047185585 — Ancienneté appréciée au 31 mai'),
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047185587 — Sur justificatif ; assimilés à du travail effectif pour les congés payés'),
(2, 'Art. 6 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000047185595')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1517-l'||v.i)::uuid, '1517', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, case when v.s is null then null else md5('1517-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'conges_anciennete',null,'Congé d''ancienneté : 1 jour(s) ouvré(s) après 10 ans',null,null,120,1,'ouvres',true,'t0','2012-05-09',null,0),
(1,'conges_anciennete',null,'Congé d''ancienneté : 2 jour(s) ouvré(s) après 15 ans',null,null,180,2,'ouvres',true,'t0','2012-05-09',null,0),
(2,'conges_anciennete',null,'Congé d''ancienneté : 3 jour(s) ouvré(s) après 20 ans',null,null,240,3,'ouvres',true,'t0','2012-05-09',null,0),
(3,'conges_anciennete',null,'Congé d''ancienneté : 4 jour(s) ouvré(s) après 25 ans',null,null,300,4,'ouvres',true,'t0','2012-05-09',null,0),
(4,'conges_anciennete',null,'Congé d''ancienneté : 5 jour(s) ouvré(s) après 30 ans',null,null,360,5,'ouvres',true,'t0','2012-05-09',null,0),
(5,'evenement_familial','mariage_salarie','Mariage ou Pacs du salarié',null,null,0,4,'ouvres',true,'t0','2012-05-09',null,1),
(6,'evenement_familial','mariage_salarie','Mariage ou Pacs du salarié (après 1 an d''ancienneté)',null,null,12,5,'ouvres',true,'t0','2012-05-09',null,1),
(7,'evenement_familial','mariage_enfant','Mariage d''un enfant',null,null,0,1,'ouvres',true,'t0','2012-05-09',null,1),
(8,'evenement_familial','mariage_enfant','Mariage d''un enfant (après 1 an d''ancienneté)',null,null,12,2,'ouvres',true,'t0','2012-05-09',null,1),
(9,'evenement_familial','mariage_frere_soeur','Mariage d''un frère ou d''une sœur',null,null,0,1,'ouvres',true,'t0','2012-05-09',null,1),
(10,'evenement_familial','deces_conjoint','Décès du conjoint, partenaire de Pacs ou concubin',null,null,0,3,'ouvres',true,'t0','2012-05-09',null,1),
(11,'evenement_familial','deces_conjoint','Décès du conjoint, partenaire de Pacs ou concubin (après 1 an d''ancienneté)',null,null,12,4,'ouvres',true,'t0','2012-05-09',null,1),
(12,'evenement_familial','deces_enfant','Décès d''un enfant (cas général)',null,null,0,5,'ouvres',true,'t0','2012-05-09',null,1),
(13,'evenement_familial','deces_enfant','Décès d''un enfant (cas général) (après 1 an d''ancienneté)',null,null,12,6,'ouvres',true,'t0','2012-05-09',null,1),
(14,'evenement_familial','deces_parent','Décès du père, de la mère, des beaux-parents, d''un frère ou d''une sœur',null,null,0,3,'ouvres',true,'t0','2012-05-09',null,1),
(15,'evenement_familial','deces_parent','Décès du père, de la mère, des beaux-parents, d''un frère ou d''une sœur (après 1 an d''ancienneté)',null,null,12,4,'ouvres',true,'t0','2012-05-09',null,1),
(16,'evenement_familial','deces_grand_parent','Décès d''un grand-parent',null,null,0,1,'ouvres',true,'t0','2012-05-09',null,1),
(17,'evenement_familial','naissance','Naissance d''un enfant',null,null,0,3,'ouvres',true,'t0','2012-05-09',null,1),
(18,'evenement_familial','adoption','Arrivée d''un enfant en vue de son adoption',null,null,0,3,'ouvres',true,'t0','2012-05-09',null,1),
(19,'evenement_familial','handicap_enfant','Annonce d''un handicap, d''une pathologie chronique ou d''un cancer chez un enfant',null,null,0,2,'ouvres',true,'t0','2012-05-09',null,1),
(20,'enfant_malade',null,'Enfant malade de moins de 16 ans : 3 jours par an dont 2 rémunérés (4 dont 3 pour 2 enfants ; 5 dont 3 si enfant de moins d''1 an ou 3 enfants)',null,null,0,2,'ouvres',true,'t0','2012-05-09',null,2)
) as v(i, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522198 — Ancienneté ≥ 1 an(s) : 30 j à 90 % puis 30 j à 70 % du brut, à partir du 8e jour ; IJSS et prévoyance (part employeur) déduites ; plafond sur 12 mois'),
(1, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522198 — 2e période'),
(2, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522200 — AT/MP : dès 6 mois d''ancienneté, indemnisation dès le 1er jour, mêmes taux et durées'),
(3, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522200 — 2e période'),
(4, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522198 — Ancienneté ≥ 6 an(s) : 40 j à 90 % puis 40 j à 70 % du brut, à partir du 8e jour ; IJSS et prévoyance (part employeur) déduites ; plafond sur 12 mois'),
(5, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522198 — Ancienneté ≥ 11 an(s) : 50 j à 90 % puis 50 j à 70 % du brut, à partir du 8e jour ; IJSS et prévoyance (part employeur) déduites ; plafond sur 12 mois'),
(6, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522198 — Ancienneté ≥ 16 an(s) : 60 j à 90 % puis 60 j à 70 % du brut, à partir du 8e jour ; IJSS et prévoyance (part employeur) déduites ; plafond sur 12 mois'),
(7, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522198 — Ancienneté ≥ 21 an(s) : 70 j à 90 % puis 70 j à 70 % du brut, à partir du 8e jour ; IJSS et prévoyance (part employeur) déduites ; plafond sur 12 mois'),
(8, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522198 — Ancienneté ≥ 26 an(s) : 80 j à 90 % puis 80 j à 70 % du brut, à partir du 8e jour ; IJSS et prévoyance (part employeur) déduites ; plafond sur 12 mois'),
(9, 'Art. 1er — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046522198 — Ancienneté ≥ 31 an(s) : 90 j à 90 % puis 90 j à 70 % du brut, à partir du 8e jour ; IJSS et prévoyance (part employeur) déduites ; plafond sur 12 mois')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1517-k'||v.i)::uuid, '1517', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, case when v.s is null then null else md5('1517-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'maladie',null,null,12,7,1,30,90,'brut',true,12,'t0','2012-05-09',null,0),
(1,'maladie',null,null,12,7,2,30,70,'brut',true,12,'t0','2012-05-09',null,1),
(2,'accident_travail',null,null,6,0,1,30,90,'brut',true,12,'t0','2012-05-09',null,2),
(3,'accident_travail',null,null,6,0,2,30,70,'brut',true,12,'t0','2012-05-09',null,3),
(4,'maladie',null,null,72,7,1,40,90,'brut',true,12,'t0','2012-05-09',null,4),
(5,'maladie',null,null,72,7,2,40,70,'brut',true,12,'t0','2012-05-09',null,1),
(6,'accident_travail',null,null,72,0,1,40,90,'brut',true,12,'t0','2012-05-09',null,2),
(7,'accident_travail',null,null,72,0,2,40,70,'brut',true,12,'t0','2012-05-09',null,3),
(8,'maladie',null,null,132,7,1,50,90,'brut',true,12,'t0','2012-05-09',null,5),
(9,'maladie',null,null,132,7,2,50,70,'brut',true,12,'t0','2012-05-09',null,1),
(10,'accident_travail',null,null,132,0,1,50,90,'brut',true,12,'t0','2012-05-09',null,2),
(11,'accident_travail',null,null,132,0,2,50,70,'brut',true,12,'t0','2012-05-09',null,3),
(12,'maladie',null,null,192,7,1,60,90,'brut',true,12,'t0','2012-05-09',null,6),
(13,'maladie',null,null,192,7,2,60,70,'brut',true,12,'t0','2012-05-09',null,1),
(14,'accident_travail',null,null,192,0,1,60,90,'brut',true,12,'t0','2012-05-09',null,2),
(15,'accident_travail',null,null,192,0,2,60,70,'brut',true,12,'t0','2012-05-09',null,3),
(16,'maladie',null,null,252,7,1,70,90,'brut',true,12,'t0','2012-05-09',null,7),
(17,'maladie',null,null,252,7,2,70,70,'brut',true,12,'t0','2012-05-09',null,1),
(18,'accident_travail',null,null,252,0,1,70,90,'brut',true,12,'t0','2012-05-09',null,2),
(19,'accident_travail',null,null,252,0,2,70,70,'brut',true,12,'t0','2012-05-09',null,3),
(20,'maladie',null,null,312,7,1,80,90,'brut',true,12,'t0','2012-05-09',null,8),
(21,'maladie',null,null,312,7,2,80,70,'brut',true,12,'t0','2012-05-09',null,1),
(22,'accident_travail',null,null,312,0,1,80,90,'brut',true,12,'t0','2012-05-09',null,2),
(23,'accident_travail',null,null,312,0,2,80,70,'brut',true,12,'t0','2012-05-09',null,3),
(24,'maladie',null,null,372,7,1,90,90,'brut',true,12,'t0','2012-05-09',null,9),
(25,'maladie',null,null,372,7,2,90,70,'brut',true,12,'t0','2012-05-09',null,1),
(26,'accident_travail',null,null,372,0,1,90,90,'brut',true,12,'t0','2012-05-09',null,2),
(27,'accident_travail',null,null,372,0,2,90,70,'brut',true,12,'t0','2012-05-09',null,3)
) as v(i, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, s, vf, vt, nk)
left join n on n.k = v.nk;
