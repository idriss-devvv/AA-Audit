import Link from "next/link";
import { MarketingShell } from "@/components/layout/marketing-shell";

const features = [
  {
    title: "Détection automatique",
    description:
      "Chaque fiche de paie est passée au crible d'un moteur de règles : cotisations, plafonds, heures, primes.",
  },
  {
    title: "Explication claire",
    description:
      "Chaque anomalie détectée est expliquée en langage simple, avec le montant attendu et l'écart constaté.",
  },
  {
    title: "Suivi centralisé",
    description:
      "Un tableau de bord unique pour suivre les fiches contrôlées, par employé, par période, par gravité.",
  },
];

const steps = [
  {
    number: "01",
    title: "Importez vos fiches de paie",
    description: "PDF ou export de votre logiciel de paie, en un clic.",
  },
  {
    number: "02",
    title: "L'analyse se lance automatiquement",
    description: "Le moteur de règles compare chaque ligne aux valeurs attendues.",
  },
  {
    number: "03",
    title: "Consultez les anomalies",
    description: "Retrouvez les écarts détectés, triés par gravité, dans votre dashboard.",
  },
];

export default function Home() {
  return (
    <MarketingShell>
      <section className="container-page flex flex-col items-center gap-6 py-24 text-center md:py-32">
        <span className="rounded-full bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-600">
          Contrôle de paie automatisé
        </span>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight text-ink-900 md:text-6xl">
          Vérifiez chaque fiche de paie,{" "}
          <span className="text-blue-600">sans rien laisser passer</span>
        </h1>
        <p className="max-w-xl text-lg text-ink-500">
          PayAudit détecte automatiquement les anomalies et erreurs sur vos
          fiches de paie : cotisations, plafonds, heures, primes et écarts
          inattendus.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/app/dashboard"
            className="rounded-full bg-blue-600 px-7 py-3 text-sm font-semibold text-beige-50 shadow-soft transition hover:bg-blue-700"
          >
            Essayer PayAudit
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-beige-300 bg-white px-7 py-3 text-sm font-semibold text-ink-900 transition hover:border-blue-400 hover:text-blue-600"
          >
            Demander une démo
          </Link>
        </div>
      </section>

      <section id="fonctionnalites" className="border-t border-beige-200 bg-white py-24">
        <div className="container-page">
          <h2 className="text-center text-3xl font-bold text-ink-900">
            Une vérification pensée pour la fiabilité
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-beige-200 bg-beige-50 p-8"
              >
                <h3 className="text-lg font-semibold text-ink-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="comment-ca-marche" className="py-24">
        <div className="container-page">
          <h2 className="text-center text-3xl font-bold text-ink-900">
            Comment ça marche
          </h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number}>
                <span className="text-4xl font-extrabold text-beige-300">
                  {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-beige-200 bg-blue-600 py-20">
        <div className="container-page flex flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-bold text-beige-50">
            Prêt à sécuriser vos fiches de paie ?
          </h2>
          <Link
            href="/contact"
            className="rounded-full bg-beige-50 px-7 py-3 text-sm font-semibold text-blue-600 transition hover:bg-white"
          >
            Contactez-nous
          </Link>
        </div>
      </section>
    </MarketingShell>
  );
}
