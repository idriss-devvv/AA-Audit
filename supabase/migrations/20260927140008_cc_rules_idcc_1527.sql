-- Critères de vérification de la convention collective IDCC 1527, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 1527 — Immobilier (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('28b8a1b9-3684-5509-a897-90a810f5ff16', '1527', 'texte_base', 'Convention collective nationale de l''immobilier du 9 septembre 1988 (mise à jour)', 'KALITEXT000023759095', '1988-09-09'::date, '2021-07-14'::date, '2021-08-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000023759095', 'Article 22 (congés pour événements familiaux) dans sa rédaction issue de l''accord QVCT de 2026, non encore étendu à la date du relevé', '2026-09-27'),
('839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '1527', 'avenant_salaires', 'Avenant n° 110 du 4 mars 2026 (annexe II salaires et annexe IV négociateurs)', 'KALITEXT000054303854', '2026-03-04'::date, '2026-05-10'::date, '2026-04-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054303854', null, '2026-09-27');

with n(k, t) as (values
(1, 'Art. 37 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759242')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('66cfa0be-f531-5c8d-87e7-898c32bba3a9', 'E1', 'Employé niveau E1', 'employe', 'E1', null, null, array['Niveau E1','E1']::text[], 0, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('4d9bde99-a09c-555d-9724-b723b0fad9bd', 'E2', 'Employé niveau E2', 'employe', 'E2', null, null, array['Niveau E2','E2']::text[], 1, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('2f7874f9-805c-5d84-9eaa-2a01ee53b7fb', 'E3', 'Employé niveau E3', 'employe', 'E3', null, null, array['Niveau E3','E3']::text[], 2, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('17718b5b-da3b-59e6-9ca6-4fe46f0f8874', 'AM1', 'Agent de maîtrise niveau AM1', 'agent_maitrise', 'AM1', null, null, array['Niveau AM1','AM1']::text[], 3, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('0b17f887-f39c-59b1-ba79-fa1c529746c4', 'AM2', 'Agent de maîtrise niveau AM2', 'agent_maitrise', 'AM2', null, null, array['Niveau AM2','AM2']::text[], 4, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('0993c4dc-de35-5ea9-8254-ca25b4925ab5', 'C1', 'Cadre niveau C1', 'cadre', 'C1', null, null, array['Niveau C1','C1']::text[], 5, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('12e3d99c-f3af-5c87-af0f-12857355ab4a', 'C2', 'Cadre niveau C2', 'cadre', 'C2', null, null, array['Niveau C2','C2']::text[], 6, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('4736ec5c-5b5a-5a13-b93e-7b0d922b195f', 'C3', 'Cadre niveau C3', 'cadre', 'C3', null, null, array['Niveau C3','C3']::text[], 7, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('085a34bb-1352-5a83-91c0-dd1f66554dd5', 'C4', 'Cadre niveau C4', 'cadre', 'C4', null, null, array['Niveau C4','C4']::text[], 8, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054303857 — Salaire minimum brut annuel sur 13 mois, hors prime d''ancienneté')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('ceb19bf1-310f-5a8e-b13f-05cb424ae59f', 'E1', 23700, 'annuel', 13, null, 'standard', null, 0, 'remuneration_annuelle', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1),
('67e9a4cc-c545-5517-b139-c688f12d1942', 'E2', 24428, 'annuel', 13, null, 'standard', null, 0, 'remuneration_annuelle', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1),
('ee48419e-40fc-5eed-aaf4-46b377f5f293', 'E3', 25080, 'annuel', 13, null, 'standard', null, 0, 'remuneration_annuelle', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1),
('1f7522b0-1801-5fd1-8cbd-cc230c675d1d', 'AM1', 25569, 'annuel', 13, null, 'standard', null, 0, 'remuneration_annuelle', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1),
('fafd4b52-6ae6-5198-98b6-4eba78501315', 'AM2', 26415, 'annuel', 13, null, 'standard', null, 0, 'remuneration_annuelle', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1),
('4c7c5d2b-1d73-586b-b423-b39a037badcc', 'C1', 28333, 'annuel', 13, null, 'standard', null, 0, 'remuneration_annuelle', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1),
('8625d6d3-92fd-5015-972e-c1e816c262d6', 'C2', 36932, 'annuel', 13, null, 'standard', null, 0, 'remuneration_annuelle', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1),
('f4d52e91-0df7-5115-8fa6-b73eed5dc94e', 'C3', 44221, 'annuel', 13, null, 'standard', null, 0, 'remuneration_annuelle', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1),
('0ea036f2-6ac9-5163-9c5f-2d410dbdb0f2', 'C4', 49800, 'annuel', 13, null, 'standard', null, 0, 'remuneration_annuelle', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 36 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759241 — Montant ajouté par période de 3 ans (3 ans : 32 €, 6 ans : 64 €…) ; négociateurs : voir annexe IV')
)
insert into public.cc_seniority_bonuses (id, idcc_code, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.prorata_working_time::boolean, v.seniority_definition::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('06a1b204-3598-503a-836b-f442f6cb16d3', null, null, 36, null, 32, 'forfait', true, 'Ancienneté dans l''entreprise ; majoration de 32 € du salaire global brut mensuel tous les 3 ans, au 1er janvier suivant la date anniversaire (cumulative)', '28b8a1b9-3684-5509-a897-90a810f5ff16', '2024-09-01', null, 1)
) as v(id, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 38 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759247'),
(2, 'Art. 19 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759160')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('0cc943a6-6f81-5e7d-83ff-e789e0e2987f', 'treizieme_mois', '13e mois égal à un mois de salaire global brut mensuel contractuel', null, null, 100, null, 'salaire_base', array[12]::int[], 0, null, 'Au prorata du temps de présence dans l''année (maintien de salaire à 90/100 % assimilé) ; possible en deux versements semestriels ; pro rata en cas de départ', true, null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('81faa59d-009f-5480-aa66-dc34b3319d03', 'autre', 'Prime de coupure (temps partiel) : par coupure de plus de 2 heures', null, null, null, 4, 'forfait', null, 0, null, null, null, null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2)
) as v(id, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 19 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759160 — Contingent réglementaire'),
(2, 'Art. 19.9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759160 — 217 jours hors journée de solidarité ; rémunération au moins égale au minimum conventionnel majoré de 12 % ; 235 jours maximum avec renonciation (majoration d''au moins 10 %)'),
(3, 'Art. 19.7.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759160 — 6 avenants « compléments d''heures » par an au plus, 16 semaines maximum')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('dc981dea-c295-5439-a5c4-c2d8d2d63de8', null, null, 'standard', 35, 151.67, null, null, null, null, null, null, null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('7c9f5a92-87bf-5070-b803-64f3b5778672', array['cadre']::text[], null, 'forfait_jours', null, null, null, null, 217, null, null, null, 112, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('a8af3f37-28db-5a81-a62e-1a152c4affd5', null, null, 'standard', null, null, null, null, null, null, null, 33.33, null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 3)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 19 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759160 — Taux légaux (art. L. 3121-36 C. trav.) auxquels la convention renvoie'),
(2, 'Art. 19.7.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759160'),
(3, 'Art. 19.7.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759160 — Heures au-delà de l''avenant : +25 %'),
(4, 'Art. 19.9.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759160')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('f79b4a59-af2a-5273-b6aa-25d1e811f0cc', 'heures_supplementaires', 'Heures supplémentaires de la 36e à la 43e heure', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement_ou_repos', null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('c2ed446a-4221-58dc-89c2-85f24da06afd', 'heures_supplementaires', 'Heures supplémentaires au-delà de la 43e heure', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement_ou_repos', null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('19b1ecad-5cb3-5870-8b3a-61281ef99629', 'heures_complementaires', 'Heures complémentaires jusqu''à 1/10e de la durée contractuelle', null, null, null, null, null, null, null, 10, null, null, 'paiement', null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('7dc233cb-48fc-57fe-be59-bb207e79c1b7', 'heures_complementaires', 'Heures complémentaires de 1/10e à 1/3 de la durée contractuelle', null, null, null, null, null, null, null, 25, null, null, 'paiement', null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('51d3cb5e-e5ec-514a-b798-e491e517815c', 'heures_complementaires', 'Heures prévues par un avenant « complément d''heures »', null, null, null, null, null, null, null, 10, null, null, 'paiement', null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 3),
('df4d846f-640f-5d5c-b0b3-69406ad8ad75', 'autre', 'Jours travaillés au-delà du forfait jours (renonciation à des jours de repos)', array['cadre']::text[], null, null, null, null, null, null, 10, null, null, 'paiement', null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 4)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. annexe III 1.7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046103797 — Assiette : rémunération brute limitée à 4 PASS ; répartition 55 % employeur / 45 % salarié (art. 26.5)'),
(2, 'Art. annexe III 2.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046103797 — Alsace-Moselle : 0,92 % PMSS ; cotisation selon la situation de famille réelle'),
(3, 'Art. annexe III 2.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046103797 — Alsace-Moselle : 0,60 % PMSS')
)
insert into public.cc_contributions (id, idcc_code, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.kind::text, v.label::text, v.organism::text, v.designation::text, v.categories::text[], v.classification_codes::text[], v.base::text, v.total_rate_percent::numeric, v.employer_rate_percent::numeric, v.employee_rate_percent::numeric, v.employer_fixed_amount::numeric, v.employee_fixed_amount::numeric, v.employer_min_share_percent::numeric, v.mandatory::boolean, v.company_size_min::int, v.company_size_max::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('9ec2eb6a-f563-506c-bddf-1f0247b38064', 'prevoyance', 'Prévoyance lourde (décès 0,20 %, incapacité 0,23 %, invalidité 0,23 %)', null, null, null, null, 'salaire_brut', 0.66, null, null, null, null, 55, true, null, null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-04-01', null, 1),
('b7267f7c-f22f-5de2-b7d6-8d46b9761f73', 'mutuelle', 'Frais de santé obligatoire — adulte (régime général)', null, null, null, null, 'pmss', 1.81, null, null, null, null, 55, true, null, null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-04-01', null, 2),
('279b1ba6-9eb1-55f2-b0a4-c0b5e6c305b4', 'mutuelle', 'Frais de santé obligatoire — par enfant (régime général)', null, null, null, null, 'pmss', 1.01, null, null, null, null, 55, true, null, null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-04-01', null, 3)
) as v(id, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 21.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759192'),
(2, 'Art. 22 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759200'),
(3, 'Art. 22.7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759200')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('daa7c1d0-cad5-5644-bfe8-495c83ce0a5a', 'conges_supplementaires', null, 'Rappel pendant les congés payés', null, null, 0, 3, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('d57243c8-0730-5648-9134-da0bb539ad25', 'evenement_familial', 'Mariage ou Pacs du salarié', 'Mariage ou Pacs du salarié', null, null, 0, 6, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('589915fe-f3e9-5085-bfae-0184ab4a1c91', 'evenement_familial', 'Mariage dans la proche famille (enfant, ascendant, frère, sœur)', 'Mariage dans la proche famille (enfant, ascendant, frère, sœur)', null, null, 0, 1, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('f0344411-02d5-5d0f-95f6-e564bba4a834', 'evenement_familial', 'Cérémonie religieuse d''un enfant', 'Cérémonie religieuse d''un enfant', null, null, 0, 1, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('401b6ad3-9691-55b1-bf2f-e723186130d3', 'evenement_familial', 'Décès du conjoint, partenaire de Pacs, concubin, du père ou de la mère', 'Décès du conjoint, partenaire de Pacs, concubin, du père ou de la mère', null, null, 0, 6, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('93c7e128-0f89-57c1-9427-0b83e6f58739', 'evenement_familial', 'Décès d''un frère, d''une sœur, des beaux-parents, grands-parents ou arrière-grands-parents', 'Décès d''un frère, d''une sœur, des beaux-parents, grands-parents ou arrière-grands-parents', null, null, 0, 3, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('9c8116f6-585e-5262-903d-44fce7fa86d7', 'evenement_familial', 'Décès d''un beau-frère ou d''une belle-sœur', 'Décès d''un beau-frère ou d''une belle-sœur', null, null, 0, 1, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('44939f08-77d5-5a98-8f19-4962d5f6960b', 'evenement_familial', 'Décès d''un enfant de moins de 25 ans (ou enfant lui-même parent, ou personne à charge de moins de 25 ans)', 'Décès d''un enfant de moins de 25 ans (ou enfant lui-même parent, ou personne à charge de moins de 25 ans)', null, null, 0, 14, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('00160179-a652-5522-82dc-7a4cf8c1c088', 'evenement_familial', 'Décès d''un enfant de 25 ans et plus', 'Décès d''un enfant de 25 ans et plus', null, null, 0, 12, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('79ff23b5-27c5-5ec8-92a0-c10bc6c9377a', 'evenement_familial', 'Congé de deuil d''un enfant de moins de 25 ans', 'Congé de deuil d''un enfant de moins de 25 ans', null, null, 0, 8, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('86db1dc2-d8b2-53ba-a5d9-9b922b54e855', 'evenement_familial', 'Naissance ou adoption', 'Naissance ou adoption', null, null, 0, 3, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('34c07354-d50b-5f2d-b5da-abcd122f065a', 'evenement_familial', 'Annonce d''un handicap, d''une pathologie chronique ou d''un cancer chez un enfant', 'Annonce d''un handicap, d''une pathologie chronique ou d''un cancer chez un enfant', null, null, 0, 6, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('e5ec45d2-9d8b-53b1-abe9-5b1a63225722', 'evenement_familial', 'Préparation à la retraite (2 demi-journées)', 'Préparation à la retraite (2 demi-journées)', null, null, 0, 1, 'ouvrables', true, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 2),
('56c4723c-e9dc-5735-8719-274392b606e6', 'enfant_malade', 'Enfant de 12 ans et moins (ou 3 enfants de moins de 16 ans)', 'Enfant malade (congé non rémunéré par an)', null, null, 0, 5, 'ouvres', false, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 3),
('542f4e46-da8e-50f2-b1f4-02a70dea7abc', 'enfant_malade', 'Enfant de 13 à 16 ans', 'Enfant malade (congé non rémunéré par an)', null, null, 0, 3, 'ouvres', false, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2026-07-01', null, 3)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 24.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759211 — 90 % du salaire brut mensuel contractuel, dès le 1er jour, sous déduction des IJSS et de la prévoyance patronale ; durées cumulées sur 12 mois (hors AT/MP)'),
(2, 'Art. 24.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759211 — 90 % du salaire brut mensuel contractuel, dès le 1er jour, sous déduction des IJSS et de la prévoyance patronale ; durées cumulées sur 12 mois (hors AT/MP) ; accident du travail : pas de condition d''un an')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('02a57fdd-e3ba-5739-bc53-475e9135293b', 'maladie', null, null, 12, 0, 1, 30, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('9e723229-a95e-5d57-b56d-531f0c50a59c', 'accident_trajet', null, null, 12, 0, 1, 30, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('ed9a73ea-7e7e-5b62-a454-7d18207632ae', 'accident_travail', null, null, 0, 0, 1, 30, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('c846997d-112c-5b08-bed3-0fbb980bb56c', 'maladie_professionnelle', null, null, 0, 0, 1, 30, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('de30a021-0595-5506-a6fb-795a2de2bf9c', 'maladie', null, null, 36, 0, 1, 90, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('e46f698d-aa92-522e-a3d3-f2732da491c8', 'accident_trajet', null, null, 36, 0, 1, 90, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('7593a669-d313-57ea-8f4c-783fab23999a', 'accident_travail', null, null, 36, 0, 1, 90, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('896fe07d-4377-58e7-be98-d1dbd9ab695f', 'maladie_professionnelle', null, null, 36, 0, 1, 90, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('0fa53731-f269-5ca3-9ac7-b21109ef2cdb', 'maladie', null, null, 96, 0, 1, 110, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('588ced2c-3ad1-583d-955b-3155fd74e546', 'accident_trajet', null, null, 96, 0, 1, 110, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('5ae7dfc1-eecf-5a88-be0c-f29129aa7e76', 'accident_travail', null, null, 96, 0, 1, 110, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('5a0bcdbe-450a-5dd8-a238-877509ad9549', 'maladie_professionnelle', null, null, 96, 0, 1, 110, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('f79ea32d-78f2-5224-aace-99ec35d1d0fd', 'maladie', null, null, 156, 0, 1, 120, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('7e327985-5c37-555c-b099-39a8127f0455', 'accident_trajet', null, null, 156, 0, 1, 120, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('5951a58d-2ec0-5025-a258-f5eb0ee3bdf8', 'accident_travail', null, null, 156, 0, 1, 120, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('5793281d-7b64-5531-ad59-02c14cef84a1', 'maladie_professionnelle', null, null, 156, 0, 1, 120, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('1ff7c6bb-f159-5d47-8ab0-dc2d1c52d8da', 'maladie', null, null, 216, 0, 1, 130, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('e303cef8-4c71-56eb-8241-e08aa97459b5', 'accident_trajet', null, null, 216, 0, 1, 130, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('26e7c5ee-f23d-52f3-9842-9415b1d17e04', 'accident_travail', null, null, 216, 0, 1, 130, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('63da43dd-f3a3-579a-bb08-3077e00692b4', 'maladie_professionnelle', null, null, 216, 0, 1, 130, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('e4833733-9939-5cf8-a38c-7f5f6235dcec', 'maladie', null, null, 276, 0, 1, 170, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('fd70126f-d502-560b-95ff-20e096b504c8', 'accident_trajet', null, null, 276, 0, 1, 170, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('6ab492b7-1055-5c74-9052-2e7bf25ae2a0', 'accident_travail', null, null, 276, 0, 1, 170, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('22cc1a7d-0ece-5b4a-b65b-6bd090cc03d1', 'maladie_professionnelle', null, null, 276, 0, 1, 170, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('53387879-c850-5031-bcab-2240ac5f12f8', 'maladie', null, null, 396, 0, 1, 190, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('618884a2-de32-5e41-93d9-8ceb4eb78723', 'accident_trajet', null, null, 396, 0, 1, 190, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 1),
('d5fd16ac-a7be-5fa1-b6c9-446eca17f4be', 'accident_travail', null, null, 396, 0, 1, 190, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2),
('1a4f8ea1-65e5-503c-9122-9c9064f09141', 'maladie_professionnelle', null, null, 396, 0, 1, 190, 90, 'brut', true, 12, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054303858'),
(2, 'Art. 21.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000023759192')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1527', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('8b8fea64-dd55-5cfa-88d5-b72cede9ab9c', 'negociateur_vrp_minimum', 'Négociateur immobilier VRP non cadre : salaire minimum brut mensuel', null, null, 1540, 'euros_par_mois', 'Minimum annuel = 13 fois le minimum mensuel ; négociateur non VRP : SMIC', '839658a5-63df-5ff5-8dad-3a87b1d6bf5f', '2026-04-01', null, 1),
('16a3c387-7a48-5644-b3dc-8e0baed93ce5', 'indemnite_conges_payes', 'Indemnité de congés payés : maintien du salaire global brut mensuel ou 1/10e si plus favorable', null, null, null, null, null, '28b8a1b9-3684-5509-a897-90a810f5ff16', '2021-08-01', null, 2)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
