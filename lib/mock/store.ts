import { randomUUID } from "crypto";
import type { ImportStatusRow, RequestStatus, VehicleQuoteRow, VehicleRequestRow } from "@/types/database";
import { DEMO_USER_ID } from "@/lib/mock/constants";

const REQ_A = "20000000-0000-4000-8000-000000000001";
const REQ_B = "20000000-0000-4000-8000-000000000002";

const now = () => new Date().toISOString();

function seedRequests(): VehicleRequestRow[] {
  const t = now();
  return [
    {
      id: REQ_A,
      customer_id: DEMO_USER_ID,
      status: "under_review",
      make: "Nissan",
      model: "Skyline GT-R",
      variant: "R34 V-Spec II",
      year_min: 1999,
      year_max: 2002,
      budget_max_gbp: "85000",
      mileage_max_km: 85000,
      transmission: "manual",
      color_preferences: "Midnight Purple II preferred",
      destination_port: "Southampton",
      notes: "Seeking a clean grade example with documented history.",
      created_at: t,
      updated_at: t,
    },
    {
      id: REQ_B,
      customer_id: DEMO_USER_ID,
      status: "options_ready",
      make: "Toyota",
      model: "GR Supra",
      variant: "MK4 Twin Turbo",
      year_min: 1993,
      year_max: 1998,
      budget_max_gbp: "65000",
      mileage_max_km: null,
      transmission: "manual",
      color_preferences: "Black or silver",
      destination_port: "Felixstowe",
      notes: "First JDM import — would appreciate guidance on compliance.",
      created_at: t,
      updated_at: t,
    },
  ];
}

function seedTimelines(): Map<string, ImportStatusRow[]> {
  const t = now();
  const m = new Map<string, ImportStatusRow[]>();

  m.set(REQ_A, [
    {
      id: "30000000-0000-4000-8000-000000000001",
      request_id: REQ_A,
      sort_order: 0,
      milestone_key: "submitted",
      title: "Request received",
      description: "We've logged your brief and will review it shortly.",
      completed_at: t,
      is_visible_to_customer: true,
      created_at: t,
    },
    {
      id: "30000000-0000-4000-8000-000000000002",
      request_id: REQ_A,
      sort_order: 1,
      milestone_key: "review",
      title: "Team review",
      description: "Our specialists are validating budget and sourcing strategy.",
      completed_at: null,
      is_visible_to_customer: true,
      created_at: t,
    },
  ]);

  m.set(REQ_B, [
    {
      id: "30000000-0000-4000-8000-000000000010",
      request_id: REQ_B,
      sort_order: 0,
      milestone_key: "submitted",
      title: "Request received",
      description: "Brief received and acknowledged.",
      completed_at: t,
      is_visible_to_customer: true,
      created_at: t,
    },
  ]);

  return m;
}

function seedQuotes(): VehicleQuoteRow[] {
  const t = now();
  return [
    {
      id: "40000000-0000-4000-8000-000000000001",
      request_id: REQ_B,
      created_by: DEMO_USER_ID,
      status: "sent",
      title: "auction-house.example — Grade 4.5",
      summary: "6-speed, stock engine, auction sheet available. Landed estimate includes duty and IVA prep.",
      vehicle_vin: null,
      auction_grade: "4.5",
      price_gbp: "52000",
      estimated_landed_gbp: "61200",
      source_url: null,
      extras: {},
      visible_to_customer: true,
      created_at: t,
      updated_at: t,
    },
  ];
}

const requests: VehicleRequestRow[] = seedRequests();
const timelines: Map<string, ImportStatusRow[]> = seedTimelines();
const quotes: VehicleQuoteRow[] = seedQuotes();

export function getRequestsForCustomer(customerId: string): VehicleRequestRow[] {
  return requests
    .filter((r) => r.customer_id === customerId)
    .slice()
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
}

export function getAllRequests(): VehicleRequestRow[] {
  return requests
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function getRequestById(id: string): VehicleRequestRow | null {
  return requests.find((r) => r.id === id) ?? null;
}

export function getTimelineForRequest(requestId: string): ImportStatusRow[] {
  const list = timelines.get(requestId);
  return list ? [...list].sort((a, b) => a.sort_order - b.sort_order) : [];
}

export function getQuotesForRequest(requestId: string): VehicleQuoteRow[] {
  return quotes
    .filter((q) => q.request_id === requestId)
    .slice()
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

export function insertVehicleRequest(input: {
  make: string;
  model: string;
  variant: string | null;
  year_min: number | null;
  year_max: number | null;
  budget_max_gbp: string | null;
  mileage_max_km: number | null;
  transmission: string | null;
  color_preferences: string | null;
  destination_port: string | null;
  notes: string | null;
  customer_id: string;
}): VehicleRequestRow {
  const id = randomUUID();
  const timestamp = now();
  const row: VehicleRequestRow = {
    id,
    customer_id: input.customer_id,
    status: "submitted",
    make: input.make,
    model: input.model,
    variant: input.variant,
    year_min: input.year_min,
    year_max: input.year_max,
    budget_max_gbp: input.budget_max_gbp,
    mileage_max_km: input.mileage_max_km,
    transmission: input.transmission,
    color_preferences: input.color_preferences,
    destination_port: input.destination_port,
    notes: input.notes,
    created_at: timestamp,
    updated_at: timestamp,
  };
  requests.push(row);

  timelines.set(id, [
    {
      id: randomUUID(),
      request_id: id,
      sort_order: 0,
      milestone_key: "submitted",
      title: "Request received",
      description: "We've logged your brief and will review it shortly.",
      completed_at: timestamp,
      is_visible_to_customer: true,
      created_at: timestamp,
    },
  ]);

  return row;
}

export function updateRequestStatusById(requestId: string, status: RequestStatus): boolean {
  const idx = requests.findIndex((r) => r.id === requestId);
  if (idx === -1) return false;
  const prev = requests[idx];
  requests[idx] = {
    ...prev,
    status,
    updated_at: now(),
  };
  return true;
}

export function getRequestCount(): number {
  return requests.length;
}
