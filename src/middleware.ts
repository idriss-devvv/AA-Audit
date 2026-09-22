import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Sous-domaine réservé à l'application (ex: app.domaine.fr).
const APP_SUBDOMAIN = "app";

type CookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

/**
 * 1. Rafraîchit la session Supabase (nécessaire pour que les Server
 *    Components voient un utilisateur connecté).
 * 2. Réécrit les requêtes venant de app.domaine.fr vers le préfixe /app
 *    (src/app/app) sans changer l'URL visible côté utilisateur.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: CookieToSet[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    });

    // Ne bloque jamais la requête si Supabase est indisponible.
    await supabase.auth.getUser().catch(() => null);
  }

  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];
  const url = request.nextUrl;

  if (subdomain === APP_SUBDOMAIN && !url.pathname.startsWith("/app")) {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url, { request });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
