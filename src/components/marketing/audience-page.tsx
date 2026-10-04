import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { FaqItem } from "@/components/ui/faq-item";
import { Reveal } from "@/components/ui/reveal";
import { CountUp } from "@/components/ui/count-up";
import { StepsSection } from "@/components/marketing/steps-section";
import { ControlsSection, LEGAL_VALUES_CHECKED_AT, getControls } from "@/components/marketing/controls-section";
import { HeroVisual, type HeroVisualKind } from "@/components/marketing/hero-visuals";
import { MarketingIcon, type MarketingIconName } from "@/components/marketing/icons";
import { CONVENTION_GRIDS } from "@/lib/rules/referentiels/grilles-conventionnelles";
import { PMSS_BY_YEAR, SMIC_HOURLY } from "@/lib/rules/referentiels/legal";
import { SITE_URL } from "@/lib/site";

export type AudiencePageContent = {
  path: string;
  eyebrow: string;
  /** Titre H1 : `title` puis `titleAccent` en italique (lus ensemble par les moteurs). */
  title: string;
  titleAccent: string;
  /** Réponse directe en tête de page (reprise par les moteurs et les IA). */
  answer: string;
  visual: HeroVisualKind;
  questionsTitle: string;
  questions: { title: string; text: string; icon: MarketingIconName }[];
  steps: { title: string; text: string; icon: MarketingIconName }[];
  faqs: { question: string; answer: string }[];
  cta: string;
};

function ArrowRight() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
      <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Page d'atterrissage dédiée à un public (particulier, entreprise, cabinet). */
