-- Rôles applicatifs, blocage d'utilisateurs, formules (free / starter / pro /
-- entreprise) et quotas de fiches appliqués par la base.

-- 1. Rôles et blocage --------------------------------------------------------
alter table public.profiles
  add column if not exists app_role text not null default 'client'
    check (app_role in ('admin', 'gestionnaire', 'client')),
  add column if not exists blocked_at timestamptz;

-- Un utilisateur ne peut plus modifier son rôle ni son blocage : seules les
-- fonctions du back-office (security definer) écrivent ces colonnes.
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (full_name) on public.profiles to authenticated;

-- Premier administrateur : le développeur du SaaS.
update public.profiles
set app_role = 'admin'
where id = (select id from auth.users where email = 'idriss.abid25@gmail.com');

-- 2. Fonctions d'aide ----------------------------------------------------------
create or replace function public.current_app_role()
returns text language sql stable security definer set search_path = public as $$
  select case when p.blocked_at is null then p.app_role end
  from profiles p where p.id = auth.uid()
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_app_role() in ('admin', 'gestionnaire'), false)
$$;

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_app_role() = 'admin', false)
$$;

-- Entreprises accessibles : un utilisateur bloqué n'accède plus à rien.
create or replace function public.accessible_company_ids()
returns setof uuid language sql stable security definer set search_path = public as $$
  select p.company_id
  from profiles p
  where p.id = auth.uid() and p.company_id is not null and p.blocked_at is null
  union
  select cc.company_id
  from client_companies cc
  join profiles p on p.company_id = cc.cabinet_id
  where p.id = auth.uid() and p.blocked_at is null
$$;

-- Formule applicable à une entreprise : son propre abonnement actif, sinon
-- celui de l'entreprise « mère » (formule Entreprise multi-sociétés), sinon free.
create or replace function public.company_plan(p_company uuid)
returns text language sql stable security definer set search_path = public as $$
  select coalesce(
    (select s.plan from subscriptions s
      where s.company_id = p_company and s.status in ('active', 'trialing') and s.plan <> 'free'
      limit 1),
    (select s.plan from client_companies cc
      join subscriptions s on s.company_id = cc.cabinet_id
      where cc.company_id = p_company and s.status in ('active', 'trialing') and s.plan <> 'free'
      limit 1),
    'free')
$$;

-- Nombre de fiches autorisées : total pour free, par mois pour starter / pro,
-- illimité (null) pour entreprise.
create or replace function public.plan_quota(p_plan text)
returns int language sql immutable as $$
  select case p_plan when 'free' then 1 when 'starter' then 30 when 'pro' then 150 else null end
$$;

-- L'utilisateur connecté peut-il créer / rattacher des sociétés ?
create or replace function public.can_manage_companies()
returns boolean language sql stable security definer set search_path = public as $$
  select public.is_staff() or exists (
    select 1 from profiles p
    where p.id = auth.uid() and p.blocked_at is null
      and public.company_plan(p.company_id) = 'entreprise'
  )
$$;

-- 3. Quota de fiches, appliqué à chaque import ---------------------------------
create or replace function public.enforce_payslip_quota()
returns trigger language plpgsql security definer set search_path = public as $$
declare
  v_plan text := public.company_plan(new.company_id);
  v_quota int := public.plan_quota(v_plan);
  v_count int;
begin
  if public.is_staff() or v_quota is null then
    return new;
  end if;
  if v_plan = 'free' then
    select count(*) into v_count from payslips where company_id = new.company_id;
  else
    select count(*) into v_count from payslips
    where company_id = new.company_id and uploaded_at >= date_trunc('month', now());
  end if;
  if v_count >= v_quota then
    raise exception 'QUOTA_EXCEEDED:%:%', v_plan, v_quota using errcode = 'P0001';
  end if;
  return new;
end;
$$;

drop trigger if exists payslips_enforce_quota on public.payslips;
create trigger payslips_enforce_quota
  before insert on public.payslips
  for each row execute function public.enforce_payslip_quota();

-- 4. Gestion multi-sociétés réservée à la formule Entreprise -------------------
drop policy if exists companies_cabinet_insert on public.companies;
create policy companies_cabinet_insert on public.companies
  for insert with check (is_cabinet = false and public.can_manage_companies());

drop policy if exists client_companies_cabinet_insert on public.client_companies;
create policy client_companies_cabinet_insert on public.client_companies
  for insert with check (
    cabinet_id in (select company_id from profiles where id = auth.uid())
    and public.can_manage_companies()
  );

-- 5. Fonctions du back-office (admin + gestionnaire) ---------------------------
create or replace function public.admin_overview()
returns json language plpgsql stable security definer set search_path = public as $$
begin
  if not public.is_staff() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  return json_build_object(
    'users', (select count(*) from profiles),
    'blocked', (select count(*) from profiles where blocked_at is not null),
    'companies', (select count(*) from companies),
    'payslips_total', (select count(*) from payslips),
    'payslips_month', (select count(*) from payslips where uploaded_at >= date_trunc('month', now())),
    'plans', (select json_object_agg(plan, n) from (
      select public.company_plan(p.company_id) as plan, count(*) as n
      from profiles p group by 1) t)
  );
