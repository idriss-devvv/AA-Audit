/**
 * Affichage commun des fiches de paie (tableau de bord, liste des fiches,
 * rapport, salariés) : un même libellé et une même couleur partout.
 */

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

/** « 2026-09 » → « Septembre 2026 ». */
export function formatPeriod(period: string | null | undefined): string {
  if (!period) return "—";
  const [year, month] = period.split("-");
  const label = MONTHS[Number(month) - 1];
  return label ? `${label} ${year}` : period;
}

export function formatAmount(value: number | null | undefined, empty = "—"): string {
  if (value === null || value === undefined) return empty;
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(value);
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("fr-FR");
}

export function isImageFile(mimeType: string | null | undefined): boolean {
  return Boolean(mimeType?.startsWith("image/"));
}

export type StatusInfo = { key: "processed" | "pending" | "image" | "error"; label: string; className: string };

/** Statut affiché : les images reçues attendent la lecture des bulletins scannés. */
export function statusInfo(status: string, mimeType: string | null | undefined): StatusInfo {
  if (status === "processed") {
    return { key: "processed", label: "Analysée", className: "bg-emerald-50 text-emerald-700 ring-emerald-200" };
  }
  if (status === "error") {
    return { key: "error", label: "Erreur de lecture", className: "bg-rose-50 text-rose-700 ring-rose-200" };
  }
  if (isImageFile(mimeType)) {
    return { key: "image", label: "Analyse bientôt disponible", className: "bg-blue-50 text-blue-700 ring-blue-200" };
  }
  return { key: "pending", label: "En attente", className: "bg-amber-50 text-amber-700 ring-amber-200" };
}

/** Explication lisible d'une fiche non analysée. */
export function statusExplanation(status: string, mimeType: string | null | undefined, errorMessage: string | null | undefined): string | null {
  if (status === "error") {
    return (
      errorMessage ||
      "Le PDF n'a pas pu être lu : il s'agit peut-être d'un document scanné, protégé par mot de passe ou endommagé. Réimportez l'export PDF de votre logiciel de paie."
    );
  }
  if (status !== "processed" && isImageFile(mimeType)) {
    return "L'analyse des photos et scans de fiches de paie arrive bientôt. Le fichier est conservé et n'est pas décompté de votre quota ; en attendant, importez l'export PDF de votre logiciel de paie pour une analyse immédiate.";
  }
  return null;
}

export const SEVERITY_INFO: Record<string, { label: string; className: string; accentClassName: string; order: number }> = {
  critical: { label: "Critique", className: "bg-rose-50 text-rose-700 ring-rose-200", accentClassName: "bg-rose-500", order: 0 },
  warning: { label: "Avertissement", className: "bg-amber-50 text-amber-700 ring-amber-200", accentClassName: "bg-amber-400", order: 1 },
  info: { label: "Info", className: "bg-blue-50 text-blue-700 ring-blue-200", accentClassName: "bg-blue-400", order: 2 },
};

/** Nom affiché du salarié (personne dont c'est la fiche), jamais celui de l'utilisateur. */
export function employeeDisplayName(
  employee: { first_name: string | null; last_name: string | null; employee_ref?: string | null } | null | undefined,
  extractedName?: string | null
): string {
  if (extractedName?.trim()) return extractedName.trim();
  if (!employee || employee.employee_ref === "non-identifie") return "Salarié non identifié";
  const name = [employee.first_name, employee.last_name].filter((part) => part && part !== "-").join(" ").trim();
  return name || "Salarié non identifié";
}
