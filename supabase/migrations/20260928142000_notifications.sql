-- Notifications intégrées et alertes essentielles (cahier des charges V1).
-- Une ligne par destinataire ; créées par la fonction notify_company, qui
-- prévient tous les utilisateurs ayant accès à l'entreprise (y compris le
-- cabinet qui la gère).
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  company_id uuid references public.companies (id) on delete cascade,
  kind text not null check (kind in ('anomalie_critique', 'fiche_erreur', 'quota', 'info')),
  severity text not null default 'info' check (severity in ('info', 'warning', 'critical')),
  title text not null,
  body text,
  link text,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_idx on public.notifications (user_id, created_at desc);
create index if not exists notifications_unread_idx on public.notifications (user_id) where read_at is null;
create index if not exists notifications_company_idx on public.notifications (company_id);

alter table public.notifications enable row level security;
drop policy if exists notifications_own_select on public.notifications;
create policy notifications_own_select on public.notifications for select to authenticated using (user_id = (select auth.uid()));
drop policy if exists notifications_own_update on public.notifications;
create policy notifications_own_update on public.notifications for update to authenticated
  using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
drop policy if exists notifications_own_delete on public.notifications;
create policy notifications_own_delete on public.notifications for delete to authenticated using (user_id = (select auth.uid()));
grant select, update, delete on public.notifications to authenticated;

-- Prévient les utilisateurs de l'entreprise et du cabinet qui la gère.
-- L'appelant doit lui-même avoir accès à l'entreprise.
create or replace function public.notify_company(
  p_company uuid, p_kind text, p_severity text, p_title text, p_body text, p_link text
) returns int language plpgsql security definer set search_path = public as $$
declare v_count int;
begin
  if p_company not in (select public.accessible_company_ids()) then
    raise exception 'FORBIDDEN' using errcode = '42501';
  end if;
  insert into notifications (user_id, company_id, kind, severity, title, body, link)
  select distinct p.id, p_company, p_kind, p_severity, left(p_title, 200), left(p_body, 1000), left(p_link, 300)
  from profiles p
  where p.blocked_at is null
    and (p.company_id = p_company
      or p.company_id in (select cc.cabinet_id from client_companies cc where cc.company_id = p_company));
  get diagnostics v_count = row_count;
  return v_count;
end;
$$;

revoke execute on function public.notify_company(uuid, text, text, text, text, text) from public, anon;
grant execute on function public.notify_company(uuid, text, text, text, text, text) to authenticated;
