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
  Users,
  Zap,
} from "lucide-react";

import Container from "@/components/layout/container";
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
      fileUrl: true,
      type: true,
      status: true,
      isDeleted: true,

      credits: true,
      isFeatured: true,
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

  // Course products have their own dedicated course page.
  if (product.type === "COURSE") {
    notFound();
  }

  const isPdf = product.type === "PDF";
  const isAiCredits = product.type === "AI_CREDITS";

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

  /*
   * Count paid orders for this product.
   *
   * This is intentionally calculated from OrderItem
   * instead of showing a hardcoded number.
   */
  const purchaseCount = await prisma.orderItem.count({
    where: {
      productId: product.id,
      order: {
        status: "PAID",
      },
    },
  });

  return (
    <main className="min-h-screen">
      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="section">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* =================================================
                LEFT CONTENT
            ================================================== */}
            <div>
              {/* Product Type */}
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
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
              </span>

              {/* Featured */}
              {product.isFeatured && (
                <span className="ml-2 inline-flex items-center rounded-full bg-yellow-500/10 px-4 py-2 text-sm font-medium text-yellow-600">
                  Featured
                </span>
              )}

              {/* Title */}
              <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
                {product.name}
              </h1>

              {/* Short Description */}
              {product.shortDescription && (
                <p className="mt-6 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  {product.shortDescription}
                </p>
              )}

              {/* Product Stats */}
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                {purchaseCount > 0 && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />

                    <span>
                      {purchaseCount.toLocaleString(
                        "en-IN"
                      )}{" "}
                      {purchaseCount === 1
                        ? "Purchase"
                        : "Purchases"}
                    </span>
                  </div>
                )}

                {isAiCredits &&
                  product.credits !== null && (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-primary" />

                      <span>
                        {product.credits.toLocaleString(
                          "en-IN"
                        )}{" "}
                        AI Credits
                      </span>
                    </div>
                  )}

                {isPdf && (
                  <div className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-primary" />

                    <span>
                      Digital PDF Product
                    </span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-primary" />

                  <span>Secure Purchase</span>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link
                  href={`/product-checkout/${product.slug}`}
                  className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {isAiCredits
                    ? "Get AI Credits"
                    : "Get This Kit"}

                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <Link
                  href="#overview"
                  className="inline-flex items-center justify-center rounded-lg border px-6 py-3 text-base font-semibold transition-colors hover:bg-muted"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* =================================================
                RIGHT PRODUCT CARD
            ================================================== */}
            <div className="glass-card overflow-hidden">
              {/* Thumbnail */}
              {product.thumbnail ? (
                <Image
                  src={product.thumbnail}
                  alt={product.name}
                  width={700}
                  height={500}
                  priority
                  className="aspect-video w-full object-cover"
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center bg-muted">
                  {isPdf ? (
                    <FileText className="h-20 w-20 text-muted-foreground" />
                  ) : (
                    <Sparkles className="h-20 w-20 text-muted-foreground" />
                  )}
                </div>
              )}

              <div className="space-y-5 p-5 sm:p-8">
                {/* Price */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Product Price
                  </span>

                  <div className="text-right">
                    {discountAmount > 0 ? (
                      <>
                        <span className="text-3xl font-bold text-primary">
                          ₹
                          {sellingPrice.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ₹
                          {originalPrice.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      </>
                    ) : (
                      <span className="text-3xl font-bold text-primary">
                        ₹
                        {originalPrice.toLocaleString(
                          "en-IN"
                        )}
                      </span>
                    )}
                  </div>
                </div>

                {/* Discount */}
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">
                      Discount
                    </span>

                    <span className="font-medium text-green-600">
                      {discountPercentage}% OFF
                    </span>
                  </div>
                )}

                {/* Type */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Product Type
                  </span>

                  <span>
                    {isPdf
                      ? "PDF / Digital Kit"
                      : "AI Credits"}
                  </span>
                </div>

                {/* AI Credits */}
                {isAiCredits &&
                  product.credits !== null && (
                    <div className="flex items-center justify-between gap-4">
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

                {/* Access */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-muted-foreground">
                    Access
                  </span>

                  <span>Digital</span>
                </div>

                {/* Purchase Count */}
                {purchaseCount > 0 && (
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-muted-foreground">
                      Purchased
                    </span>

                    <span>
                      {purchaseCount.toLocaleString(
                        "en-IN"
                      )}{" "}
                      users
                    </span>
                  </div>
                )}

                {/* CTA */}
                <Link
                  href={`/product-checkout/${product.slug}`}
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {isAiCredits
                    ? "Get AI Credits"
                    : "Get This Kit"}

                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>

                <p className="text-center text-xs text-muted-foreground">
                  Secure payment • Digital access after
                  successful purchase
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          OVERVIEW
      ====================================================== */}
      <section
        id="overview"
        className="section border-t"
      >
        <Container>
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <span className="text-sm font-medium text-primary">
                Product Overview
              </span>

              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                About {product.name}
              </h2>
            </div>

            {product.description ? (
              <div className="mt-8 rounded-2xl border p-6 sm:p-8">
                <div className="whitespace-pre-line text-base leading-8 text-muted-foreground">
                  {product.description}
                </div>
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border p-6 text-center">
                <p className="text-muted-foreground">
                  Product details will be available
                  soon.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* =====================================================
          PRODUCT DETAILS
      ====================================================== */}
      <section className="section bg-muted/20">
        <Container>
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <span className="text-sm font-medium text-primary">
                Product Details
              </span>

              <h2 className="mt-2 text-3xl font-bold sm:text-4xl">
                What You Get
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {/* Product Type */}
              <div className="rounded-2xl border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    {isPdf ? (
                      <FileText className="h-6 w-6 text-primary" />
                    ) : (
                      <Sparkles className="h-6 w-6 text-primary" />
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {isPdf
                        ? "Digital PDF Kit"
                        : "AI Credits Package"}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {isPdf
                        ? "A digital PDF product available through your Edurefer purchase."
                        : product.credits !== null
                          ? `${product.credits.toLocaleString(
                            "en-IN"
                          )} AI credits are included with this product.`
                          : "AI credits are included with this product."}
                    </p>
                  </div>
                </div>
              </div>

              {/* Instant Access */}
              <div className="rounded-2xl border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Digital Access
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Access is provided through your
                      Edurefer account after a successful
                      purchase.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secure Purchase */}
              <div className="rounded-2xl border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <ShieldCheck className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Secure Purchase
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      Payments are handled through
                      Edurefer's existing secure payment
                      flow.
                    </p>
                  </div>
                </div>
              </div>

              {/* Purchase Count */}
              <div className="rounded-2xl border bg-background p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Users className="h-6 w-6 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Community
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {purchaseCount > 0
                        ? `${purchaseCount.toLocaleString(
                          "en-IN"
                        )} ${purchaseCount === 1
                          ? "purchase"
                          : "purchases"
                        } recorded for this product.`
                        : "Be among the first to purchase this product."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          FINAL CTA
      ====================================================== */}
      <section className="section">
        <Container>
          <div className="mx-auto max-w-3xl rounded-2xl border p-8 text-center sm:p-10">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
              {isPdf ? (
                <FileText className="h-7 w-7 text-primary" />
              ) : (
                <Sparkles className="h-7 w-7 text-primary" />
              )}
            </div>

            <h2 className="mt-6 text-3xl font-bold">
              Get {product.name}
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              {isAiCredits
                ? "Purchase your AI credits and use them through your Edurefer account."
                : "Get instant access to your digital product after successful purchase."}
            </p>

            <Link
              href={`/product-checkout/${product.slug}`}
              className="mx-auto mt-7 inline-flex items-center justify-center rounded-lg bg-primary px-7 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {isAiCredits
                ? "Get AI Credits"
                : "Get This Kit"}

              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}