import { getDealerById } from "@/lib/marketplace/mock-data";
import { DealerCard } from "@/components/marketplace/dealer-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DealerProfilePage() {
  const dealer = getDealerById("dealer-tokyo");
  if (!dealer) return null;

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <DealerCard dealer={dealer} />
      <Card>
        <CardHeader>
          <CardTitle>Profile settings</CardTitle>
          <CardDescription>Placeholder for dealer verification badge, specialties, and response SLA.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          <Badge>Verified exporter</Badge>
          <Badge variant="outline">Auction sourcing</Badge>
          <Badge variant="outline">UK compliance prep</Badge>
        </CardContent>
      </Card>
    </div>
  );
}
