-- Jap Import UK — initial schema (MVP)
-- Run in Supabase SQL Editor or via `supabase db push`

create extension if not exists "uuid-ossp";

-- ─── Enums ───────────────────────────────────────────────────────────────────
create type public.user_role as enum ('customer', 'admin');

create type public.request_status as enum (
  'submitted',
  'under_review',
  'options_ready',
  'deposit_pending',
  'sourcing',
  'in_transit',
  'customs',
  'delivered',
  'cancelled'
);

create type public.quote_status as enum ('draft', 'sent', 'accepted', 'rejected', 'expired');

create type public.payment_status as enum (
  'pending',
  'processing',
  'succeeded',
  'failed',
  'refunded'
);

create type public.payment_kind as enum ('deposit', 'balance', 'other');

create type public.document_kind as enum (
  'auction_sheet',
  'photo',
  'invoice',
  'contract',
  'other'
);

-- ─── Profiles (1:1 auth.users) ────────────────────────────────────────────────
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  role public.user_role not null default 'customer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx on public.profiles (role);

-- Auto-create profile on signup
create or replace function public.handle_new_user ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    'customer'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user ();

-- ─── Vehicle requests ────────────────────────────────────────────────────────
create table public.vehicle_requests (
  id uuid primary key default gen_random_uuid (),
  customer_id uuid not null references public.profiles (id) on delete cascade,
  status public.request_status not null default 'submitted',

  make text not null,
  model text not null,
  variant text,
  year_min int,
  year_max int,
  budget_max_gbp numeric(12, 2),
  mileage_max_km int,
  transmission text,
  color_preferences text,
  destination_port text default 'UK',
  notes text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index vehicle_requests_customer_id_idx on public.vehicle_requests (customer_id);
create index vehicle_requests_status_idx on public.vehicle_requests (status);

-- ─── Quotes (sourcing options from admin) ─────────────────────────────────────
create table public.vehicle_quotes (
  id uuid primary key default gen_random_uuid (),
  request_id uuid not null references public.vehicle_requests (id) on delete cascade,
  created_by uuid not null references public.profiles (id),
  status public.quote_status not null default 'draft',

  title text not null,
  summary text,
  vehicle_vin text,
  auction_grade text,
  price_gbp numeric(12, 2) not null,
  estimated_landed_gbp numeric(12, 2),
  source_url text,
  extras jsonb not null default '{}'::jsonb,
  visible_to_customer boolean not null default false,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index vehicle_quotes_request_id_idx on public.vehicle_quotes (request_id);

-- ─── Messages (per request thread) ─────────────────────────────────────────────
create table public.messages (
  id uuid primary key default gen_random_uuid (),
  request_id uuid not null references public.vehicle_requests (id) on delete cascade,
  sender_id uuid not null references public.profiles (id),
  body text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index messages_request_id_idx on public.messages (request_id, created_at desc);

-- ─── Payments (Stripe references; amounts in minor units) ─────────────────────
create table public.payments (
  id uuid primary key default gen_random_uuid (),
  request_id uuid not null references public.vehicle_requests (id) on delete cascade,
  quote_id uuid references public.vehicle_quotes (id) on delete set null,

  stripe_payment_intent_id text unique,
  stripe_checkout_session_id text,
  amount_cents int not null,
  currency text not null default 'gbp',
  kind public.payment_kind not null default 'deposit',
  status public.payment_status not null default 'pending',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index payments_request_id_idx on public.payments (request_id);

-- ─── Import timeline / milestones ────────────────────────────────────────────
create table public.import_status_updates (
  id uuid primary key default gen_random_uuid (),
  request_id uuid not null references public.vehicle_requests (id) on delete cascade,
  sort_order int not null default 0,
  milestone_key text,
  title text not null,
  description text,
  completed_at timestamptz,
  is_visible_to_customer boolean not null default true,
  created_at timestamptz not null default now()
);

create index import_status_updates_request_id_idx
  on public.import_status_updates (request_id, sort_order);

-- ─── Document metadata (files in Supabase Storage) ─────────────────────────────
create table public.uploaded_documents (
  id uuid primary key default gen_random_uuid (),
  request_id uuid not null references public.vehicle_requests (id) on delete cascade,
  quote_id uuid references public.vehicle_quotes (id) on delete set null,
  uploaded_by uuid not null references public.profiles (id),
  storage_path text not null,
  file_name text not null,
  mime_type text,
  kind public.document_kind not null default 'other',
  created_at timestamptz not null default now()
);

create index uploaded_documents_request_id_idx on public.uploaded_documents (request_id);

-- ─── updated_at helper ────────────────────────────────────────────────────────
create or replace function public.set_updated_at ()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_vehicle_requests_updated
  before update on public.vehicle_requests
  for each row execute function public.set_updated_at ();

create trigger set_vehicle_quotes_updated
  before update on public.vehicle_quotes
  for each row execute function public.set_updated_at ();

create trigger set_payments_updated
  before update on public.payments
  for each row execute function public.set_updated_at ();

create trigger set_profiles_updated
  before update on public.profiles
  for each row execute function public.set_updated_at ();

-- ─── RLS ─────────────────────────────────────────────────────────────────────
alter table public.profiles enable row level security;
alter table public.vehicle_requests enable row level security;
alter table public.vehicle_quotes enable row level security;
alter table public.messages enable row level security;
alter table public.payments enable row level security;
alter table public.import_status_updates enable row level security;
alter table public.uploaded_documents enable row level security;

create or replace function public.is_staff (uid uuid)
returns boolean
language sql
stable
security invoker
set search_path = public
as $$
  select exists (
    select 1 from public.profiles p
    where p.id = uid and p.role = 'admin'
  );
$$;

-- Profiles
create policy "profiles_select_self_or_staff"
  on public.profiles for select
  using (auth.uid() = id or public.is_staff (auth.uid()));

create policy "profiles_update_self"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Vehicle requests
create policy "vehicle_requests_select"
  on public.vehicle_requests for select
  using (customer_id = auth.uid() or public.is_staff (auth.uid()));

create policy "vehicle_requests_insert_customer"
  on public.vehicle_requests for insert
  with check (customer_id = auth.uid());

create policy "vehicle_requests_update_staff"
  on public.vehicle_requests for update
  using (public.is_staff (auth.uid()));

create policy "vehicle_requests_update_customer_draft"
  on public.vehicle_requests for update
  using (
    customer_id = auth.uid()
    and status in ('submitted', 'under_review')
  );

-- Vehicle quotes
create policy "quotes_select"
  on public.vehicle_quotes for select
  using (
    public.is_staff (auth.uid())
    or (
      visible_to_customer = true
      and exists (
        select 1 from public.vehicle_requests r
        where r.id = request_id and r.customer_id = auth.uid()
      )
    )
  );

create policy "quotes_write_staff"
  on public.vehicle_quotes for all
  using (public.is_staff (auth.uid()))
  with check (public.is_staff (auth.uid()));

-- Messages
create policy "messages_select"
  on public.messages for select
  using (
    public.is_staff (auth.uid())
    or exists (
      select 1 from public.vehicle_requests r
      where r.id = request_id and r.customer_id = auth.uid()
    )
  );

create policy "messages_insert_participant"
  on public.messages for insert
  with check (
    sender_id = auth.uid()
    and (
      public.is_staff (auth.uid())
      or exists (
        select 1 from public.vehicle_requests r
        where r.id = request_id and r.customer_id = auth.uid()
      )
    )
  );

-- Payments
create policy "payments_select"
  on public.payments for select
  using (
    public.is_staff (auth.uid())
    or exists (
      select 1 from public.vehicle_requests r
      where r.id = request_id and r.customer_id = auth.uid()
    )
  );

create policy "payments_write_staff"
  on public.payments for all
  using (public.is_staff (auth.uid()))
  with check (public.is_staff (auth.uid()));

-- Status updates
create policy "import_status_select"
  on public.import_status_updates for select
  using (
    public.is_staff (auth.uid())
    or (
      is_visible_to_customer = true
      and exists (
        select 1 from public.vehicle_requests r
        where r.id = request_id and r.customer_id = auth.uid()
      )
    )
  );

create policy "import_status_write_staff"
  on public.import_status_updates for all
  using (public.is_staff (auth.uid()))
  with check (public.is_staff (auth.uid()));

-- Documents
create policy "docs_select"
  on public.uploaded_documents for select
  using (
    public.is_staff (auth.uid())
    or exists (
      select 1 from public.vehicle_requests r
      where r.id = request_id and r.customer_id = auth.uid()
    )
  );

create policy "docs_write_staff"
  on public.uploaded_documents for insert
  with check (public.is_staff (auth.uid()));

create policy "docs_delete_staff"
  on public.uploaded_documents for delete
  using (public.is_staff (auth.uid()));

-- First timeline step (runs as definer to bypass RLS for the customer insert path)
create or replace function public.seed_request_timeline ()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.import_status_updates (
    request_id,
    sort_order,
    milestone_key,
    title,
    description,
    completed_at,
    is_visible_to_customer
  ) values (
    new.id,
    0,
    'submitted',
    'Request received',
    'We''ve logged your brief and will review it shortly.',
    now(),
    true
  );
  return new;
end;
$$;

create trigger vehicle_requests_seed_timeline
  after insert on public.vehicle_requests
  for each row
  execute function public.seed_request_timeline ();

-- After migration: enable Realtime for `messages` and `vehicle_requests` in the Supabase Dashboard
-- (Database → Publications → supabase_realtime) for live dashboard updates.
