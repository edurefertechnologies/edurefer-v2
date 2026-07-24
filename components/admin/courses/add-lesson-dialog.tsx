"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { createLesson } from "@/actions/admin/courses/create-lesson";

interface Props {
  courseId: string;
  moduleId: string;
}

export default function AddLessonDialog({
  courseId,
  moduleId,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoDuration, setVideoDuration] = useState("");
  const [duration, setDuration] = useState("");
  const [attachmentUrl, setAttachmentUrl] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  function resetForm() {
    setTitle("");
    setDescription("");
    setVideoUrl("");
    setVideoDuration("");
    setDuration("");
    setAttachmentUrl("");
    setIsPreview(false);
  }

  async function handleCreate() {
    if (title.trim().length < 3) {
      toast.error(
        "Lesson title must be at least 3 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const result = await createLesson(
        courseId,
        moduleId,
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

      resetForm();
      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE_LESSON_CLIENT_ERROR:",
        error
      );

      toast.error(
        "Something went wrong while creating the lesson."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!loading) {
          setOpen(value);

          if (!value) {
            resetForm();
          }
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Lesson
          </Button>
        }
      />

      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            Add Lesson
          </DialogTitle>

          <DialogDescription>
            Add learning content to this module.
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
              placeholder="e.g. What is Artificial Intelligence?"
              disabled={loading}
              autoFocus
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
              placeholder="Short description of this lesson..."
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

            <p className="text-xs text-muted-foreground">
              Add the lesson video URL if this is a video lesson.
            </p>
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

              <p className="text-xs text-muted-foreground">
                Video length in seconds.
              </p>
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

              <p className="text-xs text-muted-foreground">
                Estimated completion time.
              </p>
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

            <p className="text-xs text-muted-foreground">
              Optional PDF, notes or other lesson resource.
            </p>
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
                Allow users to view this lesson without
                enrolling in the course.
              </p>
            </div>
          </label>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleCreate}
            disabled={
              loading || title.trim().length < 3
            }
          >
            {loading
              ? "Adding Lesson..."
              : "Add Lesson"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}