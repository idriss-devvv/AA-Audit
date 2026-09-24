import Link from "next/link";

export const SETTINGS_TABS = [
  { id: "compte", label: "Compte" },
  { id: "abonnement", label: "Abonnement" },
  { id: "baremes", label: "Calcul et barèmes" },
] as const;

export type SettingsTabId = (typeof SETTINGS_TABS)[number]["id"];

export function resolveSettingsTab(value: string | string[] | undefined): SettingsTabId {
  const id = Array.isArray(value) ? value[0] : value;
  return SETTINGS_TABS.some((tab) => tab.id === id) ? (id as SettingsTabId) : "compte";
}

const ICONS: Record<SettingsTabId, React.ReactNode> = {
  compte: (
    <>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </>
  ),
  abonnement: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18M7 15h4" />
    </>
  ),
  baremes: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 7h6M9 11h1M14 11h1M9 15h1M14 15h1" />
    </>
  ),
};

/** Onglets de la page Paramètres (l'onglet actif est porté par l'URL : ?onglet=…). */
export function SettingsTabs({ active }: { active: SettingsTabId }) {
  return (
    <nav
      aria-label="Sections des paramètres"
      className="mt-8 flex gap-1 overflow-x-auto rounded-2xl border border-ink-200/70 bg-beige-100/60 p-1 sm:inline-flex"
    >
      {SETTINGS_TABS.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Link
            key={tab.id}
            href={`/app/parametres?onglet=${tab.id}`}
            aria-current={isActive ? "page" : undefined}
            scroll={false}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-white text-ink-900 shadow-soft ring-1 ring-ink-200/70"
                : "text-ink-500 hover:bg-white/60 hover:text-ink-900"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-ink-400"}`}
              aria-hidden
            >
              {ICONS[tab.id]}
            </svg>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
