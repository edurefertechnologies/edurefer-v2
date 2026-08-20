import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  FileText,
  Package as PackageIcon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { prisma } from "@/lib/prisma";
import PaymentButton from "@/components/payment-button";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CheckoutPage({
  params,
}: Props) {
  const { slug } = await params;

  /*
   * =========================================================
   * 1. COURSE CHECKOUT
   * =========================================================
   */
  const course = await prisma.course.findUnique({
    where: {
      slug,
    },
    include: {
      product: true,
    },
  });

  if (course) {
    const originalPrice = Number(
      course.product.price
    );

    const sellingPrice =
      course.product.discountPrice !== null &&
        Number(course.product.discountPrice) > 0 &&
        Number(course.product.discountPrice) <
        originalPrice
        ? Number(course.product.discountPrice)
        : originalPrice;

    const discount =
      originalPrice - sellingPrice;

    return (
      <main className="min-h-screen">
        <div className="container mx-auto max-w-5xl px-4 py-10">
          <Link
            href={`/courses/${course.slug}`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>

          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <div className="mt-8 rounded-xl border p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <BookOpen className="h-4 w-4" />
              Course Enrollment
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              {course.title}
            </h2>

            <p className="mt-2 text-muted-foreground">
              {course.description}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex justify-between">
                <span>Course Price</span>

                <span>
                  ₹
                  {originalPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>

                  <span>
                    -₹
                    {discount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              )}

              <div className="border-t pt-3">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <div className="text-right">
                    <span className="text-2xl font-bold">
                      ₹
                      {sellingPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {discount > 0 && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        ₹
                        {originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-5">
                <PaymentButton
                  slug={course.slug}
                  type="COURSE"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * =========================================================
   * 2. INDIVIDUAL PRODUCT CHECKOUT
   * =========================================================
   *
   * Handles:
   * - PDF
   * - AI_CREDITS
   */
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
      credits: true,
    },
  });

  if (product) {
    if (
      product.isDeleted ||
      product.status !== "PUBLISHED"
    ) {
      notFound();
    }

    /*
     * Course products are handled by the Course flow.
     */
    if (product.type === "COURSE") {
      notFound();
    }

    const isPdf = product.type === "PDF";
    const isAiCredits =
      product.type === "AI_CREDITS";

    const originalPrice = Number(product.price);

    const sellingPrice =
      product.discountPrice !== null &&
        Number(product.discountPrice) > 0 &&
        Number(product.discountPrice) <
        originalPrice
        ? Number(product.discountPrice)
        : originalPrice;

    const discount =
      originalPrice - sellingPrice;

    const discountPercentage =
      discount > 0
        ? Math.round(
          (discount / originalPrice) * 100
        )
        : 0;

    return (
      <main className="min-h-screen">
        <div className="container mx-auto max-w-5xl px-4 py-10">
          <Link
            href={`/products/${product.slug}`}
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Product
          </Link>

          <h1 className="text-4xl font-bold">
            Checkout
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
            {/* Product Information */}
            <div className="rounded-xl border p-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                {isPdf ? (
                  <>
                    <FileText className="h-4 w-4" />
                    PDF / Digital Kit
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    AI Credits
                  </>
                )}
              </div>

              <h2 className="mt-5 text-2xl font-semibold">
                {product.name}
              </h2>

              {product.shortDescription && (
                <p className="mt-3 text-muted-foreground">
                  {product.shortDescription}
                </p>
              )}

              {isAiCredits &&
                product.credits !== null && (
                  <div className="mt-6 rounded-xl border bg-muted/20 p-5">
                    <div className="flex items-center gap-3">
                      <Sparkles className="h-5 w-5 text-primary" />

                      <div>
                        <p className="text-sm text-muted-foreground">
                          Included AI Credits
                        </p>

                        <p className="text-2xl font-bold">
                          {product.credits.toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

              {product.description && (
                <div className="mt-7 border-t pt-6">
                  <h3 className="font-semibold">
                    Product Details
                  </h3>

                  <p className="mt-3 whitespace-pre-line text-sm leading-7 text-muted-foreground">
                    {product.description}
                  </p>
                </div>
              )}

              <div className="mt-7 flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <p className="text-sm font-medium">
                    Secure Checkout
                  </p>

                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Your payment is processed securely
                    through Edurefer's payment system.
                  </p>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-xl border p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-bold">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between gap-4">
                  <span className="text-sm text-muted-foreground">
                    Product Price
                  </span>

                  <span className="text-sm font-medium">
                    ₹
                    {originalPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>
                      Discount{" "}
                      <span className="text-xs">
                        ({discountPercentage}% OFF)
                      </span>
                    </span>

                    <span>
                      -₹
                      {discount.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>
                )}

                {isAiCredits &&
                  product.credits !== null && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        AI Credits
                      </span>

                      <span className="font-medium">
                        {product.credits.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    </div>
                  )}

                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">
                      Total
                    </span>

                    <div className="text-right">
                      <span className="text-2xl font-bold text-primary">
                        ₹
                        {sellingPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>

                      {discount > 0 && (
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ₹
                          {originalPrice.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3">
                  <PaymentButton
                    slug={product.slug}
                    type={
                      isPdf
                        ? "PDF"
                        : "AI_CREDITS"
                    }
                  />
                </div>

                <p className="text-center text-xs leading-5 text-muted-foreground">
                  Secure payment • Digital access after
                  successful purchase
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  /*
   * =========================================================
   * 3. PACKAGE CHECKOUT
   * =========================================================
   *
   * Package contains:
   * - Course
   * - PDF Kit
   * - AI Credits
   */
  const pkg = await prisma.package.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      slug: true,
      shortDescription: true,
      price: true,
      discountPrice: true,
      thumbnail: true,
      status: true,
      items: {
        select: {
          quantity: true,
          product: {
            select: {
              id: true,
              name: true,
              type: true,
              credits: true,
            },
          },
        },
      },
    },
  });

  if (!pkg) {
    notFound();
  }

  if (pkg.status !== "PUBLISHED") {
    notFound();
  }

  const originalPrice = Number(pkg.price);

  const sellingPrice =
    pkg.discountPrice !== null &&
      Number(pkg.discountPrice) > 0 &&
      Number(pkg.discountPrice) < originalPrice
      ? Number(pkg.discountPrice)
      : originalPrice;

  const discount =
    originalPrice - sellingPrice;

  const discountPercentage =
    discount > 0
      ? Math.round(
        (discount / originalPrice) * 100
      )
      : 0;

  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 py-10">
        <Link
          href={`/pricing`}
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Packages
        </Link>

        <h1 className="text-4xl font-bold">
          Checkout
        </h1>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* =================================================
              PACKAGE INFORMATION
          ================================================== */}
          <div className="rounded-xl border p-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <PackageIcon className="h-4 w-4" />
              Package
            </div>

            <h2 className="mt-5 text-2xl font-semibold">
              {pkg.name}
            </h2>

            {pkg.shortDescription && (
              <p className="mt-3 leading-7 text-muted-foreground">
                {pkg.shortDescription}
              </p>
            )}

            {/* Included Items */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold">
                What's Included
              </h3>

              <div className="mt-4 space-y-3">
                {pkg.items.map((item) => {
                  const productType =
                    item.product.type;

                  const isCourse =
                    productType === "COURSE";

                  const isPdf =
                    productType === "PDF";

                  const isAiCredits =
                    productType === "AI_CREDITS";

                  return (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-4 rounded-xl border p-4"
                    >
                      <div className="rounded-lg bg-primary/10 p-2.5">
                        {isCourse ? (
                          <BookOpen className="h-5 w-5 text-primary" />
                        ) : isPdf ? (
                          <FileText className="h-5 w-5 text-primary" />
                        ) : (
                          <Sparkles className="h-5 w-5 text-primary" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="font-medium">
                          {item.product.name}
                        </p>

                        <p className="mt-1 text-xs text-muted-foreground">
                          {isCourse
                            ? "Course"
                            : isPdf
                              ? "PDF / Digital Kit"
                              : "AI Credits"}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm font-medium">
                          ×{item.quantity}
                        </p>

                        {isAiCredits &&
                          item.product
                            .credits !== null && (
                            <p className="mt-1 text-xs text-muted-foreground">
                              {(
                                Number(
                                  item.product
                                    .credits
                                ) *
                                Number(
                                  item.quantity
                                )
                              ).toLocaleString(
                                "en-IN"
                              )}{" "}
                              credits
                            </p>
                          )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Secure Checkout */}
            <div className="mt-7 flex items-start gap-3 rounded-xl border bg-muted/20 p-4">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium">
                  Secure Package Checkout
                </p>

                <p className="mt-1 text-xs leading-5 text-muted-foreground">
                  Purchase the complete package through
                  Edurefer's secure payment system.
                </p>
              </div>
            </div>
          </div>

          {/* =================================================
              PACKAGE ORDER SUMMARY
          ================================================== */}
          <div className="h-fit rounded-xl border p-6 lg:sticky lg:top-24">
            <h2 className="text-xl font-bold">
              Order Summary
            </h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Package Price
                </span>

                <span className="text-sm font-medium">
                  ₹
                  {originalPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600">
                  <span>
                    Package Discount{" "}
                    <span className="text-xs">
                      ({discountPercentage}% OFF)
                    </span>
                  </span>

                  <span>
                    -₹
                    {discount.toLocaleString(
                      "en-IN"
                    )}
                  </span>
                </div>
              )}

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    Total
                  </span>

                  <div className="text-right">
                    <span className="text-2xl font-bold text-primary">
                      ₹
                      {sellingPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                    {discount > 0 && (
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        ₹
                        {originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Package Payment */}
              <div className="pt-3">
                <PaymentButton
                  slug={pkg.slug}
                  type="PACKAGE"
                />
              </div>

              <p className="text-center text-xs leading-5 text-muted-foreground">
                Secure payment • Package benefits
                activated after successful purchase
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}