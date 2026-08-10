"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function saveResume(data: {
  title?: string;
  template?: string;
  resumeData: unknown;
}) {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const resume = await prisma.userResume.create({
    data: {
      userId: session.user.id,
      title: data.title?.trim() || "My Resume",
      template: data.template || "professional",
      data: data.resumeData as object,
      isDefault: true,
    },
  });

  return {
    success: true,
    resumeId: resume.id,
  };
}