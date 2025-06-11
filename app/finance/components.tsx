"use client";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { cn } from "@/lib/utils";
import { BudgetStats } from "@/types/finance";
import { ArrowUp, PiggyBank, Wallet } from "lucide-react";
import { useEffect, useState } from "react";

const initialStats = [
  {
    label: "Total Budget",
    value: 0,
    icon: Wallet,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    label: "Total Spent",
    value: 0,
    icon: ArrowUp,
    color: "bg-red-500/10 text-red-500",
  },
  {
    label: "Remaining",
    value: 0,
    icon: PiggyBank,
    color: "bg-green-500/10 text-green-500",
  },
];

function StatsSkeleton() {
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Monthly Budget</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-2 rounded-2xl border border-[#232326] bg-[#18181B] p-5 shadow-sm"
          >
            <div
              className={cn(
                "mb-2 h-9 w-9 rounded-lg",
                initialStats[index].color,
              )}
            />
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
  const { current: animatedBudget } = useAnimatedNumber(stats[0].value);
  const { current: animatedSpent } = useAnimatedNumber(stats[1].value);
  const { current: animatedRemaining } = useAnimatedNumber(stats[2].value);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/finance/budget");
        if (!response.ok) {
          throw new Error("Failed to fetch budget stats");
        }
        const data: BudgetStats = await response.json();

        setStats([
          { ...stats[0], value: data.totalBudget },
          { ...stats[1], value: data.totalSpent },
          { ...stats[2], value: data.remaining },
        ]);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching budget stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <StatsSkeleton />;
  }

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Monthly Budget</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              {`$${
                index === 0
                  ? animatedBudget
                  : index === 1
                    ? animatedSpent
                    : animatedRemaining
              }`}
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
