import { notFound } from "next/navigation";
import { getRequestById } from "@/lib/marketplace/mock-data";
import { QuoteCard } from "@/components/marketplace/quote-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PageProps = { params: Promise<{ id: string }> };

export default async function BuyerCompareQuotesPage({ params }: PageProps) {
  const { id } = await params;
  const request = getRequestById(id);
  if (!request) notFound();

  const sorted = [...request.quotations].sort((a, b) => a.totalLandedGbp - b.totalLandedGbp);
  const bestId = sorted[0]?.id;

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div>
        <Badge variant="secondary" className="mb-2">
          {request.quotesCount} quotes
        </Badge>
        <h2 className="text-2xl font-semibold">{request.title}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Budget £{request.budgetGbp.toLocaleString()} · {request.yearRange}
        </p>
        {request.notes ? <p className="mt-4 text-sm text-muted-foreground">{request.notes}</p> : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Compare quotations</CardTitle>
          <CardDescription>Transparent landed estimates from verified dealers.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          {request.quotations.length === 0 ? (
            <p className="text-sm text-muted-foreground">No quotes yet for this request.</p>
          ) : (
            request.quotations.map((q) => (
              <QuoteCard key={q.id} quote={q} highlighted={q.id === bestId} />
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
