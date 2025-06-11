"use client";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { cn } from "@/lib/utils";
import { MLBBStats } from "@/types/gaming";
import { Percent, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";

const initialStats = [
  {
    label: "Matches",
    value: 0,
    icon: Users,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    label: "Win Rate",
    value: 0,
    icon: Percent,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    label: "MVP",
    value: 0,
    icon: Trophy,
    color: "bg-blue-500/10 text-blue-400",
  },
];

function StatsSkeleton() {
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">MLBB Stats</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-2 rounded-2xl border border-[#232326] bg-[#18181B] p-5 shadow-sm"
          >
            <div className="mb-2 h-9 w-9 rounded-lg bg-blue-500/10" />
            <div className="shimmer h-8 w-16 rounded-lg" />
            <div className="shimmer h-4 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function Stats() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(initialStats);
  const { current: animatedMatches } = useAnimatedNumber(stats[0].value);
  const { current: animatedWinRate } = useAnimatedNumber(
    stats[1].value,
    1000,
    true,
  );
  const { current: animatedMVP } = useAnimatedNumber(stats[2].value);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/gaming/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data: MLBBStats = await response.json();

        setStats([
          { ...stats[0], value: data.matches },
          { ...stats[1], value: data.winRate },
          { ...stats[2], value: data.mvp },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching MLBB stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <StatsSkeleton />;
  }

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">MLBB Stats</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="flex flex-col items-start gap-2 rounded-2xl border border-[#232326] bg-[#18181B] p-5 shadow-sm"
          >
            <div
              className={cn(
                "mb-2 flex items-center justify-center rounded-lg p-2",
                stat.color,
              )}
            >
              <stat.icon className="h-5 w-5" />
            </div>
            <div className="text-2xl font-bold text-white">
              {index === 0
                ? animatedMatches
                : index === 1
                  ? `${animatedWinRate}%`
                  : animatedMVP}
            </div>
            <div className="text-xs font-medium tracking-wide text-[#B0B0B0] uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
