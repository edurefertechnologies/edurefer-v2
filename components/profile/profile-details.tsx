"use client";

import { useState } from "react";

import { createInitialProfile } from "./profile-utils";
import { PersonalCard } from "./personal-card";
import { AddressCard } from "./address-card";
import { EducationCard } from "./education-card";
import { ExperienceCard } from "./experience-card";
import { SocialCard } from "./social-card";
import { SaveProfileButton } from "./save-profile-button";

interface Props {
  profile: any;
}

export function ProfileDetails({
  profile,
}: Props) {
  const [form, setForm] = useState(
    createInitialProfile(profile)
  );

  return (
    <div className="space-y-6">

      <PersonalCard
        profile={profile}
        form={form}
        setForm={setForm}
      />

      <AddressCard
        form={form}
        setForm={setForm}
      />

      <EducationCard
        form={form}
        setForm={setForm}
      />

      <ExperienceCard
        form={form}
        setForm={setForm}
      />

      <SocialCard
        form={form}
        setForm={setForm}
      />

      <SaveProfileButton
        form={form}
      />

    </div>
  );
}