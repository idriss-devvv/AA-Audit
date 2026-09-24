import { redirect } from "next/navigation";
import { getActiveCompanyContext } from "@/lib/active-company";
import { AddClientForm } from "@/components/app/add-client-form";
import { SwitchToClientButton } from "@/components/app/switch-to-client-button";

/**
 * Page de gestion des entreprises clientes — réservée aux comptes "cabinet
 * comptable". Un cabinet peut y ajouter de nouveaux clients et basculer le
 * contexte de l'espace /app (dashboard, historique, anomalies) sur l'un
 * d'eux pour consulter ses fiches de paie.
 */
export default async function ClientsPage() {
  const context = await getActiveCompanyContext();

  if (!context.isCabinet) {
    redirect("/app/dashboard");
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <h1 className="heading-display text-4xl md:text-[2.75rem]">Mes clients</h1>
      <p className="mt-3 max-w-2xl text-sm text-ink-500">
        Gérez les entreprises clientes de votre cabinet et basculez entre
        elles pour consulter leurs fiches de paie.
      </p>

      <div className="mt-8 card max-w-2xl p-6 sm:p-7">
        <h2 className="card-title">
          Ajouter un client
        </h2>
        <div className="mt-4">
          <AddClientForm />
        </div>
      </div>

      <div className="mt-6 max-w-2xl">
        <h2 className="card-title">
          Vos clients ({context.clients.length})
        </h2>

        {context.clients.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-ink-200 bg-beige-100/50 p-8 text-center">
            <p className="text-sm text-ink-500">
              Aucune entreprise cliente pour le moment. Ajoutez votre premier
              client ci-dessus pour commencer à contrôler ses fiches de paie.
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-3">
            {context.clients.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between gap-4 card p-5"
              >
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink-900">{client.name}</p>
                  {context.activeCompanyId === client.id && (
                    <span className="badge bg-blue-50 text-blue-700 ring-blue-200">
                      Consulté actuellement
                    </span>
                  )}
                </div>
                <SwitchToClientButton companyId={client.id} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
