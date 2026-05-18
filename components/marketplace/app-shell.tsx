import Link from "next/link";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type AppShellProps = {
  title: string;
  subtitle?: string;
  nav: NavItem[];
  children: React.ReactNode;
  badge?: string;
};

export function AppShell({ title, subtitle, nav, children, badge }: AppShellProps) {
  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/80 bg-background py-6 pl-6 pr-4 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
            IB
          </span>
          <span className="text-sm font-semibold">ImportBase</span>
        </Link>
        {badge ? <p className="mt-1 text-xs text-muted-foreground">{badge}</p> : null}
        <nav className="mt-8 flex flex-col gap-1">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <item.icon className="size-4" />
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/" className="mt-auto text-xs text-muted-foreground hover:text-foreground">
          ← Back to marketing site
        </Link>
      </aside>
      <div className="flex flex-1 flex-col">
        <header className="border-b border-border/80 bg-background/90 px-4 py-4 backdrop-blur lg:px-8">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {subtitle ? <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p> : null}
        </header>
        <main className={cn("flex-1 p-4 lg:p-8")}>{children}</main>
      </div>
    </div>
  );
}
