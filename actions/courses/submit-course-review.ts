"use server";

import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

interface SubmitCourseReviewParams {
  courseId: string;
  rating: number;
  comment?: string;
}

export async function submitCourseReview({
  courseId,
  rating,
  comment,
}: SubmitCourseReviewParams) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to review a course.",
      };
    }

    // Rating validation
    if (
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      return {
        success: false,
        message: "Rating must be between 1 and 5.",
      };
    }

    const cleanComment = comment?.trim() || null;

    if (
      cleanComment &&
      cleanComment.length > 1000
    ) {
      return {
        success: false,
        message:
          "Review cannot exceed 1000 characters.",
      };
    }

    // Verify that the student owns the course
    const enrollment =
      await prisma.enrollment.findUnique({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId,
          },
        },

        select: {
          id: true,
          status: true,

          course: {
            select: {
              slug: true,
            },
          },
        },
      });

    if (!enrollment) {
      return {
        success: false,
        message:
          "Only enrolled students can review this course.",
      };
    }

    // Expired enrollment should not be allowed
    if (enrollment.status === "EXPIRED") {
      return {
        success: false,
        message:
          "Your course enrollment has expired.",
      };
    }

    // Create or update existing review
    const review =
      await prisma.courseReview.upsert({
        where: {
          userId_courseId: {
            userId: session.user.id,
            courseId,
          },
        },

        create: {
          userId: session.user.id,
          courseId,
          rating,
          comment: cleanComment,
        },

        update: {
          rating,
          comment: cleanComment,
        },

        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          updatedAt: true,
        },
      });

    revalidatePath(
      `/courses/${enrollment.course.slug}`
    );

    return {
      success: true,
      message: "Your review has been saved.",
      review,
    };
  } catch (error) {
    console.error(
      "SUBMIT_COURSE_REVIEW_ERROR:",
      error
    );

    return {
      success: false,
      message:
        "Unable to save your review. Please try again.",
    };
  }
}