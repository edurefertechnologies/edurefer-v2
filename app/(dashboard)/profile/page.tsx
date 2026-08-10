import ProfileHeader from "@/components/profile/profile-header";
import { ProfileDetails } from "@/components/profile/profile-details";
import { ProfileCompletion } from "@/components/profile/profile-completion";

import { getProfile } from "@/actions/profile/get-profile";

export default async function ProfilePage() {
  const data = await getProfile();

  const profile = {
    id: data.id,
    firstName: data.firstName ?? "",
    lastName: data.lastName ?? "",
    email: data.email ?? "",
    phone: data.phone ?? "",
    image: data.image ?? null,
    emailVerified: data.emailVerified ?? false,

    profile: data.profile
      ? {
          headline: data.profile.headline ?? "",
          bio: data.profile.bio ?? "",
          address: data.profile.address ?? "",
          city: data.profile.city ?? "",
          state: data.profile.state ?? "",
          country: data.profile.country ?? "",
          pincode: data.profile.pincode ?? "",

          college: data.profile.college ?? "",
          university: data.profile.university ?? "",
          degree: data.profile.degree ?? "",
          branch: data.profile.branch ?? "",

          passingYear: data.profile.passingYear ?? null,

          currentCompany:
            data.profile.currentCompany ?? "",

          designation:
            data.profile.designation ?? "",

          experience:
            data.profile.experience ?? null,

          linkedin:
            data.profile.linkedin ?? "",

          github:
            data.profile.github ?? "",

          portfolio:
            data.profile.portfolio ?? "",

          website:
            data.profile.website ?? "",
        }
      : null,
  };

  return (
    <div className="space-y-6">
      <ProfileHeader />

      <div className="grid gap-6 xl:grid-cols-[380px_1fr]">
        <ProfileCompletion profile={profile} />

        <ProfileDetails profile={profile} />
      </div>
    </div>
  );
}