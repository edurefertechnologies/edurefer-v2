"use client";

import Link from "next/link";
import { useState } from "react";
import {
    CheckCircle2,
    Loader2,
    Mail,
} from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

interface Props {
    email: string;
}

export default function VerifyEmailClient({
    email,
}: Props) {
    const [loading, setLoading] =
        useState(false);

    async function resendEmail() {
        if (!email) {
            toast.error("Email address is missing.");
            return;
        }

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
                "Verification email sent. Check your inbox."
            );
        } catch (error) {
            console.error(
                "RESEND_VERIFICATION_ERROR:",
                error
            );

            toast.error(
                "Unable to send verification email."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center shadow-2xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-500/10">
                <Mail className="h-8 w-8 text-cyan-300" />
            </div>

            <h1 className="mt-6 text-2xl font-bold text-white">
                Verify your email
            </h1>

            <p className="mt-3 text-sm leading-6 text-slate-400">
                We sent a verification link to:
            </p>

            <p className="mt-2 break-all font-medium text-cyan-300">
                {email || "your email address"}
            </p>

            <p className="mt-5 text-sm leading-6 text-slate-500">
                Open the email and click the verification
                link to activate your email address.
            </p>

            <button
                type="button"
                onClick={resendEmail}
                disabled={loading || !email}
                className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold text-white transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
                {loading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                )}

                {loading
                    ? "Sending..."
                    : "Resend Verification Email"}
            </button>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <CheckCircle2 className="h-4 w-4" />
                Already verified?{" "}
                <Link
                    href="/dashboard"
                    className="text-cyan-300 hover:text-cyan-200"
                >
                    Continue to Dashboard
                </Link>
            </div>

        </div>
    );
}