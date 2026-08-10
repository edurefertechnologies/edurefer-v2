"use client";

import { UserRound } from "lucide-react";

export default function ProfileHeader() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">
          <UserRound className="h-7 w-7 text-cyan-300" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your personal information, education, experience and social profiles.
          </p>
        </div>
      </div>
    </div>
  );
}