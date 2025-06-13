import { getRecentWorkouts } from "@/lib/data/workouts";
import { buildMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import { WorkoutActivity } from "@/types/workout";
import type { Metadata } from "next";

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

export const metadata: Metadata = buildMetadata({
  type: "workout",
  title: "Workout - Kenny Tran",
  description:
    "Track my fitness journey, workout routines, and progress. Monitor exercises, sets, reps, and overall performance over time.",
  path: "/workout",
  image: {
    url: "/images/workout/dashboard.jpg",
    width: 1200,
    height: 630,
    alt: "Workout Tracker - Kenny Tran",
  },
});

export default async function WorkoutPage() {
  const activities = await getRecentWorkouts();

  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Workout Journey
        </h2>
        <p className="mb-8 text-[#B0B0B0]">
          Tracking my fitness journey through various activities, from strength
          training to cardio and flexibility work. Each session is a step
          towards better health and well-being.
        </p>
      </section>

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
}
