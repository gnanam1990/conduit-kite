import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/lib/types";
import Link from "next/link";

export const metadata = {
  title: "Conduit-Kite — API Marketplace on Kite Mainnet",
  description: "Pay-per-call API marketplace. Service operators list APIs, agents discover and pay via x402.",
};

export default function HomePage() {
  return (
    <div className="container max-w-screen-2xl py-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Conduit-Kite</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Pay-per-call API marketplace on Kite Mainnet. Service operators list APIs, agents discover
          and pay via x402.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/services">
            <button className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium">
              Browse Services
            </button>
          </Link>
          <Link href="/services/register">
            <button className="px-6 py-2 border border-border rounded-md font-medium">
              List Your API
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Volume (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$0</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span className="text-2xl">{cat.icon}</span>
                    {cat.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{cat.description}</p>
                  <Badge variant="secondary" className="mt-2">
                    {cat.service_count} services
                  </Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
