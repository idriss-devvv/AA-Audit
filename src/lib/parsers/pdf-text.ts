import { getDocumentProxy } from "unpdf";

type PositionedText = { str: string; x: number; y: number; width: number };

/** Écart vertical (en points PDF) sous lequel deux fragments sont sur la même ligne. */
const SAME_LINE_TOLERANCE = 2.5;

/**
 * Extrait le texte d'un PDF en reconstituant les lignes visuelles du
 * document. `extractText` d'unpdf (mergePages) remplace tous les retours à la
 * ligne par des espaces, ce qui rend impossible la lecture « libellé → base →
 * taux → montant » d'un tableau de cotisations. Ici, les fragments sont
 * regroupés par ordonnée puis triés de gauche à droite, séparés par des
 * espaces, et chaque ligne du bulletin devient une ligne de texte.
 */
export async function extractPdfLines(buffer: Uint8Array): Promise<string> {
  const pdf = await getDocumentProxy(buffer);
  const pages: string[] = [];

  for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
    const page = await pdf.getPage(pageNumber);
    const content = await page.getTextContent();

    const items: PositionedText[] = [];
    for (const item of content.items) {
      if (!("str" in item) || !item.str.trim()) continue;
      items.push({ str: item.str, x: item.transform[4], y: item.transform[5], width: item.width });
    }

    // Du haut vers le bas de la page, puis de gauche à droite.
    items.sort((a, b) => b.y - a.y || a.x - b.x);

    const lines: PositionedText[][] = [];
    for (const item of items) {
      const line = lines.find((l) => Math.abs(l[0].y - item.y) <= SAME_LINE_TOLERANCE);
      if (line) line.push(item);
      else lines.push([item]);
    }

    const texts = lines.map((line) =>
      line
        .sort((a, b) => a.x - b.x)
        .map((item) => item.str.trim())
        .join(" ")
        .replace(/\s{2,}/g, " ")
    );

    pages.push(mergeWrappedLabels(texts).join("\n"));
  }

  return pages.join("\n");
}

const NUMBERS_ONLY = /^[\d\s.,%€-]+$/;
const HAS_NUMBER = /\d/;

/**
 * Dans un tableau, un libellé trop long passe sur deux lignes et les montants
 * se retrouvent sur une ligne à part (centrés verticalement dans la cellule).
 * On rattache une ligne composée uniquement de nombres au libellé sans nombre
 * qui la précède.
 */
function mergeWrappedLabels(lines: string[]): string[] {
  const result: string[] = [];
  for (const line of lines) {
    const previous = result[result.length - 1];
    if (previous !== undefined && NUMBERS_ONLY.test(line) && !HAS_NUMBER.test(previous)) {
      result[result.length - 1] = `${previous} ${line}`;
    } else {
      result.push(line);
    }
  }
  return result;
}
