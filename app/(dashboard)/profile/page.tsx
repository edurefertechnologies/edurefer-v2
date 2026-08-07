import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileDetails } from "@/components/profile/profile-details";
import { ProfileCompletion } from "@/components/profile/profile-completion";
import { getSession } from "@/lib/session";

const session = await getSession();

const profile = await prisma.user.findUnique({
  where: {
    id: session.user.id,
  },

  include: {
    aiWallet: true,
    certificates: true,
    enrollments: true,
    orders: true,
  },
});
export default function ProfilePage() {

  return (
    <div className="space-y-6">

      <ProfileHeader />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">

        <ProfileCompletion profile={profile} />

        <ProfileDetails />

      </div>

    </div>
  );
}