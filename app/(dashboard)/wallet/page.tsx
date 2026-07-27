import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock3,
  Gift,
  Landmark,
  Users,
  Wallet,
} from "lucide-react";

import { getMyWallet } from "@/actions/wallet/get-my-wallet";
import WithdrawalForm from "@/components/wallet/withdrawal-form";

export default async function WalletPage() {
  const data = await getMyWallet();

  if (!data) {
    return null;
  }

  const {
    wallet,
    referrals,
    stats,
  } = data;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          My Wallet
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage referral earnings,
          transactions and withdrawals.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Available Balance"
          value={`₹${wallet.balance.toLocaleString(
            "en-IN"
          )}`}
          icon={Wallet}
        />

        <StatCard
          title="Referral Earnings"
          value={`₹${stats.totalReferralEarnings.toLocaleString(
            "en-IN"
          )}`}
          icon={Gift}
        />

        <StatCard
          title="Total Withdrawn"
          value={`₹${stats.totalWithdrawn.toLocaleString(
            "en-IN"
          )}`}
          icon={Landmark}
        />

        <StatCard
          title="Pending Withdrawal"
          value={`₹${stats.pendingWithdrawalAmount.toLocaleString(
            "en-IN"
          )}`}
          icon={Clock3}
        />
      </div>

      {/* Withdrawal + referrals */}
      <div className="grid gap-6 xl:grid-cols-2">
        <WithdrawalForm
          balance={wallet.balance}
        />

        <div className="rounded-xl border bg-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                Referrals
              </h2>

              <p className="mt-1 text-sm text-muted-foreground">
                Your referral activity and
                earned rewards.
              </p>
            </div>

            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Total Referrals
              </p>

              <p className="mt-2 text-2xl font-bold">
                {stats.totalReferrals}
              </p>
            </div>

            <div className="rounded-lg bg-muted/40 p-4">
              <p className="text-sm text-muted-foreground">
                Rewarded
              </p>

              <p className="mt-2 text-2xl font-bold">
                {stats.rewardedReferrals}
              </p>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            {referrals.length === 0 ? (
              <div className="rounded-lg border border-dashed p-6 text-center">
                <Gift className="mx-auto h-6 w-6 text-muted-foreground" />

                <p className="mt-3 font-medium">
                  No referrals yet
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Your referred users will
                  appear here.
                </p>
              </div>
            ) : (
              referrals
                .slice(0, 5)
                .map((referral) => {
                  const name = [
                    referral.referee
                      .firstName,
                    referral.referee
                      .lastName,
                  ]
                    .filter(Boolean)
                    .join(" ");

                  return (
                    <div
                      key={referral.id}
                      className="flex items-center justify-between gap-4 rounded-lg border p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {name}
                        </p>

                        <p className="truncate text-xs text-muted-foreground">
                          {
                            referral.referee
                              .email
                          }
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                          referral.isRewarded
                            ? "bg-green-500/10 text-green-600"
                            : "bg-muted"
                        }`}
                      >
                        {referral.isRewarded
                          ? "Rewarded"
                          : "Pending"}
                      </span>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">
            Transaction History
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Credits and debits from your
            wallet.
          </p>
        </div>

        {wallet.transactions.length ===
        0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No wallet transactions yet.
          </div>
        ) : (
          <div className="divide-y">
            {wallet.transactions.map(
              (transaction) => {
                const credit =
                  transaction.type ===
                  "CREDIT";

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between gap-4 p-5"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div
                        className={`rounded-full p-2.5 ${
                          credit
                            ? "bg-green-500/10"
                            : "bg-muted"
                        }`}
                      >
                        {credit ? (
                          <ArrowDownLeft className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-medium">
                          {transaction.description ??
                            formatSource(
                              transaction.source
                            )}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {formatSource(
                            transaction.source
                          )}{" "}
                          •{" "}
                          {formatDate(
                            transaction.createdAt
                          )}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`shrink-0 font-semibold ${
                        credit
                          ? "text-green-600"
                          : ""
                      }`}
                    >
                      {credit ? "+" : "-"}₹
                      {transaction.amount.toLocaleString(
                        "en-IN"
                      )}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>

      {/* Withdrawal history */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-6">
          <h2 className="text-xl font-semibold">
            Withdrawal History
          </h2>
        </div>

        {wallet.withdrawals.length ===
        0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            No withdrawal requests yet.
          </div>
        ) : (
          <div className="divide-y">
            {wallet.withdrawals.map(
              (withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      ₹
                      {withdrawal.amount.toLocaleString(
                        "en-IN"
                      )}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {withdrawal.payoutMode ??
                        "Payout"}{" "}
                      •{" "}
                      {formatDate(
                        withdrawal.createdAt
                      )}
                    </p>

                    {withdrawal.transactionId && (
                      <p className="mt-1 break-all text-xs text-muted-foreground">
                        Transaction ID:{" "}
                        {
                          withdrawal.transactionId
                        }
                      </p>
                    )}

                    {withdrawal.remarks && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        {
                          withdrawal.remarks
                        }
                      </p>
                    )}
                  </div>

                  <WithdrawalBadge
                    status={
                      withdrawal.status
                    }
                  />
                </div>
              )
            )}
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

function WithdrawalBadge({
  status,
}: {
  status: string;
}) {
  const styles: Record<
    string,
    string
  > = {
    PENDING:
      "bg-yellow-500/10 text-yellow-600",
    APPROVED:
      "bg-blue-500/10 text-blue-600",
    PAID:
      "bg-green-500/10 text-green-600",
    REJECTED:
      "bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] ?? "bg-muted"
      }`}
    >
      {status}
    </span>
  );
}

function formatSource(
  source: string
) {
  return source
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (letter) =>
      letter.toUpperCase()
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