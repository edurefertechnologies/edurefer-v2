"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function HomeNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#071626]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/20 bg-white/5 p-2">
            <Image
              src="/logo.png"
              alt="Edurefer"
              fill
              className="object-contain p-1"
            />
          </div>

          <div className="hidden sm:block">
            <h1 className="text-lg font-black tracking-wide text-white">
              EDUREFER
            </h1>

            <p className="text-[10px] font-medium text-emerald-400">
              Learn • Build • Get Certified
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-white transition hover:text-cyan-300"
          >
            Home
          </Link>

          <Link
            href="/courses"
            className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
          >
            Courses
          </Link>

          <Link
            href="/#about"
            className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
          >
            About Us
          </Link>

          <Link
            href="/#faq"
            className="text-sm font-medium text-slate-300 transition hover:text-cyan-300"
          >
            FAQ
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:scale-[1.02] hover:shadow-cyan-500/30"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-white/10 bg-white/5 p-2 text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-white/10 bg-[#071626]/95 px-6 py-5 backdrop-blur-xl md:hidden">
          <nav className="flex flex-col gap-2">

            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-white hover:bg-white/5"
            >
              Home
            </Link>

            <Link
              href="/courses"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              Courses
            </Link>

            <Link
              href="/#about"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              About Us
            </Link>

            <Link
              href="/#faq"
              onClick={() => setOpen(false)}
              className="rounded-xl px-4 py-3 text-sm font-medium text-slate-300 hover:bg-white/5"
            >
              FAQ
            </Link>

            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Login
              </Link>

              <Link
                href="/register"
                onClick={() => setOpen(false)}
                className="rounded-xl bg-gradient-to-r from-cyan-500 to-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Sign Up
              </Link>
            </div>

          </nav>
        </div>
      )}
    </header>
  );
}