import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { FaqSection } from "@/components/importbase/landing/faq-section";
import { VEHICLE_IMAGES } from "@/lib/marketplace/vehicle-images";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function FinalCtaSection() {
  return (
    <>
      <FaqSection />

      <section className="px-4 pb-24 pt-4 sm:px-6">
        <div className="card-dark relative mx-auto max-w-6xl overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src={VEHICLE_IMAGES.tokyoNight.src}
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-center"
              aria-hidden
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg)]/95 via-[var(--bg)]/85 to-[var(--bg)]/70" />
            <div className="absolute inset-0 bg-[var(--red)]/10 mix-blend-overlay" />
          </div>

          <div
            aria-hidden
            className="absolute -right-24 -top-24 size-80 rounded-full bg-[var(--red)]/25 blur-3xl"
          />

          <div className="relative px-6 py-16 sm:px-12 sm:py-20 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-xl">
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                Ready to find your next import?
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                Post your request and receive offers from trusted Japanese exporters today.
              </p>
            </div>
            <Link
              href="/request"
              className={cn(
                buttonVariants({ variant: "primary", size: "lg" }),
                "mt-8 inline-flex h-12 shrink-0 items-center justify-center px-8 text-base lg:mt-0",
              )}
            >
              Start your request
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
