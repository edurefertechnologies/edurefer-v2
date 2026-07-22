import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export async function getSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function getCurrentUser() {
  const session = await getSession();

  if (!session) {
    return null;
  }

  return session.user;
}

export async function requireAuth() {
  const session = await getSession();

  if (!session) {
    throw new Error("Unauthorized");
  }

  return session;
}