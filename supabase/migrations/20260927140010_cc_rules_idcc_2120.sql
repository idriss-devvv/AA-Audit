-- Critères de vérification de la convention collective IDCC 2120, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 2120 — Banque (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2120', 'texte_base', 'Convention collective nationale de la banque du 10 janvier 2000', 'KALITEXT000005678018', '2000-01-10'::date, '2004-12-11'::date, '2004-12-11'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005678018', null, '2026-09-27'),
('c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2120', 'avenant_salaires', 'Accord du 16 avril 2026 relatif aux salaires', 'KALITEXT000054802084', '2026-04-16'::date, '2026-06-27'::date, '2026-04-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054802084', null, '2026-09-27');

with n(k, t) as (values
(1, 'Art. 33 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005791600')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2120', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('d95cfa3e-942a-5b13-a59b-7eb1cfbc070d', 'A', 'Techniciens des métiers de la banque, niveau A', 'technicien', 'A', null, null, array['Niveau A']::text[], 0, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('d2d2694d-5c50-5061-ab6a-ce761a440182', 'B', 'Techniciens des métiers de la banque, niveau B', 'technicien', 'B', null, null, array['Niveau B']::text[], 1, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('ed5ed6da-4cc2-56ba-9870-04586b0018d9', 'C', 'Techniciens des métiers de la banque, niveau C', 'technicien', 'C', null, null, array['Niveau C']::text[], 2, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('85098cd1-e049-5dc3-b30b-50dc0e7f2470', 'D', 'Techniciens des métiers de la banque, niveau D', 'technicien', 'D', null, null, array['Niveau D']::text[], 3, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('76fc00ea-61a1-554d-bcd4-df71e5950785', 'E', 'Techniciens des métiers de la banque, niveau E', 'technicien', 'E', null, null, array['Niveau E']::text[], 4, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('c6a6db43-4440-5446-812e-33bc7a0aab0c', 'F', 'Techniciens des métiers de la banque, niveau F', 'technicien', 'F', null, null, array['Niveau F']::text[], 5, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('b0cdf351-f462-5e2a-9708-94b16dab69e5', 'G', 'Techniciens des métiers de la banque, niveau G', 'technicien', 'G', null, null, array['Niveau G']::text[], 6, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('4129afb8-ca31-514d-918a-4f1f0d791a67', 'H', 'Cadres, niveau H', 'cadre', 'H', null, null, array['Niveau H']::text[], 7, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('432be05e-72fe-54fd-b869-e097324e0500', 'I', 'Cadres, niveau I', 'cadre', 'I', null, null, array['Niveau I']::text[], 8, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('39d96b4b-4148-54d1-b0ec-b097171c1ca5', 'J', 'Cadres, niveau J', 'cadre', 'J', null, null, array['Niveau J']::text[], 9, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('cdb21b5d-a309-5434-9bc4-81c96479df01', 'K', 'Cadres, niveau K', 'cadre', 'K', null, null, array['Niveau K']::text[], 10, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. annexe VI/VII — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054802100 — Salaire de base annuel (13 mensualités, hors primes et éléments variables) à comparer, pour la durée légale du travail')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2120', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('eed4a422-ee60-5f58-9561-823f9415c21c', 'A', 23387, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('9f7c1c87-10c7-53d4-9bc2-e2ba0b5959b1', 'A', 23387, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('03455b9f-75e5-531f-98fc-23a5b4f9e86d', 'A', 23387, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('e73dbdf1-bc83-512a-930f-5f3b7f6e6715', 'A', 23387, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('7ec7743c-af91-57fb-a254-a52f7b0c38d5', 'A', 23387, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('38bcc083-3957-59f3-9914-d044995fc120', 'B', 23387, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('7e46de44-8104-50f1-ab39-d92d6566f1e3', 'B', 23387, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('776bf081-ccea-500b-b897-21be97c9d74c', 'B', 23387, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('d56d2c42-c6a3-5b63-ac5b-e0198512e85f', 'B', 23387, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('e656769f-e3f8-585a-94fc-95ba7643b4e9', 'B', 23649, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('28244e54-2f78-5311-bcc4-59ded8cf9fad', 'C', 23387, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('7d6f916e-4fff-54e7-91b9-62f336b2945e', 'C', 23387, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('dec736ed-e788-5dd8-b209-588938ba4130', 'C', 23387, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('86fc8095-4ab8-5169-a5e6-cb0a62b6a77f', 'C', 23456, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('0e6db674-ce97-5870-b3b2-249ce382af06', 'C', 24100, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('319e1196-0310-5ea0-a7f6-9e5f9410c634', 'D', 23387, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('77ad40ed-19b1-586f-9973-a450a693b2d2', 'D', 23768, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('2d52e893-79bb-58cf-8ad6-77823e1356a9', 'D', 24424, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('f5b03499-921a-5128-85e1-d9c16bc748f1', 'D', 25090, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('c8298f25-fb92-5970-ab35-3c2af3091942', 'D', 25788, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('df49d911-280a-5f35-b6a1-4cea7e3cf5cc', 'E', 24240, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('74d428a6-c6bc-5f10-bae3-4d1104bd7a40', 'E', 24800, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('db5a8da5-eb97-599c-9586-81895e0a9ba1', 'E', 25487, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('dc348786-9b87-5206-89c1-8c8afffd9789', 'E', 26196, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('f58b59fc-991d-5ac6-84a5-c99edef6e8f1', 'E', 26928, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('824b2f06-f8e8-5a7e-9ed1-cac202935018', 'F', 26272, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('437b09ea-65c8-5367-93a0-576e15eb97e5', 'F', 26874, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('38ff36df-dc37-5089-90f2-02176ad2c162', 'F', 27626, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('4f052ef7-d357-5ee8-a647-679e99c82c6b', 'F', 28401, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('ae680bc5-bda6-5864-bc0a-3e27db9f886c', 'F', 29216, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('0e11c0c0-6a29-5954-95e6-f6d080994d57', 'G', 28929, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('706fb409-873b-55b8-9769-9cbd1a360b5f', 'G', 29624, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('838c25b9-d257-5262-8b2b-cf160b03bd4b', 'G', 30478, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('d0e7d479-58be-5c2c-9b60-64202383c955', 'G', 31364, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('a96469dc-624f-5c22-80ea-9412cb0f49d2', 'G', 32270, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('9fbb8596-84de-5b0d-9fc3-5b33666f99f6', 'H', 31801, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('8edd3035-8325-5ac7-b341-1d189486afb6', 'H', 32560, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('225d68d1-a2f9-5906-bc00-0b2014eb9f21', 'H', 33532, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('548c14f4-8689-5753-b440-5bf0ded11c60', 'H', 34518, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('b87ad295-f235-5e6e-8fcc-6caa65bc8c22', 'H', 35541, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('d6d2401f-d5fd-54ff-a405-948ba3d0ce95', 'I', 38734, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('af5705a4-e474-522b-9b17-5cdda8809db8', 'I', 39690, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('830c67e6-da05-5327-ae35-6247f7bba38e', 'I', 40868, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('8ca9a593-130b-5fac-84f1-9a75ab511477', 'I', 42088, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('ce486fd6-07d6-5d1d-8951-f0f6c57eeebb', 'I', 43352, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('f806740a-3791-5101-bdea-af9655860a65', 'J', 46764, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('570576a9-508e-5934-9c5f-0ac684d76a2d', 'J', 47923, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('ed1736a8-b3ef-52c0-b990-48f800b6ba5b', 'J', 49363, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('afc7a69a-63ff-56a4-9377-65b36ac66f50', 'J', 50852, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('64634f58-ed7a-576c-989e-9f8e4da7df3a', 'J', 52378, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('683bd859-11c4-5752-b132-2d64d95cec58', 'K', 55641, 'annuel', 13, null, 'standard', 'hors ancienneté', 0, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('52350d6c-8f4a-5547-87cc-2a9842558abd', 'K', 57038, 'annuel', 13, null, 'standard', 'palier 5 ans d''ancienneté dans l''entreprise', 60, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('594f6014-c60d-5206-8265-470defb75ada', 'K', 58739, 'annuel', 13, null, 'standard', 'palier 10 ans d''ancienneté dans l''entreprise', 120, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('d674eb8d-c885-5a4f-bf6a-bd806c8d70e5', 'K', 60508, 'annuel', 13, null, 'standard', 'palier 15 ans d''ancienneté dans l''entreprise', 180, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1),
('5c21702b-83ad-5472-9078-f360f91f9f28', 'K', 62323, 'annuel', 13, null, 'standard', 'palier 20 ans d''ancienneté dans l''entreprise', 240, 'salaire_base', 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 1)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 39 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005801232 — Le salaire de base annuel est versé en 13 mensualités égales')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2120', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('5a6f6de4-f2d4-5e7e-b2ad-add4917a262a', 'treizieme_mois', 'Treizième mensualité du salaire de base annuel', null, null, 100, null, 'salaire_base', array[12]::int[], 0, null, 'Calculée pro rata temporis ; versée avec le salaire de décembre sauf disposition d''entreprise', true, null, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1)
) as v(id, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 61-62 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005830016 — Heures supplémentaires selon les dispositions légales (contingent légal)')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2120', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('bce4335c-4466-5c30-8b8b-d57ddd56c136', null, null, 'standard', 35, 151.67, null, null, null, null, null, null, null, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 62 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005830016 — Taux légaux (art. L. 3121-36 C. trav.) auxquels la convention renvoie'),
(2, 'Art. 68 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005830771 — Indemnisation du temps travaillé (bonifications et majorations légales incluses) augmentée de 30 %, convertible en repos')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2120', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('24f13d34-12ad-5091-8b1b-09a70d803208', 'heures_supplementaires', 'Heures supplémentaires de la 36e à la 43e heure', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement_ou_repos', null, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('a49c529b-73b3-5aa6-b8be-b5c664d27420', 'heures_supplementaires', 'Heures supplémentaires au-delà de la 43e heure', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement_ou_repos', null, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('e0503f06-45fe-59ff-bded-6b3bbb1c1053', 'jour_ferie', 'Travail un jour férié à la demande de l''employeur : rémunération au taux des heures supplémentaires majorée de 30 %', null, null, null, null, null, null, null, 30, null, null, 'paiement_ou_repos', null, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 44 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005807362')
)
insert into public.cc_allowances (id, idcc_code, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2120', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.zone::text, v.amount::numeric, v.unit::text, v.minimum_garanti_percent::numeric, v.conditions::text, v.social_exemption_limit::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('1d2b1739-13cd-5662-90a7-9c4424884c42', 'transport', 'Prime de transport — région parisienne (hors transports en commun) et agglomérations de Lyon, Marseille, Aix, Lille, Bordeaux, Toulouse', null, null, 'Île-de-France et 6 grandes agglomérations', 4.57, 'par_mois', null, '30 F par mois dans le texte (converti)', null, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('fb7aff82-2833-5377-b5a8-8b9a0bdb0296', 'transport', 'Prime de transport — autres agglomérations de plus de 100 000 habitants (annexe IX)', null, null, 'Agglomérations > 100 000 habitants', 3.51, 'par_mois', null, '23 F par mois dans le texte (converti)', null, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1)
) as v(id, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 64 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005830302 — Congé annuel de 25 jours ouvrés plus un 26e jour pour une période de référence complète'),
(2, 'Art. 59.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005825792'),
(3, 'Art. 60 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005826876')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2120', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('df4a9d29-4c7d-577c-9a38-307386f2b7d9', 'conges_supplementaires', null, '26e jour de congé payé (congé annuel de 25 jours ouvrés + 1)', null, null, 12, 1, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('b6236076-e79c-5c43-b45e-e2b0fd5bc8a4', 'evenement_familial', 'Mariage ou Pacs du salarié', 'Mariage ou Pacs du salarié', null, null, 0, 5, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('c8828b13-0b76-5bd5-a91e-c726e0a05a4f', 'evenement_familial', 'Mariage des descendants', 'Mariage des descendants', null, null, 0, 2, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('3fc8e043-d3b7-5138-9201-d8ea53fb5229', 'evenement_familial', 'Naissance ou adoption', 'Naissance ou adoption', null, null, 0, 3, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('e9a6fd82-3651-53d2-9dd7-3c8da5f40c63', 'evenement_familial', 'Décès du conjoint ou partenaire de Pacs', 'Décès du conjoint ou partenaire de Pacs', null, null, 0, 5, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('d61b01c0-f0d0-5bae-be21-48450425c299', 'evenement_familial', 'Décès des père et mère (du salarié ou du conjoint)', 'Décès des père et mère (du salarié ou du conjoint)', null, null, 0, 3, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('2b985672-db33-584b-bceb-8ac48f6369e3', 'evenement_familial', 'Décès des enfants (du salarié ou du conjoint)', 'Décès des enfants (du salarié ou du conjoint)', null, null, 0, 5, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('500e7716-0406-5472-b093-6d2f1fe7bbb3', 'evenement_familial', 'Décès d''un frère ou d''une sœur (du salarié ou du conjoint)', 'Décès d''un frère ou d''une sœur (du salarié ou du conjoint)', null, null, 0, 3, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('a3d6f6dd-35bd-5448-a2d9-bde904e5695f', 'evenement_familial', 'Décès des autres descendants et ascendants', 'Décès des autres descendants et ascendants', null, null, 0, 2, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('04b521a9-0beb-577a-b896-b0f33dd2098d', 'evenement_familial', 'Déménagement (une fois par an)', 'Déménagement (une fois par an)', null, null, 0, 2, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('f186fa98-b85c-5f43-85c6-eea4cdf3db1c', 'evenement_familial', 'Annonce d''un handicap chez un enfant', 'Annonce d''un handicap chez un enfant', null, null, 0, 2, 'ouvres', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('cc9ef478-d303-5814-be77-31b012d75233', 'enfant_malade', 'Enfant malade de moins de 14 ans', 'Soins à un enfant de moins de 14 ans (3 jours par an, 6 pour 2 enfants, 9 pour 3 enfants et plus)', null, null, 0, 3, 'ouvrables', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 3),
('23875e36-a58a-50ea-bd44-93523e116310', 'enfant_malade', 'Hospitalisation d''un enfant de moins de 14 ans', 'Hospitalisation d''un enfant de moins de 14 ans (par année civile)', null, null, 0, 2, 'ouvrables', true, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 3)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 54 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005820272 — % du salaire mensuel de base (1/13e du salaire annuel), sous déduction des IJSS ; sans dépasser le salaire net ; durées sur 12 mois glissants. Maladie : dès le 1er jour pour les 2 premiers arrêts, puis à partir du 4e jour'),
(2, 'Art. 54 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005820272 — % du salaire mensuel de base (1/13e du salaire annuel), sous déduction des IJSS ; sans dépasser le salaire net ; durées sur 12 mois glissants. Dès le 1er jour'),
(3, 'Art. 59.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005825792 — Complément des IJSS jusqu''au maintien du salaire, dans la limite du plafond de la sécurité sociale ; 11 jours en cas de naissances multiples')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2120', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('bde9425b-5139-5283-9bef-af85dff631dc', 'maladie', null, null, 12, 0, 1, 60, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('2bc7552f-2a5a-5f06-9cd6-fb35feec7180', 'maladie', null, null, 12, 0, 2, 60, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('fdf24341-77f6-535e-ae14-128d1f946e4b', 'accident_travail', null, null, 12, 0, 1, 60, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('84afd794-803d-558c-b0a1-aeef2788fc9b', 'accident_travail', null, null, 12, 0, 2, 60, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('7c2fc765-d5c9-54fa-8ab4-20f08af0ee29', 'maladie_professionnelle', null, null, 12, 0, 1, 60, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('a289b358-b44d-5345-8e10-53af3900c30a', 'maladie_professionnelle', null, null, 12, 0, 2, 60, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('95db5e30-7876-57d1-a2ba-34e86b20f518', 'accident_trajet', null, null, 12, 0, 1, 60, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('80c4c604-20f3-5439-b4ae-09483b3fd37f', 'accident_trajet', null, null, 12, 0, 2, 60, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('ed4df614-cd93-541b-aa8e-a5451e6ae5e2', 'maladie', null, null, 60, 0, 1, 90, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('e9646774-91a4-54f6-9e6c-4721a0798780', 'maladie', null, null, 60, 0, 2, 90, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('9e7d4722-7e00-5e42-9940-682e4be32ebc', 'accident_travail', null, null, 60, 0, 1, 90, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('8dffa28e-4e31-551e-80cf-299218bb2be7', 'accident_travail', null, null, 60, 0, 2, 90, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('4d2357af-2451-5392-8290-4cf9834ac643', 'maladie_professionnelle', null, null, 60, 0, 1, 90, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('f8f3025a-a82a-5149-80d4-ac29a5f99230', 'maladie_professionnelle', null, null, 60, 0, 2, 90, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('a1acaf29-de89-5fdb-83cc-cd2dd28c1581', 'accident_trajet', null, null, 60, 0, 1, 90, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('9bff11b0-8457-5deb-b3ef-593142d16067', 'accident_trajet', null, null, 60, 0, 2, 90, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('c99e092a-e54d-52f9-b225-3ab6ff8f1c97', 'maladie', null, null, 120, 0, 1, 120, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('7cbb3147-99ca-52a0-ac2e-090fc3c8b4bf', 'maladie', null, null, 120, 0, 2, 120, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('59df6065-6e3e-54dd-a1ec-a66640a577fe', 'accident_travail', null, null, 120, 0, 1, 120, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('ba7bb191-aeec-5bf5-8447-0b768a89b1f3', 'accident_travail', null, null, 120, 0, 2, 120, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('8b310673-22dd-5e6b-bc13-48dd3f8cc62e', 'maladie_professionnelle', null, null, 120, 0, 1, 120, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('5ae56cf6-d14b-52a9-a165-cb89ac7da25d', 'maladie_professionnelle', null, null, 120, 0, 2, 120, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('8b396ebd-b1ff-5873-a4f6-f7bb4dceff40', 'accident_trajet', null, null, 120, 0, 1, 120, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('8aa35590-10a7-539e-9cda-006671655d2a', 'accident_trajet', null, null, 120, 0, 2, 120, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('ff69526d-06fa-53b3-a540-7fbe0be0f419', 'maladie', null, null, 180, 0, 1, 150, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('93092f3e-cc61-56bf-b0d1-f93ac0200171', 'maladie', null, null, 180, 0, 2, 150, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('e4ff8915-6af4-50c2-8db6-0e644e6ceb05', 'accident_travail', null, null, 180, 0, 1, 150, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('be70058f-4d64-5edd-985f-a578cf8d140b', 'accident_travail', null, null, 180, 0, 2, 150, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('13ee076a-2b11-5786-bd6e-1a6901d0cb08', 'maladie_professionnelle', null, null, 180, 0, 1, 150, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('0698cdd3-0b92-590c-906f-69cdd779afd4', 'maladie_professionnelle', null, null, 180, 0, 2, 150, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('4c24db7c-5667-576b-9529-d17fab7f749e', 'accident_trajet', null, null, 180, 0, 1, 150, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('b87f32ec-f4dd-5cbe-9493-063e9d25af10', 'accident_trajet', null, null, 180, 0, 2, 150, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('4a21cacd-041a-567e-ada6-f72a8e205094', 'maladie', null, null, 240, 0, 1, 180, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('06e29ecf-9ac2-5055-b17e-b54d4260e0c8', 'maladie', null, null, 240, 0, 2, 180, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('e8732949-67d1-529c-b6a4-0f53a6f5357e', 'accident_travail', null, null, 240, 0, 1, 180, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('ac23d130-58bf-56ce-95fe-41f97fdb0471', 'accident_travail', null, null, 240, 0, 2, 180, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('f2c028fd-e5bf-56ae-b0d5-388e323ed240', 'maladie_professionnelle', null, null, 240, 0, 1, 180, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('a5fea25e-3a15-51c0-be4f-11b1f727e890', 'maladie_professionnelle', null, null, 240, 0, 2, 180, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('7d31906f-2ad8-5c62-a1a8-4e475ccb96d5', 'accident_trajet', null, null, 240, 0, 1, 180, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('8355b815-7015-5ccf-972b-36afc02358be', 'accident_trajet', null, null, 240, 0, 2, 180, 50, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 2),
('89c79b97-648d-577d-a67c-a7f5abb359d6', 'paternite', null, null, 0, 0, 1, 5, 100, 'brut', true, 12, '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 3)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 54.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005820272'),
(2, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054802089'),
(3, 'Art. 41 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005803418')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2120', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('215c04ba-f53b-50f5-a105-526510e2d518', 'maladie_enfant_a_charge', 'Durée à demi-salaire portée à 5, 6 ou 8 mois avec au moins un enfant à charge', null, null, null, null, 'Avec au moins un enfant à charge fiscal : 5 mois (1 à 5 ans), 6 mois (5 à 10 ans), 8 mois (au-delà de 10 ans) à 50 %', '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2004-12-11', null, 1),
('427bbe52-497f-5cdb-bb82-af569a4c8e4b', 'plancher_cadres_50_ans', 'Salaire annuel plancher des cadres de plus de 50 ans', array['cadre']::text[], null, 36500, 'euros_par_an', null, 'c2cf1ad1-92e1-5f9c-90d4-455713d851bd', '2026-04-01', null, 2),
('7048ad4b-bcfd-554c-b755-fbfcb3d8b8e7', 'garantie_salariale_individuelle', 'Garantie salariale individuelle (GSI) sur 5 ans', null, null, 3.3, 'pourcent', 'Évolution de rémunération inférieure à 5 % du minimum sur 5 ans (seuil 35 000 € ; grille de référence annexe VIII) : garantie d''évolution de 3,3 % du minimum pour les exercices 2023 à 2027', '6ab56e94-1fdf-5bba-8b29-44f9da87da33', '2023-01-01', null, 3)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
