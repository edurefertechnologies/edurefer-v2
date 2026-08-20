import Link from "next/link";
import { ArrowLeft, RotateCcw } from "lucide-react";

export default function RefundPage() {
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
                        <RotateCcw className="h-8 w-8" />
                    </div>

                    <h1 className="text-4xl font-bold md:text-5xl">
                        Refund Policy
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
                        All products sold on EduRefer are digital products. Please read
                        our refund policy carefully before making a purchase.
                    </p>
                </div>

                {/* Content */}
                <div className="rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-xl md:p-10">
                    <Section
                        title="1. No Refund Policy"
                        text="Once a digital product has been purchased and delivered, the order is considered final and non-refundable."
                    />

                    <Section
                        title="2. Exceptions"
                        text="Refunds may only be considered in cases of duplicate payments, accidental multiple charges, or verified technical errors during payment processing."
                    />

                    <Section
                        title="3. Fraud Policy"
                        text="Any misuse of the platform, fraudulent activities, fake referrals, chargeback abuse, or policy violations may result in cancellation of earnings and suspension of the user account."
                    />

                    <Section
                        title="4. Contact"
                        text="For refund-related concerns or payment issues, please contact EduRefer support within 24 hours of the transaction."
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