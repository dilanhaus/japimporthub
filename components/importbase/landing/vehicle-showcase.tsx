import Image from "next/image";
import { SHOWCASE_VEHICLES } from "@/lib/marketplace/vehicle-images";

export function VehicleShowcaseSection() {
  return (
    <section className="border-y border-white/[0.06] bg-zinc-950/50 py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
          Iconic Japanese imports on ImportBase
        </p>
        <div className="flex gap-3 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {SHOWCASE_VEHICLES.map((vehicle) => (
            <div
              key={vehicle.src}
              className="group relative h-28 w-44 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] sm:h-32 sm:w-52"
            >
              <Image
                src={vehicle.src}
                alt={vehicle.alt}
                fill
                sizes="208px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-transparent to-transparent" />
              {vehicle.label ? (
                <span className="absolute bottom-2 left-2 text-xs font-semibold text-white">
                  {vehicle.label}
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
