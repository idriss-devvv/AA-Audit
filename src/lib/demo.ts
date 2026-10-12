/**
 * Branche « maquette » : version de présentation client. Seules la page
 * d'accueil, la connexion, l'inscription et les pages légales sont
 * accessibles ; les formulaires n'envoient rien.
 */
export const DEMO_MODE = true;

export const DEMO_ALLOWED_PATHS = [
  "/",
  "/connexion",
  "/inscription",
  "/mentions-legales",
  "/cgu",
  "/politique-confidentialite",
  "/cookies",
  // Fichiers générés par Next.js sans extension dans l'URL.
  "/icon",
  "/opengraph-image",
];

export const DEMO_MESSAGE =
  "Version de démonstration : la connexion et la création de compte seront ouvertes au lancement.";
