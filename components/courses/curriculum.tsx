"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { BookOpen, Clock3 } from "lucide-react";
import Container from "@/components/layout/container";
import type { CourseDetailsType } from "@/types/course";

interface Props {
  course: CourseDetailsType;
}

export default function Curriculum({
  course,
}: Props) {
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
            {course.modules.map((item, index) => (
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
                        {item.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock3 className="h-4 w-4" />
                      {item.lessons.length} Lessons
                    </div>
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <ul className="mt-4 space-y-3">
                    {item.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-center gap-3"
                      >
                        <div className="h-2 w-2 rounded-full bg-primary" />

                        {lesson.title}
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