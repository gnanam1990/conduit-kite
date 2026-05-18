import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getService } from "@/lib/api";
import { formatUSDCE, shortenAddress, formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = await getService(slug);
  return {
    title: service ? `${service.name} — Conduit-Kite` : "Service Not Found",
  };
}

export default async function ServiceProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="container max-w-screen-2xl py-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{service.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline">{service.category}</Badge>
            <span className="text-sm text-muted-foreground">
              by {shortenAddress(service.owner_address)}
            </span>
          </div>
        </div>
        <Badge variant={service.status === "active" ? "default" : "secondary"}>
          {service.status}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{service.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Endpoint</CardTitle>
            </CardHeader>
            <CardContent>
              <code className="text-sm bg-muted px-3 py-1 rounded font-mono">
                {service.endpoint_url}
              </code>
            </CardContent>
          </Card>

          {service.openapi_url && (
            <Card>
              <CardHeader>
                <CardTitle>OpenAPI Spec</CardTitle>
              </CardHeader>
              <CardContent>
                <a
                  href={service.openapi_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  {service.openapi_url}
                </a>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Price per Call</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-mono">
                {formatUSDCE(service.price_per_call_usdc)}
              </div>
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
              <CardTitle className="text-sm text-muted-foreground">Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$0</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-muted-foreground">Listed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">{formatRelativeTime(service.created_at)}</div>
            </CardContent>
          </Card>

          {service.documentation_url && (
            <a
              href={service.documentation_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <button className="w-full px-4 py-2 border border-border rounded-md text-sm font-medium">
                View Documentation
              </button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
