-- Référentiel des critères de vérification des conventions collectives.
--
-- Une table par famille de critères, toutes rattachées au registre
-- `collective_agreements` (idcc_code). Les tables sont créées vides : elles
-- seront alimentées convention par convention, à partir des textes Légifrance.
--
-- Principes communs à toutes les tables de règles :
-- - chaque ligne est datée (`valid_from` / `valid_to`, fin exclue, null = en
--   vigueur) : une fiche est contrôlée avec les règles en vigueur à sa période ;
-- - `source_text_id` renvoie au texte (accord, avenant) dont la valeur est
--   tirée, `verified_at` à la date du relevé ;
-- - le périmètre est restreint par `categories` (catégories de salariés) et/ou
--   `classification_codes` (niveaux de la grille) ; null = tous les salariés.
--
-- Critères couverts (un par table) :
--   cc_texts              textes sources (texte de base, avenants, accords)
--   cc_classifications    grille de classification (niveaux, échelons, coefficients)
--   cc_salary_minimums    salaires minima par niveau
--   cc_seniority_bonuses  prime d'ancienneté (paliers)
--   cc_bonuses            13e mois, primes annuelles, vacances, fin d'année…
--   cc_working_time       durée de référence, équivalences, forfaits, contingent, temps partiel
--   cc_pay_increases      majorations : heures sup, complémentaires, nuit, dimanche, fériés…
--   cc_allowances         indemnités et frais : repas, déplacement, outillage, salissure…
--   cc_contributions      cotisations de branche : prévoyance, mutuelle, formation, CFA…
--   cc_leave_rules        congés supplémentaires, fractionnement, événements familiaux
--   cc_sick_pay           maintien de salaire : maladie, accident du travail, maternité

-- 0. Catégories de salariés (valeurs admises dans `categories`) ------------------
create or replace function public.cc_valid_categories(p_categories text[])
returns boolean language sql immutable set search_path = public as $$
  select p_categories is null or p_categories <@ array[
    'ouvrier', 'employe', 'technicien', 'agent_maitrise', 'cadre',
    'ouvrier_roulant', 'sedentaire', 'apprenti', 'vrp'
  ]::text[]
$$;

-- 1. Textes sources ------------------------------------------------------------
create table public.cc_texts (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  kind text not null check (kind in ('texte_base', 'avenant_salaires', 'avenant', 'accord', 'annexe', 'protocole')),
  title text not null,
  reference text,                    -- n° d'avenant, identifiant KALI
  signed_at date,
  extension_published_at date,       -- arrêté d'extension (JORF)
  effective_from date,
  source_url text not null,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 2. Classifications -----------------------------------------------------------
create table public.cc_classifications (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  code text not null,                -- code normalisé, ex. « ETAM-310 », « IV-2 », « 138M »
  label text not null,
  category text check (category is null or public.cc_valid_categories(array[category])),
  level text,
  step text,                         -- échelon
  coefficient int,
  aliases text[],                    -- écritures possibles sur une fiche de paie
  sort_order int,
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (idcc_code, code),
  check (valid_to is null or valid_to > valid_from)
);

-- 3. Salaires minima -----------------------------------------------------------
create table public.cc_salary_minimums (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null,
  classification_code text not null,
  amount numeric(12, 4) not null check (amount > 0),
  unit text not null check (unit in ('horaire', 'mensuel', 'annuel')),
  annual_divisor int check (annual_divisor in (12, 13, 14)),   -- minimum annuel → mensuel
  reference_monthly_hours numeric(6, 2),                       -- base horaire du minimum mensuel
  work_arrangement text not null default 'standard'
    check (work_arrangement in ('standard', 'forfait_heures', 'forfait_jours', 'modalite_2', 'modalite_3')),
  variant text,                                                -- colonne A/B, zone géographique…
  seniority_min_months int not null default 0 check (seniority_min_months >= 0),
  comparison_base text not null default 'salaire_base'
    check (comparison_base in ('salaire_base', 'salaire_brut', 'remuneration_annuelle')),
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  foreign key (idcc_code, classification_code)
    references public.cc_classifications (idcc_code, code) on delete cascade,
  check (valid_to is null or valid_to > valid_from),
  check (unit <> 'annuel' or annual_divisor is not null)
);

-- 4. Prime d'ancienneté --------------------------------------------------------
create table public.cc_seniority_bonuses (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  categories text[] check (public.cc_valid_categories(categories)),
  classification_codes text[],
  seniority_min_months int not null check (seniority_min_months >= 0),
  rate_percent numeric(6, 3),
  fixed_amount numeric(12, 2),
  calculation_base text not null
    check (calculation_base in ('minimum_conventionnel', 'salaire_base', 'salaire_brut', 'point', 'forfait')),
  prorata_working_time boolean not null default true,
  seniority_definition text,         -- ancienneté entreprise / branche / métier
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_to is null or valid_to > valid_from),
  check (rate_percent is not null or fixed_amount is not null)
);

