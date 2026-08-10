"use client";

import {
  CheckCircle2,
  FileText,
  Wallet,
  Brain,
  Award,
} from "lucide-react";

import { useState } from "react";

import { ProfilePhoto } from "./profile-photo";

interface ProfileCompletionProps {
  profile: any;
}

function calculateProfileCompletion(profile: any) {
  const fields = [
    profile?.firstName,
    profile?.lastName,
    profile?.phone,
    profile?.profile?.headline,
    profile?.profile?.bio,
    profile?.profile?.address,
    profile?.profile?.city,
    profile?.profile?.state,
    profile?.profile?.country,
    profile?.profile?.pincode,
    profile?.profile?.college,
    profile?.profile?.university,
    profile?.profile?.degree,
    profile?.profile?.branch,
    profile?.profile?.passingYear,
    profile?.profile?.currentCompany,
    profile?.profile?.designation,
    profile?.profile?.experience,
    profile?.profile?.linkedin,
    profile?.profile?.github,
    profile?.profile?.portfolio,
    profile?.profile?.website,
  ];

  const completed = fields.filter(
    (value) =>
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ""
  ).length;

  return Math.round(
    (completed / fields.length) * 100
  );
}

export function ProfileCompletion({
  profile,
}: ProfileCompletionProps) {
  const [profileImage, setProfileImage] =
    useState<string | null>(
      profile?.image ?? null
    );

  const completion =
    calculateProfileCompletion(profile);

  return (
    <div className="space-y-6">

      {/* Profile Card */}

      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">

        <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-[100px]" />

        <div className="relative z-10">

          <ProfilePhoto
            image={profileImage}
            firstName={profile?.firstName ?? ""}
            onUploaded={(image) => {
              setProfileImage(image);
            }}
          />

          <div className="mt-6 text-center">

            <h2 className="text-2xl font-bold text-white">
              {profile?.firstName} {profile?.lastName}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {profile?.email}
            </p>

          </div>

        </div>

      </div>

      {/* Completion */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

        <div className="flex items-center justify-between">

          <h3 className="font-bold text-white">
            Profile Completion
          </h3>

          <span className="text-xl font-black text-cyan-300">
            {completion}%
          </span>

        </div>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">

          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
            style={{
              width: `${completion}%`,
            }}
          />

        </div>

        <p className="mt-4 text-sm text-slate-400">
          Complete your profile to unlock better
          course recommendations and career guidance.
        </p>

      </div>

      {/* Quick Stats */}

      <div className="grid grid-cols-2 gap-4">

        <Card
          icon={<Award className="h-5 w-5" />}
          title="Certificates"
          value={String(profile?.enrollments?.filter(
            (enrollment: any) => enrollment.certificate
          ).length ?? 0)}
        />

        <Card
          icon={<Wallet className="h-5 w-5" />}
          title="Wallet"
          value={`₹${Number(profile?.wallet?.balance ?? 0).toLocaleString("en-IN")}`}
        />

        <Card
          icon={<Brain className="h-5 w-5" />}
          title="AI Credits"
          value={Number(
            profile?.aiWallet?.balance ?? 0
          ).toLocaleString("en-IN")}
        />

        <Card
          icon={<FileText className="h-5 w-5" />}
          title="Resume"
          value="—"
        />

      </div>

      {/* Verification */}

      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5">

        <div className="flex items-center gap-3">

          <CheckCircle2 className="h-6 w-6 text-emerald-400" />

          <div>

            <h4 className="font-semibold text-white">
              {profile?.emailVerified
                ? "Email Verified"
                : "Email Not Verified"}
            </h4>

            <p className="text-sm text-slate-300">
              {profile?.emailVerified
                ? "Your account is verified."
                : "Please verify your email address."}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

function Card({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 text-cyan-300">
        {icon}
      </div>

      <p className="mt-4 text-xs uppercase tracking-wider text-slate-400">
        {title}
      </p>

      <h3 className="mt-2 text-xl font-bold text-white">
        {value}
      </h3>

    </div>
  );
}