import {
  Banknote,
  Building2,
  CheckCircle2,
  Clock3,
  Landmark,
  Smartphone,
  XCircle,
} from "lucide-react";

import { getWithdrawals } from "@/actions/admin/withdrawals/get-withdrawals";
import WithdrawalActions from "@/components/admin/withdrawals/withdrawal-actions";

export default async function AdminWithdrawalsPage() {
  const withdrawals =
    await getWithdrawals();

  const pending = withdrawals.filter(
    (item) => item.status === "PENDING"
  );

  const approved = withdrawals.filter(
    (item) => item.status === "APPROVED"
  );

  const paid = withdrawals.filter(
    (item) => item.status === "PAID"
  );

  const rejected = withdrawals.filter(
    (item) => item.status === "REJECTED"
  );

  const pendingAmount = pending.reduce(
    (total, item) =>
      total + item.amount,
    0
  );

  const paidAmount = paid.reduce(
    (total, item) =>
      total + item.amount,
    0
  );

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold sm:text-3xl">
          Withdrawals
        </h1>

        <p className="mt-2 text-muted-foreground">
          Review and process student
          withdrawal requests.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Pending Requests"
          value={pending.length.toString()}
          icon={Clock3}
        />

        <StatCard
          title="Pending Amount"
          value={`₹${pendingAmount.toLocaleString(
            "en-IN"
          )}`}
          icon={Banknote}
        />

        <StatCard
          title="Approved"
          value={approved.length.toString()}
          icon={CheckCircle2}
        />

        <StatCard
          title="Total Paid"
          value={`₹${paidAmount.toLocaleString(
            "en-IN"
          )}`}
          icon={Landmark}
        />
      </div>

      {withdrawals.length === 0 ? (
        <div className="rounded-xl border bg-card p-12 text-center">
          <Banknote className="mx-auto h-8 w-8 text-muted-foreground" />

          <h2 className="mt-4 font-semibold">
            No withdrawal requests
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Student withdrawal requests
            will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {withdrawals.map(
            (withdrawal) => {
              const user =
                withdrawal.wallet.user;

              const name = [
                user.firstName,
                user.lastName,
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <article
                  key={withdrawal.id}
                  className="rounded-xl border bg-card p-5 sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="text-lg font-semibold">
                          {name}
                        </h2>

                        <StatusBadge
                          status={
                            withdrawal.status
                          }
                        />
                      </div>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {user.email}
                      </p>

                      {user.phone && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {user.phone}
                        </p>
                      )}

                      <p className="mt-2 text-xs text-muted-foreground">
                        Requested{" "}
                        {formatDate(
                          withdrawal.createdAt
                        )}
                      </p>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-sm text-muted-foreground">
                        Withdrawal Amount
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        ₹
                        {withdrawal.amount.toLocaleString(
                          "en-IN"
                        )}
                      </p>

                      <p className="mt-1 text-xs text-muted-foreground">
                        Current wallet balance: ₹
                        {withdrawal.wallet.balance.toLocaleString(
                          "en-IN"
                        )}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg bg-muted/40 p-4">
                    <div className="mb-3 flex items-center gap-2 font-medium">
                      {withdrawal.payoutMode ===
                      "UPI" ? (
                        <Smartphone className="h-4 w-4" />
                      ) : (
                        <Building2 className="h-4 w-4" />
                      )}

                      Payout Details
                    </div>

                    {withdrawal.payoutMode ===
                    "UPI" ? (
                      <div>
                        <p className="text-xs text-muted-foreground">
                          UPI ID
                        </p>

                        <p className="mt-1 font-medium">
                          {withdrawal.upiId ??
                            "-"}
                        </p>
                      </div>
                    ) : (
                      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        <Detail
                          label="Account Holder"
                          value={
                            withdrawal.accountName
                          }
                        />

                        <Detail
                          label="Bank"
                          value={
                            withdrawal.bankName
                          }
                        />

                        <Detail
                          label="Account Number"
                          value={
                            withdrawal.accountNumber
                          }
                        />

                        <Detail
                          label="IFSC"
                          value={
                            withdrawal.ifscCode
                          }
                        />
                      </div>
                    )}
                  </div>

                  {withdrawal.transactionId && (
                    <div className="mt-4">
                      <p className="text-xs text-muted-foreground">
                        Payment Transaction ID
                      </p>

                      <p className="mt-1 break-all text-sm font-medium">
                        {
                          withdrawal.transactionId
                        }
                      </p>
                    </div>
                  )}

                  {withdrawal.remarks && (
                    <div className="mt-4 rounded-lg border p-3">
                      <p className="text-xs text-muted-foreground">
                        Remarks
                      </p>

                      <p className="mt-1 text-sm">
                        {withdrawal.remarks}
                      </p>
                    </div>
                  )}

                  <div className="mt-5 border-t pt-5">
                    <WithdrawalActions
                      withdrawalId={
                        withdrawal.id
                      }
                      status={
                        withdrawal.status
                      }
                    />
                  </div>
                </article>
              );
            }
          )}
        </div>
      )}

      {rejected.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Rejected requests:{" "}
          {rejected.length}
        </p>
      )}
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value?: string | null;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 break-all text-sm font-medium">
        {value || "-"}
      </p>
    </div>
  );
}

function StatusBadge({
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

  const icons: Record<
    string,
    React.ReactNode
  > = {
    PENDING: (
      <Clock3 className="h-3.5 w-3.5" />
    ),
    APPROVED: (
      <CheckCircle2 className="h-3.5 w-3.5" />
    ),
    PAID: (
      <CheckCircle2 className="h-3.5 w-3.5" />
    ),
    REJECTED: (
      <XCircle className="h-3.5 w-3.5" />
    ),
  };

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${
        styles[status] ?? "bg-muted"
      }`}
    >
      {icons[status]}
      {status}
    </span>
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

function formatDate(
  value: Date | string
) {
  return new Date(
    value
  ).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}