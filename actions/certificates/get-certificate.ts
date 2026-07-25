"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function getCertificate(
  certificateNo: string
) {
  const session = await getSession();

  if (!session?.user?.id) {
    return {
      success: false as const,
      reason: "UNAUTHORIZED" as const,
    };
  }

  const certificate =
    await prisma.certificate.findUnique({
      where: {
        certificateNo,
      },

      select: {
        id: true,
        certificateNo: true,
        issuedAt: true,
        pdfUrl: true,

        enrollment: {
          select: {
            id: true,
            userId: true,
            completedAt: true,

            certificate: {
              select: {
                certificateNo: true,
                issuedAt: true,
              },
            },

            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },

            course: {
              select: {
                id: true,
                title: true,
                slug: true,
              },
            },
          },
        },
      },
    });

  if (!certificate) {
    return {
      success: false as const,
      reason: "NOT_FOUND" as const,
    };
  }

  // Student can only access their own certificate
  if (
    certificate.enrollment.userId !==
    session.user.id
  ) {
    return {
      success: false as const,
      reason: "FORBIDDEN" as const,
    };
  }

  const studentName = [
    certificate.enrollment.user.firstName,
    certificate.enrollment.user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    success: true as const,

    certificate: {
      id: certificate.id,
      certificateNo:
        certificate.certificateNo,

      studentName,

      courseTitle:
        certificate.enrollment.course.title,

      courseSlug:
        certificate.enrollment.course.slug,

      completedAt:
        certificate.enrollment.completedAt,

      issuedAt: certificate.issuedAt,

      pdfUrl: certificate.pdfUrl,
    },
  };
}