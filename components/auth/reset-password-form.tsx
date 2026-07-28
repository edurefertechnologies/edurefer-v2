"use client";

import {
  FormEvent,
  useState,
} from "react";
import Link from "next/link";
import {
  CheckCircle2,
  LockKeyhole,
} from "lucide-react";
import { useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

export default function ResetPasswordForm() {
  const router = useRouter();

  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState(false);

  async function onSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (password.length < 8) {
      toast.error(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      toast.error(
        "Passwords do not match."
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await authClient.resetPassword({
          newPassword: password,
        });

      if (result.error) {
        toast.error(
          result.error.message ||
            "The reset link is invalid or has expired."
        );
        return;
      }

      setSuccess(true);

      toast.success(
        "Password changed successfully."
      );
    } catch (error) {
      console.error(
        "RESET_PASSWORD_ERROR:",
        error
      );

      toast.error(
        "Unable to reset your password."
      );
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <Card>
        <CardHeader>
          <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>

          <CardTitle>
            Password Updated
          </CardTitle>

          <CardDescription>
            Your Edurefer password has been
            changed successfully.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button
            className="w-full"
            onClick={() => {
              router.push("/login");
              router.refresh();
            }}
          >
            Continue to Login
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <LockKeyhole className="h-5 w-5 text-primary" />
        </div>

        <CardTitle>
          Create New Password
        </CardTitle>

        <CardDescription>
          Enter a new password for your
          Edurefer account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={onSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <Label htmlFor="password">
              New Password
            </Label>

            <PasswordInput
              id="password"
              autoComplete="new-password"
              placeholder="Enter new password"
              value={password}
              onChange={(event) =>
                setPassword(
                  event.target.value
                )
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              Confirm Password
            </Label>

            <PasswordInput
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) =>
                setConfirmPassword(
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
              ? "Updating..."
              : "Reset Password"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}