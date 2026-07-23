import { Badge } from "@/components/ui/badge";

type Status =
  | "DRAFT"
  | "PUBLISHED"
  | "ARCHIVED";

interface Props {
  status: Status;
}

export default function ProductStatusBadge({
  status,
}: Props) {
  const variant =
    status === "PUBLISHED"
      ? "default"
      : status === "DRAFT"
      ? "secondary"
      : "destructive";

  return (
    <Badge variant={variant}>
      {status}
    </Badge>
  );
}