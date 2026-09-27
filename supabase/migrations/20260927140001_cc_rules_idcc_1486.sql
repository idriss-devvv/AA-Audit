-- Critères de vérification de la convention collective IDCC 1486, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 1486 — Syntec (bureaux d'études techniques) (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('4588a4e9-88b2-5159-a8c5-63151b691424', '1486', 'texte_base', 'Convention collective nationale du 15 décembre 1987 mise à jour par avenant n° 46 du 16 juillet 2021', 'KALITEXT000044253019', '2021-07-16'::date, '2023-04-28'::date, '2023-05-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000044253019', null, '2026-09-27'),
('972879b3-abcf-59c2-bd52-c3dd5a256221', '1486', 'avenant_salaires', 'Accord du 26 juin 2024 relatif aux salaires minimaux (annexe III)', 'KALITEXT000050228699', '2024-06-26'::date, '2024-11-27'::date, '2025-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000050228699', null, '2026-09-27'),
('90d87f31-d301-5c49-a338-bb06e3b9977e', '1486', 'accord', 'Accord du 22 juin 1999 relatif à la durée du travail (modifié par avenant du 1er avril 2014)', 'KALITEXT000005679936', '1999-06-22'::date, null::date, null::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005679936', null, '2026-09-27'),
('9104036e-320e-5646-b88f-420a428bb3de', '1486', 'accord', 'Accord du 27 mars 1997 relatif à la prévoyance — annexe I (cotisations)', 'KALITEXT000005679919', '1997-03-27'::date, null::date, null::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005679919', null, '2026-09-27'),
('8e512425-f444-5f2f-a346-d79c7e860c3c', '1486', 'avenant', 'Avenant n° 8 du 16 décembre 2025 à l''accord du 27 mars 1997 relatif à la prévoyance lourde', 'KALITEXT000054091937', '2025-12-16'::date, null::date, '2026-07-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054091937', null, '2026-09-27'),
('e7c5830c-8047-58ba-b5a7-c18dea7082a4', '1486', 'accord', 'Accord du 7 octobre 2015 relatif à la complémentaire santé', 'KALITEXT000031964500', '2015-10-07'::date, null::date, null::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000031964500', null, '2026-09-27'),
('e645c219-6126-5cf5-b1a4-1abdcd263e4f', '1486', 'avenant', 'Avenant n° 49 du 22 octobre 2025 relatif à la parentalité et aux évènements familiaux', 'KALITEXT000053434107', '2025-10-22'::date, '2026-04-04'::date, '2026-05-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000053434107', null, '2026-09-27');

with n(k, t) as (values
(1, 'https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050228718')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1486', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('b79bff3b-6e17-53b0-9170-ae6d8c0bf668', 'ETAM-240', 'ETAM position 1.1, coefficient 240', 'technicien', '1', '1.1', 240, array['Position 1.1','Coefficient 240']::text[], 0, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('8b5bd086-30c1-562c-baff-429ba168a370', 'ETAM-250', 'ETAM position 1.2, coefficient 250', 'technicien', '1', '1.2', 250, array['Position 1.2','Coefficient 250']::text[], 1, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('0fd74e1e-ab3a-51d8-8d9e-fa100e3ac69c', 'ETAM-275', 'ETAM position 2.1, coefficient 275', 'technicien', '2', '2.1', 275, array['Position 2.1','Coefficient 275']::text[], 2, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('2c4da339-1980-5329-a55e-c81d6cdb6922', 'ETAM-310', 'ETAM position 2.2, coefficient 310', 'technicien', '2', '2.2', 310, array['Position 2.2','Coefficient 310']::text[], 3, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('e1dc0319-1ef8-567c-9968-04991f6c40e1', 'ETAM-355', 'ETAM position 2.3, coefficient 355', 'technicien', '2', '2.3', 355, array['Position 2.3','Coefficient 355']::text[], 4, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('b1a500c4-1d9e-50b7-a660-8fbac62c1e08', 'ETAM-400', 'ETAM position 3.1, coefficient 400', 'agent_maitrise', '3', '3.1', 400, array['Position 3.1','Coefficient 400']::text[], 5, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('6131cb9b-be31-58df-97d8-a4c10e446718', 'ETAM-450', 'ETAM position 3.2, coefficient 450', 'agent_maitrise', '3', '3.2', 450, array['Position 3.2','Coefficient 450']::text[], 6, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('f145bcc9-cf73-5a3e-8c89-f41439b8396d', 'ETAM-500', 'ETAM position 3.3, coefficient 500', 'agent_maitrise', '3', '3.3', 500, array['Position 3.3','Coefficient 500']::text[], 7, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('f31ee9d9-08f0-52b8-964b-139a3a023d1c', 'IC-95', 'Ingénieurs et cadres position 1.1, coefficient 95', 'cadre', '1', '1.1', 95, array['Position 1.1','Coefficient 95']::text[], 20, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('a8ef9e0c-1a63-5222-90ec-cbcc5118f3c2', 'IC-100', 'Ingénieurs et cadres position 1.2, coefficient 100', 'cadre', '1', '1.2', 100, array['Position 1.2','Coefficient 100']::text[], 21, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('8c9da968-2a13-5b37-a9cb-90834a9b3691', 'IC-105', 'Ingénieurs et cadres position 2.1, coefficient 105', 'cadre', '2', '2.1', 105, array['Position 2.1','Coefficient 105']::text[], 22, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('318ed6f4-3745-5f7f-92e3-8913694ee67d', 'IC-115', 'Ingénieurs et cadres position 2.1, coefficient 115', 'cadre', '2', '2.1', 115, array['Position 2.1','Coefficient 115']::text[], 23, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('d7cf00e6-d7db-5644-bac7-8f9c16ac0932', 'IC-130', 'Ingénieurs et cadres position 2.2, coefficient 130', 'cadre', '2', '2.2', 130, array['Position 2.2','Coefficient 130']::text[], 24, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('5656b995-3536-5271-918f-7ab7f0ef2576', 'IC-150', 'Ingénieurs et cadres position 2.3, coefficient 150', 'cadre', '2', '2.3', 150, array['Position 2.3','Coefficient 150']::text[], 25, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('6f9e3d26-84be-5a17-b092-d8a9bb009ffb', 'IC-170', 'Ingénieurs et cadres position 3.1, coefficient 170', 'cadre', '3', '3.1', 170, array['Position 3.1','Coefficient 170']::text[], 26, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('a7d0c6e4-9eba-5511-b9ce-6c157720f5bd', 'IC-210', 'Ingénieurs et cadres position 3.2, coefficient 210', 'cadre', '3', '3.2', 210, array['Position 3.2','Coefficient 210']::text[], 27, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('72b2d0fc-0094-5478-9ef6-6b3e131a6cb8', 'IC-270', 'Ingénieurs et cadres position 3.3, coefficient 270', 'cadre', '3', '3.3', 270, array['Position 3.3','Coefficient 270']::text[], 28, '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. annexe — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000050228718 — Salaire minimal hiérarchique mensuel ; 1/12 de la rémunération annuelle (art. 7.1) ne doit pas être inférieur')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1486', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('96a08cf6-7f2a-57fc-b869-290348639b5f', 'ETAM-240', 1815, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('5207580b-090d-5fff-b987-7b0658a8acbf', 'ETAM-250', 1845, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('472334b4-358d-5656-8b00-be0e52bb62b7', 'ETAM-275', 1875, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('6ba3411d-31ff-5579-8334-b8c2bbdb1ef9', 'ETAM-310', 1905, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('cdc59700-0609-5e58-9f04-3aadec5d718c', 'ETAM-355', 2045, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('c9f97730-b710-5a41-9c33-fa1960e2bf86', 'ETAM-400', 2185, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('5e8ab1f9-ad97-556f-a91e-958af619e45b', 'ETAM-450', 2340, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('226f9ee9-54ee-5b71-8470-c4c3eced6dd6', 'ETAM-500', 2490, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('c4a6bd87-9ec1-5975-8f76-301f3bd843d9', 'IC-95', 2135, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('3cf92103-d9a6-5057-8883-28a8a81d3776', 'IC-100', 2240, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('74786a6b-cd59-51de-a70d-86993776936d', 'IC-105', 2315, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('f76eb165-8e30-587f-aff3-1ccada503dec', 'IC-115', 2530, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('652deadd-b54f-5358-bf31-f01aa2992579', 'IC-130', 2850, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('b50fd8ed-e9cc-579e-9dc5-b26d4d5029b0', 'IC-150', 3275, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('9d2f6e8c-075d-5ba0-af87-efe2089d3ffd', 'IC-170', 3650, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('5fb82088-64c3-5ef6-8481-a442e3d5bcba', 'IC-210', 4495, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1),
('3fe9c3bf-8645-55b9-bfdd-f51d7b29e40f', 'IC-270', 5755, 'mensuel', null, null, 'standard', null, 0, 'remuneration_annuelle', '972879b3-abcf-59c2-bd52-c3dd5a256221', '2025-01-01', null, 1)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 7.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253107')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1486', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('a129102f-9241-5049-8fbb-115e6a5db6c7', 'prime_vacances', 'Prime de vacances : au moins 10 % de la masse globale des indemnités de congés payés', null, null, 10, null, 'indemnite_conges_payes', array[5,6,7,8,9,10]::int[], 0, null, 'Au prorata du temps de présence en cas d''embauche/départ en cours d''année ou de CDD ; une prime versée à tous peut en tenir lieu si ≥ 10 % et versée en partie entre le 1er mai et le 31 octobre ; un 13e mois ou une prime d''objectifs ne peut pas s''y substituer', null, null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1)
) as v(id, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. chap. II art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851637 — Modalités standard'),
(2, 'Art. 6.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253092 — Ingénieurs et cadres : contingent réglementaire (220 h)'),
(3, 'Art. chap. II art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851638 — « Réalisation de missions » : variations horaires jusqu''à 10 % au-delà de 35 h incluses dans le salaire ; rémunération annuelle ≥ 115 % du minimum et, pour les cadres, ≥ plafond de la sécurité sociale'),
(4, 'Art. chap. II art. 4.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029330022 — Forfait annuel en jours (autonomie complète) : rémunération annuelle ≥ 120 % du minimum de la catégorie ; position 2.3 minimum, ou rémunération > 2 PASS, ou mandataire social'),
(5, 'Art. chap. II art. 4.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000029330022 — Position 2.3 en forfait jours : rémunération annuelle ≥ 122 % du minimum')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1486', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('4e4e5a12-b53b-5bc4-ad16-3386bd251b23', array['employe','technicien','agent_maitrise','cadre']::text[], null, 'standard', 35, 151.67, null, null, null, null, null, null, null, '90d87f31-d301-5c49-a338-bb06e3b9977e', '2023-05-01', null, 1),
('7629b619-9d84-5f1e-a798-c7e7f65790fb', array['employe','technicien','agent_maitrise']::text[], null, 'standard', null, null, null, 130, null, null, null, null, null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 2),
('ef82e3fc-c97a-501b-91b8-e4cc95c59888', array['cadre']::text[], null, 'modalite_2', 38.5, null, null, null, 219, null, null, null, 115, '90d87f31-d301-5c49-a338-bb06e3b9977e', '2023-05-01', null, 3),
('c4e9fe09-3511-5917-ab58-863d19dd3c5b', array['cadre']::text[], null, 'forfait_jours', null, null, null, null, 218, null, null, null, 120, '90d87f31-d301-5c49-a338-bb06e3b9977e', '2023-05-01', null, 4),
('84a574a4-5b65-567a-a83b-234c23ee9be7', array['cadre']::text[], array['IC-150']::text[], 'forfait_jours', null, null, null, null, 218, null, null, null, 122, '90d87f31-d301-5c49-a338-bb06e3b9977e', '2023-05-01', null, 5)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 6.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253092 — Taux légaux (art. L. 3121-36 C. trav.) auxquels la convention renvoie'),
(2, 'Art. 6.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253094 — Forfait jours : +100 % de la rémunération journalière. Non cumulable dimanche + férié'),
(3, 'Art. 6.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253094'),
(4, 'Art. 6.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253102 — Majoration appliquée sur le taux horaire du salaire minimal hiérarchique')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1486', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('ebed6cbd-fa6b-5f76-a6dc-6a1d2dbedc85', 'heures_supplementaires', 'Heures supplémentaires de la 36e à la 43e heure', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement', null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('a4dd845f-875d-5a27-8e23-736fedf0b3ea', 'heures_supplementaires', 'Heures supplémentaires au-delà de la 43e heure', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement', null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('c226b240-f797-534c-aa14-fc2136c258c2', 'dimanche', 'Travail exceptionnel du dimanche (jusqu''au 15e dimanche ou jour férié travaillé dans l''année civile)', null, null, null, null, null, null, null, 100, null, null, 'paiement', null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 2),
('6d626ce3-9e40-56c3-8aac-22e150db652c', 'jour_ferie', 'Travail exceptionnel d''un jour férié (jusqu''au 15e dimanche ou jour férié travaillé dans l''année civile)', null, null, null, null, null, null, null, 100, null, null, 'paiement', null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 3),
('a2ef795c-27f0-5f60-99eb-1d99cef8048f', 'dimanche', 'Travail habituel du dimanche (à partir du 16e dimanche ou jour férié travaillé dans l''année civile)', null, null, null, null, null, null, null, 25, null, null, 'paiement', null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 3),
('86c217fd-805b-5a61-8371-89c99da257c5', 'jour_ferie', 'Travail habituel d''un jour férié (à partir du 16e dimanche ou jour férié travaillé dans l''année civile)', null, null, null, null, null, null, null, 25, null, null, 'paiement', null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 3),
('870eaf9f-31f2-5d16-a0e2-06662b49af28', 'nuit', 'Travail habituel de nuit (ETAM), période d''au moins 6 h consécutives', array['employe','technicien','agent_maitrise']::text[], null, null, null, null, '21:00', '07:00', 25, null, null, 'paiement', null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 4)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005851605 — Part salariale ≤ 50 % du total'),
(2, 'Art. 5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054091945 — Part salariale ≤ 50 % du total ; entrée en vigueur sous réserve d''extension'),
(3, 'Art. 1.1.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000031964523 — Montants forfaitaires publiés en tableaux au BOCC (non reproduits dans KALI) : non saisis')
)
insert into public.cc_contributions (id, idcc_code, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1486', v.kind::text, v.label::text, v.organism::text, v.designation::text, v.categories::text[], v.classification_codes::text[], v.base::text, v.total_rate_percent::numeric, v.employer_rate_percent::numeric, v.employee_rate_percent::numeric, v.employer_fixed_amount::numeric, v.employee_fixed_amount::numeric, v.employer_min_share_percent::numeric, v.mandatory::boolean, v.company_size_min::int, v.company_size_max::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('4e9cf359-f814-5bd0-b993-762abce9ea7c', 'prevoyance', 'Prévoyance de branche — tranche A', null, null, null, null, 'tranche_a', 0.74, null, null, null, null, 50, true, null, null, '9104036e-320e-5646-b88f-420a428bb3de', '2013-01-01', '2026-07-01', 1),
('695d1d51-d08e-585a-b446-0e67b3a1753a', 'prevoyance', 'Prévoyance de branche — tranche B', null, null, null, null, 'tranche_b', 1.13, null, null, null, null, 50, true, null, null, '9104036e-320e-5646-b88f-420a428bb3de', '2013-01-01', '2026-07-01', 1),
('da352347-1987-55a7-8dd4-5e99561ca34f', 'prevoyance', 'Prévoyance de branche — tranche C', null, null, null, null, 'tranche_c', 1.13, null, null, null, null, 50, true, null, null, '9104036e-320e-5646-b88f-420a428bb3de', '2013-01-01', '2026-07-01', 1),
('f432cc6f-5b23-528a-891f-4fa0567da7c6', 'prevoyance', 'Prévoyance de branche — tranche 1', null, null, null, null, 'tranche_1', 0.85, null, null, null, null, 50, true, null, null, '8e512425-f444-5f2f-a346-d79c7e860c3c', '2026-07-01', null, 2),
('a7281d14-f4ec-5086-8edc-0957e514a37c', 'prevoyance', 'Prévoyance de branche — tranche 2', null, null, null, null, 'tranche_2', 1.1, null, null, null, null, 50, true, null, null, '8e512425-f444-5f2f-a346-d79c7e860c3c', '2026-07-01', null, 2),
('0e7c000b-36b3-5c41-89a4-16569e080798', 'mutuelle', 'Complémentaire santé — couverture minimale de branche', null, null, null, null, 'forfait', null, null, null, null, null, 50, true, null, null, 'e7c5830c-8047-58ba-b5a7-c18dea7082a4', '2016-01-01', null, 3)
) as v(id, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 5.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253077'),
(2, 'Art. 5.7 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053434112')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1486', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('6faf7b64-5bfc-5885-8498-9568c1ebfef0', 'conges_anciennete', null, 'Congé d''ancienneté après 5 ans', null, null, 60, 1, 'ouvres', true, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('9e7ad021-2e5d-5319-b1e4-2c77f9266976', 'conges_anciennete', null, 'Congé d''ancienneté après 10 ans', null, null, 120, 2, 'ouvres', true, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('c1fc30f6-2591-520f-a9f0-ce57cc635b8e', 'conges_anciennete', null, 'Congé d''ancienneté après 15 ans', null, null, 180, 3, 'ouvres', true, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('4b34bcba-d4ea-5d64-aff3-015835c230e4', 'conges_anciennete', null, 'Congé d''ancienneté après 20 ans', null, null, 240, 4, 'ouvres', true, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('8b7ab455-0147-5178-aac7-98ac4e1a316c', 'fractionnement', null, 'Fractionnement : au moins 5 jours ouvrés pris hors période du 1er mai au 31 octobre', null, null, 0, 2, 'ouvres', true, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('03d6198b-8af4-505c-ba14-ea0aa7237659', 'fractionnement', null, 'Fractionnement : 3 ou 4 jours ouvrés pris hors période du 1er mai au 31 octobre', null, null, 0, 1, 'ouvres', true, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('3061939c-7f08-5dee-acd2-6dedf8df86e8', 'conges_supplementaires', null, 'Rappel pendant les congés payés', null, null, 0, 2, 'ouvrables', true, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('bc547d4b-ad43-5a28-9ccb-3e9efc460aa4', 'evenement_familial', 'Mariage ou Pacs', 'Mariage ou Pacs', null, null, 0, 4, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('6a1fbac9-5354-5319-853f-5209460fa219', 'evenement_familial', 'Mariage d''un enfant', 'Mariage d''un enfant', null, null, 0, 1, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('60d05d13-52ef-5187-812f-c959bb668961', 'evenement_familial', 'Naissance', 'Naissance', null, null, 0, 3, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('6d9e8aa8-e592-5a5b-abf4-24cf3677f527', 'evenement_familial', 'Adoption', 'Adoption', null, null, 0, 3, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('25297bc9-afb3-50a1-ae16-880e633eee80', 'evenement_familial', 'Annonce d''un handicap, d''une pathologie chronique ou d''un cancer chez un enfant', 'Annonce d''un handicap, d''une pathologie chronique ou d''un cancer chez un enfant', null, null, 0, 5, 'ouvrables', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('81a1521f-6615-5c9a-8740-3fa8aa5503f9', 'evenement_familial', 'Décès du conjoint, partenaire de Pacs ou concubin', 'Décès du conjoint, partenaire de Pacs ou concubin', null, null, 0, 3, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('8e24549f-751e-5e90-8d9d-fd5ffb149441', 'evenement_familial', 'Décès d''un enfant ou personne à charge de moins de 25 ans', 'Décès d''un enfant ou personne à charge de moins de 25 ans', null, null, 0, 14, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('0aee4041-406b-5766-96c6-edc8082641cd', 'evenement_familial', 'Décès d''un enfant de plus de 25 ans', 'Décès d''un enfant de plus de 25 ans', null, null, 0, 12, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('9f44dbee-abee-58a8-8f22-d6ca0f8e5a45', 'evenement_familial', 'Décès d''un enfant lui-même parent', 'Décès d''un enfant lui-même parent', null, null, 0, 14, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('6854b474-8c01-5b40-b673-35dca1e1362a', 'evenement_familial', 'Décès du père ou de la mère', 'Décès du père ou de la mère', null, null, 0, 3, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('1d541439-378d-58d6-901a-a34798d22eac', 'evenement_familial', 'Décès d''un frère ou d''une sœur', 'Décès d''un frère ou d''une sœur', null, null, 0, 3, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('6c6d38fd-61ed-5526-98bf-d55ac4719115', 'evenement_familial', 'Décès du beau-père ou de la belle-mère', 'Décès du beau-père ou de la belle-mère', null, null, 0, 3, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('b34541f1-6aa8-56b5-984e-7947f8b9b3e4', 'evenement_familial', 'Décès d''un autre ascendant', 'Décès d''un autre ascendant', null, null, 0, 2, 'ouvres', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('a27188b3-7535-5283-ae3c-bc514b432458', 'evenement_familial', 'Congé de deuil (enfant ou personne à charge de moins de 25 ans)', 'Congé de deuil (enfant ou personne à charge de moins de 25 ans)', null, null, 0, 8, 'ouvrables', true, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('230bb262-25da-512a-9250-16bcffaffaac', 'enfant_malade', 'Maladie ou accident d''un enfant', 'Maladie ou accident d''un enfant', null, null, 0, 3, 'ouvrables', false, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('a2551025-c542-5f2b-bcd4-714b4a2475ff', 'enfant_malade', 'Maladie ou accident d''un enfant de moins d''un an ou 3 enfants de moins de 16 ans à charge', 'Maladie ou accident d''un enfant de moins d''un an ou 3 enfants de moins de 16 ans à charge', null, null, 0, 5, 'ouvrables', false, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 9.2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253118 — Complément jusqu''au salaire net qu''aurait perçu le salarié, sous déduction des IJSS et de la prévoyance ; 90 jours maximum sur 12 mois consécutifs. En AT/MP, droit dès le 1er jour de présence (barème à l''ancienneté non précisé avant 1 an)'),
(2, 'Art. 9.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053434111 — Maintien intégral du salaire mensuel pendant le congé légal (durée selon le rang de l''enfant), sous déduction des IJSS et de la prévoyance'),
(3, 'Art. 9.3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000053434111 — Complément à 100 % du salaire de base hors primes, plafonné à la valeur journalière du PMSS et au salaire net journalier (1/30e)')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1486', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('4a76d1e4-96fb-5d4d-a3da-4e1dbce23674', 'maladie', array['employe','technicien','agent_maitrise']::text[], null, 12, 0, 1, 30, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('7720600c-148f-5e8f-8fb2-ba6b1fa8aba5', 'maladie', array['employe','technicien','agent_maitrise']::text[], null, 12, 0, 2, 60, 80, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('c2c972c5-bc2b-5cf3-ae30-5a2503514bb2', 'accident_travail', array['employe','technicien','agent_maitrise']::text[], null, 12, 0, 1, 30, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('32c70ead-8cbe-5dd9-8301-be91cf00b7ac', 'accident_travail', array['employe','technicien','agent_maitrise']::text[], null, 12, 0, 2, 60, 80, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('cbb0ab5c-b172-5983-b199-83936c12b8e1', 'maladie_professionnelle', array['employe','technicien','agent_maitrise']::text[], null, 12, 0, 1, 30, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('9e4efb1f-7b8c-5850-899a-ea00cdeb24ee', 'maladie_professionnelle', array['employe','technicien','agent_maitrise']::text[], null, 12, 0, 2, 60, 80, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('0510eb3f-46dd-5eff-9b98-a4e545051de2', 'accident_trajet', array['employe','technicien','agent_maitrise']::text[], null, 12, 0, 1, 30, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('fb2f7a65-f583-5091-a286-7c141e12c73d', 'accident_trajet', array['employe','technicien','agent_maitrise']::text[], null, 12, 0, 2, 60, 80, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('fda0755a-efcc-5d5f-a544-25631b9d58b1', 'maladie', array['employe','technicien','agent_maitrise']::text[], null, 60, 0, 1, 60, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('eba7e05d-cffc-5cd6-a6fb-cd685f7d8114', 'maladie', array['employe','technicien','agent_maitrise']::text[], null, 60, 0, 2, 30, 80, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('40cdca3d-84b5-5a4e-9d79-dd9dfffa9762', 'accident_travail', array['employe','technicien','agent_maitrise']::text[], null, 60, 0, 1, 60, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('5c5add23-c016-57c2-abc2-4bf803243d9c', 'accident_travail', array['employe','technicien','agent_maitrise']::text[], null, 60, 0, 2, 30, 80, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('e548a335-26f4-51d5-97eb-5683574d625d', 'maladie_professionnelle', array['employe','technicien','agent_maitrise']::text[], null, 60, 0, 1, 60, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('0d4e7834-fdb3-51c5-abbd-50381b80fe04', 'maladie_professionnelle', array['employe','technicien','agent_maitrise']::text[], null, 60, 0, 2, 30, 80, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('1ee193fb-cd98-5562-b175-9648e4c6b1b1', 'accident_trajet', array['employe','technicien','agent_maitrise']::text[], null, 60, 0, 1, 60, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('60f39929-d7fb-5b99-b610-1cf0e8355968', 'accident_trajet', array['employe','technicien','agent_maitrise']::text[], null, 60, 0, 2, 30, 80, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('d566ac9e-7b28-5601-898f-2121b2050bde', 'maladie', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('52457b12-1246-5068-b20c-27711106aca6', 'accident_travail', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('eac966f8-88b4-51fc-a6b8-b2cd1d1456f9', 'maladie_professionnelle', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('04e04201-64ba-584b-9a17-51d38ca48c8f', 'accident_trajet', array['cadre']::text[], null, 12, 0, 1, 90, 100, 'brut', true, 12, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('89b05c86-b2bb-56e0-9fca-519e7f987034', 'maternite', null, null, 12, 0, 1, 112, 100, 'net', true, null, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 2),
('6744bd69-8ff9-53ff-a174-e71b45357e3c', 'paternite', null, null, 12, 0, 1, 25, 100, 'brut', true, null, 'e645c219-6126-5cf5-b1a4-1abdcd263e4f', '2026-05-01', null, 3)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 7.1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253104'),
(2, 'Art. 7.4 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000044253109')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '1486', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('4913fe51-88e7-59a3-954b-058d764979a0', 'remuneration_mensuelle_min', 'Rémunération mensuelle minimale en % du salaire minimal hiérarchique', array['employe','technicien','agent_maitrise','cadre']::text[], null, 95, 'pourcent', 'La rémunération mensuelle ne peut être inférieure à 95 % du minimum mensuel (92 % en cas de 13e mois) ; régularisation au départ en cours d''année', '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('c385d443-8466-508f-b545-7dc72f667e40', 'remuneration_mensuelle_min_avec_13e_mois', 'Rémunération mensuelle minimale en % du minimum hiérarchique lorsqu''un 13e mois existe', array['employe','technicien','agent_maitrise','cadre']::text[], null, 92, 'pourcent', null, '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('ea388b82-a513-5ab0-b31b-60e6cbf4b1dd', 'assiette_minimum', 'Éléments exclus de la comparaison au minimum', null, null, null, null, 'Exclus : primes d''assiduité, participation, intéressement, primes exceptionnelles, remboursements de frais, indemnités de déplacement, heures supplémentaires et complémentaires, indemnité compensatrice de congés payés. Inclus : avantages en nature prévus au contrat', '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 1),
('4d9ff366-d661-5fc6-b91c-459aee487629', 'mention_bulletin', 'Mentions conventionnelles du bulletin de paie', null, null, null, null, 'Classification et coefficient hiérarchique, salaire mensuel de base, heures au taux normal et majorées avec les taux, nature et volume du forfait, intitulé de la convention collective', '4588a4e9-88b2-5159-a8c5-63151b691424', '2023-05-01', null, 2)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
