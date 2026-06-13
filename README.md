# Conduit Kite

> A pay-per-call API marketplace on Kite Mainnet — service operators list APIs, and agents discover and pay per request.

## Overview

Conduit Kite is a web application where service operators can list pay-per-call APIs and where agents can discover them. The intended payment flow is per-call settlement on Kite Mainnet, with on-chain usage data sourced from a KiteIndex GraphQL indexer.

This repository is an early scaffold. The UI and HTTP API surface are in place, but the persistence layer and on-chain data integration are not yet wired up — the service registry currently lives in process memory and the stats/discovery endpoints return placeholder values. See [Status](#status) for the honest breakdown of what is real versus stubbed.

## Features

- Service registration form and listing UI (directory, profile, leaderboards, reports, admin pages).
- Services HTTP API (`GET`/`POST /api/services`) backed by an in-memory array.
- Category filtering across a fixed set of built-in categories.
- KiteIndex GraphQL client and a 30-day service-stats computation helper (present in `lib/`, not yet called by any route).
- SQL schema and migrations describing the intended PostgreSQL data model.

> Not yet implemented: database persistence, on-chain payment/signature verification, and live discovery/aggregate stats. These endpoints currently return empty or zero placeholder data.

## Tech stack

- Next.js 16 (App Router) with React 19
- TypeScript
- Tailwind CSS v4 with shadcn/ui and Base UI components
- lucide-react icons
- KiteIndex GraphQL (on-chain transfer data) — client present, not yet wired into routes
- PostgreSQL schema (SQL files only; no DB client wired)

## Architecture

- `app/` — App Router pages (home, services directory + profile + register, leaderboards, reports, admin) and API routes under `app/api/`.
- `lib/` — shared client helpers: `api.ts` (fetch wrappers), `kiteindex.ts` (GraphQL client), `types.ts` (domain types + categories), and `workers/stats-worker.ts` (30-day stats computation).
- `components/ui/` — shadcn/ui component primitives.
- `db/` — `schema.sql` and migrations describing the intended PostgreSQL data model.

## Getting started

### Prerequisites

- Node.js 20+
- pnpm

### Installation

```bash
pnpm install
```

### Configuration

The app reads the following environment variables. No `.env.example` is committed; create a `.env.local` if you need to override defaults.

| Variable | Purpose | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE` | Base URL prefix for client-side API fetches | `""` (same origin) |
| `KITEINDEX_GRAPHQL_URL` | KiteIndex GraphQL endpoint for on-chain transfer data | `http://localhost:42069/graphql/public` |

### Running

```bash
pnpm dev      # start the dev server
pnpm build    # production build
pnpm start    # serve the production build
pnpm lint     # run ESLint
```

## Usage

API routes (App Router):

- `GET /api/services` — list services; supports `?category=` and `?slug=` filters. Returns only `active` services from the in-memory store.
- `POST /api/services` — register a service. Requires `owner_address`, `name`, `slug`, `category`, `description`, `endpoint_url`, and `price_per_call_usdc`; rejects duplicate slugs.
- `GET /api/discovery` — agent discovery endpoint. Currently returns an empty placeholder payload.
- `GET /api/stats/aggregate` — ecosystem stats. Currently returns zeroed placeholder values.

Note: registered services are held in process memory and are lost on restart.

## Status

Early scaffold (Stage 0). What is real versus stubbed:

- Real: the front-end pages and the `/api/services` GET/POST routes (backed by an in-memory array). The KiteIndex GraphQL client and stats helper exist in `lib/` but are not yet invoked by any route.
- Stubbed: `/api/discovery` and `/api/stats/aggregate` return empty/zero placeholder data with a "connect KiteIndex for live data" message.
- Not wired: PostgreSQL persistence (the SQL schema/migrations exist but no database client is imported), on-chain payment settlement, and signature/identity verification.
- The client helper `getServiceCalls` targets `/api/calls`, which has no corresponding route in this repository.

## License

No license specified.
