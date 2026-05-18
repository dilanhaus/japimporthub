"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import type { Quotation } from "@/lib/marketplace/types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AUCTION_META = [
  { grade: "4", mileage: "62,000 km" },
  { grade: "3.5", mileage: "48,200 km" },
  { grade: "4.5", mileage: "71,800 km" },
];

type QuotePreviewCardsProps = {
  quotes: Quotation[];
};

export function QuotePreviewCards({ quotes }: QuotePreviewCardsProps) {
  const [pricingMode, setPricingMode] = useState<"fixed" | "auction">("fixed");

  return (
    <div className="space-y-3 p-4">
      <div className="flex items-center justify-between gap-2 border-b border-neutral-800 pb-3">
        <p className="text-xs text-[var(--text-secondary)]">Compare dealer offers</p>
        <div
          className="flex rounded-lg border border-neutral-800 bg-[var(--bg)] p-0.5 text-[10px] font-medium sm:text-xs"
          role="group"
          aria-label="Pricing mode"
        >
          {(["fixed", "auction"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => setPricingMode(mode)}
              className={cn(
                "rounded-md px-2.5 py-1 capitalize transition-colors",
                pricingMode === mode
                  ? "bg-[var(--red)] text-white"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
              )}
            >
              {mode === "fixed" ? "Fixed price" : "Auction-linked"}
            </button>
          ))}
        </div>
      </div>

      <p className="text-[10px] leading-relaxed text-[var(--text-secondary)]">
        Protection, documents, and dispute resolution apply only to on‑platform deals.
      </p>

      {quotes.map((q, i) => {
        const meta = AUCTION_META[i] ?? AUCTION_META[0];
        return (
          <Card
            key={q.id}
            className={cn(
              "card-dark border-neutral-800 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]",
              i === 2 && "ring-1 ring-[var(--red)]/30",
            )}
          >
            <CardContent className="space-y-3 p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[var(--text-primary)]">{q.dealer.name}</p>
                    {q.dealer.verified ? (
                      <CheckCircle2 className="size-4 text-[var(--red)]" aria-label="Verified" />
                    ) : null}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                    <Star className="size-3 fill-amber-500/80 text-amber-500/80" />
                    {q.dealer.rating} · {q.dealer.reviewCount} reviews
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className="border-[var(--red)]/40 bg-[var(--red)]/10 text-[10px] text-[var(--red)]"
                >
                  As‑described protection
                </Badge>
              </div>

              <div className="flex flex-wrap items-end justify-between gap-2 border-t border-neutral-800 pt-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">
                    Total Landed Cost
                  </p>
                  <p className="font-mono text-xl font-bold text-[var(--text-primary)]">
                    £{q.totalLandedGbp.toLocaleString()}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    ETA {q.etaWeeks} weeks · {pricingMode === "auction" ? "Auction-linked" : "Fixed price"}
                  </p>
                </div>
                <div className="text-right text-xs text-[var(--text-secondary)]">
                  <p>
                    Grade <span className="font-mono text-[var(--text-primary)]">{meta.grade}</span>
                  </p>
                  <p className="font-mono">{meta.mileage}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
