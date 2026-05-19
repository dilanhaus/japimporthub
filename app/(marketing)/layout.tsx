import type { Metadata } from "next";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { BRAND_DISPLAY } from "@/lib/brand";

/**
 * Marketing routes use a scoped `.gradefive-theme` so the landing stays premium + dark
 * without forcing the theme on the signed-in app shell.
 */
export const metadata: Metadata = {
  title: {
    default: BRAND_DISPLAY,
    template: `%s — ${BRAND_DISPLAY}`,
  },
  openGraph: {
    siteName: BRAND_DISPLAY,
    title: BRAND_DISPLAY,
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="gradefive-theme dark min-h-screen bg-[var(--bg)] text-[var(--text-primary)] antialiased selection:bg-[var(--red)]/30 selection:text-white">
      <div className="relative flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </div>
  );
}
