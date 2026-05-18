import { DEALER_BROWSE_REQUESTS } from "@/lib/marketplace/mock-data";
import { RequestCard } from "@/components/marketplace/request-card";

export default function DealerBrowseRequestsPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <p className="text-sm text-muted-foreground">
        UK buyer requests open for quotation. Click a request to submit your offer.
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {DEALER_BROWSE_REQUESTS.map((req) => (
          <RequestCard key={req.id} request={req} href={`/dealer/requests/${req.id}/quote`} />
        ))}
      </div>
    </div>
  );
}
