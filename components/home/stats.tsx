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
    <section className="relative py-16 sm:py-20">
      <Container>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
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
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  p-7
                  text-center
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-cyan-400/30
                  hover:bg-white/[0.07]
                  hover:shadow-[0_20px_50px_rgba(0,0,0,0.25)]
                "
              >
                {/* Glow */}
                <div
                  className="
                    pointer-events-none
                    absolute
                    -right-10
                    -top-10
                    h-28
                    w-28
                    rounded-full
                    bg-cyan-400/10
                    blur-3xl
                    transition-all
                    duration-300
                    group-hover:bg-cyan-400/20
                  "
                />

                {/* Icon */}
                <div
                  className="
                    relative
                    mx-auto
                    mb-5
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    border
                    border-cyan-400/10
                    bg-cyan-400/10
                    text-cyan-300
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                >
                  <Icon className="h-7 w-7" />
                </div>

                {/* Value */}
                <h3 className="relative text-3xl font-bold tracking-tight text-white">
                  {item.value}
                </h3>

                {/* Label */}
                <p className="relative mt-2 text-sm text-slate-400">
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