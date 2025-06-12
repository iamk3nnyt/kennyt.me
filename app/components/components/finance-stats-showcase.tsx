import { ComponentShowcase } from "@/components/component-showcase";
import { cn } from "@/lib/utils";
import {
  ArrowUp,
  Calendar,
  PiggyBank,
  Receipt,
  TrendingUp,
  Wallet,
} from "lucide-react";

export function FinanceStatsShowcase() {
  const stats = [
    {
      label: "Monthly Income",
      value: 5000,
      icon: Wallet,
      color: "bg-blue-500/10 text-blue-500",
    },
    {
      label: "Monthly Expenses",
      value: 3500,
      icon: ArrowUp,
      color: "bg-red-500/10 text-red-500",
    },
    {
      label: "Budget Remaining",
      value: 1500,
      icon: PiggyBank,
      color: "bg-green-500/10 text-green-500",
    },
    {
      label: "Net Income",
      value: 1500,
      icon: TrendingUp,
      color: "bg-purple-500/10 text-purple-500",
    },
    {
      label: "Transactions",
      value: 25,
      icon: Receipt,
      color: "bg-yellow-500/10 text-yellow-500",
    },
  ];

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  return (
    <ComponentShowcase
      title="Finance Stats"
      description="A collection of financial metrics and statistics that provide insights into monthly budget, expenses, and overall financial health."
      demo={
        <div className="sm:p-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Monthly Budget</h2>
            <div className="flex items-center gap-2 text-sm text-[#B0B0B0]">
              <Calendar className="h-4 w-4" />
              <span>March 2024</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {stats.map((stat, index) => (
              <div
                key={index}
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
                  {index === 4 ? stat.value : formatAmount(stat.value)}
                </div>
                <div className="text-xs font-medium tracking-wide text-[#B0B0B0] uppercase">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      }
      code={`export function Stats() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState(initialStats);
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
        const data = await response.json();

        setStats((prevStats) => [
          { ...prevStats[0], value: data.totalBudget },
          { ...prevStats[1], value: data.totalSpent },
          { ...prevStats[2], value: data.remaining },
          { ...prevStats[3], value: data.netIncome },
          { ...prevStats[4], value: data.transactionCount },
        ]);

        setCurrentPeriod(\`\${data.month} \${data.year}\`);
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
    return amount < 0 ? \`-\${formatted}\` : \`\${formatted}\`;
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
            key={index}
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
    </section>
  );
}`}
    />
  );
}
