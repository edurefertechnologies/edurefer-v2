"use client";

import {
  Globe,
} from "lucide-react";

import { FaLinkedin, FaGithub } from "react-icons/fa";

import { ProfileForm } from "./types";

interface SocialCardProps {
  form: ProfileForm;
  setForm: React.Dispatch<
    React.SetStateAction<ProfileForm>
  >;
}

export function SocialCard({
  form,
  setForm,
}: SocialCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-cyan-500/20 p-3">
          <Globe className="h-5 w-5 text-cyan-300" />
        </div>

        <div>

          <h2 className="text-xl font-bold text-white">
            Social Links
          </h2>

          <p className="text-sm text-slate-400">
            Connect your professional profiles
          </p>

        </div>

      </div>

      <div className="space-y-6">

        {/* LinkedIn */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">

            <FaLinkedin className="h-4 w-4" />

            LinkedIn

          </label>

          <input
            value={form.linkedin}
            onChange={(e) =>
              setForm({
                ...form,
                linkedin: e.target.value,
              })
            }
            placeholder="https://linkedin.com/in/username"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* GitHub */}

        <div>

          <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">

            <FaGithub className="h-4 w-4" />

            GitHub

          </label>

          <input
            value={form.github}
            onChange={(e) =>
              setForm({
                ...form,
                github: e.target.value,
              })
            }
            placeholder="https://github.com/username"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Portfolio */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Portfolio
          </label>

          <input
            value={form.portfolio}
            onChange={(e) =>
              setForm({
                ...form,
                portfolio: e.target.value,
              })
            }
            placeholder="https://portfolio.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

        {/* Website */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Personal Website
          </label>

          <input
            value={form.website}
            onChange={(e) =>
              setForm({
                ...form,
                website: e.target.value,
              })
            }
            placeholder="https://yourwebsite.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-cyan-500"
          />

        </div>

      </div>

    </div>
  );
}