import { Car } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type FeaturedCar = {
  name: string;
  detail: string;
  tag: string;
  /** Subtle gradient for placeholder “hero plate” when no photo */
  gradient: string;
};

const featured: FeaturedCar[] = [
  {
    name: "Nissan Skyline GT-R",
    detail: "R34 V-Spec — auction-grade icon",
    tag: "JDM legend",
    gradient: "from-slate-600/80 via-indigo-900/60 to-zinc-900",
  },
  {
    name: "Toyota GR Supra",
    detail: "MK4 — timeless twin-turbo platform",
    tag: "Collector favourite",
    gradient: "from-amber-900/50 via-zinc-800 to-zinc-950",
  },
  {
    name: "Mazda RX-7",
    detail: "FD3S — rotary pedigree",
    tag: "Enthusiast pick",
    gradient: "from-red-900/40 via-violet-950/80 to-zinc-950",
  },
  {
    name: "Honda NSX",
    detail: "NA1 — handcrafted supercar daily",
    tag: "Rare & rising",
    gradient: "from-emerald-900/40 via-zinc-800 to-neutral-950",
  },
];

export function LandingFeaturedCars() {
  return (
    <section className="border-t border-white/[0.06] px-4 py-24 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400/90">Featured imports</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The kind of metal we hunt for you
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Every brief is different—these are examples of vehicles UK buyers often trust us to source, inspect,
              and land properly.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((car) => (
            <Card
              key={car.name}
              className="group overflow-hidden border-white/[0.06] bg-white/[0.02] shadow-none transition-transform duration-300 hover:-translate-y-0.5 hover:border-white/10"
            >
              <div className={`relative aspect-[4/3] bg-gradient-to-br ${car.gradient}`}>
                <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.145_0_0/0.85),transparent)]" />
                <Badge
                  variant="secondary"
                  className="absolute left-3 top-3 border-0 bg-black/40 text-[10px] font-medium uppercase tracking-wider text-zinc-200 backdrop-blur-md"
                >
                  {car.tag}
                </Badge>
                <div className="absolute bottom-4 right-4 opacity-[0.15] transition-opacity group-hover:opacity-25">
                  <Car className="size-16 text-white" strokeWidth={1} aria-hidden />
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-white">{car.name}</h3>
                <p className="mt-1 text-sm text-zinc-500">{car.detail}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
