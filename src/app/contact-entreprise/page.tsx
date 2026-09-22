import { MarketingShell } from "@/components/layout/marketing-shell";

export default function ContactEntreprisePage() {
  return (
    <MarketingShell>
      <section className="container-page py-20">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-4xl font-extrabold text-ink-900">
            Parlons de votre volume
          </h1>
          <p className="mt-3 text-ink-500">
            Décrivez-nous votre besoin, nous revenons vers vous avec une offre
            adaptée à votre volume de fiches de paie.
          </p>
        </div>

        <form
          action="/api/contact-entreprise"
          method="POST"
          className="mx-auto mt-12 flex max-w-xl flex-col gap-5 rounded-2xl border border-beige-200 bg-white p-8 shadow-soft"
        >
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm font-medium text-ink-700">
              Nom
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="rounded-lg border border-beige-200 bg-beige-50 px-4 py-2.5 text-ink-900 outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-sm font-medium text-ink-700">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-lg border border-beige-200 bg-beige-50 px-4 py-2.5 text-ink-900 outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="phone" className="text-sm font-medium text-ink-700">
              Téléphone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              className="rounded-lg border border-beige-200 bg-beige-50 px-4 py-2.5 text-ink-900 outline-none focus:border-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="payslipVolume"
              className="text-sm font-medium text-ink-700"
            >
              Nombre de fiches de paie à vérifier par mois (moyenne)
            </label>
            <input
              id="payslipVolume"
              name="payslipVolume"
              type="number"
              min={0}
              required
              className="rounded-lg border border-beige-200 bg-beige-50 px-4 py-2.5 text-ink-900 outline-none focus:border-blue-400"
            />
          </div>

          <button
            type="submit"
            className="mt-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-beige-50 transition hover:bg-blue-700"
          >
            Envoyer la demande
          </button>
        </form>
      </section>
    </MarketingShell>
  );
}
