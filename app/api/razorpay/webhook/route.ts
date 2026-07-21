import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { completePayment } from "@/lib/payment";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();

    const signature = req.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing webhook signature",
        },
        {
          status: 400,
        }
      );
    }

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_WEBHOOK_SECRET!
      )
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid webhook signature",
        },
        {
          status: 400,
        }
      );
    }

    const event = JSON.parse(body);

    switch (event.event) {
      case "payment.captured": {
        const payment = event.payload.payment.entity;

        await completePayment({
          razorpayOrderId: payment.order_id,
          razorpayPaymentId: payment.id,
          razorpaySignature: signature,
        });

        break;
      }

      case "payment.failed": {
        console.log("Payment Failed:", event.payload.payment.entity.id);
        break;
      }

      default:
        console.log(`Unhandled webhook event: ${event.event}`);
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Webhook processing failed",
      },
      {
        status: 500,
      }
    );
  }
}