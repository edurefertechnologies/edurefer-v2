import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Circle,
  Clock3,
  CreditCard,
  GraduationCap,
  Mail,
  Phone,
  User,
} from "lucide-react";

import { getEnrollmentDetails } from "@/actions/admin/enrollments/get-enrollment-details";

interface Props {
  params: Promise<{
    enrollmentId: string;
  }>;
}

export default async function EnrollmentDetailsPage({
  params,
}: Props) {
  const { enrollmentId } = await params;

  const enrollment =
    await getEnrollmentDetails(enrollmentId);

  if (!enrollment) {
    notFound();
  }

  const studentName = [
    enrollment.user.firstName,
    enrollment.user.lastName,
  ]
    .filter(Boolean)
    .join(" ");

  const progressMap = new Map(
    enrollment.lessonProgress.map(
      (progress: any) => [
        progress.lessonId,
        progress,
      ]
    )
  );

  const totalLessons =
    enrollment.course.modules.reduce(
      (total: number, module: any) =>
        total + module.lessons.length,
      0
    );

  const completedLessons =
    enrollment.lessonProgress.filter(
      (progress: any) => progress.completed
    ).length;

  const progress = Math.round(
    enrollment.progress
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <Link
          href="/admin/enrollments"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Enrollments
        </Link>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Enrollment Details
            </h1>

            <p className="mt-2 text-muted-foreground">
              View student learning progress,
              payment and certificate details.
            </p>
          </div>

          <StatusBadge
            status={enrollment.status}
          />
        </div>
      </div>

      {/* Student + Course */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Student */}
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <User className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Student
              </p>

              <h2 className="text-lg font-semibold">
                {studentName}
              </h2>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm">
                {enrollment.user.email}
              </span>
            </div>

            {enrollment.user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />

                <span className="text-sm">
                  {enrollment.user.phone}
                </span>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Clock3 className="h-4 w-4 text-muted-foreground" />

              <span className="text-sm">
                Enrolled{" "}
                {formatDate(
                  enrollment.enrolledAt
                )}
              </span>
            </div>
          </div>
        </section>

        {/* Course */}
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Course
              </p>

              <h2 className="text-lg font-semibold">
                {enrollment.course.title}
              </h2>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
            {enrollment.course.level && (
              <span>
                Level:{" "}
                {enrollment.course.level}
              </span>
            )}

            {enrollment.course.duration && (
              <span>
                Duration:{" "}
                {enrollment.course.duration}
              </span>
            )}
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm">
              <span>
                {completedLessons}/
                {totalLessons} lessons
              </span>

              <span className="font-semibold">
                {progress}%
              </span>
            </div>

            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{
                  width: `${Math.min(
                    100,
                    Math.max(0, progress)
                  )}%`,
                }}
              />
            </div>
          </div>
        </section>
      </div>

      {/* Curriculum Progress */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">
            Curriculum Progress
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Lesson-by-lesson learning
            activity.
          </p>
        </div>

        <div className="divide-y">
          {enrollment.course.modules.map(
            (module: any) => (
              <div
                key={module.id}
                className="p-6"
              >
                <h3 className="font-semibold">
                  {module.title}
                </h3>

                <div className="mt-4 space-y-2">
                  {module.lessons.map(
                    (lesson: any) => {
                      const lessonProgress =
                        progressMap.get(
                          lesson.id
                        ) as any;

                      const completed =
                        lessonProgress
                          ?.completed === true;

                      return (
                        <div
                          key={lesson.id}
                          className="flex items-center justify-between gap-4 rounded-lg border p-3"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            {completed ? (
                              <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" />
                            ) : (
                              <Circle className="h-5 w-5 shrink-0 text-muted-foreground" />
                            )}

                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {lesson.title}
                              </p>

                              {lessonProgress
                                ?.watchedSeconds >
                                0 && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  Watched{" "}
                                  {formatDuration(
                                    lessonProgress.watchedSeconds
                                  )}
                                </p>
                              )}
                            </div>
                          </div>

                          {completed ? (
                            <div className="shrink-0 text-right">
                              <span className="text-xs font-medium text-primary">
                                Completed
                              </span>

                              {lessonProgress.completedAt && (
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {formatDate(
                                    lessonProgress.completedAt
                                  )}
                                </p>
                              )}
                            </div>
                          ) : (
                            <span className="shrink-0 text-xs text-muted-foreground">
                              Pending
                            </span>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* Payment + Certificate */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Order / Payment */}
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-semibold">
              Order & Payment
            </h2>
          </div>

          {enrollment.order ? (
            <div className="mt-6 space-y-4">
              <DetailRow
                label="Order Number"
                value={
                  enrollment.order
                    .orderNumber
                }
              />

              <DetailRow
                label="Order Status"
                value={
                  enrollment.order.status
                }
              />

              <DetailRow
                label="Total"
                value={`₹${Number(
                  enrollment.order.total
                ).toLocaleString(
                  "en-IN"
                )}`}
              />

              {enrollment.order.payment ? (
                <>
                  <div className="border-t pt-4" />

                  <DetailRow
                    label="Payment Status"
                    value={
                      enrollment.order
                        .payment.status
                    }
                  />

                  <DetailRow
                    label="Method"
                    value={
                      enrollment.order
                        .payment.method ??
                      "—"
                    }
                  />

                  {enrollment.order.payment
                    .razorpayPaymentId && (
                    <DetailRow
                      label="Payment ID"
                      value={
                        enrollment.order
                          .payment
                          .razorpayPaymentId
                      }
                    />
                  )}

                  {enrollment.order.payment
                    .paidAt && (
                    <DetailRow
                      label="Paid On"
                      value={formatDate(
                        enrollment.order
                          .payment.paidAt
                      )}
                    />
                  )}
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No payment record.
                </p>
              )}
            </div>
          ) : (
            <div className="mt-6 rounded-lg bg-muted/50 p-4">
              <p className="text-sm text-muted-foreground">
                This enrollment does not
                have an associated order.
              </p>
            </div>
          )}
        </section>

        {/* Certificate */}
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <Award className="h-5 w-5 text-primary" />

            <h2 className="text-lg font-semibold">
              Certificate
            </h2>
          </div>

          {enrollment.certificate ? (
            <div className="mt-6 space-y-4">
              <DetailRow
                label="Status"
                value="Issued"
              />

              <DetailRow
                label="Certificate No."
                value={
                  enrollment.certificate
                    .certificateNo
                }
              />

              <DetailRow
                label="Issued On"
                value={formatDate(
                  enrollment.certificate
                    .issuedAt
                )}
              />

              <div className="grid gap-3 pt-3 sm:grid-cols-2">
                <a
                  href={`/api/certificates/${encodeURIComponent(
                    enrollment.certificate
                      .certificateNo
                  )}/download`}
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  <Award className="h-4 w-4" />
                  Download
                </a>

                <Link
                  href={`/verify-certificate/${encodeURIComponent(
                    enrollment.certificate
                      .certificateNo
                  )}`}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2.5 text-sm font-medium transition hover:bg-muted"
                >
                  Verify
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-6 rounded-lg bg-muted/50 p-5 text-center">
              <Award className="mx-auto h-7 w-7 text-muted-foreground" />

              <p className="mt-3 font-medium">
                Certificate not issued
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                A certificate is generated
                after 100% course completion.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-5 text-sm">
      <span className="shrink-0 text-muted-foreground">
        {label}
      </span>

      <span className="break-all text-right font-medium">
        {value}
      </span>
    </div>
  );
}

function StatusBadge({
  status,
}: {
  status: string;
}) {
  if (status === "COMPLETED") {
    return (
      <span className="w-fit rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
        Completed
      </span>
    );
  }

  if (status === "ACTIVE") {
    return (
      <span className="w-fit rounded-full bg-green-500/10 px-3 py-1.5 text-sm font-medium text-green-600">
        Active
      </span>
    );
  }

  return (
    <span className="w-fit rounded-full bg-muted px-3 py-1.5 text-sm font-medium">
      {status}
    </span>
  );
}

function formatDate(
  value: Date | string
) {
  return new Date(
    value
  ).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatDuration(
  seconds: number
) {
  const minutes = Math.floor(
    seconds / 60
  );

  const remainingSeconds =
    seconds % 60;

  if (minutes === 0) {
    return `${remainingSeconds}s`;
  }

  return `${minutes}m ${remainingSeconds}s`;
}