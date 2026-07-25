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

import { updateLesson } from "@/actions/admin/courses/update-lesson";
import { deleteLesson } from "@/actions/admin/courses/delete-lesson";
import { reorderLesson } from "@/actions/admin/courses/reorder-lesson";

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  videoDuration: number | null;
  attachmentUrl: string | null;
  duration: number | null;
  isPreview: boolean;
};

interface Props {
  courseId: string;
  moduleId: string;
  lesson: Lesson;

  isFirst: boolean;
  isLast: boolean;
}

export default function LessonActions({
  courseId,
  moduleId,
  lesson,
  isFirst,
  isLast,
}: Props) {
  const router = useRouter();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(lesson.title);
  const [description, setDescription] = useState(
    lesson.description ?? ""
  );
  const [videoUrl, setVideoUrl] = useState(
    lesson.videoUrl ?? ""
  );
  const [videoDuration, setVideoDuration] = useState(
    lesson.videoDuration?.toString() ?? ""
  );
  const [duration, setDuration] = useState(
    lesson.duration?.toString() ?? ""
  );
  const [attachmentUrl, setAttachmentUrl] = useState(
    lesson.attachmentUrl ?? ""
  );
  const [isPreview, setIsPreview] = useState(
    lesson.isPreview
  );

  function resetEditForm() {
    setTitle(lesson.title);
    setDescription(lesson.description ?? "");
    setVideoUrl(lesson.videoUrl ?? "");
    setVideoDuration(
      lesson.videoDuration?.toString() ?? ""
    );
    setDuration(
      lesson.duration?.toString() ?? ""
    );
    setAttachmentUrl(
      lesson.attachmentUrl ?? ""
    );
    setIsPreview(lesson.isPreview);
  }

  async function handleUpdate() {
    if (title.trim().length < 3) {
      toast.error(
        "Lesson title must be at least 3 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const result = await updateLesson(
        courseId,
        moduleId,
        lesson.id,
        {
          title,
          description,
          videoUrl,

          videoDuration:
            videoDuration === ""
              ? null
              : Number(videoDuration),

          duration:
            duration === ""
              ? null
              : Number(duration),

          attachmentUrl,
          isPreview,
        }
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
        "UPDATE_LESSON_CLIENT_ERROR:",
        error
      );

      toast.error("Failed to update lesson.");
    } finally {
      setLoading(false);
    }
  }

  async function handleMove(
    direction: "UP" | "DOWN"
  ) {
    try {
      setLoading(true);

      const result = await reorderLesson(
        courseId,
        moduleId,
        lesson.id,
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
        "REORDER_LESSON_CLIENT_ERROR:",
        error
      );

      toast.error("Failed to reorder lesson.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setLoading(true);

      const result = await deleteLesson(
        courseId,
        moduleId,
        lesson.id
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
        "DELETE_LESSON_CLIENT_ERROR:",
        error
      );

      toast.error("Failed to delete lesson.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Dropdown */}
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
              resetEditForm();
              setEditOpen(true);
            }}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit Lesson
          </DropdownMenuItem>

          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete Lesson
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit Dialog */}
      <Dialog
        open={editOpen}
        onOpenChange={(value) => {
          if (!loading) {
            setEditOpen(value);

            if (!value) {
              resetEditForm();
            }
          }
        }}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>
              Edit Lesson
            </DialogTitle>

            <DialogDescription>
              Update the lesson content and settings.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Lesson Title
              </label>

              <Input
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) =>
                  setDescription(e.target.value)
                }
                rows={3}
                disabled={loading}
                className="flex w-full resize-y rounded-md border border-input bg-transparent px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>

            {/* Video URL */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Video URL
              </label>

              <Input
                type="url"
                value={videoUrl}
                onChange={(e) =>
                  setVideoUrl(e.target.value)
                }
                placeholder="https://..."
                disabled={loading}
              />
            </div>

            {/* Durations */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Video Duration
                </label>

                <Input
                  type="number"
                  min="1"
                  value={videoDuration}
                  onChange={(e) =>
                    setVideoDuration(e.target.value)
                  }
                  placeholder="Seconds"
                  disabled={loading}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Lesson Duration
                </label>

                <Input
                  type="number"
                  min="1"
                  value={duration}
                  onChange={(e) =>
                    setDuration(e.target.value)
                  }
                  placeholder="Minutes"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Attachment */}
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Attachment URL
              </label>

              <Input
                type="url"
                value={attachmentUrl}
                onChange={(e) =>
                  setAttachmentUrl(e.target.value)
                }
                placeholder="https://..."
                disabled={loading}
              />
            </div>

            {/* Preview */}
            <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-4">
              <input
                type="checkbox"
                checked={isPreview}
                onChange={(e) =>
                  setIsPreview(e.target.checked)
                }
                disabled={loading}
                className="mt-1 h-4 w-4"
              />

              <div>
                <p className="text-sm font-medium">
                  Free Preview
                </p>

                <p className="text-xs text-muted-foreground">
                  Allow users to view this lesson
                  without enrolling.
                </p>
              </div>
            </label>
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
                loading ||
                title.trim().length < 3
              }
            >
              {loading
                ? "Saving..."
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
              Delete Lesson?
            </DialogTitle>

            <DialogDescription>
              You are about to permanently delete{" "}
              <strong>{lesson.title}</strong>.
              This action cannot be undone.
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
                : "Delete Lesson"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}