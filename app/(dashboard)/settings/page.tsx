import { getProfile } from "@/actions/profile/get-profile";
import SettingsPageClient from "@/components/settings/settings-page-client";

export default async function SettingsPage() {
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
          gender: data.profile.gender ?? undefined,

          address: data.profile.address ?? "",
          city: data.profile.city ?? "",
          state: data.profile.state ?? "",
          country: data.profile.country ?? "",
          pincode: data.profile.pincode ?? "",

          college: data.profile.college ?? "",
          university: data.profile.university ?? "",
          degree: data.profile.degree ?? "",
          branch: data.profile.branch ?? "",
          passingYear:
            data.profile.passingYear ?? undefined,

          currentCompany:
            data.profile.currentCompany ?? "",

          designation:
            data.profile.designation ?? "",

          experience:
            data.profile.experience ?? undefined,

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

  return <SettingsPageClient profile={profile} />;
}