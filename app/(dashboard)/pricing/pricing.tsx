"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Package,
  GraduationCap,
  Sparkles,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getPricingData } from "@/actions/pricing/get-pricing";

type PricingData = Awaited<
  ReturnType<typeof getPricingData>
>;

type Category =
  | "packages"
  | "courses"
  | "aiCredits"
  | "pdfs";

const categories = [
  {
    key: "packages" as const,
    title: "Packages",
    description: "Best value bundles",
    icon: Package,
  },
  {
    key: "courses" as const,
    title: "Courses",
    description: "Industry-ready courses",
    icon: GraduationCap,
  },
  {
    key: "aiCredits" as const,
    title: "AI Credits",
    description: "Power your AI tools",
    icon: Sparkles,
  },
  {
    key: "pdfs" as const,
    title: "PDFs",
    description: "Premium learning resources",
    icon: FileText,
  },
];

export default function Pricing() {
  const [data, setData] =
    useState<PricingData | null>(null);

  const [activeCategory, setActiveCategory] =
    useState<Category>("packages");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadPricing() {
      try {
        const result = await getPricingData();
        setData(result);
      } catch (error) {
        console.error(
          "PRICING_LOAD_ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadPricing();
  }, []);

  if (loading) {
    return (
      <section className="bg-muted/30 py-24">
        <div className="container-custom">
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-muted-foreground">
              Loading pricing...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!data) {
    return (
      <section className="bg-muted/30 py-24">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-muted-foreground">
              Unable to load pricing right now.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const items = data[activeCategory];

  return (
    <section className="bg-muted/30 py-24">
      <div className="container-custom">

        {/* Header */}

        <motion.div
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            Pricing
          </span>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Choose What You Need
          </h2>

          <p className="mt-6 text-lg text-muted-foreground">
            Explore our courses, packages, AI credits
            and premium learning resources.
          </p>
        </motion.div>

        {/* Categories */}

        <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            const active =
              activeCategory === category.key;

            return (
              <button
                key={category.key}
                type="button"
                onClick={() =>
                  setActiveCategory(
                    category.key
                  )
                }
                className={`rounded-2xl border p-5 text-left transition-all duration-300 ${active
                  ? "border-primary bg-primary/10 shadow-lg"
                  : "border-border bg-background hover:border-primary/40 hover:shadow-md"
                  }`}
              >
                <div className="flex items-center gap-4">

                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${active
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary"
                      }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      {category.title}
                    </h3>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {category.description}
                    </p>
                  </div>

                </div>
              </button>
            );
          })}
        </div>

        {/* Products */}

        {items.length === 0 ? (
          <div className="rounded-3xl border border-border bg-background px-6 py-16 text-center">
            <h3 className="text-xl font-semibold">
              No products available
            </h3>

            <p className="mt-2 text-muted-foreground">
              New products will appear here once
              they are published.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {items.map((item, index) => {
              const isPackage =
                activeCategory ===
                "packages";

              const price =
                Number(item.price);

              const discountPrice =
                item.discountPrice
                  ? Number(
                    item.discountPrice
                  )
                  : null;

              const finalPrice =
                discountPrice &&
                  discountPrice > 0
                  ? discountPrice
                  : price;

              return (
                <motion.div
                  key={item.id}
                  initial={{
                    opacity: 0,
                    y: 25,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{
                    once: true,
                  }}
                  transition={{
                    delay: index * 0.08,
                  }}
                  className={`relative flex flex-col rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${item.isFeatured
                    ? "border-primary shadow-xl ring-2 ring-primary/20"
                    : "border-border"
                    }`}
                >

                  {/* Featured */}

                  {item.isFeatured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                      ⭐ Most Popular
                    </div>
                  )}

                  {/* Icon */}

                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    {isPackage ? (
                      <Package className="h-6 w-6" />
                    ) : activeCategory ===
                      "courses" ? (
                      <GraduationCap className="h-6 w-6" />
                    ) : activeCategory ===
                      "aiCredits" ? (
                      <Sparkles className="h-6 w-6" />
                    ) : (
                      <FileText className="h-6 w-6" />
                    )}
                  </div>

                  {/* Title */}

                  <h3 className="text-2xl font-bold">
                    {item.name}
                  </h3>

                  {/* Description */}

                  <p className="mt-3 min-h-[48px] text-muted-foreground">
                    {item.shortDescription ||
                      "Premium Edurefer learning resource."}
                  </p>

                  {/* Price */}

                  <div className="mt-8">

                    {discountPrice &&
                      discountPrice <
                      price && (
                        <span className="mr-2 text-lg text-muted-foreground line-through">
                          ₹
                          {price.toLocaleString(
                            "en-IN"
                          )}
                        </span>
                      )}

                    <span className="text-4xl font-bold">
                      ₹
                      {finalPrice.toLocaleString(
                        "en-IN"
                      )}
                    </span>
                  </div>

                  {/* Package Items */}

                  {isPackage &&
                    "items" in item &&
                    item.items.length > 0 && (
                      <div className="mt-7">
                        <p className="mb-3 text-sm font-semibold">
                          Package includes:
                        </p>

                        <ul className="space-y-3">
                          {item.items
                            .slice(0, 5)
                            .map(
                              (
                                packageItem
                              ) => (
                                <li
                                  key={
                                    packageItem
                                      .product
                                      .id
                                  }
                                  className="flex items-center gap-3 text-sm"
                                >
                                  <Check className="h-4 w-4 shrink-0 text-primary" />

                                  <span>
                                    {
                                      packageItem
                                        .product
                                        .name
                                    }

                                    {packageItem.quantity >
                                      1 &&
                                      ` × ${packageItem.quantity}`}
                                  </span>
                                </li>
                              )
                            )}
                        </ul>
                      </div>
                    )}

                  {/* CTA */}

                  <div className="mt-auto pt-8">

                    <Link
                      href={
                        activeCategory === "courses"
                          ? `/courses/${item.slug}`
                          : `/products/${item.slug}`
                      }
                      className="block"
                    >
                      <Button
                        className="w-full"
                        variant={
                          item.isFeatured
                            ? "default"
                            : "outline"
                        }
                      >
                        View Details

                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>

                  </div>

                </motion.div>
              );
            })}

          </div>
        )}
      </div>
    </section>
  );
}