import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, PlusCircle } from "lucide-react";
import { getSessionUser } from "@/lib/auth/session";
import { requestStatusLabel } from "@/lib/constants/request-status";
import { getRequestsForCustomer } from "@/lib/mock/store";
import type { RequestStatus } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default async function DashboardHomePage() {
  const session = await getSessionUser();
  if (!session) return null;

  const requests = getRequestsForCustomer(session.id);

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Your imports</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Track every request in one place. We&apos;ll post quotes, documents, and milestones here as your
            import progresses.
          </p>
        </div>
        <Link href="/dashboard/requests/new" className={cn(buttonVariants(), "inline-flex items-center")}>
          <PlusCircle className="mr-2 size-4" />
          New request
        </Link>
      </div>

      <Separator />

      {requests.length === 0 ? (
        <Card className="border-dashed border-border/80 bg-muted/20">
          <CardHeader>
            <CardTitle>No active requests yet</CardTitle>
            <CardDescription>
              Submit your first vehicle brief. It takes a few minutes—we&apos;ll confirm everything before we
              start sourcing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/dashboard/requests/new"
              className={cn(buttonVariants(), "inline-flex items-center")}
            >
              Start a vehicle request
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((r) => (
            <Card key={r.id} className="border-border/80 transition-shadow hover:shadow-md">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    {r.make} {r.model}
                    {r.variant ? ` · ${r.variant}` : ""}
                  </CardTitle>
                  <CardDescription>
                    Updated {formatDistanceToNow(new Date(r.updated_at), { addSuffix: true })}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{requestStatusLabel(r.status as RequestStatus)}</Badge>
              </CardHeader>
              <CardContent className="flex flex-wrap items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">
                  Request ID <span className="font-mono text-xs text-foreground">{r.id.slice(0, 8)}…</span>
                </div>
                <Link
                  href={`/dashboard/requests/${r.id}`}
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }), "inline-flex items-center")}
                >
                  View details
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
