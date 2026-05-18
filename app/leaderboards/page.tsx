import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Leaderboards — Conduit-Kite",
};

export default function LeaderboardsPage() {
  return (
    <div className="container max-w-screen-2xl py-6 space-y-6">
      <h1 className="text-3xl font-bold">Leaderboards</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Services by Volume</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-center py-8">
              No data yet. Connect KiteIndex for live stats.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Services by Callers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-center py-8">
              No data yet. Connect KiteIndex for live stats.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Highest Reliability</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-center py-8">
              No data yet. Connect KiteIndex for live stats.
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fastest Response Times</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-center py-8">
              No data yet. Connect KiteIndex for live stats.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
