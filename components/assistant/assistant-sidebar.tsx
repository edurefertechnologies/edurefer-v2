"use client";

import Link from "next/link";

import {
  GraduationCap,
  CreditCard,
  Award,
  Wallet,
  Users,
  Briefcase,
  Sparkles,
  ChevronRight,
  LifeBuoy,
} from "lucide-react";

import { AssistantHistory } from "./assistant-history";

const actions = [
  {
    title: "Courses",
    description: "Browse & Learn",
    href: "/courses",
    icon: GraduationCap,
  },
  {
    title: "Orders",
    description: "Track Purchases",
    href: "/orders",
    icon: CreditCard,
  },
  {
    title: "Certificates",
    description: "Download",
    href: "/certificates",
    icon: Award,
  },
  {
    title: "Wallet",
    description: "Rewards",
    href: "/wallet",
    icon: Wallet,
  },
  {
    title: "Referrals",
    description: "Invite Friends",
    href: "/referrals",
    icon: Users,
  },
  {
    title: "Career",
    description: "Resume & Interview",
    href: "/career",
    icon: Briefcase,
  },
];

interface Conversation {
  id: string;
  title: string | null;
  createdAt: Date | string;
  updatedAt: Date | string;
  messages: {
    id: string;
    role: "USER" | "ASSISTANT";
    content: string;
    createdAt: Date | string;
  }[];
}

interface AssistantSidebarProps {
  aiCredits: number;
  conversations: Conversation[];
  activeConversationId: string | null;
  onSelectConversation: (
    conversationId: string
  ) => void;
}

export function AssistantSidebar({
  aiCredits,
  conversations,
  activeConversationId,
  onSelectConversation,
}: AssistantSidebarProps) {
  return (
    <div className="space-y-6">

      {/* Quick Actions */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

        <div className="mb-5 flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">
            <Sparkles className="h-5 w-5 text-cyan-300" />
          </div>

          <div>
            <h3 className="font-bold text-white">
              Quick Actions
            </h3>

            <p className="text-xs text-slate-400">
              Most used services
            </p>
          </div>

        </div>

        <div className="space-y-3">

          {actions.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 transition-all hover:border-cyan-500/20 hover:bg-white/10"
              >

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

                    <Icon className="h-5 w-5 text-cyan-300" />

                  </div>

                  <div>

                    <p className="font-medium text-white">
                      {item.title}
                    </p>

                    <p className="text-xs text-slate-400">
                      {item.description}
                    </p>

                  </div>

                </div>

                <ChevronRight className="h-4 w-4 text-slate-500 transition group-hover:text-cyan-300" />

              </Link>
            );
          })}

        </div>

      </div>

      {/* AI Credits */}

      <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-6">

        <p className="text-xs uppercase tracking-widest text-emerald-300">
          AI Credits
        </p>

        <h2 className="mt-3 text-4xl font-black text-white">
          {aiCredits.toLocaleString()}
        </h2>

        <p className="mt-2 text-sm text-slate-300">
          Available AI Credits
        </p>

        <Link
          href="/pricing"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-emerald-500 py-3 text-sm font-semibold text-white transition hover:scale-[1.02]"
        >
          Buy Credits
        </Link>

      </div>

      {/* Conversation History */}

      <AssistantHistory
        conversations={conversations}
        activeConversationId={
          activeConversationId
        }
        onSelect={onSelectConversation}
      />

      {/* Support */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

            <LifeBuoy className="h-5 w-5 text-cyan-300" />

          </div>

          <div>

            <h3 className="font-bold text-white">
              Need Help?
            </h3>

            <p className="text-xs text-slate-400">
              Contact Edurefer Support
            </p>

          </div>

        </div>

        <Link
          href="/support"
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
        >
          Contact Support
        </Link>

      </div>

    </div>
  );
}