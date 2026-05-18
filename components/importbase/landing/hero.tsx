import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { VehicleImageFrame } from "@/components/importbase/vehicle-image";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Mobile / tablet: full-bleed car behind content */}
      <div className="absolute inset-0 lg:hidden">
        <VehicleImageFrame
          image={VEHICLE_IMAGES.heroPrimary}
          priority
          overlay="full"
          sizes="100vw"
          className="h-full min-h-[92vh]"
          imageClassName="object-cover object-[center_35%] scale-105"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/75 to-zinc-950"
        />
      </div>

      {/* Desktop: atmospheric glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_70%_40%,rgba(99,102,241,0.2),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_20%_80%,rgba(56,189,248,0.08),transparent)]" />
      </div>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pt-28 pb-16 sm:px-6 sm:pt-32 lg:min-h-[88vh] lg:grid-cols-2 lg:gap-12 lg:pb-20">
        {/* Copy */}
        <div className="relative z-10 flex flex-col justify-center">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-xs font-medium text-zinc-300 backdrop-blur-md">
            <span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            Skyline · Supra · NSX — verified Japanese dealers
          </p>

          <h1 className="mt-8 max-w-xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06]">
            Import Cars From Japan{" "}
            <span className="bg-gradient-to-r from-white via-zinc-100 to-indigo-200/90 bg-clip-text text-transparent">
              With Confidence
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-300 sm:text-xl">
            Post the car you want and receive competitive quotes from verified Japanese exporters and dealers — all
            in one trusted platform.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/request"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-12 px-7 text-base shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/40",
              )}
            >
              Post Your Request
              <ArrowRight className="ml-2 size-4" />
            </Link>
            <a
              href="#how-it-works"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 border-white/20 bg-white/[0.05] px-7 text-base text-zinc-100 backdrop-blur-md hover:bg-white/10",
              )}
            >
              How It Works
              <ChevronDown className="ml-2 size-4 opacity-70" />
            </a>
          </div>

          {/* Floating spec chips — desktop only */}
          <div className="mt-12 hidden flex-wrap gap-2 lg:flex">
            {["R34 Skyline", "MK4 Supra", "NSX", "RX-7"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Hero vehicle — desktop focal image */}
        <div className="relative z-10 hidden lg:block">
          <div className="relative aspect-[4/3] w-full max-w-xl justify-self-end">
            <div
              aria-hidden
              className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-indigo-500/25 via-transparent to-cyan-500/15 blur-2xl"
            />
            <div className="relative h-full min-h-[480px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/50 ring-1 ring-white/[0.08]">
              <VehicleImageFrame
                image={VEHICLE_IMAGES.heroPrimary}
                priority
                overlay="bottom"
                showLabel
                sizes="(max-width: 1280px) 50vw, 600px"
                className="absolute inset-0"
                imageClassName="object-cover object-[center_40%] scale-[1.02] transition-transform duration-700 hover:scale-105"
              />
            </div>

            {/* Secondary Skyline inset card */}
            <div className="absolute -bottom-6 -left-8 w-44 overflow-hidden rounded-xl border border-white/15 bg-zinc-950/90 p-1 shadow-xl shadow-black/40 backdrop-blur-md">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <Image
                  src={VEHICLE_IMAGES.skylineR34.src}
                  alt={VEHICLE_IMAGES.skylineR34.alt}
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
              <p className="px-2 py-2 text-[10px] font-medium uppercase tracking-wider text-zinc-400">
                Exclusive imports
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade into page */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-950 to-transparent"
      />
    </section>
  );
}
