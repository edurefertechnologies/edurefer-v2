import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getSession } from "@/lib/auth-server";

export async function POST() {
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

    const timestamp = Math.round(Date.now() / 1000);

    const folder = "edurefer/profiles";

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder,
      },
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({
      success: true,
      signature,
      timestamp,
      folder,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    });
  } catch (error) {
    console.error(
      "PROFILE_CLOUDINARY_SIGNATURE_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to generate profile upload signature",
      },
      { status: 500 }
    );
  }
}