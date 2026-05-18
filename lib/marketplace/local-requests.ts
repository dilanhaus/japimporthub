"use client";

import type { PublicRequestSubmission } from "@/lib/marketplace/types";

/** In-memory store for public request form submissions (frontend-only until Supabase). */
let submissions: PublicRequestSubmission[] = [];

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((fn) => fn());
}

export function subscribeLocalRequests(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getLocalSubmissions(): PublicRequestSubmission[] {
  return [...submissions];
}

export function addLocalSubmission(
  data: Omit<PublicRequestSubmission, "id" | "submittedAt">,
): PublicRequestSubmission {
  const entry: PublicRequestSubmission = {
    ...data,
    id: `local-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    submittedAt: new Date().toISOString(),
  };
  submissions = [entry, ...submissions];
  notify();
  return entry;
}
