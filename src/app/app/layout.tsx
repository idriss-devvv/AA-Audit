import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/components/auth/logout-button";
import { SidebarNav } from "@/components/app/sidebar-nav";

// Shell de l'application (destinée au sous-domaine app.domaine.fr).
// Volontairement sans le header/footer du site vitrine.
// Protégée : redirige vers /connexion si l'utilisateur n'est pas connecté.
export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion");
  }

  return (
    <div className="min-h-screen bg-beige-50">
      <header className="border-b border-beige-200 bg-white">
        <div className="flex h-14 items-center justify-between px-6">
          <Link href="/app/dashboard" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-beige-50">
              PA
            </span>
            <span className="text-sm font-semibold text-ink-900">
              PayAudit
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-ink-500">{user.email}</span>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="flex">
        <SidebarNav />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
