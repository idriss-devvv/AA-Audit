-- Paramètres réglementaires datés (cahier des charges V1 : « contrôle mutuelle
-- intégrant le suivi des évolutions réglementaires et légales, changements
-- pouvant intervenir par mois ou par an »). Chaque valeur a une date d'effet :
-- une fiche est contrôlée avec la valeur en vigueur à sa période. Le
-- back-office ajoute une nouvelle ligne datée à chaque évolution.
create table if not exists public.regulatory_parameters (
  id uuid primary key default gen_random_uuid(),
  key text not null,
  label text not null,
  value numeric(14, 4) not null,
  unit text not null,
  valid_from date not null,
  valid_to date,
  source text not null,
  notes text,
  updated_at timestamptz not null default now(),
  unique (key, valid_from),
  check (valid_to is null or valid_to > valid_from)
);

create index if not exists regulatory_parameters_key_idx on public.regulatory_parameters (key, valid_from desc);

alter table public.regulatory_parameters enable row level security;
drop policy if exists regulatory_parameters_select on public.regulatory_parameters;
create policy regulatory_parameters_select on public.regulatory_parameters for select to authenticated using (true);
drop policy if exists regulatory_parameters_staff_write on public.regulatory_parameters;
create policy regulatory_parameters_staff_write on public.regulatory_parameters for all to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));
grant select, insert, update, delete on public.regulatory_parameters to authenticated;

insert into public.regulatory_parameters (key, label, value, unit, valid_from, valid_to, source, notes) values
('sante.part_employeur_min', 'Complémentaire santé : part patronale minimale', 50, 'pourcent', '2016-01-01', null,
  'Code de la sécurité sociale, art. L911-7 (loi n° 2013-504 du 14 juin 2013)', 'Au moins 50 % de la cotisation du panier de soins minimal, sauf dispense du salarié'),
('prevoyance.cadres_taux_min_t1', 'Prévoyance des cadres : cotisation patronale minimale sur la tranche 1', 1.5, 'pourcent', '2018-01-01', null,
  'ANI du 17 novembre 2017 relatif à la prévoyance des cadres, art. 7 (ex-art. 7 de la CCN du 14 mars 1947)', 'Affectée par priorité à la couverture décès'),
('maladie.taux_plein', 'Assurance maladie : taux patronal plein', 13, 'pourcent', '2019-01-01', null,
  'Code de la sécurité sociale, art. D242-3', null),
('maladie.taux_reduit', 'Assurance maladie : taux patronal réduit', 7, 'pourcent', '2019-01-01', null,
  'Code de la sécurité sociale, art. D242-3', 'Rémunérations jusqu''au seuil (en SMIC annuel)'),
('maladie.seuil_smic', 'Assurance maladie : seuil du taux réduit (nombre de SMIC)', 2.5, 'smic', '2019-01-01', '2025-01-01',
  'Code de la sécurité sociale, art. L241-2-1 et D242-3', null),
('maladie.seuil_smic', 'Assurance maladie : seuil du taux réduit (nombre de SMIC)', 2.25, 'smic', '2025-01-01', null,
  'Code de la sécurité sociale, art. L241-2-1 et D242-3 (seuil abaissé au 1er janvier 2025)', null),
('famille.taux_plein', 'Allocations familiales : taux patronal plein', 5.25, 'pourcent', '2016-04-01', null,
  'Code de la sécurité sociale, art. D241-3-1', null),
('famille.taux_reduit', 'Allocations familiales : taux patronal réduit', 3.45, 'pourcent', '2016-04-01', null,
  'Code de la sécurité sociale, art. L241-6-1 et D241-3-1', 'Rémunérations jusqu''au seuil (en SMIC annuel)'),
('famille.seuil_smic', 'Allocations familiales : seuil du taux réduit (nombre de SMIC)', 3.5, 'smic', '2016-04-01', null,
  'Code de la sécurité sociale, art. L241-6-1', null)
on conflict (key, valid_from) do nothing;

-- Taux accident du travail / maladie professionnelle notifié à l'entreprise (CARSAT).
alter table public.company_pay_settings add column if not exists at_mp_rate_percent numeric(6, 3);
