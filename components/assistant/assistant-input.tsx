"use client";

import { useEffect, useState } from "react";
import { SendHorizontal, Paperclip } from "lucide-react";
import { sendMessage } from "@/actions/assistant/send-message";

export function AssistantInput() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const suggestions = [
    "Which course is best for me?",
    "How do referrals work?",
    "Download my certificate",
    "Track my order",
    "Review my resume",
  ];

  const [currentSuggestion, setCurrentSuggestion] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestion((prev) =>
        prev === suggestions.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  async function handleSend() {
    if (!message.trim()) return;

    setLoading(true);

    try {
      await sendMessage(
        "TEMP_CONVERSATION_ID",
        message
      );

      setMessage("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="border-t border-white/10 bg-black/10 p-5 backdrop-blur-xl">

      <div className="flex items-end gap-3">

        {/* Future Attachment Button */}

        <button
          type="button"
          className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-2xl
          border
          border-white/10
          bg-white/5
          transition
          hover:bg-white/10
          "
        >
          <Paperclip className="h-5 w-5 text-slate-400" />
        </button>

        {/* Input */}

        <div className="flex-1">

          <textarea
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
            "
          />

          <div className="mt-2 flex justify-between">

            <p className="text-xs text-slate-500">
              💡 {suggestions[currentSuggestion]}
            </p>

            <p className="text-xs text-slate-500">
              {message.length}/500
            </p>

          </div>

        </div>

        {/* Send */}

        <button
          disabled={!message.trim() || loading}
          onClick={handleSend}
          className="
          flex
          h-14
          w-14
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
          {loading ? "..." :
            <SendHorizontal className="h-5 w-5" />}
        </button>

      </div>

    </div>
  );
}