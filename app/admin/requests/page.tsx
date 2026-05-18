import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight } from "lucide-react";
import { requestStatusLabel } from "@/lib/constants/request-status";
import { getAllRequests } from "@/lib/mock/store";
import type { RequestStatus, VehicleRequestRow } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function AdminRequestsPage() {
  const requests: VehicleRequestRow[] = getAllRequests();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Vehicle requests</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Newest briefs first. Open a request to update status, upload documents, and send options.
        </p>
      </div>

      <Separator />

      {requests.length === 0 ? (
        <Card className="border-dashed bg-muted/20">
          <CardHeader>
            <CardTitle>No requests yet</CardTitle>
            <CardDescription>When customers submit briefs, they&apos;ll land here.</CardDescription>
          </CardHeader>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((r) => (
            <Card key={r.id} className="border-border/80">
              <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4 space-y-0">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {r.make} {r.model}
                    {r.variant ? ` · ${r.variant}` : ""}
                  </CardTitle>
                  <CardDescription>
                    Customer {r.customer_id.slice(0, 8)}… ·{" "}
                    {formatDistanceToNow(new Date(r.updated_at), { addSuffix: true })}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{requestStatusLabel(r.status as RequestStatus)}</Badge>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-4">
                <p className="text-xs font-mono text-muted-foreground">{r.id}</p>
                <Link
                  href={`/admin/requests/${r.id}`}
                  className="inline-flex items-center text-sm font-medium text-foreground hover:underline"
                >
                  Open
                  <ArrowRight className="ml-1 size-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
