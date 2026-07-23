"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function CreateUserDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          New User
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create User</DialogTitle>
        </DialogHeader>

        <div className="py-6">
          Form will be added here.
        </div>

      </DialogContent>
    </Dialog>
  );
}