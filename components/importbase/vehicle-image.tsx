import Image from "next/image";
import { cn } from "@/lib/utils";
import type { VehicleImage } from "@/lib/marketplace/vehicle-images";

type VehicleImageProps = {
  image: VehicleImage;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  overlay?: "none" | "bottom" | "full" | "left-scrim";
  showLabel?: boolean;
};

export function VehicleImageFrame({
  image,
  className,
  imageClassName,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  overlay = "bottom",
  showLabel = false,
}: VehicleImageProps) {
  const overlayClass = {
    none: "",
    bottom: "bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent",
    full: "bg-zinc-950/50",
    "left-scrim":
      "bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/20 lg:via-zinc-950/60 lg:to-transparent",
  }[overlay];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover object-center", imageClassName)}
      />
      {overlay !== "none" ? (
        <div aria-hidden className={cn("absolute inset-0", overlayClass)} />
      ) : null}
      {showLabel && image.label ? (
        <span className="absolute bottom-3 left-3 rounded-md border border-white/10 bg-black/50 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-sm">
          {image.label}
        </span>
      ) : null}
    </div>
  );
}
