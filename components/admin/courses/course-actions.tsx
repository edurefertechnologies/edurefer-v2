"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { deleteCourse } from "@/actions/admin/courses/delete-course";

interface Props {
  courseId: string;
  courseTitle: string;
}

export default function CourseActions({
  courseId,
  courseTitle,
}: Props) {
  const router = useRouter();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    try {
      setLoading(true);

      const result = await deleteCourse(courseId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setDeleteOpen(false);

      router.refresh();
    } catch (error) {
      console.error(
        "DELETE_COURSE_CLIENT_ERROR:",
        error
      );

      toast.error(
        "Something went wrong while deleting the course."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          {/* Curriculum */}
          <DropdownMenuItem
            render={
              <Link
                href={`/admin/courses/${courseId}/curriculum`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Manage Curriculum
              </Link>
            }
          />

          {/* Edit */}
          <DropdownMenuItem
            render={
              <Link
                href={`/admin/courses/${courseId}/edit`}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Course
              </Link>
            }
          />

          {/* Delete */}
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Course
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation */}
      <Dialog
        open={deleteOpen}
        onOpenChange={(value) => {
          if (!loading) {
            setDeleteOpen(value);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Delete Course?
            </DialogTitle>

            <DialogDescription>
              You are about to permanently delete{" "}
              <strong>{courseTitle}</strong>.
              Its modules and lessons will also be deleted.
              The linked product will remain available.
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-4 text-sm">
            If students are already enrolled in this course,
            deletion will be blocked. Archive the course
            instead.
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              <Trash2 className="mr-2 h-4 w-4" />

              {loading
                ? "Deleting..."
                : "Delete Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}