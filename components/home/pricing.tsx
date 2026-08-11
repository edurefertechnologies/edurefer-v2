"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Package,
  GraduationCap,
  Brain,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";

interface PricingData {
  products: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string | null;
    price: number;
    discountPrice: number | null;
    thumbnail: string | null;
    type: "PDF" | "COURSE" | "AI_CREDITS";
    isFeatured: boolean;
  }[];

  packages: {
    id: string;
    name: string;
    slug: string;
    shortDescription: string | null;
    price: number;
    discountPrice: number | null;
    thumbnail: string | null;
    isFeatured: boolean;
    items: {
      quantity: number;
      product: {
        id: string;
        name: string;
        type: string;
      };
    }[];
  }[];
}

interface PricingProps {
  data: PricingData;
}

const categories = [
  {
    id: "packages",
    title: "Packages",
    icon: Package,
  },
  {
    id: "courses",
    title: "Courses",
    icon: GraduationCap,
  },
  {
    id: "ai",
    title: "AI Credits",
    icon: Brain,
  },
  {
    id: "pdfs",
    title: "PDFs",
    icon: FileText,
  },
];

export default function Pricing({
  data,
}: PricingProps) {
  const [activeCategory, setActiveCategory] =
    useState("packages");

  const getProducts = () => {
    if (activeCategory === "courses") {
      return data.products.filter(
        (product) => product.type === "COURSE"
      );
    }

    if (activeCategory === "ai") {
      return data.products.filter(
        (product) => product.type === "AI_CREDITS"
      );
    }

    if (activeCategory === "pdfs") {
      return data.products.filter(
        (product) => product.type === "PDF"
      );
    }

    return data.packages.map((pkg) => ({
      ...pkg,
      type: "PACKAGE" as const,
    }));
  };

  const products = getProducts();

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
            Explore courses, premium PDFs, AI
            credits and complete career packages.
          </p>
        </motion.div>

        {/* Categories */}

        <div className="mb-12 flex flex-wrap justify-center gap-3">

          {categories.map((category) => {
            const Icon = category.icon;

            const active =
              activeCategory === category.id;

            return (
              <button
                key={category.id}
                type="button"
                onClick={() =>
                  setActiveCategory(
                    category.id
                  )
                }
                className={`flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium transition-all ${active
                  ? "border-primary bg-primary text-primary-foreground shadow-md"
                  : "border-border bg-background hover:bg-muted"
                  }`}
              >
                <Icon className="h-4 w-4" />

                {category.title}
              </button>
            );
          })}

        </div>

        {/* Products */}

        {products.length === 0 ? (
          <div className="rounded-3xl border bg-background p-12 text-center">
            <p className="font-semibold">
              No products available
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              Check back soon for new learning
              products.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">

            {products.map(
              (product, index) => {
                const isPackage =
                  activeCategory ===
                  "packages";

                const finalPrice =
                  product.discountPrice ??
                  product.price;

                return (
                  <motion.div
                    key={product.id}
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
                    className={`relative rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${product.isFeatured
                      ? "border-primary shadow-xl ring-2 ring-primary/20"
                      : "border-border"
                      }`}
                  >

                    {/* Featured */}

                    {product.isFeatured && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">
                        ⭐ Most Popular
                      </div>
                    )}

                    {/* Icon */}

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      {isPackage ? (
                        <Package className="h-6 w-6" />
                      ) : product.type ===
                        "COURSE" ? (
                        <GraduationCap className="h-6 w-6" />
                      ) : product.type ===
                        "AI_CREDITS" ? (
                        <Brain className="h-6 w-6" />
                      ) : (
                        <FileText className="h-6 w-6" />
                      )}
                    </div>

                    {/* Name */}

                    <h3 className="mt-6 text-2xl font-bold">
                      {product.name}
                    </h3>

                    <p className="mt-3 min-h-[48px] text-muted-foreground">
                      {product.shortDescription ||
                        "Explore this Edurefer product and start learning today."}
                    </p>

                    {/* Price */}

                    <div className="mt-8">

                      {product.discountPrice && (
                        <span className="mr-2 text-lg text-muted-foreground line-through">
                          ₹
                          {product.price.toLocaleString(
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
                      "items" in product && (
                        <ul className="mt-8 space-y-3">
                          {product.items.map(
                            (item) => (
                              <li
                                key={
                                  item.product.id
                                }
                                className="flex items-center gap-3 text-sm"
                              >
                                <Check className="h-4 w-4 shrink-0 text-primary" />

                                <span>
                                  {item.product.name}

                                  {item.quantity >
                                    1 &&
                                    ` × ${item.quantity}`}
                                </span>
                              </li>
                            )
                          )}
                        </ul>
                      )}

                    {/* Product Info */}

                    {!isPackage && (
                      <ul className="mt-8 space-y-3">
                        <li className="flex items-center gap-3 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          Lifetime access
                        </li>

                        <li className="flex items-center gap-3 text-sm">
                          <Check className="h-4 w-4 text-primary" />
                          Available on Edurefer
                        </li>
                      </ul>
                    )}

                    {/* Button */}

                    <Link
                      href={`/products/${product.slug}`}
                      className="mt-10 block"
                    >
                      <Button
                        className="w-full"
                        variant={
                          product.isFeatured
                            ? "default"
                            : "outline"
                        }
                      >
                        View Details

                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>

                  </motion.div>
                );
              }
            )}

          </div>
        )}

      </div>
    </section>
  );
}