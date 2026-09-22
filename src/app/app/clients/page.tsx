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
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ink-900">Mes clients</h1>
      <p className="mt-1 text-sm text-ink-500">
        Gérez les entreprises clientes de votre cabinet et basculez entre
        elles pour consulter leurs fiches de paie.
      </p>

      <div className="mt-8 max-w-2xl rounded-2xl border border-beige-200 bg-white p-6 shadow-soft">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Ajouter un client
        </h2>
        <div className="mt-4">
          <AddClientForm />
        </div>
      </div>

      <div className="mt-6 max-w-2xl">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Vos clients ({context.clients.length})
        </h2>

        {context.clients.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-8 text-center">
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
                className="flex items-center justify-between gap-4 rounded-2xl border border-beige-200 bg-white p-5 shadow-soft"
              >
                <div className="flex items-center gap-2">
                  <p className="font-medium text-ink-900">{client.name}</p>
                  {context.activeCompanyId === client.id && (
                    <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
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
