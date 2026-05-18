import Link from "next/link";
import { redirect } from "next/navigation";
import { LayoutDashboard, PlusCircle, Shield } from "lucide-react";
import { getSessionUser } from "@/lib/auth/session";
import { UserNav } from "@/components/dashboard/user-nav";
import { Separator } from "@/components/ui/separator";

const nav = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/requests/new", label: "New request", icon: PlusCircle },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getSessionUser();
  if (!session) {
    redirect("/login");
  }

  const isAdmin = session.profile?.role === "admin";

  return (
    <div className="flex min-h-screen bg-muted/30">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border/80 bg-background/95 py-6 pl-6 pr-4 lg:flex">
        <Link href="/" className="text-sm font-semibold tracking-tight text-foreground">
          Jap Import UK
        </Link>
        <p className="mt-1 text-xs text-muted-foreground">Customer workspace</p>
        <Separator className="my-6" />
        <nav className="flex flex-col gap-1">
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
          {isAdmin ? (
            <Link
              href="/admin"
              className="mt-4 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <Shield className="size-4" />
              Admin
            </Link>
          ) : null}
        </nav>
        <div className="mt-auto pt-8">
          <UserNav email={session.email} name={session.profile?.full_name ?? null} />
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col">
        <header className="flex items-center justify-between border-b border-border/80 bg-background/90 px-4 py-3 backdrop-blur lg:hidden">
          <Link href="/dashboard" className="text-sm font-semibold">
            Dashboard
          </Link>
          <UserNav email={session.email} name={session.profile?.full_name ?? null} />
        </header>
        <main className="flex-1 p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
