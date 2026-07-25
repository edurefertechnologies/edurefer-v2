"use client";

import {
  Bookmark,
  BookmarkCheck,
} from "lucide-react";

import {
  useState,
  useTransition,
} from "react";

import { Button } from "@/components/ui/button";
import { toggleCourseWishlist } from "@/actions/courses/toggle-course-wishlist";

interface Props {
  courseId: string;
  initialSaved: boolean;
}

export default function SaveCourseButton({
  courseId,
  initialSaved,
}: Props) {
  const [saved, setSaved] =
    useState(initialSaved);

  const [isPending, startTransition] =
    useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      const result =
        await toggleCourseWishlist(courseId);

      if (!result.success) {
        alert(result.message);
        return;
      }

      setSaved(result.saved);
    });
  };

  return (
    <Button
      type="button"
      variant="outline"
      size="lg"
      disabled={isPending}
      onClick={handleToggle}
    >
      {saved ? (
        <BookmarkCheck className="mr-2 h-5 w-5" />
      ) : (
        <Bookmark className="mr-2 h-5 w-5" />
      )}

      {isPending
        ? "Updating..."
        : saved
          ? "Saved"
          : "Save Course"}
    </Button>
  );
}