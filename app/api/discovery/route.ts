import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    services: [],
    total: 0,
    message: "Discovery API - connect KiteIndex for live data",
  });
}
