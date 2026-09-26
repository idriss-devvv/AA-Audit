import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { SubscribeButton } from "@/components/pricing/subscribe-button";
import { Reveal } from "@/components/ui/reveal";
import { FaqItem } from "@/components/ui/faq-item";
import { ControlsSection } from "@/components/marketing/controls-section";

export const metadata: Metadata = {
  title: { absolute: "A&A Audit — Contrôle automatique de fiches de paie" },
  description:
    "A&A Audit détecte automatiquement les anomalies sur vos fiches de paie : cotisations, brut/net, convention collective, congés payés et primes. Essayez gratuitement.",
  alternates: { canonical: "/" },
};

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  );
}
function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1M9 22v-4h6v4" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

const features = [
  {
    icon: IconBolt,
    title: "Détection automatique",
    description:
      "Chaque fiche de paie est passée au crible d'un moteur de règles : cotisations, plafonds de sécurité sociale, heures travaillées, primes et indemnités.",
  },
  {
    icon: IconChat,
    title: "Explication claire",
    description:
      "Chaque anomalie détectée est expliquée en langage simple, avec le montant attendu, le montant constaté et l'écart chiffré — fini les tableurs illisibles.",
  },
  {
    icon: IconGrid,
    title: "Suivi centralisé",
    description:
      "Un tableau de bord unique pour suivre toutes les fiches contrôlées, filtrées par employé, par période ou par niveau de gravité.",
  },
  {
    icon: IconBook,
    title: "Convention collective",
    description:
      "A&A Audit repère la convention collective applicable sur chaque bulletin pour préparer des contrôles adaptés à votre secteur d'activité.",
  },
  {
    icon: IconSun,
    title: "Congés payés & ancienneté",
    description:
      "Jours acquis, jours pris, solde restant et date d'entrée sont extraits automatiquement pour fiabiliser le suivi des droits de vos salariés.",
  },
  {
    icon: IconShield,
    title: "Sécurité des données",
    description:
      "Vos fiches de paie sont chiffrées, stockées de façon isolée par utilisateur et ne sont jamais partagées avec des tiers.",
  },
];

const steps = [
  {
    number: "01",
    title: "Importez vos fiches de paie",
    description: "Glissez vos bulletins au format PDF (export de votre logiciel de paie) en un clic, sans configuration préalable.",
  },
  {
    number: "02",
    title: "L'analyse se lance automatiquement",
    description: "Le moteur de règles compare chaque ligne — brut, net, cotisations, congés — aux valeurs attendues en quelques secondes.",
  },
  {
    number: "03",
    title: "Consultez les anomalies détaillées",
    description: "Retrouvez les écarts détectés, triés par gravité, avec le détail complet de chaque bulletin dans votre tableau de bord.",
  },
];

const audiences = [
  {
    icon: IconBuilding,
    title: "Cabinets comptables",
    href: "/cabinets-comptables",
    description:
      "Contrôlez rapidement les bulletins de plusieurs clients et sécurisez votre responsabilité sur la conformité de la paie.",
  },
  {
    icon: IconUsers,
    title: "Services RH & PME",
    href: "/entreprises",
    description:
      "Fiabilisez la paie en interne sans embaucher un expert dédié, et gagnez un temps précieux chaque fin de mois.",
  },
  {
    icon: IconBriefcase,
    title: "Indépendants & salariés",
    href: "/verifier-ma-fiche-de-paie",
    description:
      "Vérifiez vous-même votre propre fiche de paie et identifiez un écart de cotisations ou de congés avant qu'il ne soit trop tard.",
  },
];

const plans = [
  {
    name: "Starter",
    price: "30€",
    period: "/mois",
    description: "Pour démarrer le contrôle de vos fiches de paie.",
    features: [
      "Jusqu'à 30 fiches de paie / mois",
      "Moteur de règles standard",
      "1 utilisateur",
    ],
    priceId: "price_starter_30", // à remplacer par le vrai Price ID Stripe
    highlighted: false,
  },
  {
    name: "Pro",
    price: "100€",
    period: "/mois",
    description: "Pour les cabinets et PME avec plusieurs entités.",
    features: [
      "Jusqu'à 150 fiches de paie / mois",
      "Gestion multi-clients pour les cabinets",
      "Barèmes propres à chaque entreprise",
    ],
    priceId: "price_pro_150", // à remplacer par le vrai Price ID Stripe
    highlighted: true,
  },
];

