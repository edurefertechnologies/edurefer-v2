"use client";

import { motion } from "framer-motion";
import {
  BadgeCheck,
  Briefcase,
  FileText,
  GraduationCap,
  MessageSquare,
  UserRoundSearch,
} from "lucide-react";

import Container from "@/components/layout/container";

const services = [
  {
    icon: FileText,
    title: "Resume Building",
    description:
      "Create an ATS-friendly resume that highlights your skills, projects, and achievements.",
  },
  {
    icon: MessageSquare,
    title: "Mock Interviews",
    description:
      "Practice technical and HR interviews with personalized feedback from mentors.",
  },
  {
    icon: GraduationCap,
    title: "Career Guidance",
    description:
      "Get one-on-one mentoring to choose the right technology stack and career path.",
  },
  {
    icon: Briefcase,
    title: "Internship Support",
    description:
      "Gain real-world experience through internships and industry-focused projects.",
  },
  {
    icon: UserRoundSearch,
    title: "Job Assistance",
    description:
      "Receive job referrals, interview opportunities, and guidance throughout your job search.",
  },
  {
    icon: BadgeCheck,
    title: "Placement Assistance",
    description:
      "Continuous support until you're ready to confidently pursue career opportunities.",
  },
];

export default function PlacementPartners() {
  return (
    <section className="section">
      <Container>
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Career Support
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            100% <span className="text-gradient">Placement Assistance</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Beyond learning, we help you prepare for your career with mentorship,
            interview preparation, resume reviews, and placement assistance.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
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
                  {service.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 rounded-3xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h3 className="text-2xl font-bold">
            Your Success Is Our Priority
          </h3>

          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            From your first day of learning to your first job interview, our
            team supports you with structured guidance, practical experience,
            and career-focused mentorship.
          </p>
        </div>
      </Container>
    </section>
  );
}