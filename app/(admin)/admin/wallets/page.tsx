import {
  ArrowDownLeft,
  ArrowUpRight,
  Clock3,
  Gift,
  Wallet,
} from "lucide-react";

import { getWallets } from "@/actions/admin/wallets/get-wallets";

export default async function AdminWalletsPage() {
  const wallets = await getWallets();

  const totalBalance = wallets.reduce(
    (total, wallet) =>
      total + wallet.balance,
    0
  );

  const totalCredits = wallets.reduce(
    (total, wallet) =>
      total + wallet.totalCredits,
    0
  );

  const totalDebits = wallets.reduce(
    (total, wallet) =>
      total + wallet.totalDebits,
    0
  );

  const pendingWithdrawals =
    wallets.reduce(
      (total, wallet) =>
        total +
        wallet.pendingWithdrawals,
      0
    );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Wallets
        </h1>

        <p className="mt-2 text-muted-foreground">
          Monitor user wallet balances,
          credits, debits and transactions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Wallet Balance"
          value={`₹${totalBalance.toLocaleString(
            "en-IN"
          )}`}
          icon={Wallet}
        />

        <StatCard
          title="Total Credits"
          value={`₹${totalCredits.toLocaleString(
            "en-IN"
          )}`}
          icon={ArrowDownLeft}
        />

        <StatCard
          title="Total Debits"
          value={`₹${totalDebits.toLocaleString(
            "en-IN"
          )}`}
          icon={ArrowUpRight}
        />

        <StatCard
          title="Pending Withdrawals"
          value={pendingWithdrawals.toString()}
          icon={Clock3}
        />
      </div>

      {wallets.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <Wallet className="mx-auto h-8 w-8 text-muted-foreground" />

          <h2 className="mt-4 font-semibold">
            No wallets found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            User wallets will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {wallets.map((wallet) => {
            const name = [
              wallet.user.firstName,
              wallet.user.lastName,
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <article
                key={wallet.id}
                className="rounded-xl border bg-card"
              >
                <div className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {name}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {wallet.user.email}
                    </p>

                    {wallet.user.phone && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {wallet.user.phone}
                      </p>
                    )}

                    {wallet.user.referralCode && (
                      <div className="mt-3 flex items-center gap-2 text-sm">
                        <Gift className="h-4 w-4 text-primary" />

                        <span>
                          Referral Code:{" "}
                          <strong>
                            {
                              wallet.user
                                .referralCode
                            }
                          </strong>
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-5 lg:text-right">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Balance
                      </p>

                      <p className="mt-1 text-lg font-bold">
                        ₹
                        {wallet.balance.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Credits
                      </p>

                      <p className="mt-1 font-semibold text-green-600">
                        ₹
                        {wallet.totalCredits.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-muted-foreground">
                        Debits
                      </p>

                      <p className="mt-1 font-semibold">
                        ₹
                        {wallet.totalDebits.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border-t">
                  <div className="border-b bg-muted/20 px-5 py-3 sm:px-6">
                    <p className="text-sm font-medium">
                      Recent Transactions
                    </p>
                  </div>

                  {wallet.transactions.length ===
                  0 ? (
                    <div className="p-6 text-sm text-muted-foreground">
                      No transactions yet.
                    </div>
                  ) : (
                    <div className="divide-y">
                      {wallet.transactions
                        .slice(0, 5)
                        .map(
                          (transaction) => {
                            const credit =
                              transaction.type ===
                              "CREDIT";

                            return (
                              <div
                                key={
                                  transaction.id
                                }
                                className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                              >
                                <div className="flex min-w-0 items-center gap-3">
                                  <div
                                    className={`rounded-full p-2 ${
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
                                    <p className="truncate text-sm font-medium">
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
                                  className={`shrink-0 text-sm font-semibold ${
                                    credit
                                      ? "text-green-600"
                                      : ""
                                  }`}
                                >
                                  {credit
                                    ? "+"
                                    : "-"}
                                  ₹
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
                </div>
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

function formatSource(source: string) {
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