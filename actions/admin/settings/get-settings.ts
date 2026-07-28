"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import { SettingsOutput } from "@/schemas/admin/settings";

const DEFAULT_SETTINGS = {
    general: {
        siteName: "Edurefer",
        supportEmail: "solutions@edurefertech.com",
        maintenanceMode: false,
    },

    referral: {
        enabled: true,
        rewardAmount: 300,
        minimumWithdrawal: 600,
    },

    platform: {
        currency: "INR",
        allowRegistration: true,
    },
};

export async function getSettings(): Promise<SettingsOutput> {
    const session = await getSession();

    if (
        !session?.user?.id ||
        session.user.role !== "ADMIN"
    ) {
        throw new Error("Unauthorized");
    }

    const settings =
        await prisma.setting.findMany();

    const result = structuredClone(
        DEFAULT_SETTINGS
    );

    for (const setting of settings) {
        if (setting.key === "general") {
            result.general = {
                ...result.general,
                ...(setting.value as Partial<
                    typeof result.general
                >),
            };
        }

        if (setting.key === "referral") {
            result.referral = {
                ...result.referral,
                ...(setting.value as Partial<
                    typeof result.referral
                >),
            };
        }

        if (setting.key === "platform") {
            result.platform = {
                ...result.platform,
                ...(setting.value as Partial<
                    typeof result.platform
                >),
            };
        }
    }

    return result;
}