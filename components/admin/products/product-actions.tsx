"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";

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

import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/actions/admin/products/delete-product";

import {
  Archive,
  CircleCheck,
  FilePenLine,
} from "lucide-react";

import { updateProductStatus } from "@/actions/admin/products/update-product-status";

interface Props {
  productId: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
}

export default function ProductActions({
  productId,
  status,
}: Props) {
  const router = useRouter();

  const [deleteOpen, setDeleteOpen] =
    useState(false);

  const [deleting, setDeleting] =
    useState(false);

  async function handleDelete() {
    try {
      setDeleting(true);

      const result = await deleteProduct(productId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setDeleteOpen(false);

      router.refresh();
    } catch (error) {
      console.error(
        "DELETE_PRODUCT_CLIENT_ERROR:",
        error
      );

      toast.error(
        "Something went wrong while deleting the product."
      );
    } finally {
      setDeleting(false);
    }
  }

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  async function handleStatusChange(
    newStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED"
  ) {
    try {
      setUpdatingStatus(true);

      const result = await updateProductStatus(
        productId,
        newStatus
      );

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
      router.refresh();
    } catch (error) {
      console.error(
        "PRODUCT_STATUS_CLIENT_ERROR:",
        error
      );

      toast.error("Failed to update product status.");
    } finally {
      setUpdatingStatus(false);
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
          <DropdownMenuItem
            render={
              <Link
                href={`/admin/products/${productId}/edit`}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Link>
            }
          />

          {status !== "PUBLISHED" && (
            <DropdownMenuItem
              disabled={updatingStatus}
              onClick={() =>
                handleStatusChange("PUBLISHED")
              }
            >
              <CircleCheck className="mr-2 h-4 w-4" />
              Publish
            </DropdownMenuItem>
          )}

          {status !== "DRAFT" && (
            <DropdownMenuItem
              disabled={updatingStatus}
              onClick={() =>
                handleStatusChange("DRAFT")
              }
            >
              <FilePenLine className="mr-2 h-4 w-4" />
              Move to Draft
            </DropdownMenuItem>
          )}

          {status !== "ARCHIVED" && (
            <DropdownMenuItem
              disabled={updatingStatus}
              onClick={() =>
                handleStatusChange("ARCHIVED")
              }
            >
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setDeleteOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Delete Product?
            </DialogTitle>

            <DialogDescription>
              This product will be removed from the
              platform. This action can be recovered
              from the database because products are
              soft deleted.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 className="mr-2 h-4 w-4" />

              {deleting
                ? "Deleting..."
                : "Delete Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}