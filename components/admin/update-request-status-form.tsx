"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { updateVehicleRequestStatus } from "@/actions/admin-requests";
import type { RequestStatus } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const OPTIONS: { value: RequestStatus; label: string }[] = [
  { value: "submitted", label: "Submitted" },
  { value: "under_review", label: "Under review" },
  { value: "options_ready", label: "Options ready" },
  { value: "deposit_pending", label: "Deposit pending" },
  { value: "sourcing", label: "Sourcing" },
  { value: "in_transit", label: "In transit" },
  { value: "customs", label: "Customs" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
];

type UpdateRequestStatusFormProps = {
  requestId: string;
  currentStatus: RequestStatus;
};

export function UpdateRequestStatusForm({ requestId, currentStatus }: UpdateRequestStatusFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState<RequestStatus>(currentStatus);
  const [pending, setPending] = useState(false);

  async function onSave() {
    setPending(true);
    const res = await updateVehicleRequestStatus(requestId, status);
    setPending(false);
    if (!res.ok) {
      toast.error(res.error);
      return;
    }
    toast.success("Status updated");
    router.refresh();
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
      <div className="flex-1 space-y-2">
        <Label htmlFor="status">Pipeline status</Label>
        <Select value={status} onValueChange={(v) => setStatus(v as RequestStatus)}>
          <SelectTrigger id="status">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="button" onClick={onSave} disabled={pending || status === currentStatus}>
        {pending ? "Saving…" : "Save status"}
      </Button>
    </div>
  );
}
