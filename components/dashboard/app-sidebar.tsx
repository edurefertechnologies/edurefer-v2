"use client";

import Image from "next/image";
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

import {
  Sparkles,
  Crown,
} from "lucide-react";

type AppSidebarProps = {
  user: {
    firstName?: string | null;
    email: string;
  };
};

export function AppSidebar({
  user,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar
      className="
      w-[260px]
      border-r
      border-white/10
      bg-gradient-to-b
      from-[#071626]
      via-[#081B33]
      to-[#04111D]
      backdrop-blur-2xl
      "
    >

      {/* ---------------- HEADER ---------------- */}

      <SidebarHeader className="border-b border-white/10 px-5 py-5">

        <div className="flex items-center gap-3">

          {/* Logo */}

          <div className="relative">

            <div className="absolute inset-0 rounded-3xl bg-cyan-500/20 blur-2xl" />

            <div
              className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-400/20
              bg-white/5
              shadow-lg
              "
            >
              <Image
                src="/logo.png"
                alt="Edurefer"
                width={34}
                height={24}
                className="object-contain"
              />
            </div>

          </div>

          {/* Brand */}

          <div className="flex flex-col">

            <h2 className="text-xl font-black tracking-wide text-white">
              EDUREFER
            </h2>

            <p className="mt-1 text-xs font-medium text-emerald-400">
              Learn • Build • Get Certified
            </p>

          </div>

        </div>

      </SidebarHeader>

      <SidebarContent className="px-4 py-5">

        {/* ---------------- OVERVIEW ---------------- */}

        <div className="mb-8">

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-300/70">
            Overview
          </p>

          <SidebarMenu>

            {navItems.slice(0, 5).map((item) => {

              const active =
                pathname === item.href;

              return (

                <SidebarMenuItem
                  key={item.href}
                  className="mb-1"
                >

                  <SidebarMenuButton
                    isActive={active}
                    render={
                      <Link
                        href={item.href}
                        className={`
                  group
                  relative
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  px-4
                  py-2.5
                  transition-all
                  duration-300

                  ${active
                            ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-emerald-500/20 border border-cyan-400/20 shadow-[0_0_25px_rgba(34,211,238,.15)]"
                            : "hover:bg-white/5"
                          }
                  `}
                      >

                        {/* Active Bar */}

                        {active && (

                          <span
                            className="
                      absolute
                      left-0
                      top-2
                      bottom-2
                      w-1
                      rounded-r-full
                      bg-gradient-to-b
                      from-cyan-400
                      to-emerald-400
                      "
                          />

                        )}

                        <item.icon
                          className={`
                    h-5
                    w-5
                    transition

                    ${active
                              ? "text-cyan-300"
                              : "text-slate-400 group-hover:text-white"
                            }
                    `}
                        />

                        <span
                          className={`
                    font-medium
                    transition

                    ${active
                              ? "text-white"
                              : "text-slate-300 group-hover:text-white"
                            }
                    `}
                        >
                          {item.title}
                        </span>

                      </Link>
                    }
                  />

                </SidebarMenuItem>

              );

            })}

          </SidebarMenu>

        </div>

        {/* ---------------- WORKSPACE ---------------- */}

        <div>

          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.25em] text-emerald-300/70">
            Workspace
          </p>

          <SidebarMenu>

            {navItems.slice(5).map((item) => {

              const active =
                pathname === item.href;

              return (

                <SidebarMenuItem
                  key={item.href}
                  className="mb-1"
                >

                  <SidebarMenuButton
                    isActive={active}
                    render={
                      <Link
                        href={item.href}
                        className={`
                  group
                  relative
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3
                  transition-all
                  duration-300

                  ${active
                            ? "bg-gradient-to-r from-cyan-500/20 via-blue-500/15 to-emerald-500/20 border border-cyan-400/20 shadow-lg shadow-cyan-500/20"
                            : "hover:bg-white/5"
                          }
                  `}
                      >

                        {active && (

                          <span
                            className="
                      absolute
                      left-0
                      top-2
                      bottom-2
                      w-1
                      rounded-r-full
                      bg-gradient-to-b
                      from-cyan-400
                      to-emerald-400
                      "
                          />

                        )}

                        <item.icon
                          className={`
                    h-5
                    w-5

                    ${active
                              ? "text-cyan-300"
                              : "text-slate-400 group-hover:text-white"
                            }
                    `}
                        />

                        <span
                          className={`
                    font-medium

                    ${active
                              ? "text-white"
                              : "text-slate-300 group-hover:text-white"
                            }
                    `}
                        >
                          {item.title}
                        </span>

                      </Link>
                    }
                  />

                </SidebarMenuItem>

              );

            })}

          </SidebarMenu>

        </div>

      </SidebarContent>
      <SidebarFooter className="border-t border-white/10 p-4">

        <div className="mb-4">

          <h3 className="font-semibold text-white">
            {user.firstName ?? "Student"}
          </h3>

          <p className="text-xs text-slate-400">
            Student
          </p>

        </div>

        <LogoutButton />

      </SidebarFooter>
    </Sidebar >
  );
}