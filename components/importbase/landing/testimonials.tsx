import Image from "next/image";
import { Quote } from "lucide-react";
import { SectionHeading } from "@/components/importbase/section-heading";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote:
      "I avoided three sketchy brokers before finding ImportBase. Seeing landed costs side-by-side made the decision obvious.",
    name: "James R.",
    role: "Skyline GT-R import · Manchester",
    image: VEHICLE_IMAGES.skylineR34,
  },
  {
    quote:
      "Every fee was itemised. No surprises at the port. The dealer I chose had a 4.9 rating and responded within hours.",
    name: "Sarah L.",
    role: "Toyota Supra import · Bristol",
    image: VEHICLE_IMAGES.supraMk4,
  },
  {
    quote:
      "Posted my brief on Sunday, had five quotes by Wednesday. Felt like hiring on Upwork — but for cars.",
    name: "David K.",
    role: "First-time JDM buyer · London",
    image: VEHICLE_IMAGES.mazdaRx7,
  },
  {
    quote:
      "Competitive pricing without the pressure. I compared timelines and chose the dealer that fit my budget honestly.",
    name: "Emma T.",
    role: "Honda NSX search · Edinburgh",
    image: VEHICLE_IMAGES.hondaNsx,
  },
] as const;

export function TestimonialsSection() {
  return (
    <section className="border-t border-white/[0.06] px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Testimonials"
          title="Buyers who chose clarity over chance"
          description="ImportBase is built for people who want a professional marketplace — not forum roulette."
          align="center"
          className="mx-auto"
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {testimonials.map((t) => (
            <Card key={t.name} className="overflow-hidden border-white/[0.06] bg-white/[0.02]">
              <div className="relative h-24">
                <Image
                  src={t.image.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-40"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950" />
              </div>
              <CardContent className="relative -mt-6 p-6 pt-0">
                <Quote className="size-8 text-indigo-400/50" aria-hidden />
                <blockquote className="mt-4 text-sm leading-relaxed text-zinc-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <footer className="mt-6 border-t border-white/[0.06] pt-4">
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-zinc-500">{t.role}</p>
                </footer>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
