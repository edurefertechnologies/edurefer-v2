import Link from "next/link";
import {
    BookOpen,
    FileText,
    Package,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

type MarqueeItem = {
    id: string;
    title: string;
    type: "PACKAGE" | "COURSE" | "PDF" | "AI_CREDITS";
    price?: number;
    discountPrice?: number | null;
    href: string;
};

export default async function LiveLearningMarquee() {
    /*
     * =========================================================
     * LIVE PACKAGES
     * =========================================================
     */
    const packages = await prisma.package.findMany({
        where: {
            status: "PUBLISHED",
        },
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            discountPrice: true,
        },
        orderBy: [
            {
                isFeatured: "desc",
            },
            {
                createdAt: "desc",
            },
        ],
    });

    /*
     * =========================================================
     * LIVE PRODUCTS
     * =========================================================
     *
     * Course products are connected to Course records.
     */
    const products = await prisma.product.findMany({
        where: {
            isDeleted: false,
            status: "PUBLISHED",
        },
        select: {
            id: true,
            name: true,
            slug: true,
            price: true,
            discountPrice: true,
            type: true,
            course: {
                select: {
                    slug: true,
                },
            },
        },
        orderBy: [
            {
                isFeatured: "desc",
            },
            {
                createdAt: "desc",
            },
        ],
    });

    /*
     * =========================================================
     * PRIORITY
     *
     * PACKAGE → COURSE → PDF → AI CREDITS
     * =========================================================
     */

    const packageItems: MarqueeItem[] =
        packages.map((pkg) => ({
            id: `package-${pkg.id}`,
            title: pkg.name,
            type: "PACKAGE",
            price: Number(pkg.price),
            discountPrice:
                pkg.discountPrice !== null
                    ? Number(pkg.discountPrice)
                    : null,
            href: `/pricing`,
        }));

    const courseItems: MarqueeItem[] =
        products
            .filter(
                (product) =>
                    product.type === "COURSE" &&
                    product.course
            )
            .map((product) => ({
                id: `course-${product.id}`,
                title: product.name,
                type: "COURSE",
                price: Number(product.price),
                discountPrice:
                    product.discountPrice !== null
                        ? Number(product.discountPrice)
                        : null,
                href: `/courses/${product.course!.slug}`,
            }));

    const pdfItems: MarqueeItem[] =
        products
            .filter(
                (product) => product.type === "PDF"
            )
            .map((product) => ({
                id: `pdf-${product.id}`,
                title: product.name,
                type: "PDF",
                price: Number(product.price),
                discountPrice:
                    product.discountPrice !== null
                        ? Number(product.discountPrice)
                        : null,
                href: `/products/${product.slug}`,
            }));

    const aiCreditItems: MarqueeItem[] =
        products
            .filter(
                (product) =>
                    product.type === "AI_CREDITS"
            )
            .map((product) => ({
                id: `ai-${product.id}`,
                title: product.name,
                type: "AI_CREDITS",
                price: Number(product.price),
                discountPrice:
                    product.discountPrice !== null
                        ? Number(product.discountPrice)
                        : null,
                href: `/products/${product.slug}`,
            }));

    const items = [
        ...packageItems,
        ...courseItems,
        ...pdfItems,
        ...aiCreditItems,
    ];

    if (items.length === 0) {
        return null;
    }

    /*
     * Duplicate the list for seamless infinite scrolling.
     */
    const marqueeItems = [...items, ...items];

    return (
        <section className="relative overflow-hidden border-y border-white/10 bg-[#071421] py-5">
            {/* Subtle glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.08),transparent_55%)]" />

            {/* Left fade */}
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-[#071421] to-transparent" />

            {/* Right fade */}
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-[#071421] to-transparent" />

            <div className="relative overflow-hidden">
                <div className="live-learning-marquee flex w-max gap-4 px-4 hover:[animation-play-state:paused]">
                    {marqueeItems.map((item, index) => {
                        const Icon =
                            item.type === "PACKAGE"
                                ? Package
                                : item.type === "COURSE"
                                    ? BookOpen
                                    : item.type === "PDF"
                                        ? FileText
                                        : Sparkles;

                        const label =
                            item.type === "PACKAGE"
                                ? "PACKAGE"
                                : item.type === "COURSE"
                                    ? "COURSE"
                                    : item.type === "PDF"
                                        ? "PDF KIT"
                                        : "AI CREDITS";

                        const price =
                            item.discountPrice &&
                                item.discountPrice <
                                (item.price ?? 0)
                                ? item.discountPrice
                                : item.price;

                        return (
                            <Link
                                key={`${item.id}-${index}`}
                                href={item.href}
                                className="group flex min-w-[280px] items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400/30 hover:bg-white/[0.08]"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                                    <Icon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-semibold tracking-widest text-cyan-400">
                                            {label}
                                        </span>
                                    </div>

                                    <p className="mt-1 truncate text-sm font-semibold text-white">
                                        {item.title}
                                    </p>

                                    {price !== undefined && (
                                        <div className="mt-1 flex items-center gap-2">
                                            <span className="text-xs font-medium text-white">
                                                ₹
                                                {price.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                            {item.discountPrice &&
                                                item.discountPrice <
                                                (item.price ?? 0) && (
                                                    <span className="text-[10px] text-white/40 line-through">
                                                        ₹
                                                        {item.price?.toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </span>
                                                )}
                                        </div>
                                    )}
                                </div>

                                <ArrowUpRight className="h-4 w-4 shrink-0 text-white/30 transition group-hover:text-cyan-400" />
                            </Link>
                        );
                    })}
                </div>
            </div>

            <style>{`
        @keyframes live-learning-marquee {
          from {
            transform: translateX(0);
          }

          to {
            transform: translateX(
              calc(-50% - 0.5rem)
            );
          }
        }

        .live-learning-marquee {
          animation: live-learning-marquee 45s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .live-learning-marquee {
            animation: none;
          }
        }
      `}</style>
        </section>
    );
}