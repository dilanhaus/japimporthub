"use client";

export const STATE_COUNT = 7;

/** Per-state hold duration before advancing */
export const STATE_DURATIONS_MS = [2500, 2500, 2200, 2500, 2200, 2500, 2500] as const;

export const JOURNEY_STAGES = [
  { label: "01 — Post your request" },
  { label: "02 — Dealers compete for your request" },
  { label: "03 — Choose your dealer" },
  { label: "04 — Documents verified" },
  { label: "05 — Deposit held securely" },
  { label: "06 — Track your shipment live" },
  { label: "07 — Delivered to your door" },
] as const;

export const VEHICLE = {
  name: "Nissan Skyline R33",
  budget: "£30,000",
  deliveryEta: "Thursday 14 August",
} as const;

export const REQUEST_FIELDS = [
  { label: "Make / Model", value: "Nissan Skyline R33", mono: false },
  { label: "Colour preference", value: "Blue or Black", mono: false },
  { label: "Max mileage", value: "100,000 km", mono: true },
  { label: "Budget", value: "£30,000", mono: true },
] as const;

export const DEMO_QUOTES = [
  {
    id: "tokyo",
    dealer: "Tokyo Export Co.",
    rating: 4.9,
    price: "£28,400",
    eta: "9 weeks",
    grade: "4.5",
  },
  {
    id: "jdm",
    dealer: "JDM Direct UK",
    rating: 4.7,
    price: "£29,100",
    eta: "8 weeks",
    grade: "4.0",
  },
  {
    id: "sakura",
    dealer: "Sakura Motors",
    rating: 4.8,
    price: "£30,200",
    eta: "10 weeks",
    grade: "4.5",
  },
] as const;

export const SELECTED_QUOTE_INDEX = 0;

export const DOCUMENTS = [
  { id: "auction", title: "Auction Sheet", badge: "Translated", badgeClass: "text-sky-400 border-sky-500/30 bg-sky-500/10" },
  { id: "export", title: "Export Certificate", badge: "Verified", badgeClass: "text-[var(--red)] border-[var(--red)]/30 bg-[var(--red)]/10" },
  { id: "inspection", title: "Inspection Report", badge: "Grade 4.5", badgeClass: "text-amber-400 border-amber-500/30 bg-amber-500/10" },
] as const;

export const SHIPPING_MILESTONES = [
  { id: "auction", label: "Auction Won", status: "done" as const },
  { id: "export", label: "Export Approved", status: "done" as const },
  { id: "osaka", label: "Departed Osaka", status: "done" as const },
  { id: "transit", label: "In Transit", status: "active" as const },
  { id: "uk", label: "Arrived UK Port", status: "pending" as const },
  { id: "customs", label: "Customs Clearance", status: "pending" as const },
  { id: "delivered", label: "Delivered", status: "pending" as const },
] as const;

export const stateFade = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] as const },
};

export const staggerItem = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
};

export function MonoValue({ children }: { children: React.ReactNode }) {
  return <span className="font-mono tabular-nums text-[var(--text-primary)]">{children}</span>;
}
