"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Briefcase, Award } from "lucide-react";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";

const heroData = {
  user: {
    firstName: "Learner",
  },
  subscription: {
    planName: "Free",
  },
  dashboard: {
    totalCourses: 20,
    totalPdfKits: 50,
    aiCredits: 300,
    progress: 78,
    wallet: 0,
  },
  bundle: {
    originalPrice: 6500,
    discountPrice: 5500,
  },
};

const stats = [
  {
    icon: BookOpen,
    value: "20+",
    label: "AI Courses",
  },
  {
    icon: Award,
    value: "50+",
    label: "Premium PDF Kits",
  },
  {
    icon: Briefcase,
    value: "100%",
    label: "Placement Assistance",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              🤖 AI-Powered Career Growth Platform
            </span>

            <h1 className="mt-6 text-5xl font-bold leading-tight lg:text-7xl">
              Learn.
              <br />
              <span className="text-gradient">
                Build.
              </span>
              <br />
              Get Certified.
              <br />
              Get Hired.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Master in-demand skills through AI-powered video courses,
              premium PDF kits, smart AI tools, industry-recognized
              certifications, and career-focused learning—all in one platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/courses"
                className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                Explore Learning Paths
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>

              <Link
                href="#bundles"
                className="inline-flex h-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-6 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/10"
              >
                View Bundles
              </Link>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
            rounded-full
          >
            <div className="glass-card rounded-3xl p-6 space-y-6">

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Welcome Back
                  </p>

                  <h3 className="text-xl font-bold">
                    Welcome, {heroData.user.firstName} 👋
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Continue your learning journey
                  </p>
                </div>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {heroData.subscription.planName}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.05]">
                  <p className="text-sm text-muted-foreground">
                    AI Courses
                  </p>

                  <h4 className="mt-2 text-2xl font-bold">
                    {heroData.dashboard.totalCourses}
                  </h4>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.05]">
                  <p className="text-sm text-muted-foreground">
                    PDF Kits
                  </p>

                  <h4 className="mt-2 text-2xl font-bold">
                    {heroData.dashboard.totalPdfKits}
                  </h4>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.05]">
                  <p className="text-sm text-muted-foreground">
                    AI Credits
                  </p>

                  <h4 className="mt-2 text-2xl font-bold">
                    {heroData.dashboard.aiCredits}
                  </h4>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white/[0.05]">
                  <p className="text-sm text-muted-foreground">
                    Wallet
                  </p>

                  <h4 className="mt-2 text-2xl font-bold">
                    ₹{heroData.dashboard.wallet}
                  </h4>
                </div>

              </div>

              <div>
                <div className="mb-2 flex justify-between text-sm">
                  <span>Learning Progress</span>
                  <span>{heroData.dashboard.progress}%</span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-700"
                    style={{
                      width: `${heroData.dashboard.progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 transition-all duration-300 hover:border-primary/30">
                <p className="font-semibold">
                  Career Bundle
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Includes AI Course, PDF Kit,
                  AI Credits & Certificate.
                </p>

                <div className="mt-3 flex items-center gap-3">
                  <span className="text-2xl font-bold">
                    ₹{heroData.bundle.discountPrice}
                  </span>

                  <span className="text-sm line-through text-muted-foreground">
                    ₹{heroData.bundle.originalPrice}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid gap-6 md:grid-cols-3">
          {stats.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.label}
                className="glass-card hover-lift flex min-h-[110px] items-center gap-5 rounded-2xl border border-white/10 px-6 py-5 transition-all duration-300 hover:border-primary/20"
              >
                <div className="rounded-2xl border border-primary/10 bg-primary/10 p-4 text-primary">
                  <Icon className="h-7 w-7" />
                </div>

                <div>
                  <h3 className="text-3xl font-bold">
                    {item.value}
                  </h3>

                  <p className="text-base text-muted-foreground">
                    {item.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}