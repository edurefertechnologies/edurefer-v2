"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth-server";
import { SettingsOutput } from "@/schemas/admin/settings";

const DEFAULT_SETTINGS: SettingsOutput = {
  general: {
    siteName: "Edurefer",
    siteDescription:
      "India's AI Powered Learning Platform",

    logo: "",

    favicon: "",

    supportEmail:
      "solutions@edurefertech.com",

    maintenanceMode: false,
  },

  company: {
    companyName:
      "Edurefer Technologies LLP",

    phone: "",

    whatsapp: "",

    address: "",

    gstNumber: "",
  },

  payment: {
    razorpayKeyId: "",

    razorpayKeySecret: "",

    currency: "INR",
  },

  email: {
    senderName: "Edurefer",

    senderEmail:
      "solutions@edurefertech.com",

    replyTo:
      "solutions@edurefertech.com",
  },

  referral: {
    enabled: true,

    rewardAmount: 300,

    minimumWithdrawal: 600,
  },

  seo: {
    metaTitle: "Edurefer",

    metaDescription: "",

    metaKeywords: "",
  },

  platform: {
    currency: "INR",

    allowRegistration: true,

    timezone: "Asia/Kolkata",

    language: "en",
  },

  maintenance: {
    enabled: false,

    message:
      "We are currently performing scheduled maintenance.",
  },
};

export async function getSettings(): Promise<SettingsOutput> {
  const session = await getSession();

  if (
    !session?.user?.id ||
    session.user.role !== "ADMIN"
  ) {
    throw new Error("Unauthorized");
  }

  const settings =
    await prisma.setting.findMany();

  const result =
    structuredClone(
      DEFAULT_SETTINGS
    );

  for (const setting of settings) {
    switch (setting.key) {
      case "general":
        result.general = {
          ...result.general,
          ...(setting.value as Partial<
            typeof result.general
          >),
        };
        break;

      case "company":
        result.company = {
          ...result.company,
          ...(setting.value as Partial<
            typeof result.company
          >),
        };
        break;

      case "payment":
        result.payment = {
          ...result.payment,
          ...(setting.value as Partial<
            typeof result.payment
          >),
        };
        break;

      case "email":
        result.email = {
          ...result.email,
          ...(setting.value as Partial<
            typeof result.email
          >),
        };
        break;

      case "referral":
        result.referral = {
          ...result.referral,
          ...(setting.value as Partial<
            typeof result.referral
          >),
        };
        break;

      case "seo":
        result.seo = {
          ...result.seo,
          ...(setting.value as Partial<
            typeof result.seo
          >),
        };
        break;

      case "platform":
        result.platform = {
          ...result.platform,
          ...(setting.value as Partial<
            typeof result.platform
          >),
        };
        break;

      case "maintenance":
        result.maintenance = {
          ...result.maintenance,
          ...(setting.value as Partial<
            typeof result.maintenance
          >),
        };
        break;
    }
  }

  return result;
}