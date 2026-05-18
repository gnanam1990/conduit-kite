alter table services 
  add column if not exists reliability_30d numeric default 0,
  add column if not exists avg_latency_ms_30d int default 0,
  add column if not exists total_calls_30d int default 0,
  add column if not exists unique_callers_30d int default 0,
  add column if not exists last_call_at timestamptz,
  add column if not exists stats_updated_at timestamptz default now();

create table if not exists service_calls (
  id bigserial primary key,
  service_id text references services(id) on delete cascade,
  caller_address text not null,
  amount_usdc numeric(20, 6) not null,
  status text not null check (status in ('success', 'failed')),
  latency_ms int,
  timestamp timestamptz default now()
);

create table if not exists service_flags (
  id bigserial primary key,
  service_id text references services(id) on delete cascade,
  flag_type text not null,
  details jsonb,
  auto_paused boolean default false,
  created_at timestamptz default now()
);

create index if not exists idx_service_calls_service_time 
  on service_calls (service_id, timestamp desc);
create index if not exists idx_service_calls_caller 
  on service_calls (caller_address);
