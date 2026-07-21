import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { razorpay } from "@/lib/razorpay";
import { getSession } from "@/lib/auth-server";

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json(
        { error: "Course slug is required" },
        { status: 400 }
      );
    }

    const course = await prisma.course.findUnique({
      where: {
        slug,
      },
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

    const existingEnrollment =
      await prisma.enrollment.findUnique({
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
          error: "You already own this course.",
        },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Validation successful",
      course: {
        id: course.id,
        title: course.title,
        price: Number(course.product.price),
      },
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}