-- 5. 13e mois et primes conventionnelles ---------------------------------------
create table public.cc_bonuses (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  kind text not null
    check (kind in ('treizieme_mois', 'prime_annuelle', 'prime_vacances', 'prime_fin_annee', 'prime_panier', 'prime_habillage', 'autre')),
  label text not null,
  categories text[] check (public.cc_valid_categories(categories)),
  classification_codes text[],
  rate_percent numeric(6, 3),
  fixed_amount numeric(12, 2),
  calculation_base text
    check (calculation_base in ('salaire_base', 'salaire_brut', 'minimum_conventionnel', 'salaire_mensuel_moyen', 'forfait')),
  payment_months int[],              -- mois de versement (1-12)
  seniority_min_months int not null default 0 check (seniority_min_months >= 0),
  presence_condition text,           -- présence à la date de versement…
  prorata_rule text,                 -- prorata entrée/sortie, absences…
  included_in_minimum boolean,       -- entre dans l'assiette de comparaison au minimum
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_to is null or valid_to > valid_from),
  check (payment_months is null or payment_months <@ array[1,2,3,4,5,6,7,8,9,10,11,12])
);

-- 6. Durée du travail ----------------------------------------------------------
create table public.cc_working_time (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  categories text[] check (public.cc_valid_categories(categories)),
  classification_codes text[],
  weekly_hours numeric(5, 2),                 -- durée de référence
  monthly_hours numeric(6, 2),
  equivalence_weekly_hours numeric(5, 2),     -- heures d'équivalence (transport, HCR…)
  annual_overtime_quota int,                  -- contingent annuel d'heures sup
  forfait_days_max int,                       -- plafond du forfait jours
  forfait_hours_annual int,
  part_time_min_weekly_hours numeric(5, 2),
  part_time_complementary_cap_percent numeric(5, 2),  -- plafond des heures complémentaires
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_to is null or valid_to > valid_from)
);

-- 7. Majorations ---------------------------------------------------------------
create table public.cc_pay_increases (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  kind text not null check (kind in (
    'heures_supplementaires', 'heures_complementaires', 'nuit', 'dimanche',
    'jour_ferie', 'premier_mai', 'astreinte', 'equivalence', 'autre'
  )),
  label text,
  categories text[] check (public.cc_valid_categories(categories)),
  classification_codes text[],
  hours_from numeric(6, 2),          -- tranche : à partir de la Xe heure (semaine, ou mois selon period)
  hours_to numeric(6, 2),
  period text check (period in ('jour', 'semaine', 'mois', 'annee')),
  time_start time,                   -- plage horaire (travail de nuit)
  time_end time,
  rate_percent numeric(6, 2),
  fixed_amount numeric(12, 2),
  fixed_amount_unit text check (fixed_amount_unit in ('heure', 'jour', 'nuit', 'mois', 'intervention')),
  compensation text not null default 'paiement'
    check (compensation in ('paiement', 'repos', 'paiement_ou_repos', 'paiement_et_repos')),
  rest_percent numeric(6, 2),        -- repos compensateur en % du temps travaillé
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_to is null or valid_to > valid_from),
  check (rate_percent is not null or fixed_amount is not null or rest_percent is not null)
);

-- 8. Indemnités et frais -------------------------------------------------------
create table public.cc_allowances (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  kind text not null check (kind in (
    'repas', 'repas_unique', 'casse_croute', 'panier', 'grand_deplacement', 'petit_deplacement',
    'decouche', 'transport', 'outillage', 'salissure', 'habillage', 'vetement', 'teletravail', 'autre'
  )),
  label text not null,
  categories text[] check (public.cc_valid_categories(categories)),
  classification_codes text[],
  zone text,                         -- zone de déplacement, distance…
  amount numeric(12, 2) not null check (amount >= 0),
  unit text not null check (unit in ('par_repas', 'par_jour', 'par_nuit', 'par_semaine', 'par_mois', 'par_km', 'forfait')),
  conditions text,                   -- amplitude, horaires, distance…
  social_exemption_limit numeric(12, 2),  -- plafond d'exonération URSSAF correspondant
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_to is null or valid_to > valid_from)
);

