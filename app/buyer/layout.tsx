import { AppShell } from "@/components/marketplace/app-shell";
import { FileText, GitCompare, LayoutDashboard, MessageSquare, Users } from "lucide-react";

const nav = [
  { href: "/buyer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/request", label: "Post request", icon: FileText },
  { href: "/buyer/requests/req-1", label: "Compare quotes", icon: GitCompare },
  { href: "/buyer/messages", label: "Messages", icon: MessageSquare },
  { href: "/buyer/dealers/dealer-tokyo", label: "Dealer profile", icon: Users },
];

export default function BuyerLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell title="Buyer workspace" subtitle="Manage requests, quotes, and dealer conversations." badge="Buyer · MVP" nav={nav}>
      {children}
    </AppShell>
  );
}
