import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PublicRequestForm } from "@/components/marketplace/public-request-form";

export default function RequestPage() {
  return (
    <div className="px-4 py-16 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-8 inline-flex items-center text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="mr-1 size-4" />
          Back to GradeFive
        </Link>
        <PublicRequestForm />
      </div>
    </div>
  );
}
