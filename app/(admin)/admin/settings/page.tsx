import { getSettings } from "@/actions/admin/settings/get-settings";
import SettingsForm from "@/components/admin/settings/settings-form";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
    const settings = await getSettings();

    if (!settings) {
        return <div>Failed to load settings.</div>;
    }
    
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">
                    Settings
                </h1>

                <p className="text-muted-foreground">
                    Manage platform configuration.
                </p>
            </div>

            <SettingsForm
                defaultValues={settings}
            />
        </div>
    );
}