"use client";

import { m } from "framer-motion";
import { FileCheck2, FileText, ScrollText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DOCUMENTS, staggerItem } from "./shared";

const DOC_ICONS = {
  auction: FileText,
  export: ScrollText,
  inspection: FileCheck2,
} as const;

export function State04Documentation() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {DOCUMENTS.map((doc, index) => {
        const Icon = DOC_ICONS[doc.id];
        return (
          <m.div
            key={doc.id}
            {...staggerItem}
            transition={{ duration: 0.35, delay: 0.12 + index * 0.14 }}
          >
            <Card
              size="sm"
              className="h-full border-neutral-800/90 bg-[var(--bg)]/70 py-0 ring-neutral-800/80"
            >
              <CardContent className="flex flex-col items-center px-4 py-6 text-center">
                <div className="flex size-11 items-center justify-center rounded-lg border border-neutral-800 bg-[var(--surface)]">
                  <Icon className="size-5 text-[var(--text-secondary)]" strokeWidth={1.5} aria-hidden />
                </div>
                <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">{doc.title}</p>
                <Badge
                  variant="outline"
                  className={cn("mt-2 text-[10px]", doc.badgeClass)}
                >
                  {doc.badge}
                </Badge>
              </CardContent>
            </Card>
          </m.div>
        );
      })}
    </div>
  );
}
