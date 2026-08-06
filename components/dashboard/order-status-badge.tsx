import {
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

type OrderStatusBadgeProps = {
  status: string;
  paymentStatus?: string | null;
};

export function OrderStatusBadge({
  status,
  paymentStatus,
}: OrderStatusBadgeProps) {
  if (
    status === "PAID" &&
    paymentStatus === "SUCCESS"
  ) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Paid
      </span>
    );
  }

  if (paymentStatus === "FAILED") {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-destructive/10 px-2.5 py-1 text-xs font-medium text-destructive">
        <XCircle className="h-3.5 w-3.5" />
        Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
      <Clock3 className="h-3.5 w-3.5" />
      Pending
    </span>
  );
}