import Image from "next/image";
import {
  BadgeCheck,
  BarChart3,
  MessageSquare,
  Shield,
  Star,
  Workflow,
} from "lucide-react";
import { SectionHeading } from "@/components/importbase/section-heading";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  { icon: BadgeCheck, title: "Verified dealer profiles", body: "Every exporter is reviewed before they can quote on your request." },
  { icon: BarChart3, title: "Transparent pricing breakdowns", body: "Vehicle, shipping, and fees shown clearly — no surprise landed costs." },
  { icon: MessageSquare, title: "Secure in-platform messaging", body: "Keep conversations, documents, and decisions in one auditable thread." },
  { icon: Workflow, title: "Import process tracking", body: "Milestones from sourcing to UK compliance, visible in your dashboard." },
  { icon: Star, title: "Dealer reviews and ratings", body: "Real feedback from buyers who completed imports through the platform." },
  { icon: Shield, title: "Centralised quote comparison", body: "Side-by-side offers so you choose on merit, not guesswork." },
] as const;

export function WhyImportBaseSection() {
  return (
    <section className="relative overflow-hidden px-4 py-24 sm:px-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_100%_50%,rgba(99,102,241,0.1),transparent)]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <SectionHeading
            eyebrow="Why ImportBase"
            title="Built Around Trust And Transparency"
            description="We designed the experience for buyers who want professional importing — not forum roulette or opaque WhatsApp deals."
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {features.slice(0, 3).map((f) => (
              <Card
                key={f.title}
                className="border-white/[0.06] bg-white/[0.02] shadow-none lg:border-white/[0.04]"
              >
                <CardContent className="flex gap-3 p-4">
                  <f.icon className="size-5 shrink-0 text-indigo-400" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">{f.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
            <Image
              src={VEHICLE_IMAGES.heroPrimary.src}
              alt={VEHICLE_IMAGES.heroPrimary.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-zinc-950/20" />
            <p className="absolute bottom-4 left-4 right-4 text-sm font-medium text-white">
              Source exclusive Japanese metal with full transparency
            </p>
          </div>
          <div className="absolute -bottom-4 -right-4 hidden w-40 overflow-hidden rounded-xl border border-white/15 shadow-xl sm:block">
            <div className="relative aspect-square">
              <Image
                src={VEHICLE_IMAGES.hondaNsx.src}
                alt={VEHICLE_IMAGES.hondaNsx.alt}
                fill
                sizes="160px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {features.slice(3).map((f) => (
              <Card key={f.title} className="border-white/[0.06] bg-white/[0.02] shadow-none">
                <CardContent className="flex gap-3 p-4">
                  <f.icon className="size-5 shrink-0 text-indigo-400" strokeWidth={1.5} />
                  <div>
                    <h3 className="text-sm font-semibold text-white">{f.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-400">{f.body}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
