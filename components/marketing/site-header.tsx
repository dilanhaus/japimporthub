import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-[var(--bg)]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[var(--bg)]/60">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-[var(--red)] ring-1 ring-[var(--red)]/50">
            <span className="text-[10px] font-bold tracking-tighter text-white">G5</span>
          </span>
          <span className="text-sm font-semibold tracking-tight text-[var(--text-primary)]">GradeFive</span>
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="#how-it-works"
            className="hidden text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--red)] sm:inline-block sm:px-3 sm:py-2"
          >
            How it works
          </Link>
          <Link
            href="/dealer"
            className="hidden text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--red)] md:inline-block md:px-3 md:py-2"
          >
            For dealers
          </Link>
          <Link
            href="/login"
            className={cn(
              buttonVariants({ variant: "ghostDark", size: "sm" }),
              "text-[var(--text-secondary)]",
            )}
          >
            Sign in
          </Link>
          <Link href="/request" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            Start your request
          </Link>
        </nav>
      </div>
    </header>
  );
}
