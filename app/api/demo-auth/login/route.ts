import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  DEMO_EMAIL_COOKIE,
  DEMO_NAME_COOKIE,
  DEMO_ROLE_COOKIE,
} from "@/lib/mock/constants";

const COOKIE_OPTS = {
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
};

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as {
    role?: string;
    email?: string;
    fullName?: string;
  };

  const role = body.role === "admin" ? "admin" : "customer";
  const email =
    typeof body.email === "string" && body.email.trim().length > 0
      ? body.email.trim()
      : role === "admin"
        ? "admin@demo.local"
        : "customer@demo.local";
  const fullName =
    typeof body.fullName === "string" && body.fullName.trim().length > 0
      ? body.fullName.trim()
      : role === "admin"
        ? "Demo Admin"
        : "Demo Customer";

  const cookieStore = await cookies();
  cookieStore.set(DEMO_ROLE_COOKIE, role, COOKIE_OPTS);
  cookieStore.set(DEMO_EMAIL_COOKIE, email, COOKIE_OPTS);
  cookieStore.set(DEMO_NAME_COOKIE, fullName, COOKIE_OPTS);

  return NextResponse.json({ ok: true });
}
