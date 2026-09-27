-- Sûreté en cas d'utilisateurs simultanés.

-- 1. Quota : deux imports simultanés pouvaient compter le même nombre de
--    fiches et dépasser la limite. Un verrou transactionnel par entreprise
--    sérialise uniquement les imports d'une même entreprise.
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
  if public.is_staff() or v_quota is null then
    return new;
  end if;
  perform pg_advisory_xact_lock(hashtextextended('payslip_quota:' || new.company_id::text, 0));
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
$function$;

-- 2. Salariés : un même salarié importé deux fois en même temps créait un
--    doublon. L'index devient unique (l'import relit la ligne en cas de conflit).
create unique index if not exists employees_company_ref_key on public.employees (company_id, employee_ref);
drop index if exists public.idx_employees_company_ref;
