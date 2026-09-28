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
  /** Fiches autorisées : au total pour free, par mois pour starter / pro ; null = illimité. */
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
    price: 30,
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
    price: 100,
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
    label: "Entreprise",
    price: 500,
    description: "Pour les groupes et cabinets qui gèrent plusieurs sociétés.",
    quota: null,
    quotaPeriod: null,
    employeesTab: true,
    companiesTab: true,
    blurredResults: false,
    features: [
      "Fiches de paie illimitées",
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

export const ROLE_LABELS: Record<AppRole, string> = {
  super_admin: "Super admin",
  admin: "Admin",
  client: "Client",
};