export function AudiencePage({ content }: { content: AudiencePageContent }) {
  const pmssYear = Math.max(...Object.keys(PMSS_BY_YEAR).map(Number));
  const smic = SMIC_HOURLY[SMIC_HOURLY.length - 1];
  const keyFigures = [
    { value: getControls().length, decimals: 0, suffix: "", label: "contrôles automatiques" },
    { value: CONVENTION_GRIDS.length, decimals: 0, suffix: "", label: "grilles conventionnelles intégrées" },
    { value: PMSS_BY_YEAR[pmssYear], decimals: 0, suffix: " €", label: `plafond mensuel de la Sécurité sociale ${pmssYear}` },
    { value: smic.rate, decimals: 2, suffix: " €", label: "SMIC horaire brut en vigueur" },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: content.eyebrow, item: `${SITE_URL}${content.path}` },
        ],
      },
    ],
  };

  return (
    <MarketingShell>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 animate-float-slow rounded-full bg-blue-100/70 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-24 top-40 h-80 w-80 animate-float-slow rounded-full bg-beige-200/60 blur-3xl [animation-delay:-4s]" />

        <div className="container-page relative grid items-center gap-16 pb-24 pt-14 md:pt-20 lg:grid-cols-[1.05fr_1fr] lg:pb-32">
          <div>
            <nav aria-label="Fil d'Ariane" className="animate-fade-in-up text-xs text-ink-400">
              <Link href="/" className="transition hover:text-ink-900">Accueil</Link>
              <span className="mx-2">/</span>
              <span className="text-ink-600">{content.eyebrow}</span>
            </nav>
            <span className="mt-6 inline-flex animate-fade-in-up items-center gap-2 rounded-full border border-ink-200/80 bg-white/70 px-4 py-1.5 text-xs font-medium text-ink-600 backdrop-blur [animation-delay:60ms]">
              <span className="h-1.5 w-1.5 animate-pulse-soft rounded-full bg-blue-500" />
              A&amp;A Audit pour les {content.eyebrow.toLowerCase()}
            </span>
            <h1 className="heading-display mt-6 animate-fade-in-up text-5xl [animation-delay:120ms] sm:text-6xl lg:text-[4.2rem]">
              {content.title} <em className="italic text-blue-600">{content.titleAccent}</em>
            </h1>
            <p className="mt-7 max-w-xl animate-fade-in-up text-base leading-relaxed text-ink-500 [animation-delay:180ms] md:text-lg">
              {content.answer}
            </p>
            <div className="mt-9 flex animate-fade-in-up flex-col gap-3 [animation-delay:240ms] sm:flex-row">
              <Link href="/inscription" className="btn-primary group px-7">
                {content.cta}
                <ArrowRight />
              </Link>
              <Link href="/#tarifs" className="btn-secondary px-7">
                Voir les tarifs
              </Link>
            </div>
            <p className="mt-6 animate-fade-in-up text-xs text-ink-400 [animation-delay:300ms]">
              Barèmes officiels vérifiés le {LEGAL_VALUES_CHECKED_AT} · Aucune carte bancaire pour créer un compte
            </p>
          </div>

          <HeroVisual kind={content.visual} />
        </div>
      </section>

      {/* ───────── Chiffres clés ───────── */}
      <section className="border-y border-ink-200/60 bg-white">
        <dl className="container-page grid grid-cols-2 divide-ink-200/70 lg:grid-cols-4 lg:divide-x">
          {keyFigures.map((figure, i) => (
            <Reveal key={figure.label} delay={i * 80} className="px-4 py-10 text-center">
              <dt className="sr-only">{figure.label}</dt>
              <dd className="font-display text-4xl text-ink-900 md:text-5xl">
                <CountUp value={figure.value} decimals={figure.decimals} suffix={figure.suffix} />
              </dd>
              <dd className="mx-auto mt-2 max-w-[12rem] text-xs leading-snug text-ink-500">{figure.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* ───────── Questions ───────── */}
      <section className="bg-beige-50 py-24 md:py-28">
        <div className="container-page">
          <Reveal className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">
              <span className="h-px w-6 bg-blue-500" />
              {content.eyebrow}
              <span className="h-px w-6 bg-blue-500" />
            </span>
            <h2 className="heading-display mt-5 text-4xl md:text-5xl">{content.questionsTitle}</h2>
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {content.questions.map((q, i) => (
              <Reveal key={q.title} delay={(i % 2) * 100 + Math.floor(i / 2) * 80} className="h-full">
                <div className="group relative h-full overflow-hidden rounded-3xl border border-ink-200/70 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lift md:p-8">
                  <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-blue-50 opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-beige-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] transition duration-300 group-hover:scale-105">
                    <MarketingIcon name={q.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="relative mt-6 text-lg font-semibold tracking-tight text-ink-900">{q.title}</h3>
                  <p className="relative mt-2.5 text-sm leading-relaxed text-ink-500">{q.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ControlsSection />

      {/* ───────── Étapes ───────── */}
      <StepsSection steps={content.steps} />

      {/* ───────── FAQ ───────── */}
      <section className="bg-beige-50 py-24 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="eyebrow">
              <span className="h-px w-6 bg-blue-500" />
              FAQ
            </span>
            <h2 className="heading-display mt-5 text-4xl md:text-5xl">Questions fréquentes</h2>
            <p className="mt-5 max-w-sm text-ink-500">
              A&amp;A Audit est une aide au contrôle : il ne remplace pas l&apos;avis d&apos;un
              expert-comptable ou d&apos;un juriste.
            </p>
            <Link href="/contact" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 transition hover:text-blue-800">
              Une autre question ? Contactez-nous <span aria-hidden>→</span>
            </Link>
          </Reveal>
          <div className="flex flex-col gap-3">
            {content.faqs.map((faq, i) => (
              <Reveal key={faq.question} delay={i * 70}>
                <FaqItem question={faq.question} answer={faq.answer} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Appel à l'action ───────── */}
      <section className="bg-beige-50 pb-24 md:pb-32">
        <div className="container-page">
          <Reveal className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-blue-800 via-blue-700 to-blue-600 px-6 py-20 text-center md:px-16">
            <div aria-hidden className="bg-grid-light mask-radial pointer-events-none absolute inset-0" />
            <div aria-hidden className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 animate-float-slow rounded-full bg-blue-400/30 blur-3xl" />
            <div aria-hidden className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 animate-pulse-soft rounded-full bg-beige-200/20 blur-3xl" />
            <div className="relative flex flex-col items-center">
              <h2 className="heading-display max-w-2xl text-4xl text-beige-50 md:text-6xl">
                Contrôlez votre première fiche <em className="italic text-blue-200">en quelques secondes</em>
              </h2>
              <p className="mt-5 max-w-md text-blue-100">
                Créez votre compte et importez un bulletin PDF : chaque écart est expliqué, avec sa source officielle.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/inscription"
                  className="btn group bg-beige-50 px-7 py-3 text-blue-700 hover:bg-white active:scale-[0.98]"
                >
                  {content.cta}
                  <ArrowRight />
                </Link>
                <Link
                  href="/contact"
                  className="btn border border-white/25 px-7 py-3 text-beige-50 hover:bg-white/10 active:scale-[0.98]"
                >
                  Demander une démo
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </MarketingShell>
  );
}
