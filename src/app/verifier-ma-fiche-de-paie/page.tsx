import type { Metadata } from "next";
import { AudiencePage, type AudiencePageContent } from "@/components/marketing/audience-page";

const content: AudiencePageContent = {
  path: "/verifier-ma-fiche-de-paie",
  eyebrow: "Particuliers",
  title: "Vérifier sa fiche de paie",
  titleAccent: "en ligne",
  visual: "particulier",
  answer:
    "Importez votre bulletin de salaire en PDF : A&A Audit contrôle en quelques secondes votre salaire minimum, vos cotisations, vos heures supplémentaires et vos congés payés, à partir des barèmes officiels en vigueur, et vous explique chaque écart en langage clair.",
  questionsTitle: "Les questions auxquelles vous obtenez une réponse",
  questions: [
    {
      icon: "scale",
      title: "Suis-je payé au moins au minimum de ma convention ?",
      text: "Votre convention collective et votre classification sont lues sur le bulletin, puis comparées à la grille officielle et au SMIC.",
    },
    {
      icon: "clock",
      title: "Mes heures supplémentaires sont-elles bien majorées ?",
      text: "La majoration appliquée est comparée aux taux légaux (25 %, 50 %) et au minimum de 10 % prévu en cas d'accord collectif.",
    },
    {
      icon: "percent",
      title: "Mes cotisations sont-elles au bon taux ?",
      text: "Chaque ligne salariale (vieillesse, CSG/CRDS, retraite complémentaire) est comparée au barème de la période.",
    },
    {
      icon: "calendar",
      title: "Mon solde de congés payés est-il juste ?",
      text: "Le solde affiché est comparé aux jours acquis et aux jours pris indiqués sur le bulletin.",
    },
  ],
  steps: [
    { icon: "users", title: "Créez votre compte", text: "Choisissez « Particulier » à l'inscription : votre espace est créé à votre nom." },
    { icon: "document", title: "Importez votre bulletin", text: "Déposez le PDF de votre fiche de paie, tel que fourni par votre employeur." },
    { icon: "search", title: "Lisez le rapport", text: "Chaque anomalie est expliquée, avec le montant attendu et la source officielle." },
  ],
  faqs: [
    {
      question: "Comment vérifier sa fiche de paie ?",
      answer:
        "Il faut contrôler le salaire de base au regard de la convention collective et du SMIC, les taux de cotisations, les heures supplémentaires, le net à payer et les congés payés. A&A Audit réalise ces vérifications automatiquement à partir du PDF de votre bulletin.",
    },
    {
      question: "Que faire si une anomalie est détectée ?",
      answer:
        "Rapprochez-vous de votre service paie ou RH avec le rapport de contrôle : il indique l'écart constaté et la règle concernée. A&A Audit est une aide au contrôle et ne remplace pas un conseil juridique.",
    },
    {
      question: "Quels bulletins sont acceptés ?",
      answer:
        "Les bulletins au format PDF issus d'un logiciel de paie. Les photos et scans (JPG, PNG) peuvent être importés : leur analyse arrive bientôt, et ils ne sont pas décomptés du quota en attendant.",
    },
    {
      question: "Mes données sont-elles protégées ?",
      answer:
        "Vos bulletins sont stockés chez notre hébergeur en France (Paris) et ne sont accessibles que depuis votre compte. Ils ne sont jamais revendus ni partagés.",
    },
  ],
  cta: "Vérifier ma fiche de paie",
};

export const metadata: Metadata = {
  title: "Vérifier sa fiche de paie en ligne",
  description:
    "Vérifiez votre fiche de paie en ligne : salaire minimum conventionnel, SMIC, cotisations, heures supplémentaires et congés payés contrôlés à partir des barèmes officiels.",
  alternates: { canonical: content.path },
};

export default function Page() {
  return <AudiencePage content={content} />;
}
