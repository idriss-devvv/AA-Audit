-- Optimisation des performances (conseiller Supabase + chemin d'import d'une fiche).
-- Aucune donnée modifiée : index et réécriture de policies RLS à l'identique.

-- 1. Index composites du chemin d'import. Ils remplacent les index simples
--    sur company_id, dont ils couvrent aussi les recherches.
--    - recherche du salarié : (company_id, employee_ref)
--    - comptage du quota et listes par date : (company_id, uploaded_at)
create index if not exists idx_employees_company_ref on public.employees (company_id, employee_ref);
drop index if exists public.idx_employees_company;

create index if not exists idx_payslips_company_uploaded on public.payslips (company_id, uploaded_at desc);
drop index if exists public.idx_payslips_company;

-- 2. Clés étrangères sans index (conseiller « unindexed_foreign_keys »).
create index if not exists idx_client_companies_company on public.client_companies (company_id);
create index if not exists idx_company_pay_settings_idcc on public.company_pay_settings (collective_agreement_idcc);
create index if not exists idx_payslips_uploaded_by on public.payslips (uploaded_by);
create index if not exists idx_profiles_company on public.profiles (company_id);

-- 3. Policies RLS : auth.uid() évalué une seule fois par requête au lieu
--    d'une fois par ligne (conseiller « auth_rls_initplan »). Même logique.
drop policy if exists profiles_self on public.profiles;
create policy profiles_self on public.profiles
  for all
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

drop policy if exists subscriptions_company_scope on public.subscriptions;
create policy subscriptions_company_scope on public.subscriptions
  for select
  using (company_id in (select p.company_id from public.profiles p where p.id = (select auth.uid())));

drop policy if exists client_companies_cabinet_select on public.client_companies;
create policy client_companies_cabinet_select on public.client_companies
  for select
  using (cabinet_id in (select p.company_id from public.profiles p where p.id = (select auth.uid())));

drop policy if exists client_companies_cabinet_delete on public.client_companies;
create policy client_companies_cabinet_delete on public.client_companies
  for delete
  using (cabinet_id in (select p.company_id from public.profiles p where p.id = (select auth.uid())));

drop policy if exists client_companies_cabinet_insert on public.client_companies;
create policy client_companies_cabinet_insert on public.client_companies
  for insert
  with check (
    cabinet_id in (select p.company_id from public.profiles p where p.id = (select auth.uid()))
    and public.can_manage_companies()
  );
