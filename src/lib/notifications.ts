import { createClient } from "@/lib/supabase/server";

export type AppNotification = {
  id: string;
  kind: "anomalie_critique" | "fiche_erreur" | "quota" | "info";
  severity: "info" | "warning" | "critical";
  title: string;
  body: string | null;
  link: string | null;
  read_at: string | null;
  created_at: string;
};

/** Dernières notifications de l'utilisateur connecté et nombre de non lues. */
export async function getNotifications(limit = 20): Promise<{ items: AppNotification[]; unread: number }> {
  const supabase = await createClient();
  const [{ data }, { count }] = await Promise.all([
    supabase
      .from("notifications")
      .select("id, kind, severity, title, body, link, read_at, created_at")
      .order("created_at", { ascending: false })
      .limit(limit),
    supabase.from("notifications").select("id", { count: "exact", head: true }).is("read_at", null),
  ]);
  return { items: (data as AppNotification[] | null) ?? [], unread: count ?? 0 };
}

type SupabaseClient = Awaited<ReturnType<typeof createClient>>;

/**
 * Prévient les utilisateurs de l'entreprise (et du cabinet qui la gère).
 * Une notification ratée ne doit jamais faire échouer l'action principale.
 */
export async function notifyCompany(
  supabase: SupabaseClient,
  companyId: string,
  notification: { kind: AppNotification["kind"]; severity: AppNotification["severity"]; title: string; body?: string; link?: string }
) {
  const { error } = await supabase.rpc("notify_company", {
    p_company: companyId,
    p_kind: notification.kind,
    p_severity: notification.severity,
    p_title: notification.title,
    p_body: notification.body ?? null,
    p_link: notification.link ?? null,
  });
  if (error) console.error("[notifications] envoi impossible :", error.message);
}
