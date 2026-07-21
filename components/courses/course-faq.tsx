"use client";

import Container from "@/components/layout/container";
import type { CourseDetailsType } from "@/types/course";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I get lifetime access to the course?",
    answer:
      "Yes. Once enrolled, you will have lifetime access to all course content, including future updates.",
  },
  {
    question: "Will I receive a certificate?",
    answer:
      "Yes. A certificate of completion will be provided after successfully completing the course.",
  },
  {
    question: "Is placement assistance included?",
    answer:
      "Yes. We provide resume building, interview preparation, mock interviews, and placement guidance.",
  },
  {
    question: "Can beginners join this course?",
    answer:
      "Absolutely. The course starts from fundamentals and gradually moves to advanced concepts.",
  },
  {
    question: "Can I access the course on mobile?",
    answer:
      "Yes. You can access the course on desktop, laptop, tablet, and mobile devices.",
  },
];

interface Props {
  course: CourseDetailsType;
}

export default function CourseFaq({
  course,
}: Props) {
  return (
    <section className="section">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-center text-3xl font-bold">
            Frequently Asked Questions
          </h2>

          <Accordion className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                id={`item-${index}`}
              >
                <AccordionTrigger>
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
}