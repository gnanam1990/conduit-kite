import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getServices } from "@/lib/api";
import { formatUSDCE, shortenAddress } from "@/lib/utils";

export const metadata = {
  title: "Services — Conduit-Kite",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="container max-w-screen-2xl py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-1">
            Browse available APIs on Kite Mainnet
          </p>
        </div>
        <Link href="/services/register">
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium">
            List Your API
          </button>
        </Link>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            No services registered yet. Be the first to{" "}
            <Link href="/services/register" className="underline text-primary">
              list your API
            </Link>
            .
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <Badge variant="outline">{service.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-mono text-primary">
                      {formatUSDCE(service.price_per_call_usdc)}/call
                    </span>
                    <span className="text-muted-foreground">
                      by {shortenAddress(service.owner_address)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
