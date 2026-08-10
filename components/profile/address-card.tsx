"use client";

import { MapPin } from "lucide-react";
import { ProfileForm } from "./types";

interface AddressCardProps {
  form: ProfileForm;
  setForm: React.Dispatch<
    React.SetStateAction<ProfileForm>
  >;
}

export function AddressCard({
  form,
  setForm,
}: AddressCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">

      <div className="mb-8 flex items-center gap-3">

        <div className="rounded-xl bg-emerald-500/20 p-3">
          <MapPin className="h-5 w-5 text-emerald-300" />
        </div>

        <div>

          <h2 className="text-xl font-bold text-white">
            Address Information
          </h2>

          <p className="text-sm text-slate-400">
            Your current residential address
          </p>

        </div>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Address */}

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm text-slate-400">
            Address
          </label>

          <textarea
            rows={3}
            value={form.address}
            onChange={(e) =>
              setForm({
                ...form,
                address: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />

        </div>

        {/* City */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            City
          </label>

          <input
            value={form.city}
            onChange={(e) =>
              setForm({
                ...form,
                city: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />

        </div>

        {/* State */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            State
          </label>

          <input
            value={form.state}
            onChange={(e) =>
              setForm({
                ...form,
                state: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />

        </div>

        {/* Country */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Country
          </label>

          <input
            value={form.country}
            onChange={(e) =>
              setForm({
                ...form,
                country: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />

        </div>

        {/* Pincode */}

        <div>

          <label className="mb-2 block text-sm text-slate-400">
            Pincode
          </label>

          <input
            value={form.pincode}
            onChange={(e) =>
              setForm({
                ...form,
                pincode: e.target.value,
              })
            }
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-emerald-500"
          />

        </div>

      </div>

    </div>
  );
}