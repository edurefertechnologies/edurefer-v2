import Link from "next/link";
import { ArrowLeft, FileCheck } from "lucide-react";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background px-4 py-12 text-foreground">
            <div className="mx-auto w-full max-w-4xl">
                {/* Back */}
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary">
                        <FileCheck className="h-8 w-8" />
                    </div>

                    <h1 className="text-4xl font-bold md:text-5xl">
                        Terms & Conditions
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                        Welcome to EduRefer. By using our platform, you agree to the
                        following terms and conditions.
                    </p>
                </div>

                {/* Content */}
                <div className="rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-xl md:p-10">
                    <Section
                        title="1. Use of Platform"
                        text="You must provide accurate information during registration. Any misuse, fraudulent activity or policy violation may result in suspension or permanent termination of your account."
                    />

                    <Section
                        title="2. Products"
                        text="All digital products available on EduRefer are non-refundable once purchased and delivered."
                    />

                    <Section
                        title="3. Referral Earnings"
                        text="Users earn ₹300 for every successful referral purchase. Fake referrals, self-referrals, or fraudulent activities are strictly prohibited."
                    />

                    <Section
                        title="4. Withdrawals"
                        text="Minimum withdrawal amount is ₹600. Payments are processed to the UPI ID or payment details provided by the user."
                    />

                    <Section
                        title="5. Account Suspension"
                        text="EduRefer reserves the right to suspend or terminate accounts involved in suspicious, fraudulent, or abusive activity."
                    />

                    <Section
                        title="6. Changes"
                        text="EduRefer may update these terms and conditions at any time without prior notice."
                    />

                    <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
                        Last Updated: 2026
                    </div>
                </div>
            </div>
        </main>
    );
}

function Section({
    title,
    text,
}: {
    title: string;
    text: string;
}) {
    return (
        <section className="mb-8 last:mb-0">
            <h2 className="mb-3 text-xl font-semibold md:text-2xl">
                {title}
            </h2>

            <p className="leading-8 text-muted-foreground">
                {text}
            </p>
        </section>
    );
}