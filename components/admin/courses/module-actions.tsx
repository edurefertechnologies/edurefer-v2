"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

import { updateModule } from "@/actions/admin/courses/update-module";
import { deleteModule } from "@/actions/admin/courses/delete-module";
import { reorderModule } from "@/actions/admin/courses/reorder-module";

interface Props {
  courseId: string;
  moduleId: string;
  moduleTitle: string;
  lessonCount: number;

  isFirst: boolean;
  isLast: boolean;
}

export default function ModuleActions({
  courseId,
  moduleId,
  moduleTitle,
  lessonCount,
  isFirst,
  isLast,
}: Props) {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [title, setTitle] = useState(moduleTitle);
  const [loading, setLoading] = useState(false);

  async function handleUpdate() {
    if (title.trim().length < 3) {
      toast.error(
        "Module title must be at least 3 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const result = await updateModule(
        courseId,
        moduleId,
        title
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setEditOpen(false);
      router.refresh();
    } catch (error) {
      console.error(
        "UPDATE_MODULE_CLIENT_ERROR:",
        error
      );

      toast.error("Failed to update module.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMove(
    direction: "UP" | "DOWN"
  ) {
    try {
      setLoading(true);

      const result = await reorderModule(
        courseId,
        moduleId,
        direction
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.error(
        "REORDER_MODULE_CLIENT_ERROR:",
        error
      );

      toast.error("Failed to reorder module.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);

      const result = await deleteModule(
        courseId,
        moduleId
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setDeleteOpen(false);
      router.refresh();
    } catch (error) {
      console.error(
        "DELETE_MODULE_CLIENT_ERROR:",
        error
      );

      toast.error("Failed to delete module.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Actions */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className="inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <MoreHorizontal className="h-4 w-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem
            disabled={isFirst || loading}
            onClick={() => handleMove("UP")}
          >
            <ArrowUp className="mr-2 h-4 w-4" />
            Move Up
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={isLast || loading}
            onClick={() => handleMove("DOWN")}
          >
            <ArrowDown className="mr-2 h-4 w-4" />
            Move Down
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => {
              setTitle(moduleTitle);
              setEditOpen(true);
            }}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Module
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Module
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog
        open={editOpen}
        onOpenChange={(value) => {
          if (!loading) {
            setEditOpen(value);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Edit Module
            </DialogTitle>

            <DialogDescription>
              Update the title of this module.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 py-2">
            <label className="text-sm font-medium">
              Module Title
            </label>

            <Input
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              disabled={loading}
              autoFocus
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              type="button"
              onClick={handleUpdate}
              disabled={
                loading || title.trim().length < 3
              }
            >
              {loading
                ? "Updating..."
                : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
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
              Delete Module?
            </DialogTitle>

            <DialogDescription>
              You are about to delete
              {" "}
              <strong>{moduleTitle}</strong>.
              {lessonCount > 0
                ? ` This will also permanently delete ${lessonCount} ${lessonCount === 1
                  ? "lesson"
                  : "lessons"
                } inside this module.`
                : " This module currently has no lessons."}
            </DialogDescription>
          </DialogHeader>

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
                : "Delete Module"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}