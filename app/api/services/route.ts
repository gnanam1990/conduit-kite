import { type NextRequest, NextResponse } from "next/server";

const services: Array<{
  id: string;
  owner_address: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  endpoint_url: string;
  price_per_call_usdc: number;
  logo_url: string | null;
  openapi_url: string | null;
  documentation_url: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}> = [];

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const category = searchParams.get("category");
  const slug = searchParams.get("slug");

  let filtered = services.filter((s) => s.status === "active");
  if (category) filtered = filtered.filter((s) => s.category === category);
  if (slug) filtered = filtered.filter((s) => s.slug === slug);

  return NextResponse.json(filtered);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    owner_address,
    name,
    slug,
    category,
    description,
    endpoint_url,
    price_per_call_usdc,
    logo_url,
    openapi_url,
    documentation_url,
  } = body;

  if (!owner_address || !name || !slug || !category || !description || !endpoint_url || price_per_call_usdc === undefined) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (services.some((s) => s.slug === slug)) {
    return NextResponse.json({ error: "Slug already taken" }, { status: 409 });
  }

  const service = {
    id: `svc_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
    owner_address,
    name,
    slug,
    category,
    description,
    endpoint_url,
    price_per_call_usdc: Number(price_per_call_usdc),
    logo_url: logo_url || null,
    openapi_url: openapi_url || null,
    documentation_url: documentation_url || null,
    status: "active",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  services.push(service);
  return NextResponse.json(service, { status: 201 });
}
