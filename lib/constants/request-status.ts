import type { RequestStatus } from "@/types/database";

const labels: Record<RequestStatus, string> = {
  submitted: "Submitted",
  under_review: "Under review",
  options_ready: "Options ready",
  deposit_pending: "Deposit pending",
  sourcing: "Sourcing vehicle",
  in_transit: "In transit",
  customs: "Customs & compliance",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export function requestStatusLabel(status: RequestStatus) {
  return labels[status] ?? status;
}
