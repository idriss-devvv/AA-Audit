-- Critères de vérification de la convention collective IDCC 1501, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 1501 — Restauration rapide (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('f636f17d-fa5f-5187-bb50-95f76b4c6278', '1501', 'texte_base', 'Convention collective nationale de la restauration rapide du 18 mars 1988', 'KALITEXT000005672325', '1988-03-18'::date, '1988-12-13'::date, '1988-12-13'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005672325', null, '2026-09-27'),
('1bf1d8d0-5152-54a9-9b15-422e13d8d851', '1501', 'avenant', 'Avenant n° 47 du 8 janvier 2014 à l''avenant n° 24 relatif au temps partiel', 'KALITEXT000028900902', '2014-01-08'::date, null::date, '2014-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000028900902', null, '2026-09-27'),
('362b7b79-6ec3-565b-824b-67a5e985d2a6', '1501', 'avenant', 'Avenant n° 55 du 26 mars 2018 (prime annuelle, travail de nuit, congés spéciaux)', 'KALITEXT000037435858', '2018-03-26'::date, '2019-02-21'::date, '2019-03-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000037435858', null, '2026-09-27'),
('67532a7d-f215-5a35-8949-3e9b32c2ca92', '1501', 'avenant', 'Avenant n° 57 du 3 mars 2020 (prime de coupure, congé pour enfant malade)', 'KALITEXT000042258624', '2020-03-03'::date, '2021-04-14'::date, '2021-05-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000042258624', null, '2026-09-27'),
('d73c8d72-bb70-575b-8596-25d79314d44e', '1501', 'avenant_salaires', 'Avenant n° 63 du 30 septembre 2022 (minima et indemnité de blanchissage)', 'KALITEXT000046970957', '2022-09-30'::date, '2022-12-28'::date, '2023-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000046970957', null, '2026-09-27'),
('8ec412aa-cbff-5ca2-add7-c52991357a34', '1501', 'avenant', 'Avenant n° 68 du 30 avril 2024 relatif à la prime annuelle conventionnelle', 'KALITEXT000050051914', '2024-04-30'::date, '2024-08-09'::date, '2024-09-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000050051914', null, '2026-09-27'),
('2e612ff6-bf30-5a3f-9d5c-5cafb054323f', '1501', 'avenant', 'Avenant n° 69 du 30 avril 2024 (conditions d''emploi, travailleurs de nuit)', 'KALITEXT000050051924', '2024-04-30'::date, '2024-12-24'::date, '2025-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000050051924', null, '2026-09-27'),
('74a07264-3590-57be-bed8-8aef5b21f940', '1501', 'avenant_salaires', 'Avenant n° 72 du 5 juin 2025 relatif aux minima conventionnels', 'KALITEXT000052133132', '2025-06-05'::date, '2025-08-07'::date, '2025-09-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000052133132', null, '2026-09-27'),
('ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '1501', 'avenant', 'Avenant n° 50 du 22 mars 2017 relatif à la classification des postes', 'KALITEXT000035512892', '2017-03-22'::date, '2017-12-30'::date, '2018-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000035512892', null, '2026-09-27'),
('549245c4-e149-5903-83ba-86cca4eeccdb', '1501', 'avenant', 'Avenant n° 10 du 5 décembre 2025 à l''avenant n° 42 relatif au régime de prévoyance', 'KALITEXT000054161904', '2025-12-05'::date, '2026-06-03'::date, '2026-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054161904', null, '2026-09-27'),
('087780a1-7e1b-572a-a147-4fc3b24a8a3f', '1501', 'accord', 'Accord du 3 février 2012 relatif au régime complémentaire de frais de santé', 'KALITEXT000026277934', '2012-02-03'::date, '2012-12-09'::date, '2013-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000026277934', null, '2026-09-27');

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000035512898')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('bf45e37e-d763-56ac-9e66-d053066b8f5e', 'I-A', 'Niveau I échelon A', 'employe', 'I', 'A', null, array['Niveau I échelon A']::text[], 0, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('29f9e71f-7191-515e-a0f3-686a7978f314', 'I-B', 'Niveau I échelon B', 'employe', 'I', 'B', null, array['Niveau I échelon B']::text[], 1, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('8dd350eb-26a3-5b93-85a8-56adb76f3864', 'II-A', 'Niveau II échelon A', 'employe', 'II', 'A', null, array['Niveau II échelon A']::text[], 2, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('5b08a23d-d132-5483-96e0-570484d99b23', 'II-B', 'Niveau II échelon B', 'employe', 'II', 'B', null, array['Niveau II échelon B']::text[], 3, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('dfae377c-8970-5c78-bd5a-0c73fb1a7cb2', 'III-A', 'Niveau III échelon A', 'employe', 'III', 'A', null, array['Niveau III échelon A']::text[], 4, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('5be053cb-a9d1-559c-b409-a5d573e9a192', 'III-B', 'Niveau III échelon B', 'employe', 'III', 'B', null, array['Niveau III échelon B']::text[], 5, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('914935c9-d857-5552-ae38-220cdf9de027', 'III-C', 'Niveau III échelon C', 'employe', 'III', 'C', null, array['Niveau III échelon C']::text[], 6, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('de5cd4c0-a540-5502-8197-832fb4d0a91e', 'IV-A', 'Niveau IV échelon A', 'agent_maitrise', 'IV', 'A', null, array['Niveau IV échelon A']::text[], 7, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('cb843898-476d-5eb3-919f-e01f29c70afe', 'IV-B', 'Niveau IV échelon B', 'agent_maitrise', 'IV', 'B', null, array['Niveau IV échelon B']::text[], 8, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('73e37185-7ca2-5b46-87ee-54dfa34db78c', 'IV-C', 'Niveau IV échelon C', 'agent_maitrise', 'IV', 'C', null, array['Niveau IV échelon C']::text[], 9, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('837aeca6-1c86-55f9-9290-a7bd8da273ac', 'IV-D', 'Niveau IV échelon D', 'agent_maitrise', 'IV', 'D', null, array['Niveau IV échelon D']::text[], 10, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('a2cad179-4916-5a19-a77d-537f8d62e466', 'V-A', 'Niveau V échelon A', 'cadre', 'V', 'A', null, array['Niveau V échelon A']::text[], 11, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('707fe8ba-5cf8-5b97-97bf-862b74fdb77b', 'V-B', 'Niveau V échelon B', 'cadre', 'V', 'B', null, array['Niveau V échelon B']::text[], 12, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1),
('aa21a620-fc7e-5c92-a3d8-9f6e60282a76', 'V-C', 'Niveau V échelon C', 'cadre', 'V', 'C', null, array['Niveau V échelon C']::text[], 13, 'ebb6c2c0-60bb-523d-b1cf-a4bc97b71921', '2018-01-01', null, 1)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000052133139'),
(2, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000052133139 — Niveau V : rémunération minimale annuelle brute tous éléments de salaire confondus (13e mois, primes, prime annuelle conventionnelle)')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('9cf4dfb1-807c-5f57-9c90-82e440a3786a', 'I-A', 11.88, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('6f4f0b02-a351-53b8-a376-efe22664f772', 'I-B', 11.9, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('3e16e85c-4ef1-5049-bf88-0b875755cd6f', 'II-A', 12.22, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('2b486d82-1aaf-5c79-b7c6-f6405fff8ddb', 'II-B', 12.45, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('51737733-cbc0-55ca-9b68-1c36824a06c5', 'III-A', 12.82, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('6dad4a6e-5197-5522-ac9e-9381328b29d7', 'III-B', 12.93, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('527b20c3-c41d-5692-b34a-b5a4d45896c3', 'III-C', 13.98, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('71bbc843-8e67-54ad-b685-a76a6e93d852', 'IV-A', 15.01, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('bb1b3280-4f7c-5437-a151-839c85edc514', 'IV-B', 15.43, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('ffc29e49-be0a-57dd-9bd0-c6377e602307', 'IV-C', 16.05, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('74a6bf6e-e64b-578e-8e35-660990fcf7e7', 'IV-D', 17.34, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 1),
('b914bdec-177b-5304-b0c5-07630a5b2f51', 'V-A', 44645.78, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 2),
('29cbc1c0-b2f5-5684-b436-62266689f31e', 'V-B', 46032.71, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 2),
('9f261bb2-5418-522c-bdff-91998d171481', 'V-C', 72408.11, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', '74a07264-3590-57be-bed8-8aef5b21f940', '2025-09-01', null, 2)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 2 (art. 44.1 CCN) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050051920'),
(2, 'Art. 2 (art. 35.4 CCN) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000042258630 — 80 % du minimum garanti, sans pouvoir être inférieure à 3,50 €')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('0a7d261f-4992-53db-ba72-55f3295e0954', 'prime_annuelle', 'Prime annuelle conventionnelle — ancienneté de 1 à 3 ans', null, null, null, 215, 'forfait', null, 12, '1 an d''ancienneté continue et inscription à l''effectif au jour du versement', 'Prorata du temps de travail contractuel ; prorata des absences injustifiées > 3 jours, maladie > 10 jours, congés sans solde > 10 jours, congé parental… Versée en une fois au plus tard le mois de clôture de l''exercice N-1 ; un 13e mois ou une prime d''ancienneté inférieurs doivent être complétés', true, null, '8ec412aa-cbff-5ca2-add7-c52991357a34', '2024-09-01', null, 1),
('3e7f5e31-bc7c-56c7-a51a-a5d33079eb45', 'prime_annuelle', 'Prime annuelle conventionnelle — ancienneté de 3 à 5 ans', null, null, null, 285, 'forfait', null, 36, '1 an d''ancienneté continue et inscription à l''effectif au jour du versement', 'Prorata du temps de travail contractuel ; prorata des absences injustifiées > 3 jours, maladie > 10 jours, congés sans solde > 10 jours, congé parental… Versée en une fois au plus tard le mois de clôture de l''exercice N-1 ; un 13e mois ou une prime d''ancienneté inférieurs doivent être complétés', true, null, '8ec412aa-cbff-5ca2-add7-c52991357a34', '2024-09-01', null, 1),
('0057c39c-ba67-524e-8fb0-c28351d5f73b', 'prime_annuelle', 'Prime annuelle conventionnelle — ancienneté de 5 à 10 ans', null, null, null, 365, 'forfait', null, 60, '1 an d''ancienneté continue et inscription à l''effectif au jour du versement', 'Prorata du temps de travail contractuel ; prorata des absences injustifiées > 3 jours, maladie > 10 jours, congés sans solde > 10 jours, congé parental… Versée en une fois au plus tard le mois de clôture de l''exercice N-1 ; un 13e mois ou une prime d''ancienneté inférieurs doivent être complétés', true, null, '8ec412aa-cbff-5ca2-add7-c52991357a34', '2024-09-01', null, 1),
('b4aee5a8-bc89-524b-9ae7-c706cb6103d5', 'prime_annuelle', 'Prime annuelle conventionnelle — ancienneté de 10 à 15 ans', null, null, null, 475, 'forfait', null, 120, '1 an d''ancienneté continue et inscription à l''effectif au jour du versement', 'Prorata du temps de travail contractuel ; prorata des absences injustifiées > 3 jours, maladie > 10 jours, congés sans solde > 10 jours, congé parental… Versée en une fois au plus tard le mois de clôture de l''exercice N-1 ; un 13e mois ou une prime d''ancienneté inférieurs doivent être complétés', true, null, '8ec412aa-cbff-5ca2-add7-c52991357a34', '2024-09-01', null, 1),
('bb3aba16-4109-5d68-9ad9-5d9a6a0f5937', 'prime_annuelle', 'Prime annuelle conventionnelle — ancienneté de 15 ans et plus', null, null, null, 525, 'forfait', null, 180, '1 an d''ancienneté continue et inscription à l''effectif au jour du versement', 'Prorata du temps de travail contractuel ; prorata des absences injustifiées > 3 jours, maladie > 10 jours, congés sans solde > 10 jours, congé parental… Versée en une fois au plus tard le mois de clôture de l''exercice N-1 ; un 13e mois ou une prime d''ancienneté inférieurs doivent être complétés', true, null, '8ec412aa-cbff-5ca2-add7-c52991357a34', '2024-09-01', null, 1),
('3ae48e7e-abf3-5c29-aa5e-d4b97b12f906', 'autre', 'Prime de coupure : par interruption de plus de 2 heures dans la journée', null, null, null, 3.5, 'forfait', null, 0, null, null, null, 80, '67532a7d-f215-5a35-8949-3e9b32c2ca92', '2021-05-01', null, 2)
) as v(id, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 31 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833491'),
(2, 'Art. 2.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000028900911 — Heures complémentaires limitées au tiers de la durée contractuelle ; au plus 6 avenants « complément d''heures » par an (24 semaines maximum)')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('8546f0af-885b-5f7f-ab03-681a606a50fa', null, null, 'standard', 35, 151.67, null, 220, null, null, null, null, null, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('c63a9d2a-5761-59a3-b55c-2d186e86fcfb', null, null, 'standard', null, null, null, null, null, null, 24, 33.33, null, '1bf1d8d0-5152-54a9-9b15-422e13d8d851', '2014-01-01', null, 2)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 31.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833491 — Taux légaux (art. L. 3121-36 C. trav.) auxquels la convention renvoie'),
(2, 'Art. 2.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000028900920'),
(3, 'Art. 2.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000028900909'),
(4, 'Art. 4 (art. 36.a.4.2 CCN) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000037435866'),
(5, 'Art. 36.a.4.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833506')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('46df6bc5-31ee-5028-8046-e71810b88e11', 'heures_supplementaires', 'Heures supplémentaires de la 36e à la 43e heure', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement_ou_repos', null, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('ae12c230-b51f-513b-a6cc-e47dd69c68b2', 'heures_supplementaires', 'Heures supplémentaires au-delà de la 43e heure', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement_ou_repos', null, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('0790ff36-9598-5046-8fbb-ce07e2adf525', 'heures_complementaires', 'Heures complémentaires jusqu''à 1/10e de la durée contractuelle', null, null, null, null, null, null, null, 10, null, null, 'paiement', null, '1bf1d8d0-5152-54a9-9b15-422e13d8d851', '2014-01-01', null, 2),
('12f74674-fa4d-50fb-b908-020bbe8d1c6a', 'heures_complementaires', 'Heures complémentaires de 1/10e à 1/3 de la durée contractuelle', null, null, null, null, null, null, null, 25, null, null, 'paiement', null, '1bf1d8d0-5152-54a9-9b15-422e13d8d851', '2014-01-01', null, 2),
('6e71d809-6c03-5b45-b2fc-64fbdbbed088', 'heures_complementaires', 'Heures au-delà de la durée d''un avenant « complément d''heures »', null, null, null, null, null, null, null, 25, null, null, 'paiement', null, '1bf1d8d0-5152-54a9-9b15-422e13d8d851', '2014-01-01', null, 3),
('bacf562b-763f-579f-a1ec-2d0a3a2a9b26', 'nuit', 'Heures travaillées entre minuit et 2 h (niveaux I à IV)', null, array['I-A','I-B','II-A','II-B','III-A','III-B','III-C','IV-A','IV-B','IV-C','IV-D']::text[], null, null, null, '00:00', '02:00', 10, null, null, 'paiement', null, '362b7b79-6ec3-565b-824b-67a5e985d2a6', '2019-03-01', null, 4),
('90affde6-037c-5f6c-befe-5f1933b22833', 'nuit', 'Heures travaillées entre 2 h et 6 h (niveaux I à IV)', null, array['I-A','I-B','II-A','II-B','III-A','III-B','III-C','IV-A','IV-B','IV-C','IV-D']::text[], null, null, null, '02:00', '06:00', 30, null, null, 'paiement', null, '362b7b79-6ec3-565b-824b-67a5e985d2a6', '2019-03-01', null, 4),
('708fae4d-51e0-57a2-a683-55aff44e0deb', 'nuit', 'Travailleur de nuit : repos compensateur de 2 % par heure de nuit (22 h - 7 h)', null, null, null, null, null, '22:00', '07:00', null, null, null, 'repos', 2, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 5)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 3 (art. 36.b CCN) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050051932'),
(2, 'Art. 3 (art. 41 CCN) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046970967'),
(3, 'Art. 42 f — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833519'),
(4, 'Art. 42 g — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833519')
)
insert into public.cc_allowances (id, idcc_code, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.zone::text, v.amount::numeric, v.unit::text, v.minimum_garanti_percent::numeric, v.conditions::text, v.social_exemption_limit::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('48c39118-7fbb-544a-97fd-6e0bf36d2551', 'transport', 'Frais de taxi, VTC ou covoiturage après 22 h sans transport en commun — Île-de-France', null, null, 'Île-de-France', 23, 'par_course', null, 'Remboursement sur justificatif, plafonné par course, sous 8 jours', null, '2e612ff6-bf30-5a3f-9d5c-5cafb054323f', '2025-01-01', null, 1),
('d8fc36b8-7947-5894-b2ee-f760019de835', 'transport', 'Frais de taxi, VTC ou covoiturage après 22 h sans transport en commun — province', null, null, 'Province', 22, 'par_course', null, 'Remboursement sur justificatif, plafonné par course, sous 8 jours', null, '2e612ff6-bf30-5a3f-9d5c-5cafb054323f', '2025-01-01', null, 1),
('6a404286-0bcd-510d-9eeb-ff1aabe159b8', 'salissure', 'Indemnité de blanchissage de la tenue imposée (si entretien à la charge du salarié)', null, null, null, 0.15, 'par_heure', 3.82, '3,82 % du minimum garanti par heure effectivement travaillée, dans la limite de 151,67 h par mois (0,15 € à la date de l''avenant)', null, 'd73c8d72-bb70-575b-8596-25d79314d44e', '2023-01-01', null, 2),
('73ef7e81-0ed4-5532-831f-3fb9fb448214', 'repas', 'Indemnité de repas — journée de moins de 5 heures de travail effectif', null, null, null, 1.14, 'par_repas', null, 'Prise en charge du titre-restaurant ou indemnité sur justificatif ; montant fixé à 7,50 F dans le texte (converti)', null, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 3),
('c7d56d01-eba0-5fa6-af9e-0dfa7f48ef71', 'repas', 'Indemnité de repas — journée de 5 heures ou plus de travail effectif', null, null, null, 2.29, 'par_repas', null, 'Montant fixé à 15 F dans le texte (converti)', null, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 3),
('3a818af0-05b2-5cc8-94f2-6d43584a42ea', 'repas', 'Indemnité de repas — deux droits au repas dans la même journée', null, null, null, 3.43, 'par_jour', null, 'Montant fixé à 22,50 F dans le texte (converti)', null, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 3),
('8ef13521-97b1-5e33-b46c-aade0c756c12', 'panier', 'Prime de panier (horaires décalés, fabrication pâtisserie/viennoiserie)', null, null, null, 1.14, 'par_jour', null, 'Minimum 7,50 F (converti) par journée de travail effectif ; non cumulable avec une autre indemnisation des repas', null, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4)
) as v(id, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 3 (art. 54 CCN) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054161910 — Répartition à parts égales ; cadres : obligation de 1,50 % T1 employeur (ANI 17/11/2017) en sus'),
(2, 'Art. 3 (art. 54 CCN) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054161910'),
(3, 'Art. 5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000026277954 — Cotisation répartie 50 % employeur / 50 % salarié ; montant fixé par l''organisme choisi')
)
insert into public.cc_contributions (id, idcc_code, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.kind::text, v.label::text, v.organism::text, v.designation::text, v.categories::text[], v.classification_codes::text[], v.base::text, v.total_rate_percent::numeric, v.employer_rate_percent::numeric, v.employee_rate_percent::numeric, v.employer_fixed_amount::numeric, v.employee_fixed_amount::numeric, v.employer_min_share_percent::numeric, v.mandatory::boolean, v.company_size_min::int, v.company_size_max::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('fcba0c63-52ec-5c3e-a7a7-0bbba99851c5', 'prevoyance', 'Prévoyance conventionnelle — tranche 1', 'KLESIA Prévoyance / OCIRP (recommandés)', 'recommande', null, null, 'tranche_1', 0.5, 0.25, 0.25, null, null, null, true, null, null, '549245c4-e149-5903-83ba-86cca4eeccdb', '2026-01-01', null, 1),
('cf6fe87b-9618-5953-88c3-5dec35d84475', 'prevoyance', 'Prévoyance conventionnelle — tranche 2', 'KLESIA Prévoyance / OCIRP (recommandés)', 'recommande', null, null, 'tranche_2', 0.5, 0.25, 0.25, null, null, null, true, null, null, '549245c4-e149-5903-83ba-86cca4eeccdb', '2026-01-01', null, 2),
('8e56cf53-b579-5eeb-9c4b-cdaaa74fd595', 'mutuelle', 'Frais de santé — régime conventionnel', null, null, null, null, 'forfait', null, null, null, null, null, 50, true, null, null, '087780a1-7e1b-572a-a147-4fc3b24a8a3f', '2013-01-01', null, 3)
) as v(id, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 40 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833515'),
(2, 'Art. 37 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833510 — Uniquement si l''employeur a refusé la prise en période estivale'),
(3, 'Art. 37 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833510'),
(4, 'Art. 39 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833514')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('665e17a8-6f1f-5141-9968-d2977a331b2f', 'conges_supplementaires', null, 'Jours fériés légaux (hors 1er mai) payés ou compensés après 8 mois de présence', null, null, 8, 10, 'calendaires', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('c1e53969-7236-5a6f-af26-f24516370a39', 'fractionnement', null, 'Fractionnement imposé par l''employeur : au moins 6 jours pris du 1er novembre au 30 avril', null, null, 0, 2, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 2),
('5c4c711f-644d-5311-905a-10750b927fcd', 'fractionnement', null, 'Fractionnement imposé par l''employeur : 3 à 5 jours pris du 1er novembre au 30 avril', null, null, 0, 1, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 3),
('e1e4fa37-f3a3-54b0-852e-71aad423c20b', 'evenement_familial', 'Mariage du salarié', 'Mariage du salarié', null, null, 0, 4, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4),
('0cf96533-485b-5d19-aa07-46f4d9d731be', 'evenement_familial', 'Naissance d''un enfant', 'Naissance d''un enfant', null, null, 0, 3, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4),
('fbd01760-6cf2-5250-8e9c-025f12a25080', 'evenement_familial', 'Mariage d''un enfant', 'Mariage d''un enfant', null, null, 0, 1, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4),
('50f0863e-2d0c-5bfb-8a22-5cfe372a699b', 'evenement_familial', 'Décès du conjoint ou d''un enfant', 'Décès du conjoint ou d''un enfant', null, null, 0, 3, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4),
('410801a9-d81a-5752-8911-b3f849d60b78', 'evenement_familial', 'Décès du père ou de la mère', 'Décès du père ou de la mère', null, null, 0, 2, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4),
('79200528-1a36-554b-9278-ac74eab9e158', 'evenement_familial', 'Décès des beaux-parents, d''un frère ou d''une sœur', 'Décès des beaux-parents, d''un frère ou d''une sœur', null, null, 0, 1, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4),
('90822a9f-30bb-5934-bf8f-15c6133360b7', 'evenement_familial', 'Décès d''un grand-parent', 'Décès d''un grand-parent', null, null, 0, 1, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4),
('7198094c-17c3-55e3-97fa-1dc5e04b4d57', 'evenement_familial', 'Déménagement (par tranche de 3 ans)', 'Déménagement (par tranche de 3 ans)', null, null, 0, 2, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4),
('3f3141de-8e72-5e2a-a11b-93e3df4f4ab9', 'enfant_malade', 'Maladie d''un enfant de 16 ans ou moins (par année civile)', 'Maladie d''un enfant de 16 ans ou moins (par année civile)', null, null, 0, 1, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '2021-05-01', null, 4),
('fc9181db-733e-54e2-bd6e-912f2597fc88', 'enfant_malade', 'Hospitalisation d''un enfant de 16 ans ou moins (par enfant et par année civile)', 'Hospitalisation d''un enfant de 16 ans ou moins (par enfant et par année civile)', null, null, 0, 3, 'ouvrables', true, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '2021-05-01', null, 4)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 19 B — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833474 — À partir du 11e jour d''absence ; % de la rémunération brute, sous déduction des IJSS et de la part employeur de la prévoyance ; durées cumulées sur 12 mois')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('44968eea-a5fd-586f-9032-bb6df542de41', 'maladie', null, null, 36, 10, 1, 30, 90, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('78d799e7-a7b8-5002-8fe2-10b982615d4d', 'maladie', null, null, 36, 10, 2, 30, 70, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('a0edcf12-7d81-57d6-b56b-86b1883b8bb5', 'maladie', null, null, 96, 10, 1, 40, 90, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('38be365e-6f0c-59dd-9768-a37f19728683', 'maladie', null, null, 96, 10, 2, 40, 70, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('79f41fa5-b232-570b-a401-b85d763e8ea3', 'maladie', null, null, 156, 10, 1, 50, 90, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('16086bcc-37a4-5fe4-9eaf-37d7792ff5ce', 'maladie', null, null, 156, 10, 2, 50, 70, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('261ded99-34c4-555b-920f-51bb66852604', 'maladie', null, null, 216, 10, 1, 60, 90, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('1f395223-23d1-59d0-9d43-a5d1aef95c14', 'maladie', null, null, 216, 10, 2, 60, 70, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('490142e8-50ef-5590-8d11-5404f9d8a7df', 'maladie', null, null, 276, 10, 1, 70, 90, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('7effdde6-e946-5ba4-b5f3-2e34b48da480', 'maladie', null, null, 276, 10, 2, 70, 70, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('905eccd6-ce76-52e0-89cd-01942d98ce73', 'maladie', null, null, 336, 10, 1, 80, 90, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('dc5a755c-a1f1-5c18-8e63-d1e018c84ea4', 'maladie', null, null, 336, 10, 2, 80, 70, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('c6365ce4-3f18-5e8c-8838-25ea6dcbb91a', 'maladie', null, null, 396, 10, 1, 90, 90, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('863c94ac-f0a1-5ce3-8bb8-5fa2ac091380', 'maladie', null, null, 396, 10, 2, 90, 70, 'brut', true, 12, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 20 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833475'),
(2, 'Art. 42 b — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833519'),
(3, 'Art. 42 d — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833519'),
(4, 'Art. 46.2.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005833545')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1501', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('edc4b34f-95d2-5211-a341-a224b260ed46', 'maintien_salaire_at', 'Accident du travail / maladie professionnelle : indemnisation légale', null, null, null, null, 'Indemnisation légale (art. L. 1226-1) à partir de 6 mois de présence pour un accident du travail, 1 an pour un accident de trajet ou une maladie professionnelle', 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 1),
('aa63d372-58ca-56a6-bd9c-fd072f34a7ad', 'pause_repas', 'Pause repas inférieure à 30 minutes rémunérée comme du travail', null, null, 30, 'minutes', null, 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 2),
('02987006-a17b-5d8a-a030-1d976deb1f8c', 'droit_repas', 'Droit au repas (titre-restaurant, panier, repas sur place)', null, null, null, null, 'Acquis si la plage de travail couvre au moins une heure de pointe, ou si la durée de travail de la journée atteint 5 heures', 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 3),
('5d1ae745-b511-5dae-ac07-6c2e8dbc1ebd', 'gants_livreur', 'Livreurs deux-roues : participation à l''achat de gants', null, null, 2.5, 'minimum_garanti', 'Plafond de 2,5 MG par an si l''employeur ne fournit pas les gants ; rémunération à la course interdite', 'f636f17d-fa5f-5187-bb50-95f76b4c6278', '1988-12-13', null, 4)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
