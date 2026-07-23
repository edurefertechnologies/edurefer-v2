import { Badge } from "@/components/ui/badge";

type Status = "ACTIVE" | "INACTIVE" | "SUSPENDED";

interface Props {
  status: Status;
}

export default function StatusBadge({ status }: Props) {
  const variant =
    status === "ACTIVE"
      ? "default"
      : status === "INACTIVE"
      ? "secondary"
      : "destructive";

  return (
    <Badge variant={variant}>
      {status}
    </Badge>
  );
}