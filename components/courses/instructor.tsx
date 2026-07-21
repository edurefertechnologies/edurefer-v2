import { GraduationCap } from "lucide-react";

import Container from "@/components/layout/container";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { CourseDetailsType } from "@/types/course";

interface Props {
  course: CourseDetailsType;
}

export default function Instructor({
  course,
}: Props) {
  return (
    <section className="section">
      <Container>
        <div className="mx-auto max-w-5xl">
          <div className="glass-card rounded-3xl p-8 lg:p-10">
            <div className="flex items-center gap-3">
              <GraduationCap className="h-7 w-7 text-primary" />

              <h2 className="text-3xl font-bold">
                Meet Your Instructor
              </h2>
            </div>

            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-start">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl font-bold">
                  IT
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <h3 className="text-2xl font-semibold">
                  ITE Computer Institute
                </h3>

                <p className="mt-2 text-primary">
                  Professional Software Training Institute
                </p>

                <p className="mt-5 leading-8 text-muted-foreground">
                  Learn directly from experienced industry professionals.
                  Every course is designed with practical projects,
                  real-world assignments, interview preparation, and
                  placement-focused training to help students become
                  job-ready.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border p-4 text-center">
                    <p className="text-3xl font-bold text-primary">
                      50+
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Students Trained
                    </p>
                  </div>

                  <div className="rounded-xl border p-4 text-center">
                    <p className="text-3xl font-bold text-primary">
                      15+
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Industry Projects
                    </p>
                  </div>

                  <div className="rounded-xl border p-4 text-center">
                    <p className="text-3xl font-bold text-primary">
                      100%
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Placement Support
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}