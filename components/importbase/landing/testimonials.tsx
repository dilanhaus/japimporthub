import Image from "next/image";
import { FileCheck, Quote } from "lucide-react";
import { SectionHeading } from "@/components/importbase/section-heading";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "Every landed cost was clear before I paid a deposit. The R34 arrived on schedule with translated auction sheets — no surprises at the port.",
    name: "James R.",
    role: "Skyline GT-R import · Manchester",
    image: VEHICLE_IMAGES.skylineR34,
  },
  {
    quote:
      "Fees were itemised line by line. My dealer hit the ETA and kept milestones updated through UK customs.",
    name: "Sarah L.",
    role: "Toyota Supra import · Bristol",
    image: VEHICLE_IMAGES.supraMk4,
  },
  {
    quote:
      "Posted Sunday, five verified quotes by Wednesday. I chose on total landed cost and delivery timeline — not hype.",
    name: "David K.",
    role: "First-time JDM buyer · London",
    image: VEHICLE_IMAGES.mazdaRx7,
  },
  {
    quote:
      "Documentation was redacted but complete. On-time handover and honest pricing throughout.",
    name: "Emma T.",
    role: "Honda NSX search · Edinburgh",
    image: VEHICLE_IMAGES.hondaNsx,
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className="border-t border-neutral-800 px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Proof & trust"
          title="Clarity and on-time delivery"
          description="Buyers who compared quotes on-platform — with documentation they could verify."
          align="center"
          className="mx-auto"
        />

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {["Auction sheet", "Export certificate", "Inspection report"].map((label) => (
            <div
              key={label}
              className="card-dark relative flex h-16 w-28 flex-col justify-end overflow-hidden p-2"
            >
              <FileCheck className="absolute right-2 top-2 size-3 text-[var(--text-secondary)]" aria-hidden />
              <p className="text-[9px] font-medium text-[var(--text-secondary)]">{label}</p>
              <span className="absolute left-1 top-1 rounded border border-[var(--red)]/40 bg-[var(--red)]/10 px-1 text-[7px] text-[var(--red)]">
                Translated
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.name} className="card-dark overflow-hidden border-neutral-800">
              <div className="relative h-24">
                <Image
                  src={t.image.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-35"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg)]" />
              </div>
              <CardContent className="relative -mt-6 p-6 pt-0">
                <Quote className="size-8 text-[var(--red)]/40" aria-hidden />
                <blockquote className="mt-4 text-sm leading-relaxed text-[var(--text-primary)]">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t border-neutral-800 pt-4">
                  <p className="text-sm font-medium text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{t.role}</p>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
