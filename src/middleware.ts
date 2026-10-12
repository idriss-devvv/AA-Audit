import { NextRequest, NextResponse } from "next/server";
import { DEMO_ALLOWED_PATHS } from "@/lib/demo";

/**
 * Branche « maquette » : seules les pages de présentation sont accessibles.
 * Toute autre page (espace connecté, tableau de bord, pages annexes) renvoie
 * vers l'accueil, et les routes d'API sont fermées.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/api") || pathname.startsWith("/auth")) {
    return NextResponse.json({ error: "Indisponible dans la version de démonstration." }, { status: 404 });
  }

  if (!DEMO_ALLOWED_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|.*\\..*).*)", "/api/:path*"],
};
