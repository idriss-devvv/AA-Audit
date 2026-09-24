import type { CollectiveAgreement } from "@/lib/pay-settings";

export type DetectedAgreement = { idcc: string; name: string };

const STOPWORDS = new Set([
  "convention",
  "collective",
  "nationale",
  "national",
  "personnel",
  "entreprises",
  "etablissements",
  "activites",
  "salaries",
  "moins",
  "plus",
]);

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function significantWords(value: string): string[] {
  return normalize(value)
    .split(" ")
    .filter((word) => word.length >= 4 && !STOPWORDS.has(word));
}

/**
 * Identifie automatiquement la convention collective d'une fiche de paie à
 * partir du registre des conventions prioritaires :
 * 1. par le numéro IDCC imprimé sur le bulletin (fiable) ;
 * 2. à défaut, par rapprochement du libellé détecté avec les noms du
 *    registre — retenu uniquement si une seule convention ressort nettement.
 */
export function detectCollectiveAgreement(
  detectedIdcc: string | null | undefined,
  detectedLabel: string | null | undefined,
  registry: CollectiveAgreement[]
): DetectedAgreement | null {
  if (detectedIdcc) {
    const byCode = registry.find((a) => String(parseInt(a.idcc_code, 10)) === detectedIdcc);
    if (byCode) return { idcc: byCode.idcc_code, name: byCode.name };
  }

  if (!detectedLabel) return null;

  // Sigle usuel entre parenthèses dans le registre : « (Syntec) », « (HCR) ».
  const allLabelWords = new Set(normalize(detectedLabel).split(" "));
  const byAlias = registry.find((a) => {
    const alias = a.name.match(/\(([^)]+)\)/)?.[1];
    return alias ? allLabelWords.has(normalize(alias)) : false;
  });
  if (byAlias) return { idcc: byAlias.idcc_code, name: byAlias.name };

  const labelWords = new Set(significantWords(detectedLabel));
  if (labelWords.size === 0) return null;

  const scored = registry
    .map((agreement) => {
      const words = significantWords(agreement.name);
      const hits = words.filter((word) => labelWords.has(word)).length;
      return { agreement, score: words.length > 0 ? hits / words.length : 0 };
    })
    .sort((a, b) => b.score - a.score);

  const [best, second] = scored;
  if (!best || best.score < 0.5) return null;
  if (second && second.score === best.score) return null;
  return { idcc: best.agreement.idcc_code, name: best.agreement.name };
}
