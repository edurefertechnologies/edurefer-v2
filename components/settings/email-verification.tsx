"use client";

import { useState } from "react";
import {
    CheckCircle2,
    Loader2,
    MailCheck,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

interface Props {
    email: string;
    emailVerified: boolean;
}

export default function EmailVerification({
    email,
    emailVerified,
}: Props) {
    const [verified, setVerified] =
        useState(emailVerified);

    const [loading, setLoading] =
        useState(false);

    async function handleVerify() {
        try {
            setLoading(true);

            const { error } =
                await authClient.sendVerificationEmail({
                    email,
                    callbackURL: "/settings",
                });

            if (error) {
                toast.error(
                    error.message ||
                    "Unable to send verification email."
                );
                return;
            }

            toast.success(
                "Verification email sent. Please check your inbox."
            );
        } catch (error) {
            console.error(
                "SEND_VERIFICATION_EMAIL_ERROR:",
                error
            );

            toast.error(
                "Unable to send verification email."
            );
        } finally {
            setLoading(false);
        }
    }

    if (verified) {
        return (
            <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                Email Verified
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={handleVerify}
            disabled={loading}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-amber-400/20 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300 transition hover:bg-amber-400/20 disabled:cursor-not-allowed disabled:opacity-60"
        >
            {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <MailCheck className="h-4 w-4" />
            )}

            {loading
                ? "Sending..."
                : "Verify Email"}
        </button>
    );
}