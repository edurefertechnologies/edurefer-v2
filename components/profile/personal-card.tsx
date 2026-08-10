"use client";

import {
  Mail,
  Phone,
  User,
  Pencil,
  X,
} from "lucide-react";

import { useState } from "react";

import { ProfilePhoto } from "./profile-photo";
import { ProfileForm } from "./types";

interface PersonalCardProps {
  profile: any;
  form: ProfileForm;
  setForm: React.Dispatch<React.SetStateAction<ProfileForm>>;
}

export function PersonalCard({
  profile,
  form,
  setForm,
}: PersonalCardProps) {
  const [profileImage, setProfileImage] =
    useState<string | null>(
      profile?.image ?? null
    );

  const [isEditing, setIsEditing] =
    useState(false);

  const [originalForm, setOriginalForm] =
    useState<ProfileForm>(form);

  function handleEdit() {
    setOriginalForm(form);
    setIsEditing(true);
  }

  function handleCancel() {
    setForm(originalForm);
    setIsEditing(false);
  }

  return (
    <div>
      {/* Header */}

      <div className="mb-8 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-cyan-500/20 p-3">
            <User className="h-5 w-5 text-cyan-300" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Personal Information
            </h2>

            <p className="text-sm text-slate-400">
              Manage your basic profile information
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            type="button"
            onClick={handleEdit}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
          >
            <Pencil className="h-4 w-4" />
            Edit Profile
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 transition hover:bg-red-500/20"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        )}
      </div>

      {/* Avatar */}

      <div className="mb-10 flex flex-col items-center">
        <ProfilePhoto
          image={profileImage}
          firstName={profile?.firstName ?? ""}
          onUploaded={(image) => {
            setProfileImage(image);
          }}
        />
      </div>

      {/* Fields */}

      <div className="grid gap-6 md:grid-cols-2">

        {/* First Name */}

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            First Name
          </label>

          <input
            value={form.firstName}
            disabled={!isEditing}
            onChange={(e) =>
              setForm({
                ...form,
                firstName: e.target.value,
              })
            }
            className={`w-full rounded-xl border border-white/10 px-4 py-3 text-white outline-none transition ${isEditing
                ? "bg-white/5 focus:border-cyan-500"
                : "cursor-not-allowed bg-white/[0.03] text-slate-400"
              }`}
          />
        </div>

        {/* Last Name */}

        <div>
          <label className="mb-2 block text-sm text-slate-400">
            Last Name
          </label>

          <input
            value={form.lastName}
            disabled={!isEditing}
            onChange={(e) =>
              setForm({
                ...form,
                lastName: e.target.value,
              })
            }
            className={`w-full rounded-xl border border-white/10 px-4 py-3 text-white outline-none transition ${isEditing
                ? "bg-white/5 focus:border-cyan-500"
                : "cursor-not-allowed bg-white/[0.03] text-slate-400"
              }`}
          />
        </div>

        {/* Email */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <Mail className="h-4 w-4" />
            Email
          </label>

          <input
            value={profile.email}
            disabled
            className="w-full cursor-not-allowed rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-slate-400"
          />
        </div>

        {/* Phone */}

        <div>
          <label className="mb-2 flex items-center gap-2 text-sm text-slate-400">
            <Phone className="h-4 w-4" />
            Phone
          </label>

          <input
            value={form.phone}
            disabled={!isEditing}
            onChange={(e) =>
              setForm({
                ...form,
                phone: e.target.value,
              })
            }
            className={`w-full rounded-xl border border-white/10 px-4 py-3 text-white outline-none transition ${isEditing
                ? "bg-white/5 focus:border-cyan-500"
                : "cursor-not-allowed bg-white/[0.03] text-slate-400"
              }`}
          />
        </div>

        {/* Headline */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-400">
            Headline
          </label>

          <input
            value={form.headline}
            disabled={!isEditing}
            onChange={(e) =>
              setForm({
                ...form,
                headline: e.target.value,
              })
            }
            placeholder="Software Engineer | AI Enthusiast"
            className={`w-full rounded-xl border border-white/10 px-4 py-3 text-white outline-none transition ${isEditing
                ? "bg-white/5 focus:border-cyan-500"
                : "cursor-not-allowed bg-white/[0.03] text-slate-400"
              }`}
          />
        </div>

        {/* Bio */}

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-slate-400">
            Bio
          </label>

          <textarea
            rows={5}
            value={form.bio}
            disabled={!isEditing}
            onChange={(e) =>
              setForm({
                ...form,
                bio: e.target.value,
              })
            }
            placeholder="Tell us something about yourself..."
            className={`w-full rounded-xl border border-white/10 px-4 py-3 text-white outline-none transition ${isEditing
                ? "bg-white/5 focus:border-cyan-500"
                : "cursor-not-allowed bg-white/[0.03] text-slate-400"
              }`}
          />
        </div>
      </div>
    </div>
  );
}