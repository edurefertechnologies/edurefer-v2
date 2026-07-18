"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  className?: string;
}

export default function MobileMenu({
  className,
}: MobileMenuProps) {
  const pathname = usePathname();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className={cn("lg:hidden", className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle navigation"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              id="mobile-navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
              }}
              className="fixed right-0 top-0 z-50 flex h-screen w-80 max-w-[85vw] flex-col border-l border-border bg-background p-6 shadow-2xl"
            >
              <div className="mb-8 flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  Menu
                </h2>

                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav
                aria-label="Mobile Navigation"
                className="flex flex-col gap-2"
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
                        "rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                        active
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {item.title}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-auto space-y-3">
                <Link href="/login" className="block">
                  <Button
                    variant="outline"
                    className="w-full"
                  >
                    Login
                  </Button>
                </Link>

                <Link href="/register" className="block">
                  <Button className="w-full">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}