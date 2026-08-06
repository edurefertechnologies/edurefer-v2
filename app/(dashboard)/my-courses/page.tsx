import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Clock3,
  Download,
  PlayCircle,
} from "lucide-react";

import { getMyCourses } from "@/actions/courses/get-my-courses";
import { LearningStats } from "@/components/my-learning/learning-stats";

export default async function MyCoursesPage() {
  const enrollments = await getMyCourses();
  const totalCourses = enrollments.length;

  const activeCourses = enrollments.filter(
    (course) => course.status === "ACTIVE"
  ).length;

  const completedCourses = enrollments.filter(
    (course) => course.status === "COMPLETED"
  ).length;

  const certificates = enrollments.filter(
    (course) => course.certificate
  ).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          My Courses
        </h1>

        <p className="mt-2 text-muted-foreground">
          Access your enrolled courses and track your learning progress.
        </p>
      </div>

      <LearningStats
        totalCourses={totalCourses}
        activeCourses={activeCourses}
        completedCourses={completedCourses}
        certificates={certificates}
      />

      {enrollments.length === 0 ? (
        <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border bg-card p-6 text-center">
          <div className="rounded-full bg-muted p-4">
            <BookOpen className="h-7 w-7" />
          </div>

          <h2 className="mt-4 text-lg font-semibold">
            No courses yet
          </h2>

          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            You haven't enrolled in any courses yet.
            Explore our courses and start learning.
          </p>

          <Link
            href="/courses"
            className="mt-5 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Explore Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {enrollments.map((enrollment) => {
            const allLessons =
              enrollment.course.modules.flatMap(
                (module) => module.lessons
              );

            const completedLessonIds = new Set(
              enrollment.lessonProgress.map(
                (item) => item.lessonId
              )
            );

            const completedLessons =
              completedLessonIds.size;

            const totalLessons = allLessons.length;

            const progress = Math.min(
              100,
              Math.max(
                0,
                Math.round(enrollment.progress)
              )
            );

            const completed =
              enrollment.status === "COMPLETED" ||
              progress >= 100;

            const nextIncompleteLesson =
              allLessons.find(
                (lesson) =>
                  !completedLessonIds.has(
                    lesson.id
                  )
              );

            const resumeLesson = completed
              ? allLessons[0]
              : nextIncompleteLesson ??
              allLessons[0];

            const learningHref = resumeLesson
              ? `/learn/${enrollment.course.slug}?lesson=${resumeLesson.id}`
              : `/learn/${enrollment.course.slug}`;

            return (
              <article
                key={enrollment.id}
                className="flex flex-col rounded-xl border bg-card p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="line-clamp-2 text-lg font-semibold">
                      {enrollment.course.title}
                    </h2>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span>
                        {completedLessons} /{" "}
                        {totalLessons} lessons
                      </span>

                      {enrollment.course.duration && (
                        <span className="flex items-center gap-1">
                          <Clock3 className="h-3.5 w-3.5" />
                          {enrollment.course.duration}
                        </span>
                      )}
                    </div>
                  </div>

                  {completed && (
                    <CheckCircle2 className="h-6 w-6 shrink-0 text-green-600" />
                  )}
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Progress
                    </span>

                    <span className="font-semibold">
                      {progress}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-auto space-y-3 pt-6">
                  <Link
                    href={learningHref}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
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

                  {completed && enrollment.certificate && (
                    <a
                      href={`/api/certificates/${encodeURIComponent(
                        enrollment.certificate.certificateNo
                      )}/download`}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                    >
                      <Download className="h-4 w-4" />
                      Download Certificate
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}