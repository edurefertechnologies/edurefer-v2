import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin } from "better-auth/plugins";

import { prisma } from "@/lib/prisma";
import {
    sendPasswordResetEmail,
    sendVerificationEmail,
} from "@/lib/email";

export const auth = betterAuth({
    /*
     * =========================================================
     * BASE URL
     * =========================================================
     */

    baseURL:
        process.env.BETTER_AUTH_URL ||
        "http://localhost:3000",

    /*
     * =========================================================
     * DATABASE
     * =========================================================
     */

    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),

    /*
     * =========================================================
     * EMAIL + PASSWORD
     * =========================================================
     */

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

    /*
     * =========================================================
     * GOOGLE LOGIN
     * =========================================================
     */

    socialProviders: {
        google: {
            clientId:
                process.env.GOOGLE_CLIENT_ID!,

            clientSecret:
                process.env.GOOGLE_CLIENT_SECRET!,

            prompt: "select_account",
        },
    },

    /*
     * =========================================================
     * EMAIL VERIFICATION
     * =========================================================
     */

    emailVerification: {
        sendVerificationEmail: async ({
            user,
            url,
        }) => {
            await sendVerificationEmail({
                email: user.email,
                name: user.name ?? "Student",
                verificationUrl: url,
            });
        },

        sendOnSignUp: true,

        autoSignInAfterVerification: true,
    },

    /*
     * =========================================================
     * USER FIELDS
     * =========================================================
     */

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

    /*
     * =========================================================
     * ADMIN
     * =========================================================
     */

    plugins: [
        admin({
            defaultRole: "STUDENT",
            adminRoles: ["ADMIN"],
        }),
    ],

    /*
     * =========================================================
     * TRUSTED ORIGINS
     * =========================================================
     */

    trustedOrigins: [
        "https://edurefertech.com",
        "https://www.edurefertech.com",
        "http://localhost:3000",
    ],
});