"use client";

import { CheckCircle2, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import Container from "@/components/layout/container";

const features = [
  "Lifetime Access",
  "Live Mentor Support",
  "15+ Real-world Projects",
  "Assignments & Assessments",
  "Certificate of Completion",
  "100% Placement Assistance",
];

export default function PricingCard() {
  return (
    <section className="section">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="glass-card rounded-3xl p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Left */}

              <div>
                <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                  Enroll Today
                </span>

                <h2 className="mt-6 text-4xl font-bold">
                  Start Your Learning Journey
                </h2>

                <p className="mt-5 leading-8 text-muted-foreground">
                  Get lifetime access to course materials, mentor support,
                  hands-on projects, assessments, certification, and
                  placement assistance.
                </p>

                <div className="mt-8 space-y-4">
                  {features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary" />

                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right */}

              <div className="rounded-2xl border border-primary/20 bg-background/50 p-8">
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Course Fee
                  </p>

                  <h3 className="mt-2 text-5xl font-bold text-primary">
                    ₹2999
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    One-time payment
                  </p>
                </div>

                <Button
                  size="lg"
                  className="mt-8 w-full"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Enroll Now
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="mt-4 w-full"
                >
                  Download Brochure
                </Button>

                <div className="mt-8 rounded-xl bg-primary/5 p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="mt-1 h-5 w-5 text-primary" />

                    <div>
                      <p className="font-semibold">
                        Placement Assistance
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        Resume building, mock interviews, portfolio reviews,
                        and career guidance are included with this course.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2 text-sm text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Duration</span>
                    <span>24 Weeks</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Mode</span>
                    <span>Online / Offline</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Certificate</span>
                    <span>Included</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Projects</span>
                    <span>15+</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}