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
      <section className="container-page max-w-3xl py-20">
        <h1 className="text-3xl font-extrabold text-ink-900">{title}</h1>
        <p className="mt-2 text-sm text-ink-500">
          Dernière mise à jour : {updatedAt}
        </p>
        <div className="prose prose-sm mt-10 max-w-none text-ink-700 [&_h2]:mt-8 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-ink-900 [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </section>
    </MarketingShell>
  );
}
