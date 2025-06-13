import { ComponentShowcase } from "@/components/component-showcase";
import { cn } from "@/lib/utils";
import { WorkoutActivity } from "@/types/workout";

function getTypeColor(type: WorkoutActivity["type"]) {
  switch (type) {
    case "strength":
      return "text-blue-400";
    case "cardio":
      return "text-green-400";
    case "flexibility":
      return "text-purple-400";
    case "recovery":
      return "text-yellow-400";
    default:
      return "text-white";
  }
}

export function WorkoutTimelineShowcase() {
  const activities = [
    {
      emoji: "🏋️",
      title: "Upper Body Strength",
      duration: "45 min",
      description:
        "Focused on chest, shoulders, and triceps with progressive overload",
      type: "strength",
      date: "2024-03-15T10:00:00Z",
    },
    {
      emoji: "🏃",
      title: "Morning Run",
      duration: "30 min",
      description: "Steady state cardio with 5K distance goal",
      type: "cardio",
      date: "2024-03-14T07:30:00Z",
    },
    {
      emoji: "🧘",
      title: "Yoga Flow",
      duration: "60 min",
      description: "Full body flexibility and mobility work",
      type: "flexibility",
      date: "2024-03-13T18:00:00Z",
    },
    {
      emoji: "💆",
      title: "Recovery Session",
      duration: "20 min",
      description: "Foam rolling and stretching for muscle recovery",
      type: "recovery",
      date: "2024-03-12T20:00:00Z",
    },
  ] as const;

  return (
    <ComponentShowcase
      title="Workout Timeline"
      description="A chronological view of workout activities, displaying exercise types, durations, and descriptions with color-coded activity types."
      demo={
        <div className="sm:p-4">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Activity Timeline
          </h2>
          <ul className="divide-y divide-[#232326]">
            {activities.map((activity, idx) => (
              <li key={idx} className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#18181B] text-xl">
                    {activity.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-medium text-white">
                        {activity.title}
                      </h3>
                      <span className="text-sm text-[#B0B0B0]">
                        {activity.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#B0B0B0]">
                      {activity.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={cn("text-xs", getTypeColor(activity.type))}
                      >
                        {activity.type.charAt(0).toUpperCase() +
                          activity.type.slice(1)}
                      </span>
                      <span className="text-xs text-[#B0B0B0]">
                        {new Date(activity.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      }
      code={`import { getRecentWorkouts } from "@/lib/data/workouts";
import { cn } from "@/lib/utils";
import { WorkoutActivity } from "@/types/workout";

function getTypeColor(type: WorkoutActivity["type"]) {
  switch (type) {
    case "strength":
      return "text-blue-400";
    case "cardio":
      return "text-green-400";
    case "flexibility":
      return "text-purple-400";
    case "recovery":
      return "text-yellow-400";
    default:
      return "text-white";
  }
}

export default async function WorkoutPage() {
  const activities = await getRecentWorkouts();

  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Activity Timeline
        </h2>
        {activities.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
            <div className="mb-4 text-4xl">🏋️</div>
            <h3 className="mb-2 text-lg font-medium text-white">
              No Activities Recorded
            </h3>
            <p className="text-sm text-[#B0B0B0]">
              My fitness journey hasn&apos;t begun. I&apos;ll track my strength
              training, cardio, and flexibility work here, with each session
              bringing me closer to better health.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#232326]">
            {activities.map((activity, idx) => (
              <li key={idx} className="py-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#18181B] text-xl">
                    {activity.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between">
                      <h3 className="font-medium text-white">
                        {activity.title}
                      </h3>
                      <span className="text-sm text-[#B0B0B0]">
                        {activity.duration}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-[#B0B0B0]">
                      {activity.description}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className={cn("text-xs", getTypeColor(activity.type))}
                      >
                        {activity.type.charAt(0).toUpperCase() +
                          activity.type.slice(1)}
                      </span>
                      <span className="text-xs text-[#B0B0B0]">
                        {new Date(activity.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}`}
    />
  );
}
