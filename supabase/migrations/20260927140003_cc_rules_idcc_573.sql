-- Critères de vérification de la convention collective IDCC 573, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 573 — Commerces de gros (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('04374c48-5684-5205-87fc-b60503b321b6', '573', 'texte_base', 'Convention collective nationale des commerces de gros du 23 juin 1970 (mise à jour par accord du 27 septembre 1984)', 'KALITEXT000005673619', '1970-06-23'::date, '1985-02-16'::date, '1985-02-16'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005673619', null, '2026-09-27'),
('dd03d15b-7151-5221-a7a5-e9f0cf31636b', '573', 'avenant_salaires', 'Accord du 16 décembre 2024 relatif aux salaires minima', 'KALITEXT000051352244', '2024-12-16'::date, '2025-03-29'::date, '2025-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000051352244', null, '2026-09-27'),
('ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '573', 'avenant_salaires', 'Accord du 17 mars 2026 relatif aux salaires', 'KALITEXT000054454077', '2026-03-17'::date, '2026-06-27'::date, '2026-03-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054454077', null, '2026-09-27'),
('7d76a020-96d6-5822-ab5f-f036b086d742', '573', 'accord', 'Accord du 23 octobre 2023 relatif au régime de prévoyance des salariés non-cadres', 'KALITEXT000048953855', '2023-10-23'::date, '2024-04-03'::date, '2024-07-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000048953855', null, '2026-09-27'),
('b1f029c9-edac-5ce5-b61c-31549a2a5076', '573', 'accord', 'Accord du 17 septembre 2025 relatif au régime de prévoyance des salariés cadres', 'KALITEXT000053320369', '2025-09-17'::date, '2025-12-26'::date, '2026-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000053320369', null, '2026-09-27');

with n(k, t) as (values
(1, 'https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054454080 — Classification de l''accord du 5 mai 1992 modifié')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '573', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('cb6ef5a5-002e-51c4-afdd-c7f7f0d5ce0f', 'I-1', 'Niveau I échelon 1', 'employe', 'I', '1', null, array['Niveau I échelon 1']::text[], 1, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('bfebc191-cc06-59af-a112-327bc2b660c3', 'I-2', 'Niveau I échelon 2', 'employe', 'I', '2', null, array['Niveau I échelon 2']::text[], 2, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('24433c55-1c9f-514c-b6b1-92c963a01ded', 'I-3', 'Niveau I échelon 3', 'employe', 'I', '3', null, array['Niveau I échelon 3']::text[], 3, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('6edc19f9-bf7c-5e85-8add-2c0df84e17a8', 'II-1', 'Niveau II échelon 1', 'employe', 'II', '1', null, array['Niveau II échelon 1']::text[], 4, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('9d320f2d-e269-5172-b5dd-318e3a3bff97', 'II-2', 'Niveau II échelon 2', 'employe', 'II', '2', null, array['Niveau II échelon 2']::text[], 5, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('fd1cd0c8-b2c7-5d22-a487-dcbd4a1f25b5', 'II-3', 'Niveau II échelon 3', 'employe', 'II', '3', null, array['Niveau II échelon 3']::text[], 6, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('25320446-10fc-534e-b25a-e904f4b80008', 'III-1', 'Niveau III échelon 1', 'employe', 'III', '1', null, array['Niveau III échelon 1']::text[], 7, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('b9bceb80-6342-56e6-9808-108cacfb869f', 'III-2', 'Niveau III échelon 2', 'employe', 'III', '2', null, array['Niveau III échelon 2']::text[], 8, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('57c30d87-5494-52aa-b178-8f6b78494c68', 'III-3', 'Niveau III échelon 3', 'employe', 'III', '3', null, array['Niveau III échelon 3']::text[], 9, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('744ab882-43ae-5dcd-ac40-20fa4c00276f', 'IV-1', 'Niveau IV échelon 1', 'employe', 'IV', '1', null, array['Niveau IV échelon 1']::text[], 10, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('917130ec-6b34-54eb-9bb8-dd8db8b2253d', 'IV-2', 'Niveau IV échelon 2', 'employe', 'IV', '2', null, array['Niveau IV échelon 2']::text[], 11, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('fc408182-37bd-589b-b8b9-4fcd869f1c20', 'IV-3', 'Niveau IV échelon 3', 'employe', 'IV', '3', null, array['Niveau IV échelon 3']::text[], 12, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('0b906366-c50a-573e-8c2e-56f832b51650', 'V-1', 'Niveau V échelon 1', 'agent_maitrise', 'V', '1', null, array['Niveau V échelon 1']::text[], 13, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('2d83866e-92a4-5cd9-8fd0-0bc68d007865', 'V-2', 'Niveau V échelon 2', 'agent_maitrise', 'V', '2', null, array['Niveau V échelon 2']::text[], 14, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('4837d8ca-2129-5cae-a1b2-8e802e7c772a', 'V-3', 'Niveau V échelon 3', 'agent_maitrise', 'V', '3', null, array['Niveau V échelon 3']::text[], 15, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('a912f616-e085-593a-9dfe-23fd74d4cf08', 'VI-1', 'Niveau VI échelon 1', 'agent_maitrise', 'VI', '1', null, array['Niveau VI échelon 1']::text[], 16, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('ed1ac9df-ff08-5c44-b625-6858a2087254', 'VI-2', 'Niveau VI échelon 2', 'agent_maitrise', 'VI', '2', null, array['Niveau VI échelon 2']::text[], 17, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('1d8b40d4-e201-529d-8743-0859d1171780', 'VI-3', 'Niveau VI échelon 3', 'agent_maitrise', 'VI', '3', null, array['Niveau VI échelon 3']::text[], 18, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('9dae3a21-693e-551e-820a-54ef7718cd32', 'VII-1', 'Niveau VII échelon 1', 'cadre', 'VII', '1', null, array['Niveau VII échelon 1']::text[], 19, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('08fae534-c87e-5a88-89c9-cf80622b2079', 'VII-2', 'Niveau VII échelon 2', 'cadre', 'VII', '2', null, array['Niveau VII échelon 2']::text[], 20, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('ebfdf33b-9429-589b-bb7f-ea98851ae9a7', 'VII-3', 'Niveau VII échelon 3', 'cadre', 'VII', '3', null, array['Niveau VII échelon 3']::text[], 21, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('4fd47214-f250-5a61-ab26-452d24120609', 'VIII-1', 'Niveau VIII échelon 1', 'cadre', 'VIII', '1', null, array['Niveau VIII échelon 1']::text[], 22, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('0d9f0f5b-60ad-596a-833c-efdf12b0f2aa', 'VIII-2', 'Niveau VIII échelon 2', 'cadre', 'VIII', '2', null, array['Niveau VIII échelon 2']::text[], 23, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('15c41d7f-1c66-503f-b6ba-787a4ba27aa0', 'VIII-3', 'Niveau VIII échelon 3', 'cadre', 'VIII', '3', null, array['Niveau VIII échelon 3']::text[], 24, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('dc7a3524-371a-5da5-b580-e2fe90662f81', 'IX-1', 'Niveau IX échelon 1', 'cadre', 'IX', '1', null, array['Niveau IX échelon 1']::text[], 25, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('373d088e-aa1e-5409-89d5-0f86f4eafae8', 'IX-2', 'Niveau IX échelon 2', 'cadre', 'IX', '2', null, array['Niveau IX échelon 2']::text[], 26, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('72c5f016-366e-5bd0-8e12-7a16303642e4', 'X-1', 'Niveau X échelon 1', 'cadre', 'X', '1', null, array['Niveau X échelon 1']::text[], 28, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1),
('374cd4a4-6c4d-51d7-9e9e-58f4cedd8f1b', 'X-2', 'Niveau X échelon 2', 'cadre', 'X', '2', null, array['Niveau X échelon 2']::text[], 29, 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '1992-05-05', null, 1)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000051352247 — Minimum mensuel pour 151,67 heures'),
(2, 'Art. 1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000051352247 — Minimum annuel apprécié au 31 décembre sur le total des salaires bruts de l''année, prorata temporis'),
(3, 'Art. 1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054454080 — Minimum mensuel pour 151,67 heures'),
(4, 'Art. 1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054454080 — Minimum annuel apprécié au 31 décembre sur le total des salaires bruts de l''année, prorata temporis')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '573', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('9e132a93-e5d5-5f61-aa3a-ccf0b8569018', 'I-1', 1817.1, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('3473f551-6c9a-530c-ac58-11776d150c90', 'I-2', 1828.0, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('a9b04267-2b63-5d1e-944d-518d618cd513', 'I-3', 1838.97, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('bdebe5a6-dfcc-58a4-bc85-2cfb181a1236', 'II-1', 1850.0, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('1d2b308c-4d5b-5679-b925-40b09e67ab8a', 'II-2', 1861.1, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('3984324f-7326-50d4-817f-3f425aadb1c7', 'II-3', 1872.27, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('8fbd5550-ed92-5824-8e77-71d1fe55d641', 'III-1', 1883.5, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('56acff91-3a21-5949-8a51-cc5c90039661', 'III-2', 1894.8, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('103d5f20-c456-525c-88f5-9134857b3520', 'III-3', 1906.17, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('637a5968-ddce-5921-9707-9ffa6aaba354', 'IV-1', 1917.61, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('f2e24b31-008e-5d21-986b-98736a543b8b', 'IV-2', 1929.12, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('3045027f-9240-5598-a770-81f2b81e9d3a', 'IV-3', 1940.69, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('46c0dc4e-1218-5248-a2df-b4770f4428e3', 'V-1', 1948.67, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('1120ac63-1078-5afd-aa96-b45087d82169', 'V-2', 2021.75, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('a523aca4-7fad-5e33-a3af-8f776b2b3e79', 'V-3', 2097.56, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('87dc8e4f-35a0-530e-a1f7-f4b5b9dc2a27', 'VI-1', 2176.22, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('868ce30c-d6bb-5c98-a65a-b446172d1974', 'VI-2', 2257.83, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('fab148ed-6712-5a4a-a1c9-fde4d8fcbc84', 'VI-3', 2342.5, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 1),
('bdb26f09-866a-5e1e-b5d0-18a32d1faf6c', 'VII-1', 29963.76, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('ea022f3e-0428-5ebd-91ff-6383b90a587e', 'VII-2', 31461.94, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('f41bf9a7-f4af-5199-a4b8-d9058f6fd670', 'VII-3', 33035.04, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('656bb6b3-0db3-529a-a449-93b56cd5efaf', 'VIII-1', 38231.45, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('84cf3b5e-ec21-5728-8a08-3548d780e7b4', 'VIII-2', 42054.6, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('64e69645-3457-5f53-9c19-cb3532b33d4a', 'VIII-3', 46260.06, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('e87ca25e-1443-57f1-8856-3ab64123d0e7', 'IX-1', 50886.07, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('741cc49d-b99d-5f1e-9472-f985e9a23dac', 'IX-2', 55974.67, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('17e0099f-7736-58d8-a7f9-847db7b5e228', 'X-1', 64370.87, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('82e5b3e8-de01-54d7-90b2-83a0417ba91c', 'X-2', 77245.05, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'dd03d15b-7151-5221-a7a5-e9f0cf31636b', '2025-01-01', '2026-03-01', 2),
('29442f0a-dfb0-5c49-824c-830765df8ae6', 'I-1', 1839.81, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('5e20eaec-6080-5c21-8700-b4c5297f3f8e', 'I-2', 1850.85, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('ab255654-e19f-5619-97f9-2681b752ef3a', 'I-3', 1861.96, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('f0eec213-c037-5f54-8cc2-239fc86d7e51', 'II-1', 1873.13, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('844ac236-58b5-5cd4-a2d3-458852b38406', 'II-2', 1884.37, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('11ac01af-f0d2-55f5-b5f8-e2775a9b2efd', 'II-3', 1895.67, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('ed6680c6-d169-5db6-9722-fac2e91d01f5', 'III-1', 1907.05, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('4c39dc29-d62e-5c19-b4ad-cd8b7b7f5600', 'III-2', 1918.49, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('86b6a891-333d-5112-9245-321b211acd37', 'III-3', 1930.0, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('adc179f8-a150-5dea-83a4-63deb1f38256', 'IV-1', 1941.58, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('abedfe45-51ac-5366-998f-071639aefa69', 'IV-2', 1953.23, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('dece550d-e552-585e-9a22-998eef2e52e4', 'IV-3', 1964.95, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('a3eb9ab0-9d19-530a-925a-651daaf208af', 'V-1', 1973.03, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('4024a395-c442-5ecb-95e9-03b0bdae8324', 'V-2', 2047.02, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('fe428966-f3e3-5f20-a5f9-392291a47092', 'V-3', 2123.78, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('4cc976af-6e1f-59af-b359-78692135438a', 'VI-1', 2203.43, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('d6fa592e-c266-571e-80ae-f9591c5f7fbf', 'VI-2', 2286.05, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('000ca886-f2f5-5317-b777-0bc9b8fef2bc', 'VI-3', 2371.78, 'mensuel', null, 151.67, 'standard', null, 0, 'salaire_base', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 3),
('9e64ccf8-b802-598c-b2bf-157caf1b87a4', 'VII-1', 30338.3, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4),
('ddf45b40-cd0c-523c-995e-735af03eb450', 'VII-2', 31855.22, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4),
('61ac29eb-31f8-543b-b70b-3d46ec6ecde2', 'VII-3', 33447.98, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4),
('e2f2c320-5328-5159-ba19-f8d76d882c5a', 'VIII-1', 38709.35, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4),
('e263f143-db33-50c6-b404-cea9da0ef93c', 'VIII-2', 42580.28, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4),
('3791feba-a0d3-5222-a8f3-fbe173f42932', 'VIII-3', 46838.31, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4),
('409c2ba4-0260-5491-a42f-62c042a24b8d', 'IX-1', 51522.14, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4),
('19962da3-73cb-5c55-a2ce-2140ecd6cb95', 'IX-2', 56674.36, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4),
('3c530e9f-bc5a-5db5-8ffb-f7d05bc5bf85', 'X-1', 65175.51, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4),
('3822886a-85b3-59cb-9286-d9fc4089cb26', 'X-2', 78210.61, 'annuel', 12, null, 'standard', null, 0, 'remuneration_annuelle', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 4)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 44 §2.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836415 — Contingent de 180 h pour le secteur alimentaire (dépassement exceptionnel de 10 % possible) ; secteur non alimentaire : contingent légal (220 h)')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '573', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('d81900d1-0a74-5175-9195-918779925860', null, null, 'standard', 35, 151.67, null, 180, null, null, null, null, null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 44 §2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836415 — Taux légaux (art. L. 3121-36 C. trav.) auxquels la convention renvoie'),
(2, 'Art. 45 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836417'),
(3, 'Art. 46 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836418'),
(4, 'Art. 46 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836418 — S''ajoute à la majoration pour heures supplémentaires'),
(5, 'Art. 47 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836419 — Prime indépendante du salaire ; hors gardiens et veilleurs de nuit'),
(6, 'Art. 47 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836419 — Hors personnel de roulage, gardiens et veilleurs de nuit')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '573', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('095c7747-ed55-5c49-854f-4aafcfbc2eea', 'heures_supplementaires', 'Heures supplémentaires de la 36e à la 43e heure', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement_ou_repos', null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('23690f60-b56f-5d3f-8b9a-21cd0088ef93', 'heures_supplementaires', 'Heures supplémentaires au-delà de la 43e heure', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement_ou_repos', null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('f306e9b9-c488-528e-8343-f45f62064821', 'jour_ferie', 'Travail exceptionnel d''un jour férié : rémunération complémentaire de 100 % ou 1 jour de congé payé', null, null, null, null, null, null, null, 100, null, null, 'paiement_ou_repos', null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('115763c8-c474-5d9a-94c9-e611941fe290', 'jour_ferie', 'Travail habituel les jours fériés', null, null, null, null, null, null, null, 10, null, null, 'paiement', null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('85232f48-1289-5d3f-88f2-bf17d1fed4c6', 'dimanche', 'Travail habituel le dimanche', null, null, null, null, null, null, null, 10, null, null, 'paiement', null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 3),
('ad005aed-b0ef-5bdb-8080-d7fccb86c307', 'dimanche', 'Travail exceptionnel le dimanche (3 par an maximum) + 1 journée de repos compensatrice', null, null, null, null, null, null, null, 100, null, null, 'paiement_et_repos', null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 4),
('5317cfde-a561-5d6a-b3b2-f55e8e997a8c', 'nuit', 'Travail habituel de nuit ou en équipe (22 h - 6 h)', null, null, null, null, null, '22:00', '06:00', 10, null, null, 'paiement', null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 5),
('f06942c5-424d-5ba7-ad1e-5bd4ce75b937', 'nuit', 'Travail exceptionnel de nuit du personnel sédentaire (22 h - 6 h)', array['sedentaire']::text[], null, null, null, null, '22:00', '06:00', 25, null, null, 'paiement', null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 6)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 47 §4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836419')
)
insert into public.cc_allowances (id, idcc_code, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '573', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.zone::text, v.amount::numeric, v.unit::text, v.minimum_garanti_percent::numeric, v.conditions::text, v.social_exemption_limit::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('546b30ed-0a28-5ce2-aa8b-869d11d3f719', 'casse_croute', 'Casse-croûte (au moins 4 h de travail entre 22 h et 6 h), à défaut indemnité', null, null, null, null, 'par_nuit', 150, 'Fourniture d''un casse-croûte ou indemnité égale à 1,5 fois le minimum garanti', null, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1)
) as v(id, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000048953869 — Taux patronal minimal de 0,372 % sur les tranches 1 et 2 (salaire limité à 4 PASS) ; l''employeur finance au moins 60 % de la cotisation totale'),
(2, 'Art. 8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053320382 — Aucun taux conventionnel supplémentaire ; couverture décès, invalidité, incapacité à organiser dans la cotisation de 1,50 % T1')
)
insert into public.cc_contributions (id, idcc_code, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '573', v.kind::text, v.label::text, v.organism::text, v.designation::text, v.categories::text[], v.classification_codes::text[], v.base::text, v.total_rate_percent::numeric, v.employer_rate_percent::numeric, v.employee_rate_percent::numeric, v.employer_fixed_amount::numeric, v.employee_fixed_amount::numeric, v.employer_min_share_percent::numeric, v.mandatory::boolean, v.company_size_min::int, v.company_size_max::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('7ef333e8-b8b3-52b7-b4d2-8d911adbdeb2', 'prevoyance', 'Prévoyance des non-cadres — part patronale minimale', null, null, array['employe','agent_maitrise','technicien','ouvrier']::text[], null, 'salaire_brut', null, 0.372, null, null, null, 60, true, null, null, '7d76a020-96d6-5822-ab5f-f036b086d742', '2024-07-01', null, 1),
('1916b1a3-ca72-5895-98fe-a88056661712', 'prevoyance', 'Prévoyance des cadres — cotisation patronale obligatoire (ANI du 17 novembre 2017)', null, null, array['cadre']::text[], null, 'tranche_1', null, 1.5, null, null, null, null, true, null, null, 'b1f029c9-edac-5ce5-b61c-31549a2a5076', '2026-01-01', null, 2)
) as v(id, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 52 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836425'),
(2, 'Art. 45 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836417')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '573', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('6b1cbbe0-a78b-596c-9201-beed066f976d', 'evenement_familial', 'Mariage du salarié', 'Mariage du salarié', null, null, 0, 4, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('624f8378-0367-5bf0-8444-12a678f211a0', 'evenement_familial', 'Mariage d''un enfant', 'Mariage d''un enfant', null, null, 0, 2, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('65e7bcb9-e8e0-5340-adae-d41cd6d70270', 'evenement_familial', 'Décès du conjoint, partenaire de Pacs, concubin ou d''un enfant', 'Décès du conjoint, partenaire de Pacs, concubin ou d''un enfant', null, null, 0, 3, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('d2c8215a-a177-5bb6-bba5-62cfb7aca8fe', 'evenement_familial', 'Décès du père ou de la mère', 'Décès du père ou de la mère', null, null, 0, 2, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('472d8248-2cb0-54b7-9cf5-17e08207bd5c', 'evenement_familial', 'Décès des beaux-parents', 'Décès des beaux-parents', null, null, 0, 2, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('3e8a479e-1e00-5d90-85dc-7bb675b3c666', 'evenement_familial', 'Décès d''un frère, d''une sœur, d''un beau-frère, d''une belle-sœur ou d''un grand-parent', 'Décès d''un frère, d''une sœur, d''un beau-frère, d''une belle-sœur ou d''un grand-parent', null, null, 0, 1, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('1a398083-5bb5-50f1-8177-408996446814', 'evenement_familial', 'Communion solennelle d''un enfant', 'Communion solennelle d''un enfant', null, null, 0, 1, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('29e015af-783f-5d76-babc-519a1fc9ea9e', 'evenement_familial', 'Journée défense et citoyenneté', 'Journée défense et citoyenneté', null, null, 0, 1, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('bc2dfd0c-be89-5b75-90f4-fb0c7ec7dd88', 'evenement_familial', 'Déménagement', 'Déménagement', null, null, 0, 1, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('6b8e28fa-e994-5e2f-ba7a-6f9b84a465a9', 'evenement_familial', 'Naissance ou adoption', 'Naissance ou adoption', null, null, 0, 3, 'ouvrables', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('c7a45d97-9d3e-579e-9c7b-208225ff76d9', 'conges_supplementaires', null, 'Jours fériés légaux chômés et payés (présence la veille et le lendemain)', null, null, 0, 10, 'calendaires', true, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 53 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836426 — À partir du 8e jour (1er jour en cas d''hospitalisation) ; % de la rémunération brute sous déduction des IJSS et de la part employeur de la prévoyance ; durées cumulées sur 12 mois'),
(2, 'Art. 53 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005836426 — À partir du 1er jour ; durées majorées de 10 jours (maximum 90) ; sous déduction des IJSS et de la part employeur de la prévoyance')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '573', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('6711f891-18a4-56da-b996-6aa3b600353e', 'maladie', null, null, 12, 7, 1, 30, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('b1787185-06ff-5303-ac8f-a3803e19fc4a', 'maladie', null, null, 12, 7, 2, 30, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('98e8781f-a022-54eb-b7a2-572f4c1cb5ea', 'accident_trajet', null, null, 12, 7, 1, 30, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('d32d2fdc-8b58-5233-aba2-093183c45921', 'accident_trajet', null, null, 12, 7, 2, 30, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('10da58ad-4cbf-58c4-873d-73fa3417b643', 'accident_travail', null, null, 12, 0, 1, 40, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('58ea9ad5-453f-5f84-8bdc-1694ae522c81', 'accident_travail', null, null, 12, 0, 2, 40, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('71c53445-cc5a-5020-ab92-34535252e60f', 'maladie_professionnelle', null, null, 12, 0, 1, 40, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('607d7520-2a68-5b07-a6ea-ac0cb784ab5d', 'maladie_professionnelle', null, null, 12, 0, 2, 40, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('760fd8d4-8502-5d1c-b9ae-cf3b1e923cb2', 'maladie', null, null, 72, 7, 1, 40, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('9797245a-2dbc-5460-a712-0f2afe2fa14e', 'maladie', null, null, 72, 7, 2, 40, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('34d6a4db-8f2b-5d10-8676-655056c275c3', 'accident_trajet', null, null, 72, 7, 1, 40, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('0a53b5ac-9385-59f8-b2af-b46eca03422b', 'accident_trajet', null, null, 72, 7, 2, 40, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('170de744-0a0e-56ce-9c5f-e56c96486d0b', 'accident_travail', null, null, 72, 0, 1, 50, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('182cdb63-937a-552c-89c5-97ba74aa5437', 'accident_travail', null, null, 72, 0, 2, 50, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('55999d53-da26-50fa-a5e7-213d9b122aa3', 'maladie_professionnelle', null, null, 72, 0, 1, 50, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('77ba6d5c-18dd-5b67-9b0a-fd90e6a93b5c', 'maladie_professionnelle', null, null, 72, 0, 2, 50, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('b487422c-e926-5a04-b9d1-ff06db8e2fca', 'maladie', null, null, 132, 7, 1, 50, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('d5719db2-81cb-5fb2-a995-e38b54a4f5dd', 'maladie', null, null, 132, 7, 2, 50, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('96f7d892-f487-5ebc-9220-f19418e75b72', 'accident_trajet', null, null, 132, 7, 1, 50, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('b8bc3a40-13b0-59ab-b6fc-f054a06e5c2b', 'accident_trajet', null, null, 132, 7, 2, 50, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('c2264f44-55c8-5b1d-8451-adee82832e61', 'accident_travail', null, null, 132, 0, 1, 60, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('406d6baf-d3ea-5f7a-a595-d57ffab3d490', 'accident_travail', null, null, 132, 0, 2, 60, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('23c45ec8-bbfc-5282-b1bf-8fb95498adab', 'maladie_professionnelle', null, null, 132, 0, 1, 60, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('1bd332a5-7a39-553f-95d8-1e4b94199a84', 'maladie_professionnelle', null, null, 132, 0, 2, 60, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('5ddcf4e2-b23a-525b-b688-f4b835782e28', 'maladie', null, null, 192, 7, 1, 60, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('fd99e446-e949-5683-8c7e-016374cf44dc', 'maladie', null, null, 192, 7, 2, 60, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('78c8f9e6-4eff-5377-a903-7b465d110623', 'accident_trajet', null, null, 192, 7, 1, 60, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('b13166c1-8e77-5cc4-b5a0-6dcb5d9e812d', 'accident_trajet', null, null, 192, 7, 2, 60, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('381f6018-a128-591c-b230-20f08d3365db', 'accident_travail', null, null, 192, 0, 1, 70, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('202e1ef3-063d-5e53-9ac4-06e762b9de6c', 'accident_travail', null, null, 192, 0, 2, 70, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('7fb026a1-e5f2-5a0d-b9b4-4e1611c4d113', 'maladie_professionnelle', null, null, 192, 0, 1, 70, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('34fff859-556d-55ec-9a91-63a7f7078eac', 'maladie_professionnelle', null, null, 192, 0, 2, 70, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('16d6d61d-57d4-56c5-a45c-f4cf3f86a5dc', 'maladie', null, null, 252, 7, 1, 70, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('ee0d39d5-83cb-5ed4-bdcc-ad0c6250b988', 'maladie', null, null, 252, 7, 2, 70, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('929a232b-cd8b-516b-a005-dd69ba64d33b', 'accident_trajet', null, null, 252, 7, 1, 70, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('c7fd8453-bfaf-51c4-aa9d-3a39548a055a', 'accident_trajet', null, null, 252, 7, 2, 70, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('3813f8b6-be7c-5de3-ab41-062c4c6962c5', 'accident_travail', null, null, 252, 0, 1, 80, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('724d1b9e-95bb-5ed4-9b18-de61cff331c9', 'accident_travail', null, null, 252, 0, 2, 80, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('021989fe-abb6-5c0f-bbc8-ebe197207f9c', 'maladie_professionnelle', null, null, 252, 0, 1, 80, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('16fceccb-e71d-5b03-b8a4-6d78213bd6d6', 'maladie_professionnelle', null, null, 252, 0, 2, 80, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('9d20d405-bb8c-5458-8174-a55cb4e50398', 'maladie', null, null, 312, 7, 1, 80, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('3414ba24-ef96-5e52-90a0-6ba8fe286050', 'maladie', null, null, 312, 7, 2, 80, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('9f30732a-a47b-5354-af6f-97af8be87fbc', 'accident_trajet', null, null, 312, 7, 1, 80, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('880ecd7c-cc45-560f-88de-8576bdf8b556', 'accident_trajet', null, null, 312, 7, 2, 80, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('9457b468-014b-5f0b-beba-84d1bd7e4cc2', 'accident_travail', null, null, 312, 0, 1, 90, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('04d5070b-e26f-58d9-a459-a611a4c2b2b8', 'accident_travail', null, null, 312, 0, 2, 90, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('f16e7629-4459-5e46-8fe7-178bb24e6961', 'maladie_professionnelle', null, null, 312, 0, 1, 90, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('8b58e3de-b1b5-5056-b38b-28e505c4cd77', 'maladie_professionnelle', null, null, 312, 0, 2, 90, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('46ed6b22-3359-59f6-b4c3-bab7779d4429', 'maladie', null, null, 372, 7, 1, 90, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('1318ac43-7d93-5259-878d-4be42aa6f12c', 'maladie', null, null, 372, 7, 2, 90, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('7d50cefd-c8c2-515a-aba5-bbf9eb2fb5b2', 'accident_trajet', null, null, 372, 7, 1, 90, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('ff64c617-af06-5615-b51d-872b3c762a7c', 'accident_trajet', null, null, 372, 7, 2, 90, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 1),
('b11d2792-47da-585b-955a-8860d05c4c28', 'accident_travail', null, null, 372, 0, 1, 90, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('35e710ef-0fec-56c5-9990-a1517b218bc3', 'accident_travail', null, null, 372, 0, 2, 90, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('eed46a86-79fc-5478-ad90-18c8c7fba3e3', 'maladie_professionnelle', null, null, 372, 0, 1, 90, 90, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2),
('add4c47b-d4f2-59d2-b3ee-1c07cd938c5e', 'maladie_professionnelle', null, null, 372, 0, 2, 90, 66.67, 'brut', true, 12, '04374c48-5684-5205-87fc-b60503b321b6', '1985-02-16', null, 2)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054454083'),
(2, 'Art. 1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054454080')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '573', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('5f7b39e4-89f8-59ab-8f55-324ece3ac4ef', 'smic_grille', 'Engagement de renégocier si le niveau I échelon 1 passe sous le SMIC', null, null, null, null, 'Si le premier niveau de la grille devient inférieur au SMIC, le SMIC s''applique et une nouvelle grille doit être négociée dans le mois', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 1),
('2a505b93-a873-5e93-b303-22a70b794876', 'echelon_experience', 'Passage au 2e échelon selon l''expérience dans la fonction', null, null, null, null, '1 an au niveau I, 2 ans au niveau II, 3 ans au niveau III, 4 ans au niveau IV, 5 ans au niveau V, 6 ans au niveau VI (durées divisées par deux avec un diplôme adapté) ; 3 ans maximum au niveau VII', 'ff8fec94-1b9e-5fd8-87d8-55abbd188f8c', '2026-03-01', null, 2)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
