"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function isCourseWishlisted(
  courseId: string
) {
  const session = await getSession();

  if (!session?.user?.id) {
    return false;
  }

  const wishlist =
    await prisma.courseWishlist.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId,
        },
      },

      select: {
        id: true,
      },
    });

  return Boolean(wishlist);
}