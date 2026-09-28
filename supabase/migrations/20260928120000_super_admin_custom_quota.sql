-- Rôles simplifiés et limite de fiches personnalisée.
--   super_admin : les développeurs du SaaS (tous les droits, nomment les admins).
--   admin       : les propriétaires du SaaS (back-office : comptes, formules,
--                 limites de fiches, blocage des clients).
--   client      : les utilisateurs, dont l'accès dépend de leur formule.

-- 1. Rôles : admin → super_admin, gestionnaire → admin ------------------------
alter table public.profiles drop constraint if exists profiles_app_role_check;
update public.profiles set app_role = 'super_admin' where app_role = 'admin';
update public.profiles set app_role = 'admin' where app_role = 'gestionnaire';
alter table public.profiles
  add constraint profiles_app_role_check check (app_role in ('super_admin', 'admin', 'client'));

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_app_role() in ('super_admin', 'admin'), false)
$$;

create or replace function public.is_super_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(public.current_app_role() = 'super_admin', false)
$$;

-- 2. Limite de fiches personnalisée -------------------------------------------
-- null = limite de la formule. Même période que la formule : au total pour
-- free, par mois pour les autres.
alter table public.subscriptions
  add column if not exists custom_quota int check (custom_quota is null or custom_quota >= 0);

-- Limite effective d'une entreprise (null = illimité), sans contrôle d'accès :
-- réservée aux fonctions security definer.
create or replace function public.company_quota_internal(p_company uuid, p_plan text)
returns int language sql stable security definer set search_path = public as $$
  select case
    when (select s.custom_quota from subscriptions s where s.company_id = p_company) is not null
      then (select s.custom_quota from subscriptions s where s.company_id = p_company)
    -- Société rattachée : limite personnalisée de l'entreprise « mère ».
    when (select s.custom_quota from client_companies cc
            join subscriptions s on s.company_id = cc.cabinet_id
            where cc.company_id = p_company and s.status in ('active', 'trialing') and s.plan = p_plan
            limit 1) is not null
      then (select s.custom_quota from client_companies cc
            join subscriptions s on s.company_id = cc.cabinet_id
            where cc.company_id = p_company and s.status in ('active', 'trialing') and s.plan = p_plan
            limit 1)
    else public.plan_quota(p_plan)
  end
$$;

-- Limite effective, pour l'application : uniquement ses propres entreprises
-- (ou le back-office). Renvoie 0 pour une entreprise inaccessible.
create or replace function public.company_quota(p_company uuid)
returns int language sql stable security definer set search_path = public as $$
  select case
    when auth.uid() is not null
      and not public.is_staff()
      and p_company not in (select public.accessible_company_ids())
    then 0
    else public.company_quota_internal(p_company, public.company_plan(p_company))
  end
$$;

create or replace function public.enforce_payslip_quota()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_plan text := public.company_plan(new.company_id);
  v_quota int := public.company_quota_internal(new.company_id, v_plan);
  v_count int;
begin
  if public.is_staff() or v_quota is null or coalesce(new.mime_type, '') like 'image/%' then
    return new;
  end if;
  perform pg_advisory_xact_lock(hashtextextended('payslip_quota:' || new.company_id::text, 0));
  if v_plan = 'free' then
    select count(*) into v_count from payslips
    where company_id = new.company_id and coalesce(mime_type, '') not like 'image/%';
  else
    select count(*) into v_count from payslips
    where company_id = new.company_id and uploaded_at >= date_trunc('month', now())
      and coalesce(mime_type, '') not like 'image/%';
  end if;
  if v_count >= v_quota then
    raise exception 'QUOTA_EXCEEDED:%:%', v_plan, v_quota using errcode = 'P0001';
  end if;
  return new;
end;
$function$;

-- 3. Back-office ----------------------------------------------------------------
drop function if exists public.admin_list_accounts();
create function public.admin_list_accounts()
returns table (
  user_id uuid, email text, full_name text, app_role text, blocked_at timestamptz,
  created_at timestamptz, last_sign_in_at timestamptz, company_id uuid, company_name text,
  plan text, subscription_status text, custom_quota int, quota int,
  payslips_month bigint, payslips_total bigint, sub_companies bigint
) language plpgsql stable security definer set search_path = public, auth as $$
begin
  if not public.is_staff() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  return query
  select p.id, u.email::text, p.full_name, p.app_role, p.blocked_at,
    u.created_at, u.last_sign_in_at, c.id, c.name,
    public.company_plan(c.id), s.status, s.custom_quota,
    public.company_quota_internal(c.id, public.company_plan(c.id)),
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

create or replace function public.admin_set_quota(p_company uuid, p_quota int)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_staff() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  if p_quota is not null and p_quota < 0 then raise exception 'INVALID_QUOTA'; end if;
  update subscriptions set custom_quota = p_quota where company_id = p_company;
  if not found then
    insert into subscriptions (company_id, plan, status, custom_quota) values (p_company, 'free', 'inactive', p_quota);
  end if;
end;
$$;

-- Un admin ne peut bloquer que des clients ; un super admin, tout le monde (sauf lui-même).
create or replace function public.admin_set_blocked(p_user uuid, p_blocked boolean)
returns void language plpgsql security definer set search_path = public as $$
declare v_target_role text;
begin
  if not public.is_staff() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  if p_user = auth.uid() then raise exception 'CANNOT_BLOCK_SELF'; end if;
  select app_role into v_target_role from profiles where id = p_user;
  if v_target_role <> 'client' and not public.is_super_admin() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  update profiles set blocked_at = case when p_blocked then now() else null end where id = p_user;
end;
$$;

-- Seul un super admin change les rôles.
create or replace function public.admin_set_role(p_user uuid, p_role text)
returns void language plpgsql security definer set search_path = public as $$
begin
  if not public.is_super_admin() then raise exception 'FORBIDDEN' using errcode = '42501'; end if;
  if p_user = auth.uid() then raise exception 'CANNOT_CHANGE_OWN_ROLE'; end if;
  if p_role not in ('super_admin', 'admin', 'client') then raise exception 'INVALID_ROLE'; end if;
  update profiles set app_role = p_role where id = p_user;
end;
$$;

drop function if exists public.is_admin();

-- 4. Droits d'exécution ---------------------------------------------------------
revoke execute on function
  public.is_super_admin(), public.company_quota(uuid), public.company_quota_internal(uuid, text),
  public.admin_list_accounts(), public.admin_set_quota(uuid, int)
from public, anon;
revoke execute on function public.company_quota_internal(uuid, text) from authenticated;
grant execute on function
  public.is_super_admin(), public.company_quota(uuid),
  public.admin_list_accounts(), public.admin_set_quota(uuid, int)
to authenticated;
