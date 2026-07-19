"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import Container from "@/components/layout/container";

const testimonials = [
  {
    name: "Anonymous Learner",
    role: "Full Stack Development",
    status: "Verified Learner",
    rating: 5,
    review:
      "Edurefer helped me build practical skills through projects and mentorship. The learning experience was excellent.",
  },
  {
    name: "Anonymous Learner",
    role: "Python & AI",
    status: "Verified Learner",
    rating: 5,
    review:
      "The course structure was easy to follow and the projects gave me confidence for interviews.",
  },
  {
    name: "Anonymous Learner",
    role: "Java Backend",
    status: "Verified Learner",
    rating: 5,
    review:
      "From resume preparation to interview guidance, the overall learning journey was very valuable.",
  },
];

export default function Testimonials() {
  return (
    <section className="section">
      <Container>
        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Student Success Stories
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            What Our
            <span className="text-gradient">
              {" "}
              Learners Say
            </span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Real learning experiences shared by students who completed
            industry-focused programs.
          </p>
        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: index * 0.12,
              }}
              className="glass-card hover-lift h-full"
            >
              <div className="flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-lg font-bold text-primary">
                  {item.name.charAt(0)}
                </div>

                <Quote className="h-8 w-8 text-primary/40" />
              </div>

              <Quote className="h-10 w-10 text-primary" />

              <div className="mt-5 flex">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>

              <p className="mt-6 leading-7 text-muted-foreground">
                "{item.review}"
              </p>

              <div className="mt-8 border-t border-border pt-6">
                <h4 className="font-semibold">
                  {item.name}
                </h4>

                <p className="text-sm text-muted-foreground">
                  {item.role}
                </p>

                <p className="mt-1 text-sm font-medium text-primary">
                  {item.status}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}