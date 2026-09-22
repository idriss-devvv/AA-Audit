import { redirect } from "next/navigation";

// Le dashboard a été déplacé dans le sous-dossier /app (destiné au
// sous-domaine app.domaine.fr). Cette page ne fait que rediriger.
export default function DashboardRedirect() {
  redirect("/app/dashboard");
}
