"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import {
  loginSchema,
  type LoginSchema,
} from "@/lib/validations/login";

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
import Image from "next/image";

import {
  ArrowRight,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [googleLoading, setGoogleLoading] =
    useState(false);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  /*
   * =========================================================
   * EMAIL / PASSWORD LOGIN
   * =========================================================
   */

  async function onSubmit(values: LoginSchema) {
    try {
      setLoading(true);

      const result =
        await authClient.signIn.email({
          email: values.email,
          password: values.password,
        });

      if (result.error) {
        toast.error(
          result.error.message ||
          "Unable to sign in."
        );

        return;
      }

      toast.success("Welcome back! 👋");

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(
        "EMAIL_LOGIN_ERROR:",
        error
      );

      toast.error(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  /*
   * =========================================================
   * GOOGLE LOGIN
   * =========================================================
   */

  async function handleGoogleLogin() {
    try {
      setGoogleLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/dashboard",
      });
    } catch (error) {
      console.error(
        "GOOGLE_LOGIN_ERROR:",
        error
      );

      toast.error(
        "Unable to continue with Google."
      );

      setGoogleLoading(false);
    }
  }

  const isLoading =
    loading || googleLoading;

  return (
    <Card
      className="
        relative
        w-full
        overflow-hidden
        border-white/10
        bg-slate-950/80
        shadow-2xl
        backdrop-blur-xl
      "
    >
      {/* =====================================================
          PREMIUM BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />

      {/* =====================================================
          HEADER
      ====================================================== */}

      <CardHeader className="relative space-y-3 pb-5 text-center">
        {/* Logo / Icon */}

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 shadow-[0_0_30px_rgba(34,211,238,0.10)]">
          <span className="text-2xl font-black tracking-tight text-cyan-400">
            E
          </span>
        </div>

        <div>
          <CardTitle className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Welcome Back 👋
          </CardTitle>

          <CardDescription className="mt-2 text-sm text-slate-400">
            Sign in to continue your Edurefer journey.
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="relative">
        {/* ===================================================
            GOOGLE LOGIN
        ==================================================== */}

        <Button
          type="button"
          variant="outline"
          className="
    relative
    h-12
    w-full
    border-white
    bg-white
    text-black
    shadow-sm
    transition-all
    duration-300
    hover:border-gray-200
    hover:bg-gray-100
    hover:text-black
  "
          disabled={isLoading}
          onClick={handleGoogleLogin}
        >
          {googleLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting to Google...
            </>
          ) : (
            <>
              <Image
                src="/google_logo.png"
                alt="Google"
                width={22}
                height={22}
                className="mr-3 h-5 w-5"
              />

              Continue with Google
            </>
          )}
        </Button>

        {/* ===================================================
            DIVIDER
        ==================================================== */}

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />

          <span className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
            Or continue with email
          </span>

          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* ===================================================
            EMAIL FORM
        ==================================================== */}

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          {/* Email */}

          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-slate-200"
            >
              Email Address
            </Label>

            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="name@example.com"
              disabled={isLoading}
              className="
                h-12
                border-white/10
                bg-white/[0.04]
                text-white
                placeholder:text-slate-500
                focus:border-cyan-400/50
                focus:ring-cyan-400/10
              "
              {...form.register("email")}
            />

            {form.formState.errors.email && (
              <p className="text-xs text-red-400">
                {
                  form.formState.errors.email
                    .message
                }
              </p>
            )}
          </div>

          {/* Password */}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-slate-200"
              >
                Password
              </Label>

              <Link
                href="/forgot-password"
                className="
                  text-xs
                  font-medium
                  text-cyan-400
                  transition
                  hover:text-cyan-300
                  hover:underline
                "
              >
                Forgot Password?
              </Link>
            </div>

            <PasswordInput
              id="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              disabled={isLoading}
              className="
                h-12
                border-white/10
                bg-white/[0.04]
                text-white
                placeholder:text-slate-500
                focus:border-cyan-400/50
                focus:ring-cyan-400/10
              "
              {...form.register("password")}
            />

            {form.formState.errors.password && (
              <p className="text-xs text-red-400">
                {
                  form.formState.errors.password
                    .message
                }
              </p>
            )}
          </div>

          {/* =================================================
              SIGN IN BUTTON
          ================================================== */}

          <Button
            type="submit"
            className="
              h-12
              w-full
              bg-cyan-400
              font-semibold
              text-slate-950
              shadow-[0_0_25px_rgba(34,211,238,0.12)]
              transition-all
              duration-300
              hover:bg-cyan-300
              hover:shadow-[0_0_35px_rgba(34,211,238,0.20)]
            "
            disabled={isLoading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                Signing In...
              </>
            ) : (
              <>
                Sign In

                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        {/* ===================================================
            TRUST MESSAGE
        ==================================================== */}

        <div className="mt-6 flex items-center justify-center gap-2 text-center">
          <ShieldCheck className="h-4 w-4 text-cyan-400" />

          <span className="text-[11px] text-slate-500">
            Secure authentication powered by Edurefer
          </span>
        </div>

        {/* ===================================================
            REGISTER
        ==================================================== */}

        <div className="mt-6 border-t border-white/10 pt-5 text-center">
          <p className="text-sm text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="
                font-semibold
                text-cyan-400
                transition
                hover:text-cyan-300
                hover:underline
              "
            >
              Create Account
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}