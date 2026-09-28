-- Appliquée en production le 2026-09-28 sous une forme SQL compacte équivalente (mêmes données, identifiants générés différemment).
-- Critères de vérification de la convention collective IDCC 1672 (Sociétés d'assurances),
-- relevés dans la base KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
(md5('1672-t0')::uuid, '1672', 'texte_base', 'Convention collective nationale des sociétés d''assurances du 27 mai 1992', 'KALITEXT000005654646', '1992-05-27'::date, null, '1992-07-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005654646', null, '2026-09-28'),
(md5('1672-t1')::uuid, '1672', 'protocole', 'Protocole d''accord du 16 juin 2025 relatif aux rémunérations minimales pour l''année 2025', 'KALITEXT000052226828', '2025-06-16'::date, null, '2025-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000052226828', 'Protocole non étendu : obligatoire pour les entreprises adhérentes de France Assureurs (organisation signataire)', '2026-09-28'),
(md5('1672-t2')::uuid, '1672', 'protocole', 'Protocole d''accord du 10 juin 2026 relatif aux rémunérations minimales pour l''année 2026', 'KALITEXT000054887698', '2026-06-10'::date, null, '2026-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054887698', 'Protocole non étendu : obligatoire pour les entreprises adhérentes de France Assureurs (organisation signataire)', '2026-09-28');

with n(k, t) as (values
(0, 'Art. 19 (1) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792016 — Classes 1 à 4 : non-cadres (catégorie indicative : 1-3 employés, 4 agents de maîtrise) ; classes 5 à 7 : cadres')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1672-c'||v.i)::uuid, '1672', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, case when v.s is null then null else md5('1672-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'CLASSE-1','Classe 1','employe','1',null,null,array['Classe 1','Cl. 1','Classe I'],0,'t0','1992-07-01',null,0),
(1,'CLASSE-2','Classe 2','employe','2',null,null,array['Classe 2','Cl. 2','Classe II'],1,'t0','1992-07-01',null,0),
(2,'CLASSE-3','Classe 3','employe','3',null,null,array['Classe 3','Cl. 3','Classe III'],2,'t0','1992-07-01',null,0),
(3,'CLASSE-4','Classe 4','agent_maitrise','4',null,null,array['Classe 4','Cl. 4','Classe IV'],3,'t0','1992-07-01',null,0),
(4,'CLASSE-5','Classe 5','cadre','5',null,null,array['Classe 5','Cl. 5','Classe V'],4,'t0','1992-07-01',null,0),
(5,'CLASSE-6','Classe 6','cadre','6',null,null,array['Classe 6','Cl. 6','Classe VI'],5,'t0','1992-07-01',null,0),
(6,'CLASSE-7','Classe 7','cadre','7',null,null,array['Classe 7','Cl. 7','Classe VII'],6,'t0','1992-07-01',null,0)
) as v(i, code, label, category, level, step, coefficient, aliases, sort_order, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000052226843 — RMA 2025 — RMA annuelle brute comparée à l''ensemble des éléments du salaire effectif de l''année (hors prime d''expérience, diplômes, éléments exceptionnels, heures au-delà de la durée annuelle, remboursements de frais) ; structure de référence : 12 mensualités + 13e mois + prime de vacances de 50 % d''une mensualité — contrôle mensuel indicatif sur 14 mensualités'),
(1, 'Annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054887713 — RMA 2026 — RMA annuelle brute comparée à l''ensemble des éléments du salaire effectif de l''année (hors prime d''expérience, diplômes, éléments exceptionnels, heures au-delà de la durée annuelle, remboursements de frais) ; structure de référence : 12 mensualités + 13e mois + prime de vacances de 50 % d''une mensualité — contrôle mensuel indicatif sur 14 mensualités')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1672-m'||v.i)::uuid, '1672', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, case when v.s is null then null else md5('1672-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'CLASSE-1',22230,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t1','2025-01-01','2026-01-01',0),
(1,'CLASSE-2',23640,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t1','2025-01-01','2026-01-01',0),
(2,'CLASSE-3',25070,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t1','2025-01-01','2026-01-01',0),
(3,'CLASSE-4',29720,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t1','2025-01-01','2026-01-01',0),
(4,'CLASSE-5',35140,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t1','2025-01-01','2026-01-01',0),
(5,'CLASSE-6',44670,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t1','2025-01-01','2026-01-01',0),
(6,'CLASSE-7',60690,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t1','2025-01-01','2026-01-01',0),
(7,'CLASSE-1',22680,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t2','2026-01-01',null,1),
(8,'CLASSE-2',24120,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t2','2026-01-01',null,1),
(9,'CLASSE-3',25580,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t2','2026-01-01',null,1),
(10,'CLASSE-4',30140,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t2','2026-01-01',null,1),
(11,'CLASSE-5',35430,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t2','2026-01-01',null,1),
(12,'CLASSE-6',45030,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t2','2026-01-01',null,1),
(13,'CLASSE-7',60940,'annuel',14,null,'standard',null,0,'remuneration_annuelle','t2','2026-01-01',null,1)
) as v(i, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 35 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792023 — Classe 1 : plafond de 20 années'),
(1, 'Art. 35 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792023 — Classe 2 : plafond de 15 années'),
(2, 'Art. 35 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792023 — Classe 3 : plafond de 10 années'),
(3, 'Art. 35 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792023 — Classe 4 : plafond de 5 années')
)
insert into public.cc_seniority_bonuses (id, idcc_code, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1672-s'||v.i)::uuid, '1672', v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.prorata_working_time::boolean, v.seniority_definition::text, case when v.s is null then null else md5('1672-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,null,array['CLASSE-1'],36,1,null,'minimum_conventionnel',true,'Prime d''expérience : 1 % de la RMA de la classe par année de présence effective, à partir du mois suivant la 3e année révolue, dans la limite de 20 années ; exclue de la vérification de la RMA','t0','1992-07-01',null,0),
(1,null,array['CLASSE-2'],36,1,null,'minimum_conventionnel',true,'Prime d''expérience : 1 % de la RMA de la classe par année de présence effective, à partir du mois suivant la 3e année révolue, dans la limite de 15 années ; exclue de la vérification de la RMA','t0','1992-07-01',null,1),
(2,null,array['CLASSE-3'],36,1,null,'minimum_conventionnel',true,'Prime d''expérience : 1 % de la RMA de la classe par année de présence effective, à partir du mois suivant la 3e année révolue, dans la limite de 10 années ; exclue de la vérification de la RMA','t0','1992-07-01',null,2),
(3,null,array['CLASSE-4'],36,1,null,'minimum_conventionnel',true,'Prime d''expérience : 1 % de la RMA de la classe par année de présence effective, à partir du mois suivant la 3e année révolue, dans la limite de 5 années ; exclue de la vérification de la RMA','t0','1992-07-01',null,3)
) as v(i, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 34 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792022 — Structure modifiable par accord d''entreprise ; pris en compte pour la RMA'),
(1, 'Art. 34 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792022')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1672-b'||v.i)::uuid, '1672', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, case when v.s is null then null else md5('1672-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'treizieme_mois','13e mois (structure de référence)',null,null,100,null,'salaire_base',array[12],0,null,null,true,null,'t0','1992-07-01',null,0),
(1,'prime_vacances','Prime de vacances égale à 50 % d''une mensualité (structure de référence)',null,null,50,null,'salaire_base',null,0,null,null,true,null,'t0','1992-07-01',null,1)
) as v(i, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 39 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792028'),
(1, 'Art. 88 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792097 — Condition de présence de 12 mois (3 mois si 12 mois dans la branche au cours des 5 dernières années)'),
(2, 'Art. 88 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792097'),
(3, 'Art. 88 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792097 — Plus 1 jour pour la rentrée scolaire d''enfants de moins de 7 ans')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1672-l'||v.i)::uuid, '1672', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, case when v.s is null then null else md5('1672-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'conges_anciennete',null,'Congé anniversaire : année du 10e anniversaire d''entrée',null,null,120,5,'ouvres',true,'t0','1992-07-01',null,0),
(1,'conges_anciennete',null,'Congé anniversaire : année du 20e anniversaire d''entrée',null,null,240,10,'ouvres',true,'t0','1992-07-01',null,0),
(2,'conges_anciennete',null,'Congé anniversaire : année du 30e anniversaire d''entrée',null,null,360,15,'ouvres',true,'t0','1992-07-01',null,0),
(3,'evenement_familial','mariage_salarie','Mariage du salarié (congé légal porté à 5 jours ouvrés)',null,null,12,5,'ouvres',true,'t0','1992-07-01',null,1),
(4,'evenement_familial','mariage_frere_soeur','Mariage d''un frère ou d''une sœur du salarié ou de son conjoint',null,null,12,1,'ouvres',true,'t0','1992-07-01',null,2),
(5,'evenement_familial','deces_beau_frere_soeur','Décès d''un frère ou d''une sœur du conjoint',null,null,12,1,'ouvres',true,'t0','1992-07-01',null,2),
(6,'enfant_malade',null,'Maladie d''enfants de moins de 12 ans : 3 jours rémunérés par an minimum',null,null,12,3,'ouvres',true,'t0','1992-07-01',null,3)
) as v(i, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, s, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(0, 'Art. 82 (1) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005792088 — Après 12 mois de présence (3 mois sous condition) : complément jusqu''au salaire net mensuel pendant 3 mois (même maladie : 3 mois par année civile) ; au-delà, régime professionnel de prévoyance')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select md5('1672-k'||v.i)::uuid, '1672', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, case when v.s is null then null else md5('1672-'||v.s)::uuid end, v.vf::date, v.vt::date, n.t, date '2026-09-28'
from (values
(0,'maladie',null,null,12,0,1,90,100,'net',true,12,'t0','1992-07-01',null,0)
) as v(i, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, s, vf, vt, nk)
left join n on n.k = v.nk;
