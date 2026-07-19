import { Button } from "@/components/ui/button";

export function QuickActions() {
  return (
    <div className="rounded-xl border bg-card p-6">
      <h2 className="text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="mt-4 flex flex-col gap-3">
        <Button>Browse Courses</Button>

        <Button variant="outline">
          Open AI Assistant
        </Button>

        <Button variant="secondary">
          Invite Friends
        </Button>
      </div>
    </div>
  );
}