import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Download,
  FileText,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: Props) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      description: true,
      shortDescription: true,
      price: true,
      discountPrice: true,
      thumbnail: true,
      type: true,
      status: true,
      isDeleted: true,
      currency: true,
      credits: true,
    },
  });

  if (!product) {
    notFound();
  }

  if (
    product.isDeleted ||
    product.status !== "PUBLISHED"
  ) {
    notFound();
  }

  // Courses have their own dedicated preview page.
  if (product.type === "COURSE") {
    notFound();
  }

  const originalPrice = Number(product.price);

  const sellingPrice =
    product.discountPrice !== null &&
      Number(product.discountPrice) > 0 &&
      Number(product.discountPrice) < originalPrice
      ? Number(product.discountPrice)
      : originalPrice;

  const discountAmount = originalPrice - sellingPrice;

  const discountPercentage =
    discountAmount > 0
      ? Math.round(
        (discountAmount / originalPrice) * 100
      )
      : 0;

  const isPdf = product.type === "PDF";
  const isAiCredits = product.type === "AI_CREDITS";

  return (
    <main className="min-h-screen bg-background">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="border-b">
        <div className="container mx-auto px-4 py-10 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            {/* Product Thumbnail */}
            <div className="overflow-hidden rounded-2xl border bg-muted shadow-sm">
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={1000}
                  height={700}
                  priority
                  className="h-auto w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video items-center justify-center">
                  {isPdf ? (
                    <FileText className="h-20 w-20 text-muted-foreground" />
                  ) : (
                    <Sparkles className="h-20 w-20 text-muted-foreground" />
                  )}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div>
              {/* Product Type */}
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium">
                {isPdf ? (
                  <>
                    <FileText className="h-4 w-4" />
                    PDF Kit
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    AI Credits
                  </>
                )}
              </div>

              {/* Product Name */}
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                {product.name}
              </h1>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="mt-5 text-lg leading-8 text-muted-foreground">
                  {product.shortDescription}
                </p>
              )}

              {/* AI Credits */}
              {isAiCredits &&
                product.credits !== null && (
                  <div className="mt-7 rounded-2xl border p-6">
                    <div className="flex items-center gap-3">
                      <div className="rounded-xl border p-3">
                        <Sparkles className="h-6 w-6" />
                      </div>

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Included AI Credits
                        </p>

                        <p className="text-3xl font-bold">
                          {product.credits.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {/* Product Highlights */}
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border p-4">
                  {isPdf ? (
                    <FileText className="mb-2 h-5 w-5" />
                  ) : (
                    <Sparkles className="mb-2 h-5 w-5" />
                  )}

                  <p className="text-sm font-semibold">
                    {isPdf
                      ? "Digital Product"
                      : "AI Credits"}
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {isPdf
                      ? "Digital resource"
                      : "Use across AI tools"}
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <Zap className="mb-2 h-5 w-5" />

                  <p className="text-sm font-semibold">
                    Instant Access
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    After purchase
                  </p>
                </div>

                <div className="rounded-xl border p-4">
                  <ShieldCheck className="mb-2 h-5 w-5" />

                  <p className="text-sm font-semibold">
                    Secure Purchase
                  </p>

                  <p className="mt-1 text-xs text-muted-foreground">
                    Secure checkout
                  </p>
                </div>
              </div>

              {/* Pricing */}
              <div className="mt-8 rounded-2xl border p-6">
                <div className="flex flex-wrap items-end gap-3">
                  <span className="text-4xl font-bold">
                    ₹{sellingPrice.toLocaleString("en-IN")}
                  </span>

                  {discountAmount > 0 && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹
                        {originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      <span className="rounded-full bg-green-100 px-2.5 py-1 text-sm font-semibold text-green-700">
                        {discountPercentage}% OFF
                      </span>
                    </>
                  )}
                </div>

                {discountAmount > 0 && (
                  <p className="mt-2 text-sm text-green-600">
                    You save ₹
                    {discountAmount.toLocaleString(
                      "en-IN"
                    )}
                  </p>
                )}

                <Link
                  href={`/products/${product.slug}/checkout`}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Buy Now
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Secure payment • Access after successful
                  purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          ABOUT PRODUCT
      ====================================================== */}
      {product.description && (
        <section className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium text-muted-foreground">
              About this product
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {product.name}
            </h2>

            <div className="mt-7 rounded-2xl border p-6 lg:p-8">
              <div className="whitespace-pre-line text-base leading-8 text-muted-foreground">
                {product.description}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================
          PRODUCT INFORMATION
      ====================================================== */}
      <section className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-14">
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                Product Information
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                What You Get
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {/* Product Type */}
              <div className="rounded-2xl border bg-background p-6">
                {isPdf ? (
                  <FileText className="mb-4 h-6 w-6" />
                ) : (
                  <Sparkles className="mb-4 h-6 w-6" />
                )}

                <h3 className="font-semibold">
                  Product Type
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {isPdf
                    ? "Digital PDF Kit"
                    : "AI Credits"}
                </p>
              </div>

              {/* AI Credits */}
              {isAiCredits &&
                product.credits !== null && (
                  <div className="rounded-2xl border bg-background p-6">
                    <Sparkles className="mb-4 h-6 w-6" />

                    <h3 className="font-semibold">
                      AI Credits
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                      {product.credits.toLocaleString(
                        "en-IN"
                      )}{" "}
                      credits included
                    </p>
                  </div>
                )}

              {/* Digital Access */}
              <div className="rounded-2xl border bg-background p-6">
                <CheckCircle2 className="mb-4 h-6 w-6" />

                <h3 className="font-semibold">
                  Digital Access
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Available through your Edurefer account
                  after successful purchase.
                </p>
              </div>

              {/* Secure Purchase */}
              <div className="rounded-2xl border bg-background p-6">
                <ShieldCheck className="mb-4 h-6 w-6" />

                <h3 className="font-semibold">
                  Secure Purchase
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  Payments are processed through the
                  existing secure checkout system.
                </p>
              </div>

              {/* PDF */}
              {isPdf && (
                <div className="rounded-2xl border bg-background p-6">
                  <Download className="mb-4 h-6 w-6" />

                  <h3 className="font-semibold">
                    Digital Resource
                  </h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Your purchased PDF will be available
                    according to the product access flow.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="container mx-auto px-4 py-14">
        <div className="mx-auto max-w-3xl rounded-2xl border p-8 text-center lg:p-10">
          <h2 className="text-3xl font-bold">
            Get {product.name}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Get access to this product through your
            Edurefer account.
          </p>

          <Link
            href={`/products/${product.slug}/checkout`}
            className="mx-auto mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            Continue to Checkout
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}