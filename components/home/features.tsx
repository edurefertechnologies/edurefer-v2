"use client";

import { motion } from "framer-motion";
import {
  Brain,
  BookOpen,
  Award,
  Briefcase,
  Wallet,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Learning",
    description:
      "Learn faster with AI tools including mentor, quiz generator, notes and coding assistance.",
  },
  {
    icon: BookOpen,
    title: "Premium Courses",
    description:
      "Industry-focused courses designed to help you build real-world skills and projects.",
  },
  {
    icon: Award,
    title: "Verified Certificates",
    description:
      "Earn certificates after completing courses and showcase your achievements.",
  },
  {
    icon: Briefcase,
    title: "Placement Assistance",
    description:
      "Career guidance, interview preparation and placement assistance for learners.",
  },
  {
    icon: Wallet,
    title: "Refer & Earn",
    description:
      "Invite your friends, earn rewards and grow together through our referral program.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Access",
    description:
      "Access your purchased courses and digital resources anytime, anywhere.",
  },
];

export default function Features() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Why Choose Edurefer?
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Everything You Need
            <br />
            To Build Your Career
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Learn with AI, master in-demand skills, earn certificates,
            and grow your career through one modern learning platform.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                className="group rounded-3xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="mb-4 text-xl font-semibold">
                  {feature.title}
                </h3>

                <p className="leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}