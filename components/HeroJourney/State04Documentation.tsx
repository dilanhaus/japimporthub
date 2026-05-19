"use client";

import { m } from "framer-motion";
import { FileCheck2, FileText, ScrollText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DOCUMENTS } from "./shared";

const DOC_ICONS = {
  auction: FileText,
  export: ScrollText,
  inspection: FileCheck2,
} as const;

const FAN_LAYOUT = [
  { spreadX: -120, spreadY: 0, spreadRotate: -6, stackRotate: -12, stackX: -8, z: 1 },
  { spreadX: 0, spreadY: -4, spreadRotate: 0, stackRotate: 0, stackX: 0, z: 3 },
  { spreadX: 120, spreadY: 0, spreadRotate: 6, stackRotate: 10, stackX: 8, z: 2 },
] as const;

function RedactedLines() {
  return (
    <div className="mt-3 space-y-1.5 px-1" aria-hidden>
      <div className="h-1.5 w-full rounded-sm bg-neutral-700/80 blur-[0.5px]" />
      <div className="h-1.5 w-[92%] rounded-sm bg-neutral-700/60 blur-[0.5px]" />
      <div className="h-1.5 w-[78%] rounded-sm bg-neutral-800/80 blur-[0.5px]" />
      <div className="h-1.5 w-[85%] rounded-sm bg-neutral-700/50 blur-[0.5px]" />
      <div className="h-1.5 w-[60%] rounded-sm bg-neutral-800/70 blur-[0.5px]" />
    </div>
  );
}

export function State04Documentation() {
  return (
    <div className="flex min-h-[220px] items-center justify-center py-2">
      <div className="relative h-[200px] w-full max-w-2xl">
        {DOCUMENTS.map((doc, index) => {
          const Icon = DOC_ICONS[doc.id];
          const layout = FAN_LAYOUT[index]!;
          return (
            <m.div
              key={doc.id}
              className="absolute left-1/2 top-1/2 w-[200px] -translate-x-1/2 -translate-y-1/2 sm:w-[220px]"
              style={{ zIndex: layout.z }}
              initial={{
                x: layout.stackX,
                y: 8,
                rotate: layout.stackRotate,
                opacity: 0.85,
              }}
              animate={{
                x: layout.spreadX,
                y: layout.spreadY,
                rotate: layout.spreadRotate,
                opacity: 1,
              }}
              transition={{
                duration: 0.65,
                delay: 0.15 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div
                className={cn(
                  "relative overflow-hidden rounded-lg border border-neutral-700/90 bg-[#1a1a1c]",
                  "shadow-[0_12px_40px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.04)]",
                  "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-8",
                  "before:bg-gradient-to-b before:from-white/[0.03] before:to-transparent",
                )}
              >
                {/* fold shadow */}
                <div
                  className="absolute right-0 top-0 size-6 bg-gradient-to-bl from-neutral-900/80 to-transparent"
                  aria-hidden
                />
                <div className="relative px-4 pb-4 pt-3">
                  <div className="flex items-center gap-2 border-b border-neutral-800/80 pb-2">
                    <Icon className="size-4 text-neutral-500" strokeWidth={1.5} aria-hidden />
                    <p className="text-xs font-semibold text-[var(--text-primary)]">{doc.title}</p>
                  </div>
                  <RedactedLines />
                  <Badge
                    variant="outline"
                    className={cn("mt-3 w-full justify-center text-[10px]", doc.badgeClass)}
                  >
                    {doc.badge}
                  </Badge>
                </div>
              </div>
            </m.div>
          );
        })}
      </div>
    </div>
  );
}
