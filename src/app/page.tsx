import type { Metadata } from "next";
import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { SubscribeButton } from "@/components/pricing/subscribe-button";
import { Reveal } from "@/components/ui/reveal";
import { FaqItem } from "@/components/ui/faq-item";

export const metadata: Metadata = {
  title: "Contrôle automatique de fiches de paie",
  description:
    "PayAudit détecte automatiquement les anomalies sur vos fiches de paie : cotisations, brut/net, convention collective, congés payés et primes. Essayez gratuitement.",
  alternates: { canonical: "/" },
};

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
    </svg>
  );
}
function IconGrid() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function IconBook() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
    </svg>
  );
}
function IconSun() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}
function IconBuilding() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <rect x="4" y="2" width="16" height="20" rx="1" />
      <path d="M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1M9 22v-4h6v4" />
    </svg>
  );
}
function IconUsers() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconBriefcase() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
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
      "PayAudit repère la convention collective applicable sur chaque bulletin pour préparer des contrôles adaptés à votre secteur d'activité.",
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
    description:
      "Contrôlez rapidement les bulletins de plusieurs clients et sécurisez votre responsabilité sur la conformité de la paie.",
  },
  {
    icon: IconUsers,
    title: "Services RH & PME",
    description:
      "Fiabilisez la paie en interne sans embaucher un expert dédié, et gagnez un temps précieux chaque fin de mois.",
  },
  {
    icon: IconBriefcase,
    title: "Indépendants & salariés",
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
      "Règles personnalisées",
      "5 utilisateurs",
    ],
    priceId: "price_pro_150", // à remplacer par le vrai Price ID Stripe
    highlighted: true,
  },
];

