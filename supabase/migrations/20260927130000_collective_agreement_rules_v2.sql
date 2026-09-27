-- Compléments au référentiel des conventions collectives, apparus lors du
-- relevé des 11 premières conventions (textes KALI / Légifrance) :
-- - modalité de temps de travail et rémunération minimale en % du minimum
--   conventionnel (forfaits jours / heures, « modalité 2 » Syntec…) ;
-- - taux global de cotisation quand la convention ne fixe que la répartition ;
-- - montants exprimés en pourcentage du minimum garanti (MG) ;
-- - unités d'indemnité « par heure » et « par course » ;
-- - table cc_other_rules pour les règles de contrôle qui n'entrent dans
--   aucune autre famille (assiette du minimum, mentions du bulletin…).

-- 1. Durée du travail ----------------------------------------------------------
alter table public.cc_working_time
  add column work_arrangement text not null default 'standard'
    check (work_arrangement in ('standard', 'forfait_heures', 'forfait_jours', 'modalite_2', 'modalite_3')),
  add column min_salary_percent_of_minimum numeric(6, 2);  -- ex. 120 = 120 % du minimum conventionnel

-- 2. Cotisations : taux global -------------------------------------------------
alter table public.cc_contributions
  add column total_rate_percent numeric(7, 4);

-- 3. Primes : base « indemnité de congés payés » et montants en % du MG --------
alter table public.cc_bonuses
  drop constraint cc_bonuses_calculation_base_check,
  add constraint cc_bonuses_calculation_base_check check (calculation_base in (
    'salaire_base', 'salaire_brut', 'minimum_conventionnel', 'salaire_mensuel_moyen', 'forfait', 'indemnite_conges_payes'
  )),
  add column minimum_garanti_percent numeric(7, 2);          -- ex. 80 = 80 % du minimum garanti

-- 4. Indemnités : montant facultatif si exprimé en % du MG, nouvelles unités ---
alter table public.cc_allowances
  alter column amount drop not null,
  add column minimum_garanti_percent numeric(7, 2),
  drop constraint cc_allowances_unit_check,
  add constraint cc_allowances_unit_check check (unit in (
    'par_repas', 'par_jour', 'par_nuit', 'par_semaine', 'par_mois', 'par_km', 'par_heure', 'par_course', 'forfait'
  )),
  add constraint cc_allowances_amount_or_mg check (amount is not null or minimum_garanti_percent is not null);

-- 5. Autres règles de contrôle -------------------------------------------------
create table public.cc_other_rules (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  kind text not null,                -- identifiant stable de la règle, ex. « assiette_minimum »
  label text not null,
  categories text[] check (public.cc_valid_categories(categories)),
  classification_codes text[],
  value numeric(14, 4),
  unit text,                         -- pourcent, euros_par_mois, minutes…
  description text,
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_to is null or valid_to > valid_from)
);

create index cc_other_rules_idcc_idx on public.cc_other_rules (idcc_code, valid_from);
create index cc_other_rules_source_idx on public.cc_other_rules (source_text_id);
create trigger cc_other_rules_touch_updated_at before update on public.cc_other_rules
  for each row execute function public.cc_touch_updated_at();

alter table public.cc_other_rules enable row level security;
create policy cc_other_rules_select on public.cc_other_rules for select to authenticated using (true);
create policy cc_other_rules_staff_insert on public.cc_other_rules for insert to authenticated with check ((select public.is_staff()));
create policy cc_other_rules_staff_update on public.cc_other_rules for update to authenticated using ((select public.is_staff())) with check ((select public.is_staff()));
create policy cc_other_rules_staff_delete on public.cc_other_rules for delete to authenticated using ((select public.is_staff()));
revoke all on public.cc_other_rules from anon;
