import {
  CheckCircle2,
  Clock3,
  Gift,
  IndianRupee,
  UserPlus,
  Users,
} from "lucide-react";

import { getReferrals } from "@/actions/admin/referrals/get-referrals";
import { REFERRAL } from "@/lib/constants";

const REFERRAL_REWARD = 300;

export default async function AdminReferralsPage() {
  const REFERRAL_REWARD = REFERRAL.REWARD;
  
  const referrals = await getReferrals();

  const rewarded = referrals.filter(
    (referral) => referral.isRewarded
  );

  const pending = referrals.filter(
    (referral) => !referral.isRewarded
  );

  const totalRewardsPaid =
    rewarded.length * REFERRAL_REWARD;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Referrals
        </h1>

        <p className="mt-2 text-muted-foreground">
          Monitor referral activity,
          successful rewards and pending
          referrals.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Referrals"
          value={referrals.length.toString()}
          icon={Users}
        />

        <StatCard
          title="Rewarded"
          value={rewarded.length.toString()}
          icon={CheckCircle2}
        />

        <StatCard
          title="Pending"
          value={pending.length.toString()}
          icon={Clock3}
        />

        <StatCard
          title="Rewards Paid"
          value={`₹${totalRewardsPaid.toLocaleString(
            "en-IN"
          )}`}
          icon={IndianRupee}
        />
      </div>

      {/* Referral List */}
      {referrals.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <Gift className="mx-auto h-8 w-8 text-muted-foreground" />

          <h2 className="mt-4 font-semibold">
            No referrals yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            User referrals will appear here
            when someone registers using a
            referral code.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {referrals.map((referral) => {
            const referrerName =
              getName(referral.referrer);

            const refereeName =
              getName(referral.referee);

            return (
              <article
                key={referral.id}
                className="rounded-xl border bg-card p-5 sm:p-6"
              >
                {/* Top */}
                <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="font-semibold">
                        Referral
                      </h2>

                      {referral.isRewarded ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2.5 py-1 text-xs font-medium text-green-600">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          Rewarded
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2.5 py-1 text-xs font-medium text-yellow-600">
                          <Clock3 className="h-3.5 w-3.5" />
                          Pending
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-xs text-muted-foreground">
                      Created{" "}
                      {formatDate(
                        referral.createdAt
                      )}
                    </p>
                  </div>

                  <div className="lg:text-right">
                    <p className="text-sm text-muted-foreground">
                      Referral Reward
                    </p>

                    <p className="mt-1 text-xl font-bold">
                      ₹
                      {REFERRAL_REWARD.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                </div>

                {/* Referrer -> Referee */}
                <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
                  {/* Referrer */}
                  <div className="rounded-lg bg-muted/40 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Referred By
                    </p>

                    <p className="mt-2 font-semibold">
                      {referrerName}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {
                        referral.referrer
                          .email
                      }
                    </p>

                    {referral.referrer
                      .phone && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {
                          referral.referrer
                            .phone
                        }
                      </p>
                    )}

                    {referral.referrer
                      .referralCode && (
                      <div className="mt-3">
                        <span className="rounded-md border bg-background px-2.5 py-1 text-xs font-medium">
                          {
                            referral.referrer
                              .referralCode
                          }
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="hidden rounded-full bg-primary/10 p-3 lg:block">
                    <UserPlus className="h-5 w-5 text-primary" />
                  </div>

                  {/* Referee */}
                  <div className="rounded-lg bg-muted/40 p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      Referred User
                    </p>

                    <p className="mt-2 font-semibold">
                      {refereeName}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {
                        referral.referee
                          .email
                      }
                    </p>

                    {referral.referee
                      .phone && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {
                          referral.referee
                            .phone
                        }
                      </p>
                    )}

                    <p className="mt-3 text-xs text-muted-foreground">
                      Joined{" "}
                      {formatDate(
                        referral.referee
                          .createdAt
                      )}
                    </p>
                  </div>
                </div>

                {/* Reward information */}
                {referral.isRewarded && (
                  <div className="mt-5 grid gap-4 border-t pt-5 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Rewarded On
                      </p>

                      <p className="mt-1 text-sm font-medium">
                        {referral.rewardedAt
                          ? formatDate(
                              referral.rewardedAt
                            )
                          : "-"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Rewarded Order
                      </p>

                      <p className="mt-1 break-all text-sm font-medium">
                        {referral.rewardedOrderId ??
                          "-"}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
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

function getName(user: {
  firstName: string;
  lastName: string | null;
}) {
  return [
    user.firstName,
    user.lastName,
  ]
    .filter(Boolean)
    .join(" ");
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