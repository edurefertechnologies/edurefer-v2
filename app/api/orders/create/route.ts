export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { getSession } from "@/lib/auth-server";
import { generateOrderNumber } from "@/lib/order";

export async function POST(req: Request) {
  try {
    const session = await getSession();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { success: false, error: "Course slug is required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: { slug },
      include: {
        product: true,
      },
    });

    if (!course || !course.product) {
      return NextResponse.json(
        { success: false, error: "Course not found" },
        { status: 404 }
      );
    }

    const existingEnrollment = await prisma.enrollment.findUnique({
      where: {
        userId_courseId: {
          userId: session.user.id,
          courseId: course.id,
        },
      },
    });

    if (existingEnrollment) {
      return NextResponse.json(
        {
          success: false,
          error: "You already own this course.",
        },
        { status: 400 }
      );
    }

    const originalPrice = Number(course.product.price);

    const sellingPrice =
      course.product.discountPrice !== null &&
        Number(course.product.discountPrice) > 0 &&
        Number(course.product.discountPrice) < originalPrice
        ? Number(course.product.discountPrice)
        : originalPrice;

    const discount = originalPrice - sellingPrice;

    const amount = sellingPrice;

    const result = await prisma.$transaction(async (tx) => {
      const order = await tx.order.create({
        data: {
          orderNumber: generateOrderNumber(),
          userId: session.user.id,
          subtotal: originalPrice,
          discount,
          tax: 0,
          total: amount,
          currency: "INR",
        }
      });

      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId: course.product.id,
          quantity: 1,
          unitPrice: amount,
          totalPrice: amount,
        },
      });

      const payment = await tx.payment.create({
        data: {
          orderId: order.id,
          amount,
          currency: "INR",
        },
      });

      return {
        order,
        payment,
      };
    },
      {
        timeout: 15000, // 15 seconds
      });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: result.order.orderNumber,
      notes: {
        orderId: result.order.id,
        userId: session.user.id,
        courseId: course.id,
      },
    });

    await prisma.payment.update({
      where: {
        id: result.payment.id,
      },
      data: {
        razorpayOrderId: razorpayOrder.id,
      },
    });

    return NextResponse.json({
      success: true,

      orderId: result.order.id,

      razorpayOrderId: razorpayOrder.id,

      razorpayAmount: razorpayOrder.amount,

      currency: razorpayOrder.currency,

      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}