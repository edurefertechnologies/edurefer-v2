import {
  Award,
  BookOpen,
  GraduationCap,
  PlayCircle,
} from "lucide-react";

type Props = {
  totalCourses: number;
  activeCourses: number;
  completedCourses: number;
  certificates: number;
};

export function LearningStats({
  totalCourses,
  activeCourses,
  completedCourses,
  certificates,
}: Props) {
  const cards = [
    {
      title: "Enrolled",
      value: totalCourses,
      icon: GraduationCap,
    },
    {
      title: "In Progress",
      value: activeCourses,
      icon: PlayCircle,
    },
    {
      title: "Completed",
      value: completedCourses,
      icon: BookOpen,
    },
    {
      title: "Certificates",
      value: certificates,
      icon: Award,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-xl border bg-card p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {card.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                {card.value}
              </h2>
            </div>

            <div className="rounded-lg bg-primary/10 p-3">
              <card.icon className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}