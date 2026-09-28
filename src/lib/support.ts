import { createClient } from "@/lib/supabase/server";

export type SupportContact = {
  name: string | null;
  email: string | null;
  phone: string | null;
  url: string | null;
  hours: string | null;
};

/** Coordonnées d'assistance du cabinet (réglées dans l'Administration). */
export async function getSupportContact(): Promise<SupportContact> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("platform_settings")
    .select("support_name, support_email, support_phone, support_url, support_hours")
    .maybeSingle();
  return {
    name: data?.support_name ?? null,
    email: data?.support_email ?? null,
    phone: data?.support_phone ?? null,
    url: data?.support_url ?? null,
    hours: data?.support_hours ?? null,
  };
}
