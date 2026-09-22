import { LegalPage } from "@/components/layout/legal-page";

export default function MentionsLegalesPage() {
  return (
    <LegalPage title="Mentions légales" updatedAt="À compléter">
      <p>
        Cette page doit être complétée et vérifiée avec les informations
        légales réelles de la société avant mise en ligne. Elle ne constitue
        pas un conseil juridique.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Raison sociale : [À compléter]
        <br />
        Forme juridique : [À compléter]
        <br />
        Capital social : [À compléter]
        <br />
        Siège social : [À compléter]
        <br />
        RCS / SIRET : [À compléter]
        <br />
        Directeur de la publication : [À compléter]
        <br />
        Contact : [À compléter]
      </p>

      <h2>Hébergement</h2>
      <p>
        Ce site est déployé sur Vercel Inc., 340 S Lemon Ave #4133, Walnut,
        CA 91789, États-Unis.
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble des contenus présents sur ce site (textes, logo,
        interface) est protégé et ne peut être reproduit sans autorisation.
      </p>
    </LegalPage>
  );
}
