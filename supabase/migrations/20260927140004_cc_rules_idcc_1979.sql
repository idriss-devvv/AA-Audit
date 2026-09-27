-- Critères de vérification de la convention collective IDCC 1979, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 1979 — Hôtels, cafés, restaurants (HCR) (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1979', 'texte_base', 'Convention collective nationale des hôtels, cafés, restaurants du 30 avril 1997', 'KALITEXT000005670044', '1997-04-30'::date, null::date, '1997-12-06'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005670044', 'Étendue par arrêté du 3 décembre 1997', '2026-09-27'),
('9b9d3ae1-e5dc-53da-81d5-b8d7f872d326', '1979', 'avenant', 'Avenant n° 1 du 13 juillet 2004 (durée du travail, travail de nuit, prévoyance)', 'KALITEXT000005670064', '2004-07-13'::date, null::date, null::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005670064', null, '2026-09-27'),
('95453c36-50f9-523f-8bf4-e59cd2cb2913', '1979', 'avenant', 'Avenant n° 2 du 5 février 2007 relatif à l''aménagement du temps de travail', 'KALITEXT000005670080', '2007-02-05'::date, null::date, null::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005670080', 'Date d''extension non disponible dans la base KALI : la date de signature sert de début de validité', '2026-09-27'),
('e722e297-6e3f-5803-b308-36d26925ff17', '1979', 'avenant', 'Avenant n° 6 du 15 décembre 2009 (jours fériés)', 'KALITEXT000022070654', '2009-12-15'::date, '2010-02-24'::date, '2010-03-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000022070654', null, '2026-09-27'),
('560a68ee-939b-5457-9082-d7964ec460fb', '1979', 'avenant', 'Avenant n° 22 bis du 7 octobre 2016 relatif aux cadres autonomes', 'KALITEXT000033926584', '2016-10-07'::date, '2018-03-15'::date, '2018-04-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000033926584', null, '2026-09-27'),
('1b541f8e-de8d-54a6-9fa0-0cc4c252629f', '1979', 'avenant', 'Avenant n° 2 du 10 mai 2021 à l''avenant n° 1 du 13 juillet 2004 relatif à la prévoyance', 'KALITEXT000044201741', '2021-05-10'::date, '2021-12-23'::date, '2022-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000044201741', null, '2026-09-27'),
('0c1d311c-e9b3-5668-8df2-6a93f5516088', '1979', 'accord', 'Accord du 6 octobre 2010 relatif aux frais de santé (modifié)', 'KALITEXT000023406107', '2010-10-06'::date, null::date, null::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000023406107', null, '2026-09-27'),
('b7277734-7dbf-503d-83f6-750051a3c265', '1979', 'avenant', 'Avenant n° 30 du 31 mai 2022 relatif aux classifications', 'KALITEXT000046478189', '2022-05-31'::date, '2022-11-22'::date, '2022-12-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000046478189', null, '2026-09-27'),
('6027166a-a6fc-5ba6-9376-f98835c78d8d', '1979', 'avenant_salaires', 'Avenant n° 33 du 19 juin 2024 relatif aux salaires', 'KALITEXT000050394790', '2024-06-19'::date, '2024-11-09'::date, '2024-12-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000050394790', null, '2026-09-27'),
('0602da42-bd34-5a05-815b-ae5776834a6a', '1979', 'avenant', 'Avenant n° 34 du 19 juin 2024 relatif aux jours d''absence rémunérés pour enfant malade', 'KALITEXT000050394809', '2024-06-19'::date, '2024-11-15'::date, '2024-12-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000050394809', null, '2026-09-27');

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046478194')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1979', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('f577a0ed-5835-55db-941f-56afb5539ef9', 'I-1', 'Niveau I échelon 1', 'employe', 'I', '1', null, array['Niveau I échelon 1','Niv I Ech 1']::text[], 1, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('fdd4a0f6-a1cc-5c90-93f5-8baf4e356a36', 'I-2', 'Niveau I échelon 2', 'employe', 'I', '2', null, array['Niveau I échelon 2','Niv I Ech 2']::text[], 2, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('ccd27598-e8ba-5452-919a-4dc005abfeaa', 'I-3', 'Niveau I échelon 3', 'employe', 'I', '3', null, array['Niveau I échelon 3','Niv I Ech 3']::text[], 3, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('9c001b12-20df-5d6e-beb2-dc69bdbf1058', 'II-1', 'Niveau II échelon 1', 'employe', 'II', '1', null, array['Niveau II échelon 1','Niv II Ech 1']::text[], 4, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('5426ac40-4053-5464-bf7b-bc6d6d0f828b', 'II-2', 'Niveau II échelon 2', 'employe', 'II', '2', null, array['Niveau II échelon 2','Niv II Ech 2']::text[], 5, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('5b69a939-843b-5a40-96f0-584dc08b4967', 'II-3', 'Niveau II échelon 3', 'employe', 'II', '3', null, array['Niveau II échelon 3','Niv II Ech 3']::text[], 6, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('9305c7da-b62f-57af-bfa1-4da4744e39ab', 'III-1', 'Niveau III échelon 1', 'employe', 'III', '1', null, array['Niveau III échelon 1','Niv III Ech 1']::text[], 7, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('7561dec1-2e4c-574d-8239-88384d702e1d', 'III-2', 'Niveau III échelon 2', 'employe', 'III', '2', null, array['Niveau III échelon 2','Niv III Ech 2']::text[], 8, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('8bfe3bf0-029d-5e99-825a-2d0da040c8fa', 'III-3', 'Niveau III échelon 3', 'employe', 'III', '3', null, array['Niveau III échelon 3','Niv III Ech 3']::text[], 9, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('96cca95a-f46e-5969-89bd-b23c8a0954b9', 'IV-1', 'Niveau IV échelon 1', 'agent_maitrise', 'IV', '1', null, array['Niveau IV échelon 1','Niv IV Ech 1']::text[], 10, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('b8ffe18a-ff7e-523c-a07c-29d381acb8fc', 'IV-2', 'Niveau IV échelon 2', 'agent_maitrise', 'IV', '2', null, array['Niveau IV échelon 2','Niv IV Ech 2']::text[], 11, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('5c911875-9814-5bc4-9abd-97d622d821fd', 'IV-3', 'Niveau IV échelon 3', 'agent_maitrise', 'IV', '3', null, array['Niveau IV échelon 3','Niv IV Ech 3']::text[], 12, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('40323602-a4a2-5cad-bc10-0fdc67512218', 'V-1', 'Niveau V échelon 1', 'cadre', 'V', '1', null, array['Niveau V échelon 1','Niv V Ech 1']::text[], 13, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('7083a9de-4f60-5097-9842-411d1f9e85cd', 'V-2', 'Niveau V échelon 2', 'cadre', 'V', '2', null, array['Niveau V échelon 2','Niv V Ech 2']::text[], 14, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1),
('e50af7cd-aac8-5f8b-899b-cc16524fddad', 'V-3', 'Niveau V échelon 3', 'cadre', 'V', '3', null, array['Niveau V échelon 3','Niv V Ech 3']::text[], 15, 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 1)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050394795')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1979', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('fa41a6d5-e2c4-538a-a50d-057a8f1f6faa', 'I-1', 12.0, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('9e29cc4a-4a4e-5512-9445-3b21e6c5b015', 'I-2', 12.08, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('5ce0d1ef-b58c-5203-beb7-1dfe786bfad0', 'I-3', 12.18, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('8d4f34bc-33cf-5302-8e5c-ee98497e7d86', 'II-1', 12.28, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('ddf81e9d-a6ba-5ea1-818d-01ea52cba76b', 'II-2', 12.55, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('08e09df2-aae7-5317-9948-217adbae974c', 'II-3', 13.17, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('e5fed043-6fe5-51fd-a8fa-478f2d14eb4a', 'III-1', 13.32, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('b9c2d840-97c0-5979-95a3-865070ffcf4a', 'III-2', 13.54, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('be9de91e-0aed-5193-a01c-cc07b0edfe37', 'III-3', 14.0, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('598b71a3-8433-5557-a76f-b14f2806f67d', 'IV-1', 14.4, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('47935183-66b5-5a87-b855-b575ea862bde', 'IV-2', 14.77, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('5cf125bc-29ae-50c3-9e98-d38587fff37e', 'IV-3', 15.4, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('0b54771a-1117-5b74-9468-ccd93c87ffa4', 'V-1', 18.43, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('5d820187-3913-5be8-af7c-c5d6ee9b3004', 'V-2', 21.78, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1),
('5c0d4314-bb63-5617-8093-c1f3de95cdd5', 'V-3', 28.12, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '6027166a-a6fc-5ba6-9376-f98835c78d8d', '2024-12-01', null, 1)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826385 — Durée hebdomadaire fixée à 39 heures (les entreprises peuvent retenir une durée inférieure) ; heures de la 36e à la 39e majorées de 10 %'),
(2, 'Art. 5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826387 — Contingent annuel : 360 h pour les établissements permanents ; 90 h par trimestre civil pour les saisonniers ; en cas de modulation : 130 h (porté à 360 h dans certains cas)'),
(3, 'Art. 2.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000033926597 — Jours travaillés au-delà du forfait (renonciation à des jours de repos) : +15 % pour les 5 premiers jours, +25 % ensuite')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1979', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('460f3fa0-1e48-519f-9e18-a3e8cd8ee2c4', null, null, 'standard', 39, 169, null, null, null, null, null, null, null, '95453c36-50f9-523f-8bf4-e59cd2cb2913', '2007-02-05', null, 1),
('8ed07812-7041-57a5-a858-6b3ff18fc802', null, null, 'standard', null, null, null, 360, null, null, null, null, null, '95453c36-50f9-523f-8bf4-e59cd2cb2913', '2007-02-05', null, 2),
('f435f5bd-0f94-5767-97ec-e2028c82e8f3', array['cadre']::text[], null, 'forfait_jours', null, null, null, null, 218, null, null, null, null, '560a68ee-939b-5457-9082-d7964ec460fb', '2018-04-01', null, 3)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826386 — Repos compensateur de remplacement possible : 110 %'),
(2, 'Art. 4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826386 — Repos compensateur de remplacement possible : 120 %'),
(3, 'Art. 4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826386 — Repos compensateur de remplacement possible : 150 %'),
(4, 'Art. 16.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826358 — Contrepartie en repos, pas de majoration de salaire conventionnelle'),
(5, 'Art. 26.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826290'),
(6, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000033926597')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1979', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('b5bf962a-973c-534b-aedd-efa64fbd76ff', 'heures_supplementaires', 'Heures de la 36e à la 39e', null, null, 35, 39, 'semaine', null, null, 10, null, null, 'paiement_ou_repos', null, '95453c36-50f9-523f-8bf4-e59cd2cb2913', '2007-02-05', null, 1),
('c1a89182-37a7-5492-97e1-ee33716fb98f', 'heures_supplementaires', 'Heures de la 40e à la 43e', null, null, 39, 43, 'semaine', null, null, 20, null, null, 'paiement_ou_repos', null, '95453c36-50f9-523f-8bf4-e59cd2cb2913', '2007-02-05', null, 2),
('974ef075-5040-5386-89ad-5fca0665e2b3', 'heures_supplementaires', 'Heures à partir de la 44e', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement_ou_repos', null, '95453c36-50f9-523f-8bf4-e59cd2cb2913', '2007-02-05', null, 3),
('d56a93b0-8320-59a4-a372-d5825d0cdea5', 'nuit', 'Travailleur de nuit : repos compensateur de 1 % par heure de nuit (forfait 2 jours/an à temps plein)', null, null, null, null, null, '22:00', '07:00', null, null, null, 'repos', 1, '9b9d3ae1-e5dc-53da-81d5-b8d7f872d326', '2004-07-13', null, 4),
('9bab9c2b-c8c0-5d5b-b1b9-46486ad3e248', 'jour_ferie', '1er mai travaillé : indemnité égale au salaire de la journée (fixe) ou à la répartition du service', null, null, null, null, null, null, null, 100, null, null, 'paiement', null, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 5),
('29784865-92c6-5cad-bee4-ecd791a84815', 'autre', 'Jours travaillés au-delà du forfait jours : 5 premiers jours', array['cadre']::text[], null, null, null, null, null, null, 15, null, null, 'paiement', null, '560a68ee-939b-5457-9082-d7964ec460fb', '2018-04-01', null, 6),
('2d2b913c-58d7-5705-9971-f2095bb5d660', 'autre', 'Jours travaillés au-delà du forfait jours : jours suivants', array['cadre']::text[], null, null, null, null, null, null, 25, null, null, 'paiement', null, '560a68ee-939b-5457-9082-d7964ec460fb', '2018-04-01', null, 6)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 18.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044201745 — 50 % employeur / 50 % salarié ; incapacité et invalidité financées 4/5 salarié et 1/5 employeur sans modifier la répartition globale. Assiette : salaire brut limité à la tranche A'),
(2, 'Art. 12 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000032064828 — Cotisation forfaitaire mensuelle (non proratisée), répartie 50 % employeur / 50 % salarié ; montant fixé avec l''organisme assureur')
)
insert into public.cc_contributions (id, idcc_code, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1979', v.kind::text, v.label::text, v.organism::text, v.designation::text, v.categories::text[], v.classification_codes::text[], v.base::text, v.total_rate_percent::numeric, v.employer_rate_percent::numeric, v.employee_rate_percent::numeric, v.employer_fixed_amount::numeric, v.employee_fixed_amount::numeric, v.employer_min_share_percent::numeric, v.mandatory::boolean, v.company_size_min::int, v.company_size_max::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('fbdad39a-2521-5bc9-b65a-08e307f46435', 'prevoyance', 'Prévoyance conventionnelle (décès, rente éducation, incapacité, invalidité)', null, null, null, null, 'tranche_a', 0.86, null, null, null, null, 50, true, null, null, '1b541f8e-de8d-54a6-9fa0-0cc4c252629f', '2022-01-01', null, 1),
('5ebf1149-6ec0-538e-b3d2-54164ee79bd3', 'mutuelle', 'Frais de santé — forfait mensuel par salarié', null, null, null, null, 'forfait', null, null, null, null, null, 50, true, null, null, '0c1d311c-e9b3-5668-8df2-6a93f5516088', '2016-01-01', null, 2)
) as v(id, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 6 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000022070668 — Jour férié travaillé ou tombant un jour de repos : compensation en temps ou indemnisation'),
(2, 'Art. 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826347'),
(3, 'Art. 25.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826287'),
(4, 'Art. 2.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050394815'),
(5, 'Art. 2.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050394816')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1979', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('9392eb49-3be7-5f0d-b88a-35ddc9c08ed3', 'conges_supplementaires', null, 'Jours fériés (en plus du 1er mai) après 1 an d''ancienneté, dont 6 garantis', null, null, 12, 10, 'calendaires', true, 'e722e297-6e3f-5803-b308-36d26925ff17', '2010-03-01', null, 1),
('df3b2774-4319-5a68-8697-b99db68f28db', 'autre', null, 'Habillage/déshabillage sans contrepartie fixée par l''entreprise : 1 jour de congé par an', null, null, 12, 1, 'ouvrables', true, '9b9d3ae1-e5dc-53da-81d5-b8d7f872d326', '2004-07-13', null, 2),
('043c4db8-6d84-5dfb-9de2-5d059f4b9fb8', 'evenement_familial', 'Mariage du salarié', 'Mariage du salarié', null, null, 0, 4, 'ouvrables', true, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 3),
('e4914be4-64f8-55bb-8874-29d3df67f168', 'evenement_familial', 'Naissance ou adoption', 'Naissance ou adoption', null, null, 0, 3, 'ouvrables', true, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 3),
('256eb83d-7399-5be8-b333-b1dc2a56ffec', 'evenement_familial', 'Décès du conjoint ou d''un enfant', 'Décès du conjoint ou d''un enfant', null, null, 0, 2, 'ouvrables', true, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 3),
('76e0832f-7508-50e2-a4ad-66c47d3e03a6', 'evenement_familial', 'Mariage d''un enfant', 'Mariage d''un enfant', null, null, 0, 1, 'ouvrables', true, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 3),
('3ee83752-235a-5ff0-b1d7-c05676f638c2', 'evenement_familial', 'Décès du père ou de la mère', 'Décès du père ou de la mère', null, null, 0, 1, 'ouvrables', true, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 3),
('76f2b359-dd7e-5392-8634-ef1f42315aa0', 'evenement_familial', 'Décès d''un grand-parent', 'Décès d''un grand-parent', null, null, 0, 1, 'ouvrables', true, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 3),
('2bf8cfb5-e7b3-5986-82c9-ef61ee968c2e', 'evenement_familial', 'Décès du beau-père, de la belle-mère, d''un frère ou d''une sœur', 'Décès du beau-père, de la belle-mère, d''un frère ou d''une sœur', null, null, 3, 1, 'ouvrables', true, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 3),
('be591407-a0a3-5518-b5ef-95f8526b409d', 'evenement_familial', 'Présélection militaire (maximum)', 'Présélection militaire (maximum)', null, null, 3, 3, 'ouvrables', true, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 3),
('3d8588d2-cbb0-5068-935b-95f71418dbe1', 'enfant_malade', 'Hospitalisation d''un enfant de moins de 16 ans', 'Hospitalisation d''un enfant (jours rémunérés par année civile)', null, null, 12, 3, 'ouvrables', true, '0602da42-bd34-5a05-815b-ae5776834a6a', '2024-12-01', null, 4),
('60d17777-c75e-5271-9f87-a327877c9b02', 'enfant_malade', 'Maladie d''un enfant de moins de 10 ans', 'Maladie d''un enfant (jours rémunérés par année civile, imputés sur le congé légal)', null, null, 12, 2, 'ouvrables', true, '0602da42-bd34-5a05-815b-ae5776834a6a', '2024-12-01', null, 5)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 29.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826294 — Indemnisation dès le 1er jour ; 90 % puis 66,66 % de la rémunération brute, sous déduction des IJSS et de la prévoyance ; durées cumulées sur 12 mois'),
(2, 'Art. 29.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826294 — Indemnisation à partir du 11e jour ; 90 % puis 66,66 % de la rémunération brute, sous déduction des IJSS et de la prévoyance ; durées cumulées sur 12 mois')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1979', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('3fe41ac5-2df0-5fae-828d-e683167d6f4d', 'accident_travail', null, null, 36, 0, 1, 30, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('124c3d76-95ef-53f2-b039-1552847f07fc', 'accident_travail', null, null, 36, 0, 2, 30, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('ab59dca7-41ef-5d6e-93e9-9a6f7aa0cd04', 'maladie_professionnelle', null, null, 36, 0, 1, 30, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('de63d1dc-feca-51f0-92b9-42ba05807fcf', 'maladie_professionnelle', null, null, 36, 0, 2, 30, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('de927a6b-0ec2-51fe-9e6f-0cbfd0910512', 'maladie', null, null, 36, 10, 1, 30, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('2afb95b6-e31b-50d9-8e97-09dc1b81d74e', 'maladie', null, null, 36, 10, 2, 30, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('620ef5e7-1b67-5aa6-9ec7-39b5ae85b63a', 'accident_trajet', null, null, 36, 10, 1, 30, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('3bd7fd4f-ecb0-5521-92db-4b437275843b', 'accident_trajet', null, null, 36, 10, 2, 30, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('d373d179-c9ab-57bf-8259-cccfd41a266d', 'accident_travail', null, null, 96, 0, 1, 40, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('88a60890-990b-5f3e-9cfd-0cc48ff9deff', 'accident_travail', null, null, 96, 0, 2, 40, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('339af95e-1b9d-5984-b0fe-5126c55e5a2f', 'maladie_professionnelle', null, null, 96, 0, 1, 40, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('b909a31a-5b1e-51e2-b3f0-23462322fddf', 'maladie_professionnelle', null, null, 96, 0, 2, 40, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('89f029f2-2911-5b4e-bd5a-625ec2628fab', 'maladie', null, null, 96, 10, 1, 40, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('11246a74-5795-5920-82e9-ad6d75bf6129', 'maladie', null, null, 96, 10, 2, 40, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('48f3093b-5d45-5aa0-97da-408f7eaab3fb', 'accident_trajet', null, null, 96, 10, 1, 40, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('a33c6885-035a-5746-a627-cb17bdbc0396', 'accident_trajet', null, null, 96, 10, 2, 40, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('639c9a39-71b9-5e3e-bd8e-4a26dd1b7082', 'accident_travail', null, null, 156, 0, 1, 50, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('6bea4eda-3a78-599d-b713-04b963d3ee98', 'accident_travail', null, null, 156, 0, 2, 50, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('20c42492-937f-5939-9fef-33ccd5a15414', 'maladie_professionnelle', null, null, 156, 0, 1, 50, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('4424cb44-4ced-5962-b1ab-08132cd76681', 'maladie_professionnelle', null, null, 156, 0, 2, 50, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('3fdec1b0-bdee-5fb1-8101-3ae2aef8b0b3', 'maladie', null, null, 156, 10, 1, 50, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('731f8842-a748-5a58-bb92-a34c0dd4937a', 'maladie', null, null, 156, 10, 2, 50, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('acb84698-2bbd-5ba5-879d-7bcdafb9cec0', 'accident_trajet', null, null, 156, 10, 1, 50, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('f3af78eb-9a9b-5299-9e86-5526c252ddd0', 'accident_trajet', null, null, 156, 10, 2, 50, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('7a70442d-c08f-5ba5-b116-cfcd6b92d853', 'accident_travail', null, null, 216, 0, 1, 60, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('485eab9d-240e-571b-96ed-1c8371811c94', 'accident_travail', null, null, 216, 0, 2, 60, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('dde9e64a-46fe-5aeb-870a-68c91f124102', 'maladie_professionnelle', null, null, 216, 0, 1, 60, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('00016bc0-1776-59eb-88f3-49f69a1b775b', 'maladie_professionnelle', null, null, 216, 0, 2, 60, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('057b9f4e-442b-576c-8b53-8e4d2f8abe4a', 'maladie', null, null, 216, 10, 1, 60, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('8c2340ab-cdb0-544d-84f4-bcf0f322260f', 'maladie', null, null, 216, 10, 2, 60, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('b4b63f47-42b7-5b2f-b2c0-dce4c047e57a', 'accident_trajet', null, null, 216, 10, 1, 60, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('183ab337-30db-5a47-ba60-56809170efc1', 'accident_trajet', null, null, 216, 10, 2, 60, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('4f94e2af-5800-57b6-9082-db4c1ee9d159', 'accident_travail', null, null, 276, 0, 1, 70, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('c32267ca-32cc-5a39-bfce-663ea0a24b37', 'accident_travail', null, null, 276, 0, 2, 70, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('237aa4d2-a273-50db-805e-db35626f8a90', 'maladie_professionnelle', null, null, 276, 0, 1, 70, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('87aa4e7a-fb18-5e46-8397-97779938076e', 'maladie_professionnelle', null, null, 276, 0, 2, 70, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('334c7298-40e5-5257-a6e4-90586186dc7a', 'maladie', null, null, 276, 10, 1, 70, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('0eed29e8-2168-5501-a77b-a90acc79f401', 'maladie', null, null, 276, 10, 2, 70, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('792ce540-4e11-5292-bb3b-4f9af568a6cd', 'accident_trajet', null, null, 276, 10, 1, 70, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('2bbc2261-c340-5293-9843-5d8828efbbed', 'accident_trajet', null, null, 276, 10, 2, 70, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('e7bf7183-30ee-50fb-a489-5198bc234681', 'accident_travail', null, null, 336, 0, 1, 80, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('c00d59ca-9378-5e99-aa49-f4f971e834b1', 'accident_travail', null, null, 336, 0, 2, 80, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('e092d5ba-7be7-5557-a39b-4479c2a51acf', 'maladie_professionnelle', null, null, 336, 0, 1, 80, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('0d381fc5-08b0-50d1-ae28-1d9faea3cef4', 'maladie_professionnelle', null, null, 336, 0, 2, 80, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('bf6402df-ea76-544d-a01c-49e856c22d5d', 'maladie', null, null, 336, 10, 1, 80, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('ba445866-7664-5fb6-b268-8c503735528e', 'maladie', null, null, 336, 10, 2, 80, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('bc7eb470-62f6-5138-bf4b-9a8452b5d530', 'accident_trajet', null, null, 336, 10, 1, 80, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('520882e3-8372-5ec0-9558-1b96949222f5', 'accident_trajet', null, null, 336, 10, 2, 80, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('dc21649b-d1eb-5266-85f2-55d0271ae6a1', 'accident_travail', null, null, 396, 0, 1, 90, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('d7bdc591-50d2-5653-aa23-83b84ea04a86', 'accident_travail', null, null, 396, 0, 2, 90, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('d5275dcd-1023-51bd-a247-cfa42befff31', 'maladie_professionnelle', null, null, 396, 0, 1, 90, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('1afb5220-b778-536d-8df6-e58dd6d6ddfa', 'maladie_professionnelle', null, null, 396, 0, 2, 90, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 1),
('049a9f48-e279-55de-aa33-0d72cb645f7c', 'maladie', null, null, 396, 10, 1, 90, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('c6ee34ae-a464-5f22-8ff8-cc27c0ab43d6', 'maladie', null, null, 396, 10, 2, 90, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('28c9dce4-5e22-56e4-ab84-44ee26543bb3', 'accident_trajet', null, null, 396, 10, 1, 90, 90, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2),
('f55b38f6-fb22-54ad-9d77-8a834b0ba2ed', 'accident_trajet', null, null, 396, 10, 2, 90, 66.66, 'brut', true, 12, 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 2)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 17 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826359'),
(2, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046478195'),
(3, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826286')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1979', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('728c22ee-23eb-5a90-8124-9763702393ac', 'avantage_nourriture', 'Repas pris sur place : contribution plafonnée à l''avantage en nature réglementaire', null, null, null, null, 'Le salarié qui prend son repas sur place ne peut se voir réclamer une contribution supérieure à l''évaluation réglementaire de l''avantage en nature ; la déduction de la moitié de l''avantage nourriture est supprimée', '9b9d3ae1-e5dc-53da-81d5-b8d7f872d326', '2004-07-13', null, 1),
('1dccb1e8-c158-5cea-ad50-d19b9109db5a', 'mention_bulletin', 'Mentions conventionnelles du bulletin de paie', null, null, null, null, 'Emploi, niveau et échelon de classification', 'b7277734-7dbf-503d-83f6-750051a3c265', '2022-12-01', null, 2),
('f5455d39-78a6-56a8-a4ba-cb950fdcdbcd', 'indemnite_conges_payes', 'Indemnité de congés payés', null, null, 10, 'pourcent', '1/10e de la rémunération brute de la période de référence (1er juin - 31 mai) ou maintien de salaire si plus favorable ; salariés au pourboire : base forfaitaire sécurité sociale', 'b1dde8d7-afc9-5e9e-88b1-4a5f61450b04', '1997-12-06', null, 3)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
