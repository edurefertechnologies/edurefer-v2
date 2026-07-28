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
      <Card className="p-6 space-y-6">
        <div>
          <h2 className="font-semibold text-lg">
            General Settings
          </h2>

          <p className="text-sm text-muted-foreground">
            Configure your platform details.
          </p>
        </div>

        <Separator />

        <div className="space-y-4">

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Site Name
            </label>

            <Input
              {...form.register("general.siteName")}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Support Email
            </label>

            <Input
              type="email"
              {...form.register("general.supportEmail")}
            />
          </div>

          <label className="flex items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              {...form.register(
                "general.maintenanceMode"
              )}
            />

            <div>
              <p className="font-medium">
                Maintenance Mode
              </p>

              <p className="text-xs text-muted-foreground">
                Enable maintenance mode.
              </p>
            </div>
          </label>

        </div>
      </Card>

      <Card className="p-6 space-y-6">

        <div>
          <h2 className="font-semibold text-lg">
            Referral Settings
          </h2>
        </div>

        <Separator />

        <label className="flex items-center gap-3 rounded-lg border p-4">
          <input
            type="checkbox"
            {...form.register("referral.enabled")}
          />

          <div>
            <p className="font-medium">
              Enable Referral Program
            </p>
          </div>
        </label>

        <div className="grid gap-4 md:grid-cols-2">

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Reward Amount (₹)
            </label>

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
            <label className="text-sm font-medium">
              Minimum Withdrawal (₹)
            </label>

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

      <Card className="p-6 space-y-6">

        <div>
          <h2 className="font-semibold text-lg">
            Platform Settings
          </h2>
        </div>

        <Separator />

        <div className="space-y-4">

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Currency
            </label>

            <Input
              {...form.register(
                "platform.currency"
              )}
            />
          </div>

          <label className="flex items-center gap-3 rounded-lg border p-4">
            <input
              type="checkbox"
              {...form.register(
                "platform.allowRegistration"
              )}
            />

            <div>
              <p className="font-medium">
                Allow Registration
              </p>
            </div>
          </label>

        </div>

      </Card>

      <div className="flex justify-end">

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

    </form>
  );
}