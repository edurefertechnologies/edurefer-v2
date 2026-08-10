"use client";

import { Briefcase } from "lucide-react";
import { ProfileForm } from "./types";

interface ExperienceCardProps {
  form: ProfileForm;
  setForm: React.Dispatch<
    React.SetStateAction<ProfileForm>
  >;
}

export function ExperienceCard({
  form,
  setForm,
}: ExperienceCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-orange-500/20 p-3">
          <Briefcase className="h-5 w-5 text-orange-300" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Professional Information
          </h2>

          <p className="text-sm text-slate-400">
            Work experience and current role
          </p>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Current Company */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Current Company
          </label>

          <input
            value={form.currentCompany}
            onChange={(e) =>
              setForm({
                ...form,
                currentCompany: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500"
          />

        </div>

        {/* Designation */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Designation
          </label>

          <input
            value={form.designation}
            onChange={(e) =>
              setForm({
                ...form,
                designation: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500"
          />

        </div>

        {/* Experience */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Experience (Years)
          </label>

          <input
            type="number"
            value={form.experience}
            onChange={(e) =>
              setForm({
                ...form,
                experience: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-orange-500"
          />

        </div>

      </div>

    </div>
  );
}