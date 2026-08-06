"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import CreateUserDialog from "./create-user-dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UsersToolbar() {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      <div className="flex flex-1 flex-col gap-3 md:flex-row">

        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search by name, email or phone..."
            className="pl-9"
          />
        </div>

        {/* Role */}
        <Select>
          <SelectTrigger className="w-full md:w-44">
            <SelectValue placeholder="All Roles" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All Roles
            </SelectItem>

            <SelectItem value="ADMIN">
              Admin
            </SelectItem>

            <SelectItem value="STUDENT">
              Student
            </SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select>
          <SelectTrigger className="w-full md:w-44">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">
              All Status
            </SelectItem>

            <SelectItem value="ACTIVE">
              Active
            </SelectItem>

            <SelectItem value="INACTIVE">
              Inactive
            </SelectItem>

            <SelectItem value="SUSPENDED">
              Suspended
            </SelectItem>
          </SelectContent>
        </Select>

      </div>

      <CreateUserDialog />

    </div>
  );
}