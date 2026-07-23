import { Badge } from "@/components/ui/badge";

type ProductType =
  | "PDF"
  | "COURSE"
  | "AI_CREDITS";

interface Props {
  type: ProductType;
}

export default function ProductTypeBadge({
  type,
}: Props) {
  switch (type) {
    case "COURSE":
      return <Badge>Course</Badge>;

    case "PDF":
      return (
        <Badge variant="secondary">
          PDF
        </Badge>
      );

    case "AI_CREDITS":
      return (
        <Badge variant="outline">
          AI Credits
        </Badge>
      );
  }
}