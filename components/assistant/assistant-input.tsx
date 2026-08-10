"use client";

import { useEffect, useState } from "react";
import {
  SendHorizontal,
  Paperclip,
} from "lucide-react";

import { sendMessage } from "@/actions/assistant/send-message";

interface ChatMessage {
  id: string;
  role: "USER" | "ASSISTANT";
  content: string;
  createdAt: Date | string;
}

interface AssistantInputProps {
  conversationId: string | null;

  onMessageAdded: (
    message: ChatMessage
  ) => void;

  onConversationCreated: () => Promise<string>;
}

export function AssistantInput({
  conversationId,
  onMessageAdded,
  onConversationCreated,
}: AssistantInputProps) {
  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const suggestions = [
    "Which course is best for me?",
    "How do referrals work?",
    "Download my certificate",
    "Track my order",
    "Review my resume",
  ];

  const [
    currentSuggestion,
    setCurrentSuggestion,
  ] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) =>
        prev === suggestions.length - 1
          ? 0
          : prev + 1
      );
    }, 3000);

    return () =>
      clearInterval(interval);
  }, []);

  async function handleSend() {
    const cleanMessage =
      message.trim();

    if (!cleanMessage || loading) {
      return;
    }

    if (cleanMessage.length > 500) {
      return;
    }

    setLoading(true);

    try {
      /*
       * If there is no active conversation,
       * create one first.
       */
      let currentConversationId =
        conversationId;

      if (!currentConversationId) {
        currentConversationId =
          await onConversationCreated();
      }

      /*
       * Immediately show user message
       * in the UI.
       */
      const userMessage: ChatMessage = {
        id: `temp-user-${Date.now()}`,
        role: "USER",
        content: cleanMessage,
        createdAt: new Date(),
      };

      onMessageAdded(userMessage);

      setMessage("");

      /*
       * Send to server / AI
       */
      const result = await sendMessage(
        currentConversationId,
        cleanMessage
      );

      /*
       * Show AI response
       */
      const assistantMessage: ChatMessage = {
        id: `temp-assistant-${Date.now()}`,
        role: "ASSISTANT",
        content: result.reply,
        createdAt: new Date(),
      };

      onMessageAdded(
        assistantMessage
      );
    } catch (error) {
      console.error(
        "ASSISTANT_SEND_ERROR:",
        error
      );

      const errorMessage: ChatMessage = {
        id: `temp-error-${Date.now()}`,
        role: "ASSISTANT",
        content:
          "Sorry, something went wrong. Please try again.",
        createdAt: new Date(),
      };

      onMessageAdded(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();

      handleSend();
    }
  }

  function useSuggestion(
    suggestion: string
  ) {
    setMessage(suggestion);
  }

  return (
    <div className="flex items-end gap-3">

      {/* Attachment */}

      <button
        type="button"
        disabled
        title="Attachments coming soon"
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-white/5
          opacity-60
        "
      >
        <Paperclip className="h-5 w-5 text-slate-400" />
      </button>

      {/* Input */}

      <div className="flex-1">

        <textarea
          rows={2}
          maxLength={500}
          value={message}
          onChange={(event) =>
            setMessage(event.target.value)
          }
          onKeyDown={handleKeyDown}
          disabled={loading}
          placeholder="Ask about Edurefer courses, wallet, certificates, referrals..."
          className="
            w-full
            resize-none
            rounded-2xl
            border
            border-white/10
            bg-white/5
            px-5
            py-4
            text-white
            placeholder:text-slate-500
            outline-none
            transition
            focus:border-cyan-500/30
            focus:bg-white/[0.07]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        />

        <div className="mt-2 flex justify-between">

          <button
            type="button"
            onClick={() =>
              useSuggestion(
                suggestions[currentSuggestion]
              )
            }
            className="text-left text-xs text-slate-500 transition hover:text-cyan-300"
          >
            💡{" "}
            {suggestions[currentSuggestion]}
          </button>

          <p className="text-xs text-slate-500">
            {message.length}/500
          </p>

        </div>

      </div>

      {/* Send */}

      <button
        type="button"
        disabled={
          !message.trim() ||
          loading
        }
        onClick={handleSend}
        className="
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          from-blue-600
          to-emerald-500
          text-white
          shadow-lg
          transition
          hover:scale-105
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? (
          <span className="text-xs">
            ...
          </span>
        ) : (
          <SendHorizontal className="h-5 w-5" />
        )}
      </button>

    </div>
  );
}