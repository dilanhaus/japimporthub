"use server";

import { revalidatePath } from "next/cache";
import { getSessionUser } from "@/lib/auth/session";
import { updateRequestStatusById } from "@/lib/mock/store";
import type { RequestStatus } from "@/types/database";

export type AdminActionResult = { ok: true } | { ok: false; error: string };

const statuses: RequestStatus[] = [
  "submitted",
  "under_review",
  "options_ready",
  "deposit_pending",
  "sourcing",
  "in_transit",
  "customs",
  "delivered",
  "cancelled",
];

export async function updateVehicleRequestStatus(
  requestId: string,
  status: RequestStatus,
): Promise<AdminActionResult> {
  const session = await getSessionUser();
  if (!session?.profile || session.profile.role !== "admin") {
    return { ok: false, error: "Not allowed" };
  }

  if (!statuses.includes(status)) {
    return { ok: false, error: "Invalid status" };
  }

  const ok = updateRequestStatusById(requestId, status);
  if (!ok) {
    return { ok: false, error: "Request not found" };
  }

  revalidatePath(`/admin/requests/${requestId}`);
  revalidatePath("/admin/requests");
  revalidatePath(`/dashboard/requests/${requestId}`);
  revalidatePath("/dashboard");
  return { ok: true };
}
