import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { getAccountContext } from "@/lib/account";
import { ROLE_LABELS } from "@/lib/plans";
import { LogoutButton } from "@/components/auth/logout-button";
import { SidebarNav } from "@/components/app/sidebar-nav";
import { CompanySwitcher } from "@/components/app/company-switcher";
import { Logo } from "@/components/ui/logo";

// Shell de l'application (destinée au sous-domaine app.domaine.fr).
// Volontairement sans le header/footer du site vitrine.
// Protégée : redirige vers /connexion si l'utilisateur n'est pas connecté.
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Utilisateur, compte et société active chargés en parallèle ; les appels
  // Auth et profil sont partagés (mémoïsés) avec la page.
  const [user, account, companyContext] = await Promise.all([
    getCurrentUser(),
    getAccountContext(),
    getActiveCompanyContext(),
  ]);

  if (!user) {
    redirect("/connexion");
  }

  if (account.blocked) {
    redirect("/compte-bloque");
  }

  const navAccess = {
    companies: account.canManageCompanies,
    employees: account.canManageEmployees,
    admin: account.isStaff,
    companiesLabel: companyContext.isCabinet ? "Mes clients" : "Mes sociétés",
  };
  const initial = (user.email ?? "?").charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-beige-50 md:flex">
      {/* Barre latérale (desktop) */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-200/60 bg-beige-100/60 print:hidden md:flex">
        <div className="flex h-16 items-center px-5">
          <Link href="/app/dashboard" aria-label="A&A Audit — tableau de bord">
            <Logo size="sm" />
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto px-3 pt-4">
          <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-400">
            Espace
          </p>
          <SidebarNav access={navAccess} />
        </div>
        <div className="border-t border-ink-200/60 p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink-900 text-xs font-semibold text-beige-50">
              {initial}
            </span>
            <div className="min-w-0">
              <span className="block truncate text-xs text-ink-500">{user.email}</span>
              <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-400">
                {account.isStaff ? ROLE_LABELS[account.role] : `Formule ${account.plan.label}`}
              </span>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-ink-200/60 bg-beige-50/80 backdrop-blur-xl print:hidden">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
            <Link href="/app/dashboard" className="md:hidden" aria-label="A&A Audit — tableau de bord">
              <Logo size="sm" />
            </Link>
            <div className="hidden md:block" />
            <div className="flex items-center gap-3">
              {companyContext.clients.length > 0 && companyContext.ownCompanyId && companyContext.activeCompanyId && (
                <CompanySwitcher
                  ownCompanyId={companyContext.ownCompanyId}
                  ownCompanyName={companyContext.ownCompanyName ?? "Mon entreprise"}
                  clients={companyContext.clients}
                  activeCompanyId={companyContext.activeCompanyId}
                />
              )}
              <LogoutButton />
            </div>
          </div>
          <div className="md:hidden">
            <SidebarNav access={navAccess} orientation="horizontal" />
          </div>
        </header>
        <main className="min-w-0 flex-1 print:w-full">{children}</main>
      </div>
    </div>
  );
}
