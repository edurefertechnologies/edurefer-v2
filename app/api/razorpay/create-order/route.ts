export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";

export async function POST(req: NextRequest) {
  try {
    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { error: "Course slug is required" },
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
        { error: "Course not found" },
        { status: 404 }
      );
    }

    const order = await razorpay.orders.create({
      amount: Number(course.product.price) * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });

    return NextResponse.json({
      order,
      course: {
        id: course.id,
        title: course.title,
        slug: course.slug,
        price: Number(course.product.price),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}