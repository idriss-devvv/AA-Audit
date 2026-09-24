import { MarketingShell } from "@/components/layout/marketing-shell";

export default function ContactPage() {
  return (
    <MarketingShell>
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid mask-radial pointer-events-none absolute inset-0" />
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-blue-100/60 blur-3xl" />
        <div className="container-page relative py-20 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="heading-display text-5xl md:text-6xl">
            Parlons de votre paie
          </h1>
          <p className="mt-5 text-ink-500">
            Une question, une démo, un partenariat ? Écrivez-nous, nous
            revenons vers vous rapidement.
          </p>
        </div>

        <form
          action="/api/contact"
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
            <label htmlFor="message" className="field-label">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="input"
            />
          </div>

          <button
            type="submit"
            className="btn-primary mt-2"
          >
            Envoyer le message
          </button>
        </form>
      </div>
      </section>
    </MarketingShell>
  );
}
