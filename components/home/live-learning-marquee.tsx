import Link from "next/link";
import {
    ArrowUpRight,
    BookOpen,
    FileText,
    Package as PackageIcon,
    Sparkles,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

type MarqueeType =
    | "PACKAGE"
    | "COURSE"
    | "PDF"
    | "AI_CREDITS";

type MarqueeItem = {
    id: string;
    title: string;
    type: MarqueeType;
    price: number;
    discountPrice: number | null;
    href: string;
};

const typeConfig = {
    PACKAGE: {
        label: "LEARNING PACKAGE",
        icon: PackageIcon,
        description: "Courses + Kits + AI Credits",
    },

    COURSE: {
        label: "AI COURSE",
        icon: BookOpen,
        description: "Learn job-ready skills",
    },

    PDF: {
        label: "PREMIUM PDF KIT",
        icon: FileText,
        description: "Career-ready resources",
    },

    AI_CREDITS: {
        label: "AI CREDITS",
        icon: Sparkles,
        description: "Power your AI tools",
    },
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
     * PACKAGE
     * =========================================================
     */

    const packageItems: MarqueeItem[] =
        packages.map((item) => ({
            id: `package-${item.id}`,
            title: item.name,
            type: "PACKAGE",
            price: Number(item.price),
            discountPrice:
                item.discountPrice !== null
                    ? Number(item.discountPrice)
                    : null,

            /*
             * Keep current public pricing route.
             * If you later create /packages/[slug],
             * change this to that route.
             */
            href: `/pricing`,
        }));

    /*
     * =========================================================
     * COURSE
     * =========================================================
     */

    const courseItems: MarqueeItem[] =
        products
            .filter(
                (item) =>
                    item.type === "COURSE" &&
                    item.course !== null
            )
            .map((item) => ({
                id: `course-${item.id}`,
                title: item.name,
                type: "COURSE",
                price: Number(item.price),
                discountPrice:
                    item.discountPrice !== null
                        ? Number(item.discountPrice)
                        : null,

                href: `/courses/${item.course!.slug}`,
            }));

    /*
     * =========================================================
     * PDF KITS
     * =========================================================
     */

    const pdfItems: MarqueeItem[] =
        products
            .filter(
                (item) => item.type === "PDF"
            )
            .map((item) => ({
                id: `pdf-${item.id}`,
                title: item.name,
                type: "PDF",
                price: Number(item.price),
                discountPrice:
                    item.discountPrice !== null
                        ? Number(item.discountPrice)
                        : null,

                href: `/products/${item.slug}`,
            }));

    /*
     * =========================================================
     * AI CREDITS
     * =========================================================
     */

    const aiCreditItems: MarqueeItem[] =
        products
            .filter(
                (item) =>
                    item.type === "AI_CREDITS"
            )
            .map((item) => ({
                id: `ai-${item.id}`,
                title: item.name,
                type: "AI_CREDITS",
                price: Number(item.price),
                discountPrice:
                    item.discountPrice !== null
                        ? Number(item.discountPrice)
                        : null,

                href: `/products/${item.slug}`,
            }));

    /*
     * =========================================================
     * IMPORTANT PRIORITY
     *
     * PACKAGE → COURSE → PDF → AI CREDITS
     * =========================================================
     */

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
     * Duplicate the complete sequence.
     * This gives us a seamless infinite marquee.
     */
    const marqueeItems = [
        ...items,
        ...items,
    ];

    return (
        <section className="relative overflow-hidden border-y border-cyan-400/10 bg-[#06131f] py-7 sm:py-8">
            {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

            <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-[10%] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

                <div className="absolute right-[15%] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            {/* =====================================================
          HEADER
      ====================================================== */}

            <div className="relative z-20 mx-auto mb-5 max-w-7xl px-5 sm:mb-6">
                <div className="flex items-center justify-center gap-3 text-center">
                    <span className="h-px w-8 bg-cyan-400/30 sm:w-14" />

                    <div>
                        <p className="text-[10px] font-bold tracking-[0.25em] text-cyan-400 sm:text-xs">
                            EXPLORE EDUREFER
                        </p>

                        <p className="mt-1 text-xs text-white/50 sm:text-sm">
                            Learn smarter. Build faster. Grow your career.
                        </p>
                    </div>

                    <span className="h-px w-8 bg-cyan-400/30 sm:w-14" />
                </div>
            </div>

            {/* =====================================================
          MARQUEE
      ====================================================== */}

            <div className="relative z-10 overflow-hidden">
                {/* Left fade */}
                <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-16 bg-gradient-to-r from-[#06131f] via-[#06131f]/80 to-transparent sm:w-28" />

                {/* Right fade */}
                <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-16 bg-gradient-to-l from-[#06131f] via-[#06131f]/80 to-transparent sm:w-28" />

                <div
                    className="
            edurefer-marquee
            flex
            w-max
            gap-4
            px-4
            sm:gap-5
            sm:px-6
            hover:[animation-play-state:paused]
          "
                >
                    {marqueeItems.map(
                        (item, index) => {
                            const config =
                                typeConfig[item.type];

                            const Icon = config.icon;

                            const hasDiscount =
                                item.discountPrice !== null &&
                                item.discountPrice <
                                item.price;

                            const finalPrice =
                                hasDiscount
                                    ? item.discountPrice!
                                    : item.price;

                            const isPackage =
                                item.type === "PACKAGE";

                            return (
                                <Link
                                    key={`${item.id}-${index}`}
                                    href={item.href}
                                    className={`
                    group
                    relative
                    flex
                    shrink-0
                    items-center
                    gap-4
                    overflow-hidden
                    rounded-2xl
                    border
                    px-5
                    py-4
                    transition-all
                    duration-300
                    sm:px-6
                    sm:py-5

                    ${isPackage
                                            ? `
                          min-w-[310px]
                          border-cyan-400/30
                          bg-gradient-to-br
                          from-cyan-400/[0.12]
                          via-blue-500/[0.08]
                          to-white/[0.03]
                          shadow-[0_0_35px_rgba(34,211,238,0.08)]
                          sm:min-w-[370px]
                        `
                                            : `
                          min-w-[275px]
                          border-white/10
                          bg-white/[0.045]
                          sm:min-w-[315px]
                        `
                                        }

                    hover:-translate-y-1
                    hover:border-cyan-400/40
                    hover:bg-white/[0.08]
                  `}
                                >
                                    {/* Package Highlight */}
                                    {isPackage && (
                                        <div className="absolute right-0 top-0 rounded-bl-xl bg-cyan-400 px-3 py-1 text-[8px] font-bold tracking-wider text-slate-950">
                                            BEST VALUE
                                        </div>
                                    )}

                                    {/* Icon */}
                                    <div
                                        className={`
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      transition-all
                      duration-300
                      group-hover:scale-105

                      ${isPackage
                                                ? "bg-cyan-400/15 text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
                                                : "bg-cyan-400/10 text-cyan-400"
                                            }
                    `}
                                    >
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`
                          text-[9px]
                          font-bold
                          tracking-[0.18em]
                          ${isPackage
                                                        ? "text-cyan-300"
                                                        : "text-cyan-400"
                                                    }
                        `}
                                            >
                                                {config.label}
                                            </span>

                                            {isPackage && (
                                                <span className="h-1 w-1 rounded-full bg-cyan-400" />
                                            )}
                                        </div>

                                        <p className="mt-1.5 truncate text-sm font-bold text-white sm:text-[15px]">
                                            {item.title}
                                        </p>

                                        <p className="mt-1 text-[10px] text-white/40">
                                            {config.description}
                                        </p>

                                        {/* Price */}
                                        <div className="mt-2 flex items-center gap-2">
                                            <span
                                                className={`
                          font-bold
                          ${isPackage
                                                        ? "text-base text-white"
                                                        : "text-sm text-white"
                                                    }
                        `}
                                            >
                                                ₹
                                                {finalPrice.toLocaleString(
                                                    "en-IN"
                                                )}
                                            </span>

                                            {hasDiscount && (
                                                <span className="text-[10px] text-white/35 line-through">
                                                    ₹
                                                    {item.price.toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Arrow */}
                                    <div
                                        className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border
                      transition-all
                      duration-300

                      ${isPackage
                                                ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                                                : "border-white/10 text-white/30"
                                            }

                      group-hover:border-cyan-400/30
                      group-hover:bg-cyan-400/10
                      group-hover:text-cyan-300
                    `}
                                    >
                                        <ArrowUpRight className="h-4 w-4" />
                                    </div>

                                    {/* Bottom glow */}
                                    <div
                                        className={`
                      pointer-events-none
                      absolute
                      -bottom-10
                      left-1/2
                      h-16
                      w-2/3
                      -translate-x-1/2
                      rounded-full
                      blur-2xl
                      transition-opacity
                      ${isPackage
                                                ? "bg-cyan-400/15 opacity-100"
                                                : "bg-cyan-400/10 opacity-0 group-hover:opacity-100"
                                            }
                    `}
                                    />
                                </Link>
                            );
                        }
                    )}
                </div>
            </div>

            {/* =====================================================
          CATEGORY FLOW
      ====================================================== */}

            <div className="relative z-10 mt-5 flex items-center justify-center gap-2 px-4 text-[9px] font-semibold tracking-wider text-white/35 sm:mt-6 sm:text-[10px]">
                <span className="text-cyan-300">
                    PACKAGES
                </span>

                <span>→</span>

                <span>COURSES</span>

                <span>→</span>

                <span>PDF KITS</span>

                <span>→</span>

                <span className="text-cyan-300">
                    AI CREDITS
                </span>
            </div>

            {/* =====================================================
          ANIMATION
      ====================================================== */}

            <style>{`
        @keyframes edurefer-marquee {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(
              calc(-50% - 0.625rem),
              0,
              0
            );
          }
        }

        .edurefer-marquee {
          animation:
            edurefer-marquee
            32s
            linear
            infinite;
          will-change: transform;
        }

        @media (max-width: 640px) {
          .edurefer-marquee {
            animation-duration: 27s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .edurefer-marquee {
            animation: none;
          }
        }
      `}</style>
        </section>
    );
}