import { PMSS_BY_YEAR, SMIC_HOURLY } from "@/lib/rules/referentiels/legal";
import { CONVENTION_GRIDS } from "@/lib/rules/referentiels/grilles-conventionnelles";

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
      detail: `Classification lue sur la fiche et comparée à la grille officielle de ${CONVENTION_GRIDS.length} conventions collectives.`,
      source: "Avenants « salaires » étendus — Légifrance",
    },
    {
      title: "SMIC",
      detail: `Salaire comparé au SMIC en vigueur à la date du bulletin : ${EURO(smic.rate, 2)} € brut de l'heure depuis le ${frenchDate(smic.from)}.`,
      source: "Décret et arrêté de revalorisation du SMIC",
    },
    {
      title: "Taux de cotisations",
      detail: "Chaque ligne de cotisation salariale (vieillesse, CSG/CRDS, retraite complémentaire…) comparée au barème officiel de la période.",
      source: "Urssaf · Agirc-Arrco",
    },
    {
      title: "Plafond de la Sécurité sociale",
      detail: `Base des cotisations plafonnées comparée au PMSS : ${EURO(PMSS_BY_YEAR[pmssYear])} € par mois en ${pmssYear}.`,
      source: "Arrêté annuel fixant le plafond (Journal officiel)",
    },
    {
      title: "Heures supplémentaires",
      detail: "Majoration de 25 % puis 50 %, ou taux conventionnel d'au moins 10 %.",
      source: "Code du travail, art. L3121-33 et L3121-36",
    },
    {
      title: "Mentions obligatoires",
      detail: "Présence des mentions exigées : employeur, SIRET, convention, emploi, net social, net imposable…",
      source: "Code du travail, art. R3243-1",
    },
    {
      title: "Net à payer",
      detail: "Brut − cotisations salariales = net avant impôt, puis − prélèvement à la source = net à payer.",
      source: "Cohérence arithmétique du bulletin",
    },
    {
      title: "Congés payés",
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
    <section id={id} className="border-t border-ink-200/60 bg-white py-24 md:py-32">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
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
        </div>

        <dl className="mt-16 grid gap-4 md:grid-cols-2">
          {controls.map((control) => (
            <div key={control.title} className="rounded-2xl border border-ink-200/70 bg-beige-50 p-6">
              <dt className="flex items-center gap-2.5 font-semibold text-ink-900">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 shrink-0 text-blue-500" aria-hidden>
                  <path d="m5 10.5 3 3 7-7" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {control.title}
              </dt>
              <dd className="mt-2 text-sm leading-relaxed text-ink-500">{control.detail}</dd>
              <dd className="mt-3 text-xs font-medium text-blue-700">Source : {control.source}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 rounded-2xl border border-ink-200/70 bg-white p-6 text-center">
          <p className="text-sm font-semibold text-ink-900">Grilles de salaires minimums intégrées</p>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {getConventionNames().map((name) => (
              <li key={name} className="badge bg-beige-100 font-medium text-ink-600 ring-ink-200/70">
                {name}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-ink-400">
            La convention collective est détectée automatiquement sur chaque bulletin (numéro IDCC ou libellé).
          </p>
        </div>
      </div>
    </section>
  );
}
