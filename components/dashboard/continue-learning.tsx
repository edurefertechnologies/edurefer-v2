import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  PlayCircle,
} from "lucide-react";

import { getMyCourses } from "@/actions/courses/get-my-courses";

export async function ContinueLearning() {
  const enrollments = await getMyCourses();
  const continueLearning = enrollments
    .filter(
      (course) => course.status === "ACTIVE"
    )
    .slice(0, 2);
  if (enrollments.length === 0) {
    return (
      <div className="rounded-xl border bg-card p-6">
        <h2 className="text-lg font-semibold">
          Continue Learning
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Start your learning journey by enrolling in your first course.
        </p>

        <Link
          href="/courses"
          className="mt-4 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">
          Continue Learning
        </h2>

        <p className="text-sm text-muted-foreground">
          Pick up where you left off.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {continueLearning.map((enrollment) => {
          const totalLessons =
            enrollment.course.modules.reduce(
              (total, module) =>
                total + module.lessons.length,
              0
            );

          const completedLessons =
            enrollment.lessonProgress.length;

          const progress = Math.min(
            100,
            Math.max(
              0,
              Math.round(enrollment.progress)
            )
          );

          // FIRST declare completed
          const completed =
            enrollment.status === "COMPLETED" ||
            progress >= 100;

          // Then calculate completed lesson IDs
          const completedLessonIds = new Set(
            enrollment.lessonProgress.map(
              (item) => item.lessonId
            )
          );

          const allLessons =
            enrollment.course.modules.flatMap(
              (module) => module.lessons
            );

          // Find first lesson which is not completed
          const nextIncompleteLesson =
            allLessons.find(
              (lesson) =>
                !completedLessonIds.has(lesson.id)
            );

          // Decide which lesson should open
          const resumeLesson = completed
            ? allLessons[0]
            : nextIncompleteLesson ?? allLessons[0];

          const learningHref = resumeLesson
            ? `/learn/${enrollment.course.slug}?lesson=${resumeLesson.id}`
            : `/learn/${enrollment.course.slug}`;

          return (
            <div
              key={enrollment.id}
              className="rounded-xl border bg-card p-5"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  {completed ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <BookOpen className="h-5 w-5 text-primary" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-semibold">
                    {enrollment.course.title}
                  </h3>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {completedLessons} of{" "}
                    {totalLessons} lessons completed
                  </p>
                </div>

                <span className="text-sm font-semibold">
                  {progress}%
                </span>
              </div>

              <div className="mt-5">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href={learningHref}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  {completed ? (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Review Course
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4" />
                      Continue Learning
                    </>
                  )}
                </Link>
              </div>

              {enrollments.length > 2 && (
                <div className="text-center">
                  <Link
                    href="/my-courses"
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    View all courses →
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}