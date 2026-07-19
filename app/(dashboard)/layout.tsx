import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-server";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <SidebarProvider>
      <AppSidebar user={session.user} />

      <SidebarInset>
        <header className="flex h-16 items-center border-b bg-background px-6">
          <SidebarTrigger />
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}