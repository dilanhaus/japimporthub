"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

async function demoLogin(body: { role: "customer" | "admin"; email?: string; fullName?: string }) {
  const res = await fetch("/api/demo-auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return res.ok;
}

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";
  const authError = searchParams.get("error");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(authError ? "Could not complete sign-in." : null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const ok = await demoLogin({
      role: "customer",
      email: email.trim() || undefined,
      fullName: email.trim() ? email.split("@")[0] : undefined,
    });
    setSubmitting(false);
    if (!ok) {
      setError("Could not start demo session. Try again.");
      return;
    }
    window.location.assign(next);
  }

  async function signInAsAdmin() {
    setSubmitting(true);
    setError(null);
    const ok = await demoLogin({ role: "admin" });
    setSubmitting(false);
    if (!ok) {
      setError("Could not start admin demo session.");
      return;
    }
    window.location.assign("/admin");
  }

  return (
    <Card className="w-full max-w-md border-border/80 shadow-lg shadow-black/5">
      <CardHeader>
        <CardTitle className="text-2xl tracking-tight">Sign in</CardTitle>
        <CardDescription>Access your import dashboard and active requests.</CardDescription>
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-medium text-foreground">Frontend-only mode:</span> use any email and password.
          Sign-in is stored in a short-lived demo cookie—no Supabase or backend required.
        </p>
      </CardHeader>
      <form onSubmit={onSubmit}>
        <CardContent className="space-y-4">
          {error ? (
            <p className="rounded-lg border border-destructive/40 bg-destructive/5 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={submitting}
            onClick={() => void signInAsAdmin()}
          >
            Try admin dashboard (demo)
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            New to Grade Five?{" "}
            <Link href="/signup" className="font-medium text-foreground underline-offset-4 hover:underline">
              Create an account
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
