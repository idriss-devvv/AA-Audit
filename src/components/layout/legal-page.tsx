import { MarketingShell } from "@/components/layout/marketing-shell";

export function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: React.ReactNode;
}) {
  return (
    <MarketingShell>
      <section className="container-page max-w-3xl py-20 md:py-28">
        <h1 className="heading-display text-5xl md:text-6xl">{title}</h1>
        <p className="mt-4 inline-flex rounded-full border border-ink-200/70 bg-white px-3 py-1 text-xs text-ink-500">
          Dernière mise à jour : {updatedAt}
        </p>
        <div className="prose prose-sm mt-12 max-w-none border-t border-ink-200/70 pt-4 text-[15px] text-ink-600 [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-normal [&_h2]:text-ink-900 [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:marker:text-blue-400">
          {children}
        </div>
      </section>
    </MarketingShell>
  );
}
