import { getActiveCompanyContext } from "@/lib/active-company";
import { getAccountContext } from "@/lib/account";
import { AddClientForm } from "@/components/app/add-client-form";
import { SwitchToClientButton } from "@/components/app/switch-to-client-button";
import { UpgradeNotice } from "@/components/app/upgrade-notice";

/**
 * Onglet « Sociétés » (« Mes clients » pour un cabinet) : gestion de
 * plusieurs sociétés sous un seul compte, réservée à la formule Entreprise.
 * Chaque société a ses propres fiches, anomalies, salariés et paramètres ;
 * on bascule de l'une à l'autre pour les consulter.
 */
export default async function ClientsPage() {
  const [context, account] = await Promise.all([getActiveCompanyContext(), getAccountContext()]);
  const noun = context.isCabinet ? { plural: "clients", singular: "client", title: "Mes clients" } : { plural: "sociétés", singular: "société", title: "Mes sociétés" };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <h1 className="heading-display text-4xl md:text-[2.75rem]">{noun.title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">
        Gérez plusieurs {noun.plural} depuis un seul compte : chacune a ses propres fiches de paie,
        anomalies, salariés et paramètres. Basculez de l&apos;une à l&apos;autre pour les consulter.
      </p>

      {!account.canManageCompanies ? (
        <div className="mt-8 max-w-2xl">
          <UpgradeNotice
            title={`Gérez plusieurs ${noun.plural}`}
            text="Regroupez toutes vos sociétés dans un seul compte, avec des fiches de paie illimitées et un onglet Salariés dans chaque société."
            requiredPlan="entreprise"
          />
        </div>
      ) : (
        <div className="mt-8 card max-w-2xl p-6 sm:p-7">
          <h2 className="card-title">Ajouter une {noun.singular === "client" ? "entreprise cliente" : "société"}</h2>
          <div className="mt-4">
            <AddClientForm />
          </div>
        </div>
      )}

      <div className="mt-6 max-w-2xl">
        <h2 className="card-title">
          Vos {noun.plural} ({context.clients.length + (context.ownCompanyId ? 1 : 0)})
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {context.ownCompanyId && (
            <div className="card flex items-center justify-between gap-4 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-ink-900">{context.ownCompanyName}</p>
                <span className="badge bg-beige-100 text-ink-600 ring-ink-200/70">Principale</span>
                {context.activeCompanyId === context.ownCompanyId && (
                  <span className="badge bg-blue-50 text-blue-700 ring-blue-200">Consultée actuellement</span>
                )}
              </div>
              {context.activeCompanyId !== context.ownCompanyId && <SwitchToClientButton companyId={context.ownCompanyId} />}
            </div>
          )}
          {context.clients.map((client) => (
            <div key={client.id} className="card flex items-center justify-between gap-4 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <p className="font-medium text-ink-900">{client.name}</p>
                {context.activeCompanyId === client.id && (
                  <span className="badge bg-blue-50 text-blue-700 ring-blue-200">Consultée actuellement</span>
                )}
              </div>
              {context.activeCompanyId !== client.id && <SwitchToClientButton companyId={client.id} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
