"use client";

import {
  Clock3,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

interface Conversation {
  id: string;
  title: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
}

interface AssistantHistoryProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelect: (conversationId: string) => void;
}

export function AssistantHistory({
  conversations,
  activeConversationId,
  onSelect,
}: AssistantHistoryProps) {
  function formatTime(date: Date | string) {
    const value = new Date(date);

    const now = new Date();

    const isToday =
      value.toDateString() ===
      now.toDateString();

    if (isToday) {
      return "Today";
    }

    const yesterday = new Date();
    yesterday.setDate(
      yesterday.getDate() - 1
    );

    if (
      value.toDateString() ===
      yesterday.toDateString()
    ) {
      return "Yesterday";
    }

    return value.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
      }
    );
  }

  return (
    <div className="mb-5">

      {/* Header */}

      <div className="mb-5 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">
          <Clock3 className="h-5 w-5 text-cyan-300" />
        </div>

        <div>
          <h3 className="font-bold text-white">
            Recent Conversations
          </h3>

          <p className="text-xs text-slate-400">
            Continue previous chats
          </p>
        </div>

      </div>

      {/* Empty */}

      {conversations.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <MessageSquare className="mx-auto h-5 w-5 text-slate-500" />

          <p className="mt-2 text-sm text-slate-400">
            No conversations yet
          </p>
        </div>
      )}

      {/* Conversations */}

      <div className="space-y-3">

        {conversations.map((item) => {
          const active =
            item.id ===
            activeConversationId;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() =>
                onSelect(item.id)
              }
              className={`
                group
                w-full
                rounded-2xl
                border
                p-4
                text-left
                transition-all
                ${active
                  ? "border-cyan-500/30 bg-cyan-500/10"
                  : "border-white/10 bg-white/5 hover:border-cyan-500/20 hover:bg-white/10"
                }
              `}
            >

              <div className="flex items-center justify-between">

                <div className="flex min-w-0 items-center gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

                    <MessageSquare className="h-4 w-4 text-cyan-300" />

                  </div>

                  <div className="min-w-0">

                    <p className="truncate font-medium text-white">
                      {item.title ||
                        "New Conversation"}
                    </p>

                    <p className="text-xs text-slate-400">
                      {formatTime(
                        item.updatedAt
                      )}
                    </p>

                  </div>

                </div>

                <ChevronRight
                  className={`
                    h-4 w-4 shrink-0 text-slate-500 transition
                    group-hover:text-cyan-300
                    ${active
                      ? "text-cyan-300"
                      : ""
                    }
                  `}
                />

              </div>

            </button>
          );
        })}

      </div>

    </div>
  );
}