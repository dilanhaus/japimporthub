import Image from "next/image";
import {
  BadgeCheck,
  BarChart3,
  MessageSquare,
  Shield,
  Star,
  Workflow,
} from "lucide-react";
import { LandedCostCalculator } from "@/components/importbase/landing/landed-cost-calculator";
import { SectionHeading } from "@/components/importbase/section-heading";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified dealer profiles",
    body: "Every exporter is reviewed before they can quote on your request.",
  },
  {
    icon: BarChart3,
    title: "Transparent pricing breakdowns",
    body: "Vehicle, shipping, and fees shown clearly — no surprise landed costs.",
  },
  {
    icon: MessageSquare,
    title: "Secure in-platform messaging",
    body: "Keep conversations, documents, and decisions in one auditable thread.",
  },
  {
    icon: Workflow,
    title: "Import process tracking",
    body: "Milestones from sourcing to UK compliance, visible in your dashboard.",
  },
  {
    icon: Star,
    title: "Dealer reviews and ratings",
    body: "Real feedback from buyers who completed imports through the platform.",
  },
  {
    icon: Shield,
    title: "Centralised quote comparison",
    body: "Side-by-side offers so you choose on merit, not guesswork.",
  },
] as const;

const docThumbs = [
  { label: "Auction sheet", sub: "Grade 4 · translated" },
  { label: "Export cert", sub: "Redacted · verified" },
  { label: "Inspection", sub: "Video stills" },
] as const;

export function WhyGradeFiveSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(225,29,46,0.08),transparent)]"
      />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <SectionHeading
              eyebrow="Why GradeFive"
              title="Built around trust and transparency"
              description="Professional importing with documentation you can verify — not opaque broker chains."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {features.slice(0, 3).map((f) => (
                <Card key={f.title} className="card-dark border-neutral-800 shadow-none">
                  <CardContent className="flex gap-3 p-4">
                    <f.icon className="size-5 shrink-0 text-[var(--red)]" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{f.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{f.body}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10">
              <LandedCostCalculator />
            </div>
          </div>

          <div className="relative">
            <div className="card-dark relative aspect-[4/5] overflow-hidden">
              <Image
                src={VEHICLE_IMAGES.heroPrimary.src}
                alt={VEHICLE_IMAGES.heroPrimary.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)]/90 via-transparent to-[var(--bg)]/20" />
              <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-[var(--text-primary)]">
                Source exclusive Japanese metal with full transparency
              </p>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {docThumbs.map((doc) => (
                <div
                  key={doc.label}
                  className="card-dark relative aspect-[3/4] overflow-hidden bg-[var(--bg)] p-2"
                >
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_8px,rgba(255,255,255,0.03)_8px,rgba(255,255,255,0.03)_9px)]" />
                  <p className="relative text-[9px] font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
                    {doc.label}
                  </p>
                  <p className="relative mt-6 font-mono text-[8px] text-[var(--text-secondary)] line-through opacity-60">
                    ███ ████ ██
                  </p>
                  <span className="absolute right-1 top-1 rounded border border-[var(--red)]/40 bg-[var(--red)]/15 px-1 py-0.5 text-[8px] font-medium text-[var(--red)]">
                    Translated
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {features.slice(3).map((f) => (
                <Card key={f.title} className="card-dark border-neutral-800 shadow-none">
                  <CardContent className="flex gap-3 p-4">
                    <f.icon className="size-5 shrink-0 text-[var(--red)]" strokeWidth={1.5} />
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{f.title}</h3>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--text-secondary)]">{f.body}</p>
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
