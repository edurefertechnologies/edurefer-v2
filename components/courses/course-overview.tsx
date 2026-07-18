"use client";

import { CheckCircle2 } from "lucide-react";

import Container from "@/components/layout/container";

const highlights = [
  "Industry-designed curriculum",
  "15+ Real-world Projects",
  "Hands-on Assignments",
  "Live Mentor Support",
  "Career Guidance & Resume Reviews",
  "100% Placement Assistance",
];

const prerequisites = [
  "No prior programming experience required",
  "Basic computer knowledge",
  "A laptop or desktop with internet access",
];

const audience = [
  "Students",
  "Fresh Graduates",
  "Working Professionals",
  "Career Switchers",
];

export default function CourseOverview() {
  return (
    <section className="section">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left */}
          <div>
            <h2 className="text-4xl font-bold">
              Course Overview
            </h2>

            <p className="mt-6 leading-8 text-muted-foreground">
              This program is designed to help learners become
              industry-ready by combining theoretical concepts with
              practical implementation. You'll work on real-world
              applications, build a strong portfolio, and gain
              confidence through hands-on learning.
            </p>

            <div className="mt-10">
              <h3 className="text-2xl font-semibold">
                Course Highlights
              </h3>

              <div className="mt-6 space-y-4">
                {highlights.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-primary" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-8">
            <div className="glass-card">
              <h3 className="text-xl font-semibold">
                Who Should Enroll?
              </h3>

              <div className="mt-5 space-y-3">
                {audience.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <h3 className="text-xl font-semibold">
                Prerequisites
              </h3>

              <div className="mt-5 space-y-3">
                {prerequisites.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary" />

                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass-card">
              <h3 className="text-xl font-semibold">
                After Completing This Course
              </h3>

              <p className="mt-5 leading-7 text-muted-foreground">
                You'll have the skills to build production-ready
                applications, create a professional portfolio, earn a
                certificate, and confidently apply for internships and
                full-time software development roles.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}