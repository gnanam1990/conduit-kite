import type { Service, Call, Category } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export async function getServices(category?: string): Promise<Service[]> {
  const url = category
    ? `${API_BASE}/api/services?category=${category}`
    : `${API_BASE}/api/services`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch services");
  return res.json();
}

export async function getService(slug: string): Promise<Service | null> {
  const res = await fetch(`${API_BASE}/api/services?slug=${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  const services = await res.json();
  return services[0] ?? null;
}

export async function getServiceCalls(serviceId: string, limit = 50): Promise<Call[]> {
  const res = await fetch(`${API_BASE}/api/calls?serviceId=${serviceId}&limit=${limit}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch calls");
  return res.json();
}

export async function registerService(data: {
  owner_address: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  endpoint_url: string;
  price_per_call_usdc: number;
  logo_url?: string;
  openapi_url?: string;
  documentation_url?: string;
}): Promise<Service> {
  const res = await fetch(`${API_BASE}/api/services`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to register service");
  }
  return res.json();
}
