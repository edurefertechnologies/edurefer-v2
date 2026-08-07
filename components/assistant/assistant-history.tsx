import {
  Clock3,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

const history = [
  {
    id: 1,
    title: "Track My Order",
    time: "Today",
  },
  {
    id: 2,
    title: "Download Certificate",
    time: "Today",
  },
  {
    id: 3,
    title: "Wallet Balance",
    time: "Yesterday",
  },
  {
    id: 4,
    title: "Course Recommendation",
    time: "Yesterday",
  },
];

export function AssistantHistory() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

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

      <div className="space-y-3">

        {history.map((item) => (

          <button
            key={item.id}
            className="
            group
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/5
            p-4
            text-left
            transition-all
            hover:border-cyan-500/20
            hover:bg-white/10
            "
          >

            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-emerald-500/20">

                  <MessageSquare className="h-4 w-4 text-cyan-300" />

                </div>

                <div>

                  <p className="font-medium text-white">
                    {item.title}
                  </p>

                  <p className="text-xs text-slate-400">
                    {item.time}
                  </p>

                </div>

              </div>

              <ChevronRight className="h-4 w-4 text-slate-500 transition group-hover:text-cyan-300" />

            </div>

          </button>

        ))}

      </div>

    </div>
  );
}