import { createClient } from "@/lib/supabase/server";

type Agreement = { idcc_code: string; name: string; sector: string; coverage_note: string | null; verified_at: string };
type Text = { idcc_code: string; kind: string; title: string; effective_from: string | null; verified_at: string };

const formatDate = (value: string | null) =>
  value ? new Date(`${value.slice(0, 10)}T00:00:00`).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" }) : "—";

/**
 * Onglet « Conventions collectives » des Paramètres : conventions du registre,
 * dernier texte de salaires intégré et date du dernier relevé des critères.
 */
export async function ConventionsTab() {
  const supabase = await createClient();
  const [{ data: agreementsData }, { data: textsData }] = await Promise.all([
    supabase.from("collective_agreements").select("idcc_code, name, sector, coverage_note, verified_at"),
    supabase.from("cc_texts").select("idcc_code, kind, title, effective_from, verified_at"),
  ]);
  const texts = (textsData as Text[] | null) ?? [];

  const rows = ((agreementsData as Agreement[] | null) ?? [])
    .map((agreement) => {
      const own = texts.filter((t) => t.idcc_code === agreement.idcc_code);
      const salary = own
        .filter((t) => t.kind === "avenant_salaires" || t.kind === "protocole")
        .sort((a, b) => (b.effective_from ?? "").localeCompare(a.effective_from ?? ""))[0];
      const lastCheck = [agreement.verified_at, ...own.map((t) => t.verified_at)].filter(Boolean).sort().pop() ?? null;
      return { ...agreement, salary, lastCheck, texts: own.length };
    })
    .sort((a, b) => parseInt(a.idcc_code, 10) - parseInt(b.idcc_code, 10));

  return (
    <div className="mt-6 grid gap-6">
      <section className="card overflow-hidden">
        <div className="p-6 sm:p-7">
          <h2 className="card-title">Conventions collectives intégrées</h2>
          <p className="mt-1 text-xs text-ink-500">
            {rows.length} conventions contrôlées automatiquement. Les critères sont relevés sur Légifrance (base KALI) ;
            la convention de chaque fiche est reconnue par son numéro IDCC.
          </p>
        </div>
        <div className="overflow-x-auto border-t border-ink-100">
          <table className="w-full text-left text-sm">
            <thead className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-400">
              <tr>
                <th className="px-5 py-3">IDCC</th>
                <th className="px-5 py-3">Convention</th>
                <th className="px-5 py-3">Dernier texte de salaires</th>
                <th className="whitespace-nowrap px-5 py-3">Dernière mise à jour</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {rows.map((row) => (
                <tr key={row.idcc_code} className="align-top">
                  <td className="px-5 py-4 font-semibold tabular-nums text-ink-900">{row.idcc_code}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium text-ink-900">{row.name}</p>
                    <p className="text-xs text-ink-400">
                      {row.sector}
                      {row.coverage_note ? ` · ${row.coverage_note}` : ""}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-xs text-ink-600">
                    {row.salary ? (
                      <>
                        <p>{row.salary.title}</p>
                        <p className="mt-0.5 text-ink-400">En vigueur depuis le {formatDate(row.salary.effective_from)}</p>
                      </>
                    ) : (
                      <span className="text-ink-400">Minima régionaux ou texte de base seul</span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 text-xs text-ink-600">{formatDate(row.lastCheck)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
