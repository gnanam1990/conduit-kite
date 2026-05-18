# Conduit-Kite

Pay-per-call API marketplace on Kite Mainnet. Service operators list APIs, agents discover and pay via x402.

## Features

- Service registration with viem signature verification
- Public directory with category filtering
- Service profile pages with stats
- Leaderboards by volume, callers, reliability
- Discovery API for agents
- Reports and admin moderation
- KiteIndex integration for usage tracking

## Development

```bash
pnpm install
pnpm dev
```

## Architecture

- Next.js 15 (App Router)
- Tailwind CSS + shadcn/ui
- KiteIndex for on-chain data
- PostgreSQL for service registry

## API

- `GET /api/services` — List services
- `POST /api/services` — Register service
- `GET /api/discovery` — Agent discovery endpoint
- `GET /api/stats/aggregate` — Ecosystem stats
