import { Badge } from "@/components/ui/badge";

interface Props {
  role: "ADMIN" | "STUDENT";
}

export default function RoleBadge({ role }: Props) {
  return (
    <Badge
      variant={role === "ADMIN" ? "default" : "secondary"}
    >
      {role}
    </Badge>
  );
}