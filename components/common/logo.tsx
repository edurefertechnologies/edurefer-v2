"use client";

import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label="Edurefer Home"
      className={cn(
        "flex items-center gap-3 transition-opacity hover:opacity-90",
        className
      )}
    >
      <Image
        src="/logo.png"
        alt="Edurefer"
        width={44}
        height={44}
        priority
        className="rounded-xl"
      />

      <div className="flex flex-col leading-none">
        <span className="text-lg font-bold tracking-tight">
          Edurefer Technologies
        </span>

        <span className="text-xs text-muted-foreground">
          Learn • Build • Get Hired
        </span>
      </div>
    </Link>
  );
}