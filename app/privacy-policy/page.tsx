import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="h-8 w-8" />
          </div>

          <h1 className="text-4xl font-bold md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            At EduRefer, we respect your privacy and are committed to
            protecting your personal information and data.
          </p>
        </div>

        {/* Content */}
        <div className="rounded-3xl border border-border bg-card/60 p-6 shadow-xl backdrop-blur-xl md:p-10">
          <Section
            title="1. Information We Collect"
            text="We collect your name, email address, username and account information during registration and use of our platform."
          />

          <Section
            title="2. How We Use Your Data"
            text="Your information is used to manage your account, track referrals, process purchases, and improve our services."
          />

          <Section
            title="3. Payment Information"
            text="All payments are securely processed through Razorpay. EduRefer does not store your card details, banking information, or payment credentials."
          />

          <Section
            title="4. Data Sharing"
            text="We do not sell, rent, or share your personal information with third parties except where necessary for payment processing and legal compliance."
          />

          <Section
            title="5. Security"
            text="We implement appropriate security measures to safeguard your personal information against unauthorized access and misuse."
          />

          <Section
            title="6. Changes"
            text="This Privacy Policy may be updated periodically. Continued use of EduRefer indicates acceptance of any updates."
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