import { redirect } from "next/navigation";

// Historique et Anomalies sont réunis dans la page « Fiches de paie ».
export default function HistoriqueRedirect() {
  redirect("/app/fiches");
}
