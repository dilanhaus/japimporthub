import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Shield } from "lucide-react";
import { getSessionUser } from "@/lib/auth/session";
import { requestStatusLabel } from "@/lib/constants/request-status";
import {
  getQuotesForRequest,
  getRequestById,
  getTimelineForRequest,
} from "@/lib/mock/store";
import type {
  ImportStatusRow,
  QuoteStatus,
  RequestStatus,
  VehicleQuoteRow,
  VehicleRequestRow,
} from "@/types/database";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CustomerRequestDetailPage({ params }: PageProps) {
  const { id } = await params;
  const session = await getSessionUser();
  if (!session) return null;

  const request = getRequestById(id);
  if (!request) {
    notFound();
  }

  const row = request as VehicleRequestRow;
  if (row.customer_id !== session.id && session.profile?.role !== "admin") {
    notFound();
  }

  const steps: ImportStatusRow[] = getTimelineForRequest(id);
  const options: VehicleQuoteRow[] = getQuotesForRequest(id);

  return (
    <div className="mx-auto max-w-4xl space-y-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-1 size-4" />
            Back to dashboard
          </Link>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
            {row.make} {row.model}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Submitted {format(new Date(row.created_at), "d MMM yyyy")}
          </p>
        </div>
        <Badge variant="secondary" className="w-fit text-sm">
          {requestStatusLabel(row.status as RequestStatus)}
        </Badge>
      </div>

      <Card className="border-border/80">
        <CardHeader>
          <CardTitle className="text-lg">Brief</CardTitle>
          <CardDescription>What we&apos;re sourcing for you.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <Detail label="Variant" value={row.variant} />
          <Detail label="Year range" value={formatYearRange(row.year_min, row.year_max)} />
          <Detail label="Budget ceiling" value={row.budget_max_gbp ? `£${row.budget_max_gbp}` : "—"} />
          <Detail label="Mileage cap" value={row.mileage_max_km ? `${row.mileage_max_km.toLocaleString()} km` : "—"} />
          <Detail label="Transmission" value={row.transmission} />
          <Detail label="Colours" value={row.color_preferences} />
          <Detail label="UK port" value={row.destination_port} />
          <div className="sm:col-span-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Notes</p>
            <p className="mt-1 text-sm leading-relaxed text-foreground">{row.notes || "—"}</p>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Timeline</h2>
          <p className="text-sm text-muted-foreground">Major milestones on your import.</p>
        </div>
        <div className="grid gap-3">
          {steps.length === 0 ? (
            <Card className="border-dashed bg-muted/20">
              <CardContent className="py-8 text-center text-sm text-muted-foreground">
                Your timeline will appear here as we progress.
              </CardContent>
            </Card>
          ) : (
            steps.map((step, index) => (
              <Card key={step.id} className="border-border/80">
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                      Step {index + 1}
                    </p>
                    <CardTitle className="text-base">{step.title}</CardTitle>
                    {step.description ? (
                      <CardDescription className="mt-2">{step.description}</CardDescription>
                    ) : null}
                  </div>
                  {step.completed_at ? (
                    <Badge variant="outline" className="shrink-0">
                      {format(new Date(step.completed_at), "d MMM")}
                    </Badge>
                  ) : (
                    <Badge variant="secondary">In progress</Badge>
                  )}
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-semibold tracking-tight">Options</h2>
            <p className="text-sm text-muted-foreground">Vehicles we&apos;ve surfaced for your review.</p>
          </div>
        </div>
        {options.length === 0 ? (
          <Card className="border-dashed bg-muted/20">
            <CardContent className="py-8 text-center text-sm text-muted-foreground">
              No options published yet. We&apos;ll notify you as soon as sourcing updates land.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-3">
            {options.map((q) => (
              <Card key={q.id} className="border-border/80">
                <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                  <div>
                    <CardTitle className="text-base">{q.title}</CardTitle>
                    {q.summary ? <CardDescription className="mt-2">{q.summary}</CardDescription> : null}
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-foreground">£{q.price_gbp}</p>
                    <Badge variant="outline" className="mt-2 capitalize">
                      {q.status as QuoteStatus}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </section>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="flex flex-row items-start gap-3 space-y-0">
          <Shield className="mt-0.5 size-5 text-primary" />
          <div>
            <CardTitle className="text-base">Deposits & payments</CardTitle>
            <CardDescription>
              Stripe‑powered deposit checkout is wired next. For now, we&apos;ll coordinate deposits manually if
              needed—your dashboard will always show paid vs. outstanding.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-sm text-foreground">{value && value.length > 0 ? value : "—"}</p>
    </div>
  );
}

function formatYearRange(min: number | null, max: number | null) {
  if (min && max) return `${min} – ${max}`;
  if (min) return `${min}+`;
  if (max) return `Up to ${max}`;
  return "—";
}
