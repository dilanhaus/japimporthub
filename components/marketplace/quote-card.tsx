import { CheckCircle2 } from "lucide-react";
import type { Quotation } from "@/lib/marketplace/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type QuoteCardProps = {
  quote: Quotation;
  highlighted?: boolean;
};

export function QuoteCard({ quote, highlighted }: QuoteCardProps) {
  return (
    <Card
      className={
        highlighted ? "border-emerald-500/30 bg-emerald-500/5 ring-1 ring-emerald-500/20" : "border-border/80"
      }
    >
      <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{quote.dealer.name}</CardTitle>
            {quote.dealer.verified ? (
              <CheckCircle2 className="size-4 text-emerald-600" aria-label="Verified" />
            ) : null}
          </div>
          <CardDescription className="mt-1">
            {quote.dealer.location} · ETA {quote.etaWeeks} weeks
          </CardDescription>
        </div>
        <div className="text-right">
          <p className="text-xl font-semibold text-foreground">
            £{quote.totalLandedGbp.toLocaleString()}
          </p>
          <p className="text-xs text-muted-foreground">landed estimate</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed text-muted-foreground">{quote.message}</p>
        <Separator />
        <dl className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <dt className="text-muted-foreground">Vehicle</dt>
            <dd className="font-medium text-foreground">£{quote.vehiclePriceGbp.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Shipping</dt>
            <dd className="font-medium text-foreground">£{quote.shippingGbp.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Fees</dt>
            <dd className="font-medium text-foreground">£{quote.feesGbp.toLocaleString()}</dd>
          </div>
        </dl>
        <div className="flex flex-wrap gap-1.5">
          {quote.highlights.map((h) => (
            <Badge key={h} variant="secondary" className="text-xs font-normal">
              {h}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
