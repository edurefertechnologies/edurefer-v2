"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit, Archive } from "lucide-react";
import { toast } from "sonner";

import { deletePackage } from "@/actions/admin/packages/delete-package";

interface PackageActionsProps {
  packageId: string;
}

export default function PackageActions({
  packageId,
}: PackageActionsProps) {
  const [loading, setLoading] =
    useState(false);

  async function handleArchive() {
    const confirmed = window.confirm(
      "Are you sure you want to archive this package?"
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      const result =
        await deletePackage(packageId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      window.location.reload();
    } catch (error) {
      console.error(
        "ARCHIVE_PACKAGE_ERROR:",
        error
      );

      toast.error(
        "Failed to archive package."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-end gap-2">

      <Link
        href={`/admin/packages/${packageId}`}
        className="inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition hover:bg-muted"
      >
        <Edit className="h-4 w-4" />
        Edit
      </Link>

      <button
        type="button"
        disabled={loading}
        onClick={handleArchive}
        className="inline-flex items-center gap-2 rounded-md border border-destructive/30 px-3 py-2 text-sm text-destructive transition hover:bg-destructive/10 disabled:opacity-50"
      >
        <Archive className="h-4 w-4" />

        {loading
          ? "Archiving..."
          : "Archive"}
      </button>

    </div>
  );
}