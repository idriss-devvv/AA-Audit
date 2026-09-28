import Link from "next/link";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/supabase/server";
import { getActiveCompanyContext } from "@/lib/active-company";
import { getAccountContext } from "@/lib/account";
import { ROLE_LABELS } from "@/lib/plans";
import { AccountMenu } from "@/components/app/account-menu";
import { MobileNav, SidebarNav } from "@/components/app/sidebar-nav";
import { CompanySwitcher } from "@/components/app/company-switcher";
import { HelpButton } from "@/components/app/help-button";
import { getSupportContact } from "@/lib/support";
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
  const [user, account, companyContext, supportContact] = await Promise.all([
    getCurrentUser(),
    getAccountContext(),
    getActiveCompanyContext(),
    getSupportContact(),
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
  const accountSubtitle = account.isStaff ? ROLE_LABELS[account.role] : `Formule ${account.plan.label}`;

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
              <HelpButton contact={supportContact} />
              <AccountMenu email={user.email ?? ""} subtitle={accountSubtitle} />
            </div>
          </div>
        </header>
        {/* Marge basse sur mobile : la barre de navigation est fixée en bas. */}
        <main className="min-w-0 flex-1 pb-20 print:w-full print:pb-0 md:pb-0">{children}</main>
        <MobileNav access={navAccess} />
      </div>
    </div>
  );
}
