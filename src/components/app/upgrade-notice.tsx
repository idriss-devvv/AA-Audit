import Link from "next/link";
import { PLANS, formatEuros, type PlanId } from "@/lib/plans";

/**
 * Encart affiché à la place d'une fonctionnalité réservée à une formule
 * supérieure (onglets Sociétés et Salariés, résultats complets…).
 */
export function UpgradeNotice({
  title,
  text,
  requiredPlan,
  compact = false,
}: {
  title: string;
  text: string;
  requiredPlan: PlanId;
  compact?: boolean;
}) {
  const plan = PLANS[requiredPlan];
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white text-center ${
        compact ? "p-6" : "p-8 sm:p-10"
      }`}
    >
      <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-beige-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
          <rect x="5" y="11" width="14" height="10" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </span>
      <p className="mt-4 font-display text-2xl text-ink-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">{text}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-blue-700">
        Disponible avec la formule {plan.label}
        {plan.price > 0 ? ` · ${formatEuros(plan.price)} € / mois` : ""}
      </p>
      <Link href="/app/parametres?onglet=abonnement" className="btn-primary mt-6">
        Voir les formules
      </Link>
    </div>
  );
}
