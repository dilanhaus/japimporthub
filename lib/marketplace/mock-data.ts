import type {
  BuyerRequestDetail,
  DealerProfile,
  MarketplaceRequest,
  MessageThread,
  Quotation,
} from "@/lib/marketplace/types";

export const FEATURED_REQUESTS: MarketplaceRequest[] = [
  {
    id: "req-1",
    title: "Nissan Skyline GT-R R34",
    make: "Nissan",
    model: "Skyline GT-R",
    yearRange: "1999–2002",
    budgetGbp: 35000,
    quotesCount: 7,
    status: "quoting",
    postedAt: "2026-05-10T10:00:00Z",
    transmission: "Manual",
  },
  {
    id: "req-2",
    title: "Toyota Supra MK4",
    make: "Toyota",
    model: "Supra",
    yearRange: "1993–1998",
    budgetGbp: 28000,
    quotesCount: 5,
    status: "quoting",
    postedAt: "2026-05-08T14:30:00Z",
    transmission: "Manual",
  },
  {
    id: "req-3",
    title: "Honda NSX",
    make: "Honda",
    model: "NSX",
    yearRange: "1991–2005",
    budgetGbp: 60000,
    quotesCount: 3,
    status: "open",
    postedAt: "2026-05-05T09:15:00Z",
  },
];

const dealers: Record<string, DealerProfile> = {
  tokyo: {
    id: "dealer-tokyo",
    name: "Tokyo Export Partners",
    location: "Tokyo, Japan",
    tier: "verified",
    rating: 4.9,
    reviewCount: 128,
    completedImports: 340,
    responseTime: "< 4 hours",
    specialties: ["GT-R", "JDM sports", "Auction sourcing"],
    verified: true,
  },
  osaka: {
    id: "dealer-osaka",
    name: "Osaka Auto Select",
    location: "Osaka, Japan",
    tier: "premium",
    rating: 4.8,
    reviewCount: 94,
    completedImports: 210,
    responseTime: "< 6 hours",
    specialties: ["Toyota", "Lexus", "Compliance prep"],
    verified: true,
  },
  yokohama: {
    id: "dealer-yokohama",
    name: "Yokohama Motors Ltd",
    location: "Yokohama, Japan",
    tier: "verified",
    rating: 4.7,
    reviewCount: 76,
    completedImports: 185,
    responseTime: "< 8 hours",
    specialties: ["Honda", "Mazda", "Dealer stock"],
    verified: true,
  },
};

export const MOCK_QUOTATIONS: Quotation[] = [
  {
    id: "q-1",
    requestId: "req-1",
    dealer: dealers.tokyo,
    vehiclePriceGbp: 31200,
    shippingGbp: 1800,
    feesGbp: 2100,
    totalLandedGbp: 35100,
    etaWeeks: 10,
    message: "Grade 4 auction candidate with full auction sheet. Inspection video available.",
    submittedAt: "2026-05-11T08:00:00Z",
    highlights: ["Auction sheet included", "IVA-ready documentation"],
  },
  {
    id: "q-2",
    requestId: "req-1",
    dealer: dealers.osaka,
    vehiclePriceGbp: 32800,
    shippingGbp: 1650,
    feesGbp: 1950,
    totalLandedGbp: 36400,
    etaWeeks: 9,
    message: "Dealer stock option with known service history. Faster shipping lane available.",
    submittedAt: "2026-05-11T11:30:00Z",
    highlights: ["Known history", "Express shipping option"],
  },
  {
    id: "q-3",
    requestId: "req-1",
    dealer: dealers.yokohama,
    vehiclePriceGbp: 29900,
    shippingGbp: 1900,
    feesGbp: 2200,
    totalLandedGbp: 34000,
    etaWeeks: 11,
    message: "Competitive landed estimate. Transparent fee breakdown with no hidden port charges.",
    submittedAt: "2026-05-12T07:15:00Z",
    highlights: ["Lowest landed estimate", "Fee transparency guarantee"],
  },
];

export const BUYER_REQUEST_DETAIL: BuyerRequestDetail = {
  ...FEATURED_REQUESTS[0],
  notes: "Seeking V-Spec II or similar. Midnight purple preferred. Must have documented service history.",
  quotations: MOCK_QUOTATIONS,
};

export const DEALER_BROWSE_REQUESTS: MarketplaceRequest[] = [
  ...FEATURED_REQUESTS,
  {
    id: "req-4",
    title: "Mazda RX-7 FD",
    make: "Mazda",
    model: "RX-7",
    yearRange: "1992–1998",
    budgetGbp: 42000,
    quotesCount: 2,
    status: "open",
    postedAt: "2026-05-14T16:00:00Z",
    transmission: "Manual",
  },
  {
    id: "req-5",
    title: "Subaru Impreza WRX STI",
    make: "Subaru",
    model: "Impreza WRX STI",
    yearRange: "2004–2007",
    budgetGbp: 22000,
    quotesCount: 4,
    status: "quoting",
    postedAt: "2026-05-13T12:00:00Z",
  },
];

export const MOCK_MESSAGE_THREADS: MessageThread[] = [
  {
    id: "thread-1",
    participantName: "Tokyo Export Partners",
    participantRole: "dealer",
    lastMessage: "I've attached the auction sheet and inspection photos for your review.",
    updatedAt: "2026-05-14T09:30:00Z",
    unread: 2,
  },
  {
    id: "thread-2",
    participantName: "Osaka Auto Select",
    participantRole: "dealer",
    lastMessage: "Happy to adjust the shipping timeline if you need delivery by end of Q3.",
    updatedAt: "2026-05-13T18:00:00Z",
    unread: 0,
  },
];

export function getRequestById(id: string): BuyerRequestDetail | null {
  if (id === "req-1") return BUYER_REQUEST_DETAIL;
  const base = FEATURED_REQUESTS.find((r) => r.id === id);
  if (!base) return null;
  return { ...base, quotations: [], notes: undefined };
}

export function getDealerById(id: string): DealerProfile | null {
  return Object.values(dealers).find((d) => d.id === id) ?? null;
}
