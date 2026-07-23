"use server";

import { createUserSchema } from "@/schemas/admin/user";

export async function createUser(data: unknown) {
  const validated = createUserSchema.safeParse(data);

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten(),
    };
  }

  // TODO:
  // Better Auth API vaprun user create karaycha.
  // Direct prisma.user.create() use karaycha nahi.

  return {
    success: true,
    message: "Validation successful.",
  };
}