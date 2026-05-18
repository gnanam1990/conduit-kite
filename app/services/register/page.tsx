"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/lib/types";
import { slugify } from "@/lib/utils";
import Link from "next/link";

export default function RegisterServicePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    category: "",
    description: "",
    endpoint_url: "",
    price_per_call_usdc: "",
    logo_url: "",
    openapi_url: "",
    documentation_url: "",
    owner_address: "",
  });

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const slug = slugify(form.name);
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          slug,
          price_per_call_usdc: parseFloat(form.price_per_call_usdc),
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to register");
      }

      router.push(`/services/${slug}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container max-w-screen-2xl py-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Register Your API Service</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-medium">Service Name *</label>
              <Input
                required
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="My AI Service"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Owner Address *</label>
              <Input
                required
                value={form.owner_address}
                onChange={(e) => updateField("owner_address", e.target.value)}
                placeholder="0x..."
                className="font-mono"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Category *</label>
              <select
                required
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
                className="w-full border rounded-md px-3 py-2 text-sm"
              >
                <option value="">Select category</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Description *</label>
              <textarea
                required
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe what your API does..."
                className="w-full border rounded-md px-3 py-2 text-sm min-h-[100px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Endpoint URL *</label>
              <Input
                required
                type="url"
                value={form.endpoint_url}
                onChange={(e) => updateField("endpoint_url", e.target.value)}
                placeholder="https://api.example.com/v1"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Price per Call (USDC) *</label>
              <Input
                required
                type="number"
                step="0.000001"
                min="0"
                value={form.price_per_call_usdc}
                onChange={(e) => updateField("price_per_call_usdc", e.target.value)}
                placeholder="0.001"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Logo URL</label>
              <Input
                type="url"
                value={form.logo_url}
                onChange={(e) => updateField("logo_url", e.target.value)}
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div>
              <label className="text-sm font-medium">OpenAPI Spec URL</label>
              <Input
                type="url"
                value={form.openapi_url}
                onChange={(e) => updateField("openapi_url", e.target.value)}
                placeholder="https://api.example.com/openapi.json"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Documentation URL</label>
              <Input
                type="url"
                value={form.documentation_url}
                onChange={(e) => updateField("documentation_url", e.target.value)}
                placeholder="https://docs.example.com"
              />
            </div>

            {error && (
              <div className="text-sm text-red-500 bg-red-50 p-3 rounded">{error}</div>
            )}

            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium disabled:opacity-50"
              >
                {loading ? "Registering..." : "Register Service"}
              </button>
              <Link href="/services">
                <button type="button" className="px-6 py-2 border border-border rounded-md font-medium">
                  Cancel
                </button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
