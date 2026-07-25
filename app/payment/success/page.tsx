import Link from "next/link";
import { redirect } from "next/navigation";
import {
  CheckCircle2,
  BookOpen,
  LayoutDashboard,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";

interface Props {
  searchParams: Promise<{
    course?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: Props) {
  const session = await getSession();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const { course: courseSlug } = await searchParams;

  let enrollment = null;

  if (courseSlug) {
    enrollment = await prisma.enrollment.findFirst({
      where: {
        userId: session.user.id,

        course: {
          slug: courseSlug,
        },
      },

      select: {
        id: true,
        enrolledAt: true,

        course: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 text-center shadow-xl sm:p-8">
        <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-green-500 sm:h-20 sm:w-20" />

        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Payment Successful
        </h1>

        {enrollment ? (
          <>
            <p className="mt-3 text-gray-600">
              Your payment was verified successfully and
              you are now enrolled in
            </p>

            <p className="mt-2 text-lg font-semibold text-gray-900">
              {enrollment.course.title}
            </p>

            <div className="mt-8 space-y-3">
              <Link
                href={`/learn/${enrollment.course.slug}`}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                <BookOpen className="h-5 w-5" />
                Start Learning
              </Link>

              <Link
                href="/dashboard"
                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
              >
                <LayoutDashboard className="h-5 w-5" />
                Go to Dashboard
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-gray-600">
              Your payment has been processed successfully.
            </p>

            <p className="mt-2 text-sm text-gray-500">
              You can access your purchased courses from
              your dashboard.
            </p>

            <div className="mt-8">
              <Link
                href="/dashboard"
                className="block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
              >
                Go to Dashboard
              </Link>
            </div>
          </>
        )}

        <Link
          href="/courses"
          className="mt-4 block rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
        >
          Explore More Courses
        </Link>
      </div>
    </div>
  );
}