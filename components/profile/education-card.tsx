"use client";

import { GraduationCap } from "lucide-react";
import { ProfileForm } from "./types";

interface EducationCardProps {
  form: ProfileForm;
  setForm: React.Dispatch<
    React.SetStateAction<ProfileForm>
  >;
}

export function EducationCard({
  form,
  setForm,
}: EducationCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-violet-500/20 p-3">
          <GraduationCap className="h-5 w-5 text-violet-300" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            Education
          </h2>

          <p className="text-sm text-slate-400">
            Academic qualifications and details
          </p>
        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* College */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            College
          </label>

          <input
            value={form.college}
            onChange={(e) =>
              setForm({
                ...form,
                college: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />

        </div>

        {/* University */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            University
          </label>

          <input
            value={form.university}
            onChange={(e) =>
              setForm({
                ...form,
                university: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />

        </div>

        {/* Degree */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Degree
          </label>

          <input
            value={form.degree}
            onChange={(e) =>
              setForm({
                ...form,
                degree: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />

        </div>

        {/* Branch */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Branch
          </label>

          <input
            value={form.branch}
            onChange={(e) =>
              setForm({
                ...form,
                branch: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />

        </div>

        {/* Passing Year */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Passing Year
          </label>

          <input
            type="number"
            value={form.passingYear}
            onChange={(e) =>
              setForm({
                ...form,
                passingYear: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-violet-500"
          />

        </div>

      </div>

    </div>
  );
}