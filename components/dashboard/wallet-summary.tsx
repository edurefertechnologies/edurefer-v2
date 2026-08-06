import Link from "next/link";
import {
ArrowUpRight,
CreditCard,
Wallet,
} from "lucide-react";

import { getMyWallet } from "@/actions/wallet/get-my-wallet";

export async function WalletSummary() {
const data = await getMyWallet();

if (!data) {
return null;
}

const {
wallet,
stats,
} = data;

return (
<div className="rounded-xl border bg-card p-6">
  <div className="flex items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold">
        Wallet Summary
      </h2>

      <p className="text-sm text-muted-foreground">
        Referral earnings & withdrawals
      </p>
    </div>

    <div className="rounded-lg bg-primary/10 p-2">
      <Wallet className="h-5 w-5 text-primary" />
    </div>
  </div>

  <div className="mt-6">
    <p className="text-sm text-muted-foreground">
      Available Balance
    </p>

    <h2 className="mt-2 text-4xl font-bold">
      ₹{wallet.balance.toFixed(2)}
    </h2>
  </div>

  <div className="mt-8 grid grid-cols-2 gap-4">
    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">
        Referral Earnings
      </p>

      <p className="mt-2 text-xl font-bold">
        ₹{stats.totalReferralEarnings.toFixed(2)}
      </p>
    </div>

    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">
        Total Withdrawn
      </p>

      <p className="mt-2 text-xl font-bold">
        ₹{stats.totalWithdrawn.toFixed(2)}
      </p>
    </div>

    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">
        Pending Withdrawal
      </p>

      <p className="mt-2 text-xl font-bold">
        ₹{stats.pendingWithdrawalAmount.toFixed(2)}
      </p>
    </div>

    <div className="rounded-lg border p-4">
      <p className="text-xs text-muted-foreground">
        Successful Referrals
      </p>

      <p className="mt-2 text-xl font-bold">
        {stats.rewardedReferrals}
      </p>
    </div>
  </div>

  <div className="mt-8 flex gap-3">
    <Link href="/wallet" className="flex-1">
    <button
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition hover:opacity-90">
      <Wallet className="h-4 w-4" />
      Open Wallet
    </button>
    </Link>

    <Link href="/wallet/withdraw" className="flex-1">
    <button
      className="flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2 transition hover:bg-muted">
      <ArrowUpRight className="h-4 w-4" />
      Withdraw
    </button>
    </Link>
  </div>

  <div className="mt-6 rounded-lg bg-primary/5 p-4">
    <div className="flex items-center gap-2">
      <CreditCard className="h-4 w-4 text-primary" />

      <p className="text-sm font-medium">
        Withdrawal Rule
      </p>
    </div>

    <p className="mt-2 text-xs leading-6 text-muted-foreground">
      Withdrawal is available only after
      completing at least <strong>2 successful referrals</strong>.
    </p>
  </div>
</div>
);
}