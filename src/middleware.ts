import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const APP_SUBDOMAIN = "app";

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
        setAll(cookiesToSet) {
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
