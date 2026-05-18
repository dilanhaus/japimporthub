import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  DEMO_EMAIL_COOKIE,
  DEMO_NAME_COOKIE,
  DEMO_ROLE_COOKIE,
} from "@/lib/mock/constants";

export async function POST() {
  const cookieStore = await cookies();
  cookieStore.delete(DEMO_ROLE_COOKIE);
  cookieStore.delete(DEMO_EMAIL_COOKIE);
  cookieStore.delete(DEMO_NAME_COOKIE);

  return NextResponse.json({ ok: true });
}
