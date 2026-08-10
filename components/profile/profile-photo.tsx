"use client";

import { useRef, useState } from "react";
import { Camera, Loader2 } from "lucide-react";

import { useRouter } from "next/navigation";

interface ProfilePhotoProps {
  image: string | null;
  firstName: string;
  onUploaded: (image: string) => void;
}

export function ProfilePhoto({
  image,
  firstName,
  onUploaded,
}: ProfilePhotoProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] =
    useState(false);

  const [error, setError] =
    useState("");

  const router = useRouter();

  async function handleFileChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    try {
      setUploading(true);

      // Get secure Cloudinary signature

      const signResponse = await fetch(
        "/api/cloudinary/profile-sign",
        {
          method: "POST",
        }
      );

      const signData =
        await signResponse.json();

      if (
        !signResponse.ok ||
        !signData.success
      ) {
        throw new Error(
          signData.error ||
          "Failed to prepare upload."
        );
      }

      // Prepare Cloudinary upload

      const formData = new FormData();

      formData.append("file", file);
      formData.append(
        "api_key",
        signData.apiKey
      );
      formData.append(
        "timestamp",
        String(signData.timestamp)
      );
      formData.append(
        "signature",
        signData.signature
      );
      formData.append(
        "folder",
        signData.folder
      );

      // Upload directly to Cloudinary

      const cloudinaryResponse =
        await fetch(
          `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

      const cloudinaryData =
        await cloudinaryResponse.json();

      if (
        !cloudinaryResponse.ok ||
        !cloudinaryData.secure_url
      ) {
        throw new Error(
          "Cloudinary upload failed."
        );
      }

      const imageUrl =
        cloudinaryData.secure_url;

      // Save Cloudinary URL in Prisma

      const updateResponse =
        await fetch(
          "/api/profile/photo",
          {
            method: "PATCH",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              image: imageUrl,
            }),
          }
        );

      const updateData =
        await updateResponse.json();

      if (
        !updateResponse.ok ||
        !updateData.success
      ) {
        throw new Error(
          updateData.error ||
          "Failed to save profile photo."
        );
      }

      onUploaded(imageUrl);
      router.refresh();
    } catch (error) {
      console.error(
        "PROFILE_PHOTO_UPLOAD_ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setUploading(false);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <div className="space-y-3">

      <div className="relative mx-auto h-36 w-36">

        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full border-4 border-cyan-400/30 bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

          {image ? (
            <img
              src={image}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-5xl font-bold text-white">
              {firstName
                ?.charAt(0)
                ?.toUpperCase() || "U"}
            </span>
          )}

        </div>

        <button
          type="button"
          disabled={uploading}
          onClick={() =>
            inputRef.current?.click()
          }
          className="absolute bottom-1 right-1 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-emerald-500 shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
          aria-label="Change profile photo"
        >

          {uploading ? (
            <Loader2 className="h-5 w-5 animate-spin text-white" />
          ) : (
            <Camera className="h-5 w-5 text-white" />
          )}

        </button>

        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          onChange={handleFileChange}
          className="hidden"
        />

      </div>

      {error && (
        <p className="text-center text-xs text-red-400">
          {error}
        </p>
      )}

    </div>
  );
}