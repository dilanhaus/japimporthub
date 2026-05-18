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
            className={cn(buttonVariants({ variant: "outline" }), "shrink-0 border-white/15 text-zinc-300")}
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
                className="group overflow-hidden border-white/[0.06] bg-white/[0.02] p-0 transition-all hover:-translate-y-0.5 hover:border-white/10 hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                  <Badge
                    variant="secondary"
                    className="absolute left-3 top-3 border-0 bg-black/50 text-zinc-200 backdrop-blur-md"
                  >
                    {req.status === "quoting" ? "Receiving quotes" : "Open"}
                  </Badge>
                </div>
                <CardHeader className="space-y-2 pb-2">
                  <CardTitle className="text-lg text-white">{req.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Budget</span>
                    <span className="font-semibold text-white">£{req.budgetGbp.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-indigo-500/10 px-3 py-2 text-sm text-indigo-200">
                    <MessageSquareQuote className="size-4 shrink-0" />
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
