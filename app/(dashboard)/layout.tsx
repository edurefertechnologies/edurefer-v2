import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-server";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import { AppHeader } from "@/components/dashboard/app-header";
import { getNotifications } from "@/actions/notifications/get-notifications";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const notificationData =
    await getNotifications(8);

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />

      <SidebarInset>
        <AppHeader
          name={
            session.user.firstName ??
            "Student"
          }
          notifications={
            notificationData.notifications
          }
          unreadCount={
            notificationData.unreadCount
          }
        />

        <main className="flex-1 p-4 sm:p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}