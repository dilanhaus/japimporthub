import { NextResponse, type NextRequest } from "next/server";
import { DEMO_ROLE_COOKIE } from "@/lib/mock/constants";

const PROTECTED_PREFIXES = ["/dashboard", "/admin"] as const;
const AUTH_ROUTES = ["/login", "/signup"] as const;

function isDemoAuthed(request: NextRequest) {
  const role = request.cookies.get(DEMO_ROLE_COOKIE)?.value;
  return role === "customer" || role === "admin";
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api")) {
    return NextResponse.next();
  }

  const authed = isDemoAuthed(request);

  if (
    !authed &&
    PROTECTED_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`))
  ) {
    const redirect = new URL("/login", request.url);
    redirect.searchParams.set("next", path);
    return NextResponse.redirect(redirect);
  }

  if (authed && AUTH_ROUTES.some((route) => path === route || path.startsWith(`${route}/`))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
