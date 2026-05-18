import { cn } from "@/lib/utils";

const MILESTONES = [
  { key: "auction", label: "Auction won", time: "12 May · 09:40 JST" },
  { key: "vessel", label: "On vessel", time: "ETA 18 Jun" },
  { key: "landed", label: "Landed UK", time: "Pending" },
  { key: "handover", label: "Handover", time: "—" },
] as const;

export function MilestoneTracker({ activeIndex = 1 }: { activeIndex?: number }) {
  return (
    <ol className="space-y-0">
      {MILESTONES.map((m, i) => {
        const done = i < activeIndex;
        const active = i === activeIndex;
        return (
          <li key={m.key} className="relative flex gap-3 pb-5 last:pb-0">
            {i < MILESTONES.length - 1 ? (
              <span
                aria-hidden
                className={cn(
                  "absolute left-[7px] top-4 h-[calc(100%-4px)] w-px",
                  done ? "bg-neutral-600" : "bg-neutral-800",
                )}
              />
            ) : null}
            <span
              className={cn(
                "relative z-10 mt-0.5 size-3.5 shrink-0 rounded-full border-2",
                active && "border-[var(--red)] bg-[var(--red)]",
                done && !active && "border-neutral-500 bg-neutral-500",
                !done && !active && "border-neutral-700 bg-transparent",
              )}
              aria-hidden
            />
            <div>
              <p
                className={cn(
                  "text-sm font-medium",
                  active && "text-[var(--red)]",
                  done && !active && "text-neutral-300",
                  !done && !active && "text-[var(--text-secondary)]",
                )}
              >
                {m.label}
              </p>
              <p className="text-[10px] text-[var(--text-secondary)]">{m.time}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
