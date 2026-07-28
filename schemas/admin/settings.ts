import { z } from "zod";

export const settingsSchema = z.object({
  general: z.object({
    siteName: z
      .string()
      .min(2, "Site name is required"),

    supportEmail: z
      .email("Invalid email"),

    maintenanceMode: z.boolean(),
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

  platform: z.object({
    currency: z.string(),

    allowRegistration: z.boolean(),
  }),
});

export type SettingsInput =
  z.input<typeof settingsSchema>;

export type SettingsOutput =
  z.output<typeof settingsSchema>;