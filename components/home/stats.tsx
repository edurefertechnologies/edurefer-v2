"use client";

import { motion } from "framer-motion";
import {
  Users,
  GraduationCap,
  Award,
  Briefcase,
  Building2,
} from "lucide-react";

import Container from "@/components/layout/container";

const stats = [
  {
    icon: Users,
    value: "50+",
    label: "Students Trained",
  },
  {
    icon: GraduationCap,
    value: "25+",
    label: "Professional Courses",
  },
  {
    icon: Award,
    value: "1000+",
    label: "Certificates Issued",
  },
  {
    icon: Briefcase,
    value: "100%",
    label: "Placement Assistance",
  },
  {
    icon: Building2,
    value: "50+",
    label: "Hiring Partners",
  },
];

export default function Stats() {
  return (
    <section className="section">
      <Container>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="glass-card hover-lift text-center"
              >
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-3xl font-bold text-foreground">
                  {item.value}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}