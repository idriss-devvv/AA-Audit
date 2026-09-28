-- Arrêts de travail : indemnités journalières de la Sécurité sociale et
-- maintien de salaire légal (paramètres réglementaires datés).
insert into public.regulatory_parameters (key, label, value, unit, valid_from, valid_to, source, notes) values
('ijss.taux', 'IJSS maladie : part du salaire journalier de base', 50, 'pourcent', '2015-01-01', null,
  'Code de la sécurité sociale, art. R323-5', null),
('ijss.diviseur', 'IJSS maladie : diviseur des 3 derniers salaires', 91.25, 'coefficient', '2015-01-01', null,
  'Code de la sécurité sociale, art. R323-4', 'Salaire journalier de base = salaires bruts des 3 mois précédant l''arrêt / 91,25'),
('ijss.plafond_smic', 'IJSS maladie : plafond du salaire retenu (nombre de SMIC mensuels)', 1.8, 'smic', '2015-01-01', '2025-04-01',
  'Code de la sécurité sociale, art. R323-4', null),
('ijss.plafond_smic', 'IJSS maladie : plafond du salaire retenu (nombre de SMIC mensuels)', 1.4, 'smic', '2025-04-01', null,
  'Code de la sécurité sociale, art. R323-4 (décret n° 2025-160 du 20 février 2025)', 'Arrêts débutant à compter du 1er avril 2025'),
('ijss.carence', 'IJSS maladie : délai de carence (jours)', 3, 'jours', '2015-01-01', null,
  'Code de la sécurité sociale, art. R323-1', 'Pas de carence en accident du travail / maladie professionnelle'),
('maintien.anciennete_mois', 'Maintien de salaire légal : ancienneté requise (mois)', 12, 'mois', '2008-06-27', null,
  'Code du travail, art. L1226-1', null),
('maintien.carence', 'Maintien de salaire légal : délai de carence (jours)', 7, 'jours', '2008-06-27', null,
  'Code du travail, art. D1226-3', 'Pas de carence en accident du travail / maladie professionnelle'),
('maintien.taux_1', 'Maintien de salaire légal : 1re période (% de la rémunération brute)', 90, 'pourcent', '2008-06-27', null,
  'Code du travail, art. D1226-1', '30 jours, allongés de 10 jours par période de 5 ans d''ancienneté au-delà d''un an (90 jours maximum)'),
('maintien.taux_2', 'Maintien de salaire légal : 2e période (% de la rémunération brute)', 66.66, 'pourcent', '2008-06-27', null,
  'Code du travail, art. D1226-1', '30 jours, allongés de 10 jours par période de 5 ans d''ancienneté au-delà d''un an (90 jours maximum)')
on conflict (key, valid_from) do nothing;
