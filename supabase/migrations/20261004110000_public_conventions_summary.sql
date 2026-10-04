-- Résumé public des conventions collectives intégrées, pour la page d'accueil
-- (visiteurs non connectés). Fonction security definer : n'expose qu'un résumé
-- (texte de salaires en vigueur, éléments contrôlés, date de mise à jour), sans
-- ouvrir la lecture des tables cc_* au rôle anon.
create or replace function public.public_conventions_summary()
returns table (
  idcc_code text,
  name text,
  sector text,
  coverage_note text,
  salary_text_title text,
  salary_text_effective_from date,
  salary_text_url text,
  texts_count int,
  classifications_count int,
  seniority_rules int,
  pay_increase_rules int,
  bonus_rules int,
  sick_pay_rules int,
  last_update date
)
language sql stable security definer set search_path = public as $$
  select
    a.idcc_code,
    a.name,
    a.sector,
    a.coverage_note,
    s.title,
    s.effective_from,
    s.source_url,
    (select count(*)::int from cc_texts t where t.idcc_code = a.idcc_code),
    (select count(distinct m.classification_code)::int from cc_salary_minimums m
      where m.idcc_code = a.idcc_code and (m.valid_to is null or m.valid_to > current_date)),
    (select count(*)::int from cc_seniority_bonuses x where x.idcc_code = a.idcc_code and (x.valid_to is null or x.valid_to > current_date)),
    (select count(*)::int from cc_pay_increases x where x.idcc_code = a.idcc_code and (x.valid_to is null or x.valid_to > current_date)),
    (select count(*)::int from cc_bonuses x where x.idcc_code = a.idcc_code and (x.valid_to is null or x.valid_to > current_date)),
    (select count(*)::int from cc_sick_pay x where x.idcc_code = a.idcc_code and (x.valid_to is null or x.valid_to > current_date)),
    greatest(
      a.verified_at::date,
      (select max(t.verified_at)::date from cc_texts t where t.idcc_code = a.idcc_code),
      (select max(m.verified_at)::date from cc_salary_minimums m where m.idcc_code = a.idcc_code)
    )
  from collective_agreements a
  left join lateral (
    select t.title, t.effective_from, t.source_url from cc_texts t
    where t.idcc_code = a.idcc_code and t.kind in ('avenant_salaires', 'protocole')
    order by t.effective_from desc nulls last
    limit 1
  ) s on true
  order by a.idcc_code::int
$$;

revoke all on function public.public_conventions_summary() from public;
grant execute on function public.public_conventions_summary() to anon, authenticated;
