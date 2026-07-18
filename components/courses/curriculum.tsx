"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { BookOpen, Clock3 } from "lucide-react";
import Container from "@/components/layout/container";

const curriculum = [
  {
    module: "Module 1 - HTML & CSS Fundamentals",
    duration: "2 Weeks",
    lessons: [
      "Introduction to Web Development",
      "HTML5 Basics",
      "Forms & Tables",
      "CSS Fundamentals",
      "Flexbox & Grid",
      "Responsive Design",
    ],
  },
  {
    module: "Module 2 - JavaScript Essentials",
    duration: "3 Weeks",
    lessons: [
      "Variables & Data Types",
      "Functions",
      "Arrays & Objects",
      "DOM Manipulation",
      "Events",
      "Async JavaScript",
    ],
  },
  {
    module: "Module 3 - React.js",
    duration: "4 Weeks",
    lessons: [
      "JSX",
      "Components",
      "Props",
      "State",
      "Hooks",
      "Routing",
    ],
  },
  {
    module: "Module 4 - Next.js",
    duration: "3 Weeks",
    lessons: [
      "App Router",
      "Layouts",
      "Server Components",
      "Client Components",
      "SEO",
      "Deployment",
    ],
  },
  {
    module: "Module 5 - Backend Development",
    duration: "5 Weeks",
    lessons: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "Authentication",
      "PostgreSQL",
      "Prisma ORM",
    ],
  },
];
export default function Curriculum() {
  return (
    <section className="section">
      <Container>
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold">
              Course Curriculum
            </h2>

            <p className="mt-4 text-muted-foreground">
              A step-by-step roadmap to master Full Stack Development.
            </p>
          </div>

          <Accordion
            className="space-y-4"
          >
            {curriculum.map((item, index) => (
              <AccordionItem
                key={index}
                value={`module-${index}`}
                className="glass-card border-0 px-6"
              >
                <AccordionTrigger>
                  <div className="flex w-full items-center justify-between pr-4">
                    <div className="flex items-center gap-3">
                      <BookOpen className="h-5 w-5 text-primary" />

                      <span className="font-semibold">
                        {item.module}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="h-4 w-4" />
                      {item.duration}
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <ul className="mt-4 space-y-3">
                    {item.lessons.map((lesson) => (
                      <li
                        key={lesson}
                        className="flex items-center gap-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary" />

                        {lesson}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}