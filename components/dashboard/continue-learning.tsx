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
      <div className="relative overflow-hidden rounded-3xl border-white/10 bg-gradient-to-br from-[#11253E] via-[#0D1C2F] to-[#081421] p-8">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 shadow-xl">
          <BookOpen className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-lg font-semibold">
          Start Your Learning Journey
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Discover AI-powered courses, earn industry certificates and build your career.
        </p>

        <Link
          href="/courses"
          className="
inline-flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-emerald-500
px-6
py-3
font-semibold
text-white
shadow-lg
transition
hover:scale-105"
        >
          Explore Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-blue-500/10 blur-[120px]" />

      <div className="absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">

            Continue Learning

          </h2>

          <p className="text-sm text-slate-400">

            Resume where you left off

          </p>

        </div>

        {enrollments.length > 2 && (

          <Link
            href="/my-courses"
            className="text-cyan-300 hover:text-white"
          >

            View All →

          </Link>

        )}

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
              className="rounded-3xl border bg-white/[0.04] backdrop-blur-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-gradient-to-br from-blue-500/20 to-emerald-500/20 p-2">
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

                <div className="rounded-full bg-blue-500/10 px-3 py-1 text-sm font-bold text-cyan-300">

                  {progress}%

                </div>
              </div>

              <div className="mt-5">
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="
h-full
rounded-full
bg-gradient-to-r
from-blue-500
to-emerald-500
transition-all
duration-700
"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-5">
                <Link
                  href={learningHref}
                  className="
inline-flex
w-full
items-center
justify-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-emerald-500
px-4
py-3
font-semibold
text-white
shadow-lg
transition
hover:scale-[1.02]
"
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