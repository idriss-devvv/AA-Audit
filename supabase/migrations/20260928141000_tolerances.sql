-- Seuils de tolérance configurables par entreprise (cahier des charges V1).
-- Objet JSON : seules les clés renseignées remplacent les valeurs par défaut
-- définies dans src/lib/rules/tolerances.ts.
alter table public.company_pay_settings
  add column if not exists tolerances jsonb not null default '{}'::jsonb;
