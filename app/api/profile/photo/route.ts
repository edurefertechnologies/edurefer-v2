import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export async function PATCH(
  request: Request
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

    const body = await request.json();

    const image = body?.image;

    if (
      typeof image !== "string" ||
      !image.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Valid image URL is required",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image,
      },
      select: {
        id: true,
        image: true,
      },
    });

    return NextResponse.json({
      success: true,
      image: user.image,
    });
  } catch (error) {
    console.error(
      "PROFILE_PHOTO_UPDATE_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to update profile photo",
      },
      { status: 500 }
    );
  }
}