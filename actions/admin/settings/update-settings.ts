"use server";

import { Prisma } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-server";

import { SettingsOutput } from "@/schemas/admin/settings";

export async function updateSettings(
  values: SettingsOutput
) {
  const session =
    await requireAuth();

  if (
    session.user.role !== "ADMIN"
  ) {
    throw new Error(
      "Unauthorized"
    );
  }

  await prisma.$transaction([

    prisma.setting.upsert({
      where: {
        key: "general",
      },

      update: {
        value: values.general,
      },

      create: {
        key: "general",
        value: values.general,
        description:
          "General platform settings",
      },
    }),

    prisma.setting.upsert({
      where: {
        key: "company",
      },

      update: {
        value: values.company,
      },

      create: {
        key: "company",
        value: values.company,
        description:
          "Company settings",
      },
    }),

    prisma.setting.upsert({
      where: {
        key: "payment",
      },

      update: {
        value: values.payment,
      },

      create: {
        key: "payment",
        value: values.payment,
        description:
          "Payment settings",
      },
    }),

    prisma.setting.upsert({
      where: {
        key: "email",
      },

      update: {
        value: values.email,
      },

      create: {
        key: "email",
        value: values.email,
        description:
          "Email settings",
      },
    }),

    prisma.setting.upsert({
      where: {
        key: "referral",
      },

      update: {
        value: values.referral,
      },

      create: {
        key: "referral",
        value: values.referral,
        description:
          "Referral settings",
      },
    }),

    prisma.setting.upsert({
      where: {
        key: "seo",
      },

      update: {
        value: values.seo,
      },

      create: {
        key: "seo",
        value: values.seo,
        description:
          "SEO settings",
      },
    }),

    prisma.setting.upsert({
      where: {
        key: "platform",
      },

      update: {
        value: values.platform,
      },

      create: {
        key: "platform",
        value: values.platform,
        description:
          "Platform settings",
      },
    }),

    prisma.setting.upsert({
      where: {
        key: "maintenance",
      },

      update: {
        value:
          values.maintenance,
      },

      create: {
        key: "maintenance",
        value:
          values.maintenance,
        description:
          "Maintenance settings",
      },
    }),

    prisma.auditLog.create({
      data: {
        userId:
          session.user.id,

        action:
          "UPDATE",

        entity:
          "SETTING",

        newData:
          values as Prisma.InputJsonValue,
      },
    }),
  ]);

  return {
    success: true,
  };
}