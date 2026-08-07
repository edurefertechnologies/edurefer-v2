"use client";

import {
  Bot,
  User,
  Copy,
  Check,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

import { useState } from "react";

interface AssistantMessageProps {
  role: "user" | "assistant";
  message: string;
  time: string;
}

export function AssistantMessage({
  role,
  message,
  time,
}: AssistantMessageProps) {

  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    await navigator.clipboard.writeText(message);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  const isAssistant = role === "assistant";

  return (
    <div
      className={`flex gap-4 ${
        isAssistant ? "" : "flex-row-reverse"
      }`}
    >
      {/* Avatar */}

      <div
        className={`
        flex
        h-12
        w-12
        shrink-0
        items-center
        justify-center
        rounded-2xl
        ${
          isAssistant
            ? "bg-gradient-to-br from-blue-500/20 to-emerald-500/20"
            : "bg-gradient-to-br from-cyan-500/20 to-blue-500/20"
        }
      `}
      >
        {isAssistant ? (
          <Bot className="h-6 w-6 text-cyan-300" />
        ) : (
          <User className="h-6 w-6 text-white" />
        )}
      </div>

      {/* Bubble */}

      <div className="max-w-[85%]">

        <div
          className={`
          rounded-3xl
          border
          p-5
          backdrop-blur-xl
          ${
            isAssistant
              ? "border-white/10 bg-white/[0.05]"
              : "border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"
          }
        `}
        >
          <p className="whitespace-pre-wrap text-[15px] leading-7 text-white">
            {message}
          </p>
        </div>

        {/* Footer */}

        <div
          className={`
          mt-2
          flex
          items-center
          gap-3
          text-xs
          text-slate-500
          ${
            isAssistant
              ? ""
              : "justify-end"
          }
        `}
        >
          <span>{time}</span>

          {isAssistant && (
            <>

              <button
                onClick={copyMessage}
                className="transition hover:text-cyan-300"
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>

              <button className="transition hover:text-emerald-300">
                <ThumbsUp className="h-4 w-4" />
              </button>

              <button className="transition hover:text-red-300">
                <ThumbsDown className="h-4 w-4" />
              </button>

            </>
          )}

        </div>

      </div>

    </div>
  );
}