const faqs = [
  {
    question: "Comment A&A Audit détecte-t-il les anomalies sur une fiche de paie ?",
    answer:
      "A&A Audit lit chaque bulletin PDF (salaire, cotisations, heures, congés, convention collective, classification) puis applique ses contrôles : taux de cotisations Urssaf et Agirc-Arrco, PMSS, SMIC, salaires minimums conventionnels, heures supplémentaires, mentions obligatoires et net à payer. Chaque écart est expliqué avec la valeur attendue et sa source officielle.",
  },
  {
    question: "Quels formats de fiches de paie sont acceptés ?",
    answer:
      "Vous pouvez importer vos bulletins au format PDF directement depuis votre logiciel de paie. Le support des fichiers image (JPG, PNG) est en cours d'amélioration pour les bulletins scannés.",
  },
  {
    question: "Les règles de contrôle sont-elles personnalisables ?",
    answer:
      "Les valeurs légales (taux de cotisations, PMSS, SMIC, grilles de salaires conventionnelles) sont intégrées et mises à jour : rien à configurer. La convention collective est détectée automatiquement sur chaque bulletin. Seuls les taux propres à votre entreprise (accident du travail, mutuelle, prévoyance) se renseignent dans les paramètres.",
  },
  {
    question: "Mes fiches de paie sont-elles stockées en sécurité ?",
    answer:
      "Les fichiers sont stockés chez notre hébergeur en France (Paris), chiffrés au repos et cloisonnés par entreprise : seuls les comptes autorisés y ont accès. Les données ne sont jamais revendues ni partagées avec des tiers.",
  },
  {
    question: "Puis-je essayer A&A Audit avant de m'abonner ?",
    answer:
      "Oui, vous pouvez créer un compte et importer une fiche de paie dès maintenant pour voir l'analyse en action, avant de choisir la formule adaptée à votre volume mensuel.",
  },
  {
    question: "A&A Audit convient-il à un cabinet comptable gérant plusieurs clients ?",
    answer:
      "Oui : un compte cabinet gère plusieurs entreprises clientes et bascule de l'une à l'autre, avec des fiches, anomalies et paramètres séparés. La formule Pro couvre un volume plus important, et une offre Entreprise sur devis existe pour les gros volumes.",
  },
];

const faqStructuredData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
};

