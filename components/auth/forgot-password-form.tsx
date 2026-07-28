"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] =
    useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const normalizedEmail =
      email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.error(
        "Please enter your email address."
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await authClient.requestPasswordReset({
          email: normalizedEmail,

          redirectTo:
            "/reset-password",
        });

      if (result.error) {
        /*
         * Keep the UI response generic.
         * We don't want to reveal whether
         * an account exists for an email.
         */
        console.error(
          "PASSWORD_RESET_REQUEST_ERROR:",
          result.error
        );
      }

      setSent(true);

      toast.success(
        "If an account exists for this email, a reset link has been sent."
      );
    } catch (error) {
      console.error(
        "PASSWORD_RESET_REQUEST_ERROR:",
        error
      );

      /*
       * Generic response prevents account
       * enumeration.
       */
      setSent(true);

      toast.success(
        "If an account exists for this email, a reset link has been sent."
      );
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <Card>
        <CardHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-5 w-5 text-primary" />
          </div>

          <CardTitle>
            Check your email
          </CardTitle>

          <CardDescription>
            If an Edurefer account exists
            for {email}, we&apos;ve sent a
            password reset link.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            The reset link is temporary. If
            you don&apos;t see the email,
            check your spam or junk folder.
          </p>

          <Button
            variant="outline"
            className="w-full"
            onClick={() => setSent(false)}
          >
            Try Another Email
          </Button>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Forgot Password?
        </CardTitle>

        <CardDescription>
          Enter your registered email
          address and we&apos;ll send you a
          secure password reset link.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={onSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) =>
                setEmail(
                  event.target.value
                )
              }
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading
              ? "Sending..."
              : "Send Reset Link"}
          </Button>

          <Link
            href="/login"
            className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Login
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}