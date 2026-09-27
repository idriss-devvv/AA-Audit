-- Critères de vérification de la convention collective IDCC 3043, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 3043 — Entreprises de propreté et services associés (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('84e45803-8a25-56cf-86a9-42226bd2acc1', '3043', 'texte_base', 'Convention collective nationale des entreprises de propreté et services associés du 26 juillet 2011', 'KALITEXT000027172340', '2011-07-26'::date, '2012-07-28'::date, '2012-08-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000027172340', null, '2026-09-27'),
('32e7f833-be8c-5be0-9950-d6e2be9e40f6', '3043', 'avenant_salaires', 'Avenant n° 27 du 18 décembre 2025 à l''accord du 25 juin 2002 relatif aux classifications et aux salaires', 'KALITEXT000053748392', '2025-12-18'::date, '2026-03-05'::date, '2026-04-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000053748392', null, '2026-09-27'),
('18c01aa6-20a7-551a-baf6-7f6ddaa92d27', '3043', 'accord', 'Accord du 23 janvier 2002 relatif à l''indemnité de transport (modifié par avenants n° 4 et n° 5)', 'KALITEXT000005665494', '2002-01-23'::date, null::date, '2022-07-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005665494', null, '2026-09-27');

with n(k, t) as (values
(1, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053748401')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('1779e664-fa8d-5b6c-8bb0-882d72828add', 'ASP', 'Agent de service propreté', 'ouvrier', 'ASP', null, null, array['ASP','Agent de service propreté']::text[], 0, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('46bbef9e-6280-5871-a8a4-c955e316c6c5', 'ASC', 'Agent de service confirmé', 'ouvrier', 'ASC', null, null, array['ASC','Agent de service confirmé']::text[], 1, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('e7f24985-3db8-51db-9396-7441a01a6da7', 'ASCS', 'Agent de service chef d''équipe / confirmé supérieur', 'ouvrier', 'ASCS', null, null, array['ASCS','Agent de service chef d''équipe / confirmé supérieur']::text[], 2, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('ed18ff99-d0c3-5d53-8762-9b9ee6afcf69', 'AQS1', 'Agent qualifié de service 1', 'ouvrier', 'AQS', '1', null, array['AQS1','Agent qualifié de service 1']::text[], 3, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('f4177b34-a571-5857-8b83-b88a5f1d4e86', 'AQS2', 'Agent qualifié de service 2', 'ouvrier', 'AQS', '2', null, array['AQS2','Agent qualifié de service 2']::text[], 4, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('fef9abcd-3308-5e4a-bc50-d0b267428c82', 'AQS3', 'Agent qualifié de service 3', 'ouvrier', 'AQS', '3', null, array['AQS3','Agent qualifié de service 3']::text[], 5, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('1160ff99-5004-51af-9b78-02ae42e63e65', 'ATQS1', 'Agent très qualifié de service 1', 'ouvrier', 'ATQS', '1', null, array['ATQS1','Agent très qualifié de service 1']::text[], 6, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('0740c7e4-3a11-5731-bac8-c7f8b59461bb', 'ATQS2', 'Agent très qualifié de service 2', 'ouvrier', 'ATQS', '2', null, array['ATQS2','Agent très qualifié de service 2']::text[], 7, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('bb2db0b1-dd46-5871-8bb2-05b7b5844426', 'ATQS3', 'Agent très qualifié de service 3', 'ouvrier', 'ATQS', '3', null, array['ATQS3','Agent très qualifié de service 3']::text[], 8, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('e5e60f2f-aa2d-54d3-80d7-c097b8d28459', 'CE1', 'Chef d''équipe 1', 'agent_maitrise', 'CE', '1', null, array['CE1','Chef d''équipe 1']::text[], 9, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('7718efd9-f71f-524a-95db-204aa183a0aa', 'CE2', 'Chef d''équipe 2', 'agent_maitrise', 'CE', '2', null, array['CE2','Chef d''équipe 2']::text[], 10, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('d84318e3-a5a4-5fb4-9309-4d181c66df10', 'CE3', 'Chef d''équipe 3', 'agent_maitrise', 'CE', '3', null, array['CE3','Chef d''équipe 3']::text[], 11, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('e2eb12a6-d19d-5f87-b523-de58ac199e55', 'MP1', 'Maîtrise d''exploitation 1', 'agent_maitrise', 'MP', '1', null, array['MP1','Maîtrise d''exploitation 1']::text[], 12, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('b2c988fc-09b5-524a-aa35-7990cb2e7fc2', 'MP2', 'Maîtrise d''exploitation 2', 'agent_maitrise', 'MP', '2', null, array['MP2','Maîtrise d''exploitation 2']::text[], 13, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('71990212-2010-5723-859a-bc77b93742dd', 'MP3', 'Maîtrise d''exploitation 3', 'agent_maitrise', 'MP', '3', null, array['MP3','Maîtrise d''exploitation 3']::text[], 14, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('1ad7e711-4fa4-5a94-961e-7e94a5128421', 'MP4', 'Maîtrise d''exploitation 4 (assimilé cadre)', 'agent_maitrise', 'MP', '4', null, array['MP4','Maîtrise d''exploitation 4 (assimilé cadre)']::text[], 15, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('b78b2c84-1b02-5121-b34b-fa6e5012a4cf', 'MP5', 'Maîtrise d''exploitation 5 (assimilé cadre)', 'agent_maitrise', 'MP', '5', null, array['MP5','Maîtrise d''exploitation 5 (assimilé cadre)']::text[], 16, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('6d90b4bf-9b19-5fa5-8536-6c249c71fdf5', 'EA1', 'Employé administratif 1', 'employe', 'EA', '1', null, array['EA1','Employé administratif 1']::text[], 17, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('9bd3755f-2633-5c7c-97e2-120e42ad70fa', 'EA2', 'Employé administratif 2', 'employe', 'EA', '2', null, array['EA2','Employé administratif 2']::text[], 18, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('dfdc2634-7851-5baa-92c2-b70b7820e7d1', 'EA3', 'Employé administratif 3', 'employe', 'EA', '3', null, array['EA3','Employé administratif 3']::text[], 19, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('12d873db-a4d4-543e-aea3-7756052d0eed', 'EA4', 'Employé administratif 4', 'employe', 'EA', '4', null, array['EA4','Employé administratif 4']::text[], 20, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('f36670d9-5d36-5641-bc9e-71401df605bd', 'MA1', 'Maîtrise administrative 1', 'agent_maitrise', 'MA', '1', null, array['MA1','Maîtrise administrative 1']::text[], 21, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('bf314740-715a-5a62-960a-5701fb5b7407', 'MA2', 'Maîtrise administrative 2', 'agent_maitrise', 'MA', '2', null, array['MA2','Maîtrise administrative 2']::text[], 22, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('09bcc1fa-6c62-58bf-8c0a-26061f76230e', 'MA3', 'Maîtrise administrative 3 (assimilé cadre)', 'agent_maitrise', 'MA', '3', null, array['MA3','Maîtrise administrative 3 (assimilé cadre)']::text[], 23, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('22efe3ff-4268-5f17-a153-df8527f6ba3b', 'CA1', 'Cadre CA1', 'cadre', 'CA', '1', null, array['CA1']::text[], 24, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('eb5b6ec3-8a94-5643-b529-8c32050e213e', 'CA2', 'Cadre CA2', 'cadre', 'CA', '2', null, array['CA2']::text[], 25, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('f25c9c36-d964-5e7f-9465-1b94c9beb35f', 'CA3', 'Cadre CA3', 'cadre', 'CA', '3', null, array['CA3']::text[], 26, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('ea15d406-0e13-53ec-b8fd-82ccdd2af55d', 'CA4', 'Cadre CA4', 'cadre', 'CA', '4', null, array['CA4']::text[], 27, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('b8964a5f-8160-5fd5-9cac-278d7b5309be', 'CA5', 'Cadre CA5', 'cadre', 'CA', '5', null, array['CA5']::text[], 28, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('d9f88ed8-9a43-5a1c-b637-0aa1074103d1', 'CA6', 'Cadre CA6', 'cadre', 'CA', '6', null, array['CA6']::text[], 29, '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053748401'),
(2, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053748401 — Applicable si le salarié exerce de façon continue pendant 3 mois propreté et prestations associées (hors remplacement)')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('33e96b3e-f788-5aa7-88a6-7653611b9f89', 'ASP', 12.52, 'horaire', null, null, 'standard', 'colonne A (propreté ou prestations associées)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('ba3e95a2-f6dc-5b19-9758-ef957cbe9f94', 'ASP', 12.71, 'horaire', null, null, 'standard', 'colonne B (propreté et prestations associées, exercice continu 3 mois)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 2),
('65f5381a-11dc-5091-af99-e8d86d502c06', 'ASC', 12.57, 'horaire', null, null, 'standard', 'colonne A (propreté ou prestations associées)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('903c1998-843f-58f8-8430-1e4c21c301bc', 'ASC', 12.79, 'horaire', null, null, 'standard', 'colonne B (propreté et prestations associées, exercice continu 3 mois)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 2),
('7e1d6453-b86f-5609-b283-77dfb7ec4bc9', 'ASCS', 12.64, 'horaire', null, null, 'standard', 'colonne A (propreté ou prestations associées)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('9300d8f5-fd1c-5de0-b7ce-1ceca7b24fb0', 'ASCS', 12.86, 'horaire', null, null, 'standard', 'colonne B (propreté et prestations associées, exercice continu 3 mois)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 2),
('b6539e71-5125-509b-8e07-c3a8507e6acd', 'AQS1', 12.7, 'horaire', null, null, 'standard', 'colonne A (propreté ou prestations associées)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('8d9889fe-4d46-5754-8421-e5cd201e5ba3', 'AQS1', 12.91, 'horaire', null, null, 'standard', 'colonne B (propreté et prestations associées, exercice continu 3 mois)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 2),
('f4168e90-db29-569c-a286-f7059b7a84ca', 'AQS2', 12.81, 'horaire', null, null, 'standard', 'colonne A (propreté ou prestations associées)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('3ee6c584-9e07-574d-ad05-8d4157ee12c4', 'AQS2', 13.05, 'horaire', null, null, 'standard', 'colonne B (propreté et prestations associées, exercice continu 3 mois)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 2),
('b105b8c5-d4cd-5e05-a370-2cdfbff4ff92', 'AQS3', 12.92, 'horaire', null, null, 'standard', 'colonne A (propreté ou prestations associées)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('4cfbbd25-27aa-55e3-9599-a7c3cf2d349a', 'AQS3', 13.16, 'horaire', null, null, 'standard', 'colonne B (propreté et prestations associées, exercice continu 3 mois)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 2),
('f1aa1a2c-6755-5860-8601-b0efad1d63c9', 'ATQS1', 13.17, 'horaire', null, null, 'standard', 'colonne A (propreté ou prestations associées)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('649f022d-755a-59cb-8580-cb4c893f3017', 'ATQS1', 13.39, 'horaire', null, null, 'standard', 'colonne B (propreté et prestations associées, exercice continu 3 mois)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 2),
('820a5495-d5ba-5ffe-b0ac-394865e866eb', 'ATQS2', 13.91, 'horaire', null, null, 'standard', 'colonne A (propreté ou prestations associées)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('24e8bdeb-b778-5cb5-bb1f-6169bcb68c66', 'ATQS2', 14.16, 'horaire', null, null, 'standard', 'colonne B (propreté et prestations associées, exercice continu 3 mois)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 2),
('5f604bee-509b-5ba1-ba07-ba853679fc15', 'ATQS3', 14.95, 'horaire', null, null, 'standard', 'colonne A (propreté ou prestations associées)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('e1c8d1a2-ce01-5100-9b91-4aa10ab6a362', 'ATQS3', 15.27, 'horaire', null, null, 'standard', 'colonne B (propreté et prestations associées, exercice continu 3 mois)', 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 2),
('7b7a9680-ab07-5893-b9f4-eda2f43e77c4', 'CE1', 14.43, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('840a99b0-382c-59af-a6a8-6dc5d64e5905', 'CE2', 15.27, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('5c55a62a-eb57-52b4-9036-1da95e714177', 'CE3', 15.44, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('61161083-b8ce-5db5-8179-639aa60a3896', 'MP1', 15.52, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('d3f30c78-ff76-5dee-b369-de4107940a47', 'MP2', 16.39, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('703b2c79-6da5-5c13-818c-e90ef5936716', 'MP3', 18.18, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('5374c982-f86a-5eae-92a2-5e8dfa340960', 'MP4', 20.25, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('38fab31f-ace0-5c95-81bd-f526e45b44ff', 'MP5', 21.9, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('a5005855-ee95-5bc7-bc8b-2b46e60eb1e5', 'EA1', 12.63, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('d083ff6e-0bc6-5f53-a709-d6d78421a52f', 'EA2', 13.54, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('9c3987de-b0fb-5c69-8740-ff2898aeaebf', 'EA3', 14.89, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('2328521a-2b43-5f17-bc72-f666cbd6ebca', 'EA4', 16.29, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('d4d60bae-1799-56e4-bdd1-13bbd87f11b4', 'MA1', 18.11, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('8e9de9fb-65a9-5d85-8363-1ca046abde7c', 'MA2', 20.56, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('ad0b7e8e-bc64-5b20-9bab-e9fb60e1c8d7', 'MA3', 21.68, 'horaire', null, null, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('d4bca9fb-a9ab-578d-97f6-b9f0b9d3544e', 'CA1', 3279.71, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('687beefc-a6e2-5ca2-b741-e5b2079a74db', 'CA2', 3868.89, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('fd972b59-3f77-59a3-aefe-71b31cd9a7c8', 'CA3', 4323.69, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('e3a3daa3-6fed-553e-aca4-d2df895875f9', 'CA4', 4998.1, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('2a25391b-5ccc-56c5-9312-f07305c1497e', 'CA5', 5304.54, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1),
('6453f432-1330-5503-8f9a-01f0ca48615f', 'CA6', 5795.71, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '32e7f833-be8c-5be0-9950-d6e2be9e40f6', '2026-04-01', null, 1)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 4.7.6 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172413 — Prime d''expérience mensuelle, sur la rémunération minimale hiérarchique du coefficient (limite temps plein), réduite en cas d''absence non indemnisée ; doit figurer sur le bulletin')
)
insert into public.cc_seniority_bonuses (id, idcc_code, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.prorata_working_time::boolean, v.seniority_definition::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('38af950e-5e03-5eb0-ba8b-051b0bb0d632', array['ouvrier','employe','agent_maitrise']::text[], null, 48, 2, null, 'minimum_conventionnel', true, 'Expérience professionnelle dans la branche (changement d''entreprise possible si interruption ≤ 12 mois)', '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('c837c7c0-3f39-5616-a4e1-475ace225aee', array['ouvrier','employe','agent_maitrise']::text[], null, 72, 3, null, 'minimum_conventionnel', true, 'Expérience professionnelle dans la branche (changement d''entreprise possible si interruption ≤ 12 mois)', '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('c0b0df7a-bc44-579e-9a90-fd898f9ae420', array['ouvrier','employe','agent_maitrise']::text[], null, 96, 4, null, 'minimum_conventionnel', true, 'Expérience professionnelle dans la branche (changement d''entreprise possible si interruption ≤ 12 mois)', '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('9c9213ee-ec70-5954-b466-b62752456c2e', array['ouvrier','employe','agent_maitrise']::text[], null, 120, 5, null, 'minimum_conventionnel', true, 'Expérience professionnelle dans la branche (changement d''entreprise possible si interruption ≤ 12 mois)', '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('0473f7e6-b08f-5c5b-bbdf-a9f977edd639', array['ouvrier','employe','agent_maitrise']::text[], null, 180, 5.5, null, 'minimum_conventionnel', true, 'Expérience professionnelle dans la branche (changement d''entreprise possible si interruption ≤ 12 mois)', '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('b849b936-9810-51c1-a8c1-b4fa5e1f5d2d', array['ouvrier','employe','agent_maitrise']::text[], null, 240, 6, null, 'minimum_conventionnel', true, 'Expérience professionnelle dans la branche (changement d''entreprise possible si interruption ≤ 12 mois)', '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('798aaa1c-7498-58d0-9f1c-f2dc946a1fb5', array['ouvrier','employe','agent_maitrise']::text[], null, 300, 7, null, 'minimum_conventionnel', true, 'Expérience professionnelle dans la branche (changement d''entreprise possible si interruption ≤ 12 mois)', '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1)
) as v(id, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 6.1.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172465')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('579b4c15-33ed-52f7-9867-518bd5b7c7ea', null, null, 'standard', 35, 151.67, null, 190, null, null, null, null, null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 4.7.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172413 — Repos compensateur de remplacement : 125 %'),
(2, 'Art. 4.7.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172413 — Repos compensateur de remplacement : 150 %'),
(3, 'Art. 4.7.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172413'),
(4, 'Art. 4.7.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172413'),
(5, 'Art. 6.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172495 — Le texte consolidé mentionne aussi la plage 21 h - 5 h'),
(6, 'Art. 6.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172495'),
(7, 'Art. 6.3.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172495')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('0b55be35-501f-59c2-9150-4e92c7a70638', 'heures_supplementaires', '8 premières heures au-delà de 35 h', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement_ou_repos', null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('ef19ce50-bf6c-5f8d-99a2-488e8262da87', 'heures_supplementaires', 'Heures au-delà de la 43e', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement_ou_repos', null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('32e108af-a2bd-554e-b33e-4dad106924b1', 'dimanche', 'Heures du dimanche prévues au planning ou au contrat', null, null, null, null, null, null, null, 25, null, null, 'paiement', null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('35479502-1118-5161-b2d4-604eb897a1d5', 'dimanche', 'Heures du dimanche exceptionnelles (hors planning et contrat)', null, null, null, null, null, null, null, 100, null, null, 'paiement', null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('0be45c12-7641-5f44-816c-e807bffcb6d3', 'jour_ferie', 'Jour férié travaillé prévu au planning (hors 1er janvier, 1er mai, 14 juillet, 25 décembre)', null, null, null, null, null, null, null, 50, null, null, 'paiement', null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4),
('8a3ec3d0-ca78-5608-998f-2ca920a7c067', 'jour_ferie', 'Jour férié travaillé exceptionnellement, ou 1er janvier, 1er mai, 14 juillet, 25 décembre', null, null, null, null, null, null, null, 100, null, null, 'paiement', null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4),
('aac9c1b5-70a8-55aa-ae48-781186295750', 'nuit', 'Travaux de nuit réguliers (21 h - 6 h)', null, null, null, null, null, '21:00', '06:00', 20, null, null, 'paiement', null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 5),
('cf1802f1-3c7f-56a5-ac64-8308167eb081', 'nuit', 'Travaux de nuit occasionnels (21 h - 6 h)', null, null, null, null, null, '21:00', '06:00', 100, null, null, 'paiement', null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 6),
('b33edcc8-b176-5a99-9c1a-00414e5868f1', 'nuit', 'Travailleur de nuit : repos compensateur de 2 % des heures entre 21 h et 6 h', null, null, null, null, null, '21:00', '06:00', null, null, null, 'repos', 2, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 7)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044906901')
)
insert into public.cc_allowances (id, idcc_code, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.zone::text, v.amount::numeric, v.unit::text, v.minimum_garanti_percent::numeric, v.conditions::text, v.social_exemption_limit::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('485346f1-afe9-54fb-a047-753384a02597', 'transport', 'Indemnité de transport conventionnelle', null, null, null, null, 'par_mois', 700, '7 fois le minimum garanti par mois pour plus de 104 heures mensuelles ; prorata du temps de travail en dessous ; revalorisée chaque 1er janvier (conditions d''attribution : art. 1 et 2 de l''accord)', null, '18c01aa6-20a7-551a-baf6-7f6ddaa92d27', '2022-07-01', null, 1)
) as v(id, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 8.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172517 — Répartition 50/50 ; la part incapacité temporaire (0,40 %) est intégralement à la charge du salarié'),
(2, 'Art. 8.2.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172520')
)
insert into public.cc_contributions (id, idcc_code, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.kind::text, v.label::text, v.organism::text, v.designation::text, v.categories::text[], v.classification_codes::text[], v.base::text, v.total_rate_percent::numeric, v.employer_rate_percent::numeric, v.employee_rate_percent::numeric, v.employer_fixed_amount::numeric, v.employee_fixed_amount::numeric, v.employer_min_share_percent::numeric, v.mandatory::boolean, v.company_size_min::int, v.company_size_max::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('6407f1b6-d5a1-58a4-8d33-6006bf2683ad', 'prevoyance', 'Prévoyance des non-cadres', null, null, array['ouvrier','employe','agent_maitrise']::text[], null, 'salaire_brut', 1.41, null, null, null, null, 50, true, null, null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('f660294e-5320-5368-8d80-cbf51babf437', 'prevoyance', 'Prévoyance des cadres — tranche A (minimum)', null, null, array['cadre']::text[], null, 'tranche_a', 1.5, null, null, null, null, null, true, null, null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('59ab7e5b-43f6-52d5-afbc-af995521ce4a', 'prevoyance', 'Prévoyance des cadres — tranche B (minimum)', null, null, array['cadre']::text[], null, 'tranche_b', 1.04, null, null, null, null, null, true, null, null, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2)
) as v(id, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 4.7.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172413 — 1er mai sans condition d''ancienneté'),
(2, 'Art. 4.10.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172421')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('3792e58b-a470-51e8-aaaf-2e9fa367b940', 'conges_supplementaires', null, 'Jours fériés chômés payés (hors repos habituel) après 3 mois d''ancienneté', null, null, 3, 10, 'calendaires', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('39e55b8d-2f95-59d4-a0b0-ec762eee0036', 'evenement_familial', 'Mariage du salarié', 'Mariage du salarié', null, null, 0, 4, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('39d468fd-8add-52d7-a13a-e3fb88a346ff', 'evenement_familial', 'Décès du conjoint ou d''un enfant', 'Décès du conjoint ou d''un enfant', null, null, 0, 3, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('6d0f367c-a2bf-5232-9731-0efb215ec3d7', 'evenement_familial', 'Décès du partenaire de Pacs', 'Décès du partenaire de Pacs', null, null, 0, 2, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('aee8a111-cc1b-5caa-b0b6-79c9c2ea1329', 'evenement_familial', 'Mariage d''un enfant', 'Mariage d''un enfant', null, null, 0, 1, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('1b50e92b-6624-5e18-9bf4-524283ce8257', 'evenement_familial', 'Décès du père ou de la mère', 'Décès du père ou de la mère', null, null, 0, 3, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('da63efc8-5cd0-52fc-af8b-f4b131452e7c', 'evenement_familial', 'Naissance ou adoption', 'Naissance ou adoption', null, null, 0, 3, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('e4c3186a-bbe2-58c2-ba17-9126b956393b', 'evenement_familial', 'Décès d''un frère ou d''une sœur', 'Décès d''un frère ou d''une sœur', null, null, 0, 1, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('fa42bc69-39ab-52f4-99f3-547d4fb22a2d', 'evenement_familial', 'Décès d''un beau-parent', 'Décès d''un beau-parent', null, null, 0, 1, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('c4be38c8-57b3-507f-adf5-517c8d9de92d', 'evenement_familial', 'Présélection militaire (maximum)', 'Présélection militaire (maximum)', null, null, 3, 3, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('1c9db119-4518-54b1-be01-f783726a90f8', 'evenement_familial', 'Mariage d''un enfant (après 6 mois)', 'Mariage d''un enfant (après 6 mois)', null, null, 6, 2, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('02580bc9-9a8e-5dcb-a922-da7a378d70d6', 'evenement_familial', 'Décès d''un grand-parent', 'Décès d''un grand-parent', null, null, 6, 1, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('b34d30ba-c7dc-597b-ab77-8a4f2163d97a', 'evenement_familial', 'Décès d''un petit-enfant', 'Décès d''un petit-enfant', null, null, 6, 1, 'ouvrables', true, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 4.9.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172420 — % de la rémunération brute de référence (salaire déclaré pour les IJSS), sous déduction des IJSS et de la prévoyance patronale ; durées sur 12 mois ; carence de 7 jours'),
(2, 'Art. 4.9.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172420 — % de la rémunération brute de référence (salaire déclaré pour les IJSS), sous déduction des IJSS et de la prévoyance patronale ; durées sur 12 mois ; ETAM : carence de 3 jours'),
(3, 'Art. 4.9.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172420 — % de la rémunération brute de référence (salaire déclaré pour les IJSS), sous déduction des IJSS et de la prévoyance patronale ; durées sur 12 mois ; dès le 1er jour'),
(4, 'Art. 4.9.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172420 — Maintien du salaire dès le 1er jour, sous déduction des IJSS et de la prévoyance patronale')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('27f0af2c-d731-5fcb-9e33-93fdcf6050d5', 'maladie', array['ouvrier']::text[], null, 12, 7, 1, 30, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('6856a61f-f157-5f41-a582-d21982dae472', 'maladie', array['ouvrier']::text[], null, 12, 7, 2, 30, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('d67ce134-0d18-5a70-82e2-941224c43e58', 'accident_trajet', array['ouvrier']::text[], null, 12, 7, 1, 30, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('4ae55240-5cc6-5bc6-be74-ef826083837d', 'accident_trajet', array['ouvrier']::text[], null, 12, 7, 2, 30, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('96660a52-ac96-514a-b3bf-aab86873154c', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 12, 3, 1, 30, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('6f6629c9-901a-55ad-82ed-389667d0ed7f', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 12, 3, 2, 30, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('38d47876-bb0c-5d74-8835-e5cae7f03b5c', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 12, 3, 1, 30, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('d00b4c25-69c0-5cad-a18f-e5c08c3bfb11', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 12, 3, 2, 30, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('10a11dc8-c501-58b3-873f-b974f5c687d8', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 12, 0, 1, 30, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('77567792-d299-5644-a00c-831609876dda', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 12, 0, 2, 30, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('81903031-c0ed-5982-a27e-4faa6daca664', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 12, 0, 1, 30, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('1d2b9f37-90eb-53f3-87ad-c705c3d7190e', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 12, 0, 2, 30, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('a5a21882-8821-5d93-ade5-c23bfecd2f72', 'maladie', array['ouvrier']::text[], null, 72, 7, 1, 40, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('1f52421f-686f-52e9-848d-fa9f96d8eb35', 'maladie', array['ouvrier']::text[], null, 72, 7, 2, 40, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('99ac97cd-ac49-55d9-9730-d974b2541f5c', 'accident_trajet', array['ouvrier']::text[], null, 72, 7, 1, 40, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('5e09269b-f963-5f72-8165-875da650c6b1', 'accident_trajet', array['ouvrier']::text[], null, 72, 7, 2, 40, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('3d1271db-604a-5e68-90eb-43ffd0a4cf5b', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 72, 3, 1, 40, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('0e9835a3-a054-5db9-8ad9-01fc9865ac27', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 72, 3, 2, 40, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('91934820-6ecd-509b-851b-5ba310c7d1de', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 72, 3, 1, 40, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('12225749-4d98-5cfc-bc65-0a58796ef74f', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 72, 3, 2, 40, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('5efe2072-94b4-51ee-83c3-b648ccfc36e7', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 72, 0, 1, 40, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('283bec1c-c7d9-5b67-bdb1-36d5cedb60d0', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 72, 0, 2, 40, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('e853737a-3c3d-561d-bc41-89c6cd3ab251', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 72, 0, 1, 40, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('e699cc15-7a55-5b0a-b323-19a6972cf86f', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 72, 0, 2, 40, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('83a18eb4-249a-57fc-8447-554326e38c9a', 'maladie', array['ouvrier']::text[], null, 120, 7, 1, 50, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('5318f120-b587-51af-8fe6-f542dc12ab61', 'maladie', array['ouvrier']::text[], null, 120, 7, 2, 50, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('ebf77549-486e-57be-a920-5c0fd17a0daf', 'accident_trajet', array['ouvrier']::text[], null, 120, 7, 1, 50, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('71efb7c4-2039-5cf5-89fd-c2693d252057', 'accident_trajet', array['ouvrier']::text[], null, 120, 7, 2, 50, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('98d7d318-6e1d-5ffb-be12-4618612ff51b', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 120, 3, 1, 50, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('30ef74b6-eabc-5faa-9d34-8efb3d2cbaae', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 120, 3, 2, 50, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('3fc69f2f-6625-5ed4-bd62-83156e2c5709', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 120, 3, 1, 50, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('d7278f35-5b0f-50a7-adad-6ad137382e9b', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 120, 3, 2, 50, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('c2f8c259-3085-579c-ab8c-c6cd7158a29e', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 120, 0, 1, 50, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('2dcaae85-551a-55af-89d5-dacddd022c94', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 120, 0, 2, 50, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('ee25f2b0-af1d-5494-b26d-6202753c2f10', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 120, 0, 1, 50, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('30419f1d-69af-51ce-b45f-d48b5d4dd667', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 120, 0, 2, 50, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('63e7c650-5669-509a-a2e5-bcc5255777ef', 'maladie', array['ouvrier']::text[], null, 180, 7, 1, 60, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('6e1742ca-86cb-5951-800c-d5cb3a11fe1e', 'maladie', array['ouvrier']::text[], null, 180, 7, 2, 60, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('a6cb5427-59c9-5190-9324-03060959d29d', 'accident_trajet', array['ouvrier']::text[], null, 180, 7, 1, 60, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('efa3d3e1-bc99-5ed4-a72e-bc8b1a733f42', 'accident_trajet', array['ouvrier']::text[], null, 180, 7, 2, 60, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('c37854b9-5a0b-5234-bc74-835d8e0db8f0', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 180, 3, 1, 60, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('81bdd5cc-bef0-53d3-96e3-ca397051a97a', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 180, 3, 2, 60, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('1d561527-3888-5b60-bc6a-4c58edbfbaf4', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 180, 3, 1, 60, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('b650dee5-0de4-5321-83d7-cf609763829e', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 180, 3, 2, 60, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('4882fde1-c874-575c-ae62-e736e29d800e', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 180, 0, 1, 60, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('3f5e650c-24a4-58fc-8acd-7f1e150a1861', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 180, 0, 2, 60, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('a4b89bc8-30ff-5cb2-89e7-576129fcbff2', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 180, 0, 1, 60, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('49b1124c-a83e-5bca-80c6-d2da3d6d22cb', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 180, 0, 2, 60, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('373ef291-5d46-548a-98a3-ce51422c4ef9', 'maladie', array['ouvrier']::text[], null, 240, 7, 1, 80, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('12fe143d-311b-5d21-9464-7ac352cf9de1', 'maladie', array['ouvrier']::text[], null, 240, 7, 2, 80, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('54b6a548-fb89-5dfb-9278-89d39ac9316f', 'accident_trajet', array['ouvrier']::text[], null, 240, 7, 1, 80, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('2de32a1e-e7fa-5f1d-af8f-9beb0cfee387', 'accident_trajet', array['ouvrier']::text[], null, 240, 7, 2, 80, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('7e6b0515-ddc6-5b19-bd40-6d42e9e569d3', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 240, 3, 1, 80, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('b240872d-3428-5ef2-9a08-3db7fd0d1dce', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 240, 3, 2, 80, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('caa86350-be07-5a8e-94b5-3dba1872c8a9', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 240, 3, 1, 80, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('1a8ce9e0-9b2f-56cc-bfa7-cf0520190fae', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 240, 3, 2, 80, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('1085b2b4-dfe7-59b6-a7f1-5f9455c18ee3', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 240, 0, 1, 80, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('30dea170-7988-5126-936d-743deb2a4743', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 240, 0, 2, 80, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('e8474b0b-51a8-5cf6-a5a1-13f29c9bf40b', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 240, 0, 1, 80, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('751ccfd6-6bbb-5070-a854-f4919efd4f80', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 240, 0, 2, 80, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('b8259375-9a46-5715-a58f-cebb74acc2ba', 'maladie', array['ouvrier']::text[], null, 300, 7, 1, 90, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('68fd3b7c-13b0-5f2a-ae74-807cbed74a72', 'maladie', array['ouvrier']::text[], null, 300, 7, 2, 90, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('69bcbb65-77be-51ac-b3e8-a0e9400912e2', 'accident_trajet', array['ouvrier']::text[], null, 300, 7, 1, 90, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('5273c76a-6b4a-5aa6-9daf-3f7475443aa6', 'accident_trajet', array['ouvrier']::text[], null, 300, 7, 2, 90, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('bbbb07ba-c5e4-5bd4-b892-e8190182d44b', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 300, 3, 1, 90, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('d348bf56-0c4d-549a-80fc-903e849b2cae', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 300, 3, 2, 90, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('09771bea-0a80-5c75-bcb5-6da594b63edd', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 300, 3, 1, 90, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('36bf3e86-6f1b-59ba-8458-fdbbfba01881', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 300, 3, 2, 90, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('7ceb9081-5160-545f-9437-086e08ce8cab', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 300, 0, 1, 90, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('c26731d4-eeb0-51fd-b0a0-8fdc9762d0c8', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 300, 0, 2, 90, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('c6319a1e-ca24-5b96-a8fa-deaeaff25fd0', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 300, 0, 1, 90, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('9bceffae-e2e1-55de-9153-61497ac2cf37', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 300, 0, 2, 90, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('872f55bc-9b37-5060-9426-ab71e960345b', 'maladie', array['ouvrier']::text[], null, 360, 7, 1, 100, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('464e539d-5a65-58c6-8f89-e6c9bc4d61f9', 'maladie', array['ouvrier']::text[], null, 360, 7, 2, 100, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('6aaeac7a-f703-54aa-8447-5a1e154d82cd', 'accident_trajet', array['ouvrier']::text[], null, 360, 7, 1, 100, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('5d6bef0d-2690-5937-863c-4fa3015225bc', 'accident_trajet', array['ouvrier']::text[], null, 360, 7, 2, 100, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1),
('7bd0bb23-7a0d-5c2c-bee3-9bf1577b2a2f', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 360, 3, 1, 100, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('56ff073c-3bc4-5d00-8b34-5e6ed9ca5064', 'maladie', array['employe','agent_maitrise','technicien']::text[], null, 360, 3, 2, 100, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('0722a76f-3ba3-512f-a999-6b81b1f4650e', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 360, 3, 1, 100, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('57d387ef-aac1-50d2-8cdf-3f4740de153c', 'accident_trajet', array['employe','agent_maitrise','technicien']::text[], null, 360, 3, 2, 100, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 2),
('95406699-9020-5784-b8c2-e64eb06e71c1', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 360, 0, 1, 100, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('bb08f3a3-19a6-5a35-b681-277ab36999ca', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 360, 0, 2, 100, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('9d6603ac-6eeb-5084-8f69-eef1359cedf5', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 360, 0, 1, 100, 90, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('5057f9f0-5d20-503f-b0cc-fd33669e4d96', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 360, 0, 2, 100, 66.67, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 3),
('6e019a16-0336-5f53-9589-3375092f0f5c', 'maladie', array['cadre']::text[], null, 12, 0, 1, 70, 100, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4),
('9e5ed4e5-6d3e-5eb3-9222-1768ed2bcd5f', 'accident_trajet', array['cadre']::text[], null, 12, 0, 1, 70, 100, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4),
('fa42cd9e-4365-5db3-8a55-5c462ca62710', 'accident_travail', array['cadre']::text[], null, 12, 0, 1, 70, 100, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4),
('df20e3e9-6a27-51d7-8ead-5da94114f9b9', 'maladie_professionnelle', array['cadre']::text[], null, 12, 0, 1, 70, 100, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4),
('1aeef2e4-6a98-5545-ad52-74c029cdc645', 'maladie', array['cadre']::text[], null, 120, 0, 1, 90, 100, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4),
('520b21da-e793-5960-b81e-087fe5757af3', 'accident_trajet', array['cadre']::text[], null, 120, 0, 1, 90, 100, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4),
('898ef4f8-1c8b-5804-8d5a-2d12be0c073f', 'accident_travail', array['cadre']::text[], null, 120, 0, 1, 90, 100, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4),
('fbef9928-e870-5194-825d-72181fbb3dd9', 'maladie_professionnelle', array['cadre']::text[], null, 120, 0, 1, 90, 100, 'brut', true, 12, '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 4)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 4.7.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000027172413')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3043', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('1b2ff000-ff2e-55dc-9ab6-799bf230090e', 'assiette_minimum', 'Éléments exclus de la rémunération minimale hiérarchique', null, null, null, null, 'S''ajoutent au minimum : prime d''expérience (ou d''ancienneté maintenue), heures supplémentaires, majorations de nuit, dimanche et jours fériés, remboursements de frais', '84e45803-8a25-56cf-86a9-42226bd2acc1', '2012-08-01', null, 1)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
