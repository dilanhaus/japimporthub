import Image from "next/image";
import { FileText, GitCompare, MessageCircle, Truck } from "lucide-react";
import { SectionHeading } from "@/components/importbase/section-heading";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";

const steps = [
  {
    icon: FileText,
    title: "Post your vehicle request",
    description: "Describe the car you want, your budget, and preferences. UK buyers only need a few minutes.",
    image: VEHICLE_IMAGES.auctionLane,
  },
  {
    icon: MessageCircle,
    title: "Verified dealers submit quotations",
    description: "Exporters and dealers in our network review your brief and send transparent, itemised offers.",
    image: VEHICLE_IMAGES.tokyoNight,
  },
  {
    icon: GitCompare,
    title: "Compare offers and communicate securely",
    description: "Review landed costs, timelines, and dealer ratings — all messaging stays on-platform.",
    image: VEHICLE_IMAGES.supraMk4,
  },
  {
    icon: Truck,
    title: "Choose your dealer and begin the import process",
    description: "Award your preferred quote and track milestones from Japan to UK registration.",
    image: VEHICLE_IMAGES.skylineR34,
  },
] as const;

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-24 border-t border-white/[0.06] px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Process"
          title="How ImportBase Works"
          description="A marketplace built for clarity — from your first post to your car on UK soil."
        />
        <ol className="mt-16 grid gap-6 sm:grid-cols-2">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-zinc-900/40 transition-all duration-300 hover:border-white/10"
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={step.image.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/60 to-transparent" />
                <div className="absolute bottom-3 left-4 flex size-10 items-center justify-center rounded-lg border border-white/10 bg-black/40 text-indigo-300 backdrop-blur-sm">
                  <step.icon className="size-5" strokeWidth={1.5} aria-hidden />
                </div>
              </div>
              <div className="p-6 pt-4">
                <p className="text-xs font-medium text-zinc-500">Step {index + 1}</p>
                <h3 className="mt-1 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{step.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
