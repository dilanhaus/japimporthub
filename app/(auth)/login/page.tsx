import { Suspense } from "react";
import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="h-[420px] w-full max-w-md animate-pulse rounded-xl bg-muted/60" />}>
      <LoginForm />
    </Suspense>
  );
}
