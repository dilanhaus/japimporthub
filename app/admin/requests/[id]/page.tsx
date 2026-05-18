import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { requestStatusLabel } from "@/lib/constants/request-status";
import { getRequestById, getTimelineForRequest } from "@/lib/mock/store";
import type { ImportStatusRow, RequestStatus, VehicleRequestRow } from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { UpdateRequestStatusForm } from "@/components/admin/update-request-status-form";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminRequestDetailPage({ params }: PageProps) {
  const { id } = await params;
  const request = getRequestById(id);

  if (!request) {
    notFound();
  }

  const row = request as VehicleRequestRow;
  const steps: ImportStatusRow[] = getTimelineForRequest(id);

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Link
            href="/admin/requests"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 size-4" />
            All requests
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            {row.make} {row.model}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Customer <span className="font-mono text-xs">{row.customer_id}</span>
          </p>
        </div>
        <Badge className="w-fit" variant="secondary">
          {requestStatusLabel(row.status as RequestStatus)}
        </Badge>
      </div>

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle className="text-lg">Operations</CardTitle>
          <CardDescription>Update the customer-visible pipeline stage.</CardDescription>
        </CardHeader>
        <CardContent>
          <UpdateRequestStatusForm
            key={row.status}
            requestId={row.id}
            currentStatus={row.status as RequestStatus}
          />
        </CardContent>
      </Card>

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle className="text-lg">Brief</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 text-sm sm:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Variant</p>
            <p className="mt-1">{row.variant || "—"}</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Budget</p>
            <p className="mt-1">{row.budget_max_gbp ? `£${row.budget_max_gbp}` : "—"}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Notes</p>
            <p className="mt-1 leading-relaxed">{row.notes || "—"}</p>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Timeline</h2>
          <p className="text-sm text-muted-foreground">All steps (including internal-only in future iterations).</p>
        </div>
        <Separator />
        <div className="grid gap-3">
          {steps.map((step, index) => (
            <Card key={step.id} className="border-border/80">
              <CardHeader className="pb-3">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step {index + 1}
                </p>
                <CardTitle className="text-base">{step.title}</CardTitle>
                {step.description ? <CardDescription>{step.description}</CardDescription> : null}
                {step.completed_at ? (
                  <p className="text-xs text-muted-foreground">
                    Completed {format(new Date(step.completed_at), "d MMM yyyy HH:mm")}
                  </p>
                ) : null}
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <Card className="border-dashed border-border/80 bg-muted/10">
        <CardHeader>
          <CardTitle className="text-base">Next iteration hooks</CardTitle>
          <CardDescription>
            Messaging, quote publishing, document uploads, and Stripe deposit links will plug in here using the same
            request ID.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
