import { VehicleRequestForm } from "@/components/requests/vehicle-request-form";

export default function NewVehicleRequestPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">New vehicle request</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The more detail you share, the sharper our auction search can be. You can message us anytime after
          submitting.
        </p>
      </div>
      <VehicleRequestForm />
    </div>
  );
}
