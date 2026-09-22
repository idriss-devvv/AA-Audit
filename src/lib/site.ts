/**
 * URL canonique du site, utilisée pour les métadonnées SEO (Open Graph,
 * canonical, sitemap, robots.txt...). À surcharger via la variable
 * d'environnement NEXT_PUBLIC_SITE_URL une fois un nom de domaine dédié
 * configuré (ex: https://app.payaudit.fr).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://payaudit-seven.vercel.app";

export const SITE_NAME = "PayAudit";
