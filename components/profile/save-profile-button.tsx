"use client";

import { useTransition } from "react";
import { Save } from "lucide-react";
import { toast } from "sonner";

import { updateProfile } from "@/actions/profile/update-profile";
import { ProfileForm } from "./types";

interface SaveProfileButtonProps {
  form: ProfileForm;
}

export function SaveProfileButton({
  form,
}: SaveProfileButtonProps) {

  const [isPending, startTransition] =
    useTransition();

  function handleSave() {

    startTransition(async () => {

      try {

        await updateProfile({

          firstName: form.firstName,
          lastName: form.lastName,
          phone: form.phone,

          headline: form.headline,
          bio: form.bio,

          address: form.address,
          city: form.city,
          state: form.state,
          country: form.country,
          pincode: form.pincode,

          college: form.college,
          university: form.university,
          degree: form.degree,
          branch: form.branch,

          passingYear: form.passingYear
            ? Number(form.passingYear)
            : undefined,

          currentCompany:
            form.currentCompany,

          designation:
            form.designation,

          experience: form.experience
            ? Number(form.experience)
            : undefined,

          linkedin: form.linkedin,
          github: form.github,
          portfolio: form.portfolio,
          website: form.website,

        });

        toast.success(
          "Profile updated successfully."
        );

      } catch {

        toast.error(
          "Unable to update profile."
        );

      }

    });

  }

  return (

    <div className="flex justify-end">

      <button
        type="button"
        onClick={handleSave}
        disabled={isPending}
        className="
        inline-flex
        items-center
        gap-2
        rounded-xl
        bg-gradient-to-r
        from-cyan-600
        to-emerald-500
        px-8
        py-3
        font-semibold
        text-white
        shadow-lg
        transition
        hover:scale-105
        disabled:opacity-60
        disabled:cursor-not-allowed
        "
      >

        <Save className="h-5 w-5" />

        {isPending
          ? "Saving..."
          : "Save Changes"}

      </button>

    </div>

  );

}