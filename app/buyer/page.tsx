import Link from "next/link";
import { FEATURED_REQUESTS } from "@/lib/marketplace/mock-data";
import { RequestCard } from "@/components/marketplace/request-card";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function BuyerDashboardPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle>Your import requests</CardTitle>
          <CardDescription>
            Compare dealer quotations, message exporters, and track progress — frontend MVP with mock data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/request" className={cn(buttonVariants())}>
            Post a new request
          </Link>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURED_REQUESTS.map((req) => (
          <RequestCard key={req.id} request={req} href={`/buyer/requests/${req.id}`} />
        ))}
      </div>
    </div>
  );
}
