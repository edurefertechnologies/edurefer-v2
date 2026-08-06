import Link from "next/link";
import {
  Award,
  ArrowRight,
  Download,
} from "lucide-react";

import { getDashboard } from "@/actions/dashboard/get-dashboard";

export async function RecentCertificates() {
  const dashboard = await getDashboard();

  const certificates =
    dashboard.recentCertificates;

  return (
    <div
      className="
  relative
  overflow-hidden
  rounded-3xl
  border
  border-white/10
  bg-white/[0.04]
  backdrop-blur-xl
  p-7
  transition-all
  duration-300
  hover:border-cyan-500/20
  hover:shadow-[0_0_40px_rgba(59,130,246,.12)]">

      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-500/10 blur-[120px]" />

      <div className="absolute -left-16 bottom-0 h-52 w-52 rounded-full bg-emerald-500/10 blur-[120px]" />
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Recent Certificates
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest achievements
          </p>
        </div>

        <Link
          href="/certificates"
          className="text-sm font-semibold text-cyan-300 transition hover:text-white"
        >
          View All →
        </Link>
      </div>

      {certificates.length === 0 ? (
        <div
          className="
rounded-3xl
border
border-dashed
border-white/10
bg-white/5
p-10
text-center
backdrop-blur-xl
">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400/20 to-emerald-500/20">

            <Award className="h-8 w-8 text-yellow-300" />

          </div>

          <h3 className="mt-5 text-lg font-semibold text-white">

            No Certificates Yet

          </h3>

          <p className="mt-2 text-sm text-slate-400">

            Complete your first course to unlock your industry certificate.

          </p>

          <Link
            href="/courses"
            className="
mt-6
inline-flex
items-center
gap-2
rounded-xl
bg-gradient-to-r
from-blue-600
to-emerald-500
px-5
py-3
font-semibold
text-white
transition
hover:scale-105
"
          >
            Browse Courses
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400/20 to-emerald-500/20">

                <Award className="h-7 w-7 text-yellow-300" />

              </div>
              <div>
                <h3 className="text-lg font-bold text-white">
                  {certificate.course.title}
                </h3>

                <p className="mt-1 text-xs text-slate-400">
                  Certificate No.
                  {" "}
                  {certificate.certificateNo}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Issued{" "}
                  {new Date(
                    certificate.issuedAt
                  ).toLocaleDateString("en-IN")}
                </p>
              </div>

              <div
                className="
mt-3
inline-flex
rounded-full
border
border-emerald-500/20
bg-emerald-500/10
px-3
py-1
text-[11px]
font-semibold
text-emerald-300
">
                Issued

              </div>

              <Link
                href={`/api/certificates/${encodeURIComponent(
                  certificate.certificateNo
                )}/download`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 border-0 shadow-lg px-3 py-2 text-sm hover:scale-105 text-white font-semibold">
                <Download className="h-4 w-4 transition group-hover:translate-y-0.5" />
                Download
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}