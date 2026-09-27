-- Critères de vérification de la convention collective IDCC 2216, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 2216 — Commerce de détail et de gros à prédominance alimentaire (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2216', 'texte_base', 'Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001', 'KALITEXT000005640939', '2001-07-12'::date, null::date, null::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005640939', 'Articles consolidés (versions en vigueur) ; début de validité retenu : 1er décembre 2019', '2026-09-27'),
('669ff401-d1ff-5e63-9d57-4684d35efb8f', '2216', 'annexe', 'Annexe I : employés et ouvriers, personnel de livraison (réécrite par avenant n° 74)', 'KALITEXT000005642626', null::date, '2021-06-04'::date, '2021-07-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005642626', null, '2026-09-27'),
('f0a4e263-1894-5952-bce5-018a22f6f167', '2216', 'annexe', 'Annexe II : agents de maîtrise et techniciens (réécrite par avenant n° 74)', 'KALITEXT000005642662', null::date, '2021-06-04'::date, '2021-07-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005642662', null, '2026-09-27'),
('08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2216', 'annexe', 'Annexe III : cadres (réécrite par avenant n° 74)', 'KALITEXT000005642692', null::date, '2021-06-04'::date, '2021-07-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005642692', null, '2026-09-27'),
('14f4e6b3-deb2-521e-9297-777212d34f04', '2216', 'avenant_salaires', 'Avenant n° 95 du 4 avril 2025 relatif aux salaires minima conventionnels', 'KALITEXT000051947555', '2025-04-04'::date, '2025-07-03'::date, '2025-08-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000051947555', null, '2026-09-27'),
('6aec13e2-d6f4-59d5-b56f-7713803bd499', '2216', 'avenant_salaires', 'Avenant n° 99 du 17 avril 2026 relatif aux salaires minima conventionnels', 'KALITEXT000054434579', '2026-04-17'::date, '2026-07-10'::date, '2026-08-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054434579', null, '2026-09-27');

