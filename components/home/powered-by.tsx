"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  Code2,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const organizations = [
  {
    icon: GraduationCap,
    title: "ITE Computer Institute",
    description:
      "Building strong educational foundations through professional training, certifications, and skill development.",
    href: "/about",
  },
  {
    icon: Code2,
    title: "ITE Tech Solutions",
    description:
      "Delivering modern software development, AI solutions, automation, web applications, and enterprise technology services.",
    href: "/about",
  },
];

export default function PoweredBy() {
  return (
    <section className="section">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Built on Experience
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Built on the Legacy of
            <span className="text-gradient"> Education </span>
            &
            <span className="text-gradient"> Technology</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Edurefer combines years of educational excellence and real-world
            software expertise to prepare learners for successful careers.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {organizations.map((org, index) => {
            const Icon = org.icon;

            return (
              <motion.div
                key={org.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{ once: true }}
                className="glass-card hover-lift"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary">
                  <Icon className="h-8 w-8" />
                </div>

                <h3 className="text-2xl font-semibold">
                  {org.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {org.description}
                </p>

                <Link href={org.href}>
                  <Button
                    variant="ghost"
                    className="mt-8 p-0 hover:bg-transparent"
                  >
                    Learn More

                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}