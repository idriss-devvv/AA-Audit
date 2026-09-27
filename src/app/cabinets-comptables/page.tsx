import type { Metadata } from "next";
import { AudiencePage, type AudiencePageContent } from "@/components/marketing/audience-page";

const content: AudiencePageContent = {
  path: "/cabinets-comptables",
  eyebrow: "Cabinets comptables",
  title: "Logiciel de contrôle de paie",
  titleAccent: "pour cabinets comptables",
  visual: "cabinet",
  answer:
    "A&A Audit permet à un cabinet de contrôler les bulletins de tous ses clients depuis un seul compte : convention collective détectée automatiquement, minimums conventionnels, SMIC, taux de cotisations et mentions obligatoires vérifiés, rapports de contrôle prêts à partager.",
  questionsTitle: "Pensé pour le travail en cabinet",
  questions: [
    {
      icon: "users",
      title: "Tous vos clients dans un seul espace",
      text: "Ajoutez vos entreprises clientes et basculez de l'une à l'autre en un clic : fiches, anomalies et paramètres restent cloisonnés par client.",
    },
    {
      icon: "search",
      title: "Chaque convention reconnue automatiquement",
      text: "Pas de sélection à faire client par client : l'IDCC ou le libellé imprimé sur le bulletin suffit.",
    },
    {
      icon: "shield",
      title: "Des barèmes officiels, datés et sourcés",
      text: "Chaque contrôle indique la règle appliquée et sa source (Légifrance, Urssaf, Agirc-Arrco, Code du travail).",
    },
    {
      icon: "download",
      title: "Des livrables pour vos clients",
      text: "Rapport de contrôle imprimable par bulletin et exports Excel de l'historique et des anomalies.",
    },
  ],
  steps: [
    { icon: "users", title: "Créez votre compte cabinet", text: "Choisissez « Cabinet » à l'inscription, puis ajoutez vos clients." },
    { icon: "document", title: "Importez les bulletins", text: "Sélectionnez le client concerné et déposez ses PDF de paie." },
    { icon: "download", title: "Partagez les résultats", text: "Rapports par fiche et exports Excel à transmettre à vos clients." },
  ],
  faqs: [
    {
      question: "Combien de clients un cabinet peut-il gérer ?",
      answer:
        "Autant que nécessaire avec la formule Entreprise (à partir de 500 € / mois) : sociétés et fiches de paie illimitées, avec un onglet Salariés dans chaque société.",
    },
    {
      question: "Les données des clients sont-elles séparées ?",
      answer:
        "Oui : chaque entreprise cliente dispose de ses propres fiches, anomalies et paramètres, accessibles uniquement depuis le compte du cabinet.",
    },
    {
      question: "Quelles conventions collectives sont couvertes ?",
      answer:
        "Toutes sont détectées ; les grilles de salaires minimums sont intégrées pour les principales conventions (Syntec, Métallurgie, HCR, commerce, propreté, banque…). Pour les autres, un minimum peut être renseigné manuellement.",
    },
    {
      question: "Plusieurs collaborateurs du cabinet peuvent-ils utiliser le même compte ?",
      answer:
        "La gestion de plusieurs utilisateurs par cabinet est en préparation. Contactez-nous pour en être informé dès sa disponibilité.",
    },
  ],
  cta: "Créer mon compte cabinet",
};

export const metadata: Metadata = {
  title: "Logiciel de contrôle de paie pour cabinets comptables",
  description:
    "Contrôlez les fiches de paie de tous vos clients depuis un seul compte : convention détectée automatiquement, minimums conventionnels, SMIC et cotisations vérifiés.",
  alternates: { canonical: content.path },
};

export default function Page() {
  return <AudiencePage content={content} />;
}
