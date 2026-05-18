import { cookies } from "next/headers";
import {
  DEMO_EMAIL_COOKIE,
  DEMO_NAME_COOKIE,
  DEMO_ROLE_COOKIE,
  DEMO_USER_ID,
} from "@/lib/mock/constants";
import type { ProfilesRow, UserRole } from "@/types/database";

export type SessionUser = {
  id: string;
  email: string | null;
  profile: ProfilesRow | null;
};

export async function getSessionUser(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const roleRaw = cookieStore.get(DEMO_ROLE_COOKIE)?.value;
  if (roleRaw !== "customer" && roleRaw !== "admin") {
    return null;
  }
  const role = roleRaw as UserRole;

  const email =
    cookieStore.get(DEMO_EMAIL_COOKIE)?.value ??
    (role === "admin" ? "admin@demo.local" : "customer@demo.local");
  const fullName =
    cookieStore.get(DEMO_NAME_COOKIE)?.value ??
    (role === "admin" ? "Demo Admin" : "Demo Customer");

  const profile: ProfilesRow = {
    id: DEMO_USER_ID,
    email,
    full_name: fullName,
    role,
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: "2025-01-01T00:00:00.000Z",
  };

  return {
    id: DEMO_USER_ID,
    email,
    profile,
  };
}

export async function requireSessionUser(): Promise<SessionUser> {
  const session = await getSessionUser();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
