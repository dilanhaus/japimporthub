import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";

/**
 * Marketing routes use a scoped `.dark` theme so the landing stays premium + dark
 * without forcing dark mode on the signed-in app shell.
 */
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark min-h-screen bg-zinc-950 text-zinc-100 antialiased selection:bg-indigo-500/30 selection:text-white">
      <div className="relative min-h-screen bg-zinc-950">
        <div
          aria-hidden
          className="pointer-events-none fixed inset-0 bg-[linear-gradient(180deg,oklch(0.12_0.02_280)_0%,oklch(0.145_0_0)_45%,oklch(0.12_0.02_250)_100%)]"
        />
        <div className="relative flex min-h-screen flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </div>
      </div>
    </div>
  );
}
