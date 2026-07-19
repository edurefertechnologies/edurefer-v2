"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";

const plans = [
  {
    title: "PDF Kit",
    price: "₹500",
    description: "Quick learning resources for students.",
    features: [
      "Premium PDF Notes",
      "Interview Questions",
      "Lifetime Access",
      "Download Anytime",
    ],
    featured: false,
  },
  {
    title: "Premium Course",
    price: "₹5,000",
    description: "Complete industry-ready learning experience.",
    features: [
      "Video Course",
      "Projects",
      "Certificate",
      "Placement Assistance",
    ],
    featured: false,
  },
  {
    title: "Career Bundle",
    price: "₹5,500",
    oldPrice: "₹5,800",
    description: "Best value for students.",
    features: [
      "Premium Course",
      "PDF Kit",
      "AI Credits",
      "Certificate",
      "Placement Assistance",
      "Priority Support",
    ],
    featured: true,
  },
];

export default function Pricing() {
  return (
    <section className="bg-muted/30 py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Pricing
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Choose Your Learning Plan
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Flexible pricing designed for every learner. Start small or unlock
            everything with the Career Bundle.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                plan.featured
                  ? "border-primary shadow-xl ring-2 ring-primary/20"
                  : "border-border"
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                  ⭐ Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold">{plan.title}</h3>

              <p className="mt-3 text-muted-foreground">
                {plan.description}
              </p>

              <div className="mt-8">
                {plan.oldPrice && (
                  <span className="mr-2 text-lg text-muted-foreground line-through">
                    {plan.oldPrice}
                  </span>
                )}

                <span className="text-5xl font-bold">
                  {plan.price}
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <Check className="h-5 w-5 text-primary" />

                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href="/register"
                className="mt-10 block"
              >
                <Button
                  className="w-full"
                  variant={plan.featured ? "default" : "outline"}
                >
                  Get Started

                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}