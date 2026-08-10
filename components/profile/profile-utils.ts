import { ProfileForm } from "./types";

export function createInitialProfile(
  profile: any
): ProfileForm {
  return {
    firstName: profile.firstName ?? "",
    lastName: profile.lastName ?? "",
    phone: profile.phone ?? "",

    headline: profile.profile?.headline ?? "",
    bio: profile.profile?.bio ?? "",

    address: profile.profile?.address ?? "",
    city: profile.profile?.city ?? "",
    state: profile.profile?.state ?? "",
    country: profile.profile?.country ?? "",
    pincode: profile.profile?.pincode ?? "",

    college: profile.profile?.college ?? "",
    university: profile.profile?.university ?? "",
    degree: profile.profile?.degree ?? "",
    branch: profile.profile?.branch ?? "",
    passingYear:
      profile.profile?.passingYear?.toString() ?? "",

    currentCompany:
      profile.profile?.currentCompany ?? "",

    designation:
      profile.profile?.designation ?? "",

    experience:
      profile.profile?.experience?.toString() ?? "",

    linkedin:
      profile.profile?.linkedin ?? "",

    github:
      profile.profile?.github ?? "",

    portfolio:
      profile.profile?.portfolio ?? "",

    website:
      profile.profile?.website ?? "",
  };
}