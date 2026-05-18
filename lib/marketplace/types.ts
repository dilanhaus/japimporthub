export type DealerTier = "verified" | "premium" | "standard";

export type RequestStatus =
  | "open"
  | "quoting"
  | "reviewing"
  | "awarded"
  | "in_progress"
  | "completed";

export type MarketplaceRequest = {
  id: string;
  title: string;
  make: string;
  model: string;
  yearRange: string;
  budgetGbp: number;
  quotesCount: number;
  status: RequestStatus;
  postedAt: string;
  mileagePreference?: string;
  transmission?: string;
};

export type DealerProfile = {
  id: string;
  name: string;
  location: string;
  tier: DealerTier;
  rating: number;
  reviewCount: number;
  completedImports: number;
  responseTime: string;
  specialties: string[];
  verified: boolean;
};

export type Quotation = {
  id: string;
  requestId: string;
  dealer: DealerProfile;
  vehiclePriceGbp: number;
  shippingGbp: number;
  feesGbp: number;
  totalLandedGbp: number;
  etaWeeks: number;
  message: string;
  submittedAt: string;
  highlights: string[];
};

export type BuyerRequestDetail = MarketplaceRequest & {
  notes?: string;
  quotations: Quotation[];
};

export type MessageThread = {
  id: string;
  participantName: string;
  participantRole: "dealer" | "buyer";
  lastMessage: string;
  updatedAt: string;
  unread: number;
};

export type PublicRequestSubmission = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  make: string;
  model: string;
  yearMin?: number;
  yearMax?: number;
  budgetGbp?: number;
  mileagePreference?: string;
  transmission?: string;
  notes?: string;
  submittedAt: string;
};
