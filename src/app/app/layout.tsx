import Link from "next/link";

// Shell de l'application (destinée au sous-domaine app.domaine.fr).
// Volontairement sans le header/footer du site vitrine.
export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-beige-50">
      <header className="border-b border-beige-200 bg-white">
        <div className="container-page flex h-14 items-center justify-between">
          <Link href="/app/dashboard" className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-blue-600 text-xs font-bold text-beige-50">
              PA
            </span>
            <span className="text-sm font-semibold text-ink-900">
              PayAudit
            </span>
          </Link>
          <span className="text-xs text-ink-500">app.domaine.fr</span>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
