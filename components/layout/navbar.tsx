"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";

import Logo from "@/components/common/logo";
import MobileMenu from "@/components/layout/mobile-menu";
import ThemeToggle from "@/components/theme/theme-toggle";

import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Logo */}
          <Logo />

        {/* Desktop Navigation */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-8 lg:flex"
        >
          {navigation.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-300",
                  active
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          <Link href="/login">
            <Button variant="ghost">
              Login
            </Button>
          </Link>

          <Link href="/register">
            <Button>
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile */}
        <MobileMenu />
      </div>
    </header>
  );
}