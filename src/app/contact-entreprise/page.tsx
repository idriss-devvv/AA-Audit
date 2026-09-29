import { MarketingShell } from "@/components/layout/marketing-shell";

type QuoteParams = { fiches?: string; societes?: string; accompagnement?: string; facturation?: string };

export default function ContactEntreprisePage({ searchParams }: { searchParams: QuoteParams }) {
  // Valeurs reprises du simulateur Entreprise de la page d'accueil.
  const fiches = typeof searchParams.fiches === "string" ? searchParams.fiches : "";
  const volume = /^\d+$/.test(fiches.replace("+", "")) ? fiches.replace("+", "") : undefined;
  const options = [
    searchParams.societes === "1" ? "Multi-sociétés" : null,
    searchParams.accompagnement === "1" ? "Accompagnement dédié" : null,
    searchParams.facturation === "annuelle" ? "Facturation annuelle" : null,
  ].filter(Boolean) as string[];

  return (
    <MarketingShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="container-page relative py-20 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="heading-display text-5xl md:text-6xl">
            Parlons de votre volume
          </h1>
          <p className="mt-5 text-ink-500">
            Décrivez-nous votre besoin, nous revenons vers vous avec une offre
            adaptée à votre volume de fiches de paie.
          </p>
        </div>

        <form
          action="/api/contact-entreprise"
          method="POST"
          className="card mx-auto mt-12 flex max-w-xl flex-col gap-5 rounded-3xl p-7 shadow-lift sm:p-9"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="field-label">
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="field-label">
              Téléphone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="payslipVolume"
              className="field-label"
            >
              Nombre de fiches de paie à vérifier par mois (moyenne)
            </label>
            <input
              id="payslipVolume"
              name="payslipVolume"
              type="number"
              min={0}
              required
              defaultValue={volume}
              className="input"
            />
          </div>

          {options.length > 0 && (
            <div className="flex flex-col gap-1.5">
              <span className="field-label">Options choisies</span>
              <p className="text-sm text-ink-600">{options.join(" · ")}</p>
              <input type="hidden" name="options" value={options.join(", ")} />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary mt-2"
          >
            Envoyer la demande
          </button>
        </form>
      </div>
      </section>
    </MarketingShell>
  );
}
