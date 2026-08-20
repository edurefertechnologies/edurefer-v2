import Link from "next/link";
import {
    ArrowLeft,
    Mail,
    MapPin,
    Phone,
    Send,
} from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background px-4 py-12 text-foreground">
            <div className="mx-auto w-full max-w-6xl">
                {/* Back */}
                <Link
                    href="/"
                    className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Home
                </Link>

                {/* Header */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold md:text-5xl">
                        Contact Us
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Have questions about EduRefer? We'd love to hear from you.
                        Get in touch with our team.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {/* Contact Information */}
                    <div className="rounded-3xl border border-border bg-card/60 p-8 shadow-xl backdrop-blur-xl">
                        <h2 className="mb-7 text-2xl font-bold">
                            Get In Touch
                        </h2>

                        <div className="flex flex-col gap-7">
                            <ContactItem
                                icon={<Mail className="h-5 w-5" />}
                                title="Email"
                                value="solutions@edurefertech.com"
                            />

                            <ContactItem
                                icon={<Phone className="h-5 w-5" />}
                                title="Phone"
                                value="+91 96075-22003"
                            />

                            <ContactItem
                                icon={<MapPin className="h-5 w-5" />}
                                title="Location"
                                value="Pune, Maharashtra, India"
                            />
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="rounded-3xl border border-border bg-card/60 p-8 shadow-xl backdrop-blur-xl">
                        <h2 className="mb-7 text-2xl font-bold">
                            Send Message
                        </h2>

                        <form className="flex flex-col gap-5">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none transition focus:border-primary"
                            />

                            <input
                                type="email"
                                placeholder="Your Email"
                                className="rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none transition focus:border-primary"
                            />

                            <textarea
                                rows={5}
                                placeholder="Your Message"
                                className="resize-none rounded-xl border border-border bg-muted/50 px-4 py-3 outline-none transition focus:border-primary"
                            />

                            <button
                                type="submit"
                                className="flex items-center justify-center gap-2 rounded-xl bg-primary py-3 font-semibold text-primary-foreground transition hover:opacity-90"
                            >
                                <Send className="h-4 w-4" />
                                Send Message
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

function ContactItem({
    icon,
    title,
    value,
}: {
    icon: React.ReactNode;
    title: string;
    value: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                {icon}
            </div>

            <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                    {value}
                </p>
            </div>
        </div>
    );
}