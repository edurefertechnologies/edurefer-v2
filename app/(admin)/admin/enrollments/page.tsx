import Link from "next/link";

import {
  Award,
  BookOpen,
  Eye,
  GraduationCap,
  Users,
} from "lucide-react";

import { getEnrollments } from "@/actions/admin/enrollments/get-enrollments";

export default async function AdminEnrollmentsPage() {
  const enrollments =
    await getEnrollments();

  const activeCount =
    enrollments.filter(
      (item) => item.status === "ACTIVE"
    ).length;

  const completedCount =
    enrollments.filter(
      (item) => item.status === "COMPLETED"
    ).length;

  const certificateCount =
    enrollments.filter(
      (item) => item.certificate
    ).length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">
          Enrollments
        </h1>

        <p className="mt-2 text-muted-foreground">
          Monitor student course enrollments,
          progress and completion.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Enrollments"
          value={enrollments.length}
          icon={Users}
        />

        <StatCard
          title="Active"
          value={activeCount}
          icon={BookOpen}
        />

        <StatCard
          title="Completed"
          value={completedCount}
          icon={GraduationCap}
        />

        <StatCard
          title="Certificates"
          value={certificateCount}
          icon={Award}
        />
      </div>

      {/* Table */}
      {enrollments.length === 0 ? (
        <div className="rounded-xl border bg-card p-10 text-center">
          <GraduationCap className="mx-auto h-8 w-8 text-muted-foreground" />

          <h2 className="mt-4 font-semibold">
            No enrollments yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Student enrollments will appear
            here after successful purchases.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="px-5 py-4 text-left font-medium">
                    Student
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Course
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Order
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Progress
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Status
                  </th>

                  <th className="px-5 py-4 text-left font-medium">
                    Certificate
                  </th>

                  <th className="px-5 py-4 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {enrollments.map(
                  (enrollment) => {
                    const totalLessons =
                      enrollment.course.modules.reduce(
                        (total, module) =>
                          total +
                          module.lessons.length,
                        0
                      );

                    const completedLessons =
                      enrollment.lessonProgress.length;

                    const progress = Math.round(
                      enrollment.progress
                    );

                    const studentName = [
                      enrollment.user.firstName,
                      enrollment.user.lastName,
                    ]
                      .filter(Boolean)
                      .join(" ");

                    return (
                      <tr
                        key={enrollment.id}
                        className="border-b last:border-b-0"
                      >
                        {/* Student */}
                        <td className="px-5 py-4">
                          <p className="font-medium">
                            {studentName}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            {enrollment.user.email}
                          </p>
                        </td>

                        {/* Course */}
                        <td className="px-5 py-4">
                          <p className="max-w-56 font-medium">
                            {enrollment.course.title}
                          </p>

                          <p className="mt-1 text-xs text-muted-foreground">
                            Enrolled{" "}
                            {enrollment.enrolledAt.toLocaleDateString(
                              "en-IN"
                            )}
                          </p>
                        </td>

                        {/* Order */}
                        <td className="px-5 py-4">
                          {enrollment.order ? (
                            <Link
                              href={`/admin/orders/${enrollment.order.id}`}
                              className="font-medium text-primary hover:underline"
                            >
                              {
                                enrollment.order
                                  .orderNumber
                              }
                            </Link>
                          ) : (
                            <span className="text-muted-foreground">
                              Manual
                            </span>
                          )}
                        </td>

                        {/* Progress */}
                        <td className="min-w-48 px-5 py-4">
                          <div className="flex items-center justify-between gap-3">
                            <span className="text-xs text-muted-foreground">
                              {completedLessons}/
                              {totalLessons} lessons
                            </span>

                            <span className="font-medium">
                              {progress}%
                            </span>
                          </div>

                          <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
                            <div
                              className="h-full rounded-full bg-primary transition-all"
                              style={{
                                width: `${Math.min(
                                  100,
                                  Math.max(
                                    0,
                                    progress
                                  )
                                )}%`,
                              }}
                            />
                          </div>
                        </td>

                        {/* Status */}
                        <td className="px-5 py-4">
                          <StatusBadge
                            status={
                              enrollment.status
                            }
                          />
                        </td>

                        {/* Certificate */}
                        <td className="px-5 py-4">
                          {enrollment.certificate ? (
                            <div>
                              <span className="inline-flex rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                                Issued
                              </span>

                              <p className="mt-1 text-xs text-muted-foreground">
                                {
                                  enrollment
                                    .certificate
                                    .certificateNo
                                }
                              </p>
                            </div>
                          ) : (
                            <span className="text-muted-foreground">
                              —
                            </span>
                          )}
                        </td>

                        {/* Action */}
                        <td className="px-5 py-4 text-right">
                          <Link
                            href={`/admin/enrollments/${enrollment.id}`}
                            className="inline-flex items-center gap-2 rounded-md border px-3 py-2 font-medium transition hover:bg-muted"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </Link>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            {title}
          </p>

          <p className="mt-2 text-2xl font-bold">
            {value}
          </p>
        </div>

        <div className="rounded-full bg-primary/10 p-3">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
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
      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
        Completed
      </span>
    );
  }

  if (status === "ACTIVE") {
    return (
      <span className="rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
        Active
      </span>
    );
  }

  return (
    <span className="rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
      {status}
    </span>
  );
}