import { redirect } from "next/navigation";

import { getLearningCourse } from "@/actions/courses/get-learning-course";
import CourseLearningPlayer from "@/components/learning/course-learning-player";

interface Props {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    lesson?: string;
  }>;
}

export default async function LearnCoursePage({
  params,
  searchParams,
}: Props) {
  const { slug } = await params;
  const { lesson: requestedLessonId } =
    await searchParams;

  const result = await getLearningCourse(slug);

  if (!result.success) {
    if (result.reason === "UNAUTHORIZED") {
      redirect("/login");
    }

    redirect(`/courses/${slug}`);
  }

  const { enrollment } = result;
  const { course } = enrollment;

  const allLessons = course.modules.flatMap(
    (module) => module.lessons
  );

  if (allLessons.length === 0) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center p-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold">
            Course content coming soon
          </h1>

          <p className="mt-2 text-muted-foreground">
            You are enrolled in this course, but lessons
            have not been added yet.
          </p>
        </div>
      </div>
    );
  }

  const selectedLesson =
    allLessons.find(
      (lesson) => lesson.id === requestedLessonId
    ) ?? allLessons[0];

  return (
    <CourseLearningPlayer
      enrollmentId={enrollment.id}
      progress={enrollment.progress}
      course={course}
      selectedLessonId={selectedLesson.id}
    />
  );
}