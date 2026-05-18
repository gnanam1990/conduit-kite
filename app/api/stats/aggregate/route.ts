import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    total_services: 0,
    total_calls_24h: 0,
    total_volume_24h: "0",
    active_agents_24h: 0,
    average_reliability: 0,
    message: "Connect KiteIndex for live data",
  });
}
