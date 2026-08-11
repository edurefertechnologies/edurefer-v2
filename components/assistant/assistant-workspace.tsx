"use client";

import { useEffect, useState } from "react";

import { AssistantChat } from "./assistant-chat";
import { AssistantSidebar } from "./assistant-sidebar";

import { getConversations } from "@/actions/assistant/get-conversations";
import { createConversation } from "@/actions/assistant/create-conversation";

interface ChatMessage {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: Date | string;
}

interface Conversation {
  id: string;
  title: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  messages: ChatMessage[];
}

interface AssistantWorkspaceProps {
  aiCredits: number;
}

export function AssistantWorkspace({
  aiCredits,
}: AssistantWorkspaceProps) {
  const [currentCredits, setCurrentCredits] =
    useState(aiCredits);

  const [selectedSuggestion, setSelectedSuggestion] =
    useState<string | null>(null);

  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  const [
    activeConversationId,
    setActiveConversationId,
  ] = useState<string | null>(null);

  const [loading, setLoading] =
    useState(true);

  /*
   * Load conversations from database
   */
  useEffect(() => {
    async function loadConversations() {
      try {
        const result =
          await getConversations();

        const formatted =
          result as Conversation[];

        setConversations(formatted);

        if (formatted.length > 0) {
          setActiveConversationId(
            formatted[0].id
          );
        }
      } catch (error) {
        console.error(
          "LOAD_CONVERSATIONS_ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadConversations();
  }, []);

  /*
   * Create a new conversation
   */
  async function handleCreateConversation() {
    const conversation =
      await createConversation();

    const newConversation: Conversation = {
      id: conversation.id,
      title:
        conversation.title ??
        "New Conversation",
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
    };

    setConversations((previous) => [
      newConversation,
      ...previous,
    ]);

    setActiveConversationId(
      newConversation.id
    );

    return newConversation.id;
  }

  /*
   * Update conversations
   */
  function handleConversationsLoaded(
    updated: Conversation[]
  ) {
    setConversations(updated);
  }

  /*
   * Select conversation
   */
  function handleConversationSelected(
    conversationId: string
  ) {
    const exists = conversations.some(
      (conversation) =>
        conversation.id ===
        conversationId
    );

    if (!exists) return;

    setActiveConversationId(
      conversationId
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-[650px] items-center justify-center">
        <p className="text-sm text-slate-400">
          Loading assistant...
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_340px]">

      <AssistantChat
        conversations={conversations}
        activeConversationId={
          activeConversationId
        }
        onConversationsLoaded={
          handleConversationsLoaded
        }
        onConversationSelected={
          handleConversationSelected
        }
        onCreateConversation={
          handleCreateConversation
        }
        onCreditsUpdated={
          setCurrentCredits
        }
        onSuggestionSelected={
          setSelectedSuggestion
        }
        selectedSuggestion={
          selectedSuggestion
        }
      />

      <AssistantSidebar
        aiCredits={currentCredits}
        conversations={conversations}
        activeConversationId={
          activeConversationId
        }
        onSelectConversation={
          handleConversationSelected
        }
      />

    </div>
  );
}