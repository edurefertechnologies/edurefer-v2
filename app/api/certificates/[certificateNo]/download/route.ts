export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import QRCode from "qrcode";

interface Props {
  params: Promise<{
    certificateNo: string;
  }>;
}

export async function GET(
  req: NextRequest,
  { params }: Props
) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const { certificateNo } = await params;

    const certificate =
      await prisma.certificate.findUnique({
        where: {
          certificateNo,
        },

        include: {
          enrollment: {
            include: {
              user: true,
              course: true,
            },
          },
        },
      });

    if (!certificate) {
      return NextResponse.json(
        {
          success: false,
          error: "Certificate not found",
        },
        { status: 404 }
      );
    }

    // Only certificate owner can download it
    if (
      certificate.enrollment.userId !==
      session.user.id
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden",
        },
        { status: 403 }
      );
    }

    if (
      certificate.enrollment.status !==
      "COMPLETED"
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Course is not completed",
        },
        { status: 400 }
      );
    }

    const studentName = [
      certificate.enrollment.user.firstName,
      certificate.enrollment.user.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    const courseTitle =
      certificate.enrollment.course.title;

    const issuedDate =
      certificate.issuedAt.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "long",
          year: "numeric",
        }
      );

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const verificationUrl =
      `${baseUrl}/verify-certificate/${encodeURIComponent(
        certificate.certificateNo
      )}`;

    const qrDataUrl =
      await QRCode.toDataURL(
        verificationUrl,
        {
          width: 300,
          margin: 1,
          errorCorrectionLevel: "M",
        }
      );

    const qrBase64 =
      qrDataUrl.split(",")[1];

    const qrBytes =
      Buffer.from(qrBase64, "base64");

    // Create PDF
    const pdfDoc =
      await PDFDocument.create();

    const qrImage =
      await pdfDoc.embedPng(qrBytes);

    // Landscape A4
    const page = pdfDoc.addPage([
      841.89,
      595.28,
    ]);

    const { width, height } =
      page.getSize();

    const regularFont =
      await pdfDoc.embedFont(
        StandardFonts.Helvetica
      );

    const boldFont =
      await pdfDoc.embedFont(
        StandardFonts.HelveticaBold
      );

    // Border
    page.drawRectangle({
      x: 24,
      y: 24,
      width: width - 48,
      height: height - 48,
      borderWidth: 3,
      borderColor: rgb(
        0.15,
        0.35,
        0.75
      ),
    });

    page.drawRectangle({
      x: 34,
      y: 34,
      width: width - 68,
      height: height - 68,
      borderWidth: 1,
      borderColor: rgb(
        0.65,
        0.65,
        0.65
      ),
    });

    // Helper for centered text
    const drawCenteredText = (
      text: string,
      y: number,
      size: number,
      font = regularFont
    ) => {
      const textWidth =
        font.widthOfTextAtSize(
          text,
          size
        );

      page.drawText(text, {
        x: (width - textWidth) / 2,
        y,
        size,
        font,
      });
    };

    const drawCenteredFittedText = (
      text: string,
      y: number,
      preferredSize: number,
      minSize: number,
      maxWidth: number,
      font = regularFont
    ) => {
      let size = preferredSize;

      while (
        size > minSize &&
        font.widthOfTextAtSize(text, size) > maxWidth
      ) {
        size -= 1;
      }

      const textWidth =
        font.widthOfTextAtSize(text, size);

      page.drawText(text, {
        x: (width - textWidth) / 2,
        y,
        size,
        font,
      });
    };

    drawCenteredText(
      "EDUREFER TECHNOLOGIES LLP",
      height - 100,
      20,
      boldFont
    );

    drawCenteredText(
      "CERTIFICATE OF COMPLETION",
      height - 160,
      30,
      boldFont
    );

    drawCenteredText(
      "This is to certify that",
      height - 215,
      14
    );

    drawCenteredFittedText(
      studentName,
      height - 260,
      28,
      18,
      width - 160,
      boldFont
    );

    drawCenteredText(
      "has successfully completed the course",
      height - 305,
      14
    );

    drawCenteredFittedText(
      courseTitle,
      height - 350,
      22,
      14,
      width - 160,
      boldFont
    );

    drawCenteredText(
      `Issued on ${issuedDate}`,
      height - 410,
      12
    );

    drawCenteredText(
      `Certificate No: ${certificate.certificateNo}`,
      height - 440,
      11
    );

    drawCenteredText(
      "Edurefer Technologies LLP",
      75,
      12,
      boldFont
    );

    const qrSize = 72;

    page.drawImage(qrImage, {
      x: width - 125,
      y: 55,
      width: qrSize,
      height: qrSize,
    });

    page.drawText("Scan to verify", {
      x: width - 121,
      y: 42,
      size: 8,
      font: regularFont,
    });

    const pdfBytes =
      await pdfDoc.save();

    return new NextResponse(
      Buffer.from(pdfBytes),
      {
        status: 200,

        headers: {
          "Content-Type":
            "application/pdf",

          "Content-Disposition":
            `attachment; filename="${certificate.certificateNo}.pdf"`,

          "Cache-Control":
            "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "CERTIFICATE_DOWNLOAD_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to generate certificate",
      },
      { status: 500 }
    );
  }
}