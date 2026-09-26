import { PMSS_BY_YEAR, SMIC_HOURLY } from "@/lib/rules/referentiels/legal";
import { CONVENTION_GRIDS } from "@/lib/rules/referentiels/grilles-conventionnelles";
import { Reveal } from "@/components/ui/reveal";
import { MarketingIcon, type MarketingIconName } from "@/components/marketing/icons";

/** Date de la dernière vérification des valeurs légales du référentiel. */
export const LEGAL_VALUES_CHECKED_AT = "24 septembre 2026";

const EURO = (value: number, digits = 0) =>
  value.toLocaleString("fr-FR", { minimumFractionDigits: digits, maximumFractionDigits: digits });

function frenchDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  const formatted = date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
  // « 1 juin » → « 1er juin » (usage typographique français).
  return date.getDate() === 1 ? formatted.replace(/^1 /, "1er ") : formatted;
}

/** Liste des contrôles réellement appliqués par le moteur, avec leur source. */
export function getControls() {
  const pmssYear = Math.max(...Object.keys(PMSS_BY_YEAR).map(Number));
  const smic = SMIC_HOURLY[SMIC_HOURLY.length - 1];
  return [
    {
      title: "Salaire minimum conventionnel",
      icon: "scale" as MarketingIconName,
      detail: `Classification lue sur la fiche et comparée à la grille officielle de ${CONVENTION_GRIDS.length} conventions collectives.`,
      source: "Avenants « salaires » étendus — Légifrance",
    },
    {
      title: "SMIC",
      icon: "salary" as MarketingIconName,
      detail: `Salaire comparé au SMIC en vigueur à la date du bulletin : ${EURO(smic.rate, 2)} € brut de l'heure depuis le ${frenchDate(smic.from)}.`,
      source: "Décret et arrêté de revalorisation du SMIC",
    },
    {
      title: "Taux de cotisations",
      icon: "percent" as MarketingIconName,
      detail: "Chaque ligne de cotisation salariale (vieillesse, CSG/CRDS, retraite complémentaire…) comparée au barème officiel de la période.",
      source: "Urssaf · Agirc-Arrco",
    },
    {
      title: "Plafond de la Sécurité sociale",
      icon: "ceiling" as MarketingIconName,
      detail: `Base des cotisations plafonnées comparée au PMSS : ${EURO(PMSS_BY_YEAR[pmssYear])} € par mois en ${pmssYear}.`,
      source: "Arrêté annuel fixant le plafond (Journal officiel)",
    },
    {
      title: "Heures supplémentaires",
      icon: "clock" as MarketingIconName,
      detail: "Majoration de 25 % puis 50 %, ou taux conventionnel d'au moins 10 %.",
      source: "Code du travail, art. L3121-33 et L3121-36",
    },
    {
      title: "Mentions obligatoires",
      icon: "list" as MarketingIconName,
      detail: "Présence des mentions exigées : employeur, SIRET, convention, emploi, net social, net imposable…",
      source: "Code du travail, art. R3243-1",
    },
    {
      title: "Net à payer",
      icon: "calculator" as MarketingIconName,
      detail: "Brut − cotisations salariales = net avant impôt, puis − prélèvement à la source = net à payer.",
      source: "Cohérence arithmétique du bulletin",
    },
    {
      title: "Congés payés",
      icon: "calendar" as MarketingIconName,
      detail: "Solde de congés cohérent avec les jours acquis et les jours pris.",
      source: "Code du travail, art. L3141-3",
    },
  ];
}

/** Libellés courts des conventions dont la grille de salaires est intégrée. */
export function getConventionNames() {
  return CONVENTION_GRIDS.map((grid) => grid.label.split(" — ")[0]);
}

export function ControlsSection({ id = "controles" }: { id?: string }) {
  const controls = getControls();
  return (
    <section id={id} className="relative overflow-hidden border-t border-ink-200/60 bg-white py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-72 w-[720px] -translate-x-1/2 rounded-full bg-blue-50/80 blur-3xl" />
      <div className="container-page relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">
            <span className="h-px w-6 bg-blue-500" />
            Contrôles
            <span className="h-px w-6 bg-blue-500" />
          </span>
          <h2 className="heading-display mt-5 text-4xl md:text-5xl">Ce que nous vérifions</h2>
          <p className="mt-5 text-ink-500">
            Chaque contrôle s&apos;appuie sur une source officielle, datée et vérifiée. Valeurs
            légales mises à jour le {LEGAL_VALUES_CHECKED_AT}.
          </p>
        </Reveal>

        <dl className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {controls.map((control, i) => (
            <Reveal key={control.title} delay={(i % 4) * 80} className="h-full">
              <div className="group flex h-full flex-col rounded-2xl border border-ink-200/70 bg-beige-50/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:bg-white hover:shadow-lift">
                <dt>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-200/70 bg-white text-blue-600 transition duration-300 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-beige-50">
                    <MarketingIcon name={control.icon} className="h-5 w-5" />
                  </span>
                  <span className="mt-5 block font-semibold tracking-tight text-ink-900">{control.title}</span>
                </dt>
                <dd className="mt-2 flex-1 text-sm leading-relaxed text-ink-500">{control.detail}</dd>
                <dd className="mt-4 border-t border-ink-200/70 pt-3 text-[11px] font-medium leading-snug text-blue-700">
                  {control.source}
                </dd>
              </div>
            </Reveal>
          ))}
        </dl>

        <Reveal className="mt-10">
          <div className="rounded-3xl border border-ink-200/70 bg-gradient-to-br from-beige-50 to-white p-7 text-center">
            <p className="text-sm font-semibold text-ink-900">Grilles de salaires minimums intégrées</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {getConventionNames().map((name, i) => (
                <li
                  key={name}
                  style={{ animationDelay: `${i * 50}ms` }}
                  className="badge animate-fade-in bg-white px-3 py-1.5 font-medium text-ink-600 ring-ink-200/70 transition hover:ring-blue-300"
                >
                  {name}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-xs text-ink-400">
              La convention collective est détectée automatiquement sur chaque bulletin (numéro IDCC ou libellé).
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
