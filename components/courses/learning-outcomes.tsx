"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Database,
  Globe,
  Rocket,
  Briefcase,
  Award,
} from "lucide-react";

import Container from "@/components/layout/container";

const outcomes = [
  {
    icon: Globe,
    title: "Build Modern Websites",
    description:
      "Create responsive and production-ready websites using modern technologies.",
  },
  {
    icon: Code2,
    title: "Frontend Development",
    description:
      "Master React, Next.js, TypeScript and Tailwind CSS to build interactive UIs.",
  },
  {
    icon: Database,
    title: "Backend Development",
    description:
      "Develop secure REST APIs using Node.js, Express and PostgreSQL with Prisma.",
  },
  {
    icon: Rocket,
    title: "Deploy Applications",
    description:
      "Learn Git, GitHub, Vercel and cloud deployment for real-world projects.",
  },
  {
    icon: Briefcase,
    title: "Industry Ready",
    description:
      "Gain practical experience through projects, assignments and code reviews.",
  },
  {
    icon: Award,
    title: "Certification & Placement",
    description:
      "Receive a course certificate along with 100% Placement Assistance.",
  },
];

import type { CourseDetailsType } from "@/types/course";

interface Props {
  course: CourseDetailsType;
}

export default function LearningOutcomes({
  course,
}: Props) {
  void course;
  return (
    <section className="section">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            What You'll Learn
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            By the end of this course, you'll have the practical skills
            required to build modern applications and confidently start
            your software development career.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.08,
                }}
                className="glass-card group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/40"
              >
                <div className="mb-5 inline-flex rounded-xl bg-primary/10 p-3">
                  <Icon className="h-7 w-7 text-primary" />
                </div>

                <h3 className="text-xl font-semibold">
                  {item.title}
                </h3>

                <p className="mt-3 leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}