-- Critères de vérification de la convention collective IDCC 843, relevés dans la base
-- KALI (DILA / Légifrance, paquet @socialgouv/kali-data 3.504.0 du 26/09/2026).
-- Chaque règle cite son article source (colonne notes) et le texte (cc_texts).

-- IDCC 843 — Boulangerie-pâtisserie (entreprises artisanales) (relevé KALI/Légifrance du 2026-09-27)

insert into public.cc_texts (id, idcc_code, kind, title, reference, signed_at, extension_published_at, effective_from, source_url, notes, verified_at) values
('8569a953-fd4e-5b10-90c2-706eff1d9278', '843', 'texte_base', 'Convention collective nationale de la boulangerie-pâtisserie du 19 mars 1976', 'KALITEXT000005688564', '1976-03-19'::date, null::date, '1978-06-21'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000005688564', 'Articles consolidés en vigueur ; étendue par arrêté du 21 juin 1978', '2026-09-27'),
('8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '843', 'avenant_salaires', 'Avenant n° 139 du 14 janvier 2026 relatif aux salaires', 'KALITEXT000054066505', '2026-01-14'::date, '2026-04-17'::date, '2026-01-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054066505', null, '2026-09-27'),
('1051f157-239d-5e7c-83fa-c5339ab00cde', '843', 'avenant_salaires', 'Île-de-France — avenant n° 61 du 22 janvier 2026 relatif aux salaires au 1er février 2026', 'KALITEXT000054091886', '2026-01-22'::date, '2026-04-17'::date, '2026-02-01'::date, 'https://www.legifrance.gouv.fr/conv_coll/id/KALITEXT000054091886', null, '2026-09-27');

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054066510'),
(2, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054066511')
)
insert into public.cc_classifications (id, idcc_code, code, label, category, level, step, coefficient, aliases, sort_order, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.code::text, v.label::text, v.category::text, v.level::text, v.step::text, v.coefficient::int, v.aliases::text[], v.sort_order::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('c353ac66-6f2f-5ba9-82e2-88731d1fcf69', 'COEF-155', 'Coefficient 155 (fabrication, vente, services)', 'ouvrier', null, null, 155, array['Coefficient 155','Coef 155']::text[], 0, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('e43c58f3-cb85-5320-8738-92b0c80130d5', 'COEF-160', 'Coefficient 160 (fabrication, vente, services)', 'ouvrier', null, null, 160, array['Coefficient 160','Coef 160']::text[], 1, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('e279bccf-4569-5ad4-bc13-63b14956caa7', 'COEF-165', 'Coefficient 165 (vente)', 'employe', null, null, 165, array['Coefficient 165','Coef 165']::text[], 2, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('816c62c5-9b96-5e9e-802b-5c911abf9775', 'COEF-170', 'Coefficient 170 (fabrication, vente, services)', 'ouvrier', null, null, 170, array['Coefficient 170','Coef 170']::text[], 3, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('2a77cec6-e2cb-5819-a696-c99f952be46c', 'COEF-175', 'Coefficient 175 (fabrication, vente)', 'ouvrier', null, null, 175, array['Coefficient 175','Coef 175']::text[], 4, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('807c326e-d991-5539-94e2-1dcf9a6038ee', 'COEF-180', 'Coefficient 180 (vente)', 'employe', null, null, 180, array['Coefficient 180','Coef 180']::text[], 5, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('bdb33583-1dbb-534f-a17b-1bd76e539c79', 'COEF-185', 'Coefficient 185 (fabrication, vente)', 'ouvrier', null, null, 185, array['Coefficient 185','Coef 185']::text[], 6, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('5d013eff-5187-5f9e-b28f-455ef29e6803', 'COEF-190', 'Coefficient 190 (fabrication, vente)', 'ouvrier', null, null, 190, array['Coefficient 190','Coef 190']::text[], 7, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('63503b52-dea3-5783-941c-01ddb6c8e10a', 'COEF-195', 'Coefficient 195 (fabrication)', 'ouvrier', null, null, 195, array['Coefficient 195','Coef 195']::text[], 8, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('43ce7a91-0c2b-590b-982a-e93cc63ed051', 'COEF-240', 'Coefficient 240 (fabrication)', 'ouvrier', null, null, 240, array['Coefficient 240','Coef 240']::text[], 9, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 1),
('75b690ef-a0ad-5625-b840-80c816e01ae1', 'CADRE-1', 'Cadre 1 (forfait 218 jours)', 'cadre', 'CADRE-1', null, null, array['Cadre 1']::text[], 20, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 2),
('e5e91a3c-bcc0-5a6e-9788-89eedf5e7422', 'CADRE-2', 'Cadre 2 (hors durée légale du travail)', 'cadre', 'CADRE-2', null, null, array['Cadre 2']::text[], 21, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '1978-06-21', null, 2)
) as v(id, code, label, category, level, step, coefficient, aliases, sort_order, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054066510 — Salaire horaire minimum professionnel = valeur du point × coefficient + constante'),
(2, 'Art. 2 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054091891 — Salaire horaire minimum régional, applicable aux entreprises d''Île-de-France'),
(3, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054066511'),
(4, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054091892')
)
insert into public.cc_salary_minimums (id, idcc_code, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.classification_code::text, v.amount::numeric, v.unit::text, v.annual_divisor::int, v.reference_monthly_hours::numeric, v.work_arrangement::text, v.variant::text, v.seniority_min_months::int, v.comparison_base::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('e417def5-ee10-53ca-958a-708a2135e39c', 'COEF-155', 12.41, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('426aca2d-b000-5368-a38c-734a25336204', 'COEF-155', 12.57, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('88db7e88-3f86-5a32-863c-279cb577fcc8', 'COEF-160', 12.53, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('fe1b6457-772c-5dd3-9e4c-172de7359d1f', 'COEF-160', 12.86, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('758eb254-348c-5b97-805c-075a02a8af7b', 'COEF-165', 12.66, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('9b195302-a5f3-55f4-bbc3-2c64e026fe27', 'COEF-165', 13.14, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('c22552ad-7b06-5536-b451-53fbfbaa5206', 'COEF-170', 12.78, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('9a76f332-bf7c-5b7b-8b01-9f6944138cb1', 'COEF-170', 13.43, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('a73ec880-b30f-586f-b47f-9a882a2993c7', 'COEF-175', 12.91, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('2cc3db9a-3f78-5d3f-adbf-f4cab31ee973', 'COEF-175', 13.71, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('97dd2768-f565-54d8-a221-e1a486715be2', 'COEF-180', 13.03, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('0a362336-0e1d-5651-af01-cddb338897b6', 'COEF-180', 14.0, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('53ed0daf-6405-5443-b5ca-7a7bb7b38925', 'COEF-185', 13.31, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('ec236f8c-17a2-579b-a554-a467d01a2de4', 'COEF-185', 14.28, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('25a5a988-a732-5fba-98f3-1a1b723f464f', 'COEF-190', 13.43, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('537453d7-5d71-5dc0-902e-0640d9b4f379', 'COEF-190', 14.57, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('c933ac86-3bda-58c7-89b0-a2ba22c1155a', 'COEF-195', 13.54, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('e09378f5-f86c-5a41-a044-a6fcc4bcb0d3', 'COEF-195', 14.85, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('73cb5070-e72c-5e48-bc95-1c72b28e3e81', 'COEF-240', 14.59, 'horaire', null, null, 'standard', 'national', 0, 'salaire_base', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 1),
('d292bd27-0178-55fb-ba97-2c7e73a4e559', 'COEF-240', 17.42, 'horaire', null, null, 'standard', 'Île-de-France', 0, 'salaire_base', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 2),
('b7910187-84ca-5c55-a16e-da526cc2fc50', 'CADRE-1', 39871, 'annuel', 12, null, 'forfait_jours', 'national', 0, 'remuneration_annuelle', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 3),
('2c0959d3-e6a6-53fc-a0d0-42ce0cdacb3d', 'CADRE-1', 39955, 'annuel', 12, null, 'forfait_jours', 'Île-de-France', 0, 'remuneration_annuelle', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 4),
('8a037266-5aef-5351-984d-8492414e55c5', 'CADRE-2', 57206, 'annuel', 12, null, 'standard', 'national', 0, 'remuneration_annuelle', '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 3),
('2f619eca-b4fa-5240-b555-775ce42053e7', 'CADRE-2', 57328, 'annuel', 12, null, 'standard', 'Île-de-France', 0, 'remuneration_annuelle', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 4)
) as v(id, classification_code, amount, unit, annual_divisor, reference_monthly_hours, work_arrangement, variant, seniority_min_months, comparison_base, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 42 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873202')
)
insert into public.cc_bonuses (id, idcc_code, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.rate_percent::numeric, v.fixed_amount::numeric, v.calculation_base::text, v.payment_months::int[], v.seniority_min_months::int, v.presence_condition::text, v.prorata_rule::text, v.included_in_minimum::boolean, v.minimum_garanti_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('f52904db-2c45-52b9-b790-25ec55197853', 'prime_fin_annee', 'Prime de fin d''année en % du salaire brut de l''année civile', null, null, 4.25, null, 'salaire_brut', array[1]::int[], 12, 'Salarié présent au 31 décembre, 1 an de présence ; payée au plus tard le 15 janvier', 'Prorata pour départ en retraite, préretraite, licenciement économique en cours d''année ; ne se cumule pas avec un avantage de même nature (13e mois partiel, étrennes)', null, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '2024-01-01', '2025-01-01', 1),
('373a29a8-7e5a-5a46-bd64-6c817d51446e', 'prime_fin_annee', 'Prime de fin d''année en % du salaire brut de l''année civile', null, null, 4.5, null, 'salaire_brut', array[1]::int[], 12, 'Salarié présent au 31 décembre, 1 an de présence ; payée au plus tard le 15 janvier', 'Prorata pour départ en retraite, préretraite, licenciement économique en cours d''année ; ne se cumule pas avec un avantage de même nature (13e mois partiel, étrennes)', null, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '2025-01-01', '2026-01-01', 1),
('18f91548-1d2a-57ad-bc8f-983295d84f0e', 'prime_fin_annee', 'Prime de fin d''année en % du salaire brut de l''année civile', null, null, 4.75, null, 'salaire_brut', array[1]::int[], 12, 'Salarié présent au 31 décembre, 1 an de présence ; payée au plus tard le 15 janvier', 'Prorata pour départ en retraite, préretraite, licenciement économique en cours d''année ; ne se cumule pas avec un avantage de même nature (13e mois partiel, étrennes)', null, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '2026-01-01', '2027-01-01', 1),
('62faeef7-988a-5c6d-8e14-d02e577c613f', 'prime_fin_annee', 'Prime de fin d''année en % du salaire brut de l''année civile', null, null, 5.0, null, 'salaire_brut', array[1]::int[], 12, 'Salarié présent au 31 décembre, 1 an de présence ; payée au plus tard le 15 janvier', 'Prorata pour départ en retraite, préretraite, licenciement économique en cours d''année ; ne se cumule pas avec un avantage de même nature (13e mois partiel, étrennes)', null, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '2027-01-01', null, 1)
) as v(id, kind, label, categories, classification_codes, rate_percent, fixed_amount, calculation_base, payment_months, seniority_min_months, presence_condition, prorata_rule, included_in_minimum, minimum_garanti_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 21 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873130 — Temps partiel : 24 h en principe ; dérogations 6 h (moins de 10 salariés, vente et entretien) et 16 h (10 à 20 salariés)'),
(2, 'Art. 3 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054066511')
)
insert into public.cc_working_time (id, idcc_code, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.categories::text[], v.classification_codes::text[], v.work_arrangement::text, v.weekly_hours::numeric, v.monthly_hours::numeric, v.equivalence_weekly_hours::numeric, v.annual_overtime_quota::int, v.forfait_days_max::int, v.forfait_hours_annual::int, v.part_time_min_weekly_hours::numeric, v.part_time_complementary_cap_percent::numeric, v.min_salary_percent_of_minimum::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('8f2eca3d-ebb3-532d-9ab4-e2665788f774', null, null, 'standard', 35, 151.67, null, null, null, null, 6, 33.33, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 1),
('79023090-d812-5242-b6dc-655098f5ea5f', array['cadre']::text[], array['CADRE-1']::text[], 'forfait_jours', null, null, null, null, 218, null, null, null, null, '8aa0ecae-2987-5fdc-b615-ea98a2d196fc', '2026-01-01', null, 2)
) as v(id, categories, classification_codes, work_arrangement, weekly_hours, monthly_hours, equivalence_weekly_hours, annual_overtime_quota, forfait_days_max, forfait_hours_annual, part_time_min_weekly_hours, part_time_complementary_cap_percent, min_salary_percent_of_minimum, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 22 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873132 — Taux légaux (art. L. 3121-36 C. trav.) auxquels la convention renvoie'),
(2, 'Art. 21 C — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873130 — Jusqu''à 1/10e : 10 % (taux légal)'),
(3, 'Art. 23.5 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873134 — Majoration du salaire de base, travailleur de nuit ou non'),
(4, 'Art. 28 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873146 — Sur le salaire horaire de base × heures du dimanche'),
(5, 'Art. 27 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873145')
)
insert into public.cc_pay_increases (id, idcc_code, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.hours_from::numeric, v.hours_to::numeric, v.period::text, v.time_start::time, v.time_end::time, v.rate_percent::numeric, v.fixed_amount::numeric, v.fixed_amount_unit::text, v.compensation::text, v.rest_percent::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('da6a473f-2928-5dd0-ae90-2b58ba390d77', 'heures_supplementaires', 'Heures supplémentaires de la 36e à la 43e heure', null, null, 35, 43, 'semaine', null, null, 25, null, null, 'paiement', null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 1),
('4cbd2f89-25bd-56b9-8bbd-8671a593e5c2', 'heures_supplementaires', 'Heures supplémentaires au-delà de la 43e heure', null, null, 43, null, 'semaine', null, null, 50, null, null, 'paiement', null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 1),
('c0c35dd4-e9ec-5dfb-9086-2409520b6493', 'heures_complementaires', 'Heures complémentaires au-delà de 1/10e (dans la limite de 1/3)', null, null, null, null, null, null, null, 25, null, null, 'paiement', null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 2),
('01a55495-4d0c-5f95-9931-499ebc6bfbff', 'nuit', 'Heures de travail entre 20 h et 6 h (tout salarié)', null, null, null, null, null, '20:00', '06:00', 25, null, null, 'paiement', null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 3),
('32e88f09-ba3b-5830-8a4e-cdeb71504b98', 'dimanche', 'Travail le dimanche', null, null, null, null, null, null, null, 20, null, null, 'paiement', null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('73e4b0b5-a473-5388-bc1e-a26e7265bad6', 'jour_ferie', 'Jour férié complémentaire travaillé : salaire doublé', null, null, null, null, null, null, null, 100, null, null, 'paiement', null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 5)
) as v(id, kind, label, categories, classification_codes, hours_from, hours_to, period, time_start, time_end, rate_percent, fixed_amount, fixed_amount_unit, compensation, rest_percent, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 24 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873139')
)
insert into public.cc_allowances (id, idcc_code, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.zone::text, v.amount::numeric, v.unit::text, v.minimum_garanti_percent::numeric, v.conditions::text, v.social_exemption_limit::numeric, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('f6c85213-5804-569e-b27e-31d08eb3b7b3', 'repas', 'Indemnité journalière pour frais professionnels (ouvriers boulangers et pâtissiers non nourris)', array['ouvrier']::text[], null, null, null, 'par_jour', 150, '1,5 fois le minimum garanti au 1er janvier de l''année', null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 1)
) as v(id, kind, label, categories, classification_codes, zone, amount, unit, minimum_garanti_percent, conditions, social_exemption_limit, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 37 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873167 — Salaire brut limité au plafond de la sécurité sociale ; intégralement à la charge de l''employeur'),
(2, 'Art. 37 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873167 — Intégralement à la charge de l''employeur'),
(3, 'Art. 37 bis — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873172'),
(4, 'Art. 37 ter — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873178 — 60 % employeur / 40 % salarié')
)
insert into public.cc_contributions (id, idcc_code, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.kind::text, v.label::text, v.organism::text, v.designation::text, v.categories::text[], v.classification_codes::text[], v.base::text, v.total_rate_percent::numeric, v.employer_rate_percent::numeric, v.employee_rate_percent::numeric, v.employer_fixed_amount::numeric, v.employee_fixed_amount::numeric, v.employer_min_share_percent::numeric, v.mandatory::boolean, v.company_size_min::int, v.company_size_max::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('7237d73c-f56c-5cb1-901b-e2e119084976', 'prevoyance', 'Maintien de salaire (mensualisation) — cotisation patronale', null, null, null, null, 'tranche_a', null, 0.73, null, null, null, null, true, null, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 1),
('ecd804b6-d54c-54a4-b016-fdf935752bc3', 'prevoyance', 'Incapacité de travail (à partir du 181e jour)', null, null, null, null, 'tranche_a', null, 0.22, null, null, null, null, true, null, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 2),
('78713d4d-ae9c-51b3-9ea9-7aa3539d22c5', 'fonds_branche', 'Fonds de péréquation et FAPS', 'AG2R Prévoyance', null, null, null, 'tranche_a', null, 0.37, null, null, null, null, true, null, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 3),
('ee884a8d-761e-533b-a759-09c94803eb40', 'prevoyance', 'Décès, invalidité permanente et totale, frais d''obsèques', null, null, null, null, 'tranche_a', 0.14, null, null, null, null, 60, true, null, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4)
) as v(id, kind, label, organism, designation, categories, classification_codes, base, total_rate_percent, employer_rate_percent, employee_rate_percent, employer_fixed_amount, employee_fixed_amount, employer_min_share_percent, mandatory, company_size_min, company_size_max, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 30 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873148 — Indemnité de 1,92 % des salaires bruts de l''année civile précédente ; moins d''un an : 1 jour par 2 mois de présence'),
(2, 'Art. 27 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873145'),
(3, 'Art. 29 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873147'),
(4, 'Art. 31 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873149')
)
insert into public.cc_leave_rules (id, idcc_code, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.kind::text, v.event::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.days::numeric, v.day_type::text, v.paid::boolean, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('b45d4caf-f8fe-5f19-8890-2d6f832ac70b', 'conges_supplementaires', null, 'Semaine de congé supplémentaire (6 jours ouvrables à prendre du 15 janvier au 1er mai)', null, null, 12, 6, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 1),
('63bcd648-20e4-5b9b-bc4c-e62c5ff4e054', 'conges_supplementaires', null, 'Jours fériés (en plus du 1er mai) fixés paritairement au niveau local', null, null, 0, 10, 'calendaires', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 2),
('f1919b15-5e68-5730-aed2-8fecb034c6a0', 'fractionnement', null, 'Fractionnement : au moins 6 jours pris hors 1er mai - 31 octobre', null, null, 0, 2, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 3),
('912f7d02-aed2-5244-a417-6b92f403d679', 'fractionnement', null, 'Fractionnement : 3 à 5 jours pris hors 1er mai - 31 octobre', null, null, 0, 1, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 3),
('08e272da-1717-5ca0-a951-e99c3f90687e', 'evenement_familial', 'Mariage du salarié', 'Mariage du salarié', null, null, 0, 6, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('afb06bc9-6547-5d5a-b158-b3150b89715d', 'evenement_familial', 'Conclusion d''un Pacs', 'Conclusion d''un Pacs', null, null, 0, 6, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('5f80c5cb-7949-5d38-a1a5-b9117edcd20d', 'evenement_familial', 'Naissance ou adoption', 'Naissance ou adoption', null, null, 0, 3, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('bbe5f775-5c9d-53d6-8fba-796957adb22d', 'evenement_familial', 'Annonce d''un handicap, d''une pathologie chronique ou d''un cancer chez un enfant', 'Annonce d''un handicap, d''une pathologie chronique ou d''un cancer chez un enfant', null, null, 0, 5, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('35632764-566e-5afb-a62d-313897d9644c', 'evenement_familial', 'Mariage d''un enfant', 'Mariage d''un enfant', null, null, 0, 1, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('1d03fb00-07bd-5b80-b1d7-98768465a6cb', 'evenement_familial', 'Décès d''un enfant', 'Décès d''un enfant', null, null, 0, 14, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('98f9ab21-9bde-5075-8d4e-cf14ba7cfe69', 'evenement_familial', 'Congé de deuil (décès d''un enfant)', 'Congé de deuil (décès d''un enfant)', null, null, 0, 8, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('ae56a0a6-628d-5db0-a4c7-05294132c3d1', 'evenement_familial', 'Décès du conjoint, partenaire de Pacs, concubin, père, mère, beaux-parents, frère ou sœur', 'Décès du conjoint, partenaire de Pacs, concubin, père, mère, beaux-parents, frère ou sœur', null, null, 0, 3, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('d2c5b068-68b4-5e78-bcdd-084c78f65323', 'evenement_familial', 'Décès d''un grand-parent', 'Décès d''un grand-parent', null, null, 0, 1, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4),
('870b13a9-efcf-5688-8a1f-be076f0512f7', 'evenement_familial', 'Présélection militaire (maximum)', 'Présélection militaire (maximum)', null, null, 0, 3, 'ouvrables', true, '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 4)
) as v(id, kind, event, label, categories, classification_codes, seniority_min_months, days, day_type, paid, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 37 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873167 — 90 % du salaire brut moyen des 3 derniers mois (hors primes exceptionnelles), dans la limite du salaire net ; 180 jours d''indemnisation par année civile ; financé par la cotisation patronale de 0,73 % ; dès le 1er jour, sans condition d''ancienneté'),
(2, 'Art. 37 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873167 — 90 % du salaire brut moyen des 3 derniers mois (hors primes exceptionnelles), dans la limite du salaire net ; 180 jours d''indemnisation par année civile ; financé par la cotisation patronale de 0,73 % ; ancienneté d''un an dans la profession ; à partir du 8e jour (4e jour pour une ALD ou un accident de la vie privée de plus de 45 jours)')
)
insert into public.cc_sick_pay (id, idcc_code, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.absence_type::text, v.categories::text[], v.classification_codes::text[], v.seniority_min_months::int, v.waiting_days::int, v.sequence::int, v.duration_days::int, v.rate_percent::numeric, v.rate_base::text, v.ijss_deducted::boolean, v.reference_period_months::int, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('5b3d0533-7ba1-5fcc-a2cc-36d8986be081', 'accident_travail', null, null, 0, 0, 1, 180, 90, 'brut', true, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '2011-12-29', null, 1),
('b0c8161c-0899-56f4-872c-a6ce41c213fa', 'accident_trajet', null, null, 0, 0, 1, 180, 90, 'brut', true, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '2011-12-29', null, 1),
('f5fbf09c-84db-5fea-a49b-649a9713367b', 'maladie_professionnelle', null, null, 0, 0, 1, 180, 90, 'brut', true, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '2011-12-29', null, 1),
('332cf20a-7fda-5f65-9d65-adb8e22f1626', 'maladie', null, null, 12, 7, 1, 180, 90, 'brut', true, null, '8569a953-fd4e-5b10-90c2-706eff1d9278', '2011-12-29', null, 2)
) as v(id, absence_type, categories, classification_codes, seniority_min_months, waiting_days, sequence, duration_days, rate_percent, rate_base, ijss_deducted, reference_period_months, src, vf, vt, nk)
left join n on n.k = v.nk;

with n(k, t) as (values
(1, 'Art. 23.6 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873134'),
(2, 'Art. 29 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000005873147'),
(3, 'Art. 1 — https://www.legifrance.gouv.fr/conv_coll/article/KALIARTI000054091890')
)
insert into public.cc_other_rules (id, idcc_code, kind, label, categories, classification_codes, value, unit, description, source_text_id, valid_from, valid_to, notes, verified_at)
select v.id::uuid, '843', v.kind::text, v.label::text, v.categories::text[], v.classification_codes::text[], v.value::numeric, v.unit::text, v.description::text, v.src::uuid, v.vf::date, v.vt::date, n.t, date '2026-09-27'
from (values
('c28715e5-337d-541d-84b1-8cea5cb9d0ac', 'repos_travailleur_nuit', 'Travailleur de nuit : jours de repos compensateur', null, null, null, null, '1 journée de repos si au moins 270 h de nuit dans l''année civile, 2 journées au-delà de 600 h (prorata en cas d''entrée ou sortie) ; à prendre dans les 3 mois', '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 1),
('2cb09000-c9ac-532d-a812-1a18a0382b46', 'indemnite_conges_payes', 'Indemnité de congés payés : 9,03 % des salaires bruts de la période', null, null, 9.03, 'pourcent', 'Sous réserve de la règle légale du maintien de salaire si plus favorable', '8569a953-fd4e-5b10-90c2-706eff1d9278', '1978-06-21', null, 2),
('10699b95-d06e-577a-aeb2-5de6273b15f7', 'salaires_regionaux', 'Grilles régionales ou départementales', null, null, null, null, 'Des minima régionaux (Île-de-France) ou départementaux (Bouches-du-Rhône) plus élevés peuvent s''appliquer selon le lieu de l''entreprise ; seule la grille Île-de-France est saisie', '1051f157-239d-5e7c-83fa-c5339ab00cde', '2026-02-01', null, 3)
) as v(id, kind, label, categories, classification_codes, value, unit, description, src, vf, vt, nk)
left join n on n.k = v.nk;
