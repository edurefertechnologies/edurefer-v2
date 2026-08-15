"use client";

import { useState } from "react";
import {
    User,
    GraduationCap,
    BriefcaseBusiness,
    MapPin,
    Link2,
    Mail,
    Save,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import { updateProfile } from "@/actions/profile/update-profile";
import type { ProfileForm } from "@/components/profile/types";

interface SettingsProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    image: string | null;
    emailVerified: boolean;

    profile: {
        headline: string;
        bio: string;
        address: string;
        city: string;
        state: string;
        country: string;
        pincode: string;

        college: string;
        university: string;
        degree: string;
        branch: string;
        passingYear?: number;

        currentCompany: string;
        designation: string;
        experience?: number;

        linkedin: string;
        github: string;
        portfolio: string;
        website: string;
    } | null;
}

interface Props {
    profile: SettingsProfile;
}

type Section = {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
};

const sections: Section[] = [
    {
        id: "personal",
        title: "Personal Information",
        description: "Manage your basic account information.",
        icon: User,
    },
    {
        id: "education",
        title: "Education",
        description: "Manage your academic information.",
        icon: GraduationCap,
    },
    {
        id: "experience",
        title: "Experience",
        description: "Manage your professional experience.",
        icon: BriefcaseBusiness,
    },
    {
        id: "address",
        title: "Address",
        description: "Manage your location details.",
        icon: MapPin,
    },
    {
        id: "social",
        title: "Social Links",
        description: "Manage your professional links.",
        icon: Link2,
    },
];

