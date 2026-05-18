export interface Service {
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
  status: "active" | "paused" | "flagged";
  created_at: string;
  updated_at: string;
}

export interface Call {
  id: string;
  service_id: string;
  caller_address: string;
  session_id: string | null;
  amount_usdc: number;
  status: "success" | "failed" | "refunded";
  response_time_ms: number | null;
  error_message: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  service_count: number;
}

export interface Report {
  id: string;
  service_id: string;
  reporter_address: string;
  reason: string;
  description: string | null;
  status: "pending" | "reviewed" | "dismissed";
  created_at: string;
}

export const CATEGORIES: Category[] = [
  { id: "ai", name: "AI & ML", slug: "ai", description: "AI models, LLMs, image generation", icon: "🤖", service_count: 0 },
  { id: "data", name: "Data & Analytics", slug: "data", description: "Data feeds, analytics, insights", icon: "📊", service_count: 0 },
  { id: "defi", name: "DeFi", slug: "defi", description: "DeFi protocols, DEX, lending", icon: "💰", service_count: 0 },
  { id: "storage", name: "Storage", slug: "storage", description: "IPFS, Arweave, file storage", icon: "💾", service_count: 0 },
  { id: "oracle", name: "Oracles", slug: "oracle", description: "Price feeds, random numbers, verifiable data", icon: "🔮", service_count: 0 },
  { id: "identity", name: "Identity", slug: "identity", description: "KYC, verification, credentials", icon: "🆔", service_count: 0 },
  { id: "media", name: "Media", slug: "media", description: "Images, video, audio processing", icon: "🎬", service_count: 0 },
  { id: "utility", name: "Utilities", slug: "utility", description: "General purpose APIs and tools", icon: "🔧", service_count: 0 },
];
