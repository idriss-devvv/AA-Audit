import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { MarketingIcon, type MarketingIconName } from "@/components/marketing/icons";

export type SceneName = "settings" | "account" | "signup" | "import" | "results" | "anomalies";
export type Step = { icon: MarketingIconName; title: string; text: string; /** Mini-animation (par défaut : déduite de l'icône). */ scene?: SceneName };

/** Étapes de la page d'accueil, reprises sur la page « Vérifier ma fiche de paie ». */
export const HOME_STEPS: Step[] = [
  {
    icon: "users",
    scene: "signup",
    title: "Créez votre compte gratuitement",
    text: "Inscription en une minute, sans carte bancaire : votre première fiche est offerte.",
  },
  {
    icon: "document",
    title: "Importez vos fiches de paie",
    text: "Déposez les PDF générés par votre logiciel de paie : l'analyse se lance automatiquement.",
  },
  {
    icon: "search",
    title: "Vos anomalies s'affichent",
    text: "Chaque écart est trié par gravité et expliqué, avec le montant attendu et sa source officielle.",
  },
];

/** Durée d'un cycle d'animation : chaque étape s'illumine à son tour. */
const CYCLE_S = 4.8;

function Scene({ children }: { children: React.ReactNode }) {
  return (
    <div
      aria-hidden
      className="relative mx-auto mt-6 h-28 w-full max-w-[15rem] overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-3 text-left shadow-inner-top"
    >
      {children}
    </div>
  );
}

/** Étape « Paramétrer » : un taux saisi, une option activée, un curseur réglé. */
function SettingsScene() {
  return (
    <Scene>
      <div className="flex items-center justify-between text-[10px] text-ink-300">
        <span>Taux AT/MP</span>
        <span className="rounded-md border border-blue-400/40 bg-blue-500/10 px-1.5 py-0.5 font-semibold tabular-nums text-blue-200">
          1,45 %<span className="anim-step-caret ml-px inline-block h-2.5 w-px translate-y-0.5 bg-blue-200" />
        </span>
      </div>
      <div className="mt-3 flex items-center justify-between text-[10px] text-ink-300">
        <span>Mutuelle</span>
        <span className="anim-step-track relative flex h-3.5 w-7 items-center rounded-full bg-white/15 px-0.5">
          <span className="anim-step-knob h-2.5 w-2.5 rounded-full bg-beige-50 shadow" />
        </span>
      </div>
      <div className="mt-3 text-[10px] text-ink-300">Prévoyance</div>
      <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10">
        <div className="anim-step-slider relative h-full w-[68%] rounded-full bg-blue-400">
          <span className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border border-blue-200 bg-beige-50" />
        </div>
      </div>
    </Scene>
  );
}

/** Étape « Créer son compte » : la fiche du compte se remplit. */
function AccountScene() {
  return (
    <Scene>
      <div className="flex items-center gap-2.5">
        <span className="anim-step-pop flex h-8 w-8 items-center justify-center rounded-full bg-blue-500/30 text-[10px] font-bold text-blue-100 [animation-delay:-3.4s]">
          AA
        </span>
        <div className="flex-1 space-y-1.5">
          <div className="anim-step-row h-1.5 w-3/4 rounded-full bg-white/25" />
          <div className="anim-step-row h-1.5 w-1/2 rounded-full bg-white/15 [animation-delay:0.2s]" />
        </div>
      </div>
      {["Client A", "Client B"].map((label, i) => (
        <div
          key={label}
          className="anim-step-row mt-2.5 flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-[10px] text-ink-300"
          style={{ animationDelay: `${0.5 + i * 0.35}s` }}
        >
          {label}
          <span className="text-blue-300">+</span>
        </div>
      ))}
    </Scene>
  );
}

/** Étape « Créer un compte gratuitement » : l'e-mail se saisit, le bouton valide, le compte est prêt. */
function SignupScene() {
  return (
    <Scene>
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-ink-300">Nouveau compte</span>
        <span className="anim-step-pop rounded-full bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
          Gratuit
        </span>
      </div>
      <div className="mt-2 flex items-center rounded-md border border-white/15 bg-white/[0.05] px-2 py-1.5 text-[10px] text-beige-100">
        <span className="overflow-hidden whitespace-nowrap">
          <span className="anim-step-type inline-block overflow-hidden align-bottom">vous@entreprise.fr</span>
        </span>
        <span className="anim-step-caret ml-px inline-block h-2.5 w-px bg-blue-200" />
      </div>
      <div className="anim-step-press mt-2 flex items-center justify-center gap-1 rounded-md bg-blue-500 py-1.5 text-[10px] font-semibold text-white">
        Créer mon compte
        <svg viewBox="0 0 20 20" fill="none" className="h-2.5 w-2.5">
          <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </Scene>
  );
}

/** Étape « Importer » : un PDF tombe dans la zone de dépôt, la barre se remplit. */
function ImportScene() {
  return (
    <Scene>
      <div className="flex h-full flex-col">
        <div className="relative flex flex-1 items-center justify-center rounded-lg border border-dashed border-blue-300/40">
          <div className="anim-step-drop flex h-11 w-9 flex-col items-center justify-end rounded-md border border-white/20 bg-beige-50 pb-1 shadow-lift">
            <span className="rounded-sm bg-rose-500 px-1 text-[7px] font-bold text-white">PDF</span>
          </div>
          <span className="anim-step-pop absolute right-2 top-2 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-white">
            <svg viewBox="0 0 20 20" fill="none" className="h-2.5 w-2.5">
              <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="anim-step-progress h-full w-full rounded-full bg-gradient-to-r from-blue-500 to-blue-300" />
        </div>
      </div>
    </Scene>
  );
}

