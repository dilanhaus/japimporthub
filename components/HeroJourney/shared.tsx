"use client";

export const STATE_COUNT = 5;

export const STATE_DURATIONS_MS = [3500, 3500, 3000, 3500, 4000] as const;

export const LOOP_BLACKOUT_MS = 450;

export const JOURNEY_STAGES = [
  { label: "01 — Post your request" },
  { label: "02 — Quotes arriving" },
  { label: "03 — Verified & secured" },
  { label: "04 — Your car is on its way" },
  { label: "05 — Delivered to your door" },
] as const;

export const VEHICLE = {
  name: "Nissan Skyline R33",
  budget: "£30,000",
} as const;

export const DELIVERY_IMAGE =
  "https://images.unsplash.com/photo-1748878665811-a3dd0b16e3b8?auto=format&fit=crop&w=1600&q=85";

export const REQUEST_FIELDS = [
  { label: "Make / Model", value: "Nissan Skyline R33", mono: false },
  { label: "Colour", value: "Blue or Black", mono: false },
  { label: "Max mileage", value: "100,000 km", mono: true },
  { label: "Budget", value: "£30,000", mono: true },
] as const;

export const DEMO_QUOTES = [
  {
    id: "tokyo",
    dealer: "Tokyo Export Partners",
    rating: 4.9,
    price: "£28,400",
    eta: "9 weeks",
    grade: "4.5",
  },
  {
    id: "jdm",
    dealer: "JDM Direct UK",
    rating: 4.7,
    price: "£29,900",
    eta: "8 weeks",
    grade: "4.0",
  },
  {
    id: "sakura",
    dealer: "Sakura Motors",
    rating: 4.8,
    price: "£31,200",
    eta: "10 weeks",
    grade: "4.5",
  },
] as const;

export const SELECTED_QUOTE_INDEX = 0;

export const DOCUMENTS = [
  {
    id: "auction",
    title: "Auction Sheet",
    badge: "Translated ✓",
    badgeClass: "text-sky-300 border-sky-500/40 bg-sky-500/15 font-semibold",
  },
  {
    id: "export",
    title: "Export Certificate",
    badge: "Verified ✓",
    badgeClass: "text-emerald-300 border-emerald-500/40 bg-emerald-500/15 font-semibold",
  },
  {
    id: "inspection",
    title: "Inspection Report",
    badge: "Grade 4.5 ✓",
    badgeClass: "text-amber-300 border-amber-500/40 bg-amber-500/15 font-semibold",
  },
] as const;

export const SHIP_ROUTE = { fromIndex: 2, toIndex: 4 } as const;
export const SHIP_TRAVEL_DURATION_S = 3.5;

export const SHIPPING_MILESTONES = [
  { id: "auction", label: "Auction Won", status: "done" as const },
  { id: "export", label: "Export Approved", status: "done" as const },
  { id: "osaka", label: "Departed Osaka", status: "done" as const },
  { id: "transit", label: "In Transit", status: "active" as const },
  { id: "uk", label: "Arrived UK Port", status: "pending" as const },
  { id: "customs", label: "Customs Clearance", status: "pending" as const },
  { id: "delivered", label: "Delivered", status: "pending" as const },
] as const;

export const SHIPPING_SUBLINE = "MV Pacific Highway · ETA Southampton · 18 Jun";

/** Soft crossfade between stages — no hard cuts */
export const stageFade = {
  initial: { opacity: 0, y: 8, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -6, filter: "blur(4px)" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export const staggerItem = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
};

export function MonoValue({ children }: { children: React.ReactNode }) {
  return <span className="font-mono tabular-nums text-[var(--text-primary)]">{children}</span>;
}
