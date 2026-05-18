"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth/session";
import { insertVehicleRequest } from "@/lib/mock/store";

const schema = z.object({
  make: z.string().min(1, "Make is required").max(120),
  model: z.string().min(1, "Model is required").max(120),
  variant: z.string().max(160).optional().nullable(),
  yearMin: z.coerce.number().int().min(1980).max(new Date().getFullYear() + 2).optional().nullable(),
  yearMax: z.coerce.number().int().min(1980).max(new Date().getFullYear() + 2).optional().nullable(),
  budgetMaxGbp: z.coerce.number().positive().optional().nullable(),
  mileageMaxKm: z.coerce.number().int().positive().optional().nullable(),
  transmission: z.string().max(80).optional().nullable(),
  colorPreferences: z.string().max(500).optional().nullable(),
  destinationPort: z.string().max(120).optional().nullable(),
  notes: z.string().max(4000).optional().nullable(),
});

export type VehicleRequestInput = z.infer<typeof schema>;

export type ActionResult =
  | { ok: true; requestId: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

export async function createVehicleRequest(
  input: VehicleRequestInput,
): Promise<ActionResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return {
      ok: false,
      error: "Please check the form for errors.",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const session = await getSessionUser();
  if (!session) {
    return { ok: false, error: "You must be signed in to submit a request." };
  }

  const v = parsed.data;
  if (v.yearMin && v.yearMax && v.yearMin > v.yearMax) {
    return { ok: false, error: "Year range is invalid (min cannot be after max)." };
  }

  const row = insertVehicleRequest({
    customer_id: session.id,
    make: v.make.trim(),
    model: v.model.trim(),
    variant: v.variant?.trim() || null,
    year_min: v.yearMin ?? null,
    year_max: v.yearMax ?? null,
    budget_max_gbp: v.budgetMaxGbp != null ? String(v.budgetMaxGbp) : null,
    mileage_max_km: v.mileageMaxKm ?? null,
    transmission: v.transmission?.trim() || null,
    color_preferences: v.colorPreferences?.trim() || null,
    destination_port: v.destinationPort?.trim() || "UK",
    notes: v.notes?.trim() || null,
  });

  revalidatePath("/dashboard");
  revalidatePath("/admin/requests");
  return { ok: true, requestId: row.id };
}