const faqs = [
  {
    question: "Comment PayAudit détecte-t-il les anomalies sur une fiche de paie ?",
    answer:
      "PayAudit extrait automatiquement les données clés de chaque bulletin (salaire brut, net à payer, cotisations, congés payés, convention collective...) puis les compare à un moteur de règles de contrôle. Tout écart anormal — cotisation manquante, incohérence brut/net, solde de congés suspect — est signalé avec une explication claire.",
  },
  {
    question: "Quels formats de fiches de paie sont acceptés ?",
    answer:
      "Vous pouvez importer vos bulletins au format PDF directement depuis votre logiciel de paie. Le support des fichiers image (JPG, PNG) est en cours d'amélioration pour les bulletins scannés.",
  },
  {
    question: "Les règles de contrôle sont-elles personnalisables ?",
    answer:
      "Oui. Au-delà des vérifications standards (brut, net, cotisations), PayAudit extrait déjà la convention collective, le poste, l'ancienneté et les congés payés de chaque fiche. Des règles de contrôle avancées s'appuyant sur ces champs seront prochainement paramétrables selon votre secteur d'activité.",
  },
  {
    question: "Mes fiches de paie sont-elles stockées en sécurité ?",
    answer:
      "Chaque fichier importé est chiffré et cloisonné par compte utilisateur : personne d'autre que vous n'y a accès. Les données ne sont jamais revendues ni partagées avec des tiers.",
  },
  {
    question: "Puis-je essayer PayAudit avant de m'abonner ?",
    answer:
      "Oui, vous pouvez créer un compte et importer une fiche de paie dès maintenant pour voir l'analyse en action, avant de choisir la formule adaptée à votre volume mensuel.",
  },
  {
    question: "PayAudit convient-il à un cabinet comptable gérant plusieurs clients ?",
    answer:
      "Tout à fait. La formule Pro permet plusieurs utilisateurs et un volume de fiches plus important, pensée pour les cabinets et PME multi-entités. Pour un volume plus conséquent, une offre Entreprise sur mesure est disponible.",
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
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 animate-float-slow rounded-full bg-blue-100 opacity-60 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 top-10 h-72 w-72 animate-float rounded-full bg-beige-300/50 opacity-70 blur-3xl"
        />

        <div className="container-page relative flex flex-col items-center gap-6 py-24 text-center md:py-32">
          <span className="animate-fade-in-up rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
            Contrôle de paie automatisé
          </span>
          <h1 className="max-w-3xl animate-fade-in-up text-4xl font-extrabold tracking-tight text-ink-900 [animation-delay:80ms] md:text-6xl">
            Vérifiez chaque fiche de paie,{" "}
            <span className="text-blue-600">sans rien laisser passer</span>
          </h1>
          <p className="max-w-xl animate-fade-in-up text-lg text-ink-500 [animation-delay:160ms]">
            PayAudit détecte automatiquement les anomalies et erreurs sur vos
            fiches de paie : cotisations, plafonds, heures, primes, convention
            collective et congés payés.
          </p>
          <div className="flex animate-fade-in-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
            <Link
              href="/app/dashboard"
              className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-beige-50 shadow-soft transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0"
            >
              Essayer PayAudit
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-beige-300 bg-white px-7 py-3 text-sm font-semibold text-ink-900 transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-600 active:translate-y-0"
            >
              Demander une démo
            </Link>
          </div>

          <div className="mt-6 flex animate-fade-in-up flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-medium text-ink-500 [animation-delay:320ms]">
            <span className="flex items-center gap-1.5">
              <IconShield /> Fichiers chiffrés
            </span>
            <span className="flex items-center gap-1.5">Conforme RGPD</span>
            <span className="flex items-center gap-1.5">Aucune carte requise pour tester</span>
          </div>
        </div>
      </section>

      {/* Pourquoi contrôler ses fiches de paie */}
      <section className="border-t border-beige-200 bg-white py-24">
        <div className="container-page grid gap-12 md:grid-cols-2 md:items-center">
          <Reveal>
            <h2 className="text-3xl font-bold text-ink-900">
              Pourquoi contrôler vos fiches de paie ?
            </h2>
            <p className="mt-4 text-ink-500">
              Le bulletin de salaire cumule des dizaines de paramètres — taux de
              cotisations, plafonds de sécurité sociale, primes, heures
              supplémentaires, congés payés — qui évoluent régulièrement.
              Une seule ligne mal paramétrée dans le logiciel de paie peut se
              répéter chaque mois, pour un ou plusieurs salariés, sans être
              détectée.
            </p>
            <p className="mt-4 text-ink-500">
              PayAudit automatise cette vérification pour repérer les écarts
              avant qu&apos;ils ne deviennent un vrai problème : redressement
              URSSAF, litige prud&apos;homal ou simple perte de confiance des
              salariés.
            </p>
          </Reveal>
          <div className="grid gap-4">
            {[
              { title: "Erreurs de cotisations", desc: "Taux erronés, plafonds mal appliqués, lignes manquantes." },
              { title: "Incohérences brut / net", desc: "Écarts inexpliqués entre le salaire brut et le net à payer." },
              { title: "Congés payés mal suivis", desc: "Soldes de congés incohérents d'un mois sur l'autre." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 100}>
                <div className="flex items-start gap-4 rounded-2xl border border-beige-200 bg-beige-50 p-5">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-beige-50">
                    !
                  </span>
                  <div>
                    <p className="font-semibold text-ink-900">{item.title}</p>
                    <p className="mt-1 text-sm text-ink-500">{item.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="fonctionnalites" className="border-t border-beige-200 bg-beige-100 py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink-900">
              Une vérification pensée pour la fiabilité
            </h2>
            <p className="mt-3 text-ink-500">
              Bien plus qu&apos;un contrôle du brut et du net : PayAudit analyse
              chaque bulletin dans son ensemble.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <Reveal key={feature.title} delay={(i % 3) * 90}>
                <div className="group h-full rounded-2xl border border-beige-200 bg-white p-8 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-beige-50">
                    <feature.icon />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-500">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="comment-ca-marche" className="py-24">
        <div className="container-page">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-ink-900">
              Comment ça marche
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-500">
              Trois étapes suffisent pour passer d&apos;un PDF de paie à une
              analyse complète.
            </p>
          </Reveal>
          <div className="relative mt-14 grid gap-10 md:grid-cols-3">
            <div
              aria-hidden
              className="absolute left-0 right-0 top-6 hidden h-px bg-beige-300 md:block"
            />
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={i * 120} className="relative bg-beige-50 md:bg-transparent">
                <span className="relative z-10 inline-flex text-4xl font-extrabold text-beige-300">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pour qui */}
      <section className="border-t border-beige-200 bg-white py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink-900">Conçu pour tous les profils</h2>
            <p className="mt-3 text-ink-500">
              Que vous gériez la paie d&apos;une seule entreprise ou de
              plusieurs clients, PayAudit s&apos;adapte à votre usage.
            </p>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {audiences.map((audience, i) => (
              <Reveal key={audience.title} delay={i * 100}>
                <div className="h-full rounded-2xl border border-beige-200 bg-beige-50 p-8 text-center transition hover:border-blue-300">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-beige-50">
                    <audience.icon />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-ink-900">
                    {audience.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-500">
                    {audience.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="tarifs" className="border-t border-beige-200 bg-beige-100 py-24">
        <div className="container-page">
          <Reveal className="text-center">
            <h2 className="text-3xl font-bold text-ink-900">
              Des tarifs simples et transparents
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-ink-500">
              Choisissez la formule adaptée à votre volume de fiches de paie.
              Sans engagement.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {plans.map((plan, i) => (
              <Reveal key={plan.name} delay={i * 100}>
                <div
                  className={`flex h-full flex-col rounded-2xl border p-8 transition hover:-translate-y-1 ${
                    plan.highlighted
                      ? "border-blue-600 bg-blue-50 shadow-soft"
                      : "border-beige-200 bg-white"
                  }`}
                >
                  {plan.highlighted && (
                    <span className="mb-3 w-fit rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-beige-50">
                      Le plus populaire
                    </span>
                  )}
                  <h3 className="text-lg font-semibold text-ink-900">
                    {plan.name}
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">
                    {plan.description}
                  </p>
                  <p className="mt-6 text-4xl font-extrabold text-ink-900">
                    {plan.price}
                    <span className="text-base font-medium text-ink-500">
                      {plan.period}
                    </span>
                  </p>
                  <ul className="mt-6 flex-1 space-y-2 text-sm text-ink-700">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <span className="text-blue-600">✓</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8">
                    <SubscribeButton
                      priceId={plan.priceId}
                      label="S'abonner"
                      variant={plan.highlighted ? "primary" : "outline"}
                    />
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={200}>
              <div className="flex h-full flex-col rounded-2xl border border-beige-200 bg-white p-8 transition hover:-translate-y-1">
                <h3 className="text-lg font-semibold text-ink-900">
                  Entreprise
                </h3>
                <p className="mt-1 text-sm text-ink-500">
                  Volume important, accompagnement dédié.
                </p>
                <p className="mt-6 text-4xl font-extrabold text-ink-900">
                  Sur devis
                </p>
                <ul className="mt-6 flex-1 space-y-2 text-sm text-ink-700">
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span> Volume illimité
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span> Accompagnement dédié
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-blue-600">✓</span> Contrat sur mesure
                  </li>
                </ul>
                <div className="mt-8">
                  <Link
                    href="/contact-entreprise"
                    className="block w-full rounded-full border border-beige-300 bg-white px-6 py-3 text-center text-sm font-semibold text-ink-900 transition hover:border-blue-400 hover:text-blue-600"
                  >
                    Nous contacter
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="border-t border-beige-200 bg-white py-24">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-ink-900">Questions fréquentes</h2>
            <p className="mt-3 text-ink-500">
              Tout ce qu&apos;il faut savoir avant de contrôler vos premières fiches de paie.
            </p>
          </Reveal>
          <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-4">
            {faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={(i % 4) * 70}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="relative overflow-hidden border-t border-beige-200 bg-blue-600 py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-10 h-64 w-64 animate-pulse-soft rounded-full bg-blue-500/40 blur-3xl"
        />
        <Reveal className="container-page relative flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold text-beige-50">
            Prêt à sécuriser vos fiches de paie ?
          </h2>
          <p className="max-w-md text-blue-100">
            Importez votre première fiche de paie dès aujourd&apos;hui et
            découvrez les anomalies en quelques secondes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/app/dashboard"
              className="rounded-full bg-beige-50 px-7 py-3 text-sm font-semibold text-blue-600 transition hover:-translate-y-0.5 hover:bg-white"
            >
              Essayer PayAudit
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-beige-50 transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Contactez-nous
            </Link>
          </div>
        </Reveal>
      </section>
    </MarketingShell>
  );
}
