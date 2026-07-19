"use client";

import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();

  async function logout() {
    await authClient.signOut();

    router.replace("/login");
    router.refresh();
  }

  return (
    <Button
      variant="outline"
      onClick={logout}
    >
      <LogOut className="size-4 mr-2" />
      Logout
    </Button>
  );
}