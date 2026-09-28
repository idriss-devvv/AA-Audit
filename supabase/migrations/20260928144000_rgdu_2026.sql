-- 2026 : les réductions de taux maladie et allocations familiales sont fusionnées dans la
-- réduction générale dégressive unique (RGDU, CSS art. L241-13 et D241-7).
update public.regulatory_parameters set valid_to = '2026-01-01', notes = coalesce(notes || ' ; ', '') || 'Supprimé au 1er janvier 2026 : intégré à la réduction générale dégressive unique (CSS art. L241-13)'
where key in ('maladie.taux_reduit', 'maladie.seuil_smic', 'famille.taux_reduit', 'famille.seuil_smic') and valid_to is null;

insert into public.regulatory_parameters (key, label, value, unit, valid_from, valid_to, source, notes) values
('rgdu.tmin', 'Réduction générale dégressive unique : T min', 0.02, 'coefficient', '2026-01-01', null, 'Code de la sécurité sociale, art. D241-7 (décret n° 2026-509 du 12 juin 2026)', null),
('rgdu.tdelta_fnal_010', 'RGDU : T delta (FNAL 0,10 %, moins de 50 salariés)', 0.3781, 'coefficient', '2026-01-01', null, 'Code de la sécurité sociale, art. D241-7 (décret n° 2026-509 du 12 juin 2026)', 'Version du 15 juin 2026, applicable au calcul au titre de 2026'),
('rgdu.tdelta_fnal_050', 'RGDU : T delta (FNAL 0,50 %, 50 salariés et plus)', 0.3821, 'coefficient', '2026-01-01', null, 'Code de la sécurité sociale, art. D241-7 (décret n° 2026-509 du 12 juin 2026)', 'Version du 15 juin 2026, applicable au calcul au titre de 2026'),
('rgdu.exposant', 'RGDU : exposant P', 1.75, 'coefficient', '2026-01-01', null, 'Code de la sécurité sociale, art. D241-7', null),
('rgdu.seuil_smic', 'RGDU : seuil d''éligibilité (nombre de SMIC)', 3, 'smic', '2026-01-01', null, 'Code de la sécurité sociale, art. L241-13 et D241-7', null),
('rgdu.smic_horaire', 'RGDU : SMIC horaire retenu pour le calcul', 12.02, 'euros', '2026-01-01', null, 'Code de la sécurité sociale, art. D241-7 (SMIC applicable au 1er janvier 2026, décret n° 2026-509)', 'La revalorisation du 1er juin 2026 n''est pas retenue pour la RGDU 2026')
on conflict (key, valid_from) do nothing;
