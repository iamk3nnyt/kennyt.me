import { ComponentShowcase } from "@/components/component-showcase";
import { cn } from "@/lib/utils";

export function FinanceCategoriesShowcase() {
  const categoryTotals = {
    "Food & Dining": -850.5,
    Transportation: -320.75,
    Entertainment: -150.25,
    Shopping: -425.0,
    Utilities: -280.5,
    Income: 5000.0,
  };

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount < 0 ? `-$${formatted}` : `$${formatted}`;
  };

  return (
    <ComponentShowcase
      title="Finance Categories"
      description="A breakdown of financial transactions by category, showing spending patterns and income sources with color-coded amounts."
      demo={
        <div className="sm:p-4">
          <h3 className="mb-6 text-lg font-semibold text-white">
            Category Breakdown
          </h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(categoryTotals).map(([category, amount], idx) => (
              <div
                key={idx}
                className="flex flex-col gap-y-2 rounded-xl border border-[#232326] bg-[#18181B] p-4"
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
      }
      code={`export function Categories() {
  const [isLoading, setIsLoading] = useState(true);
  const [categoryTotals, setCategoryTotals] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/finance/budget");
        if (!response.ok) {
          throw new Error("Failed to fetch budget stats");
        }
        const data = await response.json();
        setCategoryTotals(data.categoryTotals);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching category stats:", error);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  const formatAmount = (amount: number) => {
    const formatted = Math.abs(amount).toFixed(2);
    return amount < 0 ? \`-\${formatted}\` : \`\${formatted}\`;
  };

  return (
    <div>
      <h3 className="mb-6 text-lg font-semibold text-white">
        Category Breakdown
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categoryTotals).map(([category, amount], idx) => (
          <div
            key={idx}
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
  );
}`}
    />
  );
}
