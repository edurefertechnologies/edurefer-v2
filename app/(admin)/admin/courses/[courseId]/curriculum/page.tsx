import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  CirclePlay,
  FileText,
  Plus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getCourseCurriculum } from "@/actions/admin/courses/get-course-curriculum";
import AddModuleDialog from "@/components/admin/courses/add-module-dialog";
import AddLessonDialog from "@/components/admin/courses/add-lesson-dialog";
import ModuleActions from "@/components/admin/courses/module-actions";
import LessonActions from "@/components/admin/courses/lesson-actions";

type Props = {
  params: Promise<{
    courseId: string;
  }>;
};

export default async function CurriculumPage({
  params,
}: Props) {
  const { courseId } = await params;

  const course = await getCourseCurriculum(courseId);

  if (!course) {
    notFound();
  }

  const totalLessons = course.modules.reduce(
    (total, module) => total + module.lessons.length,
    0
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            nativeButton={false}
            render={
              <Link
                href="/admin/courses"
                aria-label="Back to courses"
              >
                <ArrowLeft className="h-4 w-4" />
              </Link>
            }
          />

          <div>
            <h1 className="text-3xl font-bold">
              Curriculum
            </h1>

            <p className="text-muted-foreground">
              {course.title}
            </p>
          </div>
        </div>

        <AddModuleDialog courseId={course.id} />
      </div>

      {/* Course Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border bg-background p-5">
          <p className="text-sm text-muted-foreground">
            Modules
          </p>

          <p className="mt-1 text-2xl font-bold">
            {course.modules.length}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5">
          <p className="text-sm text-muted-foreground">
            Lessons
          </p>

          <p className="mt-1 text-2xl font-bold">
            {totalLessons}
          </p>
        </div>

        <div className="rounded-xl border bg-background p-5">
          <p className="text-sm text-muted-foreground">
            Status
          </p>

          <p className="mt-1 text-lg font-semibold">
            {course.status}
          </p>
        </div>
      </div>

      {/* Curriculum */}
      <section className="rounded-xl border bg-background">
        <div className="border-b px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-muted p-2">
              <BookOpen className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-semibold">
                Course Curriculum
              </h2>

              <p className="text-sm text-muted-foreground">
                Organize your course into modules and lessons.
              </p>
            </div>
          </div>
        </div>

        {course.modules.length === 0 ? (
          /* Empty state */
          <div className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 rounded-full bg-muted p-4">
              <BookOpen className="h-7 w-7" />
            </div>

            <h3 className="font-semibold">
              Your curriculum is empty
            </h3>

            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              Add your first module and then add lessons
              inside it to start building the course.
            </p>

            <div className="mt-5">
              <AddModuleDialog
                courseId={course.id}
                firstModule
              />
            </div>
          </div>
        ) : (
          /* Modules */
          <div className="space-y-4 p-6">
            {course.modules.map((module, moduleIndex) => (
              <div
                key={module.id}
                className="overflow-hidden rounded-xl border"
              >
                {/* Module Header */}
                <div className="flex items-center justify-between bg-muted/30 px-5 py-4">
                  <div className="flex items-center gap-3">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />

                    <div>
                      <p className="font-medium">
                        Module {moduleIndex + 1}:{" "}
                        {module.title}
                      </p>

                      <p className="text-xs text-muted-foreground">
                        {module.lessons.length}{" "}
                        {module.lessons.length === 1
                          ? "lesson"
                          : "lessons"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <AddLessonDialog
                      courseId={course.id}
                      moduleId={module.id}
                    />

                    <ModuleActions
                      courseId={course.id}
                      moduleId={module.id}
                      moduleTitle={module.title}
                      lessonCount={module.lessons.length}
                      isFirst={moduleIndex === 0}
                      isLast={
                        moduleIndex === course.modules.length - 1
                      }
                    />
                  </div>
                </div>

                {/* Lessons */}
                {module.lessons.length === 0 ? (
                  <div className="px-5 py-6 text-center text-sm text-muted-foreground">
                    No lessons in this module yet.
                  </div>
                ) : (
                  <div>
                    {module.lessons.map(
                      (lesson, lessonIndex) => (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between border-t px-5 py-4"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.videoUrl ? (
                              <CirclePlay className="h-4 w-4 text-muted-foreground" />
                            ) : (
                              <FileText className="h-4 w-4 text-muted-foreground" />
                            )}

                            <div>
                              <p className="text-sm font-medium">
                                {lessonIndex + 1}.{" "}
                                {lesson.title}
                              </p>

                              <div className="flex gap-2 text-xs text-muted-foreground">
                                {lesson.duration && (
                                  <span>
                                    {lesson.duration} min
                                  </span>
                                )}

                                {lesson.isPreview && (
                                  <span>• Preview</span>
                                )}
                              </div>
                            </div>
                          </div>

                          <LessonActions
                            courseId={course.id}
                            moduleId={module.id}
                            lesson={{
                              id: lesson.id,
                              title: lesson.title,
                              description: lesson.description,
                              videoUrl: lesson.videoUrl,
                              videoDuration: lesson.videoDuration,
                              attachmentUrl: lesson.attachmentUrl,
                              duration: lesson.duration,
                              isPreview: lesson.isPreview,
                            }}
                            isFirst={lessonIndex === 0}
                            isLast={
                              lessonIndex === module.lessons.length - 1
                            }
                          />
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}