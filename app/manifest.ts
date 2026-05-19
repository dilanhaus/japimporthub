import type { MetadataRoute } from "next";
import { BRAND_DISPLAY, BRAND_ID } from "@/lib/brand";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BRAND_DISPLAY,
    short_name: BRAND_ID,
    description: `${BRAND_DISPLAY} — Trusted Japanese vehicle import marketplace`,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0d10",
    theme_color: "#e11d2e",
  };
}
