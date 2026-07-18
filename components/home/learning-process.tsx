"use client";

import { motion } from "framer-motion";
import {
  UserPlus,
  BookOpen,
  Laptop2,
  Award,
  ArrowRight,
} from "lucide-react";

import Container from "@/components/layout/container";

const steps = [
  {
    icon: UserPlus,
    step: "Step 1",
    title: "Enroll",
    description:
      "Choose the right career path and enroll in your preferred course with expert guidance.",
  },
  {
    icon: BookOpen,
    step: "Step 2",
    title: "Learn",
    description:
      "Attend interactive sessions, complete assignments, and strengthen your fundamentals.",
  },
  {
    icon: Laptop2,
    step: "Step 3",
    title: "Build Projects",
    description:
      "Work on real-world projects, portfolios, internships, and practical case studies.",
  },
  {
    icon: Award,
    step: "Step 4",
    title: "Get Certified & Career Ready",
    description:
      "Earn industry-recognized certifications with resume building, interview preparation, and placement assistance.",
  },
];

export default function LearningProcess() {
  return (
    <section className="section">
      <Container>
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Learning Journey
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Your Roadmap to
            <span className="text-gradient"> Career Success</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Our structured learning process helps you build practical skills,
            gain confidence, and prepare for real-world opportunities.
          </p>
        </div>

        {/* Timeline */}

        <div className="relative mt-20 grid gap-8 lg:grid-cols-4">
          {/* Connecting Line */}
          <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-border lg:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                className="relative z-10"
              >
                <div className="glass-card hover-lift h-full text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
                    <Icon className="h-8 w-8" />
                  </div>

                  <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-primary">
                    {step.step}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {step.title}
                  </h3>

                  <p className="mt-4 leading-7 text-muted-foreground">
                    {step.description}
                  </p>

                  {index !== steps.length - 1 && (
                    <div className="mt-8 flex justify-center lg:hidden">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}