import { getSettings } from "@/actions/settings/get-settings";
import SettingsPageClient from "@/components/settings/settings-page-client";

export default async function SettingsPage() {
  const settings = await getSettings();

  return (
    <SettingsPageClient
      settings={settings}
    />
  );
}