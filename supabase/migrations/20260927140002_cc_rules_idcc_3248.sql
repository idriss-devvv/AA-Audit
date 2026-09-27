-- Critères de vérification de la convention collective IDCC 3248, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 3248 — Métallurgie (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('6e534d64-b89f-5820-9de5-f29975e278cb', '3248', 'texte_base', 'Convention collective nationale de la métallurgie du 7 février 2022', 'KALITEXT000046314281', '2022-02-07'::date, '2022-12-22'::date, '2024-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000046314281', null, '2026-09-27'),
('f5ca4ee7-da38-558c-ad01-111844d47937', '3248', 'avenant_salaires', 'Avenant du 20 février 2026 relatif aux salaires minima hiérarchiques', 'KALITEXT000054254725', '2026-02-20'::date, '2026-06-05'::date, '2026-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054254725', null, '2026-09-27');

with n(k, t) as (values
(1, 'Art. 138 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314834 — Groupes A à E : non-cadres ; F à I : cadres')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3248', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('b6ec85ad-b7d6-5b2a-b35e-2c3e4112617b', 'CLASSE-1', 'Groupe d''emplois A, classe 1', 'ouvrier', 'A', '1', null, array['A1','Classe 1','Classe d''emplois 1']::text[], 1, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('c0765ca8-c299-539d-bc95-b9d0f85a9c83', 'CLASSE-2', 'Groupe d''emplois A, classe 2', 'ouvrier', 'A', '2', null, array['A2','Classe 2','Classe d''emplois 2']::text[], 2, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('436d8096-77d2-54e8-af31-dac1c5cc16d5', 'CLASSE-3', 'Groupe d''emplois B, classe 3', 'ouvrier', 'B', '3', null, array['B3','Classe 3','Classe d''emplois 3']::text[], 3, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('2f2284e6-2c0b-5eda-886e-dc943bcf2476', 'CLASSE-4', 'Groupe d''emplois B, classe 4', 'ouvrier', 'B', '4', null, array['B4','Classe 4','Classe d''emplois 4']::text[], 4, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('77eec6b3-2e8f-5bed-a4c3-55cd82237e37', 'CLASSE-5', 'Groupe d''emplois C, classe 5', 'ouvrier', 'C', '5', null, array['C5','Classe 5','Classe d''emplois 5']::text[], 5, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('e3fd3edf-04fb-5dc2-8c49-755ce5d9fcb9', 'CLASSE-6', 'Groupe d''emplois C, classe 6', 'ouvrier', 'C', '6', null, array['C6','Classe 6','Classe d''emplois 6']::text[], 6, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('e9508765-bacc-5a59-8c9d-13d9eae4839d', 'CLASSE-7', 'Groupe d''emplois D, classe 7', 'technicien', 'D', '7', null, array['D7','Classe 7','Classe d''emplois 7']::text[], 7, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('b4c04df4-1faf-54b2-ac12-2eaa249d652f', 'CLASSE-8', 'Groupe d''emplois D, classe 8', 'technicien', 'D', '8', null, array['D8','Classe 8','Classe d''emplois 8']::text[], 8, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('81f438a0-e72f-5b9b-9524-6c06654aabf6', 'CLASSE-9', 'Groupe d''emplois E, classe 9', 'agent_maitrise', 'E', '9', null, array['E9','Classe 9','Classe d''emplois 9']::text[], 9, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('035285ce-0aa6-5393-afbd-0899bbababf6', 'CLASSE-10', 'Groupe d''emplois E, classe 10', 'agent_maitrise', 'E', '10', null, array['E10','Classe 10','Classe d''emplois 10']::text[], 10, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('ddb2f270-ec7e-58f2-89a8-a43d1c833a7b', 'CLASSE-11', 'Groupe d''emplois F, classe 11', 'cadre', 'F', '11', null, array['F11','Classe 11','Classe d''emplois 11']::text[], 11, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('c0b1e10b-76e1-5cd6-9049-5a47e9da05e0', 'CLASSE-12', 'Groupe d''emplois F, classe 12', 'cadre', 'F', '12', null, array['F12','Classe 12','Classe d''emplois 12']::text[], 12, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('342d22bf-81ec-55f9-941f-1cc887a62ec9', 'CLASSE-13', 'Groupe d''emplois G, classe 13', 'cadre', 'G', '13', null, array['G13','Classe 13','Classe d''emplois 13']::text[], 13, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('5766cb79-d016-5786-9d0f-7d21c29bab1a', 'CLASSE-14', 'Groupe d''emplois G, classe 14', 'cadre', 'G', '14', null, array['G14','Classe 14','Classe d''emplois 14']::text[], 14, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('e76c3b3d-b35a-5d78-83c4-d060a3dfd47e', 'CLASSE-15', 'Groupe d''emplois H, classe 15', 'cadre', 'H', '15', null, array['H15','Classe 15','Classe d''emplois 15']::text[], 15, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('ca19df39-5a9a-5410-935b-28e6be3d2e87', 'CLASSE-16', 'Groupe d''emplois H, classe 16', 'cadre', 'H', '16', null, array['H16','Classe 16','Classe d''emplois 16']::text[], 16, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('23e55f23-2136-52a2-9c0c-e11ca5cc5e44', 'CLASSE-17', 'Groupe d''emplois I, classe 17', 'cadre', 'I', '17', null, array['I17','Classe 17','Classe d''emplois 17']::text[], 17, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('be7c111c-6414-50e5-bdfd-acc84a84b1dd', 'CLASSE-18', 'Groupe d''emplois I, classe 18', 'cadre', 'I', '18', null, array['I18','Classe 18','Classe d''emplois 18']::text[], 18, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 1 (annexe 6.1) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054254729 — Salaire minimum hiérarchique annuel apprécié sur l''ensemble des éléments bruts soumis à cotisations (hors prime d''ancienneté, primes exceptionnelles, épargne salariale…), au prorata en cas d''entrée, départ ou absence non assimilée'),
(2, 'Art. 1 (annexe 6.1) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054254729 — Salaire minimum hiérarchique annuel apprécié sur l''ensemble des éléments bruts soumis à cotisations (hors prime d''ancienneté, primes exceptionnelles, épargne salariale…), au prorata en cas d''entrée, départ ou absence non assimilée ; +30 % si l''horaire moyen dépasse 38 h 30 (jusqu''à 42 h)'),
(3, 'Art. 1 (annexe 6.1) — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054254729 — Barème adapté des débutants du groupe F (expérience professionnelle et non ancienneté dans l''entreprise) ; au-delà de 6 ans : barème unique')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3248', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('2c71f6dc-ecaf-5323-ab47-2aacbdfbe282', 'CLASSE-1', 21980, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('1744fb64-bc59-544a-8664-f03ecd0f1df1', 'CLASSE-1', 25277, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('67aa6812-7a80-5542-9f03-2fe4049c0f14', 'CLASSE-1', 28574, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('bea96220-b30c-526d-8a02-51c496cc5fc7', 'CLASSE-2', 22100, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('b16897d7-7637-525a-a3b0-5dbe8cb27a5c', 'CLASSE-2', 25415, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('4f32e4b0-ad78-5c88-a4e1-25ed75476459', 'CLASSE-2', 28730, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('e00ae5bc-e934-5b53-857c-28fd17398ea7', 'CLASSE-3', 22710, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('648026a9-e467-51fe-a43c-988c0e730377', 'CLASSE-3', 26117, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('73685437-64bc-508d-8eb3-608ca230d31d', 'CLASSE-3', 29523, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('b8590f49-2787-5f9e-aa4b-6ecac2912f8d', 'CLASSE-4', 23620, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('4e5f9786-e38c-5c74-b44f-8ddd2b83b17d', 'CLASSE-4', 27163, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('d7988166-538d-521e-adef-2d0b8ec8d6c8', 'CLASSE-4', 30706, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('3e566e18-2425-530d-9c49-ab7613579af2', 'CLASSE-5', 24510, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('7ec0552a-8b58-5091-827e-8874881dd66e', 'CLASSE-5', 28187, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('02addd3c-e4a2-5d07-8d6e-95c86305f122', 'CLASSE-5', 31863, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('33cf4e11-a243-577f-8994-dace33f20c90', 'CLASSE-6', 25780, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('806da1cf-5d0c-5d91-be3a-fb56f20bf68e', 'CLASSE-6', 29647, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('c826121b-c376-558e-a801-5bf8483fd654', 'CLASSE-6', 33514, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('70dccd01-fb95-5011-9638-7434d5a5e98b', 'CLASSE-7', 26680, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('b7ae5b77-ff2f-52a5-8299-8eb832fdd42e', 'CLASSE-7', 30682, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('2bbee130-1f4f-54dc-a5eb-03ed440505e3', 'CLASSE-7', 34684, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('3c735360-ab84-5b34-8da1-c9a17705b224', 'CLASSE-8', 28700, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('0fd4345d-3d60-58d2-b9b4-747719a96a16', 'CLASSE-8', 33005, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('ea4a9104-a283-591a-999d-a7adc2305b33', 'CLASSE-8', 37310, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('c9d906fe-b862-5e54-aad4-9a10d1d6b62c', 'CLASSE-9', 30760, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('2748addd-0305-56ec-9cf4-b9c1e86ba21c', 'CLASSE-9', 35374, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('d0277445-57c1-53e7-9ce1-763a54ba7407', 'CLASSE-9', 39988, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('6d330b83-043c-54ae-8667-77acdc01766a', 'CLASSE-10', 33970, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('802c5dd4-41fe-5e38-98cc-1174039b66b8', 'CLASSE-10', 39066, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('73b1f323-f8fd-5472-a883-2e95d3287fea', 'CLASSE-10', 44161, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('7fb768da-aaed-5882-84f8-1c572915bd7b', 'CLASSE-11', 28430, 'annuel', 12, null, 'standard', 'débutant groupe F — expérience moins de 2 ans', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('c1560662-16b2-5daf-bc68-311e7a83cd87', 'CLASSE-11', 32695, 'annuel', 12, null, 'forfait_heures', 'débutant groupe F — expérience moins de 2 ans — majoration 15 %', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('cb4ee0db-cf5f-5c6d-98c4-bca6f8c604aa', 'CLASSE-11', 36959, 'annuel', 12, null, 'forfait_jours', 'débutant groupe F — expérience moins de 2 ans — majoration 30 %', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('f4b9e903-b12d-57ab-b480-f8352baf10c4', 'CLASSE-11', 29852, 'annuel', 12, null, 'standard', 'débutant groupe F — expérience 2 à 4 ans', 24, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('32272a80-837d-5f5c-89d6-beed3e2e2e4f', 'CLASSE-11', 34329, 'annuel', 12, null, 'forfait_heures', 'débutant groupe F — expérience 2 à 4 ans — majoration 15 %', 24, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('1bfc7e3c-5bba-57b8-973b-6f943e0f08e6', 'CLASSE-11', 38807, 'annuel', 12, null, 'forfait_jours', 'débutant groupe F — expérience 2 à 4 ans — majoration 30 %', 24, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('b8aadd9a-21e1-5b99-9003-05389999d7be', 'CLASSE-11', 32240, 'annuel', 12, null, 'standard', 'débutant groupe F — expérience 4 à 6 ans', 48, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('df870747-c345-5b2d-99d6-8ef64b6abbb2', 'CLASSE-11', 37076, 'annuel', 12, null, 'forfait_heures', 'débutant groupe F — expérience 4 à 6 ans — majoration 15 %', 48, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('d139b1a5-1dcf-5d7c-9577-999b18d36e0d', 'CLASSE-11', 41912, 'annuel', 12, null, 'forfait_jours', 'débutant groupe F — expérience 4 à 6 ans — majoration 30 %', 48, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('90a05151-8d5c-55b8-bc13-59467b65fbac', 'CLASSE-11', 35200, 'annuel', 12, null, 'standard', 'base 35 heures', 72, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('177c57c2-8a65-5599-a5c3-e9229f47e5da', 'CLASSE-11', 40480, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 72, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('9e1c77a0-2a3e-5e76-9dd0-cceb9a9ba4dd', 'CLASSE-11', 45760, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 72, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('ddee1a41-cb8a-5168-a7ed-f0743c713d8b', 'CLASSE-12', 29940, 'annuel', 12, null, 'standard', 'débutant groupe F — expérience moins de 2 ans', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('7e79a003-b3bb-5b3b-aff4-7d510b497af2', 'CLASSE-12', 34431, 'annuel', 12, null, 'forfait_heures', 'débutant groupe F — expérience moins de 2 ans — majoration 15 %', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('0b012f0f-ac34-59fb-8c1b-952b6342be4b', 'CLASSE-12', 38922, 'annuel', 12, null, 'forfait_jours', 'débutant groupe F — expérience moins de 2 ans — majoration 30 %', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('59893d7d-4d10-5a51-870f-2ccc35d24775', 'CLASSE-12', 31437, 'annuel', 12, null, 'standard', 'débutant groupe F — expérience 2 à 4 ans', 24, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('b7591fd5-86cf-5efe-a0a6-8fa3f241973e', 'CLASSE-12', 36153, 'annuel', 12, null, 'forfait_heures', 'débutant groupe F — expérience 2 à 4 ans — majoration 15 %', 24, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('bd8ce5a3-99e0-5017-8b64-a9698df7279f', 'CLASSE-12', 40868, 'annuel', 12, null, 'forfait_jours', 'débutant groupe F — expérience 2 à 4 ans — majoration 30 %', 24, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('3796191a-5f49-575d-bb00-959d27e6c3c2', 'CLASSE-12', 33952, 'annuel', 12, null, 'standard', 'débutant groupe F — expérience 4 à 6 ans', 48, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('f8b2e9e1-413d-5d03-a3fe-5978e55704f5', 'CLASSE-12', 39045, 'annuel', 12, null, 'forfait_heures', 'débutant groupe F — expérience 4 à 6 ans — majoration 15 %', 48, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('9a194c78-7fe1-57a3-8821-47cef81ea55b', 'CLASSE-12', 44138, 'annuel', 12, null, 'forfait_jours', 'débutant groupe F — expérience 4 à 6 ans — majoration 30 %', 48, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 3),
('755ee70d-e47e-570d-b3e5-b9f75e65b5cc', 'CLASSE-12', 37000, 'annuel', 12, null, 'standard', 'base 35 heures', 72, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('fdfe0e04-3075-5ed4-a4a0-17440e559b9c', 'CLASSE-12', 42550, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 72, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('a20cf131-3032-5d81-a08d-fdf016ab435f', 'CLASSE-12', 48100, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 72, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('b181e0f0-8599-58b8-a221-00094b222e34', 'CLASSE-13', 40350, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('7fd7acfe-cd19-5147-a041-7b11a0cb6e58', 'CLASSE-13', 46403, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('3582345d-01f7-572d-ba2c-ace6289fa939', 'CLASSE-13', 52455, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('454e678c-c49c-5411-91e6-3508b073110b', 'CLASSE-14', 44250, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('6dee7d20-a04c-5eba-9ef4-5a4371bd6a6f', 'CLASSE-14', 50888, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('8005c7d4-22b8-5963-9843-64e6c66ecfb1', 'CLASSE-14', 57525, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('2eecbdce-cd22-549f-b39f-d1e408b59e8f', 'CLASSE-15', 47380, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('192a98cc-50c4-5f11-9441-1373465a932f', 'CLASSE-15', 54487, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('42452a73-28aa-5cac-8e8b-2989c61bee02', 'CLASSE-15', 61594, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('b5b3c1a9-99bd-57c1-87fc-33b632fb2bcd', 'CLASSE-16', 52370, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('2221af71-104f-5232-ac26-5e559fc2e557', 'CLASSE-16', 60226, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('71b14ecd-93d0-5c9d-9abb-bb8fbc9db044', 'CLASSE-16', 68081, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('0d11713d-37cd-5a4b-9d28-12e746cae58a', 'CLASSE-17', 59720, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('7a4352d7-4950-5cb0-bbb4-9de3eb634df9', 'CLASSE-17', 68678, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('6b9cf1ad-631e-53d0-b2dd-e0e1f47f863e', 'CLASSE-17', 77636, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('1a2ac10f-a25f-5cee-834a-af62276cd71d', 'CLASSE-18', 68450, 'annuel', 12, null, 'standard', 'base 35 heures', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1),
('d8a13206-7b64-552c-b829-cb7f3a614866', 'CLASSE-18', 78718, 'annuel', 12, null, 'forfait_heures', 'forfait en heures sur l''année jusqu''à 38 h 30 en moyenne (+15 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 2),
('e7bede04-8fbc-5b5f-a81c-ec083cccf4d1', 'CLASSE-18', 88985, 'annuel', 12, null, 'forfait_jours', 'forfait en jours sur l''année (+30 %)', 0, 'remuneration_annuelle', 'f5ca4ee7-da38-558c-ad01-111844d47937', '2026-01-01', null, 1)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 1.45 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin'),
(2, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 1.6 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin'),
(3, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 1.75 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin'),
(4, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 1.95 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin'),
(5, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 2.2 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin'),
(6, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 2.45 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin'),
(7, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 2.6 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin'),
(8, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 2.9 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin'),
(9, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 3.3 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin'),
(10, 'Art. 142 et annexe 7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314923 — Prime mensuelle = (valeur du point territoriale × 3.8 %) × 100 × années d''ancienneté (plafond 15 ans), pour 35 h ; suit l''horaire (majorations HS, +30 % forfait jours) ; ligne distincte du bulletin')
)
insert into public.cc_seniority_bonuses (id, idcc_code, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3248', v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.prorata_working_time::boolean, v.seniority_definition::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('2ab3abe5-5db1-5f38-9fe0-badd8b4b9e64', null, array['CLASSE-1']::text[], 36, 1.45, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('4897dc52-23b1-5448-9821-148bb08029a8', null, array['CLASSE-2']::text[], 36, 1.6, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('0b729d9b-5394-536b-ad14-591cb369439a', null, array['CLASSE-3']::text[], 36, 1.75, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('00803d5c-14df-5452-a269-9dc6418619ff', null, array['CLASSE-4']::text[], 36, 1.95, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('3a951f7c-5d82-5362-87ed-482a1511c52b', null, array['CLASSE-5']::text[], 36, 2.2, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 5),
('1164e4be-d2a0-5b20-ae28-9fb2e174cead', null, array['CLASSE-6']::text[], 36, 2.45, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 6),
('82a8f276-f677-52c4-8a65-df1d92b28e26', null, array['CLASSE-7']::text[], 36, 2.6, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 7),
('7e59a1e2-7257-5e39-8625-0d344022cbd3', null, array['CLASSE-8']::text[], 36, 2.9, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 8),
('adb754ac-2ff0-5934-89cc-e8816e635ac4', null, array['CLASSE-9']::text[], 36, 3.3, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 9),
('e04ac555-b798-5e1f-b2a1-c0e38ae980f9', null, array['CLASSE-10']::text[], 36, 3.8, null, 'point', true, 'Ancienneté dans l''entreprise, de 3 à 15 ans', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 10)
) as v(id, categories, classification_codes, seniority_min_months, rate_percent, fixed_amount, calculation_base, prorata_working_time, seniority_definition, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 99.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314674 — 175 h en cas de décompte annuel ; contingents complémentaires de 80 h et 150 h (heures choisies)'),
(2, 'Art. 103.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314714 — 235 jours maximum avec renonciation à des jours de repos, majorés d''au moins 10 % ; SMH majoré de 30 % (art. 139)'),
(3, 'Art. 139 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314835 — +15 % jusqu''à 38 h 30 hebdomadaires en moyenne, +30 % de 38 h 30 à 42 h')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3248', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('86bd1354-0cd3-5801-908c-147cc37c1cdb', null, null, 'standard', 35, 151.66, null, 220, null, null, null, null, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('ca71e719-81d8-54b4-ae21-33b926c3a7bd', array['cadre','agent_maitrise']::text[], null, 'forfait_jours', null, null, null, null, 218, null, null, null, 130, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('f5d4a63c-61f3-51e0-8714-85f24ed8e6e7', null, null, 'forfait_heures', null, null, null, null, null, null, null, null, 115, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 99.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314672'),
(2, 'Art. 145 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314843 — 15 % du salaire minimum hiérarchique ; les avantages spécifiques de nuit déjà versés s''imputent'),
(3, 'Art. 146 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314844 — Majoration du salaire de base ; seule la majoration la plus élevée s''applique en cas de cumul (nuit, dimanche, férié)'),
(4, 'Art. 146 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314844'),
(5, 'Art. 103.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314714')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3248', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('8a417ed3-92d1-5750-a232-7709d811d5b9', 'heures_supplementaires', '8 premières heures supplémentaires', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement', null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('ca065043-3484-5639-abc5-86dff1ea2182', 'heures_supplementaires', 'Heures supplémentaires suivantes', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement', null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('eda49193-e8a5-57e6-a97b-aacf77fceb8a', 'nuit', 'Travailleur de nuit : au moins 6 heures entre 21 h et 6 h dans le poste', null, null, null, null, null, '21:00', '06:00', 15, null, null, 'paiement', null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('0060749f-b2af-503b-a118-0dbbceb2aba1', 'nuit', 'Heures exceptionnelles de nuit (21 h - 6 h)', null, null, null, null, null, '21:00', '06:00', 25, null, null, 'paiement', null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('c4a9b2b8-31c0-5286-884e-8ccd09da2085', 'dimanche', 'Heures exceptionnelles le dimanche (ou le jour de repos hebdomadaire)', null, null, null, null, null, null, null, 100, null, null, 'paiement', null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('c0083e3a-49c1-5980-9c8c-6aa75af7abd9', 'jour_ferie', 'Heures exceptionnelles un jour férié', null, null, null, null, null, null, null, 50, null, null, 'paiement', null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('5b7cb5bf-7073-53ee-b54a-5a6a0f205ef2', 'autre', 'Jours travaillés au-delà du forfait jours (renonciation à des jours de repos)', null, null, null, null, null, null, null, 10, null, null, 'paiement', null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 5)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 89.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314586 — 2 jours si le salarié a au moins 45 ans ; 3 jours s''il a plus de 55 ans et 20 ans d''ancienneté ; non applicable si un accord d''entreprise prévoit des congés supplémentaires'),
(2, 'Art. 89.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314587'),
(3, 'Art. 90 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314596')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3248', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('5d125de2-6139-58c1-94e9-5ef9654c6de0', 'conges_anciennete', null, 'Congé supplémentaire après 2 ans d''ancienneté', null, null, 24, 1, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('90e2fc52-b5a9-50dd-964e-b365e24dea73', 'conges_supplementaires', null, 'Congé supplémentaire des salariés en forfait annuel (heures ou jours) ou cadres dirigeants', null, null, 12, 1, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('96f7033e-0308-560e-9058-9e56cf234b5f', 'evenement_familial', 'Mariage d''un enfant', 'Mariage d''un enfant', null, null, 0, 1, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('beed8e19-15cf-5e9e-b781-22c2321923fb', 'evenement_familial', 'Naissance', 'Naissance', null, null, 0, 3, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('9f029149-0839-5ddd-b777-504052a42146', 'evenement_familial', 'Adoption', 'Adoption', null, null, 0, 3, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('d0769f09-5cc0-5a44-804b-d976e5e7ee3c', 'evenement_familial', 'Décès d''un enfant de 25 ans et plus sans enfant', 'Décès d''un enfant de 25 ans et plus sans enfant', null, null, 0, 5, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('594599c7-45a5-5a87-b779-d7f358215b4b', 'evenement_familial', 'Deuil d''un enfant de moins de 25 ans ou d''une personne à charge de moins de 25 ans', 'Deuil d''un enfant de moins de 25 ans ou d''une personne à charge de moins de 25 ans', null, null, 0, 8, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('bf2a82f3-e80c-524f-94c1-cea6192cc5a6', 'evenement_familial', 'Décès du conjoint, partenaire de Pacs ou concubin', 'Décès du conjoint, partenaire de Pacs ou concubin', null, null, 0, 3, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('36a17da0-2b82-525b-8c2f-f6fb23512397', 'evenement_familial', 'Décès du père, de la mère, des beaux-parents, d''un frère ou d''une sœur', 'Décès du père, de la mère, des beaux-parents, d''un frère ou d''une sœur', null, null, 0, 3, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('487b74bd-9a7f-561f-81c1-f8d0a6ed4b35', 'evenement_familial', 'Annonce d''un handicap, d''une pathologie chronique ou d''un cancer chez un enfant', 'Annonce d''un handicap, d''une pathologie chronique ou d''un cancer chez un enfant', null, null, 0, 2, 'ouvrables', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('330957f5-1d4d-5958-b321-33d94fe818d6', 'evenement_familial', 'Décès d''un enfant de moins de 25 ans, d''un enfant lui-même parent ou d''une personne à charge de moins de 25 ans', 'Décès d''un enfant de moins de 25 ans, d''un enfant lui-même parent ou d''une personne à charge de moins de 25 ans', null, null, 0, 7, 'ouvres', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('87b233ee-7862-5793-98e6-8bc7ecc5ff68', 'evenement_familial', 'Mariage ou Pacs du salarié (une semaine)', 'Mariage ou Pacs du salarié (une semaine)', null, null, 0, 7, 'calendaires', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('9064f2a8-ada8-515c-bade-65fbd9fe307b', 'evenement_familial', 'Décès du conjoint, partenaire de Pacs ou concubin avec enfant(s) à charge', 'Décès du conjoint, partenaire de Pacs ou concubin avec enfant(s) à charge', null, null, 0, 5, 'calendaires', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('21970f3b-6b1c-57ae-b02a-7fedc9a6d105', 'evenement_familial', 'Décès d''un grand-parent', 'Décès d''un grand-parent', null, null, 0, 1, 'calendaires', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('bb1aaad9-5deb-5643-b2c4-b2571860a64c', 'evenement_familial', 'Décès d''un petit-enfant', 'Décès d''un petit-enfant', null, null, 0, 1, 'calendaires', true, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 91.1.2.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314606 — 100 % puis, le cas échéant, 50 % de la rémunération brute, sous déduction des IJSS et de la prévoyance patronale, sans dépasser le net ; durées par année civile ; dès le 1er jour entièrement non travaillé ; barème de l''article 91.1.2.1 (attribué aux groupes A à E)'),
(2, 'Art. 91.1.2.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314606 — 100 % puis, le cas échéant, 50 % de la rémunération brute, sous déduction des IJSS et de la prévoyance patronale, sans dépasser le net ; durées par année civile ; dès le 1er jour entièrement non travaillé ; AT/MP survenus dans l''entreprise : 3 mois d''ancienneté'),
(3, 'Art. 91.1.2.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314607 — 100 % puis, le cas échéant, 50 % de la rémunération brute, sous déduction des IJSS et de la prévoyance patronale, sans dépasser le net ; durées par année civile ; dès le 1er jour entièrement non travaillé ; barème de l''article 91.1.2.2 (attribué aux groupes F à I)'),
(4, 'Art. 91.1.2.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314607 — 100 % puis, le cas échéant, 50 % de la rémunération brute, sous déduction des IJSS et de la prévoyance patronale, sans dépasser le net ; durées par année civile ; dès le 1er jour entièrement non travaillé ; AT/MP survenus dans l''entreprise : 3 mois d''ancienneté')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3248', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('a052240a-604d-56db-bf69-9ca7d80017d1', 'maladie', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 12, 0, 1, 90, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('1cfb7a9b-df7a-5062-87d3-5b4ea34e6228', 'accident_trajet', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 12, 0, 1, 90, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('1ac1a226-d8ad-530f-a940-f2ec52cdf80f', 'accident_travail', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 3, 0, 1, 90, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('0ee5859b-1684-5bd4-ad58-358fee0db7a4', 'maladie_professionnelle', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 3, 0, 1, 90, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('35a5e427-4017-5a6c-bc1a-fa0f7c5c1a89', 'maladie', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('8afb8c0d-9d25-5e6a-9067-5b6d2c2732e0', 'maladie', array['cadre']::text[], null, 12, 0, 2, 90, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('5a22d96c-b92b-52a5-91f7-f7f0f16b3f19', 'accident_trajet', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('c005a9e0-b65f-57a1-9b59-92c4cd74da58', 'accident_trajet', array['cadre']::text[], null, 12, 0, 2, 90, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('100380f3-230e-5076-9083-762acf09ae8b', 'accident_travail', array['cadre']::text[], null, 3, 0, 1, 90, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('bc468cbd-e90a-5b26-b3d9-696c3add6d99', 'accident_travail', array['cadre']::text[], null, 3, 0, 2, 90, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('0f80b67d-ca21-5e1c-94aa-61603c7fe938', 'maladie_professionnelle', array['cadre']::text[], null, 3, 0, 1, 90, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('d11626c3-4b92-5c11-bb92-a564f0ddfe59', 'maladie_professionnelle', array['cadre']::text[], null, 3, 0, 2, 90, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('ba6217b2-b08a-57e2-b7bf-4c89a6b9c183', 'maladie', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 60, 0, 1, 120, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('22255d3c-f664-5e6e-be49-8e1861e813ad', 'accident_trajet', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 60, 0, 1, 120, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('e113b806-71e8-561b-8fb6-0b8a9c6e4a0c', 'accident_travail', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 60, 0, 1, 120, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('0d475b15-3b6c-56a9-b8e3-ccd970314c78', 'maladie_professionnelle', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 60, 0, 1, 120, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('b7c7f4d1-c2ea-542c-8084-eae57d8966dd', 'maladie', array['cadre']::text[], null, 60, 0, 1, 120, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('07c032e2-6b09-5c55-bd5b-318e07f2267d', 'maladie', array['cadre']::text[], null, 60, 0, 2, 120, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('125956aa-30fe-543b-b57d-1a3988578b22', 'accident_trajet', array['cadre']::text[], null, 60, 0, 1, 120, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('8169fbf8-4be4-530f-b519-0987870f7a1f', 'accident_trajet', array['cadre']::text[], null, 60, 0, 2, 120, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('e1f5176e-fdd5-5d7e-b617-afbf57b3b181', 'accident_travail', array['cadre']::text[], null, 60, 0, 1, 120, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('d982c955-7ab4-50e5-a359-d755fafd802c', 'accident_travail', array['cadre']::text[], null, 60, 0, 2, 120, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('3fa947fd-e21c-5434-a81d-d7da43a2e171', 'maladie_professionnelle', array['cadre']::text[], null, 60, 0, 1, 120, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('23153094-ec51-5085-b51a-f455620b0784', 'maladie_professionnelle', array['cadre']::text[], null, 60, 0, 2, 120, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('bc7c3b84-23bd-5b70-babc-2bf4bfbacb63', 'maladie', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 120, 0, 1, 150, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('cd9162fe-2ae7-5a46-87bb-48583ac69d08', 'accident_trajet', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 120, 0, 1, 150, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('47fb4e4e-9479-513f-8958-fcfcc7a32cdc', 'accident_travail', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 120, 0, 1, 150, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('dcde0e15-2747-5040-8359-ae2da0ccce4f', 'maladie_professionnelle', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 120, 0, 1, 150, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('3d773dc4-27bd-504c-af4e-97e1fa1971c4', 'maladie', array['cadre']::text[], null, 120, 0, 1, 150, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('0663fb49-1741-523d-a8db-460293df984c', 'maladie', array['cadre']::text[], null, 120, 0, 2, 150, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('0fcd870f-6627-50b6-96b2-8dd33bf86e98', 'accident_trajet', array['cadre']::text[], null, 120, 0, 1, 150, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('d84770ce-f7c1-5ccb-a0e2-f880dcdf4c52', 'accident_trajet', array['cadre']::text[], null, 120, 0, 2, 150, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('21d80032-c674-531d-8fb2-e00f387fc8bd', 'accident_travail', array['cadre']::text[], null, 120, 0, 1, 150, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('d06f84fe-2eb9-55f3-9553-46311d9e5b3a', 'accident_travail', array['cadre']::text[], null, 120, 0, 2, 150, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('b69f1923-69e7-5d84-b827-bdbb456fce22', 'maladie_professionnelle', array['cadre']::text[], null, 120, 0, 1, 150, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('cc6c7100-cedc-53eb-8ab0-8bd7bf7a13be', 'maladie_professionnelle', array['cadre']::text[], null, 120, 0, 2, 150, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('5409f45d-7845-550e-ab34-f4795bc1647d', 'maladie', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 180, 0, 1, 180, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('7c66de23-8f02-5d3b-9174-9527b1bd60b0', 'accident_trajet', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 180, 0, 1, 180, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('25853b44-8a26-55c6-b906-35788187e44a', 'accident_travail', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 180, 0, 1, 180, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('9a0da06e-ec99-5816-8766-b106a1f45026', 'maladie_professionnelle', array['ouvrier','employe','technicien','agent_maitrise']::text[], null, 180, 0, 1, 180, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('fc00cdec-8090-53cc-b07d-b6d31e66d62e', 'maladie', array['cadre']::text[], null, 180, 0, 1, 180, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('a2906303-2432-53ae-b43f-4e53bec0fddf', 'maladie', array['cadre']::text[], null, 180, 0, 2, 180, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('c84ed69f-f257-5cab-a0d6-c8eff9d1df18', 'accident_trajet', array['cadre']::text[], null, 180, 0, 1, 180, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('3c4afd9f-4ae0-59cc-b494-2e3e74e6be44', 'accident_trajet', array['cadre']::text[], null, 180, 0, 2, 180, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('6f2bc90e-4685-5660-8111-11cc30564468', 'accident_travail', array['cadre']::text[], null, 180, 0, 1, 180, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('56c922f7-034f-5772-add6-ec8b9d098a4d', 'accident_travail', array['cadre']::text[], null, 180, 0, 2, 180, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('854ddde3-6df4-5a47-9077-05a82a64f0b1', 'maladie_professionnelle', array['cadre']::text[], null, 180, 0, 1, 180, 100, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4),
('c4627bb4-0dab-5f3d-962f-79c83f0e1f44', 'maladie_professionnelle', array['cadre']::text[], null, 180, 0, 2, 180, 50, 'brut', true, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 140 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314838'),
(2, 'Art. 144 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314842'),
(3, 'Art. 142-143 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314840'),
(4, 'Art. 141 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000046314839')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '3248', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('ec100937-cbd5-5bd1-aa83-9745bfa32cad', 'assiette_minimum', 'Éléments pris en compte pour vérifier le salaire minimum hiérarchique', null, null, null, null, 'Tous les éléments bruts soumis à cotisations (y compris avantages en nature), sauf : prime d''ancienneté et son complément, majorations pour travaux pénibles, contreparties d''organisations particulières non liées au travail, primes exceptionnelles, rémunération d''invention, épargne salariale, remboursements de frais', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 1),
('d90b5ff0-8e3e-511e-bb16-bf3c36fefc9a', 'equipes_successives', 'Prime de travail en équipes successives', null, null, 30, 'minutes_smh_par_poste', 'Rémunération de 30 minutes sur la base du salaire minimum hiérarchique par poste, sauf arrêt de plus d''une heure', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 2),
('4b466808-9837-54f7-8c89-1d5f56c848ff', 'mention_bulletin', 'Prime d''ancienneté et son complément sur des lignes distinctes du bulletin', null, null, null, null, null, '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 3),
('9ad92896-62da-5226-8587-c717cc387328', 'periode_transitoire_smh', 'Report possible du barème unique jusqu''en 2030 (entreprises ≤ 150 salariés)', null, null, null, null, 'Entreprises dont la masse salariale aurait augmenté de plus de 5 % pour au moins 25 % de l''effectif : minima propres, attestés par l''expert-comptable', '6e534d64-b89f-5820-9de5-f29975e278cb', '2024-01-01', null, 4)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
