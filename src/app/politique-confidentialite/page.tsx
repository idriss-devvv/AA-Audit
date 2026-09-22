import { LegalPage } from "@/components/layout/legal-page";

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPage
      title="Politique de confidentialité"
      updatedAt="À compléter"
    >
      <p>
        PayAudit traite des données à caractère personnel et des données de
        paie dans le cadre de son service de contrôle des fiches de paie.
        Ce gabarit doit être complété selon le traitement réel des données
        (RGPD) avant mise en ligne.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>Données de compte (nom, email, entreprise)</li>
        <li>Fiches de paie et données salariales uploadées</li>
        <li>Données techniques de connexion</li>
      </ul>

      <h2>Finalités</h2>
      <p>
        Ces données sont utilisées pour fournir le service de détection
        d&apos;anomalies, assurer la sécurité du service et améliorer la
        qualité des règles de contrôle.
      </p>

      <h2>Durée de conservation</h2>
      <p>[À compléter selon la politique de rétention retenue]</p>

      <h2>Droits des utilisateurs</h2>
      <p>
        Conformément au RGPD, chaque utilisateur dispose d&apos;un droit
        d&apos;accès, de rectification, d&apos;effacement et de portabilité
        de ses données, exerçable à l&apos;adresse : [À compléter].
      </p>
    </LegalPage>
  );
}
