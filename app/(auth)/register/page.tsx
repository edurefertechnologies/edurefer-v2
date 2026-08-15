import { Suspense } from "react";

import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-sm text-muted-foreground">
            Loading...
          </div>
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}