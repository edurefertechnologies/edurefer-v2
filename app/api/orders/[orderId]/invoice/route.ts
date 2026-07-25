import { NextRequest, NextResponse } from "next/server";
import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

interface Props {
  params: Promise<{
    orderId: string;
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

    const { orderId } = await params;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },

      include: {
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },

        payment: true,

        items: {
          include: {
            product: {
              include: {
                course: true,
              },
            },

            bundle: true,
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json(
        {
          success: false,
          error: "Order not found",
        },
        { status: 404 }
      );
    }

    // Invoice can only be downloaded
    // by the owner of the order.
    if (order.userId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Forbidden",
        },
        { status: 403 }
      );
    }

    if (
      order.status !== "PAID" ||
      order.payment?.status !== "SUCCESS"
    ) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Invoice is only available for successful payments",
        },
        { status: 400 }
      );
    }

    const customerName = [
      order.user.firstName,
      order.user.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    const invoiceDate = (
      order.payment.paidAt ??
      order.createdAt
    ).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

    const pdfDoc =
      await PDFDocument.create();

    // A4 portrait
    const page = pdfDoc.addPage([
      595.28,
      841.89,
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

    const left = 50;
    const right = width - 50;

    // Header
    page.drawText(
      "EDUREFER TECHNOLOGIES LLP",
      {
        x: left,
        y: height - 65,
        size: 18,
        font: boldFont,
      }
    );

    page.drawText("INVOICE", {
      x: right - 85,
      y: height - 65,
      size: 22,
      font: boldFont,
    });

    page.drawLine({
      start: {
        x: left,
        y: height - 85,
      },
      end: {
        x: right,
        y: height - 85,
      },
      thickness: 1,
      color: rgb(0.8, 0.8, 0.8),
    });

    // Invoice details
    let y = height - 120;

    page.drawText(
      `Order No: ${order.orderNumber}`,
      {
        x: left,
        y,
        size: 11,
        font: boldFont,
      }
    );

    page.drawText(
      `Date: ${invoiceDate}`,
      {
        x: 350,
        y,
        size: 11,
        font: regularFont,
      }
    );

    y -= 25;

    if (order.payment.razorpayPaymentId) {
      page.drawText(
        `Payment ID: ${order.payment.razorpayPaymentId}`,
        {
          x: left,
          y,
          size: 9,
          font: regularFont,
        }
      );

      y -= 25;
    }

    // Bill To
    y -= 15;

    page.drawText("BILL TO", {
      x: left,
      y,
      size: 11,
      font: boldFont,
    });

    y -= 22;

    page.drawText(customerName, {
      x: left,
      y,
      size: 12,
      font: boldFont,
    });

    y -= 18;

    page.drawText(order.user.email, {
      x: left,
      y,
      size: 10,
      font: regularFont,
    });

    if (order.user.phone) {
      y -= 18;

      page.drawText(order.user.phone, {
        x: left,
        y,
        size: 10,
        font: regularFont,
      });
    }

    // Items table
    y -= 45;

    page.drawRectangle({
      x: left,
      y: y - 8,
      width: right - left,
      height: 28,
      color: rgb(0.95, 0.95, 0.95),
    });

    page.drawText("Description", {
      x: left + 10,
      y,
      size: 10,
      font: boldFont,
    });

    page.drawText("Qty", {
      x: 360,
      y,
      size: 10,
      font: boldFont,
    });

    page.drawText("Amount", {
      x: 455,
      y,
      size: 10,
      font: boldFont,
    });

    y -= 35;

    for (const item of order.items) {
      const itemName =
        item.product?.course?.title ??
        item.product?.name ??
        item.bundle?.name ??
        "Item";

      // Keep long item names inside invoice
      let displayName = itemName;

      if (displayName.length > 50) {
        displayName =
          `${displayName.slice(0, 47)}...`;
      }

      page.drawText(displayName, {
        x: left + 10,
        y,
        size: 10,
        font: regularFont,
      });

      page.drawText(
        String(item.quantity),
        {
          x: 365,
          y,
          size: 10,
          font: regularFont,
        }
      );

      page.drawText(
        `INR ${Number(
          item.totalPrice
        ).toLocaleString("en-IN")}`,
        {
          x: 455,
          y,
          size: 10,
          font: regularFont,
        }
      );

      y -= 27;

      page.drawLine({
        start: {
          x: left,
          y: y + 10,
        },
        end: {
          x: right,
          y: y + 10,
        },
        thickness: 0.5,
        color: rgb(0.88, 0.88, 0.88),
      });
    }

    // Totals
    y -= 25;

    const totalsX = 365;

    page.drawText("Subtotal", {
      x: totalsX,
      y,
      size: 10,
      font: regularFont,
    });

    page.drawText(
      `INR ${Number(
        order.subtotal
      ).toLocaleString("en-IN")}`,
      {
        x: 455,
        y,
        size: 10,
        font: regularFont,
      }
    );

    y -= 22;

    if (Number(order.discount) > 0) {
      page.drawText("Discount", {
        x: totalsX,
        y,
        size: 10,
        font: regularFont,
      });

      page.drawText(
        `- INR ${Number(
          order.discount
        ).toLocaleString("en-IN")}`,
        {
          x: 455,
          y,
          size: 10,
          font: regularFont,
        }
      );

      y -= 22;
    }

    if (Number(order.tax) > 0) {
      page.drawText("Tax", {
        x: totalsX,
        y,
        size: 10,
        font: regularFont,
      });

      page.drawText(
        `INR ${Number(
          order.tax
        ).toLocaleString("en-IN")}`,
        {
          x: 455,
          y,
          size: 10,
          font: regularFont,
        }
      );

      y -= 22;
    }

    page.drawLine({
      start: {
        x: totalsX,
        y: y + 8,
      },
      end: {
        x: right,
        y: y + 8,
      },
      thickness: 1,
    });

    page.drawText("Total Paid", {
      x: totalsX,
      y: y - 10,
      size: 12,
      font: boldFont,
    });

    page.drawText(
      `INR ${Number(
        order.total
      ).toLocaleString("en-IN")}`,
      {
        x: 455,
        y: y - 10,
        size: 12,
        font: boldFont,
      }
    );

    // Footer
    page.drawLine({
      start: {
        x: left,
        y: 90,
      },
      end: {
        x: right,
        y: 90,
      },
      thickness: 0.5,
      color: rgb(0.8, 0.8, 0.8),
    });

    page.drawText(
      "Thank you for learning with Edurefer.",
      {
        x: left,
        y: 68,
        size: 9,
        font: regularFont,
      }
    );

    page.drawText(
      "This is a system-generated invoice.",
      {
        x: left,
        y: 52,
        size: 8,
        font: regularFont,
      }
    );

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
            `attachment; filename="Invoice-${order.orderNumber}.pdf"`,

          "Cache-Control":
            "private, no-store",
        },
      }
    );
  } catch (error) {
    console.error(
      "INVOICE_GENERATION_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          "Unable to generate invoice",
      },
      { status: 500 }
    );
  }
}