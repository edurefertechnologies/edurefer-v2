import { z } from "zod";

export const settingsSchema = z.object({
  general: z.object({
    siteName: z
      .string()
      .min(2, "Site name is required"),

    siteDescription: z
      .string()
      .default(""),

    logo: z
      .string()
      .default(""),

    favicon: z
      .string()
      .default(""),

    supportEmail: z
      .email("Invalid email"),

    maintenanceMode: z.boolean(),
  }),

  company: z.object({
    companyName: z.string(),

    phone: z.string(),

    whatsapp: z.string(),

    address: z.string(),

    gstNumber: z.string(),
  }),

  payment: z.object({
    razorpayKeyId: z.string(),

    razorpayKeySecret: z.string(),

    currency: z.string(),
  }),

  email: z.object({
    senderName: z.string(),

    senderEmail: z
      .email("Invalid email")
      .or(z.literal("")),

    replyTo: z
      .email("Invalid email")
      .or(z.literal("")),
  }),

  referral: z.object({
    enabled: z.boolean(),

    rewardAmount: z.coerce
      .number()
      .min(0),

    minimumWithdrawal: z.coerce
      .number()
      .min(0),
  }),

  seo: z.object({
    metaTitle: z.string(),

    metaDescription: z.string(),

    metaKeywords: z.string(),
  }),

  platform: z.object({
    currency: z.string(),

    allowRegistration: z.boolean(),

    timezone: z.string(),

    language: z.string(),
  }),

  maintenance: z.object({
    enabled: z.boolean(),

    message: z.string(),
  }),
});

export type SettingsInput =
  z.input<typeof settingsSchema>;

export type SettingsOutput =
  z.output<typeof settingsSchema>;