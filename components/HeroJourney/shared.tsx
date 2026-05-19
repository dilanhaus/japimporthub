"use client";

export const STATE_COUNT = 6;

export const STATE_DURATIONS_MS = [4000, 5000, 3500, 3500, 3500, 4500] as const;

export const LOOP_BLACKOUT_MS = 600;

export const STAGE_COPY = [
  {
    label: "01 — Post your request",
    headline: "Tell us exactly what you want",
    subline: "Your spec, your budget, your terms — posted in minutes",
  },
  {
    label: "02 — Quotes arriving",
    headline: "Verified dealers respond to your request",
    subline: "Exporters in Japan review your brief and send itemised offers",
  },
  {
    label: "03 — Messaging",
    headline: "Chat directly with dealers before you commit",
    subline: "Ask questions, negotiate, and find the right car — all in one secure thread",
  },
  {
    label: "04 — Quote accepted",
    headline: "Choose your dealer with confidence",
    subline: "Compare total landed costs, ratings, and timelines — side by side",
  },
  {
    label: "05 — Verified & secured",
    headline: "Your paperwork verified. Your deposit protected.",
    subline: "Every document translated. Every payment held securely until you're satisfied.",
  },
  {
    label: "06 — On its way",
    headline: "Track your car from Japan to your door",
    subline: "Live milestone updates from auction to UK delivery",
  },
] as const;

export const VEHICLE = {
  name: "Nissan Skyline R33",
  budget: "£30,000",
  deposit: "£5,000",
} as const;

export const DELIVERY_IMAGE =
  "https://images.unsplash.com/photo-1748878665811-a3dd0b16e3b8?auto=format&fit=crop&w=1600&q=85";

export const REQUEST_FIELDS = [
  { label: "Make / Model", value: "Nissan Skyline R33", mono: false },
  { label: "Colour preference", value: "Blue or Black", mono: false },
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

export const WHATSAPP_NOTIFICATION = {
  title: "Grade Five",
  message: "Tokyo Export Partners sent you a quote — £28,400 landed",
  time: "just now",
} as const;

export const CHAT_MESSAGES = [
  {
    side: "dealer" as const,
    text: "We have a Grade 4.5 R33 in midnight blue, 61,000 km. Auction sheet available. Can ship within 2 weeks.",
  },
  {
    side: "customer" as const,
    text: "Does the auction sheet show any rust or accident history?",
  },
  {
    side: "dealer" as const,
    text: "Clean sheet — Grade 4.5 with no structural notes. I can send the translated report now.",
  },
  {
    side: "customer" as const,
    text: "Perfect. What's the total landed cost to Manchester?",
  },
  {
    side: "dealer" as const,
    text: "£28,400 all-in. Includes shipping, customs, and delivery.",
  },
] as const;

export const DOCUMENTS = [
  {
    id: "auction",
    title: "Auction Sheet",
    badge: "Translated ✓",
    subtext: "No structural faults recorded",
    badgeClass: "text-sky-300 border-sky-500/40 bg-sky-500/15 font-semibold",
  },
  {
    id: "export",
    title: "Export Certificate",
    badge: "Verified ✓",
    subtext: "Issued by JAAI · Japan",
    badgeClass: "text-emerald-300 border-emerald-500/40 bg-emerald-500/15 font-semibold",
  },
  {
    id: "inspection",
    title: "Inspection Report",
    badge: "Grade 4.5 ✓",
    subtext: "61,000 km · Clean body",
    badgeClass: "text-amber-300 border-amber-500/40 bg-amber-500/15 font-semibold",
  },
] as const;

export const SHIP_ROUTE = { fromIndex: 2, toIndex: 4 } as const;
export const SHIP_TRAVEL_DURATION_S = 2;

export const SHIPPING_MILESTONES = [
  { id: "auction", label: "Auction Won", status: "done" as const },
  { id: "export", label: "Export Approved", status: "done" as const },
  { id: "osaka", label: "Departed Osaka", status: "done" as const },
  { id: "transit", label: "In Transit", status: "active" as const },
  { id: "uk", label: "Arrived Southampton", status: "pending" as const },
  { id: "customs", label: "Customs Cleared", status: "pending" as const },
  { id: "delivered", label: "Delivered", status: "pending" as const },
] as const;

export const SHIPPING_SUBLINE =
  "MV Pacific Highway · Departed Osaka 12 May · ETA Southampton 18 Jun";

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
