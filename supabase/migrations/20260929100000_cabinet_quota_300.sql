-- Formule « Cabinet » (identifiant technique 'entreprise') : 300 fiches par mois
-- au lieu d'illimité. Au-delà, l'offre Entreprise sur devis passe par une
-- limite personnalisée (super_admin_custom_quota).
create or replace function public.plan_quota(p_plan text)
returns int language sql immutable set search_path = public as $$
  select case p_plan when 'free' then 1 when 'starter' then 30 when 'pro' then 150 when 'entreprise' then 300 else null end
$$;
