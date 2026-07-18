"use client";

import Container from "@/components/layout/container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Who can enroll in Edurefer courses?",
    answer:
      "Our courses are designed for students, fresh graduates, working professionals, and anyone looking to upskill or switch careers in technology.",
  },
  {
    question: "Do I need prior programming knowledge?",
    answer:
      "No. We offer beginner-friendly courses as well as advanced programs. You can choose the course that matches your current skill level.",
  },
  {
    question: "Will I receive a certificate after completion?",
    answer:
      "Yes. Learners who successfully complete the course requirements will receive a course completion certificate.",
  },
  {
    question: "Do you provide placement assistance?",
    answer:
      "Yes. We provide 100% placement assistance through resume reviews, interview preparation, career guidance, and job referrals. Placement assistance does not guarantee employment.",
  },
  {
    question: "Are the classes online or offline?",
    answer:
      "We offer both online and offline learning options depending on the course and batch availability.",
  },
  {
    question: "How do I contact the Edurefer team?",
    answer:
      "You can contact us through our Contact page, email, or phone. Our team will help you choose the right course and answer your questions.",
  },
];

export default function FAQ() {
  return (
    <section className="section">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Frequently Asked Questions
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Got Questions?
            <span className="text-gradient"> We've Got Answers</span>
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Find answers to the most common questions about our courses,
            certifications, and placement assistance.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <Accordion className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-card rounded-2xl border px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="leading-7 text-muted-foreground">
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