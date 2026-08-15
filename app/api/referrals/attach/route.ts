import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
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

        const body = await req.json();

        const referralCode =
            typeof body.referralCode === "string"
                ? body.referralCode.trim()
                : "";

        if (!referralCode) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Referral code is required.",
                },
                { status: 400 }
            );
        }

        const referrer =
            await prisma.user.findFirst({
                where: {
                    referralCode,
                    id: {
                        not: session.user.id,
                    },
                    isDeleted: false,
                },
                select: {
                    id: true,
                },
            });

        if (!referrer) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid referral code.",
                },
                { status: 400 }
            );
        }

        /*
         * Referral eligibility:
         * Referrer must have at least one PAID
         * order containing a Product or Package.
         */
        const qualifyingOrder =
            await prisma.order.findFirst({
                where: {
                    userId: referrer.id,
                    status: "PAID",

                    items: {
                        some: {
                            OR: [
                                {
                                    productId: {
                                        not: null,
                                    },
                                },
                                {
                                    packageId: {
                                        not: null,
                                    },
                                },
                            ],
                        },
                    },
                },

                select: {
                    id: true,
                },
            });

        if (!qualifyingOrder) {
            return NextResponse.json(
                {
                    success: false,
                    error:
                        "This referral code is not currently eligible.",
                },
                { status: 403 }
            );
        }

        /*
         * A referee can have only one referral
         * because refereeId is @unique in Prisma.
         */
        const existingReferral =
            await prisma.referral.findUnique({
                where: {
                    refereeId: session.user.id,
                },
                select: {
                    id: true,
                },
            });

        if (existingReferral) {
            return NextResponse.json({
                success: true,
                message: "Referral already exists.",
            });
        }

        await prisma.referral.create({
            data: {
                referrerId: referrer.id,
                refereeId: session.user.id,
            },
        });

        return NextResponse.json({
            success: true,
            message: "Referral attached successfully.",
        });
    } catch (error) {
        console.error(
            "REFERRAL_ATTACH_ERROR:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                error: "Unable to attach referral.",
            },
            { status: 500 }
        );
    }
}