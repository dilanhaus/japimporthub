import Image from "next/image";
import { SectionHeading } from "@/components/importbase/section-heading";
import { QuotePreviewCards } from "@/components/importbase/landing/quote-preview-cards";
import { MilestoneTracker } from "@/components/importbase/landing/milestone-tracker";
import { MOCK_QUOTATIONS } from "@/lib/marketplace/mock-data";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MarketplacePreviewSection() {
  const quotes = MOCK_QUOTATIONS.slice(0, 3);

  return (
    <section className="border-t border-neutral-800 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Marketplace"
          title="Compare quotes. Choose with confidence."
          description="See how buyers review multiple dealer offers in one place — pricing, ratings, and timelines at a glance."
          align="center"
          className="mx-auto"
        />

        <div className="card-dark mt-16 overflow-hidden p-1 shadow-2xl shadow-black/40">
          <div className="flex items-center gap-2 border-b border-neutral-800 px-4 py-3">
            <div className="size-2.5 rounded-full bg-[var(--red)]" aria-hidden />
            <div className="size-2.5 rounded-full bg-neutral-600" aria-hidden />
            <div className="size-2.5 rounded-full bg-neutral-600" aria-hidden />
            <span className="ml-2 text-xs text-[var(--text-secondary)]">GradeFive · Request #G5-2847</span>
          </div>

          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
            <Card className="overflow-hidden rounded-none border-0 border-r border-neutral-800 bg-transparent shadow-none">
              <div className="relative aspect-[16/11] w-full lg:aspect-auto lg:min-h-[280px]">
                <Image
                  src={VEHICLE_IMAGES.skylineR34.src}
                  alt={VEHICLE_IMAGES.skylineR34.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-[var(--bg)]/40 lg:to-[var(--bg)]/90" />
              </div>
              <CardHeader className="relative -mt-20 pb-2 lg:-mt-0 lg:bg-[var(--surface)]/90 lg:backdrop-blur-sm">
                <Badge
                  variant="outline"
                  className="w-fit border-[var(--red)]/40 bg-[var(--red)]/10 text-[var(--red)]"
                >
                  Your request
                </Badge>
                <CardTitle className="text-lg text-[var(--text-primary)]">Nissan Skyline GT-R R34</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-[var(--text-secondary)] lg:bg-[var(--surface)]/90 lg:backdrop-blur-sm">
                <div className="flex justify-between">
                  <span>Budget</span>
                  <span className="font-medium text-[var(--text-primary)]">£35,000</span>
                </div>
                <div className="rounded-lg border border-neutral-800 bg-[var(--bg)] p-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)]">
                    Import milestones
                  </p>
                  <div className="mt-3">
                    <MilestoneTracker activeIndex={1} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <QuotePreviewCards quotes={quotes} />
          </div>
        </div>
      </div>
    </section>
  );
}
