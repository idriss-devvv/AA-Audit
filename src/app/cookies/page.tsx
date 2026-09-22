import { LegalPage } from "@/components/layout/legal-page";

export default function CookiesPage() {
  return (
    <LegalPage title="Politique de cookies" updatedAt="À compléter">
      <p>
        Ce site utilise des cookies nécessaires à son fonctionnement et, le
        cas échéant, des cookies de mesure d&apos;audience. Ce gabarit doit
        être précisé une fois les outils analytics/marketing choisis.
      </p>

      <h2>Cookies strictement nécessaires</h2>
      <p>Utilisés pour l&apos;authentification et la sécurité du service.</p>

      <h2>Cookies de mesure d&apos;audience</h2>
      <p>[À compléter selon la solution retenue, ex: Vercel Analytics]</p>

      <h2>Gestion des cookies</h2>
      <p>
        Vous pouvez configurer votre navigateur pour refuser les cookies non
        essentiels.
      </p>
    </LegalPage>
  );
}
