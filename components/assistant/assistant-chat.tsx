"use client";

import {
  GraduationCap,
  Wallet,
  Award,
  CreditCard,
  Briefcase,
  MessageSquare,
} from "lucide-react";

import { AssistantInput } from "./assistant-input";
import { AssistantMessage } from "./assistant-message";

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

interface AssistantChatProps {
  onCreateConversation: () => Promise<string>;

  conversations: Conversation[];
  activeConversationId: string | null;

  onConversationsLoaded: (
    conversations: Conversation[]
  ) => void;

  onConversationSelected: (
    conversationId: string
  ) => void;
}

const suggestions = [
  {
    icon: GraduationCap,
    title: "Course Help",
    description: "Recommend a course for me",
  },
  {
    icon: CreditCard,
    title: "Orders",
    description: "Check my recent orders",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "How can I download my certificate?",
  },
  {
    icon: Wallet,
    title: "Wallet",
    description: "How do referral rewards work?",
  },
  {
    icon: Briefcase,
    title: "Career",
    description: "Help me prepare for interviews",
  },
];

export function AssistantChat({
  conversations,
  activeConversationId,
  onConversationsLoaded,
  onConversationSelected,
  onCreateConversation,
}: AssistantChatProps) {
  const activeConversation =
    conversations.find(
      (conversation) =>
        conversation.id === activeConversationId
    );

  const messages =
    activeConversation?.messages ?? [];

  /*
   * Add a message to the active conversation.
   *
   * The workspace owns the conversation list,
   * so we update it through the callback.
   */
  function handleMessageAdded(
    message: ChatMessage
  ) {
    if (!activeConversationId) {
      return;
    }

    const updatedConversations =
      conversations.map((conversation) => {
        if (
          conversation.id !==
          activeConversationId
        ) {
          return conversation;
        }

        return {
          ...conversation,
          messages: [
            ...conversation.messages,
            message,
          ],
          updatedAt: new Date(),
        };
      });

    onConversationsLoaded(
      updatedConversations
    );
  }

  /*
   * Called when AssistantInput needs
   * a conversation.
   *
   * The workspace will handle creation.
   */

  return (
    <div className="flex h-full min-h-[650px] flex-col">

      {/* Header */}

      <div className="border-b border-white/10 px-6 py-5">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

              <MessageSquare className="h-6 w-6 text-cyan-300" />

            </div>

            <div>

              <h2 className="text-lg font-bold text-white">
                Edurefer Assistant
              </h2>

              <p className="text-sm text-slate-400">
                Ask anything about Edurefer Services
              </p>

            </div>

          </div>

          {/* Active conversation */}

          <div className="flex items-center gap-3">

            {activeConversation && (
              <div className="hidden max-w-[220px] truncate rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-400 sm:block">
                {activeConversation.title ||
                  "New Conversation"}
              </div>
            )}

            <button
              type="button"
              onClick={onCreateConversation}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              + New Chat
            </button>

          </div>
        </div>

      </div>

      {/* Chat */}

      <div className="flex-1 overflow-y-auto px-6 py-8">

        <div className="mx-auto max-w-3xl">

          {/* Welcome */}

          {messages.length === 0 && (
            <>
              <div className="mb-10 text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

                  <MessageSquare className="h-10 w-10 text-cyan-300" />

                </div>

                <h3 className="mt-6 text-3xl font-black text-white">
                  Welcome to Edurefer Assistant
                </h3>

                <p className="mt-3 text-slate-400">
                  I can help you with courses,
                  wallet, certificates, orders,
                  referrals and career guidance.
                </p>

              </div>

              {/* Suggestions */}

              <div className="grid gap-4 md:grid-cols-2">

                {suggestions.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      className="group rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/20 hover:bg-white/10"
                    >

                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

                        <Icon className="h-6 w-6 text-cyan-300" />

                      </div>

                      <h4 className="mt-4 font-semibold text-white">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-sm text-slate-400">
                        {item.description}
                      </p>

                    </button>
                  );
                })}

              </div>
            </>
          )}

          {/* Messages */}

          {messages.length > 0 && (
            <div className="space-y-6">

              {messages.map((item) => (
                <AssistantMessage
                  key={item.id}
                  role={
                    item.role === "USER"
                      ? "user"
                      : "assistant"
                  }
                  message={item.content}
                  time={new Date(
                    item.createdAt
                  ).toLocaleTimeString(
                    "en-IN",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                />
              ))}

            </div>
          )}

        </div>

      </div>

      {/* Input */}

      <div className="border-t border-white/10 px-6 py-5">

        <AssistantInput
          conversationId={
            activeConversationId
          }
          onMessageAdded={
            handleMessageAdded
          }
          onConversationCreated={
            onCreateConversation
          }
        />

      </div>

    </div>
  );
}