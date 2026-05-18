create table services (
  id text primary key default ('svc_' || lower(replace(gen_random_uuid()::text, '-', ''))),
  owner_address text not null,
  name text not null,
  slug text unique not null,
  category text not null,
  description text not null,
  endpoint_url text not null,
  price_per_call_usdc numeric(20, 6) not null,
  logo_url text,
  openapi_url text,
  documentation_url text,
  status text not null default 'active' check (status in ('active', 'paused', 'flagged')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table categories (
  id text primary key,
  name text not null,
  slug text unique not null,
  description text,
  icon text,
  service_count int default 0
);

create table calls (
  id text primary key default ('call_' || lower(replace(gen_random_uuid()::text, '-', ''))),
  service_id text references services(id),
  caller_address text not null,
  session_id text,
  amount_usdc numeric(20, 6) not null,
  status text not null check (status in ('success', 'failed', 'refunded')),
  response_time_ms int,
  error_message text,
  created_at timestamptz default now()
);

create table reports (
  id text primary key default ('rpt_' || lower(replace(gen_random_uuid()::text, '-', ''))),
  service_id text references services(id),
  reporter_address text not null,
  reason text not null,
  description text,
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'dismissed')),
  created_at timestamptz default now()
);

create index idx_services_category on services(category);
create index idx_services_owner on services(owner_address);
create index idx_services_status on services(status);
create index idx_calls_service on calls(service_id);
create index idx_calls_created on calls(created_at);
create index idx_reports_service on reports(service_id);
