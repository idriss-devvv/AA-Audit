/**
 * Formules d'abonnement. Les quotas sont appliqués par la base (fonctions
 * `plan_quota` / trigger `enforce_payslip_quota` de la migration
 * roles_plans_quotas) : ces valeurs doivent rester identiques aux siennes.
 */

export type PlanId = "free" | "starter" | "pro" | "entreprise";
export type AppRole = "super_admin" | "admin" | "client";

export type PlanDefinition = {
  id: PlanId;
  label: string;
  /** Prix mensuel HT en euros (0 pour free). */
  price: number;
  description: string;
  /** Fiches autorisées : au total pour free, par mois sinon ; null = illimité. */
  quota: number | null;
  quotaPeriod: "total" | "month" | null;
  /** Onglet « Salariés ». */
  employeesTab: boolean;
  /** Onglet « Sociétés » (gestion de plusieurs sociétés). */
  companiesTab: boolean;
  /** Résultats d'analyse partiellement masqués. */
  blurredResults: boolean;
  features: string[];
  /** Variable d'environnement contenant l'identifiant de prix Stripe (null : pas de paiement en ligne). */
  stripePriceEnv: "STRIPE_PRICE_STARTER" | "STRIPE_PRICE_PRO" | "STRIPE_PRICE_ENTREPRISE" | null;
};

export const PLANS: Record<PlanId, PlanDefinition> = {
  free: {
    id: "free",
    label: "Free",
    price: 0,
    description: "Pour découvrir l'analyse sur une fiche de paie.",
    quota: 1,
    quotaPeriod: "total",
    employeesTab: false,
    companiesTab: false,
    blurredResults: true,
    features: ["1 fiche de paie à tester", "Aperçu des anomalies détectées", "Sans carte bancaire"],
    stripePriceEnv: null,
  },
  starter: {
    id: "starter",
    label: "Starter",
    price: 49.99,
    description: "Pour contrôler régulièrement les fiches d'une petite structure.",
    quota: 30,
    quotaPeriod: "month",
    employeesTab: false,
    companiesTab: false,
    blurredResults: false,
    features: ["30 fiches de paie / mois", "Tous les contrôles et leurs sources", "Rapports et exports Excel"],
    stripePriceEnv: "STRIPE_PRICE_STARTER",
  },
  pro: {
    id: "pro",
    label: "Pro",
    price: 149.99,
    description: "Pour les PME qui suivent leurs salariés dans la durée.",
    quota: 150,
    quotaPeriod: "month",
    employeesTab: true,
    companiesTab: false,
    blurredResults: false,
    features: ["150 fiches de paie / mois", "Onglet Salariés : suivi par salarié", "Tous les contrôles, rapports et exports"],
    stripePriceEnv: "STRIPE_PRICE_PRO",
  },
  entreprise: {
    id: "entreprise",
    label: "Cabinet",
    price: 249.99,
    description: "Pour les cabinets et groupes qui gèrent plusieurs sociétés.",
    quota: 300,
    quotaPeriod: "month",
    employeesTab: true,
    companiesTab: true,
    blurredResults: false,
    features: [
      "300 fiches de paie / mois",
      "Onglet Sociétés : plusieurs sociétés dans un compte",
      "Onglet Salariés dans chaque société",
    ],
    stripePriceEnv: "STRIPE_PRICE_ENTREPRISE",
  },
};

export const PLAN_ORDER: PlanId[] = ["free", "starter", "pro", "entreprise"];

export function toPlanId(value: string | null | undefined): PlanId {
  return value && value in PLANS ? (value as PlanId) : "free";
}

/** Limite de fiches ; `quota` remplace celle de la formule (limite personnalisée). */
export function quotaLabel(plan: PlanDefinition, quota: number | null = plan.quota): string {
  if (quota === null) return "Fiches illimitées";
  const unit = quota > 1 ? "fiches" : "fiche";
  return plan.id === "free" ? `${quota} ${unit} au total` : `${quota} ${unit} / mois`;
}

/** Facturation annuelle : 2 mois offerts (10 mois payés sur 12). */
export const ANNUAL_MONTHS_BILLED = 10;

export type Billing = "monthly" | "annual";

/** Prix mensuel affiché : équivalent mensuel arrondi au centime en annuel. */
export function monthlyPrice(price: number, billing: Billing): number {
  return billing === "annual" ? Math.round((price * ANNUAL_MONTHS_BILLED * 100) / 12) / 100 : price;
}

/** Montant en euros au format français : « 49,99 », « 1 000 ». */
export function formatEuros(value: number): string {
  const cents = !Number.isInteger(Math.round(value * 100) / 100);
  return value.toLocaleString("fr-FR", { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 });
}

/**
 * Offre Entreprise (sur devis, au-delà de la formule Cabinet) : simulateur de
 * la page d'accueil. Prix par fiche dégressif, appliqué par tranche.
 */
export const ENTERPRISE_QUOTE = {
  min: 500,
  max: 5000,
  step: 50,
  tiers: [
    { upTo: 1000, perPayslip: 0.9 },
    { upTo: 2500, perPayslip: 0.7 },
    { upTo: 5000, perPayslip: 0.5 },
  ],
  /** Option mensuelle (HT). L'accompagnement dédié est chiffré sur devis. */
  multiCompanies: 99,
} as const;

/** Prix mensuel HT estimé de l'offre Entreprise pour un volume de fiches donné. */
export function enterpriseMonthlyPrice(
  payslips: number,
  options: { multiCompanies: boolean },
): number {
  let total = 0;
  let from = 0;
  for (const tier of ENTERPRISE_QUOTE.tiers) {
    const count = Math.max(0, Math.min(payslips, tier.upTo) - from);
    total += count * tier.perPayslip;
    from = tier.upTo;
  }
  if (options.multiCompanies) total += ENTERPRISE_QUOTE.multiCompanies;
  return Math.round(total);
}

export const ROLE_LABELS: Record<AppRole, string> = {
  super_admin: "Super admin",
  admin: "Admin",
  client: "Client",
};
