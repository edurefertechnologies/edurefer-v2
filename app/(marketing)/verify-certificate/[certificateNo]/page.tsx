import Link from "next/link";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
} from "lucide-react";

import { verifyCertificate } from "@/actions/certificates/verify-certificate";

interface Props {
  params: Promise<{
    certificateNo: string;
  }>;
}

export default async function VerifyCertificatePage({
  params,
}: Props) {
  const { certificateNo } = await params;

  const result =
    await verifyCertificate(
      decodeURIComponent(certificateNo)
    );

  if (!result.success) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-12">
        <div className="w-full rounded-2xl border bg-background p-8 text-center shadow-sm">
          <ShieldCheck className="mx-auto h-14 w-14 text-muted-foreground" />

          <h1 className="mt-5 text-2xl font-bold">
            Certificate Not Found
          </h1>

          <p className="mt-3 text-muted-foreground">
            We could not verify a certificate
            with this certificate number.
          </p>

          <Link
            href="/verify-certificate"
            className="mt-6 inline-flex rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground"
          >
            Verify Another Certificate
          </Link>
        </div>
      </main>
    );
  }

  const { certificate } = result;

  const issuedDate =
    certificate.issuedAt.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  const completedDate =
    certificate.completedAt
      ? certificate.completedAt.toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }
        )
      : null;

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <div className="overflow-hidden rounded-2xl border bg-background shadow-sm">
        <div className="border-b bg-primary/5 p-8 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" />

          <h1 className="mt-4 text-3xl font-bold">
            Certificate Verified
          </h1>

          <p className="mt-2 text-muted-foreground">
            This certificate is valid and was
            issued by Edurefer Technologies LLP.
          </p>
        </div>

        <div className="space-y-6 p-8">
          <div>
            <p className="text-sm text-muted-foreground">
              Student Name
            </p>

            <p className="mt-1 text-xl font-semibold">
              {certificate.studentName}
            </p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Course
            </p>

            <div className="mt-1 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />

              <p className="font-semibold">
                {certificate.courseTitle}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">
              Certificate Number
            </p>

            <div className="mt-1 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />

              <p className="font-mono font-semibold">
                {certificate.certificateNo}
              </p>
            </div>
          </div>

          <div className="grid gap-5 border-t pt-6 sm:grid-cols-2">
            {completedDate && (
              <div>
                <p className="text-sm text-muted-foreground">
                  Completed On
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{completedDate}</span>
                </div>
              </div>
            )}

            <div>
              <p className="text-sm text-muted-foreground">
                Issued On
              </p>

              <div className="mt-1 flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>{issuedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}