/**
 * Curated Unsplash imagery for JDM / Japanese import marketing.
 * Photo IDs verified via HTTP — replace with licensed assets before production.
 */
export type VehicleImage = {
  src: string;
  alt: string;
  label?: string;
};

const unsplash = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const VEHICLE_IMAGES = {
  /** Hero — Nissan Skyline GT-R R34 */
  heroPrimary: {
    src: unsplash("photo-1658162083129-5e008c4e5747", 2400),
    alt: "Nissan Skyline R34 GT-R on a wet road",
    label: "GT-R",
  },
  heroAccent: {
    src: unsplash("photo-1748878665811-a3dd0b16e3b8", 1200),
    alt: "Nissan Skyline R34 GT-R with Mount Fuji in the background",
    label: "Skyline",
  },
  skylineR34: {
    src: unsplash("photo-1748878665811-a3dd0b16e3b8", 1600),
    alt: "Nissan Skyline GT-R R34 at Oishi Park, Japan",
    label: "R34",
  },
  supraMk4: {
    src: unsplash("photo-1711031413924-f327a74a03b7", 1600),
    alt: "Modded Toyota Supra MK4",
    label: "Supra",
  },
  hondaNsx: {
    src: unsplash("photo-1740845871487-6c02a6c77f10", 1600),
    alt: "Red Honda NSX front view",
    label: "NSX",
  },
  mazdaRx7: {
    src: unsplash("photo-1503376780353-7e6692767b70", 1600),
    alt: "Mazda RX-7",
    label: "RX-7",
  },
  nissanZ: {
    src: unsplash("photo-1725182973598-81c83a4d9906", 1600),
    alt: "Toyota Supra MK4 tail lights detail",
    label: "JDM",
  },
  tokyoNight: {
    src: unsplash("photo-1544636331-e26879cd4d9b", 2000),
    alt: "Performance car at night in urban setting",
    label: "Tokyo",
  },
  auctionLane: {
    src: unsplash("photo-1727893294198-e85137574f5b", 1600),
    alt: "Warehouse filled with vehicles ready for inspection",
    label: "Sourcing",
  },
} as const satisfies Record<string, VehicleImage>;

/** Horizontal showcase strip (exclusive / iconic models) */
export const SHOWCASE_VEHICLES: VehicleImage[] = [
  VEHICLE_IMAGES.skylineR34,
  VEHICLE_IMAGES.supraMk4,
  VEHICLE_IMAGES.hondaNsx,
  VEHICLE_IMAGES.mazdaRx7,
  VEHICLE_IMAGES.heroPrimary,
  VEHICLE_IMAGES.nissanZ,
];

export const REQUEST_IMAGE_BY_ID: Record<string, VehicleImage> = {
  "req-1": VEHICLE_IMAGES.skylineR34,
  "req-2": VEHICLE_IMAGES.supraMk4,
  "req-3": VEHICLE_IMAGES.hondaNsx,
  "req-4": VEHICLE_IMAGES.mazdaRx7,
};

export function getRequestImage(requestId: string): VehicleImage {
  return REQUEST_IMAGE_BY_ID[requestId] ?? VEHICLE_IMAGES.heroPrimary;
}
