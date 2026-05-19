"use client";

import { m } from "framer-motion";
import { BadgeCheck, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MonoValue, type DEMO_QUOTES } from "./shared";

type Quote = (typeof DEMO_QUOTES)[number];

type QuoteCardProps = {
  quote: Quote;
  selected?: boolean;
  dimmed?: boolean;
  accepted?: boolean;
  className?: string;
};

export function QuoteCard({
  quote,
  selected = false,
  dimmed = false,
  accepted = false,
  className,
}: QuoteCardProps) {
  return (
    <m.article
      className={cn(
        "relative flex h-full flex-col rounded-xl border bg-[var(--bg)]/90 p-4",
        selected
          ? "border-[var(--red)]/50 shadow-[0_0_0_1px_rgba(225,29,46,0.25)]"
          : "border-neutral-800/90",
        dimmed && !selected && "opacity-50",
        className,
      )}
    >
      {accepted ? (
        <Badge className="absolute -top-2.5 right-3 border-emerald-500/40 bg-emerald-500/15 text-[10px] text-emerald-400">
          Quote accepted
        </Badge>
      ) : null}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-1.5">
            <p className="truncate text-sm font-medium text-[var(--text-primary)]">{quote.dealer}</p>
            <Badge
              variant="outline"
              className="h-4 gap-0.5 border-neutral-700 bg-neutral-900/50 px-1.5 text-[9px] text-[var(--text-secondary)]"
            >
              <BadgeCheck className="size-2.5 text-[var(--red)]" aria-hidden />
              Verified
            </Badge>
          </div>
          <p className="mt-1 flex items-center gap-1 text-xs text-[var(--text-secondary)]">
            <Star className="size-3 fill-amber-500/90 text-amber-500/90" aria-hidden />
            {quote.rating.toFixed(1)}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[10px] uppercase tracking-wider text-[var(--text-secondary)]">Landed</p>
          <p className="text-lg font-semibold">
            <MonoValue>{quote.price}</MonoValue>
          </p>
        </div>
      </div>
      <div className="mt-auto flex items-end justify-between pt-4 text-xs text-[var(--text-secondary)]">
        <span>
          ETA <MonoValue>{quote.eta}</MonoValue>
        </span>
        <span>
          Grade <MonoValue>{quote.grade}</MonoValue>
        </span>
      </div>
    </m.article>
  );
}
