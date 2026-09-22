import { NextRequest, NextResponse } from "next/server";

const APP_SUBDOMAIN = "app";

export function middleware(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const subdomain = hostname.split(".")[0];
  const url = request.nextUrl;

  if (subdomain === APP_SUBDOMAIN && !url.pathname.startsWith("/app")) {
    url.pathname = `/app${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
