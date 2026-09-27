-- Fiches de paie : aperçu du fichier, suppression, doublons, erreurs lisibles,
-- images en attente d'analyse.

-- 1. Nouvelles colonnes.
--    file_hash     : empreinte SHA-256 du fichier, pour signaler un doublon.
--    error_message : cause lisible d'un échec d'analyse.
--    deleted_at    : suppression par l'utilisateur. Le fichier et les données
--                    personnelles sont effacés ; la ligne reste (anonymisée)
--                    pour que le quota de la formule ne soit pas contourné.
alter table public.payslips
  add column if not exists file_hash text,
  add column if not exists error_message text,
  add column if not exists deleted_at timestamptz;

create index if not exists idx_payslips_company_hash
  on public.payslips (company_id, file_hash)
  where deleted_at is null;

-- 2. Quota : les images (JPG, PNG) ne sont pas encore analysées, elles ne
--    sont donc pas décomptées. Les fiches supprimées restent comptées.
create or replace function public.enforce_payslip_quota()
 returns trigger
 language plpgsql
 security definer
 set search_path to 'public'
as $function$
declare
  v_plan text := public.company_plan(new.company_id);
  v_quota int := public.plan_quota(v_plan);
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

-- 3. Stockage : tout compte ayant accès à l'entreprise de la fiche peut lire
--    et supprimer son fichier (collègues, cabinet comptable), pas seulement
--    la personne qui l'a importé.
drop policy if exists payslips_company_read on storage.objects;
create policy payslips_company_read on storage.objects
  for select
  using (
    bucket_id = 'payslips'
    and exists (
      select 1 from public.payslips p
      where p.file_url = storage.objects.name
        and p.company_id in (select public.accessible_company_ids())
    )
  );

drop policy if exists payslips_company_delete on storage.objects;
create policy payslips_company_delete on storage.objects
  for delete
  using (
    bucket_id = 'payslips'
    and exists (
      select 1 from public.payslips p
      where p.file_url = storage.objects.name
        and p.company_id in (select public.accessible_company_ids())
    )
  );
