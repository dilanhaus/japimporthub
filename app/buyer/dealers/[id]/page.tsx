import { notFound } from "next/navigation";
import { getDealerById } from "@/lib/marketplace/mock-data";
import { DealerCard } from "@/components/marketplace/dealer-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Star } from "lucide-react";

type PageProps = { params: Promise<{ id: string }> };

export default async function BuyerDealerProfilePage({ params }: PageProps) {
  const { id } = await params;
  const dealer = getDealerById(id);
  if (!dealer) notFound();

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <DealerCard dealer={dealer} />

      <Card>
        <CardHeader>
          <CardTitle>Reviews</CardTitle>
          <CardDescription>Placeholder UI for dealer ratings and buyer feedback.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { author: "James R.", rating: 5, text: "Clear communication and honest landed pricing throughout." },
            { author: "Sarah L.", rating: 5, text: "Auction sheet matched the vehicle on arrival. Highly professional." },
          ].map((r) => (
            <div key={r.author} className="rounded-lg border border-border/80 p-4">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-sm font-medium">{r.author}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
