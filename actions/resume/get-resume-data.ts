"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getResumeData() {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      profile: true,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return {
    id: user.id,

    firstName: user.firstName ?? "",
    lastName: user.lastName ?? "",
    email: user.email ?? "",
    phone: user.phone ?? "",
    image: user.image ?? null,

    headline: user.profile?.headline ?? "",
    bio: user.profile?.bio ?? "",

    address: user.profile?.address ?? "",
    city: user.profile?.city ?? "",
    state: user.profile?.state ?? "",
    country: user.profile?.country ?? "",
    pincode: user.profile?.pincode ?? "",

    college: user.profile?.college ?? "",
    university: user.profile?.university ?? "",
    degree: user.profile?.degree ?? "",
    branch: user.profile?.branch ?? "",
    passingYear: user.profile?.passingYear
      ? String(user.profile.passingYear)
      : "",

    currentCompany:
      user.profile?.currentCompany ?? "",

    designation:
      user.profile?.designation ?? "",

    experience:
      user.profile?.experience !== null &&
      user.profile?.experience !== undefined
        ? String(user.profile.experience)
        : "",

    linkedin: user.profile?.linkedin ?? "",
    github: user.profile?.github ?? "",
    portfolio: user.profile?.portfolio ?? "",
    website: user.profile?.website ?? "",

    resumeName:
      user.profile?.resumeName ?? null,

    resumeUrl:
      user.profile?.resumeUrl ?? null,

    resumeUploadedAt:
      user.profile?.resumeUploadedAt ?? null,
  };
}