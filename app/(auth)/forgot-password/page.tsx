import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-server";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";

export default async function ForgotPasswordPage() {
  const session = await getSession();

  if (session) {
    redirect("/dashboard");
  }

  return <ForgotPasswordForm />;
}