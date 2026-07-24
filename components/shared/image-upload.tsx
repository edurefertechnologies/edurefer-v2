"use client";

import { useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ImageUploadProps {
  value?: string | null;
  onChange: (url: string) => void;
  onRemove?: () => void;
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  async function handleUpload(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validate image type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file.");
      return;
    }

    // Max 5 MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5 MB.");
      return;
    }

    try {
      setUploading(true);

      // 1. Get signed upload details from our server
      const signResponse = await fetch(
        "/api/cloudinary/sign",
        {
          method: "POST",
        }
      );

      if (!signResponse.ok) {
        throw new Error(
          "Failed to generate upload signature."
        );
      }

      const {
        signature,
        timestamp,
        folder,
        cloudName,
        apiKey,
      } = await signResponse.json();

      // 2. Prepare Cloudinary upload
      const formData = new FormData();

      formData.append("file", file);
      formData.append("api_key", apiKey);
      formData.append(
        "timestamp",
        timestamp.toString()
      );
      formData.append("signature", signature);
      formData.append("folder", folder);

      // 3. Upload directly to Cloudinary
      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await uploadResponse.json();

      if (!uploadResponse.ok) {
        console.error(
          "CLOUDINARY_UPLOAD_ERROR:",
          result
        );

        throw new Error(
          result?.error?.message ||
            "Image upload failed."
        );
      }

      // 4. Send URL back to product form
      onChange(result.secure_url);

      toast.success("Image uploaded successfully.");
    } catch (error) {
      console.error("IMAGE_UPLOAD_ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to upload image."
      );
    } finally {
      setUploading(false);

      // Allows selecting same file again
      event.target.value = "";
    }
  }

  function handleRemove() {
    onChange("");
    onRemove?.();
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative h-48 w-full overflow-hidden rounded-lg border bg-muted">
          <Image
            src={value}
            alt="Product thumbnail"
            fill
            className="object-cover"
          />

          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2"
            onClick={handleRemove}
            disabled={uploading}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <label className="flex h-40 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed bg-muted/30 transition-colors hover:bg-muted/50">
          {uploading ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-sm text-muted-foreground">
                Uploading...
              </span>
            </>
          ) : (
            <>
              <ImagePlus className="h-7 w-7 text-muted-foreground" />

              <span className="text-sm font-medium">
                Upload thumbnail
              </span>

              <span className="text-xs text-muted-foreground">
                PNG, JPG or WebP — max 5 MB
              </span>
            </>
          )}

          <Input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}