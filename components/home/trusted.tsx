"use client";

import { motion } from "framer-motion";

const companies = [
  "Microsoft",
  "Google",
  "Amazon",
  "Infosys",
  "TCS",
  "Accenture",
];

export default function Trusted() {
  return (
    <section className="border-y border-border bg-muted/30 py-12">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Skills for careers in leading companies
          </p>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {companies.map((company) => (
              <div
                key={company}
                className="flex h-16 items-center justify-center rounded-2xl border border-border bg-background font-semibold text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary hover:shadow-lg"
              >
                {company}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}