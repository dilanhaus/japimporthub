import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageSquareQuote } from "lucide-react";
import { SectionHeading } from "@/components/importbase/section-heading";
import { FEATURED_REQUESTS } from "@/lib/marketplace/mock-data";
import { getRequestImage } from "@/lib/marketplace/vehicle-images";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FeaturedRequestsSection() {
  return (
    <section className="px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Live marketplace"
            title="Featured import requests"
            description="Real examples of what UK buyers are sourcing right now."
          />
          <Link
            href="/buyer"
            className={cn(
              buttonVariants({ variant: "ghostDark" }),
              "shrink-0",
            )}
          >
            Browse all requests
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {FEATURED_REQUESTS.map((req) => {
            const img = getRequestImage(req.id);
            return (
              <Card
                key={req.id}
                className="card-dark group overflow-hidden border-neutral-800 p-0 transition-all hover:-translate-y-0.5 hover:border-neutral-700 hover:shadow-lg hover:shadow-[var(--red)]/5"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/20 to-transparent" />
                  <Badge
                    variant="outline"
                    className="absolute left-3 top-3 border-neutral-700 bg-[var(--bg)]/80 text-[var(--text-primary)] backdrop-blur-md"
                  >
                    {req.status === "quoting" ? "Receiving quotes" : "Open"}
                  </Badge>
                </div>
                <CardHeader className="space-y-2 pb-2">
                  <CardTitle className="text-lg text-[var(--text-primary)]">{req.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[var(--text-secondary)]">Budget</span>
                    <span className="font-mono font-semibold text-[var(--text-primary)]">
                      £{req.budgetGbp.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-[var(--red)]/10 px-3 py-2 text-sm text-[var(--text-primary)]">
                    <MessageSquareQuote className="size-4 shrink-0 text-[var(--red)]" />
                    <span>
                      <strong className="font-semibold">{req.quotesCount}</strong> quotes received
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
