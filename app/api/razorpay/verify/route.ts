import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";
import { completePayment } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = await req.json();

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
        { status: 400 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid Signature",
        },
        { status: 400 }
      );
    }

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
        { status: 404 }
      );
    }

    // Idempotency
    if (payment.status === PaymentStatus.SUCCESS) {
      return NextResponse.json({
        success: true,
        message: "Payment already verified",
      });
    }

    const course =
      payment.order.items[0]?.product?.course;

    if (!course) {
      return NextResponse.json(
        {
          success: false,
          error: "Course not found",
        },
        { status: 404 }
      );
    }

    await completePayment({
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
    });

    return NextResponse.json({
      success: true,
      message: "Payment Verified Successfully",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Verification Failed",
      },
      {
        status: 500,
      }
    );
  }
}