"use server";

import { prisma } from "@/lib/prisma";

export async function verifyCertificate(
  certificateNo: string
) {
  const normalizedCertificateNo =
    certificateNo.trim().toUpperCase();

  if (!normalizedCertificateNo) {
    return {
      success: false as const,
      reason: "INVALID" as const,
    };
  }

  const certificate =
    await prisma.certificate.findUnique({
      where: {
        certificateNo:
          normalizedCertificateNo,
      },

      select: {
        certificateNo: true,
        issuedAt: true,

        enrollment: {
          select: {
            status: true,
            completedAt: true,

            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },

            course: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });

  if (
    !certificate ||
    certificate.enrollment.status !==
      "COMPLETED"
  ) {
    return {
      success: false as const,
      reason: "NOT_FOUND" as const,
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
      certificateNo:
        certificate.certificateNo,

      studentName,

      courseTitle:
        certificate.enrollment.course.title,

      completedAt:
        certificate.enrollment.completedAt,

      issuedAt:
        certificate.issuedAt,
    },
  };
}