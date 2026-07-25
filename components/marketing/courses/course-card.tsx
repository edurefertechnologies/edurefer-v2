import { BookOpen, Clock3, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CourseCardProps {
  title: string;
  category: string;
  level: string;
  duration: string;
  students: number;
}

export default function CourseCard({
  title,
  category,
  level,
  duration,
  students,
}: CourseCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-[rgba(212,175,55,.15)] bg-[var(--card)] transition-all duration-300 hover:-translate-y-2 hover:border-[var(--gold)]">
      <div className="h-48 bg-gradient-to-br from-green-600/20 via-green-500/10 to-[rgba(212,175,55,.15)]" />

      <div className="p-6">
        <span className="rounded-full bg-green-600/10 px-3 py-1 text-xs font-medium text-green-400">
          {category}
        </span>

        <h3 className="mt-4 text-xl font-bold text-white">
          {title}
        </h3>

        <div className="mt-6 space-y-3 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <BookOpen size={16} />
            {level}
          </div>

          <div className="flex items-center gap-2">
            <Clock3 size={16} />
            {duration}
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} />
            {students.toLocaleString("en-IN")} Students
          </div>

          <Button className="mt-8 w-full bg-[var(--emerald)] hover:bg-green-700">
            Explore Course
          </Button>
        </div>
      </div>
    </div>
  );
}