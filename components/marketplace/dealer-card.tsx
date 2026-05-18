import { CheckCircle2, MapPin, Star } from "lucide-react";
import type { DealerProfile } from "@/lib/marketplace/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

type DealerCardProps = {
  dealer: DealerProfile;
  href?: string;
};

export function DealerCard({ dealer, href }: DealerCardProps) {
  const content = (
    <Card className="border-border/80 transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-foreground">{dealer.name}</h3>
              {dealer.verified ? (
                <CheckCircle2 className="size-4 text-emerald-600" aria-label="Verified" />
              ) : null}
            </div>
            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {dealer.location}
            </p>
          </div>
          <Badge variant="secondary" className="capitalize">
            {dealer.tier}
          </Badge>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="flex items-center gap-1 font-medium text-foreground">
            <Star className="size-4 fill-amber-400 text-amber-400" />
            {dealer.rating}
          </span>
          <span>{dealer.reviewCount} reviews</span>
          <span>·</span>
          <span>{dealer.completedImports} imports</span>
          <span>·</span>
          <span>Responds {dealer.responseTime}</span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {dealer.specialties.map((s) => (
            <Badge key={s} variant="outline" className="text-xs font-normal">
              {s}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }
  return content;
}
