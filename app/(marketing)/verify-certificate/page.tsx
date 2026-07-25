"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Award,
  Search,
  ShieldCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function VerifyCertificatePage() {
  const router = useRouter();

  const [certificateNo, setCertificateNo] =
    useState("");

  const [error, setError] =
    useState("");

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const value =
      certificateNo.trim().toUpperCase();

    if (!value) {
      setError(
        "Please enter a certificate number."
      );
      return;
    }

    setError("");

    router.push(
      `/verify-certificate/${encodeURIComponent(
        value
      )}`
    );
  };

  return (
    <main className="mx-auto flex min-h-[75vh] max-w-4xl items-center justify-center px-4 py-12">
      <div className="w-full">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>

          <h1 className="mt-6 text-3xl font-bold sm:text-4xl">
            Verify Certificate
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Verify the authenticity of a
            certificate issued by Edurefer
            Technologies LLP.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-xl rounded-2xl border bg-background p-6 shadow-sm sm:p-8">
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="certificateNo"
                className="text-sm font-medium"
              >
                Certificate Number
              </label>

              <div className="relative mt-2">
                <Award className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

                <input
                  id="certificateNo"
                  type="text"
                  value={certificateNo}
                  onChange={(event) => {
                    setCertificateNo(
                      event.target.value
                    );

                    if (error) {
                      setError("");
                    }
                  }}
                  placeholder="e.g. EDU-2026-XXXXXXXXXX"
                  autoComplete="off"
                  className="h-12 w-full rounded-md border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>

              {error && (
                <p className="mt-2 text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full"
            >
              <Search className="mr-2 h-5 w-5" />
              Verify Certificate
            </Button>
          </form>

          <div className="mt-6 border-t pt-6">
            <p className="text-center text-sm text-muted-foreground">
              Enter the certificate number
              exactly as shown on the issued
              certificate.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}