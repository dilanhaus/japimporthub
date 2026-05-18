import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

/**
 * Marketing routes use a scoped `.gradefive-theme` so the landing stays premium + dark
 * without forcing the theme on the signed-in app shell.
 */
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
