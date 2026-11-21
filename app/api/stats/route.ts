import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const CACHE_CONTROL = "public, s-maxage=300, stale-while-revalidate=600";

// Read-only stats for external dashboards. Only real data is reported:
// a metric with no live source is null, and if none has one we return 503.
//
// - services: the registry in /api/services is an in-memory array (reset on
//   every cold start, not shared across instances); the Postgres schema in
//   db/schema.sql is not wired up. No persisted count exists to report.
// - volume: needs KiteIndex (KITEINDEX_GRAPHQL_URL) plus the payee addresses
//   of registered services; neither is available, and Conduit has no
//   contract of its own on Kite to read via RPC.
export async function GET() {
  const stats: { volume: number | string | null; services: number | null } = {
    volume: null,
    services: null,
  };

  if (stats.volume === null && stats.services === null) {
    const reason = process.env.KITEINDEX_GRAPHQL_URL
      ? "Service registry is not persisted (in-memory only), so there are no service payee addresses to count or to sum KiteIndex transfers for."
      : "Service registry is not persisted (in-memory only) and KITEINDEX_GRAPHQL_URL is not configured; Conduit has no on-chain contract to read.";
    return NextResponse.json(
      { error: "no live data source", reason },
      { status: 503, headers: { "Cache-Control": CACHE_CONTROL } },
    );
  }

  return NextResponse.json(
    {
      ...stats,
      source: "KiteIndex transfer events (Kite Mainnet) and service registry",
      as_of: new Date().toISOString(),
    },
    { headers: { "Cache-Control": CACHE_CONTROL } },
  );
}
