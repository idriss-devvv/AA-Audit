-- Bouton d'aide / assistance (cahier des charges V1) : il renvoie vers le
-- cabinet qui commercialise le SaaS, jamais vers l'éditeur. Coordonnées
-- uniques pour toute la plateforme, modifiables par le back-office.
create table if not exists public.platform_settings (
  id boolean primary key default true check (id),
  support_name text,
  support_email text,
  support_phone text,
  support_url text,
  support_hours text,
  updated_at timestamptz not null default now()
);

insert into public.platform_settings (id) values (true) on conflict (id) do nothing;

alter table public.platform_settings enable row level security;
drop policy if exists platform_settings_select on public.platform_settings;
create policy platform_settings_select on public.platform_settings for select to authenticated using (true);
drop policy if exists platform_settings_staff_update on public.platform_settings;
create policy platform_settings_staff_update on public.platform_settings for update to authenticated
  using ((select public.is_staff())) with check ((select public.is_staff()));
grant select, update on public.platform_settings to authenticated;
