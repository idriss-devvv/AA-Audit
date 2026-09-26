import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";
import { FaqItem } from "@/components/ui/faq-item";
import { ControlsSection } from "@/components/marketing/controls-section";
import { SITE_URL } from "@/lib/site";

export type AudiencePageContent = {
  path: string;
  eyebrow: string;
  title: string;
  /** Réponse directe en tête de page (reprise par les moteurs et les IA). */
  answer: string;
  questionsTitle: string;
  questions: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  faqs: { question: string; answer: string }[];
  cta: string;
};

function Check() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" aria-hidden>
      <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Page d'atterrissage dédiée à un public (particulier, entreprise, cabinet). */
export function AudiencePage({ content }: { content: AudiencePageContent }) {
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

      {/* En-tête : réponse directe */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[760px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="container-page relative py-20 text-center md:py-28">
          <nav aria-label="Fil d'Ariane" className="text-xs text-ink-400">
            <Link href="/" className="hover:text-ink-900">Accueil</Link>
            <span className="mx-2">/</span>
            <span className="text-ink-600">{content.eyebrow}</span>
          </nav>
          <h1 className="heading-display mx-auto mt-6 max-w-3xl text-5xl md:text-6xl">{content.title}</h1>
          <p className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-ink-500 md:text-lg">{content.answer}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/inscription" className="btn-primary px-7">
              {content.cta}
            </Link>
            <Link href="/#tarifs" className="btn-secondary px-7">
              Voir les tarifs
            </Link>
          </div>
        </div>
      </section>

      {/* Questions auxquelles l'outil répond */}
      <section className="border-t border-ink-200/60 bg-white py-20 md:py-24">
        <div className="container-page">
          <h2 className="heading-display text-center text-4xl md:text-5xl">{content.questionsTitle}</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {content.questions.map((q) => (
              <div key={q.title} className="rounded-2xl border border-ink-200/70 bg-beige-50 p-6">
                <h3 className="flex items-start gap-2.5 font-semibold text-ink-900">
                  <Check />
                  {q.title}
                </h3>
                <p className="mt-2 pl-6 text-sm leading-relaxed text-ink-500">{q.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ControlsSection />

      {/* Étapes */}
      <section className="relative overflow-hidden bg-ink-900 py-20 text-beige-50 md:py-24">
        <div aria-hidden className="bg-grid-light mask-radial pointer-events-none absolute inset-0" />
        <div className="container-page relative">
          <h2 className="heading-display text-4xl text-beige-50 md:text-5xl">Comment ça marche</h2>
          <ol className="mt-12 grid gap-6 md:grid-cols-3">
            {content.steps.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
                <span className="font-display text-4xl italic text-beige-300">0{i + 1}</span>
                <h3 className="mt-5 text-lg font-semibold text-beige-50">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-beige-50 py-20 md:py-24">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="heading-display text-4xl md:text-5xl">Questions fréquentes</h2>
            <p className="mt-5 max-w-sm text-ink-500">
              A&amp;A Audit est une aide au contrôle : il ne remplace pas l&apos;avis d&apos;un
              expert-comptable ou d&apos;un juriste.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            {content.faqs.map((faq) => (
              <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* Appel à l'action */}
      <section className="bg-beige-50 pb-24">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-blue-700 px-6 py-16 text-center md:px-16">
            <div aria-hidden className="bg-grid-light mask-radial pointer-events-none absolute inset-0" />
            <div className="relative">
              <h2 className="heading-display text-4xl text-beige-50 md:text-5xl">Prêt à contrôler votre première fiche ?</h2>
              <p className="mx-auto mt-4 max-w-md text-blue-100">
                Créez votre compte et importez un bulletin PDF : l&apos;analyse prend quelques secondes.
              </p>
              <Link
                href="/inscription"
                className="btn mt-8 bg-beige-50 px-7 py-3 text-blue-700 hover:bg-white active:scale-[0.98]"
              >
                {content.cta}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  );
}
