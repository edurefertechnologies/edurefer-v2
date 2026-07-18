"use client";

import { Mail } from "lucide-react";

import Container from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="pb-24">
      <Container>
        <div className="glass-card mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Mail className="h-8 w-8" />
          </div>

          <h2 className="mt-6 text-3xl font-bold">
            Stay Updated
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Get notified about new courses, workshops, internships,
            hackathons, and career opportunities.
          </p>

          <form className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              className="h-12"
            />

            <Button className="h-12 px-8">
              Subscribe
            </Button>
          </form>

          <p className="mt-4 text-xs text-muted-foreground">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </Container>
    </section>
  );
}