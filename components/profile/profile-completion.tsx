import {
  Camera,
  CheckCircle2,
  FileText,
  Wallet,
  Brain,
  Award,
  Pencil,
} from "lucide-react";

export function ProfileCompletion() {
  const completion = 82;

  interface Props {
    profile: UserWithRelations;
  }

  export function ProfileCompletion({
    profile,
  }: Props) {

    return (
      <div className="space-y-6">

        {/* Profile Card */}

        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl">

          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="relative z-10">

            {/* Avatar */}

            <div className="relative mx-auto h-36 w-36">

              <div className="flex h-full w-full items-center justify-center rounded-full border-4 border-cyan-400/30 bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

                {profile.image ? (
                  <Image
                    src={profile.image}
                    alt="Profile"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  profile.firstName?.charAt(0)
                )}

              </div>

              <button
                className="
              absolute
              bottom-2
              right-2
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              bg-gradient-to-r
              from-blue-600
              to-emerald-500
              shadow-lg
              transition
              hover:scale-105
              "
              >
                <Camera className="h-5 w-5 text-white" />
              </button>

            </div>

            {/* User */}

            <div className="mt-6 text-center">

              <h2 className="text-2xl font-bold text-white">
                {profile.firstName} {profile.lastName}
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Computer Science Student
              </p>

              <button
                className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-white/10
              bg-white/5
              px-4
              py-2
              text-sm
              text-white
              transition
              hover:bg-white/10
              "
              >
                <Pencil className="h-4 w-4" />

                Edit Profile

              </button>

            </div>

          </div>

        </div>

        {/* Completion */}

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

          <div className="flex items-center justify-between">

            <h3 className="font-bold text-white">

              Profile Completion

            </h3>

            <span className="text-xl font-black text-cyan-300">

              {completion}%

            </span>

          </div>

          <div className="mt-5 h-3 overflow-hidden rounded-full bg-white/10">

            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400"
              style={{
                width: `${completion}%`,
              }}
            />

          </div>

          <p className="mt-4 text-sm text-slate-400">

            Complete your profile to unlock better
            course recommendations and career guidance.

          </p>

        </div>

        {/* Quick Stats */}

        <div className="grid grid-cols-2 gap-4">

          <Card
            icon={<Award className="h-5 w-5" />}
            title="Certificates"
            value="12"
          />

          <Card
            icon={<Wallet className="h-5 w-5" />}
            title="Wallet"
            value="₹450"
          />

          <Card
            icon={<Brain className="h-5 w-5" />}
            title="AI Credits"
            value="280"
          />

          <Card
            icon={<FileText className="h-5 w-5" />}
            title="Resume"
            value="Uploaded"
          />

        </div>

        {/* Verification */}

        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-5">

          <div className="flex items-center gap-3">

            <CheckCircle2 className="h-6 w-6 text-emerald-400" />

            <div>

              <h4 className="font-semibold text-white">

                Email Verified

              </h4>

              <p className="text-sm text-slate-300">

                Your account is verified.

              </p>

            </div>

          </div>

        </div>

      </div>
    );
  }

  function Card({
    icon,
    title,
    value,
  }: {
    icon: React.ReactNode;
    title: string;
    value: string;
  }) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20 text-cyan-300">

          {icon}

        </div>

        <p className="mt-4 text-xs uppercase tracking-wider text-slate-400">

          {title}

        </p>

        <h3 className="mt-2 text-xl font-bold text-white">

          {value}

        </h3>

      </div>
    );
  }