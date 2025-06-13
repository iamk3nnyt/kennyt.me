import { ComponentShowcase } from "@/components/component-showcase";
import { cn } from "@/lib/utils";
import { Percent, Trophy, Users } from "lucide-react";

export function GamingStatsShowcase() {
  const stats = [
    {
      label: "Matches",
      value: 150,
      icon: Users,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "Win Rate",
      value: 65,
      icon: Percent,
      color: "bg-blue-500/10 text-blue-400",
    },
    {
      label: "MVP",
      value: 45,
      icon: Trophy,
      color: "bg-blue-500/10 text-blue-400",
    },
  ];

  return (
    <ComponentShowcase
      title="Gaming Stats"
      description="A collection of gaming statistics that display key performance metrics with animated number transitions and color-coded icons."
      demo={
        <div className="sm:p-4">
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
                  {index === 1 ? `${stat.value}%` : stat.value}
                </div>
                <div className="text-xs font-medium tracking-wide text-[#B0B0B0] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      code={`import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
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

        setStats((prevStats) => [
          { ...prevStats[0], value: data.matches },
          { ...prevStats[1], value: data.winRate },
          { ...prevStats[2], value: data.mvp },
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
                  ? \`\${animatedWinRate}%\`
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
}`}
    />
  );
}
