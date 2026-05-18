export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = "customer" | "admin";

export type RequestStatus =
  | "submitted"
  | "under_review"
  | "options_ready"
  | "deposit_pending"
  | "sourcing"
  | "in_transit"
  | "customs"
  | "delivered"
  | "cancelled";

export type QuoteStatus = "draft" | "sent" | "accepted" | "rejected" | "expired";

export type PaymentStatus =
  | "pending"
  | "processing"
  | "succeeded"
  | "failed"
  | "refunded";

export type PaymentKind = "deposit" | "balance" | "other";

export type DocumentKind =
  | "auction_sheet"
  | "photo"
  | "invoice"
  | "contract"
  | "other";

export type ProfilesRow = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

export type VehicleRequestRow = {
  id: string;
  customer_id: string;
  status: RequestStatus;
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
  created_at: string;
  updated_at: string;
};

export type VehicleQuoteRow = {
  id: string;
  request_id: string;
  created_by: string;
  status: QuoteStatus;
  title: string;
  summary: string | null;
  vehicle_vin: string | null;
  auction_grade: string | null;
  price_gbp: string;
  estimated_landed_gbp: string | null;
  source_url: string | null;
  extras: Json;
  visible_to_customer: boolean;
  created_at: string;
  updated_at: string;
};

export type ImportStatusRow = {
  id: string;
  request_id: string;
  sort_order: number;
  milestone_key: string | null;
  title: string;
  description: string | null;
  completed_at: string | null;
  is_visible_to_customer: boolean;
  created_at: string;
};

export type PaymentRow = {
  id: string;
  request_id: string;
  quote_id: string | null;
  stripe_payment_intent_id: string | null;
  stripe_checkout_session_id: string | null;
  amount_cents: number;
  currency: string;
  kind: PaymentKind;
  status: PaymentStatus;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfilesRow;
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          role?: UserRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<ProfilesRow, "id">> & { id?: string };
      };
      vehicle_requests: {
        Row: VehicleRequestRow;
        Insert: {
          id?: string;
          customer_id: string;
          status?: RequestStatus;
          make: string;
          model: string;
          variant?: string | null;
          year_min?: number | null;
          year_max?: number | null;
          budget_max_gbp?: string | null;
          mileage_max_km?: number | null;
          transmission?: string | null;
          color_preferences?: string | null;
          destination_port?: string | null;
          notes?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<VehicleRequestRow, "id">> & { id?: string };
      };
      vehicle_quotes: {
        Row: VehicleQuoteRow;
        Insert: {
          id?: string;
          request_id: string;
          created_by: string;
          status?: QuoteStatus;
          title: string;
          summary?: string | null;
          vehicle_vin?: string | null;
          auction_grade?: string | null;
          price_gbp: string | number;
          estimated_landed_gbp?: string | null;
          source_url?: string | null;
          extras?: Json;
          visible_to_customer?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<VehicleQuoteRow, "id">> & { id?: string };
      };
      import_status_updates: {
        Row: ImportStatusRow;
        Insert: {
          id?: string;
          request_id: string;
          sort_order?: number;
          milestone_key?: string | null;
          title: string;
          description?: string | null;
          completed_at?: string | null;
          is_visible_to_customer?: boolean;
          created_at?: string;
        };
        Update: Partial<Omit<ImportStatusRow, "id">> & { id?: string };
      };
      payments: {
        Row: PaymentRow;
        Insert: {
          id?: string;
          request_id: string;
          quote_id?: string | null;
          stripe_payment_intent_id?: string | null;
          stripe_checkout_session_id?: string | null;
          amount_cents: number;
          currency?: string;
          kind?: PaymentKind;
          status?: PaymentStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Omit<PaymentRow, "id">> & { id?: string };
      };
    };
  };
};
