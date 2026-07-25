"use client";

import {
  CheckCheck,
} from "lucide-react";

import {
  useRouter,
} from "next/navigation";

import {
  useTransition,
} from "react";

import { Button } from "@/components/ui/button";

import { markAllNotificationsRead } from "@/actions/notifications/mark-all-notifications-read";

export default function MarkAllReadButton() {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const handleClick = () => {
    startTransition(async () => {
      const result =
        await markAllNotificationsRead();

      if (result.success) {
        router.refresh();
      }
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleClick}
      disabled={isPending}
    >
      <CheckCheck className="mr-2 h-4 w-4" />

      {isPending
        ? "Updating..."
        : "Mark All as Read"}
    </Button>
  );
}