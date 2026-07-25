"use server";

import { prisma } from "@/lib/prisma";

export async function getEnrollmentDetails(
  enrollmentId: string
) {
  const enrollment =
    await prisma.enrollment.findUnique({
      where: {
        id: enrollmentId,
      },

      select: {
        id: true,
        progress: true,
        status: true,
        enrolledAt: true,
        completedAt: true,

        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },

        course: {
          select: {
            id: true,
            title: true,
            slug: true,
            duration: true,
            level: true,

            modules: {
              orderBy: {
                sortOrder: "asc",
              },

              select: {
                id: true,
                title: true,
                sortOrder: true,

                lessons: {
                  orderBy: {
                    sortOrder: "asc",
                  },

                  select: {
                    id: true,
                    title: true,
                    duration: true,
                    videoDuration: true,
                    sortOrder: true,
                  },
                },
              },
            },
          },
        },

        lessonProgress: {
          select: {
            lessonId: true,
            completed: true,
            watchedSeconds: true,
            completedAt: true,
          },
        },

        order: {
          select: {
            id: true,
            orderNumber: true,
            status: true,
            subtotal: true,
            discount: true,
            tax: true,
            total: true,
            currency: true,
            createdAt: true,

            payment: {
              select: {
                id: true,
                amount: true,
                currency: true,
                method: true,
                status: true,
                razorpayOrderId: true,
                razorpayPaymentId: true,
                paidAt: true,
              },
            },
          },
        },

        certificate: {
          select: {
            id: true,
            certificateNo: true,
            issuedAt: true,
            pdfUrl: true,
          },
        },
      },
    });

  if (!enrollment) {
    return null;
  }

  return JSON.parse(
    JSON.stringify(enrollment, (_, value) =>
      value?.constructor?.name === "Decimal"
        ? Number(value)
        : value
    )
  );
}