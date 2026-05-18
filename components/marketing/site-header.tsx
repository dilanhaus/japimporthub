import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-zinc-950/75 backdrop-blur-xl supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500/40 to-cyan-500/25 ring-1 ring-white/10">
            <span className="text-[10px] font-bold tracking-tighter text-white">IB</span>
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">ImportBase</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="#how-it-works"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-white sm:inline-block sm:px-3 sm:py-2"
          >
            How it works
          </Link>
          <Link
            href="/dealer"
            className="hidden text-sm text-zinc-400 transition-colors hover:text-white md:inline-block md:px-3 md:py-2"
          >
            For dealers
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              "text-zinc-300 hover:bg-white/[0.06] hover:text-white",
            )}
          >
            Sign in
          </Link>
          <Link
            href="/request"
            className={cn(buttonVariants({ size: "sm" }), "shadow-md shadow-indigo-500/20")}
          >
            Post Your Request
          </Link>
        </nav>
      </div>
    </header>
  );
}
