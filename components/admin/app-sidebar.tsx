"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Package,
  ShoppingCart,
  Wallet,
  Gift,
  Landmark,
  BarChart3,
  Settings,
  BoxIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Packages",
    href: "/admin/packages",
    icon: BoxIcon,
  },
  {
    title: "Courses",
    href: "/admin/courses",
    icon: BookOpen,
  },
  {
    title: "Enrollments",
    href: "/admin/enrollments",
    icon: GraduationCap,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Wallets",
    href: "/admin/wallets",
    icon: Wallet,
  },
  {
    title: "Referrals",
    href: "/admin/referrals",
    icon: Gift,
  },
  {
    title: "Withdrawals",
    href: "/admin/withdrawals",
    icon: Landmark,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r bg-background h-screen sticky top-0">
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold">
          Edurefer
        </h1>

        <p className="text-sm text-muted-foreground">
          Admin Panel
        </p>
      </div>

      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;

          const active =
            item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href ||
              pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                active
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}