end;
$$;

create or replace function public.admin_list_accounts()
returns table (
  user_id uuid, email text, full_name text, app_role text, blocked_at timestamptz,
  created_at timestamptz, last_sign_in_at timestamptz, company_id uuid, company_name text,
  plan text, subscription_status text, payslips_month bigint, payslips_total bigint, sub_companies bigint
) language plpgsql stable security definer set search_path = public, auth as $$
begin
  if not public.is_staff() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  return query
  select p.id, u.email::text, p.full_name, p.app_role, p.blocked_at,
    u.created_at, u.last_sign_in_at, c.id, c.name,
    public.company_plan(c.id), s.status,
    (select count(*) from payslips x where x.company_id = c.id and x.uploaded_at >= date_trunc('month', now())),
    (select count(*) from payslips x where x.company_id = c.id),
    (select count(*) from client_companies cc where cc.cabinet_id = c.id)
  from profiles p
  join auth.users u on u.id = p.id
  left join companies c on c.id = p.company_id
  left join subscriptions s on s.company_id = c.id
  order by u.created_at desc;
end;
$$;

create or replace function public.admin_set_plan(p_company uuid, p_plan text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_staff() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  if p_plan not in ('free', 'starter', 'pro', 'entreprise') then raise exception 'INVALID_PLAN'; end if;
  update subscriptions
  set plan = p_plan, status = case when p_plan = 'free' then 'inactive' else 'active' end
  where company_id = p_company;
  if not found then
    insert into subscriptions (company_id, plan, status)
    values (p_company, p_plan, case when p_plan = 'free' then 'inactive' else 'active' end);
  end if;
end;
$$;

create or replace function public.admin_set_blocked(p_user uuid, p_blocked boolean)
returns void language plpgsql security definer set search_path = public as $$
declare v_target_role text;
begin
  if not public.is_staff() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  if p_user = auth.uid() then raise exception 'CANNOT_BLOCK_SELF'; end if;
  select app_role into v_target_role from profiles where id = p_user;
  -- Un gestionnaire ne peut bloquer que des clients.
  if v_target_role <> 'client' and not public.is_admin() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  update profiles set blocked_at = case when p_blocked then now() else null end where id = p_user;
end;
$$;

create or replace function public.admin_set_role(p_user uuid, p_role text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_admin() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  if p_user = auth.uid() then raise exception 'CANNOT_CHANGE_OWN_ROLE'; end if;
  if p_role not in ('admin', 'gestionnaire', 'client') then raise exception 'INVALID_ROLE'; end if;
  update profiles set app_role = p_role where id = p_user;
end;
$$;

-- Droits d'exécution : utilisateurs connectés uniquement (les fonctions
-- vérifient elles-mêmes le rôle).
revoke execute on function
  public.admin_overview(), public.admin_list_accounts(),
  public.admin_set_plan(uuid, text), public.admin_set_blocked(uuid, boolean),
  public.admin_set_role(uuid, text)
from public, anon;
grant execute on function
  public.admin_overview(), public.admin_list_accounts(),
  public.admin_set_plan(uuid, text), public.admin_set_blocked(uuid, boolean),
  public.admin_set_role(uuid, text), public.company_plan(uuid), public.plan_quota(text),
  public.can_manage_companies(), public.is_staff(), public.is_admin()
to authenticated;

-- 6. Durcissement (analyse de sécurité Supabase) -------------------------------
create or replace function public.plan_quota(p_plan text)
returns int language sql immutable set search_path = public as $$
  select case p_plan when 'free' then 1 when 'starter' then 30 when 'pro' then 150 else null end
$$;

-- Formule d'une entreprise : uniquement pour ses propres entreprises (ou le back-office).
create or replace function public.company_plan(p_company uuid)
returns text language sql stable security definer set search_path = public as $$
  select case
    when auth.uid() is not null
      and not public.is_staff()
      and p_company not in (select public.accessible_company_ids())
    then null
    else coalesce(
      (select s.plan from subscriptions s
        where s.company_id = p_company and s.status in ('active', 'trialing') and s.plan <> 'free'
        limit 1),
      (select s.plan from client_companies cc
        join subscriptions s on s.company_id = cc.cabinet_id
        where cc.company_id = p_company and s.status in ('active', 'trialing') and s.plan <> 'free'
        limit 1),
      'free')
  end
$$;

revoke execute on function
  public.current_app_role(), public.is_staff(), public.is_admin(), public.company_plan(uuid),
  public.can_manage_companies(), public.plan_quota(text), public.accessible_company_ids()
from public, anon;
revoke execute on function public.enforce_payslip_quota() from public, anon, authenticated;
