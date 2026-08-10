export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { PaymentStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import { completePayment } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    // 1. User must be logged in
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

    // 2. Validate required fields
    if (
      !razorpay_order_id ||
      !razorpay_payment_id ||
      !razorpay_signature
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing payment details",
        },
        {
          status: 400,
        }
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;

    if (!secret) {
      console.error(
        "RAZORPAY_KEY_SECRET is not configured."
      );

      return NextResponse.json(
        {
          success: false,
          error: "Payment configuration error",
        },
        {
          status: 500,
        }
      );
    }

    // 3. Generate expected Razorpay signature
    const generatedSignature = crypto
      .createHmac("sha256", secret)
      .update(
        `${razorpay_order_id}|${razorpay_payment_id}`
      )
      .digest("hex");

    // 4. Timing-safe signature comparison
    const generatedBuffer = Buffer.from(
      generatedSignature,
      "utf8"
    );

    const receivedBuffer = Buffer.from(
      razorpay_signature,
      "utf8"
    );

    const validSignature =
      generatedBuffer.length === receivedBuffer.length &&
      crypto.timingSafeEqual(
        generatedBuffer,
        receivedBuffer
      );

    if (!validSignature) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid payment signature",
        },
        {
          status: 400,
        }
      );
    }

    // 5. Find our payment/order
    const payment = await prisma.payment.findUnique({
      where: {
        razorpayOrderId: razorpay_order_id,
      },

      include: {
        order: {
          include: {
            items: {
              include: {
                product: {
                  include: {
                    course: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!payment) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment not found",
        },
        {
          status: 404,
        }
      );
    }

    // 6. Important ownership check
    if (payment.order.userId !== session.user.id) {
      return NextResponse.json(
        {
          success: false,
          error: "You cannot verify this order.",
        },
        {
          status: 403,
        }
      );
    }

    const course =
      payment.order.items[0]?.product?.course;

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          error: "Course not found",
        },
        {
          status: 404,
        }
      );
    }

    // 7. Idempotency
    if (payment.status === PaymentStatus.SUCCESS) {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
        courseSlug: course.slug,
      });
    }

    // 8. Complete payment
    await completePayment({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    return NextResponse.json({
      success: true,
      message: "Payment verified successfully",
      courseSlug: course.slug,
    });
  } catch (error) {
    console.error(
      "RAZORPAY_VERIFY_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Payment verification failed",
      },
      {
        status: 500,
      }
    );
  }
}