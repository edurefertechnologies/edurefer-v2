"use client";

import { useState } from "react";
import { Eye, EyeOff, KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] =
        useState("");

    const [newPassword, setNewPassword] =
        useState("");

    const [confirmPassword, setConfirmPassword] =
        useState("");

    const [loading, setLoading] =
        useState(false);

    const [showCurrent, setShowCurrent] =
        useState(false);

    const [showNew, setShowNew] =
        useState(false);

    const [showConfirm, setShowConfirm] =
        useState(false);

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!currentPassword) {
            toast.error("Enter your current password.");
            return;
        }

        if (!newPassword) {
            toast.error("Enter a new password.");
            return;
        }

        if (newPassword.length < 8) {
            toast.error(
                "New password must be at least 8 characters."
            );
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error(
                "New password and confirmation do not match."
            );
            return;
        }

        if (currentPassword === newPassword) {
            toast.error(
                "New password must be different from your current password."
            );
            return;
        }

        try {
            setLoading(true);

            const { error } =
                await authClient.changePassword({
                    currentPassword,
                    newPassword,
                    revokeOtherSessions: true,
                });

            if (error) {
                toast.error(
                    error.message ||
                    "Unable to change your password."
                );
                return;
            }

            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");

            toast.success(
                "Password changed successfully."
            );
        } catch (error) {
            console.error(
                "CHANGE_PASSWORD_ERROR:",
                error
            );

            toast.error(
                "Something went wrong while changing your password."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">

            <div className="mb-6 flex items-start gap-4">

                <div className="rounded-xl bg-blue-500/10 p-3">
                    <KeyRound className="h-5 w-5 text-blue-300" />
                </div>

                <div>
                    <h3 className="font-semibold text-white">
                        Change Password
                    </h3>

                    <p className="mt-1 text-sm text-slate-400">
                        Update your password to keep your
                        account secure.
                    </p>
                </div>

            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-5"
            >

                <PasswordField
                    label="Current Password"
                    value={currentPassword}
                    onChange={setCurrentPassword}
                    show={showCurrent}
                    onToggle={() =>
                        setShowCurrent((value) => !value)
                    }
                    disabled={loading}
                />

                <PasswordField
                    label="New Password"
                    value={newPassword}
                    onChange={setNewPassword}
                    show={showNew}
                    onToggle={() =>
                        setShowNew((value) => !value)
                    }
                    disabled={loading}
                />

                <PasswordField
                    label="Confirm New Password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    show={showConfirm}
                    onToggle={() =>
                        setShowConfirm((value) => !value)
                    }
                    disabled={loading}
                />

                <div className="flex justify-end pt-2">

                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        {loading && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}

                        {loading
                            ? "Updating..."
                            : "Update Password"}
                    </button>

                </div>

            </form>
        </div>
    );
}

function PasswordField({
    label,
    value,
    onChange,
    show,
    onToggle,
    disabled,
}: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    show: boolean;
    onToggle: () => void;
    disabled: boolean;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
                {label}
            </label>

            <div className="relative">

                <input
                    type={show ? "text" : "password"}
                    value={value}
                    onChange={(event) =>
                        onChange(event.target.value)
                    }
                    disabled={disabled}
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-12 text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400/50 disabled:cursor-not-allowed disabled:opacity-60"
                    placeholder="••••••••"
                />

                <button
                    type="button"
                    onClick={onToggle}
                    disabled={disabled}
                    aria-label={
                        show
                            ? "Hide password"
                            : "Show password"
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 transition hover:bg-white/5 hover:text-white"
                >
                    {show ? (
                        <EyeOff className="h-4 w-4" />
                    ) : (
                        <Eye className="h-4 w-4" />
                    )}
                </button>

            </div>
        </div>
    );
}