export default function SettingsPageClient({
    profile,
}: Props) {
    const [activeSection, setActiveSection] =
        useState("personal");

    const [form, setForm] = useState<ProfileForm>({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,

        headline: profile.profile?.headline ?? "",
        bio: profile.profile?.bio ?? "",

        address: profile.profile?.address ?? "",
        city: profile.profile?.city ?? "",
        state: profile.profile?.state ?? "",
        country: profile.profile?.country ?? "",
        pincode: profile.profile?.pincode ?? "",

        college: profile.profile?.college ?? "",
        university: profile.profile?.university ?? "",
        degree: profile.profile?.degree ?? "",
        branch: profile.profile?.branch ?? "",
        passingYear:
            profile.profile?.passingYear?.toString() ?? "",

        currentCompany:
            profile.profile?.currentCompany ?? "",
        designation:
            profile.profile?.designation ?? "",
        experience:
            profile.profile?.experience?.toString() ?? "",

        linkedin:
            profile.profile?.linkedin ?? "",
        github:
            profile.profile?.github ?? "",
        portfolio:
            profile.profile?.portfolio ?? "",
        website:
            profile.profile?.website ?? "",
    });

    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    function updateField(
        field: keyof ProfileForm,
        value: string
    ) {
        setForm((current) => ({
            ...current,
            [field]: value,
        }));

        setSuccess(false);
        setError("");
    }

    async function handleSave() {
        try {
            setSaving(true);
            setSuccess(false);
            setError("");

            await updateProfile({
                firstName: form.firstName.trim(),
                lastName: form.lastName.trim() || undefined,
                phone: form.phone.trim() || undefined,

                headline: form.headline.trim() || undefined,
                bio: form.bio.trim() || undefined,

                address: form.address.trim() || undefined,
                city: form.city.trim() || undefined,
                state: form.state.trim() || undefined,
                country: form.country.trim() || undefined,
                pincode: form.pincode.trim() || undefined,

                college: form.college.trim() || undefined,
                university:
                    form.university.trim() || undefined,
                degree: form.degree.trim() || undefined,
                branch: form.branch.trim() || undefined,

                passingYear: form.passingYear
                    ? Number(form.passingYear)
                    : undefined,

                currentCompany:
                    form.currentCompany.trim() || undefined,
                designation:
                    form.designation.trim() || undefined,

                experience: form.experience
                    ? Number(form.experience)
                    : undefined,

                linkedin:
                    form.linkedin.trim() || undefined,
                github:
                    form.github.trim() || undefined,
                portfolio:
                    form.portfolio.trim() || undefined,
                website:
                    form.website.trim() || undefined,
            });

            setSuccess(true);
        } catch (err) {
            console.error(
                "SETTINGS_UPDATE_ERROR:",
                err
            );

            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to update your profile."
            );
        } finally {
            setSaving(false);
        }
    }

    const inputClass =
        "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400/50 focus:bg-white/[0.06]";

    const labelClass =
        "mb-2 block text-sm font-medium text-slate-300";

    return (
        <div className="space-y-6">

            {/* Header */}

            <div>
                <h1 className="text-3xl font-bold text-white">
                    Settings
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                    Manage your Edurefer account and profile
                    information.
                </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[250px_1fr]">

                {/* Sidebar */}

                <aside className="h-fit rounded-2xl border border-white/10 bg-white/[0.03] p-3">

                    <div className="mb-3 px-3 py-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-cyan-300/70">
                            Account Settings
                        </p>
                    </div>

                    <div className="space-y-1">

                        {sections.map((section) => {
                            const Icon = section.icon;
                            const active =
                                activeSection === section.id;

                            return (
                                <button
                                    key={section.id}
                                    type="button"
                                    onClick={() =>
                                        setActiveSection(section.id)
                                    }
                                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition ${active
                                            ? "border border-cyan-400/20 bg-cyan-400/10 text-white"
                                            : "text-slate-400 hover:bg-white/5 hover:text-white"
                                        }`}
                                >
                                    <Icon
                                        className={`h-5 w-5 ${active
                                                ? "text-cyan-300"
                                                : "text-slate-500"
                                            }`}
                                    />

                                    <div className="min-w-0">
                                        <p className="text-sm font-medium">
                                            {section.title}
                                        </p>

                                        <p className="hidden text-xs text-slate-500 xl:block">
                                            {section.description}
                                        </p>
                                    </div>
                                </button>
                            );
                        })}

                    </div>

                    {/* Email status */}

                    <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">

                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-slate-400" />

                            <span className="text-xs font-medium text-slate-300">
                                Email Status
                            </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2">

                            {profile.emailVerified ? (
                                <>
                                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />

                                    <span className="text-xs text-emerald-400">
                                        Verified
                                    </span>
                                </>
                            ) : (
                                <>
                                    <AlertCircle className="h-4 w-4 text-amber-400" />

                                    <span className="text-xs text-amber-400">
                                        Not Verified
                                    </span>
                                </>
                            )}

                        </div>

                    </div>

                </aside>

                {/* Content */}

                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                    {/* Personal */}

                    {activeSection === "personal" && (
                        <SettingsSection
                            icon={User}
                            title="Personal Information"
                            description="Update your basic profile information."
                        >
                            <div className="grid gap-5 md:grid-cols-2">

                                <Field
                                    label="First Name"
                                    value={form.firstName}
                                    onChange={(value) =>
                                        updateField(
                                            "firstName",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                    required
                                />

                                <Field
                                    label="Last Name"
                                    value={form.lastName}
                                    onChange={(value) =>
                                        updateField(
                                            "lastName",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Email"
                                    value={profile.email}
                                    disabled
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Phone"
                                    value={form.phone}
                                    onChange={(value) =>
                                        updateField(
                                            "phone",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <div className="md:col-span-2">
                                    <Field
                                        label="Headline"
                                        value={form.headline}
                                        onChange={(value) =>
                                            updateField(
                                                "headline",
                                                value
                                            )
                                        }
                                        placeholder="Software Developer | AI Enthusiast"
                                        className={inputClass}
                                        labelClass={labelClass}
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className={labelClass}>
                                        Bio
                                    </label>

                                    <textarea
                                        rows={5}
                                        value={form.bio}
                                        onChange={(e) =>
                                            updateField(
                                                "bio",
                                                e.target.value
                                            )
                                        }
                                        placeholder="Tell us something about yourself..."
                                        className={inputClass}
                                    />
                                </div>

                            </div>
                        </SettingsSection>
                    )}

                    {/* Education */}

                    {activeSection === "education" && (
                        <SettingsSection
                            icon={GraduationCap}
                            title="Education"
                            description="Keep your academic information up to date."
                        >
                            <div className="grid gap-5 md:grid-cols-2">

                                <Field
                                    label="College"
                                    value={form.college}
                                    onChange={(value) =>
                                        updateField(
                                            "college",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="University"
                                    value={form.university}
                                    onChange={(value) =>
                                        updateField(
                                            "university",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Degree"
                                    value={form.degree}
                                    onChange={(value) =>
                                        updateField(
                                            "degree",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Branch"
                                    value={form.branch}
                                    onChange={(value) =>
                                        updateField(
                                            "branch",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Passing Year"
                                    type="number"
                                    value={form.passingYear}
                                    onChange={(value) =>
                                        updateField(
                                            "passingYear",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                            </div>
                        </SettingsSection>
                    )}

                    {/* Experience */}

                    {activeSection === "experience" && (
                        <SettingsSection
                            icon={BriefcaseBusiness}
                            title="Experience"
                            description="Manage your current professional information."
                        >
                            <div className="grid gap-5 md:grid-cols-2">

                                <Field
                                    label="Current Company"
                                    value={form.currentCompany}
                                    onChange={(value) =>
                                        updateField(
                                            "currentCompany",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Designation"
                                    value={form.designation}
                                    onChange={(value) =>
                                        updateField(
                                            "designation",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Experience (Years)"
                                    type="number"
                                    value={form.experience}
                                    onChange={(value) =>
                                        updateField(
                                            "experience",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                            </div>
                        </SettingsSection>
                    )}

                    {/* Address */}

                    {activeSection === "address" && (
                        <SettingsSection
                            icon={MapPin}
                            title="Address"
                            description="Manage your current location details."
                        >
                            <div className="grid gap-5 md:grid-cols-2">

                                <div className="md:col-span-2">
                                    <Field
                                        label="Address"
                                        value={form.address}
                                        onChange={(value) =>
                                            updateField(
                                                "address",
                                                value
                                            )
                                        }
                                        className={inputClass}
                                        labelClass={labelClass}
                                    />
                                </div>

                                <Field
                                    label="City"
                                    value={form.city}
                                    onChange={(value) =>
                                        updateField(
                                            "city",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="State"
                                    value={form.state}
                                    onChange={(value) =>
                                        updateField(
                                            "state",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Country"
                                    value={form.country}
                                    onChange={(value) =>
                                        updateField(
                                            "country",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Pincode"
                                    value={form.pincode}
                                    onChange={(value) =>
                                        updateField(
                                            "pincode",
                                            value
                                        )
                                    }
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                            </div>
                        </SettingsSection>
                    )}

                    {/* Social */}

                    {activeSection === "social" && (
                        <SettingsSection
                            icon={Link2}
                            title="Social Links"
                            description="Add your professional and portfolio links."
                        >
                            <div className="grid gap-5">

                                <Field
                                    label="LinkedIn"
                                    value={form.linkedin}
                                    onChange={(value) =>
                                        updateField(
                                            "linkedin",
                                            value
                                        )
                                    }
                                    placeholder="https://linkedin.com/in/username"
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="GitHub"
                                    value={form.github}
                                    onChange={(value) =>
                                        updateField(
                                            "github",
                                            value
                                        )
                                    }
                                    placeholder="https://github.com/username"
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Portfolio"
                                    value={form.portfolio}
                                    onChange={(value) =>
                                        updateField(
                                            "portfolio",
                                            value
                                        )
                                    }
                                    placeholder="https://yourportfolio.com"
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                                <Field
                                    label="Website"
                                    value={form.website}
                                    onChange={(value) =>
                                        updateField(
                                            "website",
                                            value
                                        )
                                    }
                                    placeholder="https://example.com"
                                    className={inputClass}
                                    labelClass={labelClass}
                                />

                            </div>
                        </SettingsSection>
                    )}

                    {/* Save */}

                    <div className="mt-8 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

                        <div className="text-sm">

                            {success && (
                                <p className="flex items-center gap-2 text-emerald-400">
                                    <CheckCircle2 className="h-4 w-4" />
                                    Profile updated successfully.
                                </p>
                            )}

                            {error && (
                                <p className="flex items-center gap-2 text-red-400">
                                    <AlertCircle className="h-4 w-4" />
                                    {error}
                                </p>
                            )}

                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg shadow-cyan-500/10 transition hover:from-cyan-400 hover:to-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            <Save className="h-4 w-4" />

                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                    </div>

                </section>
            </div>
        </div>
    );
}

function SettingsSection({
    icon: Icon,
    title,
    description,
    children,
}: {
    icon: React.ElementType;
    title: string;
    description: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <div className="mb-8 flex items-center gap-4">

                <div className="rounded-xl bg-cyan-500/10 p-3">
                    <Icon className="h-5 w-5 text-cyan-300" />
                </div>

                <div>
                    <h2 className="text-xl font-bold text-white">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                        {description}
                    </p>
                </div>

            </div>

            {children}
        </div>
    );
}

function Field({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    disabled = false,
    required = false,
    className,
    labelClass,
}: {
    label: string;
    value: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    type?: string;
    disabled?: boolean;
    required?: boolean;
    className: string;
    labelClass: string;
}) {
    return (
        <div>
            <label className={labelClass}>
                {label}

                {required && (
                    <span className="ml-1 text-red-400">
                        *
                    </span>
                )}
            </label>

            <input
                type={type}
                value={value}
                disabled={disabled}
                onChange={(e) =>
                    onChange?.(e.target.value)
                }
                placeholder={placeholder}
                className={`${className} ${disabled
                        ? "cursor-not-allowed opacity-60"
                        : ""
                    }`}
            />
        </div>
    );
}