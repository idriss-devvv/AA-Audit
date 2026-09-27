-- Critères de vérification de la convention collective IDCC 1090, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 1090 — Services de l'automobile (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('a1756673-6765-5b08-bdab-e4a4b95b07cf', '1090', 'texte_base', 'Convention collective nationale du commerce et de la réparation de l''automobile, du cycle et du motocycle… du 15 janvier 1981', 'KALITEXT000005685156', '1981-01-15'::date, null::date, '2010-12-26'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005685156', 'Articles consolidés en vigueur', '2026-09-27'),
('185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '1090', 'avenant_salaires', 'Avenant n° 110 du 22 janvier 2026 relatif aux salaires minima', 'KALITEXT000054161858', '2026-01-22'::date, '2026-04-16'::date, '2026-05-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054161858', null, '2026-09-27');

with n(k, t) as (values
(1, 'Art. 3.03 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005865100'),
(2, 'Art. 3B.03 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005865169'),
(3, 'Art. 5.03 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005865266')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1090', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('d0aa37c4-eaee-5823-a448-fdc9fa580b1a', 'ECH-1', 'Ouvriers et employés — échelon 1', 'ouvrier', null, '1', null, array['Échelon 1','Ech 1']::text[], 1, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('d1d9eac2-aece-5e28-8045-222b576551f1', 'ECH-2', 'Ouvriers et employés — échelon 2', 'ouvrier', null, '2', null, array['Échelon 2','Ech 2']::text[], 2, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('1cdfd1b1-1acb-586e-8b26-617901bed506', 'ECH-3', 'Ouvriers et employés — échelon 3', 'ouvrier', null, '3', null, array['Échelon 3','Ech 3']::text[], 3, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('4dc21830-644b-58a5-99c5-46e2f34ea629', 'ECH-4', 'Ouvriers et employés — échelon 4', 'ouvrier', null, '4', null, array['Échelon 4','Ech 4']::text[], 4, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('b88e8f3a-5c2b-5db9-ab6c-38ba31b46adf', 'ECH-5', 'Ouvriers et employés — échelon 5', 'ouvrier', null, '5', null, array['Échelon 5','Ech 5']::text[], 5, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('2850b829-f8d4-5613-a0e6-dcc562b49663', 'ECH-6', 'Ouvriers et employés — échelon 6', 'ouvrier', null, '6', null, array['Échelon 6','Ech 6']::text[], 6, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('56da7b09-0720-5e99-ab8f-db4b7507bb8a', 'ECH-7', 'Ouvriers et employés — échelon 7', 'ouvrier', null, '7', null, array['Échelon 7','Ech 7']::text[], 7, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('9bdaca43-9f6f-53dc-bdb6-5fc07db5f797', 'ECH-8', 'Ouvriers et employés — échelon 8', 'ouvrier', null, '8', null, array['Échelon 8','Ech 8']::text[], 8, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('7ad89f58-1f1e-5663-b9a2-857b1390bf50', 'ECH-9', 'Ouvriers et employés — échelon 9', 'ouvrier', null, '9', null, array['Échelon 9','Ech 9']::text[], 9, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('885f4313-8311-5d12-91ef-5519b4fe26d7', 'ECH-10', 'Ouvriers et employés — échelon 10', 'ouvrier', null, '10', null, array['Échelon 10','Ech 10']::text[], 10, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('e7813a00-0248-57e6-9286-a45b80c24c37', 'ECH-11', 'Ouvriers et employés — échelon 11', 'ouvrier', null, '11', null, array['Échelon 11','Ech 11']::text[], 11, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('6f477489-2ccf-58ee-8e08-32049d5d1818', 'ECH-12', 'Ouvriers et employés — échelon 12', 'ouvrier', null, '12', null, array['Échelon 12','Ech 12']::text[], 12, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('69971810-aded-5db5-8abc-953150c31802', 'ECH-17', 'Maîtrise — échelon 17', 'agent_maitrise', null, '17', null, array['Échelon 17','Ech 17']::text[], 17, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('51977eea-80fa-5da6-b998-04cba47d6361', 'ECH-18', 'Maîtrise — échelon 18', 'agent_maitrise', null, '18', null, array['Échelon 18','Ech 18']::text[], 18, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('7e5092f7-a1d0-5121-a811-07f3f537b596', 'ECH-19', 'Maîtrise — échelon 19', 'agent_maitrise', null, '19', null, array['Échelon 19','Ech 19']::text[], 19, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('9408babf-4180-5bdb-83e8-456db1be1c49', 'ECH-20', 'Maîtrise — échelon 20', 'agent_maitrise', null, '20', null, array['Échelon 20','Ech 20']::text[], 20, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('f059c39a-19eb-594e-9e88-e9011a4fe201', 'ECH-21', 'Maîtrise — échelon 21', 'agent_maitrise', null, '21', null, array['Échelon 21','Ech 21']::text[], 21, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('876512ee-6684-58e4-b0d1-486c70f671a4', 'ECH-22', 'Maîtrise — échelon 22', 'agent_maitrise', null, '22', null, array['Échelon 22','Ech 22']::text[], 22, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('ca4c9c35-4607-5795-989c-1438460c66d3', 'ECH-23', 'Maîtrise — échelon 23', 'agent_maitrise', null, '23', null, array['Échelon 23','Ech 23']::text[], 23, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('1b27d779-bfce-5107-b4e9-ab45feb6f269', 'ECH-24', 'Maîtrise — échelon 24', 'agent_maitrise', null, '24', null, array['Échelon 24','Ech 24']::text[], 24, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('8dc8ec03-c08f-5a6c-9814-530de9fafff2', 'ECH-25', 'Maîtrise — échelon 25', 'agent_maitrise', null, '25', null, array['Échelon 25','Ech 25']::text[], 25, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('2a8a63eb-ac18-5a54-b1ed-936971fdeb0b', 'CADRE-I-A', 'Cadres — niveau I degré A', 'cadre', 'I', 'A', null, array['Niveau I A','Cadre I-A']::text[], 40, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('20b91183-e36d-5a4b-890d-830aa35d5ea3', 'CADRE-I-B', 'Cadres — niveau I degré B', 'cadre', 'I', 'B', null, array['Niveau I B','Cadre I-B']::text[], 41, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('dbc5519a-f4d0-5a5c-b384-cf245becdf09', 'CADRE-I-C', 'Cadres — niveau I degré C', 'cadre', 'I', 'C', null, array['Niveau I C','Cadre I-C']::text[], 42, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('612706f4-47ad-531e-8f87-5200309a0e5c', 'CADRE-II-A', 'Cadres — niveau II degré A', 'cadre', 'II', 'A', null, array['Niveau II A','Cadre II-A']::text[], 43, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('198bb783-5bfa-54cf-ba77-edcd7429c866', 'CADRE-II-B', 'Cadres — niveau II degré B', 'cadre', 'II', 'B', null, array['Niveau II B','Cadre II-B']::text[], 44, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('2aae254c-a7f1-5bf4-b04d-d0b987ebcca0', 'CADRE-II-C', 'Cadres — niveau II degré C', 'cadre', 'II', 'C', null, array['Niveau II C','Cadre II-C']::text[], 45, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('a08930d4-26c1-5c21-a266-98723975e6fe', 'CADRE-III-A', 'Cadres — niveau III degré A', 'cadre', 'III', 'A', null, array['Niveau III A','Cadre III-A']::text[], 46, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('1ae7413a-88c2-5352-bd08-9a87a9dd7a14', 'CADRE-III-B', 'Cadres — niveau III degré B', 'cadre', 'III', 'B', null, array['Niveau III B','Cadre III-B']::text[], 47, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('73c511d0-68e4-524d-936d-fa49ff89ef35', 'CADRE-III-C', 'Cadres — niveau III degré C', 'cadre', 'III', 'C', null, array['Niveau III C','Cadre III-C']::text[], 48, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('07d1f417-b619-55cc-97f8-aa49fa6a00e6', 'CADRE-IV-A', 'Cadres — niveau IV degré A', 'cadre', 'IV', 'A', null, array['Niveau IV A','Cadre IV-A']::text[], 49, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('ed273071-8b4f-5803-ad37-eeb59bfe0b48', 'CADRE-IV-B', 'Cadres — niveau IV degré B', 'cadre', 'IV', 'B', null, array['Niveau IV B','Cadre IV-B']::text[], 50, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('248d13bf-9849-582e-b48e-742f9f3ff8a8', 'CADRE-IV-C', 'Cadres — niveau IV degré C', 'cadre', 'IV', 'C', null, array['Niveau IV C','Cadre IV-C']::text[], 51, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('636d9026-b689-585d-8003-d33012bc8652', 'CADRE-V', 'Cadres — niveau V', 'cadre', 'V', null, null, array['Niveau V','Cadre V']::text[], 52, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054161863')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1090', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('9b0125d4-388b-5b45-80af-03843017818c', 'ECH-1', 1853, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('4f4e1e4f-9882-5ec3-a537-fb290dc16571', 'ECH-2', 1870, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('079324d1-59e0-5a2a-80e3-81d9b917e07d', 'ECH-3', 1888, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('fe8ed342-8629-5f12-a2ad-3481c3754dd0', 'ECH-4', 1912, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('7a5c9466-40f3-5562-95d8-3cf7418592f1', 'ECH-5', 1929, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('22f25dd6-2a23-5b59-bde4-648a7832518c', 'ECH-6', 1965, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('a500b915-1f29-5dd9-a64a-072ca8d10500', 'ECH-7', 1999, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('5b2facd6-4469-57a5-b5dd-b6dafde6cefc', 'ECH-8', 2045, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('4eb8dad5-a580-540d-9c40-ab2a9f1adc5b', 'ECH-9', 2106, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('f1605a07-b095-580c-acf3-a5108b2b06f5', 'ECH-10', 2153, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('c8350cdc-2bba-52be-a068-97435643f842', 'ECH-11', 2205, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('e2642dac-666f-5403-80ec-0de6186fdf20', 'ECH-12', 2259, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('85c12b71-1a9f-5aa0-8f8c-19b8f0a6c312', 'ECH-17', 2241, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('9d0e3d4b-3318-5974-b472-2aa6a79e710d', 'ECH-18', 2249, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('23066706-885d-5503-a5db-55749a16a0f5', 'ECH-19', 2255, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('e3afa24b-8021-5e8c-9537-43181e4a6e6a', 'ECH-20', 2259, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('43c98b3a-0a5d-54f7-89e5-3d71bbb64d07', 'ECH-21', 2324, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('e7fc22ca-d6a7-54e7-821a-440c37734119', 'ECH-22', 2400, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('780dec9b-bc0f-5646-af2f-dd77c56e25b5', 'ECH-23', 2541, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('8d6edee7-198c-5397-b26e-c34a06e9160f', 'ECH-24', 2685, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('a93979ce-e65b-50bc-8bb8-936f507acff2', 'ECH-25', 2831, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('99e8fd7a-224e-5900-a769-5b371b6d047d', 'CADRE-I-A', 2541, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('b50672bf-43b2-51ab-a339-5904fb26b2fe', 'CADRE-I-B', 2685, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('bf9e9c95-9ed0-5abb-8742-443eeaaaa780', 'CADRE-I-C', 2831, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('244624da-2395-5703-bc11-d81a76cb1f85', 'CADRE-II-A', 2978, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('8c869e94-9c3b-54f3-b7e8-9dd403af9f1c', 'CADRE-II-B', 3267, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('8f6bf7da-0234-5c6b-888c-f7053bc4bf59', 'CADRE-II-C', 3560, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('da571324-78a6-5fbf-92a3-070292a3996e', 'CADRE-III-A', 3852, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('ba8996ea-6d09-519f-aaab-7f8000020375', 'CADRE-III-B', 4144, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('88b0fd9e-2535-5f6a-8841-036da08a1ac4', 'CADRE-III-C', 4438, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('bc8c4f9f-4109-5144-b8d7-4e3537c47daf', 'CADRE-IV-A', 4731, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('7b7df653-6566-5a96-a2f9-ed0881f904a5', 'CADRE-IV-B', 5022, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('a6a89632-2fbf-5074-93d6-b96bf339f84d', 'CADRE-IV-C', 5316, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('8d7599f2-55ac-530a-a415-d87242ab0d6e', 'CADRE-V', 5904, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 1.09 bis c — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864837'),
(2, 'Art. 1.09 f — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864828 — Rémunération mensuelle ≥ minimum mensuel du classement + 25 % pour 218 jours (majoration proratisée si moins de jours) ; valeur d''une journée = 1/22 du salaire mensuel'),
(3, 'Art. 1.09 e — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864828 — Forfait en heures sur la semaine/le mois : horaire moyen jusqu''à 38 h 30 → minimum + 10 % ; de 38 h 30 à 42 h → minimum + 20 %')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1090', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('de4a58ea-7cf9-54d5-b19c-5eb975b6fd58', null, null, 'standard', 35, 151.67, null, 220, null, null, null, null, null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('a47704ce-3a29-5f78-851c-ebe701e7eeb6', array['cadre']::text[], null, 'forfait_jours', null, null, null, null, 218, null, null, null, 125, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('e362c84d-6d5e-501e-a429-757374b3ebc2', null, null, 'forfait_heures', null, null, null, null, null, null, null, null, 110, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 1.09 bis d — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864837'),
(2, 'Art. 1.10 d 6 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864841 — 10 % du minimum conventionnel mensuel / 151,66 par heure ; repos compensateur de 1,66 % par heure de nuit'),
(3, 'Art. 1.10 d 8 b — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864841 — Majoration du salaire horaire brut de base, cumulable avec les heures supplémentaires'),
(4, 'Art. 1.10 d 5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864841'),
(5, 'Art. 1.10 b — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864841'),
(6, 'Art. 1.10 c — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864841 — Jours fériés habituellement travaillés : pas de majoration'),
(7, 'Art. 1.10 c — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864841')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1090', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('e391be5b-7f25-586c-b21b-08f0b443e8b0', 'heures_supplementaires', '8 premières heures supplémentaires', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement_ou_repos', null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('c08534ee-24da-574e-b435-c147cdaef977', 'heures_supplementaires', 'Heures supplémentaires au-delà de la 8e', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement_ou_repos', null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('33426082-3d28-5220-8271-7929605cff53', 'nuit', 'Travailleur de nuit : chaque heure entre 21 h et 6 h', null, null, null, null, null, '21:00', '06:00', 10, null, null, 'paiement', null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('d80993ec-715b-547d-8faa-1f05cdd4f215', 'nuit', 'Travail exceptionnel de nuit (contrat sans activité de nuit)', null, null, null, null, null, '21:00', '06:00', 50, null, null, 'paiement', null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('29752aff-a926-5490-813c-c251cfbd7080', 'nuit', 'Travailleur de nuit : repos compensateur', null, null, null, null, null, '21:00', '06:00', null, null, null, 'repos', 1.66, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 4),
('a8fd514c-3eb6-51f4-a3c7-d79f2282af39', 'dimanche', 'Dimanche travaillé sur dérogation temporaire ou exceptionnelle (en plus du repos)', null, null, null, null, null, null, null, 100, null, null, 'paiement_et_repos', null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('86a035df-da88-5bf7-b194-7ef629f495ff', 'jour_ferie', 'Jour férié travaillé exceptionnellement', null, null, null, null, null, null, null, 100, null, null, 'paiement_ou_repos', null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 6),
('53e43b4d-28de-5eb0-b793-ad2c0e331da6', 'premier_mai', '1er mai travaillé (activité ne pouvant être interrompue)', null, null, null, null, null, null, null, 100, null, null, 'paiement', null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 7)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054161865')
)
insert into public.cc_allowances (id, idcc_code, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1090', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.zone::text, v.amount::numeric, v.unit::text, v.minimum_garanti_percent::numeric, v.conditions::text, v.social_exemption_limit::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('f3936930-d06a-5791-929f-beddcd3305b3', 'panier', 'Indemnité de panier : travail d''au moins 2 heures dans la période de nuit (21 h - 6 h)', null, null, null, 6.09, 'par_nuit', null, 'Due au travailleur de nuit et au salarié travaillant exceptionnellement la nuit dès 2 heures dans la plage de nuit', null, '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1)
) as v(id, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 1.15 a — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864874 — Total plafonné à 33 jours ouvrables'),
(2, 'Art. 1.15 c — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864874 — La 5e semaine prise séparément n''ouvre pas droit au fractionnement'),
(3, 'Art. 1.15 c — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864874'),
(4, 'Art. 1.15 e — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864874'),
(5, 'Art. 2.09 / 4.07 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005865045')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1090', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('457e518b-51a9-555f-bc83-ac5adaf9d9d5', 'conges_anciennete', null, 'Congé d''ancienneté après 20 ans', null, null, 240, 1, 'ouvrables', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('8372688b-4628-5d4c-867b-7e0247dd0438', 'conges_anciennete', null, 'Congé d''ancienneté après 25 ans', null, null, 300, 2, 'ouvrables', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('4d3cffee-e34e-559f-a1b7-b9b4dc4e0d9c', 'conges_anciennete', null, 'Congé d''ancienneté après 30 ans', null, null, 360, 3, 'ouvrables', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('7a21817d-8e1a-535e-925c-2594e0f2ad22', 'fractionnement', null, 'Fractionnement du congé principal : au moins 5 jours restant dus', null, null, 0, 2, 'ouvrables', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('bc306b30-f6d3-5956-9eb4-7f8d5fd7bb08', 'fractionnement', null, 'Fractionnement du congé principal : moins de 5 jours restant dus', null, null, 0, 1, 'ouvrables', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3),
('0ca53a76-ce67-5924-a014-3e7af475fc7f', 'conges_supplementaires', null, 'Rappel pendant les congés pour les besoins du service', null, null, 0, 2, 'ouvrables', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 4),
('165c7708-79b4-5986-af02-605d444f9d22', 'evenement_familial', 'Mariage ou Pacs du salarié', 'Mariage ou Pacs du salarié', null, null, 0, 4, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('3f07ad1c-7db2-5634-9336-f5c52f86939d', 'evenement_familial', 'Naissance ou adoption', 'Naissance ou adoption', null, null, 0, 3, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('40445692-f45c-5642-b450-aa0f4022558e', 'evenement_familial', 'Mariage d''un enfant', 'Mariage d''un enfant', null, null, 0, 1, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('3f8a8812-0fe8-587d-9d18-afba164ab156', 'evenement_familial', 'Annonce d''un handicap chez un enfant', 'Annonce d''un handicap chez un enfant', null, null, 0, 5, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('7bcccb3f-99d8-57e5-826e-b3352e9cc77e', 'evenement_familial', 'Annonce d''une pathologie chronique ou d''un cancer chez un enfant', 'Annonce d''une pathologie chronique ou d''un cancer chez un enfant', null, null, 0, 5, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('87ed2fad-f11f-51af-acee-d803ea839039', 'evenement_familial', 'Décès du conjoint, partenaire de Pacs ou concubin', 'Décès du conjoint, partenaire de Pacs ou concubin', null, null, 0, 4, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('54f18c49-b406-5b05-a3c9-a6e0f1da7605', 'evenement_familial', 'Décès d''un enfant', 'Décès d''un enfant', null, null, 0, 12, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('a7bac9f6-43fb-5391-96f5-c2b6b62e30c3', 'evenement_familial', 'Décès d''un enfant de moins de 25 ans, d''un enfant lui-même parent ou d''une personne à charge de moins de 25 ans', 'Décès d''un enfant de moins de 25 ans, d''un enfant lui-même parent ou d''une personne à charge de moins de 25 ans', null, null, 0, 14, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('5695bedf-aa9f-5480-afe9-51ad67d6ba6c', 'evenement_familial', 'Décès du père ou de la mère', 'Décès du père ou de la mère', null, null, 0, 3, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('d7ab5711-7c32-5a5d-a9c3-d884aac3b91d', 'evenement_familial', 'Décès d''un frère ou d''une sœur', 'Décès d''un frère ou d''une sœur', null, null, 0, 3, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('a77931f6-dc7e-5df1-ba0b-956b9f8a4e53', 'evenement_familial', 'Décès d''un grand-parent', 'Décès d''un grand-parent', null, null, 0, 1, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('291e6fdf-b424-5fa9-a630-4f3891836852', 'evenement_familial', 'Décès d''un beau-parent', 'Décès d''un beau-parent', null, null, 0, 3, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5),
('93abab46-664c-5a06-b852-52b47587bfeb', 'evenement_familial', 'Démarches RQTH', 'Démarches RQTH', null, null, 0, 1, 'ouvres', true, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 5)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 2.10 a — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005865049 — Maintien du salaire net sous déduction des IJSS brutes, par année civile (jours cumulés) ; relais par la prévoyance au-delà ; à partir du 46e jour : indemnités de prévoyance sans condition d''ancienneté'),
(2, 'Art. 4.08 b — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005865221 — Maintien du salaire net sous déduction des IJSS brutes, par année civile (jours cumulés) ; relais par la prévoyance au-delà ; à partir du 91e jour : indemnités de prévoyance')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1090', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('fcf97225-abc2-5ecf-9cb3-9fc27a5fd421', 'maladie', array['ouvrier','employe','agent_maitrise']::text[], null, 12, 0, 1, 45, 100, 'net', true, null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('19643ad6-7d6a-5d2b-b260-9913a1d3647b', 'accident_trajet', array['ouvrier','employe','agent_maitrise']::text[], null, 12, 0, 1, 45, 100, 'net', true, null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('5f0875ef-ac66-5145-bd37-771669404008', 'accident_travail', array['ouvrier','employe','agent_maitrise']::text[], null, 12, 0, 1, 45, 100, 'net', true, null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('01e706dc-2477-569b-9147-516755ff1421', 'maladie_professionnelle', array['ouvrier','employe','agent_maitrise']::text[], null, 12, 0, 1, 45, 100, 'net', true, null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 1),
('b72c69b3-1bae-568e-b409-d6e7eba23761', 'maladie', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'net', true, null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('2576518e-2c6a-5ea2-a357-4570f19b2419', 'accident_trajet', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'net', true, null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('73c6a54e-0b56-554e-a90f-146f2a6d88be', 'accident_travail', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'net', true, null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('55000a09-a263-5201-80de-27a6dfeba865', 'maladie_professionnelle', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'net', true, null, 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054161864'),
(2, 'Art. 1.16 a — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864880'),
(3, 'Art. 1.18 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005864902')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1090', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('25909bbb-21f7-5571-ad19-7bbe377dccab', 'prime_formation_qualification', 'Valeur du point de formation-qualification', null, null, 3.47, 'euros_par_point', 'Les points de formation-qualification acquis (art. 2.05) s''ajoutent au salaire minimum garanti', '185a0feb-dbaf-5387-9ff7-ea456a4bcb23', '2026-05-01', null, 1),
('eea85822-d87e-5369-9d87-6e0111c453c4', 'assiette_minimum', 'Salaire de base à comparer au minimum garanti', null, null, null, null, 'Salaire de base y compris avantages en nature, hors indemnités, compléments et accessoires ; temps partiel : valeur horaire du minimum × heures du mois', 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 2),
('1c2a2726-ca84-5ec1-a685-7947a4e0f747', 'mention_bulletin', 'Mentions conventionnelles du bulletin de paie', null, null, null, null, 'Notamment le droit à repos compensateur des travailleurs de nuit', 'a1756673-6765-5b08-bdab-e4a4b95b07cf', '2010-12-26', null, 3)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
