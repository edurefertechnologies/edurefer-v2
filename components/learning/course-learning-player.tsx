"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Circle,
  Download,
  Menu,
  PlayCircle,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { completeLesson } from "@/actions/courses/complete-lesson";
import { useRef, useState, useTransition } from "react";
import { saveVideoProgress } from "@/actions/courses/save-video-progress";

type Lesson = {
  id: string;
  title: string;
  description: string | null;
  videoUrl: string | null;
  videoDuration: number | null;
  attachmentUrl: string | null;
  duration: number | null;
  isPreview: boolean;
  sortOrder: number;
};

type LessonProgress = {
  id: string;
  lessonId: string;
  completed: boolean;
  watchedSeconds: number;
  completedAt: Date | string | null;
};

type Module = {
  id: string;
  title: string;
  sortOrder: number;
  lessons: Lesson[];
};

type Course = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  level: string | null;
  duration: string | null;
  thumbnail: string | null;
  modules: Module[];
};

interface Props {
  enrollmentId: string;
  progress: number;
  lessonProgress: LessonProgress[];
  course: Course;
  selectedLessonId: string;
}

export default function CourseLearningPlayer({
  enrollmentId,
  progress,
  lessonProgress,
  course,
  selectedLessonId,
}: Props) {
  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();

  const [mobileCurriculumOpen, setMobileCurriculumOpen] =
    useState(false);

  const lessons = course.modules.flatMap(
    (module) => module.lessons
  );

  const selectedLesson =
    lessons.find(
      (lesson) => lesson.id === selectedLessonId
    ) ?? lessons[0];

  const currentIndex = lessons.findIndex(
    (lesson) => lesson.id === selectedLesson.id
  );

  const previousLesson =
    currentIndex > 0
      ? lessons[currentIndex - 1]
      : null;

  const nextLesson =
    currentIndex < lessons.length - 1
      ? lessons[currentIndex + 1]
      : null;

  const completedLessonIds = new Set(
    lessonProgress
      .filter((item) => item.completed)
      .map((item) => item.lessonId)
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const lastSavedTimeRef = useRef(0);

  const currentLessonProgress =
    lessonProgress.find(
      (item) => item.lessonId === selectedLesson.id
    );

  const savedWatchSeconds =
    currentLessonProgress?.watchedSeconds ?? 0;

  const saveCurrentVideoProgress = async (
    seconds: number
  ) => {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return;
    }

    const roundedSeconds = Math.floor(seconds);

    // Avoid unnecessary duplicate writes
    if (
      roundedSeconds <= lastSavedTimeRef.current
    ) {
      return;
    }

    lastSavedTimeRef.current = roundedSeconds;

    const result = await saveVideoProgress(
      enrollmentId,
      selectedLesson.id,
      roundedSeconds
    );

    if (!result.success) {
      console.error(
        "Unable to save video progress:",
        result.message
      );
    }
  };

  const isCurrentLessonCompleted =
    completedLessonIds.has(selectedLesson.id);

  const handleCompleteLesson = () => {
    if (isCurrentLessonCompleted) {
      return;
    }

    startTransition(async () => {
      const result = await completeLesson(
        enrollmentId,
        selectedLesson.id
      );

      if (!result.success) {
        alert(
          result.message ||
          "Unable to complete lesson."
        );

        return;
      }

      router.refresh();
    });
  };

  const handleCompleteAndContinue = () => {
    startTransition(async () => {
      // Current lesson already completed नसेल तर complete करा
      if (!isCurrentLessonCompleted) {
        const result = await completeLesson(
          enrollmentId,
          selectedLesson.id
        );

        if (!result.success) {
          alert(
            result.message ||
            "Unable to complete lesson."
          );
          return;
        }
      }

      // पुढच्या lesson वर जा
      if (nextLesson) {
        router.push(
          `/learn/${course.slug}?lesson=${nextLesson.id}`
        );
      } else {
        // Final lesson असल्यास refreshed 100% state दाखवा
        router.refresh();
      }
    });
  };

  const curriculum = (
    <div className="flex h-full flex-col">
      <div className="border-b p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Course
        </p>

        <h2 className="mt-1 font-semibold">
          {course.title}
        </h2>

        <div className="mt-4">
          <div className="mb-2 flex justify-between text-xs">
            <span>Progress</span>
            <span>
              {Math.round(progress)}%
            </span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full bg-primary transition-all"
              style={{
                width: `${Math.min(
                  Math.max(progress, 0),
                  100
                )}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {course.modules.map(
          (module, moduleIndex) => (
            <div
              key={module.id}
              className="border-b"
            >
              <div className="bg-muted/30 px-5 py-4">
                <p className="text-sm font-semibold">
                  Module {moduleIndex + 1}
                </p>

                <p className="mt-1 text-sm">
                  {module.title}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  {module.lessons.length} Lessons
                </p>
              </div>

              <div>
                {module.lessons.map(
                  (lesson, lessonIndex) => {
                    const active =
                      lesson.id ===
                      selectedLesson.id;
                    const completed =
                      completedLessonIds.has(lesson.id);

                    return (
                      <Link
                        key={lesson.id}
                        href={`/learn/${course.slug}?lesson=${lesson.id}`}
                        onClick={() =>
                          setMobileCurriculumOpen(
                            false
                          )
                        }
                        className={`flex gap-3 border-t px-5 py-4 transition ${active
                          ? "bg-primary/10"
                          : "hover:bg-muted/50"
                          }`}
                      >
                        <div className="mt-0.5">
                          {completed ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : active ? (
                            <PlayCircle className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`text-sm ${active
                              ? "font-semibold text-primary"
                              : "font-medium"
                              }`}
                          >
                            {lessonIndex + 1}.{" "}
                            {lesson.title}
                          </p>

                          {lesson.duration && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {lesson.duration} min
                            </p>
                          )}
                        </div>
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border hover:bg-muted"
            aria-label="Back to course"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>

          <div className="min-w-0">
            <p className="truncate font-semibold">
              {course.title}
            </p>

            <p className="hidden text-xs text-muted-foreground sm:block">
              {lessons.length} lessons
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            setMobileCurriculumOpen(true)
          }
          className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm lg:hidden"
        >
          <Menu className="h-4 w-4" />
          Curriculum
        </button>
      </header>

      <div className="flex">
        {/* Desktop curriculum */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-80 shrink-0 border-r bg-background lg:block xl:w-96">
          {curriculum}
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
            {/* Video */}
            <div className="overflow-hidden rounded-xl bg-black">
              {selectedLesson.videoUrl ? (
                <video
                  key={selectedLesson.id}
                  ref={videoRef}
                  controls
                  controlsList="nodownload"
                  className="aspect-video w-full"
                  src={selectedLesson.videoUrl}

                  onLoadedMetadata={(event) => {
                    const video = event.currentTarget;

                    if (
                      savedWatchSeconds > 0 &&
                      savedWatchSeconds < video.duration
                    ) {
                      video.currentTime = savedWatchSeconds;
                      lastSavedTimeRef.current =
                        savedWatchSeconds;
                    }
                  }}

                  onTimeUpdate={(event) => {
                    const video = event.currentTarget;
                    const currentSeconds = Math.floor(
                      video.currentTime
                    );

                    // Save approximately every 15 seconds
                    if (
                      currentSeconds -
                      lastSavedTimeRef.current >=
                      15
                    ) {
                      void saveCurrentVideoProgress(
                        currentSeconds
                      );
                    }
                  }}

                  onPause={(event) => {
                    void saveCurrentVideoProgress(
                      event.currentTarget.currentTime
                    );
                  }}

                  onEnded={(event) => {
                    void saveCurrentVideoProgress(
                      event.currentTarget.duration
                    );
                  }}
                >
                  Your browser does not support video playback.
                </video>
              ) : (
                <div className="flex aspect-video flex-col items-center justify-center p-6 text-center text-white">
                  <BookOpen className="mb-3 h-10 w-10 opacity-70" />

                  <p className="font-medium">
                    No video available for this
                    lesson.
                  </p>
                </div>
              )}
            </div>

            {/* Lesson */}
            <div className="py-6">
              <p className="text-sm font-medium text-primary">
                Lesson {currentIndex + 1} of{" "}
                {lessons.length}
              </p>

              <h1 className="mt-2 text-2xl font-bold sm:text-3xl">
                {selectedLesson.title}
              </h1>

              {selectedLesson.description && (
                <p className="mt-4 leading-7 text-muted-foreground">
                  {selectedLesson.description}
                </p>
              )}

              {selectedLesson.attachmentUrl && (
                <a
                  href={
                    selectedLesson.attachmentUrl
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  <Download className="h-4 w-4" />
                  Lesson Attachment
                </a>
              )}
            </div>

            <div className="mt-6">
              {isCurrentLessonCompleted ? (
                <div className="inline-flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  Lesson Completed
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleCompleteLesson}
                  disabled={isPending}
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <CheckCircle2 className="h-4 w-4" />

                  {isPending
                    ? "Updating..."
                    : "Mark as Complete"}
                </button>
              )}
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
              {previousLesson ? (
                <Link
                  href={`/learn/${course.slug}?lesson=${previousLesson.id}`}
                  className="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  Previous Lesson
                </Link>
              ) : (
                <div />
              )}

              <button
                type="button"
                onClick={handleCompleteAndContinue}
                disabled={isPending}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isPending ? (
                  "Updating..."
                ) : nextLesson ? (
                  <>
                    {isCurrentLessonCompleted
                      ? "Next Lesson"
                      : "Mark Complete & Continue"}

                    <ChevronRight className="h-4 w-4" />
                  </>
                ) : isCurrentLessonCompleted ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Course Completed
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Complete Course
                  </>
                )}
              </button>
            </div>
          </div>
        </main>
      </div >

      {/* Mobile curriculum drawer */}
      {
        mobileCurriculumOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <button
              type="button"
              aria-label="Close curriculum"
              className="absolute inset-0 bg-black/50"
              onClick={() =>
                setMobileCurriculumOpen(false)
              }
            />

            <div className="absolute inset-y-0 right-0 w-[88%] max-w-sm bg-background shadow-xl">
              <div className="absolute right-3 top-3 z-10">
                <button
                  type="button"
                  onClick={() =>
                    setMobileCurriculumOpen(false)
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background"
                  aria-label="Close curriculum"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {curriculum}
            </div>
          </div>
        )
      }
    </div >
  );
}