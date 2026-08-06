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
    <div className="rounded-2xl border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">
            Recent Certificates
          </h2>

          <p className="text-sm text-muted-foreground">
            Your latest achievements
          </p>
        </div>

        <Link
          href="/certificates"
          className="text-sm font-medium text-primary hover:underline"
        >
          View All
        </Link>
      </div>

      {certificates.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <Award className="mx-auto h-8 w-8 text-muted-foreground" />

          <p className="mt-3 text-sm text-muted-foreground">
            Complete a course to earn your first certificate.
          </p>

          <Link
            href="/courses"
            className="mt-4 inline-flex items-center gap-2 text-primary"
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
              <div>
                <h3 className="font-semibold">
                  {certificate.course.title}
                </h3>

                <p className="mt-1 text-xs text-muted-foreground">
                  Certificate No.
                  {" "}
                  {certificate.certificateNo}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Issued{" "}
                  {new Date(
                    certificate.issuedAt
                  ).toLocaleDateString("en-IN")}
                </p>
              </div>

              <Link
                href={`/api/certificates/${encodeURIComponent(
                  certificate.certificateNo
                )}/download`}
                className="inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm hover:bg-muted"
              >
                <Download className="h-4 w-4" />
                Download
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}