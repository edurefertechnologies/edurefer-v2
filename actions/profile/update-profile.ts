"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import { revalidatePath } from "next/cache";

export interface UpdateProfileInput {
  firstName: string;
  lastName?: string;
  phone?: string;

  headline?: string;
  bio?: string;

  gender?: "MALE" | "FEMALE" | "OTHER";

  address?: string;
  city?: string;
  state?: string;
  country?: string;
  pincode?: string;

  college?: string;
  university?: string;
  degree?: string;
  branch?: string;
  passingYear?: number;

  currentCompany?: string;
  designation?: string;
  experience?: number;

  linkedin?: string;
  github?: string;
  portfolio?: string;
  website?: string;
}

export async function updateProfile(
  values: UpdateProfileInput
) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const userId = session.user.id;

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: {
        id: userId,
      },

      data: {
        firstName: values.firstName,
        lastName: values.lastName,
        phone: values.phone,
      },
    });

    await tx.userProfile.upsert({
      where: {
        userId,
      },

      update: {
        headline: values.headline,
        bio: values.bio,

        gender: values.gender,

        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        pincode: values.pincode,

        college: values.college,
        university: values.university,
        degree: values.degree,
        branch: values.branch,
        passingYear: values.passingYear,

        currentCompany: values.currentCompany,
        designation: values.designation,
        experience: values.experience,

        linkedin: values.linkedin,
        github: values.github,
        portfolio: values.portfolio,
        website: values.website,
      },

      create: {
        userId,

        headline: values.headline,
        bio: values.bio,

        gender: values.gender,

        address: values.address,
        city: values.city,
        state: values.state,
        country: values.country,
        pincode: values.pincode,

        college: values.college,
        university: values.university,
        degree: values.degree,
        branch: values.branch,
        passingYear: values.passingYear,

        currentCompany: values.currentCompany,
        designation: values.designation,
        experience: values.experience,

        linkedin: values.linkedin,
        github: values.github,
        portfolio: values.portfolio,
        website: values.website,
      },
    });
  });

  revalidatePath("/profile");

  return {
    success: true,
  };
}