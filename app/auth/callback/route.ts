import { NextResponse } from "next/server";

/** Email confirmation / OAuth callback — no backend in demo mode. */
export function GET(request: Request) {
  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/login`);
}
