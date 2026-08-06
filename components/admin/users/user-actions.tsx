"use client";

import {
  MoreHorizontal,
  Pencil,
  Shield,
  Trash2,
  UserCheck,
  RotateCcw,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface UserActionsProps {
  userId: string;
  role: string;
  status: string;
}

export default function UserActions({
  userId,
  role,
  status,
}: UserActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        }
      />

      <DropdownMenuContent align="end">

        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" />
          Edit User
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Shield className="mr-2 h-4 w-4" />
          Change Role
        </DropdownMenuItem>

        <DropdownMenuItem>
          <UserCheck className="mr-2 h-4 w-4" />
          {status === "ACTIVE"
            ? "Suspend User"
            : "Activate User"}
        </DropdownMenuItem>

        <DropdownMenuItem>
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Password
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}