-- 9. Cotisations de branche ----------------------------------------------------
create table public.cc_contributions (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  kind text not null check (kind in (
    'prevoyance', 'mutuelle', 'retraite_supplementaire', 'formation', 'paritarisme',
    'fonds_branche', 'cfa_transport', 'conges_payes_caisse', 'intemperies', 'autre'
  )),
  label text not null,
  organism text,                     -- organisme désigné ou recommandé
  designation text check (designation in ('designe', 'recommande', 'libre')),
  categories text[] check (public.cc_valid_categories(categories)),
  classification_codes text[],
  base text not null check (base in (
    'salaire_brut', 'tranche_a', 'tranche_b', 'tranche_c', 'tranche_1', 'tranche_2', 'pmss', 'forfait', 'masse_salariale'
  )),
  employer_rate_percent numeric(7, 4),
  employee_rate_percent numeric(7, 4),
  employer_fixed_amount numeric(12, 2),
  employee_fixed_amount numeric(12, 2),
  employer_min_share_percent numeric(5, 2),  -- part employeur minimale (ex. 50 % mutuelle)
  mandatory boolean not null default true,
  company_size_min int,              -- effectif à partir duquel la cotisation s'applique
  company_size_max int,
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_to is null or valid_to > valid_from)
);

-- 10. Congés -------------------------------------------------------------------
create table public.cc_leave_rules (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  kind text not null check (kind in (
    'conges_anciennete', 'fractionnement', 'evenement_familial', 'enfant_malade', 'conges_supplementaires', 'autre'
  )),
  event text,                        -- mariage, naissance, décès…
  label text,
  categories text[] check (public.cc_valid_categories(categories)),
  classification_codes text[],
  seniority_min_months int not null default 0 check (seniority_min_months >= 0),
  days numeric(5, 2) not null check (days >= 0),
  day_type text not null default 'ouvrables' check (day_type in ('ouvrables', 'ouvres', 'calendaires')),
  paid boolean not null default true,
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_to is null or valid_to > valid_from)
);

-- 11. Maintien de salaire ------------------------------------------------------
-- Une ligne par période d'indemnisation : ex. 30 jours à 90 %, puis 30 jours à 66,66 %.
create table public.cc_sick_pay (
  id uuid primary key default gen_random_uuid(),
  idcc_code text not null references public.collective_agreements (idcc_code) on delete cascade,
  absence_type text not null check (absence_type in (
    'maladie', 'accident_travail', 'maladie_professionnelle', 'accident_trajet', 'maternite', 'paternite'
  )),
  categories text[] check (public.cc_valid_categories(categories)),
  classification_codes text[],
  seniority_min_months int not null default 0 check (seniority_min_months >= 0),
  waiting_days int not null default 0 check (waiting_days >= 0),   -- carence
  sequence int not null default 1,                                  -- ordre de la période
  duration_days int not null check (duration_days > 0),
  rate_percent numeric(6, 2) not null check (rate_percent > 0),
  rate_base text not null default 'net' check (rate_base in ('brut', 'net')),
  ijss_deducted boolean not null default true,      -- sous déduction des IJSS
  reference_period_months int,                      -- durée cumulée sur N mois glissants
  source_text_id uuid references public.cc_texts (id) on delete set null,
  valid_from date not null,
  valid_to date,
  notes text,
  verified_at date not null default current_date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (valid_to is null or valid_to > valid_from)
);

-- 12. Index, updated_at, droits -----------------------------------------------
create or replace function public.cc_touch_updated_at()
returns trigger language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  return new;
end;
$$;
revoke execute on function public.cc_touch_updated_at() from public, anon, authenticated;

do $$
declare
  t text;
begin
  foreach t in array array[
    'cc_texts', 'cc_classifications', 'cc_salary_minimums', 'cc_seniority_bonuses',
    'cc_bonuses', 'cc_working_time', 'cc_pay_increases', 'cc_allowances',
    'cc_contributions', 'cc_leave_rules', 'cc_sick_pay'
  ] loop
    -- Recherche des règles d'une convention à une date.
    if t = 'cc_texts' then
      execute format('create index %I on public.%I (idcc_code, effective_from)', t || '_idcc_idx', t);
    else
      execute format('create index %I on public.%I (idcc_code, valid_from)', t || '_idcc_idx', t);
      execute format('create index %I on public.%I (source_text_id)', t || '_source_idx', t);
    end if;

    execute format(
      'create trigger %I before update on public.%I for each row execute function public.cc_touch_updated_at()',
      t || '_touch_updated_at', t);

    -- Lecture : utilisateurs connectés (référentiel public, comme le registre).
    -- Écriture : back-office (admin + gestionnaire).
    execute format('alter table public.%I enable row level security', t);
    execute format('create policy %I on public.%I for select to authenticated using (true)', t || '_select', t);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select public.is_staff()))', t || '_staff_insert', t);
    execute format('create policy %I on public.%I for update to authenticated using ((select public.is_staff())) with check ((select public.is_staff()))', t || '_staff_update', t);
    execute format('create policy %I on public.%I for delete to authenticated using ((select public.is_staff()))', t || '_staff_delete', t);
    execute format('revoke all on public.%I from anon', t);
  end loop;
end;
$$;

create index cc_salary_minimums_classification_idx
  on public.cc_salary_minimums (idcc_code, classification_code, valid_from);
