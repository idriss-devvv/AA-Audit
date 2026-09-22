/**
 * Déclaration minimale pour l'import direct du module interne de pdf-parse.
 * On importe "pdf-parse/lib/pdf-parse.js" plutôt que "pdf-parse" pour éviter
 * le mode "debug" du package (qui tente de lire un fichier de test au
 * chargement, ce qui casse le build quand le module est bundlé par Next.js).
 */
declare module "pdf-parse/lib/pdf-parse.js" {
  interface PdfParseResult {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: unknown;
    version: string;
  }

  interface PdfParseOptions {
    pagerender?: (pageData: unknown) => string;
    max?: number;
    version?: string;
  }

  function pdfParse(dataBuffer: Buffer, options?: PdfParseOptions): Promise<PdfParseResult>;

  export default pdfParse;
}
