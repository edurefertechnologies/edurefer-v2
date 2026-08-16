"use client";

import { useEffect, useState } from "react";
import {
    Bell,
    BookOpen,
    CheckCircle2,
    CreditCard,
    Globe,
    KeyRound,
    Lock,
    Mail,
    Moon,
    Palette,
    Save,
    ShieldCheck,
    Sun,
    User,
    AlertTriangle,
} from "lucide-react";

import {
    updateSettings,
    type UpdateSettingsInput,
} from "@/actions/settings/update-settings";
import ChangePassword from "./change-password";
import EmailVerification from "./email-verification";

interface SettingsData {
    email: string;
    phone: string;
    emailVerified: boolean;

    courseNotifications: boolean;
    referralNotifications: boolean;
    orderNotifications: boolean;
    systemNotifications: boolean;

    theme: string;
    language: string;
}

interface Props {
    settings: SettingsData;
}

export default function SettingsPageClient({
    settings,
}: Props) {
    const [form, setForm] =
        useState<UpdateSettingsInput>({
            courseNotifications:
                settings.courseNotifications,

            referralNotifications:
                settings.referralNotifications,

            orderNotifications:
                settings.orderNotifications,

            systemNotifications:
                settings.systemNotifications,

            theme:
                settings.theme === "light" ||
                    settings.theme === "dark"
                    ? settings.theme
                    : "system",

            language:
                settings.language === "hi" ||
                    settings.language === "mr"
                    ? settings.language
                    : "en",
        });

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    /*
     * Keep the current application theme in sync
     * with the user's saved preference.
     */
    useEffect(() => {
        const root =
            document.documentElement;

        if (form.theme === "light") {
            root.classList.remove("dark");
            return;
        }

        if (form.theme === "dark") {
            root.classList.add("dark");
            return;
        }

        const prefersDark =
            window.matchMedia(
                "(prefers-color-scheme: dark)"
            ).matches;

        root.classList.toggle(
            "dark",
            prefersDark
        );
    }, [form.theme]);

    function updateField<
        K extends keyof UpdateSettingsInput
    >(
        field: K,
        value: UpdateSettingsInput[K]
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setSaved(false);
        setError("");
    }

    async function handleSave() {
        try {
            setSaving(true);
            setSaved(false);
            setError("");

            await updateSettings(form);

            setSaved(true);
        } catch (error) {
            console.error(
                "SETTINGS_UPDATE_ERROR:",
                error
            );

            setError(
                error instanceof Error
                    ? error.message
                    : "Unable to save settings."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="mx-auto w-full max-w-6xl space-y-6">

            {/* Header */}

            <div>
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-cyan-500/10 p-3">
                        <Palette className="h-6 w-6 text-cyan-300" />
                    </div>

                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Settings
                        </h1>

                        <p className="mt-1 text-sm text-slate-400">
                            Manage your account, security and
                            application preferences.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Grid */}

            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">

                {/* Main Settings */}

                <div className="space-y-6">

                    {/* Account */}

                    <SettingsCard
                        icon={User}
                        title="Account"
                        description="Manage your basic account information."
                    >
                        <div className="space-y-5">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Email Address
                                </label>

                                <div className="flex items-center gap-3">
                                    <div className="relative flex-1">
                                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

                                        <input
                                            value={settings.email}
                                            disabled
                                            className={inputClass(
                                                true
                                            )}
                                        />
                                    </div>

                                    <EmailVerification
                                        email={settings.email}
                                        emailVerified={settings.emailVerified}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-300">
                                    Phone Number
                                </label>

                                <input
                                    value={settings.phone}
                                    disabled
                                    className={inputClass(true)}
                                />

                                <p className="mt-2 text-xs text-slate-500">
                                    Phone number can be updated from
                                    your Profile.
                                </p>
                            </div>

                        </div>
                    </SettingsCard>

                    {/* Security */}

                    <SettingsCard
                        icon={ShieldCheck}
                        title="Security"
                        description="Keep your Edurefer account secure."
                    >
                        <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5">

                            <div className="flex items-start gap-4">

                                <div className="rounded-xl bg-blue-500/10 p-3">
                                    <KeyRound className="h-5 w-5 text-blue-300" />
                                </div>

                                <div className="flex-1">
                                    <h3 className="font-semibold text-white">
                                        Change Password
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-400">
                                        Update your password to keep your
                                        account protected.
                                    </p>
                                </div>

                                <ChangePassword />

                            </div>

                        </div>
                    </SettingsCard>

                    {/* Notifications */}

                    <SettingsCard
                        icon={Bell}
                        title="Notifications"
                        description="Choose which notifications you want to receive."
                    >
                        <div className="divide-y divide-white/10">

                            <ToggleRow
                                icon={BookOpen}
                                title="Course Updates"
                                description="Enrollment, learning and course related updates."
                                checked={
                                    form.courseNotifications
                                }
                                onChange={(value) =>
                                    updateField(
                                        "courseNotifications",
                                        value
                                    )
                                }
                            />

                            <ToggleRow
                                icon={User}
                                title="Referral Rewards"
                                description="Get notified when referral rewards are credited."
                                checked={
                                    form.referralNotifications
                                }
                                onChange={(value) =>
                                    updateField(
                                        "referralNotifications",
                                        value
                                    )
                                }
                            />

                            <ToggleRow
                                icon={CreditCard}
                                title="Orders & Payments"
                                description="Payment, order and purchase related notifications."
                                checked={
                                    form.orderNotifications
                                }
                                onChange={(value) =>
                                    updateField(
                                        "orderNotifications",
                                        value
                                    )
                                }
                            />

                            <ToggleRow
                                icon={Bell}
                                title="System Notifications"
                                description="Important announcements and system messages."
                                checked={
                                    form.systemNotifications
                                }
                                onChange={(value) =>
                                    updateField(
                                        "systemNotifications",
                                        value
                                    )
                                }
                            />

                        </div>
                    </SettingsCard>

                    {/* Appearance */}

                    <SettingsCard
                        icon={Palette}
                        title="Appearance"
                        description="Choose how Edurefer looks on your device."
                    >
                        <div className="grid gap-3 sm:grid-cols-3">

                            <ThemeButton
                                active={
                                    form.theme === "system"
                                }
                                icon={MonitorIcon}
                                title="System"
                                description="Use device setting"
                                onClick={() =>
                                    updateField(
                                        "theme",
                                        "system"
                                    )
                                }
                            />

                            <ThemeButton
                                active={
                                    form.theme === "light"
                                }
                                icon={Sun}
                                title="Light"
                                description="Light appearance"
                                onClick={() =>
                                    updateField(
                                        "theme",
                                        "light"
                                    )
                                }
                            />

                            <ThemeButton
                                active={
                                    form.theme === "dark"
                                }
                                icon={Moon}
                                title="Dark"
                                description="Dark appearance"
                                onClick={() =>
                                    updateField(
                                        "theme",
                                        "dark"
                                    )
                                }
                            />

                        </div>
                    </SettingsCard>

                    {/* Language */}

                    <SettingsCard
                        icon={Globe}
                        title="Language"
                        description="Choose your preferred application language."
                    >
                        <div className="grid gap-3 sm:grid-cols-3">

                            <LanguageButton
                                active={
                                    form.language === "en"
                                }
                                title="English"
                                subtitle="English"
                                onClick={() =>
                                    updateField(
                                        "language",
                                        "en"
                                    )
                                }
                            />

                            <LanguageButton
                                active={
                                    form.language === "hi"
                                }
                                title="हिन्दी"
                                subtitle="Hindi"
                                onClick={() =>
                                    updateField(
                                        "language",
                                        "hi"
                                    )
                                }
                            />

                            <LanguageButton
                                active={
                                    form.language === "mr"
                                }
                                title="मराठी"
                                subtitle="Marathi"
                                onClick={() =>
                                    updateField(
                                        "language",
                                        "mr"
                                    )
                                }
                            />

                        </div>

                        <p className="mt-4 text-xs text-slate-500">
                            Language preference is saved to your
                            account. Full application translation
                            will be enabled when the corresponding
                            language content is available.
                        </p>
                    </SettingsCard>

                    {/* Save */}

                    <div className="sticky bottom-4 z-20 rounded-2xl border border-white/10 bg-[#07111F]/95 p-4 shadow-2xl backdrop-blur-xl">

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                {saved && (
                                    <p className="flex items-center gap-2 text-sm text-emerald-400">
                                        <CheckCircle2 className="h-4 w-4" />
                                        Settings saved successfully.
                                    </p>
                                )}

                                {error && (
                                    <p className="text-sm text-red-400">
                                        {error}
                                    </p>
                                )}

                                {!saved && !error && (
                                    <p className="text-sm text-slate-500">
                                        Save your changes when you're done.
                                    </p>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saving}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                                <Save className="h-4 w-4" />

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </div>
                    </div>

                    {/* Danger Zone */}

                    <SettingsCard
                        icon={AlertTriangle}
                        title="Danger Zone"
                        description="Actions here can permanently affect your account."
                        danger
                    >
                        <div className="flex flex-col gap-4 rounded-xl border border-red-500/20 bg-red-500/5 p-5 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <h3 className="font-semibold text-red-300">
                                    Delete Account
                                </h3>

                                <p className="mt-1 text-sm text-slate-400">
                                    Permanently delete your Edurefer
                                    account and associated data.
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled
                                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-300 opacity-60"
                            >
                                Delete Account
                            </button>

                        </div>
                    </SettingsCard>

                </div>

                {/* Right Info */}

                <aside className="h-fit space-y-6 lg:sticky lg:top-6">

                    <div className="rounded-2xl border border-cyan-400/10 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent p-6">

                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10">
                            <Lock className="h-6 w-6 text-cyan-300" />
                        </div>

                        <h3 className="font-bold text-white">
                            Your Privacy Matters
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                            Your account preferences are linked
                            to your Edurefer account and are saved
                            securely.
                        </p>

                    </div>

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                        <h3 className="font-semibold text-white">
                            Account Information
                        </h3>

                        <div className="mt-4 space-y-4 text-sm">

                            <InfoRow
                                label="Email"
                                value={settings.email}
                            />

                            <InfoRow
                                label="Email Status"
                                value={
                                    settings.emailVerified
                                        ? "Verified"
                                        : "Not Verified"
                                }
                                valueClass={
                                    settings.emailVerified
                                        ? "text-emerald-400"
                                        : "text-amber-400"
                                }
                            />

                            <InfoRow
                                label="Theme"
                                value={
                                    form.theme
                                        .charAt(0)
                                        .toUpperCase() +
                                    form.theme.slice(1)
                                }
                            />

                            <InfoRow
                                label="Language"
                                value={
                                    form.language === "en"
                                        ? "English"
                                        : form.language === "hi"
                                            ? "Hindi"
                                            : "Marathi"
                                }
                            />

                        </div>

                    </div>

                </aside>

            </div>
        </div>
    );
}

/* ---------------- Components ---------------- */

function SettingsCard({
    icon: Icon,
    title,
    description,
    children,
    danger = false,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
    danger?: boolean;
}) {
    return (
        <section
            className={`rounded-2xl border bg-white/[0.03] p-6 ${danger
                ? "border-red-500/10"
                : "border-white/10"
                }`}
        >
            <div className="mb-6 flex items-center gap-4">

                <div
                    className={`rounded-xl p-3 ${danger
                        ? "bg-red-500/10"
                        : "bg-cyan-500/10"
                        }`}
                >
                    <Icon
                        className={`h-5 w-5 ${danger
                            ? "text-red-300"
                            : "text-cyan-300"
                            }`}
                    />
                </div>

                <div>
                    <h2 className="text-lg font-bold text-white">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        {description}
                    </p>
                </div>

            </div>

            {children}
        </section>
    );
}

function ToggleRow({
    icon: Icon,
    title,
    description,
    checked,
    onChange,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    checked: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <div className="flex items-center gap-4 py-5">

            <div className="hidden rounded-xl bg-white/5 p-3 sm:block">
                <Icon className="h-5 w-5 text-slate-300" />
            </div>

            <div className="flex-1">
                <h3 className="font-medium text-white">
                    {title}
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    {description}
                </p>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={() =>
                    onChange(!checked)
                }
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${checked
                    ? "bg-cyan-500"
                    : "bg-slate-700"
                    }`}
            >
                <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition ${checked
                        ? "left-6"
                        : "left-1"
                        }`}
                />
            </button>

        </div>
    );
}

function ThemeButton({
    active,
    icon: Icon,
    title,
    description,
    onClick,
}: {
    active: boolean;
    icon: React.ElementType;
    title: string;
    description: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-xl border p-4 text-left transition ${active
                ? "border-cyan-400/40 bg-cyan-400/10"
                : "border-white/10 bg-white/[0.02] hover:bg-white/5"
                }`}
        >
            <Icon
                className={`h-5 w-5 ${active
                    ? "text-cyan-300"
                    : "text-slate-400"
                    }`}
            />

            <p className="mt-3 font-semibold text-white">
                {title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
                {description}
            </p>
        </button>
    );
}

function LanguageButton({
    active,
    title,
    subtitle,
    onClick,
}: {
    active: boolean;
    title: string;
    subtitle: string;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`rounded-xl border p-4 text-left transition ${active
                ? "border-cyan-400/40 bg-cyan-400/10"
                : "border-white/10 bg-white/[0.02] hover:bg-white/5"
                }`}
        >
            <p className="font-semibold text-white">
                {title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
                {subtitle}
            </p>
        </button>
    );
}

function InfoRow({
    label,
    value,
    valueClass = "text-slate-300",
}: {
    label: string;
    value: string;
    valueClass?: string;
}) {
    return (
        <div className="flex items-center justify-between gap-4">
            <span className="text-slate-500">
                {label}
            </span>

            <span
                className={`max-w-[190px] truncate text-right ${valueClass}`}
            >
                {value}
            </span>
        </div>
    );
}

function inputClass(disabled = false) {
    return `w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none ${disabled
        ? "cursor-not-allowed opacity-60"
        : "focus:border-cyan-400/50"
        }`;
}

function MonitorIcon({
    className,
}: {
    className?: string;
}) {
    return (
        <svg
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect
                width="20"
                height="14"
                x="2"
                y="3"
                rx="2"
            />
            <line
                x1="8"
                x2="16"
                y1="21"
                y2="21"
            />
            <line
                x1="12"
                x2="12"
                y1="17"
                y2="21"
            />
        </svg>
    );
}