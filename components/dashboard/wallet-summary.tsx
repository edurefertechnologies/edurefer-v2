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
    <div
      className="
  relative
  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-gradient-to-br
  from-[#11253E]
  via-[#0D1C2F]
  to-[#081421]
  p-7
  shadow-2xl">
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-emerald-500/10 blur-[120px]" />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Wallet Summary
          </h2>

          <p className="text-sm text-muted-foreground">
            Referral earnings & withdrawals
          </p>
        </div>

        <div
          className="
flex
h-12
w-12
items-center
justify-center
rounded-2xl
bg-gradient-to-br
from-blue-500/20
to-emerald-500/20
ring-1
ring-white/10">
          <Wallet className="h-6 w-6 text-cyan-300" />
        </div>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-400 uppercase tracking-[0.25em] text-xs">
          Available Balance
        </p>

        <h2 className="mt-3 text-5xl font-black tracking-tight text-white">
          ₹{wallet.balance.toFixed(2)}
        </h2>
      </div>

      <div
        className="
mt-4
inline-flex
rounded-full
border
border-emerald-500/20
bg-emerald-500/10
px-4
py-2
text-xs
font-semibold
text-emerald-300
"
      >

        +₹{stats.totalReferralEarnings.toFixed(0)} Earned

      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-5
transition
duration-300
hover:border-cyan-500/20
hover:-translate-y-1">
          <p className="text-xs text-slate-400 uppercase tracking-wider text-[11px]">
            Referral Earnings
          </p>

          <p className="mt-2 text-3xl font-bold">
            ₹{stats.totalReferralEarnings.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-5
transition
duration-300
hover:border-cyan-500/20
hover:-translate-y-1">
          <p className="text-xs text-slate-400 uppercase tracking-wider text-[11px]">
            Total Withdrawn
          </p>

          <p className="mt-2 text-3xl font-bold">
            ₹{stats.totalWithdrawn.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-5
transition
duration-300
hover:border-cyan-500/20
hover:-translate-y-1">
          <p className="text-xs text-slate-400 uppercase tracking-wider text-[11px]">
            Pending Withdrawal
          </p>

          <p className="mt-2 text-3xl font-bold">
            ₹{stats.pendingWithdrawalAmount.toFixed(2)}
          </p>
        </div>

        <div className="rounded-2xl
border
border-white/10
bg-white/5
backdrop-blur-xl
p-5
transition
duration-300
hover:border-cyan-500/20
hover:-translate-y-1">
          <p className="text-xs text-slate-400 uppercase tracking-wider text-[11px]">
            Successful Referrals
          </p>

          <p className="mt-2 text-3xl font-bold">
            {stats.rewardedReferrals}
          </p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <Link
          href="/wallet"
          className="
flex
flex-1
items-center
justify-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-emerald-500
px-4
py-3
font-semibold
text-white
transition
hover:scale-[1.02]">
          <Wallet className="h-4 w-4" />

          Open Wallet

        </Link>

        <Link
          href="/withdraw"
          className="
flex
flex-1
items-center
justify-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-emerald-500
px-4
py-3
font-semibold
text-white
transition
hover:scale-[1.02]
"
        >

          <ArrowUpRight className="h-4 w-4" />

          Withdraw

        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-5 rounded-lg bg-primary/5 p-4">
        <div className="flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-emerald-300" />

          <p className="text-sm font-medium">
            Referral Rewards Policy
          </p>
        </div>

        <p className="mt-2 text-xs leading-6 text-muted-foreground">
          Complete <strong>at least 2 successful referrals </strong> to unlock wallet withdrawals and start earning real rewards.
        </p>
      </div>
    </div>
  );
}