import Link from "next/link";
import { MessageSquareQuote } from "lucide-react";
import type { MarketplaceRequest } from "@/lib/marketplace/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type RequestCardProps = {
  request: MarketplaceRequest;
  href?: string;
};

export function RequestCard({ request, href }: RequestCardProps) {
  const card = (
    <Card className="border-border/80 transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <Badge variant="secondary" className="mb-2 w-fit capitalize">
          {request.status.replace("_", " ")}
        </Badge>
        <CardTitle className="text-lg">{request.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Budget</span>
          <span className="font-semibold text-foreground">£{request.budgetGbp.toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border/80 bg-muted/30 px-3 py-2 text-muted-foreground">
          <MessageSquareQuote className="size-4" />
          <span>
            <strong className="text-foreground">{request.quotesCount}</strong> quotes received
          </span>
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }
  return card;
}
