import { NextRequest, NextResponse } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

// Sous-domaine réservé à l'application (ex: app.domaine.fr).
const APP_SUBDOMAIN = "app";

// Pages d'authentification : inutiles pour un utilisateur déjà connecté.
const AUTH_PAGES = ["/connexion", "/inscription"];

type CookieToSet = {
  name: string;
  value: string;
  options?: CookieOptions;
};

/**
 * 1. Rafraîchit la session Supabase sur /app et les pages de connexion
 *    (nécessaire pour que les Server Components voient un utilisateur
 *    connecté).
 * 2. Redirige un utilisateur déjà connecté des pages de connexion /
 *    inscription vers son tableau de bord.
 * 3. Réécrit les requêtes venant de app.domaine.fr vers le préfixe /app
 *    (src/app/app) sans changer l'URL visible côté utilisateur.
 */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request });
  let isAuthenticated = false;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];
  const url = request.nextUrl;

  // Session vérifiée uniquement là où elle sert (espace /app et pages de
  // connexion) : les pages publiques évitent un appel réseau à Supabase Auth.
  const needsSession =
    url.pathname.startsWith("/app") || AUTH_PAGES.includes(url.pathname) || subdomain === APP_SUBDOMAIN;

  if (needsSession && supabaseUrl && supabaseAnonKey) {
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
    const result = await supabase.auth.getUser().catch(() => null);
    isAuthenticated = Boolean(result?.data.user);
  }

  if (isAuthenticated && AUTH_PAGES.includes(request.nextUrl.pathname)) {
    const redirect = NextResponse.redirect(new URL("/app/dashboard", request.url));
    // Conserve les cookies de session éventuellement rafraîchis ci-dessus.
    response.cookies.getAll().forEach((cookie) => redirect.cookies.set(cookie));
    return redirect;
  }

  if (subdomain === APP_SUBDOMAIN && !url.pathname.startsWith("/app")) {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url, { request });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
