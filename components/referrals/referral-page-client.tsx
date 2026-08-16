"use client";

import {
  CheckCircle2,
  Clock3,
  IndianRupee,
  Link2,
  Share2,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { CopyButton } from "@/components/shared/copy-button";

interface ReferralData {
  eligible: boolean;

  referralCode: string | null;

  referrals: {
    id: string;
    isRewarded: boolean;
    rewardedAt: Date | null;
    rewardedOrderId: string | null;
    createdAt: Date;

    referee: {
      firstName: string;
      lastName: string | null;
      email: string;
    };
  }[];

  transactions: {
    id: string;
    amount: number;
    description: string | null;
    createdAt: Date;
  }[];

  stats: {
    totalReferrals: number;
    successfulReferrals: number;
    pendingReferrals: number;
    totalEarnings: number;
  };
}

interface Props {
  data: ReferralData;
}

export default function ReferralPageClient({
  data,
}: Props) {
  const referralLink = data.referralCode
    ? `${window.location.origin}/register?ref=${encodeURIComponent(
      data.referralCode
    )}`
    : "";

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Join Edurefer",
          text: "Join Edurefer using my referral link.",
          url: referralLink,
        });
      } else {
        await navigator.clipboard.writeText(
          referralLink
        );
      }
    } catch (error) {
      console.error(
        "REFERRAL_SHARE_ERROR:",
        error
      );
    }
  }

  if (!data.eligible) {
    return (
      <div className="container-custom py-10">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-3xl border border-amber-400/20 bg-amber-400/5 p-8 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10">
              <Link2 className="h-7 w-7 text-amber-300" />
            </div>

            <h1 className="mt-5 text-2xl font-bold text-white">
              Referral Program
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-400">
              Referral benefits become available after
              you purchase at least one eligible product
              or package from Edurefer.
            </p>

            <Button
              type="button"
              onClick={() => {
                window.location.href = "/courses";
              }}
              className="mt-6"
            >
              Explore Courses
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-10">
      <div className="mx-auto max-w-6xl">

        <div>
          <h1 className="text-3xl font-bold">
            Referral Program
          </h1>

          <p className="mt-2 text-muted-foreground">
            Invite friends to Edurefer and earn
            rewards from successful referrals.
          </p>
        </div>

        <div className="mt-8 rounded-3xl border bg-background p-6 shadow-sm">

          <div className="flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />

            <h2 className="text-xl font-semibold">
              Your Referral Link
            </h2>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">

            <div className="flex min-w-0 flex-1 items-center rounded-xl border bg-muted/30 px-4 py-3">
              <span className="break-all text-sm">
                {referralLink}
              </span>
            </div>

            <div className="flex gap-2">
              <CopyButton value={referralLink} />

              <Button
                type="button"
                onClick={handleShare}
              >
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>

          </div>

          <div className="mt-5 rounded-2xl bg-primary/10 p-5">
            <p className="text-sm text-muted-foreground">
              Your Referral Code
            </p>

            <p className="mt-1 text-2xl font-bold tracking-wider text-primary">
              {data.referralCode}
            </p>
          </div>

        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <StatCard
            icon={<Users className="h-5 w-5" />}
            title="Total Referrals"
            value={data.stats.totalReferrals}
          />

          <StatCard
            icon={
              <CheckCircle2 className="h-5 w-5" />
            }
            title="Successful"
            value={data.stats.successfulReferrals}
          />

          <StatCard
            icon={<Clock3 className="h-5 w-5" />}
            title="Pending"
            value={data.stats.pendingReferrals}
          />

          <StatCard
            icon={
              <IndianRupee className="h-5 w-5" />
            }
            title="Total Earnings"
            value={`₹${data.stats.totalEarnings.toLocaleString(
              "en-IN"
            )}`}
          />

        </div>

        <div className="mt-8 rounded-3xl border bg-background">

          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">
              Your Referrals
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Track people who joined using your
              referral link.
            </p>
          </div>

          {data.referrals.length === 0 ? (
            <div className="p-10 text-center">

              <Users className="mx-auto h-10 w-10 text-muted-foreground" />

              <p className="mt-4 font-medium">
                No referrals yet
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Share your referral link to get
                started.
              </p>

            </div>
          ) : (
            <div className="divide-y">

              {data.referrals.map(
                (referral) => (
                  <div
                    key={referral.id}
                    className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="min-w-0">

                      <p className="font-semibold">
                        {referral.referee.firstName}{" "}
                        {referral.referee.lastName}
                      </p>

                      <p className="mt-1 truncate text-sm text-muted-foreground">
                        {referral.referee.email}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Joined{" "}
                        {new Date(
                          referral.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )}
                      </p>

                    </div>

                    {referral.isRewarded ? (
                      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700 dark:bg-green-950 dark:text-green-300">
                        <CheckCircle2 className="h-4 w-4" />
                        Rewarded
                      </span>
                    ) : (
                      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        <Clock3 className="h-4 w-4" />
                        Pending
                      </span>
                    )}

                  </div>
                )
              )}

            </div>
          )}

        </div>

        <div className="mt-8 rounded-3xl border bg-background">

          <div className="border-b p-6">
            <h2 className="text-xl font-semibold">
              Referral Earnings
            </h2>
          </div>

          {data.transactions.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              No referral earnings yet.
            </div>
          ) : (
            <div className="divide-y">

              {data.transactions.map(
                (transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-4 p-5"
                  >

                    <div>
                      <p className="font-medium">
                        {transaction.description ||
                          "Referral reward"}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {new Date(
                          transaction.createdAt
                        ).toLocaleDateString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <p className="shrink-0 font-semibold text-green-600">
                      +₹
                      {transaction.amount.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

function StatCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-2xl border bg-background p-6">

      <div className="flex items-center gap-3 text-muted-foreground">
        {icon}
        <span className="text-sm">
          {title}
        </span>
      </div>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>

    </div>
  );
}