import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <section className="px-4 pb-24 pt-4 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/[0.1]">
        <div className="absolute inset-0">
          <Image
            src={VEHICLE_IMAGES.tokyoNight.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-center"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/95 via-zinc-950/85 to-zinc-950/70" />
          <div className="absolute inset-0 bg-indigo-600/20 mix-blend-overlay" />
        </div>

        <div
          aria-hidden
          className="absolute -right-24 -top-24 size-80 rounded-full bg-indigo-500/40 blur-3xl"
        />

        <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to find your next import?
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-200 sm:text-lg">
              Post your request and receive offers from trusted Japanese exporters today.
            </p>
          </div>
          <Link
            href="/request"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 inline-flex h-12 shrink-0 items-center justify-center px-8 text-base shadow-xl shadow-indigo-500/40 lg:mt-0",
            )}
          >
            Post A Vehicle Request
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
