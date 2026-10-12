"use client";

import { useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import {
  ANNUAL_MONTHS_BILLED,
  ENTERPRISE_QUOTE,
  enterpriseMonthlyPrice,
  monthlyPrice,
  type Billing,
  type PlanDefinition,
} from "@/lib/plans";

type PricingPlan = PlanDefinition & { highlighted: boolean };

const EURO = (value: number) => value.toLocaleString("fr-FR");

/** Position « 5000 et plus » du curseur, au-delà du maximum. */
const SLIDER_OVER = ENTERPRISE_QUOTE.max + ENTERPRISE_QUOTE.step;

export function PricingSection({ plans }: { plans: PricingPlan[] }) {
  const [billing, setBilling] = useState<Billing>("monthly");
  const annual = billing === "annual";

  return (
    <>
      <div className="mt-10 flex justify-center">
        <label className="inline-flex cursor-pointer items-center gap-3 rounded-full border border-ink-200/70 bg-beige-50 px-5 py-2.5 text-sm font-medium text-ink-700">
          <input
            type="checkbox"
            checked={annual}
            onChange={(e) => setBilling(e.target.checked ? "annual" : "monthly")}
            className="h-4 w-4 accent-blue-600"
          />
          Facturation annuelle
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold text-blue-700 ring-1 ring-inset ring-blue-200">
            2 mois offerts
          </span>
        </label>
      </div>

      <div className="mt-10 grid items-stretch gap-5 md:grid-cols-3">
        {plans.map((plan, i) => (
          <Reveal key={plan.id} delay={i * 100} className="h-full">
            <div
              className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition duration-300 hover:-translate-y-1 ${
                plan.highlighted ? "bg-blue-800 text-beige-50 shadow-lift" : "border border-ink-200/70 bg-beige-50"
              }`}
            >
              {plan.highlighted && (
                <>
                  <div aria-hidden className="bg-grid-light mask-fade-b pointer-events-none absolute inset-0" />
                  <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-blue-400/30 blur-3xl" />
                </>
              )}
              <div className="relative flex items-center justify-between gap-3">
                <h3 className={`text-sm font-semibold uppercase tracking-[0.14em] ${plan.highlighted ? "text-blue-200" : "text-ink-500"}`}>
                  {plan.label}
                </h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-beige-50/10 px-3 py-1 text-[11px] font-semibold text-beige-100 ring-1 ring-inset ring-beige-50/20">
                    Le plus populaire
                  </span>
                )}
              </div>
              <p className={`relative mt-6 font-display text-6xl leading-none ${plan.highlighted ? "text-beige-50" : "text-ink-900"}`}>
                {monthlyPrice(plan.price, billing)} €
                <span className={`ml-1 font-sans text-sm font-medium ${plan.highlighted ? "text-blue-200" : "text-ink-500"}`}>
                  / mois
                </span>
              </p>
              <p className={`relative mt-2 h-5 text-xs ${plan.highlighted ? "text-blue-200" : "text-ink-400"}`}>
                {annual ? `Soit ${EURO(plan.price * ANNUAL_MONTHS_BILLED)} € facturés par an` : ""}
              </p>
              <p className={`relative mt-3 text-sm ${plan.highlighted ? "text-blue-100" : "text-ink-500"}`}>
                {plan.description}
              </p>
              <ul className={`relative mt-8 flex-1 space-y-3 border-t pt-6 text-sm ${plan.highlighted ? "border-white/15 text-beige-100" : "border-ink-200/70 text-ink-700"}`}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className={plan.highlighted ? "text-blue-300" : "text-blue-500"} /> {feature}
                  </li>
                ))}
              </ul>
              <div className="relative mt-8">
                {/* Essai d'abord : le paiement se fait depuis l'app, après la première fiche testée. */}
                <Link
                  href="/inscription"
                  className={
                    plan.highlighted
                      ? "btn w-full bg-beige-50 px-6 py-3 text-blue-800 hover:bg-white active:scale-[0.98]"
                      : "btn-secondary w-full"
                  }
                >
                  Essayer gratuitement
                </Link>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-5">
        <EnterpriseCard billing={billing} />
      </Reveal>
    </>
  );
}

function EnterpriseCard({ billing }: { billing: Billing }) {
  const [volume, setVolume] = useState<number>(1000);
  const [multiCompanies, setMultiCompanies] = useState(true);
  const [dedicatedSupport, setDedicatedSupport] = useState(false);

  const over = volume > ENTERPRISE_QUOTE.max;
  const price = monthlyPrice(enterpriseMonthlyPrice(volume, { multiCompanies }), billing);
  const progress = ((volume - ENTERPRISE_QUOTE.min) / (SLIDER_OVER - ENTERPRISE_QUOTE.min)) * 100;

  const quoteParams = new URLSearchParams({
    fiches: over ? `${ENTERPRISE_QUOTE.max}+` : String(volume),
    ...(multiCompanies ? { societes: "1" } : {}),
    ...(dedicatedSupport ? { accompagnement: "1" } : {}),
    ...(billing === "annual" ? { facturation: "annuelle" } : {}),
  });

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ink-900 via-ink-900 to-blue-900 p-8 text-beige-50 shadow-lift md:p-10">
      <div aria-hidden className="bg-grid-light pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-500/25 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-1/4 h-64 w-64 rounded-full bg-blue-400/10 blur-3xl" />

      <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:gap-12">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-200">Entreprise</h3>
          <p className="mt-3 max-w-md text-sm text-ink-300">
            Au-delà de 300 fiches par mois : simulez votre tarif selon votre volume, puis demandez un devis.
          </p>

          <div className="mt-8">
            <div className="flex items-baseline justify-between gap-4">
              <label htmlFor="enterprise-volume" className="text-sm font-medium text-beige-100">
                Fiches de paie par mois
              </label>
              <span className="font-display text-2xl text-beige-50">
                {over ? `${EURO(ENTERPRISE_QUOTE.max)} et plus` : EURO(volume)}
              </span>
            </div>
            <input
              id="enterprise-volume"
              type="range"
              min={ENTERPRISE_QUOTE.min}
              max={SLIDER_OVER}
              step={ENTERPRISE_QUOTE.step}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-valuetext={over ? `${ENTERPRISE_QUOTE.max} fiches et plus` : `${volume} fiches`}
              className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-blue-300"
              style={{ background: `linear-gradient(to right, #8DA7CC ${progress}%, rgba(255, 255, 255, 0.15) ${progress}%)` }}
            />
            <div className="mt-2 flex justify-between text-xs text-ink-400">
              <span>{EURO(ENTERPRISE_QUOTE.min)}</span>
              <span>{EURO(ENTERPRISE_QUOTE.max)} et plus</span>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 text-sm text-beige-100 sm:flex-row sm:gap-6">
            <label className="inline-flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={multiCompanies}
                onChange={(e) => setMultiCompanies(e.target.checked)}
                className="h-4 w-4 accent-blue-400"
              />
              Multi-sociétés (+{ENTERPRISE_QUOTE.multiCompanies} € / mois)
            </label>
            <label className="inline-flex cursor-pointer items-center gap-2.5">
              <input
                type="checkbox"
                checked={dedicatedSupport}
                onChange={(e) => setDedicatedSupport(e.target.checked)}
                className="h-4 w-4 accent-blue-400"
              />
              Accompagnement dédié · sur devis
            </label>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.05] p-7 shadow-inner-top backdrop-blur">
          <div>
            <p className="h-5 text-sm font-medium text-blue-200">{over ? "" : "Estimation"}</p>
            <p className="mt-1 font-display text-5xl leading-none text-beige-50">
              {over ? (
                "Sur devis"
              ) : (
                <>
                  {EURO(price)} €
                  <span className="ml-1 font-sans text-sm font-medium text-blue-200">/ mois</span>
                </>
              )}
            </p>
            <p className="mt-3 text-xs text-ink-300">
              {over
                ? "Tarif personnalisé au-delà de 5 000 fiches par mois."
                : billing === "annual"
                  ? "Prix HT, facturation annuelle avec 2 mois offerts."
                  : "Prix HT, facturation mensuelle."}
              {!over && dedicatedSupport && " Accompagnement dédié chiffré dans le devis."}
            </p>
            <ul className="mt-6 space-y-2.5 text-sm text-beige-100">
              <li className="flex items-start gap-2.5">
                <Check className="text-blue-300" /> Tous les contrôles, rapports et exports
              </li>
              <li className="flex items-start gap-2.5">
                <Check className="text-blue-300" /> Onglet Salariés
              </li>
            </ul>
          </div>
          <Link
            href={`/contact-entreprise?${quoteParams.toString()}`}
            className="btn mt-8 w-full bg-beige-50 px-6 py-3 text-ink-900 hover:bg-white active:scale-[0.98]"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  );
}

function Check({ className = "text-blue-500" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={`mt-0.5 h-4 w-4 shrink-0 ${className}`} aria-hidden>
      <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
