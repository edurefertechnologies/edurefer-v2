"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getResumes() {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  return prisma.userResume.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });
}