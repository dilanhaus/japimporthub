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
  { spreadX: -72, spreadY: 0, spreadRotate: -8, stackRotate: -14, stackX: -6, z: 1 },
  { spreadX: 0, spreadY: -6, spreadRotate: 0, stackRotate: 0, stackX: 0, z: 3 },
  { spreadX: 72, spreadY: 0, spreadRotate: 8, stackRotate: 12, stackX: 6, z: 2 },
] as const;

function RedactedLines() {
  return (
    <div className="mt-2.5 space-y-1 px-0.5" aria-hidden>
      <div className="h-1 w-full rounded-sm bg-neutral-700/90 blur-[0.5px]" />
      <div className="h-1 w-[94%] rounded-sm bg-neutral-700/70 blur-[0.5px]" />
      <div className="h-1 w-[80%] rounded-sm bg-neutral-800 blur-[0.5px]" />
      <div className="h-1 w-[88%] rounded-sm bg-neutral-700/55 blur-[0.5px]" />
    </div>
  );
}

type DocumentStackProps = {
  compact?: boolean;
};

export function DocumentStack({ compact = false }: DocumentStackProps) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center",
        compact ? "h-[200px]" : "h-[220px]",
      )}
    >
      {DOCUMENTS.map((doc, index) => {
        const Icon = DOC_ICONS[doc.id];
        const layout = FAN_LAYOUT[index]!;
        return (
          <m.div
            key={doc.id}
            className={cn(
              "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
              compact ? "w-[130px]" : "w-[200px] sm:w-[220px]",
            )}
            style={{ zIndex: layout.z }}
            initial={{
              x: layout.stackX,
              y: 10,
              rotate: layout.stackRotate,
              opacity: 0.7,
            }}
            animate={{
              x: layout.spreadX,
              y: layout.spreadY,
              rotate: layout.spreadRotate,
              opacity: 1,
            }}
            transition={{
              duration: 0.7,
              delay: 0.1 + index * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-lg border border-neutral-700/90 bg-[#1a1a1c]",
                "shadow-[0_10px_32px_-10px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.04)]",
              )}
            >
              <div
                className="absolute right-0 top-0 size-5 bg-gradient-to-bl from-neutral-900/90 to-transparent"
                aria-hidden
              />
              <div className="relative px-3 pb-3 pt-2.5">
                <div className="flex items-center gap-1.5 border-b border-neutral-800/80 pb-1.5">
                  <Icon className="size-3.5 text-neutral-500" strokeWidth={1.5} aria-hidden />
                  <p className="text-[10px] font-semibold text-[var(--text-primary)]">{doc.title}</p>
                </div>
                <RedactedLines />
                <Badge
                  variant="outline"
                  className={cn("mt-2 w-full justify-center text-[9px]", doc.badgeClass)}
                >
                  {doc.badge}
                </Badge>
              </div>
            </div>
          </m.div>
        );
      })}
    </div>
  );
}
