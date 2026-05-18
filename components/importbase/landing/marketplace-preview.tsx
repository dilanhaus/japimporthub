import Image from "next/image";
import { CheckCircle2, Star } from "lucide-react";
import { SectionHeading } from "@/components/importbase/section-heading";
import { MOCK_QUOTATIONS } from "@/lib/marketplace/mock-data";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MarketplacePreviewSection() {
  const quotes = MOCK_QUOTATIONS.slice(0, 3);

  return (
    <section className="border-t border-white/[0.06] px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Marketplace"
          title="Compare quotes. Choose with confidence."
          description="See how buyers review multiple dealer offers in one place — pricing, ratings, and timelines at a glance."
          align="center"
          className="mx-auto"
        />

        <div className="mt-16 overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-900/80 p-1 shadow-2xl shadow-black/40 ring-1 ring-white/[0.06]">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
            <div className="size-2.5 rounded-full bg-red-500/80" />
            <div className="size-2.5 rounded-full bg-amber-500/80" />
            <div className="size-2.5 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-xs text-zinc-500">ImportBase · Request #IB-2847</span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
            <Card className="overflow-hidden rounded-none border-0 border-r border-white/[0.06] bg-transparent shadow-none">
              <div className="relative aspect-[16/11] w-full lg:aspect-auto lg:min-h-full">
                <Image
                  src={VEHICLE_IMAGES.skylineR34.src}
                  alt={VEHICLE_IMAGES.skylineR34.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-zinc-950/40 lg:to-zinc-950/90" />
              </div>
              <CardHeader className="relative -mt-20 pb-2 lg:-mt-0 lg:bg-zinc-950/80 lg:backdrop-blur-sm">
                <Badge variant="secondary" className="w-fit border-0 bg-indigo-500/30 text-indigo-100">
                  Your request
                </Badge>
                <CardTitle className="text-lg text-white">Nissan Skyline GT-R R34</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-zinc-400 lg:bg-zinc-950/80 lg:backdrop-blur-sm">
                <div className="flex justify-between">
                  <span>Budget</span>
                  <span className="font-medium text-zinc-200">£35,000</span>
                </div>
                <div className="flex justify-between">
                  <span>Year range</span>
                  <span className="text-zinc-200">1999–2002</span>
                </div>
                <div className="flex justify-between">
                  <span>Quotes received</span>
                  <span className="font-medium text-emerald-400">7 active</span>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 text-xs leading-relaxed">
                  Timeline: Sourcing → Shipping → UK customs → Delivery
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3 p-4">
              {quotes.map((q, i) => (
                <Card
                  key={q.id}
                  className={cn(
                    "border-white/[0.06] bg-white/[0.02] transition-colors",
                    i === 2 && "ring-1 ring-emerald-500/30",
                  )}
                >
                  <CardContent className="flex flex-wrap items-start justify-between gap-3 p-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-white">{q.dealer.name}</p>
                        {q.dealer.verified ? (
                          <CheckCircle2 className="size-4 text-emerald-400" aria-label="Verified" />
                        ) : null}
                      </div>
                      <div className="mt-1 flex items-center gap-1 text-xs text-zinc-500">
                        <Star className="size-3 fill-amber-400 text-amber-400" />
                        {q.dealer.rating} · {q.dealer.reviewCount} reviews
                      </div>
                      <p className="mt-2 text-xs text-zinc-500">ETA {q.etaWeeks} weeks · {q.dealer.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">
                        £{q.totalLandedGbp.toLocaleString()}
                      </p>
                      <p className="text-xs text-zinc-500">landed estimate</p>
                      {i === 2 ? (
                        <Badge className="mt-2 border-0 bg-emerald-500/20 text-emerald-300">Best value</Badge>
                      ) : null}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