with n(k, t) as (values
(1, 'https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039111094 — Classification du titre IV ; niveau 9 hors grille')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2216', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('563409a6-5c10-515d-8614-cc42e53a817c', '1A', 'Niveau 1 A (période d''accueil)', 'employe', '1', 'A', null, array['Niveau 1A','Niv 1A']::text[], 0, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('da996749-ff0c-5829-a436-1dedd6fa7a87', '1B', 'Niveau 1 B (après période d''accueil)', 'employe', '1', 'B', null, array['Niveau 1B','Niv 1B']::text[], 1, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('b79aaf27-dfdf-512f-8419-11be7e856cca', '2A', 'Niveau 2 A (période d''accueil)', 'employe', '2', 'A', null, array['Niveau 2A','Niv 2A']::text[], 2, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('fc7ae3b1-40be-54cc-9513-26b2998d065b', '2B', 'Niveau 2 B (après période d''accueil)', 'employe', '2', 'B', null, array['Niveau 2B','Niv 2B']::text[], 3, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('df615bb7-0b1d-526e-b417-caa51c9ee4c0', '3A', 'Niveau 3 A (période d''accueil)', 'employe', '3', 'A', null, array['Niveau 3A','Niv 3A']::text[], 4, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('bbfe8d7a-cb1d-5a13-8b32-07cef9453362', '3B', 'Niveau 3 B (après période d''accueil)', 'employe', '3', 'B', null, array['Niveau 3B','Niv 3B']::text[], 5, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('f75ce4fd-65cd-59a7-9338-53c62423d8ad', '4A', 'Niveau 4 A (période d''accueil)', 'employe', '4', 'A', null, array['Niveau 4A','Niv 4A']::text[], 6, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('a7b2f6dc-adb8-524c-ab25-ec3689f7b02d', '4B', 'Niveau 4 B (après période d''accueil)', 'employe', '4', 'B', null, array['Niveau 4B','Niv 4B']::text[], 7, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('693f4a62-45b6-535e-a947-0d5df7e0b980', '5', 'Niveau 5', 'agent_maitrise', '5', null, null, array['Niveau 5','Niv 5']::text[], 8, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('205c01f2-5ce8-5d69-bfb7-79edec1e1cf2', '6', 'Niveau 6', 'agent_maitrise', '6', null, null, array['Niveau 6','Niv 6']::text[], 9, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('658398e7-0b39-5f62-a2c9-899f2cbca056', '7', 'Niveau 7', 'cadre', '7', null, null, array['Niveau 7','Niv 7']::text[], 10, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('e39ddd55-2b6c-58d6-bd83-6c6d180da645', '8', 'Niveau 8', 'cadre', '8', null, null, array['Niveau 8','Niv 8']::text[], 11, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000051947563 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %)'),
(2, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000051947563 — Montant annuel à comparer au salaire réel brut des 12 mois suivant l''entrée en vigueur, pour un salarié bénéficiant de la prime annuelle'),
(3, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 12.02 €'),
(4, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Montant annuel à comparer au salaire réel brut des 12 mois suivant l''entrée en vigueur, pour un salarié bénéficiant de la prime annuelle'),
(5, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 12.03 €'),
(6, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 12.04 €'),
(7, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 12.13 €'),
(8, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 12.14 €'),
(9, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 12.25 €'),
(10, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 12.27 €'),
(11, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 12.9 €'),
(12, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 13.608 €'),
(13, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 14.384 €'),
(14, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 18.672 €'),
(15, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434587 — Seul montant mensuel à comparer au salaire réel brut, pour 35 heures effectives (inclut la rémunération des pauses de 5 %) ; taux horaire de base 25.096 €'),
(16, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434588 — Salaire minimum annuel garanti pour 216 jours, tous éléments de salaire inclus'),
(17, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054434588 — Ancienneté appréciée dans le niveau en forfait jours')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2216', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('9c656c44-8397-5a56-b600-d5ce2ba7dae7', '1A', 1893.48, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('628bb305-0af7-546f-ba18-234707ced749', '1A', 24615, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('14a07e3f-6564-5330-b9ba-b9cc4473f283', '1B', 1895.08, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('3f185667-d9fe-52e6-88b3-ca603a452b9b', '1B', 24636, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('01fab5c8-c1a9-588f-b207-fa87e52fb4eb', '2A', 1896.67, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('e2351bc7-6ff2-51da-9119-efbb73afaf90', '2A', 24657, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('44a95309-d78d-59c8-b8c1-017edcb6f4ad', '2B', 1911.0, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('fcf0217a-33c0-5306-ad26-ced64437d03c', '2B', 24843, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('98b102b9-1c4e-5ae8-bab4-b975231671b1', '3A', 1912.59, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('48f29a23-b304-53f0-8eca-81b4e34919ba', '3A', 24864, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('c8abe922-2354-59fc-b548-773b6d249393', '3B', 1930.11, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('5b393913-2001-5b60-814b-83c218cf50bd', '3B', 25091, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('4572cb1a-98b5-5303-9863-c69886689dcb', '4A', 1933.3, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('f8a994e7-e36b-560b-ad39-f59fd61a4017', '4A', 25133, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('19fc2a2b-d9a7-5f5e-85ea-70df9c029cab', '4B', 2032.03, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('d87be293-02f5-5cc1-a9c6-3532c70d09f9', '4B', 26416, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('882f9188-13ce-5a8c-ad46-70f3262c97e1', '5', 2143.66, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('747ef912-50df-5c55-9d9c-51854e5c7768', '5', 27868, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('8a0362ea-f29c-5498-9382-5d3551007984', '6', 2265.97, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('c2ea2cf0-da1f-58c6-8137-37b68c6b77e7', '6', 29458, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('2ad88d0c-2c6e-50a3-b02f-9b33228e46e8', '7', 2941.51, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('066625ce-ce2b-58e3-8c83-211e8cc6273e', '7', 38240, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('8abf9419-21af-5fd8-8a10-907fb351683b', '8', 3953.38, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 1),
('9041d7f9-1776-5122-9612-c4810554180f', '8', 51394, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '14f4e6b3-deb2-521e-9297-777212d34f04', '2025-08-01', '2026-08-01', 2),
('ecd143b2-9e30-5057-9e65-284a899e6326', '1A', 1914.19, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 3),
('45304c67-e09a-5c3a-8d24-2afff9c54f23', '1A', 24884, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('39df44a2-fe0a-5114-a206-729c3f784188', '1B', 1915.78, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 5),
('0fc1ec25-24ac-5e5c-9060-d2e35eb1f0a0', '1B', 24905, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('e8bda2cc-df4d-569c-b321-0c2e2c2e3775', '2A', 1917.37, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 6),
('9543bb2b-72f4-5d9b-b06b-29733aefdbb9', '2A', 24926, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('952bb7d6-702e-5aa6-8d0b-7aac01f3a1b1', '2B', 1931.7, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 7),
('952069fa-a0f6-5f03-9ac1-ab9c035e9b89', '2B', 25112, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('4a23aaf8-127e-51b0-8d4b-4dc62bc7d434', '3A', 1933.3, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 8),
('5279e4a7-988e-58cb-b3ba-b194760aeee1', '3A', 25133, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('71d69153-9d4c-54bc-b9f3-b735efe43304', '3B', 1950.81, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 9),
('07f6096c-c061-586b-b266-93ac795f06e4', '3B', 25361, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('cce1f1fe-8f1f-5da5-9dee-ca00589cef17', '4A', 1954.0, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 10),
('dbe6c185-f335-5992-a4ab-f1588ba2a9ed', '4A', 25402, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('254138e2-8a92-5ca7-89a9-0d3919bb6ade', '4B', 2054.33, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 11),
('52877b76-da23-5132-9bda-ac9a0682d429', '4B', 26706, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('c31d47aa-858d-5caa-88eb-cf976f8e3115', '5', 2167.03, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 12),
('bbd29fe9-ce7f-523b-9b37-cadb8e322fad', '5', 28171, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('b7dffffb-f57b-5d0d-a730-0299651bdbda', '6', 2290.67, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 13),
('9921b001-28e1-595a-b992-3db581a7d0cf', '6', 29779, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('1d062f87-71fc-5857-916e-b05dfd860488', '7', 2973.57, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 14),
('b230001f-bf77-5e3e-8491-f0572cc1cc3d', '7', 38656, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('9857d6f8-9cc1-583f-969c-8fd74569d599', '8', 3996.47, 'mensuel', null, 151.67, 'standard', 'mensuel garanti (pauses payées incluses)', 0, 'salaire_brut', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 15),
('e70e09e3-abc1-561b-9830-83e185bf5337', '8', 51954, 'annuel', 12, null, 'standard', 'annuel garanti 12 mois (avec prime annuelle art. 3.6)', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 4),
('66ca7b14-f077-5c25-ade0-4a1525a2129d', '7', 40230, 'annuel', 12, null, 'forfait_jours', 'forfait 216 jours — 36 premiers mois dans le niveau', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 16),
('a2ec7a65-32b6-55b3-b435-13746f20f5f5', '7', 41790, 'annuel', 12, null, 'forfait_jours', 'forfait 216 jours — après 36 mois dans le niveau', 36, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 17),
('b98054dd-b995-5714-be5e-72a5b93ed8d1', '8', 54100, 'annuel', 12, null, 'forfait_jours', 'forfait 216 jours — 36 premiers mois dans le niveau', 0, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 16),
('294125b0-1def-5da6-a84e-6687d7477658', '8', 56170, 'annuel', 12, null, 'forfait_jours', 'forfait 216 jours — après 36 mois dans le niveau', 36, 'remuneration_annuelle', '6aec13e2-d6f4-59d5-b56f-7713803bd499', '2026-08-01', null, 17)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 3.6 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039111170')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2216', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('f6d86dfb-72d5-5308-960d-627211f3e2b2', 'prime_annuelle', 'Prime annuelle : 100 % du salaire mensuel de base de novembre', null, null, 100, null, 'salaire_base', null, 12, 'Contrat en vigueur (ou suspendu depuis moins d''un an) au moment du versement ; 6 mois d''ancienneté en cas d''ouverture d''établissement en cours d''année', 'Absences non listées à l''art. 3.6.3 : 1/12 du salaire brut de base des 12 derniers mois ; départ en retraite, décès, licenciement économique : prorata. Les primes de même nature (13e mois, fin d''année…) s''imputent et doivent être complétées si inférieures', true, null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1)
) as v(id, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 5.8.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039114659'),
(2, 'Art. 5.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039114584 — 229 jours maximum en cas de renonciation à des jours de repos, rémunérés avec une majoration d''au moins 15 % ; 6 jours fériés chômés en plus du 1er mai')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2216', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('ff1b368a-de50-5a35-9fa6-77039bd7aade', null, null, 'standard', 35, 151.67, null, 180, null, null, null, null, null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('3c8382c6-1038-5143-94dc-6c81a836bc8d', array['cadre']::text[], null, 'forfait_jours', null, null, null, null, 216, null, null, null, null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 2)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 5.8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039114659 — Taux légaux (art. L. 3121-36 C. trav.) auxquels la convention renvoie'),
(2, 'Art. 5.11.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039115351 — Majoration du salaire horaire de base, travailleur de nuit ou non ; payable en repos au choix du salarié (art. 5.10)'),
(3, 'Art. 5.11.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039115351'),
(4, 'Art. 5.13 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039115641'),
(5, 'Art. 5.14 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039115661'),
(6, 'Art. 5.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039114584')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2216', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('0a18e7f2-63e0-52bc-b36c-6c9ceefa92e4', 'heures_supplementaires', 'Heures supplémentaires de la 36e à la 43e heure', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement_ou_repos', null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('4227b571-bb29-597e-8858-a31dd1f6689f', 'heures_supplementaires', 'Heures supplémentaires au-delà de la 43e heure', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement_ou_repos', null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('e0a65165-0f5b-5db2-9355-b01a6a80b351', 'nuit', 'Heures entre 22 h et 5 h', null, null, null, null, null, '22:00', '05:00', 20, null, null, 'paiement_ou_repos', null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 2),
('d191c360-c07c-53c4-bddb-cd39404fdd3a', 'nuit', 'Heures entre 21 h et 22 h', null, null, null, null, null, '21:00', '22:00', 5, null, null, 'paiement_ou_repos', null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 3),
('583acaca-4f27-5a3f-a17d-7a048629883e', 'dimanche', 'Travail occasionnel du dimanche (ou du jour de repos hebdomadaire)', null, null, null, null, null, null, null, 100, null, null, 'paiement_ou_repos', null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 4),
('5489bbfc-efe9-528a-b0de-7d6275b67b5a', 'dimanche', 'Travail habituel du dimanche — commerce ≤ 400 m² sans 1,5 jour de repos consécutif', null, null, null, null, null, null, null, 20, null, null, 'paiement', null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 4),
('d16c7968-641e-54b4-98e1-ffe98875f6a0', 'dimanche', 'Heures du dimanche jusqu''à 13 h — commerce > 400 m²', null, null, null, null, null, null, null, 30, null, null, 'paiement', null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 4),
('407e3383-9e57-559a-bf2c-d826e6593fdd', 'jour_ferie', 'Jour férié travaillé (hors 1er mai et journée de solidarité) : repos payé équivalent ou paiement des heures en sus', null, null, null, null, null, null, null, 100, null, null, 'paiement_ou_repos', null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 5),
('fa449593-4d9b-5cd6-9fac-2fe7c79b6fe5', 'autre', 'Jours travaillés au-delà du forfait jours (renonciation à des jours de repos)', array['cadre']::text[], null, null, null, null, null, null, 15, null, null, 'paiement', null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 6)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 13.9 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005770704 — Tranches 1 et 2 limitées à 4 PASS ; cotisation due à partir du 1er jour du mois où le salarié atteint 1 an d''ancienneté')
)
insert into public.cc_contributions (id, idcc_code, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2216', v.kind::text, v.label::text, v.organism::text, v.designation::text, v.categories::text[], v.classification_codes::text[], v.base::text, v.total_rate_percent::numeric, v.employer_rate_percent::numeric, v.employee_rate_percent::numeric, v.employer_fixed_amount::numeric, v.employee_fixed_amount::numeric, v.employer_min_share_percent::numeric, v.mandatory::boolean, v.company_size_min::int, v.company_size_max::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('30e8eb64-14b5-58ea-8863-fe5033eb4fcf', 'prevoyance', 'Prévoyance des non-cadres (après 1 an d''ancienneté)', null, null, array['employe','ouvrier','agent_maitrise','technicien']::text[], null, 'salaire_brut', 0.56, 0.31, 0.25, null, null, null, true, null, null, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1)
) as v(id, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 7.1.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005769850'),
(2, 'Art. 5.14 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039115661'),
(3, 'Art. 7.5.1 a — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005769913'),
(4, 'Art. 7.5.1 b — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005769913')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2216', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('449c2228-d103-54e0-8354-baca0f19f5a4', 'conges_anciennete', null, 'Congé d''ancienneté après 10 ans', null, null, 120, 1, 'ouvrables', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('ab130fbc-3e4e-5aa0-a4de-ddc2e9fd7ba3', 'conges_anciennete', null, 'Congé d''ancienneté après 15 ans', null, null, 180, 2, 'ouvrables', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('accb223a-850e-59a1-994a-b9756b4fba43', 'conges_anciennete', null, 'Congé d''ancienneté après 20 ans', null, null, 240, 3, 'ouvrables', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('2fad22f0-baf7-5d52-b37a-90bf8e9f228d', 'conges_supplementaires', null, 'Jours fériés chômés en plus du 1er mai', null, null, 0, 6, 'calendaires', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 2),
('b29e8f08-44b8-5a7e-aae4-aa92ea926ae3', 'evenement_familial', 'Décès du conjoint, partenaire de Pacs ou d''un enfant', 'Décès du conjoint, partenaire de Pacs ou d''un enfant', null, null, 0, 5, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 3),
('603fad49-93c8-5cac-9aa7-6428fd57d75d', 'evenement_familial', 'Décès du père, de la mère, d''un frère, d''une sœur, d''un beau-fils, d''une belle-fille ou d''un beau-parent', 'Décès du père, de la mère, d''un frère, d''une sœur, d''un beau-fils, d''une belle-fille ou d''un beau-parent', null, null, 0, 3, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 3),
('1b7cf473-fd2d-5ae3-9caa-8647208b964b', 'evenement_familial', 'Décès d''un grand-parent, beau-frère, belle-sœur ou petit-enfant', 'Décès d''un grand-parent, beau-frère, belle-sœur ou petit-enfant', null, null, 0, 1, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 3),
('20e08d61-beee-5448-a077-63c7395eadfb', 'evenement_familial', 'Mariage du salarié', 'Mariage du salarié', null, null, 0, 4, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 3),
('679ffbd1-c35e-57c7-8ed6-03ec2ef49ad1', 'evenement_familial', 'Naissance ou adoption', 'Naissance ou adoption', null, null, 0, 3, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 3),
('d35763ae-2ccd-513c-8f8a-c6c8e5e33bf6', 'evenement_familial', 'Mariage d''un enfant', 'Mariage d''un enfant', null, null, 0, 1, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 3),
('c46a455a-e741-585e-a6d2-a6d7f1ffad57', 'evenement_familial', 'Annonce d''un handicap chez un enfant', 'Annonce d''un handicap chez un enfant', null, null, 0, 2, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 3),
('5e07c596-6ced-5d47-a521-2b385206ceab', 'evenement_familial', 'Mariage du salarié (après 1 an, en remplacement des 4 jours)', 'Mariage du salarié (après 1 an, en remplacement des 4 jours)', null, null, 12, 6, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 4),
('0622b784-a0fa-52c8-9885-5b5035b27be6', 'evenement_familial', 'Mariage d''un descendant', 'Mariage d''un descendant', null, null, 12, 2, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 4),
('9be2188f-cc84-5f07-b283-c4ea871555dd', 'evenement_familial', 'Mariage d''un frère ou d''une sœur', 'Mariage d''un frère ou d''une sœur', null, null, 12, 1, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 4),
('e1b8698e-9ab5-5a6d-afd9-34876589cea8', 'evenement_familial', 'Baptême, communion solennelle ou équivalent d''un enfant', 'Baptême, communion solennelle ou équivalent d''un enfant', null, null, 12, 1, 'ouvres', true, '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 4)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005770839 — Maintien de la rémunération nette (après CSG/CRDS), sous déduction des IJSS et de la prévoyance ; durées cumulées sur 12 mois ; carence de 7 jours sauf hospitalisation ou arrêt de plus de 2 mois'),
(2, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005770839 — Maintien de la rémunération nette (après CSG/CRDS), sous déduction des IJSS et de la prévoyance ; durées cumulées sur 12 mois ; condition d''ancienneté ramenée à 1 mois'),
(3, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005771072 — Maintien de la rémunération nette (après CSG/CRDS), sous déduction des IJSS et de la prévoyance ; durées cumulées sur 12 mois ; carence de 7 jours sauf hospitalisation ou arrêt de plus de 2 mois'),
(4, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005771072 — Maintien de la rémunération nette (après CSG/CRDS), sous déduction des IJSS et de la prévoyance ; durées cumulées sur 12 mois'),
(5, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005771225 — Maintien de la rémunération nette (après CSG/CRDS), sous déduction des IJSS et de la prévoyance ; durées cumulées sur 12 mois'),
(6, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005771225 — Maintien de la rémunération nette (après CSG/CRDS), sous déduction des IJSS et de la prévoyance ; durées cumulées sur 12 mois ; maternité/adoption : dans la limite du congé légal')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2216', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('311ec317-758c-5ff1-a09b-ae6ccf137cd2', 'maladie', array['employe','ouvrier']::text[], null, 12, 7, 1, 30, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('d114b0bb-d366-54d3-92b7-ce45d1cdf597', 'maladie', array['employe','ouvrier']::text[], null, 12, 7, 2, 15, 90, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('d31ce2be-bccc-5224-aab6-2c3e4392d47a', 'accident_trajet', array['employe','ouvrier']::text[], null, 12, 7, 1, 30, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('21a1bc38-17e4-5ec5-98b4-d2f13288acaa', 'accident_trajet', array['employe','ouvrier']::text[], null, 12, 7, 2, 15, 90, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('2e2d46b0-7f02-5a48-9d37-793d6601e240', 'accident_travail', array['employe','ouvrier']::text[], null, 1, 0, 1, 30, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('f9af8d3e-9f41-50bc-a9f3-eaf5be260847', 'accident_travail', array['employe','ouvrier']::text[], null, 1, 0, 2, 15, 90, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('2e2d741b-883d-559b-a001-96b7614d9371', 'maladie_professionnelle', array['employe','ouvrier']::text[], null, 1, 0, 1, 30, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('fbfb0131-796e-5da4-93ce-96505bf3d0a6', 'maladie_professionnelle', array['employe','ouvrier']::text[], null, 1, 0, 2, 15, 90, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('32516fd7-10f1-5c51-93ff-6d32fc9c161a', 'maladie', array['employe','ouvrier']::text[], null, 60, 7, 1, 35, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('2f264cef-a428-5b1a-a675-1662df12c386', 'maladie', array['employe','ouvrier']::text[], null, 60, 7, 2, 40, 90, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('67d8c5e4-0447-5cf6-aab1-0769ca0d4605', 'accident_trajet', array['employe','ouvrier']::text[], null, 60, 7, 1, 35, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('21e08745-b12a-5983-857e-3450c1cd5a67', 'accident_trajet', array['employe','ouvrier']::text[], null, 60, 7, 2, 40, 90, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('1312e7be-a6fd-5f4d-975e-9c429bfe7cde', 'accident_travail', array['employe','ouvrier']::text[], null, 60, 0, 1, 35, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('7623fc23-6b1a-5d35-8d8a-ec6454afc11c', 'accident_travail', array['employe','ouvrier']::text[], null, 60, 0, 2, 40, 90, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('ab4f9574-c9dd-5e25-a6bd-278cdc7feb93', 'maladie_professionnelle', array['employe','ouvrier']::text[], null, 60, 0, 1, 35, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('6944b8be-cd73-5f2a-aa88-91971f42fce3', 'maladie_professionnelle', array['employe','ouvrier']::text[], null, 60, 0, 2, 40, 90, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('ee724789-b30f-5333-95b6-6866490e3958', 'maladie', array['employe','ouvrier']::text[], null, 120, 7, 1, 90, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('48a9c7d9-5d77-5c84-b8b6-2fc135b1ecfb', 'accident_trajet', array['employe','ouvrier']::text[], null, 120, 7, 1, 90, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('165d2812-153b-51a4-a3d9-b9414222f525', 'accident_travail', array['employe','ouvrier']::text[], null, 120, 0, 1, 90, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('4bfe839c-bf93-5bbc-b481-0130ecb71281', 'maladie_professionnelle', array['employe','ouvrier']::text[], null, 120, 0, 1, 90, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('3d7c7ee4-e0ec-5dd8-ba55-a12fa0f846c0', 'maladie', array['employe','ouvrier']::text[], null, 180, 7, 1, 90, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('2754beb3-79ca-5515-a080-60ef8cc9f16f', 'maladie', array['employe','ouvrier']::text[], null, 180, 7, 2, 30, 60, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('1af8c956-de00-58ed-8b99-eabc0abbe7ff', 'accident_trajet', array['employe','ouvrier']::text[], null, 180, 7, 1, 90, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('50fdb5de-f100-5c5f-b953-c0a420cd9155', 'accident_trajet', array['employe','ouvrier']::text[], null, 180, 7, 2, 30, 60, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('1b4123fe-3327-51d2-8e53-4f7a32c1e7d4', 'accident_travail', array['employe','ouvrier']::text[], null, 180, 0, 1, 90, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('05ea84b8-fd32-541e-b452-5711bb3c9d53', 'accident_travail', array['employe','ouvrier']::text[], null, 180, 0, 2, 30, 60, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('69a4fcf9-29e9-50a3-879f-4029447ca1b6', 'maladie_professionnelle', array['employe','ouvrier']::text[], null, 180, 0, 1, 90, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('349a7e53-2b81-5ec8-b433-071e4a01c63a', 'maladie_professionnelle', array['employe','ouvrier']::text[], null, 180, 0, 2, 30, 60, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('def081a1-53be-5d51-89de-b428b9ee55dd', 'maladie', array['employe','ouvrier']::text[], null, 240, 7, 1, 120, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('a1587617-0a0f-53fd-8ac1-e6b9aafd8bac', 'maladie', array['employe','ouvrier']::text[], null, 240, 7, 2, 60, 65, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('ad17f777-9703-5b2e-ae77-95ef2d264382', 'accident_trajet', array['employe','ouvrier']::text[], null, 240, 7, 1, 120, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('68d59ae9-501e-5349-8322-a968d69f6fd0', 'accident_trajet', array['employe','ouvrier']::text[], null, 240, 7, 2, 60, 65, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 1),
('6f775f9e-3604-5203-bc1b-2a8664a352e6', 'accident_travail', array['employe','ouvrier']::text[], null, 240, 0, 1, 120, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('5619c399-0f06-5ba3-bb44-2a5f048614d0', 'accident_travail', array['employe','ouvrier']::text[], null, 240, 0, 2, 60, 65, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('98d3f38d-cf4a-5dba-878d-9218a915ae56', 'maladie_professionnelle', array['employe','ouvrier']::text[], null, 240, 0, 1, 120, 100, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('b15cb948-15c5-5068-966e-fc3684619c11', 'maladie_professionnelle', array['employe','ouvrier']::text[], null, 240, 0, 2, 60, 65, 'net', true, 12, '669ff401-d1ff-5e63-9d57-4684d35efb8f', '2019-12-01', null, 2),
('75bf902d-f52b-508d-b556-d0f5ff458d95', 'maladie', array['agent_maitrise','technicien']::text[], null, 12, 7, 1, 55, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('2fdda590-2907-59e6-861e-739b51ca82e3', 'accident_trajet', array['agent_maitrise','technicien']::text[], null, 12, 7, 1, 55, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('5312d00b-24a5-52f3-8505-05e7e97aa0d8', 'accident_travail', array['agent_maitrise','technicien']::text[], null, 1, 0, 1, 60, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('12941969-9e2f-5f24-962f-defa2547862f', 'maladie_professionnelle', array['agent_maitrise','technicien']::text[], null, 1, 0, 1, 60, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('96ef7f2b-eb7d-5da7-937c-0936e31a6fdf', 'maladie', array['agent_maitrise','technicien']::text[], null, 60, 7, 1, 75, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('e85131d4-c585-5b07-aef0-fd369f82fb23', 'accident_trajet', array['agent_maitrise','technicien']::text[], null, 60, 7, 1, 75, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('e50b32a0-9880-561f-b6f3-208ef60ba8d2', 'accident_travail', array['agent_maitrise','technicien']::text[], null, 60, 0, 1, 90, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('a8fc8cae-602c-5dc3-96d0-496122a9f89d', 'maladie_professionnelle', array['agent_maitrise','technicien']::text[], null, 60, 0, 1, 90, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('abe76dd6-7743-5b10-ac4e-66f064114822', 'maladie', array['agent_maitrise','technicien']::text[], null, 120, 7, 1, 90, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('eff2d090-1bc9-5d2c-9c4d-0a7382cdc484', 'accident_trajet', array['agent_maitrise','technicien']::text[], null, 120, 7, 1, 90, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('63fd389a-4a7f-5b19-8520-65b3c94bbe67', 'accident_travail', array['agent_maitrise','technicien']::text[], null, 120, 0, 1, 120, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('d23a8b24-70f0-5db5-9e71-d299f977e61b', 'maladie_professionnelle', array['agent_maitrise','technicien']::text[], null, 120, 0, 1, 120, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('d3ed71dd-82d6-55fe-9795-fee834b66aaa', 'maladie', array['agent_maitrise','technicien']::text[], null, 180, 7, 1, 105, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('df752613-416c-5026-b6ee-4350666101f1', 'accident_trajet', array['agent_maitrise','technicien']::text[], null, 180, 7, 1, 105, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('56bfff3d-feeb-5492-98f2-1aba08fa56aa', 'accident_travail', array['agent_maitrise','technicien']::text[], null, 180, 0, 1, 120, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('4d7eb408-88e5-5d80-aa01-a2323a87180c', 'maladie_professionnelle', array['agent_maitrise','technicien']::text[], null, 180, 0, 1, 120, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('d6d4fda9-9562-562c-9634-cf9b72e2df22', 'maladie', array['agent_maitrise','technicien']::text[], null, 240, 7, 1, 125, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('f5cc3b5c-9916-530c-8b51-ecd9f565c3b3', 'accident_trajet', array['agent_maitrise','technicien']::text[], null, 240, 7, 1, 125, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('6aeb6b79-a6c4-5e56-a73d-703ca7bb4d52', 'accident_travail', array['agent_maitrise','technicien']::text[], null, 240, 0, 1, 180, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('f13e41f5-2a5b-520e-858a-c06f809e7cd3', 'maladie_professionnelle', array['agent_maitrise','technicien']::text[], null, 240, 0, 1, 180, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('2b73382a-e11d-574b-bc7f-ad090fd581d5', 'maladie', array['agent_maitrise','technicien']::text[], null, 300, 7, 1, 135, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('e6dfdc7d-db67-5d29-bb63-d37afb759a64', 'accident_trajet', array['agent_maitrise','technicien']::text[], null, 300, 7, 1, 135, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('184fa9f9-ce39-50ab-8f79-ecc967f5d27b', 'accident_travail', array['agent_maitrise','technicien']::text[], null, 300, 0, 1, 180, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('67671c06-329a-597a-a616-242cc9480312', 'maladie_professionnelle', array['agent_maitrise','technicien']::text[], null, 300, 0, 1, 180, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('0ba3a8e9-5ba9-5860-b1ed-78d6848b2c74', 'maladie', array['agent_maitrise','technicien']::text[], null, 360, 7, 1, 160, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('5b52c795-4062-5ab7-8208-854ddb8dc13f', 'accident_trajet', array['agent_maitrise','technicien']::text[], null, 360, 7, 1, 160, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 3),
('00243bf2-d251-5c4a-93d0-11947b4b6473', 'accident_travail', array['agent_maitrise','technicien']::text[], null, 360, 0, 1, 180, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('ec108b36-5ed6-50ca-a5a2-16c2479f5ff0', 'maladie_professionnelle', array['agent_maitrise','technicien']::text[], null, 360, 0, 1, 180, 100, 'net', true, 12, 'f0a4e263-1894-5952-bce5-018a22f6f167', '2019-12-01', null, 4),
('eac99304-65b5-5da3-a79b-24c22e34f708', 'maladie', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 5),
('3d421587-aa94-562c-941c-ff5623391e02', 'accident_trajet', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 5),
('7b1592e4-c787-57ac-a314-75497f07de27', 'accident_travail', array['cadre']::text[], null, 1, 0, 1, 120, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('5f481f6a-b315-552e-b363-be2346fbb2f5', 'maladie_professionnelle', array['cadre']::text[], null, 1, 0, 1, 120, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('0be2f2ee-8969-593c-9c1f-29b233337f9a', 'maternite', array['cadre']::text[], null, 1, 0, 1, 120, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('b60a9f14-8e99-5323-8ad6-904b2e394bf3', 'maladie', array['cadre']::text[], null, 60, 0, 1, 120, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 5),
('07e8e4f0-3e38-5e26-a3e4-db933c16cca2', 'accident_trajet', array['cadre']::text[], null, 60, 0, 1, 120, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 5),
('bdd15252-aad7-5c62-a237-7042ecae5bcc', 'accident_travail', array['cadre']::text[], null, 60, 0, 1, 150, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('7f65dfc0-21d5-5781-9dba-3c27e4d36aee', 'maladie_professionnelle', array['cadre']::text[], null, 60, 0, 1, 150, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('9028b52a-0cc4-5cd2-b525-10f9598b9ab6', 'maternite', array['cadre']::text[], null, 60, 0, 1, 150, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('0c59171e-4c5a-529b-8911-c5c9c623b015', 'maladie', array['cadre']::text[], null, 120, 0, 1, 150, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 5),
('c1867cc5-d651-504e-adbe-d2370dee1a37', 'accident_trajet', array['cadre']::text[], null, 120, 0, 1, 150, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 5),
('93864256-15b3-5d99-b95f-0fb52c26fe8e', 'accident_travail', array['cadre']::text[], null, 120, 0, 1, 210, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('88f8df66-e34f-5b1c-8fae-193b452482ca', 'maladie_professionnelle', array['cadre']::text[], null, 120, 0, 1, 210, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('c0a5cb03-4aa1-5cf1-a3c0-9894e85fc2f0', 'maternite', array['cadre']::text[], null, 120, 0, 1, 210, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('5b3146e2-e132-543b-8b13-ffb70009adf5', 'maladie', array['cadre']::text[], null, 360, 0, 1, 155, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 5),
('a1cf9378-16cc-5e60-9194-8017079b7e77', 'accident_trajet', array['cadre']::text[], null, 360, 0, 1, 155, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 5),
('66ef1fb8-5217-55c6-9413-7c5deae80e97', 'accident_travail', array['cadre']::text[], null, 360, 0, 1, 210, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('4c9da131-e9f6-5e62-ba38-f1b812609c7c', 'maladie_professionnelle', array['cadre']::text[], null, 360, 0, 1, 210, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6),
('baac0a7b-69e2-5ede-bbce-45cbf54064da', 'maternite', array['cadre']::text[], null, 360, 0, 1, 210, 100, 'net', true, 12, '08f1ed05-1f63-5dc0-a9bd-faf8425aad76', '2019-12-01', null, 6)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 5.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039112815'),
(2, 'Art. 3.8 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000039111309'),
(3, 'Art. 7.1.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005769850')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '2216', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('688d3ec7-4e7a-594e-95c5-1781636b5792', 'pause_payee', 'Pause payée de 5 % du temps de travail effectif', null, null, 5, 'pourcent', 'Pause rémunérée incluse dans les minima « mensuel garanti » ; à défaut d''accord, pause avant la 5e heure pour 4 heures consécutives', '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 1),
('2c46c227-41a9-58f2-8265-d49f2f7c3c45', 'mention_bulletin', 'Mentions conventionnelles du bulletin de paie', null, null, null, null, 'Intitulé de la convention et IDCC 2216 ; forfait jours : nombre annuel de jours', '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 2),
('66bc8549-1586-5202-a8f8-8e9f9716d2c0', 'conges_maladie', 'Maladie assimilée à du travail effectif pour les congés payés', null, null, 2, 'mois', 'Dans la limite de 2 mois, pour les salariés ayant au moins 2 ans de présence', '6e3089f4-67ca-519e-ab3b-a05d47dc4063', '2019-12-01', null, 3)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