function HeroPreview() {
  const lines = [
    { label: "Salaire de base", value: "2 850,00 €" },
    { label: "Sécurité sociale plafonnée", value: "185,25 €", flagged: true },
    { label: "Sécurité sociale déplafonnée", value: "11,40 €" },
    { label: "Retraite complémentaire T1", value: "114,29 €" },
    { label: "CSG/CRDS non déductible", value: "81,20 €" },
  ];
  return (
    <div aria-hidden className="relative mx-auto mt-16 w-full max-w-4xl animate-fade-in-up [animation-delay:380ms] md:mt-20">
      <div className="absolute -inset-x-10 -bottom-10 top-10 rounded-[2.5rem] bg-blue-200/40 blur-3xl" />
      <div className="relative overflow-hidden rounded-3xl border border-ink-200/80 bg-white/90 shadow-lift backdrop-blur">
        <div className="flex items-center gap-2 border-b border-ink-100 bg-beige-50/80 px-5 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="h-2.5 w-2.5 rounded-full bg-ink-200" />
          <span className="ml-3 truncate rounded-md bg-white px-3 py-1 text-[11px] font-medium text-ink-400 ring-1 ring-ink-100">
            A&A Audit — Historique
          </span>
        </div>
        <div className="grid gap-0 text-left md:grid-cols-[1.35fr_1fr]">
          <div className="relative overflow-hidden border-b border-ink-100 p-6 md:border-b-0 md:border-r">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">Bulletin · Mars</p>
              <span className="badge bg-blue-50 text-blue-600 ring-blue-100">
                <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-blue-500" />
                Analyse
              </span>
            </div>
            <ul className="mt-5 space-y-1.5">
              {lines.map((line) => (
                <li
                  key={line.label}
                  className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2 text-[13px] ${
                    line.flagged ? "bg-amber-50 text-ink-900 ring-1 ring-inset ring-amber-200" : "text-ink-600"
                  }`}
                >
                  <span className="truncate">{line.label}</span>
                  <span className="shrink-0 font-medium tabular-nums text-ink-900">{line.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-dashed border-ink-200 px-3 pt-4 text-[13px]">
              <span className="font-semibold text-ink-900">Net à payer</span>
              <span className="font-display text-2xl text-ink-900">2 219,87 €</span>
            </div>
            <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-scan bg-gradient-to-b from-transparent via-blue-100/50 to-transparent" />
          </div>
          <div className="bg-beige-50/60 p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-400">Anomalies</p>
            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-amber-200 bg-white p-4 shadow-soft">
                <span className="badge bg-amber-50 text-amber-700 ring-amber-200">Avertissement</span>
                <p className="mt-2.5 text-[13px] font-medium leading-snug text-ink-900">
                  Vieillesse plafonnée appliquée à 6,50 % — taux légal 6,90 %
                </p>
                <p className="mt-1 text-xs text-ink-400">Écart : −11,40 € retenus au salarié</p>
              </div>
              <div className="rounded-xl border border-ink-200/70 bg-white p-4">
                <span className="badge bg-emerald-50 text-emerald-700 ring-emerald-200">Conforme</span>
                <p className="mt-2.5 text-[13px] font-medium leading-snug text-ink-900">Cohérence brut / net vérifiée</p>
              </div>
            </div>
          </div>
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

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
      <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home() {
  return (
    <MarketingShell>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-100/70 via-beige-100/60 to-transparent blur-3xl"
        />

        <div className="container-page relative flex flex-col items-center pb-24 pt-20 text-center md:pb-32 md:pt-28">
          <span className="inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-ink-200/80 bg-white/70 px-4 py-1.5 text-xs font-medium text-ink-600 shadow-[0_1px_2px_rgba(23,25,29,0.04)] backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-blue-500" />
            Contrôle de paie automatisé
          </span>
          <h1 className="heading-display mt-8 max-w-4xl animate-fade-in-up text-[2.9rem] [animation-delay:80ms] sm:text-6xl md:text-[5.25rem]">
            Vérifiez chaque fiche de paie,{" "}
            <em className="italic text-blue-600">sans rien laisser passer</em>
          </h1>
          <p className="mt-7 max-w-xl animate-fade-in-up text-base leading-relaxed text-ink-500 [animation-delay:160ms] md:text-lg">
            A&A Audit détecte automatiquement les anomalies et erreurs sur vos
            fiches de paie : cotisations, plafonds, heures, primes, convention
            collective et congés payés.
          </p>
          <div className="mt-10 flex w-full animate-fade-in-up flex-col gap-3 [animation-delay:240ms] sm:w-auto sm:flex-row">
            <Link href="/inscription" className="btn-primary group px-7">
              Essayer A&A Audit
              <ArrowRight />
            </Link>
            <Link href="/contact" className="btn-secondary px-7">
              Demander une démo
            </Link>
          </div>

          <div className="mt-8 flex animate-fade-in-up flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-ink-500 [animation-delay:320ms]">
            <span className="flex items-center gap-1.5 [&_svg]:h-4 [&_svg]:w-4 [&_svg]:text-blue-500">
              <IconShield /> Fichiers chiffrés
            </span>
            <span aria-hidden className="hidden h-3 w-px bg-ink-200 sm:block" />
            <span className="flex items-center gap-1.5">Données stockées en France</span>
            <span aria-hidden className="hidden h-3 w-px bg-ink-200 sm:block" />
            <span className="flex items-center gap-1.5">Aucune carte requise pour tester</span>
          </div>

          <HeroPreview />
        </div>
      </section>

      {/* Pourquoi contrôler ses fiches de paie */}
      <section className="border-t border-ink-200/60 bg-white py-24 md:py-32">
        <div className="container-page grid gap-14 md:grid-cols-[1.1fr_1fr] md:items-center">
          <Reveal>
            <span className="eyebrow">
              <span className="h-px w-6 bg-blue-500" />
              Enjeux
            </span>
            <h2 className="heading-display mt-5 text-4xl md:text-5xl">
              Pourquoi contrôler vos fiches de paie ?
            </h2>
            <p className="mt-6 leading-relaxed text-ink-500">
              Le bulletin de salaire cumule des dizaines de paramètres — taux de
              cotisations, plafonds de sécurité sociale, primes, heures
              supplémentaires, congés payés — qui évoluent régulièrement.
              Une seule ligne mal paramétrée dans le logiciel de paie peut se
              répéter chaque mois, pour un ou plusieurs salariés, sans être
              détectée.
            </p>
            <p className="mt-4 leading-relaxed text-ink-500">
              A&A Audit automatise cette vérification pour repérer les écarts
              avant qu&apos;ils ne deviennent un vrai problème : redressement
              URSSAF, litige prud&apos;homal ou simple perte de confiance des
              salariés.
            </p>
          </Reveal>
          <div className="overflow-hidden rounded-3xl border border-ink-200/70 bg-beige-50">
            {[
              { title: "Erreurs de cotisations", desc: "Taux erronés, plafonds mal appliqués, lignes manquantes." },
              { title: "Incohérences brut / net", desc: "Écarts inexpliqués entre le salaire brut et le net à payer." },
              { title: "Congés payés mal suivis", desc: "Soldes de congés incohérents d'un mois sur l'autre." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className={`flex items-start gap-5 p-6 md:p-7 ${i > 0 ? "border-t border-ink-200/70" : ""}`}>
                  <span className="font-display text-3xl italic leading-none text-blue-500">
                    0{i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{item.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-ink-500">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fonctionnalites" className="border-t border-ink-200/60 bg-beige-100/70 py-24 md:py-32">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <span className="h-px w-6 bg-blue-500" />
              Fonctionnalités
              <span className="h-px w-6 bg-blue-500" />
            </span>
            <h2 className="heading-display mt-5 text-4xl md:text-5xl">
              Une vérification pensée pour la fiabilité
            </h2>
            <p className="mt-5 text-ink-500">
              Bien plus qu&apos;un contrôle du brut et du net : A&A Audit analyse
              chaque bulletin dans son ensemble.
            </p>
          </Reveal>
          <div className="mt-16 overflow-hidden rounded-3xl border border-ink-200/70 bg-white shadow-soft">
          <div className="-mb-px -mr-px grid md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={(i % 3) * 90} className="h-full border-b border-r border-ink-200/70">
                <div className="group h-full p-8 transition duration-300 hover:bg-beige-50 md:p-9">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-ink-200/70 bg-beige-50 text-blue-600 transition duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-beige-50 [&_svg]:h-5 [&_svg]:w-5">
                    <feature.icon />
                  </div>
                  <h3 className="mt-6 text-[17px] font-semibold tracking-tight text-ink-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-500">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          </div>
        </div>
      </section>

      <ControlsSection />

      {/* How it works */}
      <section id="comment-ca-marche" className="relative overflow-hidden bg-ink-900 py-24 text-beige-50 md:py-32">
        <div aria-hidden className="bg-grid-light mask-radial pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-500/25 blur-3xl"
        />
        <div className="container-page relative">
          <Reveal className="max-w-2xl">
            <span className="eyebrow text-ink-400">
              <span className="h-px w-6 bg-blue-300" />
              Méthode
            </span>
            <h2 className="heading-display mt-5 text-4xl text-beige-50 md:text-5xl">
              Comment ça marche
            </h2>
            <p className="mt-5 max-w-lg text-ink-300">
              Trois étapes suffisent pour passer d&apos;un PDF de paie à une
              analyse complète.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 120} className="h-full">
                <div className="relative h-full rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-inner-top backdrop-blur transition duration-300 hover:border-white/20 hover:bg-white/[0.07]">
                  <span className="font-display text-5xl italic leading-none text-beige-300">
                    {step.number}
                  </span>
                  <h3 className="mt-8 text-lg font-semibold tracking-tight text-beige-50">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-300">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="bg-beige-50 py-24 md:py-32">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <span className="h-px w-6 bg-blue-500" />
              Pour qui
              <span className="h-px w-6 bg-blue-500" />
            </span>
            <h2 className="heading-display mt-5 text-4xl md:text-5xl">Conçu pour tous les profils</h2>
            <p className="mt-5 text-ink-500">
              Que vous gériez la paie d&apos;une seule entreprise ou de
              plusieurs clients, A&A Audit s&apos;adapte à votre usage.
            </p>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {audiences.map((audience, i) => (
              <Reveal key={audience.title} delay={i * 100} className="h-full">
                <div className="group h-full rounded-3xl border border-ink-200/70 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-beige-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] [&_svg]:h-6 [&_svg]:w-6">
                    <audience.icon />
                  </div>
                  <h3 className="mt-7 font-display text-[1.7rem] leading-tight text-ink-900">
                    {audience.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    {audience.description}
                  </p>
                  <Link
                    href={audience.href}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                  >
                    En savoir plus <span aria-hidden>→</span>
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="border-t border-ink-200/60 bg-white py-24 md:py-32">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <span className="h-px w-6 bg-blue-500" />
              Tarifs
              <span className="h-px w-6 bg-blue-500" />
            </span>
            <h2 className="heading-display mt-5 text-4xl md:text-5xl">
              Des tarifs simples et transparents
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-ink-500">
              Choisissez la formule adaptée à votre volume de fiches de paie.
              Sans engagement.
            </p>
          </Reveal>

          <div className="mt-16 grid items-stretch gap-6 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100} className="h-full">
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-3xl p-8 transition duration-300 hover:-translate-y-1 ${
                    plan.highlighted
                      ? "bg-blue-800 text-beige-50 shadow-lift"
                      : "border border-ink-200/70 bg-beige-50"
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
                      {plan.name}
                    </h3>
                    {plan.highlighted && (
                      <span className="rounded-full bg-beige-50/10 px-3 py-1 text-[11px] font-semibold text-beige-100 ring-1 ring-inset ring-beige-50/20">
                        Le plus populaire
                      </span>
                    )}
                  </div>
                  <p className={`relative mt-6 font-display text-6xl leading-none ${plan.highlighted ? "text-beige-50" : "text-ink-900"}`}>
                    {plan.price}
                    <span className={`ml-1 font-sans text-sm font-medium ${plan.highlighted ? "text-blue-200" : "text-ink-500"}`}>
                      {plan.period}
                    </span>
                  </p>
                  <p className={`relative mt-4 text-sm ${plan.highlighted ? "text-blue-100" : "text-ink-500"}`}>
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
                    <SubscribeButton
                      priceId={plan.priceId}
                      label="S'abonner"
                      variant={plan.highlighted ? "inverse" : "outline"}
                    />
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={200} className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-ink-200/70 bg-beige-50 p-8 transition duration-300 hover:-translate-y-1">
                <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-500">
                  Entreprise
                </h3>
                <p className="mt-6 font-display text-5xl leading-none text-ink-900">
                  Sur devis
                </p>
                <p className="mt-4 text-sm text-ink-500">
                  Volume important, accompagnement dédié.
                </p>
                <ul className="mt-8 flex-1 space-y-3 border-t border-ink-200/70 pt-6 text-sm text-ink-700">
                  <li className="flex items-start gap-2.5">
                    <Check /> Volume illimité
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check /> Accompagnement dédié
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check /> Contrat sur mesure
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/contact-entreprise" className="btn-secondary w-full">
                    Nous contacter
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-ink-200/60 bg-beige-50 py-24 md:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">
              <span className="h-px w-6 bg-blue-500" />
              FAQ
            </span>
            <h2 className="heading-display mt-5 text-4xl md:text-5xl">Questions fréquentes</h2>
            <p className="mt-5 max-w-sm text-ink-500">
              Tout ce qu&apos;il faut savoir avant de contrôler vos premières fiches de paie.
            </p>
          </Reveal>
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={(i % 4) * 70}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-beige-50 pb-24 md:pb-32">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-blue-700 px-6 py-20 text-center md:px-16 md:py-24">
            <div aria-hidden className="bg-grid-light mask-radial pointer-events-none absolute inset-0" />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-32 left-1/2 h-72 w-[640px] -translate-x-1/2 animate-pulse-soft rounded-full bg-blue-400/40 blur-3xl"
            />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="heading-display max-w-2xl text-4xl text-beige-50 md:text-6xl">
                Prêt à sécuriser vos fiches de paie ?
              </h2>
              <p className="max-w-md text-blue-100">
                Importez votre première fiche de paie dès aujourd&apos;hui et
                découvrez les anomalies en quelques secondes.
              </p>
              <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Link
                  href="/inscription"
                  className="btn group bg-beige-50 px-7 py-3 text-blue-700 hover:bg-white active:scale-[0.98]"
                >
                  Essayer A&A Audit
                  <ArrowRight />
                </Link>
                <Link
                  href="/contact"
                  className="btn border border-white/25 px-7 py-3 text-beige-50 hover:bg-white/10 active:scale-[0.98]"
                >
                  Contactez-nous
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </MarketingShell>
  );
}
