import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    emailAndPassword: {
        enabled: true,

        resetPasswordTokenExpiresIn: 3600,

        revokeSessionsOnPasswordReset: true,

        sendResetPassword: async ({
            user,
            url,
        }) => {
            await sendPasswordResetEmail({
                email: user.email,
                name: user.name ?? "Student",
                resetUrl: url,
            });
        },
    },

    user: {
        additionalFields: {
            firstName: {
                type: "string",
                required: true,
            },
            lastName: {
                type: "string",
                required: false,
            },
            role: {
                type: "string",
                required: false,
                defaultValue: "STUDENT",
            },
        },
    },

    plugins: [
        admin({
            defaultRole: "STUDENT",
            adminRoles: ["ADMIN"],
        }),
    ],

    trustedOrigins: [
        process.env.BETTER_AUTH_URL!,
        "https://edurefertech.com",
        "https://www.edurefertech.com",
    ],
});