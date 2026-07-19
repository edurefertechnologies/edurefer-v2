"use client";

import { Bell, Search } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";

type AppHeaderProps = {
  name: string;
};

export function AppHeader({ name }: AppHeaderProps) {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger />

        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="w-72 pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-md p-2 hover:bg-accent">
          <Bell className="size-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold">
            {name.charAt(0).toUpperCase()}
          </div>

          <div className="hidden md:block">
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">
              Student
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}