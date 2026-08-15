import { redirect } from "next/navigation";

import { getMyReferrals } from "@/actions/referrals/get-my-referrals";
import ReferralPageClient from "@/components/referrals/referral-page-client";

export default async function ReferralsPage() {
  const data = await getMyReferrals();

  if (!data) {
    redirect("/login");
  }

  if (!data.eligible) {
    redirect("/dashboard");
  }

  return <ReferralPageClient data={data} />;
}