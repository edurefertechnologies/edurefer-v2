import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-xl">
        <CheckCircle2 className="mx-auto mb-6 h-20 w-20 text-green-500" />

        <h1 className="mb-3 text-3xl font-bold text-gray-900">
          Payment Successful
        </h1>

        <p className="mb-8 text-gray-600">
          Thank you for your purchase.
          <br />
          Your course has been successfully enrolled.
        </p>

        <div className="space-y-4">
          <Link
            href="/dashboard"
            className="block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>

          <Link
            href="/courses"
            className="block rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100"
          >
            Explore More Courses
          </Link>
        </div>
      </div>
    </div>
  );
}