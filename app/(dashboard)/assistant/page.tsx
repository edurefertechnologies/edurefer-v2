import { AssistantHeader } from "@/components/assistant/assistant-header";
import { AssistantChat } from "@/components/assistant/assistant-chat";
import { AssistantSidebar } from "@/components/assistant/assistant-sidebar";

import { getSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";

export default async function AssistantPage() {
  const session = await getSession();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const aiWallet = await prisma.aIWallet.findUnique({
    where: {
      userId: session.user.id,
    },
    select: {
      balance: true,
    },
  });

  const aiCredits = Number(aiWallet?.balance ?? 0);

  return (
    <div className="space-y-6">

      <AssistantHeader />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">

        <AssistantChat />

        <AssistantSidebar
          aiCredits={aiCredits}
        />

      </div>

    </div>
  );
}