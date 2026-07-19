"use client";

import { motion } from "framer-motion";
import {
  Bot,
  FileText,
  Brain,
  Code2,
  MessageSquare,
  Sparkles,
} from "lucide-react";

const tools = [
  {
    icon: Bot,
    title: "AI Mentor",
    description:
      "Get instant explanations, guidance and personalized learning support 24/7.",
  },
  {
    icon: FileText,
    title: "Notes Generator",
    description:
      "Generate clean and structured study notes from your learning materials.",
  },
  {
    icon: Brain,
    title: "Quiz Generator",
    description:
      "Practice with AI-generated quizzes and improve your understanding.",
  },
  {
    icon: Code2,
    title: "Code Assistant",
    description:
      "Debug code, learn concepts and receive coding suggestions instantly.",
  },
  {
    icon: MessageSquare,
    title: "Interview Coach",
    description:
      "Prepare for technical and HR interviews with AI-powered mock sessions.",
  },
  {
    icon: Sparkles,
    title: "Resume Builder",
    description:
      "Create ATS-friendly resumes and improve your chances of getting hired.",
  },
];

export default function AITools() {
  return (
    <section className="py-24">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            AI Powered Learning
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Learn Smarter with AI
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Every learner gets access to powerful AI tools that make studying,
            coding, interview preparation and career growth faster.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool, index) => {
            const Icon = tool.icon;

            return (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                className="group rounded-3xl border border-border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-xl"
              >
                <div className="mb-6 inline-flex rounded-2xl bg-primary/10 p-4 text-primary transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold">
                  {tool.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {tool.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}