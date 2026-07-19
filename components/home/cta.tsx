"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="section">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-primary/5 p-8 md:p-12 lg:p-16"
        >
          {/* Background Glow */}
          <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Ready to Build Your Career?
            </span>

            <h2 className="mt-6 text-4xl font-bold lg:text-6xl">
              Start Building Your
              <span className="text-gradient"> Dream Career</span>
              <br />
              Today.
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              Join thousands of learners mastering industry-ready skills with AI-powered courses,
              hands-on projects, verified certificates, and dedicated placement assistance.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/courses">
                <Button size="lg" className="min-w-[220px]">
                  Start Learning Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="min-w-[220px]"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Talk to an Advisor
                </Button>
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span>✓ AI Powered Learning </span>
              <span>✓ Industry Projects </span>
              <span>✓ Verified Certificates </span>
              <span>✓ Placement Assistance</span>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}