-- Taux FNAL de l'entreprise (0,10 % sous 50 salariés, 0,50 % à partir de 50) :
-- permet de calculer la réduction générale attendue exactement au lieu d'une fourchette.
alter table public.company_pay_settings
  add column if not exists fnal_rate_percent numeric(3, 2)
  check (fnal_rate_percent is null or fnal_rate_percent in (0.10, 0.50));
