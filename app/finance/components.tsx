"use client";

import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { cn } from "@/lib/utils";
import { BudgetStats } from "@/types/finance";
import {
  ArrowUp,
  Calendar,
  PiggyBank,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";

const initialStats = [
  {
    label: "Monthly Income",
    value: 0,
    icon: Wallet,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    label: "Monthly Expenses",
    value: 0,
    icon: ArrowUp,
    color: "bg-red-500/10 text-red-500",
  },
  {
    label: "Budget Remaining",
    value: 0,
    icon: PiggyBank,
    color: "bg-green-500/10 text-green-500",
  },
  {
    label: "Net Income",
    value: 0,
    icon: TrendingUp,
    color: "bg-purple-500/10 text-purple-500",
  },
  {
    label: "Transactions",
    value: 0,
    icon: Receipt,
    color: "bg-yellow-500/10 text-yellow-500",
  },
];

function StatsSkeleton() {
  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Monthly Budget</h2>
        <div className="shimmer h-6 w-32 rounded-lg" />
      </div>
      <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[...Array(5)].map((_, index) => (
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
      <div>
        <h3 className="mb-6 text-lg font-semibold text-white">
          Category Breakdown
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-[#232326] bg-[#18181B] p-4"
            >
              <div className="shimmer h-4 w-24 rounded-lg" />
              <div className="shimmer h-4 w-16 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Stats() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(initialStats);
  const [categoryTotals, setCategoryTotals] = useState<Record<string, number>>(
    {},
  );
  const [currentPeriod, setCurrentPeriod] = useState("");

  const { current: animatedIncome } = useAnimatedNumber(stats[0].value);
  const { current: animatedExpenses } = useAnimatedNumber(stats[1].value);
  const { current: animatedRemaining } = useAnimatedNumber(stats[2].value);
  const { current: animatedNetIncome } = useAnimatedNumber(stats[3].value);
  const { current: animatedTransactions } = useAnimatedNumber(stats[4].value);

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
          { ...stats[3], value: data.netIncome },
          { ...stats[4], value: data.transactionCount },
        ]);

        setCategoryTotals(data.categoryTotals);
        setCurrentPeriod(`${data.month} ${data.year}`);
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

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Monthly Budget</h2>
        <div className="flex items-center gap-2 text-sm text-[#B0B0B0]">
          <Calendar className="h-4 w-4" />
          <span>{currentPeriod}</span>
        </div>
      </div>
      <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-3">
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
              {index === 4
                ? animatedTransactions
                : formatAmount(
                    index === 0
                      ? animatedIncome
                      : index === 1
                        ? animatedExpenses
                        : index === 2
                          ? animatedRemaining
                          : animatedNetIncome,
                  )}
            </div>
            <div className="text-xs font-medium tracking-wide text-[#B0B0B0] uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h3 className="mb-6 text-lg font-semibold text-white">
          Category Breakdown
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(categoryTotals).map(([category, amount]) => (
            <div
              key={category}
              className="flex items-center justify-between rounded-xl border border-[#232326] bg-[#18181B] p-4"
            >
              <span className="text-sm font-medium text-[#B0B0B0] capitalize">
                {category}
              </span>
              <span
                className={cn(
                  "text-sm font-semibold",
                  amount < 0 ? "text-red-400" : "text-green-400",
                )}
              >
                {amount < 0 ? "-" : "+"}
                {formatAmount(Math.abs(amount))}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
