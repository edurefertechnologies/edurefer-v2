"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import { createModule } from "@/actions/admin/courses/create-module";

interface Props {
  courseId: string;
  firstModule?: boolean;
}

export default function AddModuleDialog({
  courseId,
  firstModule = false,
}: Props) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    if (title.trim().length < 3) {
      toast.error(
        "Module title must be at least 3 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const result = await createModule(
        courseId,
        title
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setTitle("");
      setOpen(false);

      router.refresh();
    } catch (error) {
      console.error(
        "CREATE_MODULE_CLIENT_ERROR:",
        error
      );

      toast.error(
        "Something went wrong while creating the module."
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
        }
      }}
    >
      <DialogTrigger
        render={
          <Button type="button">
            <Plus className="mr-2 h-4 w-4" />

            {firstModule
              ? "Add First Module"
              : "Add Module"}
          </Button>
        }
      />

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Add Module
          </DialogTitle>

          <DialogDescription>
            Create a new module for this course.
            Lessons can be added after the module is created.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <label
            htmlFor="module-title"
            className="text-sm font-medium"
          >
            Module Title
          </label>

          <Input
            id="module-title"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="e.g. Introduction to AI"
            disabled={loading}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                handleCreate();
              }
            }}
          />
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
              ? "Adding..."
              : "Add Module"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}