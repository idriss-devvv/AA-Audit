import { createClient } from "@/lib/supabase/server";

export default async function ParametresPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-ink-900">Paramètres</h1>
      <p className="mt-1 text-sm text-ink-500">
        Gérez les informations de votre compte et de votre entreprise.
      </p>

      <div className="mt-8 max-w-xl rounded-2xl border border-beige-200 bg-white p-6 shadow-soft">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
          Compte
        </h2>
        <dl className="mt-4 flex flex-col gap-3 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-ink-500">Email</dt>
            <dd className="font-medium text-ink-900">{user?.email}</dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-ink-500">Entreprise</dt>
            <dd className="font-medium text-ink-900">
              {(user?.user_metadata?.company_name as string) || "—"}
            </dd>
          </div>
        </dl>
      </div>

      <div className="mt-6 max-w-xl rounded-2xl border border-dashed border-beige-300 bg-beige-100 p-6 text-center">
        <p className="text-sm text-ink-500">
          Gestion de l&apos;abonnement, des utilisateurs et des notifications
          à venir.
        </p>
      </div>
    </div>
  );
}
