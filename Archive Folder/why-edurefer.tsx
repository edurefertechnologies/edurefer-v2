"use client";

import { motion } from "framer-motion";
import {
  BrainCircuit,
  BriefcaseBusiness,
  GraduationCap,
  LaptopMinimal,
  ShieldCheck,
  Users,
} from "lucide-react";

import Container from "@/components/layout/container";

const features = [
  {
    icon: LaptopMinimal,
    title: "Project-Based Learning",
    description:
      "Build real-world applications and gain practical experience through hands-on projects.",
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Learning",
    description:
      "Learn faster with AI-assisted learning resources, personalized guidance, and smart assessments.",
  },
  {
    icon: GraduationCap,
    title: "Industry Certifications",
    description:
      "Earn professional certifications that strengthen your resume and improve career opportunities.",
  },
  {
    icon: BriefcaseBusiness,
    title: "100% Placement Assistance",
    description:
      "Receive resume reviews, interview preparation, career guidance, and placement assistance.",
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description:
      "Get guidance from experienced mentors and industry professionals throughout your learning journey.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Foundation",
    description:
      "Built on the experience of ITE Computer Institute and ITE Tech Solutions to deliver quality education.",
  },
];

export default function WhyEdurefer() {
  return (
    <section className="section">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Why Choose Edurefer?
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Everything You Need to
            <span className="text-gradient"> Learn, Build & Grow</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            We combine modern technology, practical learning, mentorship,
            certifications, and career support to help you become
            industry-ready.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="glass-card hover-lift"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}