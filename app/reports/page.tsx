import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = {
  title: "Reports — Conduit-Kite",
};

export default function ReportsPage() {
  return (
    <div className="container max-w-screen-2xl py-6 space-y-6">
      <h1 className="text-3xl font-bold">Reports</h1>
      <Card>
        <CardHeader>
          <CardTitle>Service Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-muted-foreground text-center py-8">
            No reports yet.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
