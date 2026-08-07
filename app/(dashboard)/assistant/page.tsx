import { AssistantHeader } from "@/components/assistant/assistant-header";
import { AssistantChat } from "@/components/assistant/assistant-chat";
import { AssistantSidebar } from "@/components/assistant/assistant-sidebar";

export default function AssistantPage() {
  return (
    <div className="space-y-6">

      <AssistantHeader />

      <div className="grid gap-6 xl:grid-cols-[1fr_340px]">

        <AssistantChat />

        <AssistantSidebar />

      </div>

    </div>
  );
}