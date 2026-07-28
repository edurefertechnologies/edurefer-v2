"use server";

import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-server";
import { SettingsOutput } from "@/schemas/admin/settings";

export interface SettingsPayload {
    general: {
        siteName: string;
        supportEmail: string;
        maintenanceMode: boolean;
    };

    referral: {
        enabled: boolean;
        rewardAmount: number;
        minimumWithdrawal: number;
    };

    platform: {
        currency: string;
        allowRegistration: boolean;
    };
}

export async function updateSettings(
    values: SettingsOutput
) {
    const session = await requireAuth();

    if (session.user.role !== "ADMIN") {
        throw new Error("Unauthorized");
    }

    await prisma.$transaction([
        prisma.setting.upsert({
            where: { key: "general" },
            update: {
                value: values.general,
            },
            create: {
                key: "general",
                value: values.general,
                description: "General platform settings",
            },
        }),

        prisma.setting.upsert({
            where: { key: "referral" },
            update: {
                value: values.referral,
            },
            create: {
                key: "referral",
                value: values.referral,
                description: "Referral settings",
            },
        }),

        prisma.setting.upsert({
            where: { key: "platform" },
            update: {
                value: values.platform,
            },
            create: {
                key: "platform",
                value: values.platform,
                description: "Platform settings",
            },
        }),

        prisma.auditLog.create({
            data: {
                userId: session.user.id,
                action: "UPDATE",
                entity: "SETTING",
                newData: values as unknown as Prisma.InputJsonValue,
            },
        }),
    ]);

    return {
        success: true,
    };
}