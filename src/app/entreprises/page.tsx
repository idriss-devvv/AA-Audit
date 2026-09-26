import type { Metadata } from "next";
import { AudiencePage, type AudiencePageContent } from "@/components/marketing/audience-page";

const content: AudiencePageContent = {
  path: "/entreprises",
  eyebrow: "Entreprises",
  title: "Contrôle des fiches de paie pour les entreprises",
  answer:
    "A&A Audit contrôle automatiquement les bulletins de vos salariés : cotisations, minimums conventionnels, SMIC, heures supplémentaires et mentions obligatoires. Une erreur de paramétrage est repérée dès le premier bulletin, avant de se répéter chaque mois.",
  questionsTitle: "Ce que le contrôle vous évite",
  questions: [
    {
      title: "Une erreur de paramétrage répétée chaque mois",
      text: "Un taux mal saisi dans le logiciel de paie se reproduit sur tous les bulletins : il est signalé dès la première fiche contrôlée.",
    },
    {
      title: "Un salaire sous le minimum conventionnel",
      text: "La classification de chaque salarié est comparée à la grille de sa convention collective et au SMIC en vigueur.",
    },
    {
      title: "Des cotisations au mauvais taux",
      text: "Les taux salariaux Urssaf et Agirc-Arrco sont vérifiés, ainsi que vos propres taux (accident du travail, mutuelle, prévoyance).",
    },
    {
      title: "Un bulletin incomplet",
      text: "Les mentions obligatoires du Code du travail sont recherchées sur chaque fiche.",
    },
  ],
  steps: [
    { title: "Paramétrez votre entreprise", text: "Renseignez vos taux propres (accident du travail, mutuelle…) : le reste est automatique." },
    { title: "Importez les bulletins", text: "Déposez les PDF générés par votre logiciel de paie." },
    { title: "Exploitez les résultats", text: "Anomalies triées par gravité, rapport imprimable par fiche et exports Excel." },
  ],
  faqs: [
    {
      question: "Faut-il configurer les règles de contrôle ?",
      answer:
        "Non pour les valeurs légales : taux de cotisations, PMSS, SMIC et grilles conventionnelles sont intégrés et datés. Seuls les taux propres à votre entreprise (accident du travail, mutuelle, prévoyance) se renseignent dans les paramètres.",
    },
    {
      question: "La convention collective doit-elle être sélectionnée ?",
      answer: "Non : elle est détectée automatiquement sur chaque bulletin, par son numéro IDCC ou son libellé.",
    },
    {
      question: "Peut-on exporter les résultats ?",
      answer:
        "Oui : l'historique des fiches et la liste des anomalies s'exportent en Excel, et chaque fiche dispose d'un rapport de contrôle imprimable en PDF.",
    },
    {
      question: "A&A Audit remplace-t-il le logiciel de paie ?",
      answer: "Non : il contrôle les bulletins produits par votre logiciel de paie, quel qu'il soit, sans s'y substituer.",
    },
  ],
  cta: "Contrôler mes bulletins",
};

export const metadata: Metadata = {
  title: "Contrôle des fiches de paie pour les entreprises",
  description:
    "Logiciel de contrôle de paie pour PME et services RH : cotisations, minimums conventionnels, SMIC, heures supplémentaires et mentions obligatoires vérifiés automatiquement.",
  alternates: { canonical: content.path },
};

export default function Page() {
  return <AudiencePage content={content} />;
}
