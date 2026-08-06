"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Save } from "lucide-react";

import {
  settingsSchema,
  type SettingsInput,
  type SettingsOutput,
} from "@/schemas/admin/settings";

import { updateSettings } from "@/actions/admin/settings/update-settings";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PasswordInput } from "@/components/ui/password-input";

interface SettingsFormProps {
  defaultValues: SettingsOutput;
}

export default function SettingsForm({
  defaultValues,
}: SettingsFormProps) {
  const [pending, startTransition] = useTransition();

  const form = useForm<
    SettingsInput,
    unknown,
    SettingsOutput
  >({
    resolver: zodResolver(settingsSchema),
    defaultValues,
  });

  const onSubmit = (values: SettingsOutput) => {
    startTransition(async () => {
      try {
        await updateSettings(values);

        toast.success(
          "Settings updated successfully."
        );
      } catch (error) {
        console.error(error);

        toast.error(
          "Failed to update settings."
        );
      }
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-6"
    >

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-bold">
            Platform Settings
          </h1>

          <p className="text-muted-foreground">
            Manage your Edurefer platform configuration.
          </p>

        </div>

        <Button
          type="submit"
          disabled={pending}
        >
          <Save className="mr-2 h-4 w-4" />

          {pending
            ? "Saving..."
            : "Save Changes"}
        </Button>

      </div>

      {/* General */}

      <Card className="p-6 space-y-6">

        <div>

          <h2 className="text-lg font-semibold">
            General Settings
          </h2>

          <p className="text-sm text-muted-foreground">
            Basic platform information.
          </p>

        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">
            <Label>Site Name</Label>

            <Input
              {...form.register(
                "general.siteName"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Support Email</Label>

            <Input
              type="email"
              {...form.register(
                "general.supportEmail"
              )}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Site Description</Label>

            <Textarea
              rows={3}
              {...form.register(
                "general.siteDescription"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Logo URL</Label>

            <Input
              {...form.register(
                "general.logo"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Favicon URL</Label>

            <Input
              {...form.register(
                "general.favicon"
              )}
            />
          </div>

          <div className="md:col-span-2">

            <div className="flex items-center gap-3 rounded-xl border p-4">

              <Checkbox
                checked={form.watch(
                  "general.maintenanceMode"
                )}
                onCheckedChange={(checked) =>
                  form.setValue(
                    "general.maintenanceMode",
                    !!checked
                  )
                }
              />

              <div>

                <p className="font-medium">
                  Maintenance Mode
                </p>

                <p className="text-sm text-muted-foreground">
                  Enable maintenance mode.
                </p>

              </div>

            </div>

          </div>

        </div>

      </Card>

      {/* Company */}

      <Card className="p-6 space-y-6">

        <div>

          <h2 className="text-lg font-semibold">
            Company Information
          </h2>

        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">
            <Label>Company Name</Label>

            <Input
              {...form.register(
                "company.companyName"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Phone</Label>

            <Input
              {...form.register(
                "company.phone"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>WhatsApp</Label>

            <Input
              {...form.register(
                "company.whatsapp"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>GST Number</Label>

            <Input
              {...form.register(
                "company.gstNumber"
              )}
            />
          </div>

          <div className="space-y-2 md:col-span-2">

            <Label>Address</Label>

            <Textarea
              rows={3}
              {...form.register(
                "company.address"
              )}
            />

          </div>

        </div>

      </Card>

      {/* Payment */}

      <Card className="p-6 space-y-6">

        <div>

          <h2 className="text-lg font-semibold">
            Payment Settings
          </h2>

        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">

            <Label>Razorpay Key ID</Label>

            <Input
              {...form.register(
                "payment.razorpayKeyId"
              )}
            />

          </div>

          <div className="space-y-2">

            <Label>Currency</Label>

            <Input
              {...form.register(
                "payment.currency"
              )}
            />

          </div>

          <div className="space-y-2 md:col-span-2">

            <Label>Razorpay Secret</Label>

            <PasswordInput
              {...form.register(
                "payment.razorpayKeySecret"
              )}
            />

          </div>

        </div>

      </Card>
      {/* Email */}

      <Card className="p-6 space-y-6">

        <div>

          <h2 className="text-lg font-semibold">
            Email Settings
          </h2>

        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">
            <Label>Sender Name</Label>

            <Input
              {...form.register(
                "email.senderName"
              )}
            />
          </div>

          <div className="space-y-2">
            <Label>Sender Email</Label>

            <Input
              type="email"
              {...form.register(
                "email.senderEmail"
              )}
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Reply To</Label>

            <Input
              type="email"
              {...form.register(
                "email.replyTo"
              )}
            />
          </div>

        </div>

      </Card>

      {/* Referral */}

      <Card className="p-6 space-y-6">

        <div>

          <h2 className="text-lg font-semibold">
            Referral Settings
          </h2>

        </div>

        <Separator />

        <div className="flex items-center gap-3 rounded-xl border p-4">

          <Checkbox
            checked={form.watch(
              "referral.enabled"
            )}
            onCheckedChange={(checked) =>
              form.setValue(
                "referral.enabled",
                !!checked
              )
            }
          />

          <div>

            <p className="font-medium">
              Enable Referral Program
            </p>

            <p className="text-sm text-muted-foreground">
              Allow users to earn referral rewards.
            </p>

          </div>

        </div>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">

            <Label>Reward Amount (₹)</Label>

            <Input
              type="number"
              {...form.register(
                "referral.rewardAmount",
                {
                  valueAsNumber: true,
                }
              )}
            />

          </div>

          <div className="space-y-2">

            <Label>
              Minimum Withdrawal (₹)
            </Label>

            <Input
              type="number"
              {...form.register(
                "referral.minimumWithdrawal",
                {
                  valueAsNumber: true,
                }
              )}
            />

          </div>

        </div>

      </Card>

      {/* SEO */}

      <Card className="p-6 space-y-6">

        <div>

          <h2 className="text-lg font-semibold">
            SEO Settings
          </h2>

        </div>

        <Separator />

        <div className="space-y-4">

          <div className="space-y-2">

            <Label>Meta Title</Label>

            <Input
              {...form.register(
                "seo.metaTitle"
              )}
            />

          </div>

          <div className="space-y-2">

            <Label>Meta Description</Label>

            <Textarea
              rows={3}
              {...form.register(
                "seo.metaDescription"
              )}
            />

          </div>

          <div className="space-y-2">

            <Label>Meta Keywords</Label>

            <Input
              {...form.register(
                "seo.metaKeywords"
              )}
            />

          </div>

        </div>

      </Card>

      {/* Platform */}

      <Card className="p-6 space-y-6">

        <div>

          <h2 className="text-lg font-semibold">
            Platform Settings
          </h2>

        </div>

        <Separator />

        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">

            <Label>Currency</Label>

            <Input
              {...form.register(
                "platform.currency"
              )}
            />

          </div>

          <div className="space-y-2">

            <Label>Timezone</Label>

            <Input
              {...form.register(
                "platform.timezone"
              )}
            />

          </div>

          <div className="space-y-2 md:col-span-2">

            <Label>Language</Label>

            <Input
              {...form.register(
                "platform.language"
              )}
            />

          </div>

          <div className="md:col-span-2">

            <div className="flex items-center gap-3 rounded-xl border p-4">

              <Checkbox
                checked={form.watch(
                  "platform.allowRegistration"
                )}
                onCheckedChange={(checked) =>
                  form.setValue(
                    "platform.allowRegistration",
                    !!checked
                  )
                }
              />

              <div>

                <p className="font-medium">
                  Allow Registration
                </p>

                <p className="text-sm text-muted-foreground">
                  Allow new users to register.
                </p>

              </div>

            </div>

          </div>

        </div>

      </Card>

      {/* Maintenance */}

      <Card className="p-6 space-y-6">

        <div>

          <h2 className="text-lg font-semibold">
            Maintenance
          </h2>

        </div>

        <Separator />

        <div className="space-y-4">

          <div className="flex items-center gap-3 rounded-xl border p-4">

            <Checkbox
              checked={form.watch(
                "maintenance.enabled"
              )}
              onCheckedChange={(checked) =>
                form.setValue(
                  "maintenance.enabled",
                  !!checked
                )
              }
            />

            <div>

              <p className="font-medium">
                Enable Maintenance Mode
              </p>

              <p className="text-sm text-muted-foreground">
                Temporarily disable public access.
              </p>

            </div>

          </div>

          <div className="space-y-2">

            <Label>Maintenance Message</Label>

            <Textarea
              rows={4}
              {...form.register(
                "maintenance.message"
              )}
            />

          </div>

        </div>

      </Card>

    </form>
  );
}