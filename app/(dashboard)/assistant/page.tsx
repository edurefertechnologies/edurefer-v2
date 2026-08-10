import { AssistantHeader } from "@/components/assistant/assistant-header";
import { AssistantWorkspace } from "@/components/assistant/assistant-workspace";

import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export default async function AssistantPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const aiWallet =
    await prisma.aIWallet.findUnique({
      where: {
        userId: session.user.id,
      },
      select: {
        balance: true,
      },
    });

  const aiCredits =
    Number(aiWallet?.balance ?? 0);

  return (
    <div>
      <AssistantHeader />

      <AssistantWorkspace
        aiCredits={aiCredits}
      />
    </div>
  );
}