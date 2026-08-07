import { ProfileHeader } from "@/components/profile/profile-header";
import { ProfileDetails } from "@/components/profile/profile-details";
import { ProfileCompletion } from "@/components/profile/profile-completion";

export default function ProfilePage() {
  return (
    <div className="space-y-6">

      <ProfileHeader />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">

        <ProfileCompletion />

        <ProfileDetails />

      </div>

    </div>
  );
}