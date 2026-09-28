-- Registre des conventions collectives aligné sur le cahier des charges V1 :
-- les 20 conventions prioritaires (21 codes IDCC, le bâtiment ouvriers ayant
-- deux IDCC selon l'effectif). Les conventions hors liste sont retirées avec
-- leurs critères (suppression en cascade des tables cc_*).
--
-- Liste du cahier des charges : Prévention et sécurité 1351, Immobilier 1527,
-- HCR 1979, Bâtiment ouvriers 1596 / 1597, Bâtiment ETAM 2609, Bâtiment cadres
-- 2420, Travaux publics ouvriers 1702, Travaux publics ETAM 2614, Commerce de
-- gros 573, Commerce de détail alimentaire 2216, Commerce de détail non
-- alimentaire 1517, Syntec 1486, Transports routiers 16, Métallurgie 3248,
-- Banque 2120, Assurances 1672, Industrie pharmaceutique 176, Pharmacie
-- d'officine 1996, Services de l'automobile 1090, Propreté 3043.

-- 1. Conventions hors liste : Restauration rapide (1501), Boulangerie (843),
--    Experts-comptables (787), Enseignement privé (3211).
delete from public.collective_agreements where idcc_code in ('1501', '843', '787', '3211');

-- 2. Conventions ajoutées (effectifs couverts : base KALI / DARES).
insert into public.collective_agreements (idcc_code, name, sector, coverage_note, verified_at) values
('1351', 'Entreprises de prévention et de sécurité', 'Sécurité privée', '~160 800 salariés couverts', '2026-09-28'),
('2420', 'Bâtiment — cadres', 'BTP', '~69 200 salariés couverts ; convention non étendue', '2026-09-28'),
('1702', 'Travaux publics — ouvriers', 'BTP', '~164 900 salariés couverts ; salaires minima régionaux', '2026-09-28'),
('2614', 'Travaux publics — ETAM (employés, techniciens, agents de maîtrise)', 'BTP', '~83 600 salariés couverts ; salaires minima régionaux', '2026-09-28'),
('1517', 'Commerces de détail non alimentaires', 'Commerce de détail non alimentaire', '~97 300 salariés couverts', '2026-09-28'),
('1672', 'Sociétés d''assurances', 'Assurance', '~140 700 salariés couverts', '2026-09-28'),
('176', 'Industrie pharmaceutique', 'Industrie pharmaceutique', '~129 100 salariés couverts', '2026-09-28'),
('1996', 'Pharmacie d''officine', 'Pharmacie', '~119 200 salariés couverts', '2026-09-28')
on conflict (idcc_code) do update set name = excluded.name, sector = excluded.sector, coverage_note = excluded.coverage_note, verified_at = excluded.verified_at;

-- 3. Conventions déjà au registre, sans critères jusqu'ici : libellés mis à jour.
update public.collective_agreements set coverage_note = '~282 300 salariés couverts ; salaires minima régionaux', verified_at = '2026-09-28' where idcc_code = '1596';
update public.collective_agreements set coverage_note = '~257 300 salariés couverts ; salaires minima régionaux', verified_at = '2026-09-28' where idcc_code = '1597';
update public.collective_agreements set coverage_note = '~140 100 salariés couverts ; salaires minima régionaux', verified_at = '2026-09-28' where idcc_code = '2609';
update public.collective_agreements set coverage_note = '~679 500 salariés couverts ; barèmes voyageurs et marchandises', verified_at = '2026-09-28' where idcc_code = '16';
