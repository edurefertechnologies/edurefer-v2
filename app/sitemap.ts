import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";

const BASE_URL = "https://edurefertech.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    /*
     * =========================================================
     * STATIC PUBLIC PAGES
     * =========================================================
     */

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: BASE_URL,
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: `${BASE_URL}/courses`,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/pricing`,
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: `${BASE_URL}/contact`,
            changeFrequency: "monthly",
            priority: 0.6,
        },
        {
            url: `${BASE_URL}/privacy-policy`,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/terms`,
            changeFrequency: "yearly",
            priority: 0.3,
        },
        {
            url: `${BASE_URL}/refund`,
            changeFrequency: "yearly",
            priority: 0.3,
        },
    ];

    /*
     * =========================================================
     * PUBLISHED COURSES
     * =========================================================
     */

    const courses = await prisma.course.findMany({
        where: {
            product: {
                status: "PUBLISHED",
                isDeleted: false,
            },
        },

        select: {
            slug: true,
            updatedAt: true,
        },

        orderBy: {
            updatedAt: "desc",
        },
    });

    const coursePages: MetadataRoute.Sitemap =
        courses.map((course) => ({
            url: `${BASE_URL}/courses/${course.slug}`,
            lastModified: course.updatedAt,
            changeFrequency: "weekly",
            priority: 0.8,
        }));

    /*
     * =========================================================
     * PUBLISHED PDF + AI CREDIT PRODUCTS
     * =========================================================
     */

    const products = await prisma.product.findMany({
        where: {
            status: "PUBLISHED",
            isDeleted: false,

            type: {
                in: ["PDF", "AI_CREDITS"],
            },
        },

        select: {
            slug: true,
            updatedAt: true,
        },

        orderBy: {
            updatedAt: "desc",
        },
    });

    const productPages: MetadataRoute.Sitemap =
        products.map((product) => ({
            url: `${BASE_URL}/products/${product.slug}`,
            lastModified: product.updatedAt,
            changeFrequency: "weekly",
            priority: 0.75,
        }));

    /*
     * =========================================================
     * PACKAGE
     * =========================================================
     *
     * IMPORTANT:
     * Packages currently do not have a dedicated public
     * /packages/[slug] page in the project flow.
     *
     * Therefore we DO NOT generate fake package URLs.
     *
     * Published packages are currently represented through
     * the public /pricing page.
     * =========================================================
     */

    return [
        ...staticPages,
        ...coursePages,
        ...productPages,
    ];
}