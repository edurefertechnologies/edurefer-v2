import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

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

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      image: true,
      emailVerified: true,

      settings: {
        select: {
          language: true,
        },
      },
    },
  });

  const qualifyingOrder = await prisma.order.findFirst({
    where: {
      userId: session.user.id,
      status: "PAID",
      items: {
        some: {
          OR: [
            { productId: { not: null } },
            { packageId: { not: null } },
          ],
        },
      },
    },
    select: {
      id: true,
    },
  });

  const canRefer = !!qualifyingOrder;

  const notificationData =
    await getNotifications(8);
  return (
    <SidebarProvider>
      <div className="relative flex min-h-screen w-full overflow-hidden bg-[#07111F] text-white">

        {/* Blue Glow */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-blue-500/10 blur-[140px]" />

        {/* Cyan Glow */}
        <div className="pointer-events-none absolute right-0 top-1/3 h-[420px] w-[420px] rounded-full bg-cyan-400/10 blur-[160px]" />

        {/* Grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <AppSidebar
          user={{
            ...(user ?? session.user),
            language:
              user?.settings?.language === "hi"
                ? "hi"
                : user?.settings?.language === "mr"
                  ? "mr"
                  : "en",
          }}
          canRefer={canRefer}
        />

        <SidebarInset className="relative z-10 bg-transparent">

          <AppHeader
            name={session.user.firstName ?? "Student"}
            user={{
              firstName: session.user.firstName,
              lastName: session.user.lastName,
              image: session.user.image,
            }}
            notifications={notificationData.notifications}
            unreadCount={notificationData.unreadCount}
          />

          <main className="flex-1 px-6 py-6 lg:px-8">
            {children}
          </main>

        </SidebarInset>

      </div>
    </SidebarProvider>
  );
}