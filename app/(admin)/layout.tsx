import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth-server";
import { AppSidebar } from "@/components/admin/app-sidebar";

type Props = {
  children: ReactNode;
};

export default async function AdminLayout({
  children,
}: Props) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <AppSidebar />

      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}