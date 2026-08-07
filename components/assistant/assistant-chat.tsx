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

export function AssistantChat() {
  return (
    <div
      className="
      flex
      h-[720px]
      flex-col
      overflow-hidden
      rounded-3xl
      border
      border-white/10
      bg-white/[0.04]
      backdrop-blur-xl
      "
    >
      {/* Header */}

      <div className="border-b border-white/10 px-6 py-5">

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

      </div>

      {/* Chat */}

      <div className="flex-1 overflow-y-auto px-6 py-8">

        <div className="mx-auto max-w-3xl">

          {/* Welcome */}

          <div className="mb-10 text-center">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

              <MessageSquare className="h-10 w-10 text-cyan-300" />

            </div>

            <h3 className="mt-6 text-3xl font-black text-white">

              Welcome to Edurefer Assistant

            </h3>

            <p className="mt-3 text-slate-400">

              I can help you with courses, wallet,
              certificates, orders, referrals and career guidance.

            </p>

          </div>

          <div className="mt-10 space-y-6">
            <AssistantMessage
              role="assistant"
              time="Now"
              message={`👋 Hello!

Welcome to Edurefer Assistant.

I can help you with:

• Courses
• Orders
• Wallet
• Certificates
• Referrals
• Career Guidance

How may I assist you today?`}
            />

          </div>

          {/* Suggestions */}

          <div className="grid gap-4 md:grid-cols-2">

            {suggestions.map((item) => (

              <button
                key={item.title}
                className="
                group
                rounded-2xl
                border
                border-white/10
                bg-white/5
                p-5
                text-left
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-cyan-500/20
                hover:bg-white/10
                "
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

                  <item.icon className="h-6 w-6 text-cyan-300" />

                </div>

                <h4 className="mt-4 font-semibold text-white">

                  {item.title}

                </h4>

                <p className="mt-2 text-sm text-slate-400">

                  {item.description}

                </p>

              </button>

            ))}

          </div>

        </div>

      </div>

      {/* Input */}

      <AssistantInput />

    </div>
  );
}