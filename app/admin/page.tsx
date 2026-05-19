import Link from "next/link";
import { Inbox, ShieldCheck, Users, Flag } from "lucide-react";
import { getRequestCount } from "@/lib/mock/store";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default async function AdminHomePage() {
  const requestCount = getRequestCount();

  return (
    <div className="mx-auto max-w-5xl space-y-10">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">Grade Five Admin</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Verification workflows, moderation, and marketplace operations — MVP placeholders until backend is
          connected.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buyer requests</CardTitle>
            <Inbox className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">{requestCount}</p>
            <Link href="/admin/requests" className={cn(buttonVariants({ variant: "outline", size: "sm" }), "mt-4 inline-flex")}>
              Moderate queue
            </Link>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dealer verification</CardTitle>
            <ShieldCheck className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">12</p>
            <CardDescription className="mt-2">Pending exporter applications</CardDescription>
            <Badge className="mt-3" variant="secondary">
              Workflow placeholder
            </Badge>
          </CardContent>
        </Card>

        <Card className="border-border/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged content</CardTitle>
            <Flag className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-semibold tracking-tight">3</p>
            <CardDescription className="mt-2">Messages & quotes under review</CardDescription>
            <Badge className="mt-3" variant="outline">
              Moderation placeholder
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="border-dashed border-border/80 bg-muted/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="size-5" />
            Platform health
          </CardTitle>
          <CardDescription>
            Connect Supabase to enable live verification queues, dispute resolution, and audit logs.
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  );
}
