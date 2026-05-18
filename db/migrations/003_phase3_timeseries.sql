create table if not exists service_daily_stats (
  service_id text references services(id) on delete cascade,
  day date not null,
  calls int default 0,
  unique_callers int default 0,
  revenue_usdc numeric default 0,
  errors int default 0,
  avg_latency_ms int default 0,
  primary key (service_id, day)
);

create index on service_daily_stats (day desc);
