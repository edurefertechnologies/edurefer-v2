"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  registerSchema,
  type RegisterSchema,
} from "@/lib/validations/auth";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";

interface RegisterFormProps {
  referralCode?: string | null;
}

export default function RegisterForm({
  referralCode,
}: RegisterFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: RegisterSchema) {
    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        email: values.email,
        password: values.password,

        name: `${values.firstName} ${values.lastName ?? ""}`.trim(),

        firstName: values.firstName,
        lastName: values.lastName,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (referralCode) {
        try {
          const response = await fetch(
            "/api/referrals/attach",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                referralCode,
              }),
            }
          );

          const result = await response.json();

          if (!response.ok) {
            console.warn(
              "REFERRAL_ATTACH_REJECTED:",
              result?.error ||
              "Unable to attach referral."
            );
          }
        } catch (error) {
          console.error(
            "REFERRAL_ATTACH_ERROR:",
            error
          );
        }
      }

      toast.success("Account created successfully!");

      router.push(
        `/verify-email?email=${encodeURIComponent(values.email)}`
      );
      router.refresh();
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  return (

    <Card>
      <CardHeader>
        <CardTitle>Create Your Account 🚀</CardTitle>
        <CardDescription>
          Start learning with Edurefer today.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >

          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              placeholder="First Name"
              {...register("firstName")}
            />

            {errors.firstName && (
              <p className="text-sm text-red-500">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              placeholder="Last Name"
              {...register("lastName")}
            />

            {errors.lastName && (
              <p className="text-sm text-red-500">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
            />

            {errors.email && (
              <p className="text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <PasswordInput
              id="password"
              {...register("password")}
            />

            {errors.password && (
              <p className="text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <PasswordInput
              id="confirmPassword"
              {...register("confirmPassword")}
            />

            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary"
            >
              Sign In
            </Link>
          </p>

        </form>
      </CardContent>
    </Card>
  );
}