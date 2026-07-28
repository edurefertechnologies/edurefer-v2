import {
  Banknote,
  BookOpen,
  CheckCircle2,
  Gift,
  IndianRupee,
  ShoppingCart,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";

import { getAnalytics } from "@/actions/admin/analytics/get-analytics";
import RevenueChart from "@/components/admin/analytics/revenue-chart";

export default async function AnalyticsPage() {
  const data = await getAnalytics();

  if (!data) {
    return null;
  }

  const {
    overview,
    monthlyRevenue,
    coursePerformance,
    withdrawals,
  } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Analytics
        </h1>

        <p className="mt-2 text-muted-foreground">
          Business performance, revenue,
          enrollments and referral insights.
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={money(
            overview.totalRevenue
          )}
          icon={IndianRupee}
        />

        <StatCard
          title="Paid Orders"
          value={overview.totalPaidOrders.toLocaleString(
            "en-IN"
          )}
          icon={ShoppingCart}
        />

        <StatCard
          title="Average Order Value"
          value={money(
            overview.averageOrderValue
          )}
          icon={TrendingUp}
        />

        <StatCard
          title="Total Users"
          value={overview.totalUsers.toLocaleString(
            "en-IN"
          )}
          icon={Users}
        />
      </div>

      {/* Secondary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Enrollments"
          value={overview.totalEnrollments.toLocaleString(
            "en-IN"
          )}
          icon={BookOpen}
        />

        <StatCard
          title="Completed Courses"
          value={overview.completedEnrollments.toLocaleString(
            "en-IN"
          )}
          icon={CheckCircle2}
        />

        <StatCard
          title="Referral Rewards"
          value={money(
            overview.totalReferralRewards
          )}
          icon={Gift}
        />

        <StatCard
          title="Total Withdrawn"
          value={money(
            overview.totalWithdrawn
          )}
          icon={Wallet}
        />
      </div>

      {/* Revenue Chart */}
      <section className="rounded-xl border bg-card p-5 sm:p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            Revenue Overview
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Successful payments grouped by
            month.
          </p>
        </div>

        <RevenueChart
          data={monthlyRevenue}
        />
      </section>

      {/* Referral + Withdrawal */}
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Gift className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold">
                Referral Performance
              </h2>

              <p className="text-sm text-muted-foreground">
                Referral conversion and
                rewards.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Metric
              label="Total Referrals"
              value={
                overview.totalReferrals
              }
            />

            <Metric
              label="Rewarded"
              value={
                overview.rewardedReferrals
              }
            />

            <Metric
              label="Rewards Credited"
              value={money(
                overview.totalReferralRewards
              )}
            />

            <Metric
              label="Conversion"
              value={`${percentage(
                overview.rewardedReferrals,
                overview.totalReferrals
              )}%`}
            />
          </div>
        </section>

        <section className="rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-primary/10 p-3">
              <Banknote className="h-5 w-5 text-primary" />
            </div>

            <div>
              <h2 className="font-semibold">
                Withdrawals
              </h2>

              <p className="text-sm text-muted-foreground">
                Current withdrawal
                processing status.
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <Metric
              label="Total Requests"
              value={withdrawals.total}
            />

            <Metric
              label="Pending"
              value={withdrawals.pending}
            />

            <Metric
              label="Paid"
              value={withdrawals.paid}
            />

            <Metric
              label="Rejected"
              value={withdrawals.rejected}
            />
          </div>

          <div className="mt-4 rounded-lg bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">
              Pending Amount
            </p>

            <p className="mt-1 text-xl font-bold">
              {money(
                overview.pendingWithdrawalAmount
              )}
            </p>
          </div>
        </section>
      </div>

      {/* Course Performance */}
      <section className="overflow-hidden rounded-xl border bg-card">
        <div className="border-b p-5 sm:p-6">
          <h2 className="text-xl font-semibold">
            Course Performance
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Enrollment, completion and
            review performance by course.
          </p>
        </div>

        {coursePerformance.length ===
        0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No course analytics available.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-muted/30">
                <tr>
                  <th className="px-5 py-4 font-medium">
                    Course
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Price
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Enrollments
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Completed
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Completion
                  </th>

                  <th className="px-5 py-4 font-medium">
                    Rating
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {coursePerformance.map(
                  (course) => (
                    <tr
                      key={course.id}
                      className="hover:bg-muted/20"
                    >
                      <td className="px-5 py-4">
                        <p className="font-medium">
                          {course.title}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        {money(course.price)}
                      </td>

                      <td className="px-5 py-4">
                        {course.enrollments}
                      </td>

                      <td className="px-5 py-4">
                        {course.completions}
                      </td>

                      <td className="px-5 py-4">
                        {course.completionRate.toFixed(
                          1
                        )}
                        %
                      </td>

                      <td className="px-5 py-4">
                        {course.reviewCount >
                        0 ? (
                          <>
                            {course.averageRating.toFixed(
                              1
                            )}{" "}
                            <span className="text-muted-foreground">
                              (
                              {
                                course.reviewCount
                              }
                              )
                            </span>
                          </>
                        ) : (
                          <span className="text-muted-foreground">
                            No reviews
                          </span>
                        )}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string;
  icon: React.ComponentType<{
    className?: string;
  }>;
}) {
  return (
    <div className="rounded-xl border bg-card p-5">
      <div className="flex items-center justify-between gap-4">
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

function Metric({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="rounded-lg bg-muted/40 p-4">
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 text-xl font-bold">
        {value}
      </p>
    </div>
  );
}

function money(value: number) {
  return `₹${value.toLocaleString(
    "en-IN",
    {
      maximumFractionDigits: 2,
    }
  )}`;
}

function percentage(
  value: number,
  total: number
) {
  if (total === 0) {
    return "0.0";
  }

  return (
    (value / total) *
    100
  ).toFixed(1);
}