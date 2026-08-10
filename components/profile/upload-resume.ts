"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function saveResume(
  url: string,
  name: string,
  size: number
) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await prisma.userProfile.upsert({
    where: {
      userId: session.user.id,
    },

    update: {
      resumeUrl: url,
      resumeName: name,
      resumeSize: size,
      resumeUploadedAt: new Date(),
    },

    create: {
      userId: session.user.id,

      resumeUrl: url,
      resumeName: name,
      resumeSize: size,
      resumeUploadedAt: new Date(),
    },
  });

  return {
    success: true,
  };
}