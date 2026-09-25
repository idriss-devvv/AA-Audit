import { LegalPage } from "@/components/layout/legal-page";

export default function CguPage() {
  return (
    <LegalPage
      title="Conditions Générales d'Utilisation"
      updatedAt="À compléter"
    >
      <p>
        Les présentes CGU encadrent l&apos;utilisation du service A&A Audit.
        Ce contenu est un gabarit à faire relire et valider par un
        professionnel du droit avant publication.
      </p>

      <h2>1. Objet</h2>
      <p>
        A&A Audit est un service en ligne permettant de contrôler des fiches
        de paie afin d&apos;y détecter des anomalies et erreurs potentielles.
      </p>

      <h2>2. Accès au service</h2>
      <p>
        L&apos;accès au service nécessite la création d&apos;un compte et est
        soumis à un abonnement dont les conditions sont précisées lors de
        la souscription.
      </p>

      <h2>3. Responsabilité</h2>
      <p>
        Les résultats fournis par A&A Audit constituent une aide à la
        détection d&apos;anomalies et ne remplacent pas une expertise
        comptable ou juridique.
      </p>

      <h2>4. Données</h2>
      <p>
        Le traitement des données personnelles est décrit dans la{" "}
        <a href="/politique-confidentialite" className="text-blue-600 underline">
          politique de confidentialité
        </a>
        .
      </p>
    </LegalPage>
  );
}
