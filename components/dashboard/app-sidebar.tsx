"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { LogoutButton } from "@/components/auth/logout-button";
import { navItems } from "./nav-items";

type AppSidebarProps = {
  user: {
    firstName?: string | null;
    email: string;
  };
};

export function AppSidebar({ user }: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div>
          <h2 className="text-xl font-bold">Edurefer</h2>
          <p className="text-sm text-muted-foreground">
            {user.firstName ?? user.email}
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                render={
                  <Link href={item.href}>
                    <item.icon className="size-4" />
                    <span>{item.title}</span>
                  </Link>
                }
                isActive={pathname === item.href}
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}