/** Étape « Résultats » : les anomalies apparaissent par gravité, l'export pulse. */
function ResultsScene() {
  const rows = [
    { color: "bg-rose-400", width: "w-3/4" },
    { color: "bg-amber-400", width: "w-2/3" },
    { color: "bg-emerald-400", width: "w-1/2" },
  ];
  return (
    <Scene>
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <div
            key={row.color}
            className="anim-step-row flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1"
            style={{ animationDelay: `${i * 0.3}s` }}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${row.color}`} />
            <span className={`h-1.5 rounded-full bg-white/20 ${row.width}`} />
          </div>
        ))}
      </div>
      <span className="anim-step-bounce absolute bottom-2.5 right-2.5 flex items-center gap-1 rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/30">
        <svg viewBox="0 0 20 20" fill="none" className="h-2.5 w-2.5">
          <path d="M10 3v10m0 0-4-4m4 4 4-4M4 16h12" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Excel
      </span>
    </Scene>
  );
}

/** Étape « Anomalies » : les écarts s'affichent un à un, avec leur gravité. */
function AnomaliesScene() {
  const rows = [
    { label: "Critique", badge: "bg-rose-500/15 text-rose-300 ring-rose-400/30", text: "Vieillesse", amount: "−11,40 €" },
    { label: "Avertissement", badge: "bg-amber-500/15 text-amber-300 ring-amber-400/30", text: "Ancienneté", amount: "−32,00 €" },
    { label: "Conforme", badge: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/30", text: "Net à payer", amount: "OK" },
  ];
  return (
    <Scene>
      <div className="space-y-1.5">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className="anim-step-row flex items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-1.5 py-1"
            style={{ animationDelay: `${i * 0.35}s` }}
          >
            <span className={`w-[4.6rem] shrink-0 rounded px-1 py-px text-center text-[8px] font-semibold ring-1 ring-inset ${row.badge}`}>
              {row.label}
            </span>
            <span className="min-w-0 flex-1 truncate text-[9px] text-ink-300">{row.text}</span>
            <span className="text-[9px] font-semibold tabular-nums text-beige-100">{row.amount}</span>
          </div>
        ))}
      </div>
    </Scene>
  );
}

const SCENES: Record<SceneName, () => JSX.Element> = {
  settings: SettingsScene,
  account: AccountScene,
  signup: SignupScene,
  import: ImportScene,
  results: ResultsScene,
  anomalies: AnomaliesScene,
};

const SCENE_BY_ICON: Partial<Record<MarketingIconName, SceneName>> = {
  percent: "settings",
  users: "account",
  document: "import",
  download: "results",
  search: "anomalies",
};

/** Section sombre « Comment ça marche » en 3 étapes, avec une mini-animation par étape. */
export function StepsSection({ steps, id }: { steps: Step[]; id?: string }) {
  return (
    <section id={id} className="relative overflow-hidden bg-ink-900 py-24 text-beige-50 md:py-28">
      <div aria-hidden className="bg-grid-light mask-radial pointer-events-none absolute inset-0" />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-blue-500/25 blur-3xl" />
      <div className="container-page relative">
        <Reveal className="max-w-2xl">
          <span className="eyebrow text-ink-400">
            <span className="h-px w-6 bg-blue-300" />
            En {steps.length} étapes
          </span>
          <h2 className="heading-display mt-5 text-4xl text-beige-50 md:text-5xl">Comment ça marche</h2>
        </Reveal>
        <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-6">
          <Reveal className="pointer-events-none absolute left-[16%] right-[16%] top-7 hidden md:block">
            <div aria-hidden className="relative">
              <div className="h-px origin-left animate-grow-x bg-gradient-to-r from-blue-400/60 via-white/25 to-blue-400/60 [animation-delay:300ms]" />
              <span className="anim-step-travel absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300 shadow-[0_0_12px_3px_rgba(141,167,204,0.6)]" />
            </div>
          </Reveal>
          {steps.map((step, i) => {
            const sceneName = step.scene ?? SCENE_BY_ICON[step.icon];
            const SceneComponent = sceneName ? SCENES[sceneName] : null;
            return (
              <Reveal key={step.title} delay={i * 150} className="relative text-center">
                <span
                  className="anim-step-glow relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-ink-800 text-blue-300 shadow-inner-top"
                  style={{ animationDelay: `${(i * CYCLE_S) / steps.length}s` }}
                >
                  <MarketingIcon name={step.icon} className="h-6 w-6" />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-[11px] font-bold text-white">
                    {i + 1}
                  </span>
                </span>
                <h3 className="mt-6 text-lg font-semibold text-beige-50">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-ink-300">{step.text}</p>
                {SceneComponent && <SceneComponent />}
              </Reveal>
            );
          })}
        </div>
        <Reveal className="mt-14 flex flex-col items-center gap-3 text-center">
          <Link
            href="/inscription"
            className="btn group bg-beige-50 px-7 py-3 text-ink-900 shadow-lift hover:bg-white active:scale-[0.98]"
          >
            Essayer gratuitement
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
              <path d="M4 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <p className="text-xs text-ink-400">Première fiche analysée gratuitement, sans carte bancaire.</p>
        </Reveal>
      </div>
    </section>
  );
}
