import { ComponentShowcase } from "@/components/component-showcase";

export function FinanceTimelineShowcase() {
  const transactions = [
    {
      _id: "1",
      date: "2024-03-15T10:00:00Z",
      type: "expense",
      amount: 45.99,
      category: "Food & Dining",
      description: "Lunch at local restaurant",
    },
    {
      _id: "2",
      date: "2024-03-14T15:30:00Z",
      type: "income",
      amount: 2500.0,
      category: "Salary",
      description: "Monthly salary deposit",
    },
    {
      _id: "3",
      date: "2024-03-13T09:15:00Z",
      type: "expense",
      amount: 89.99,
      category: "Shopping",
      description: "New headphones",
    },
    {
      _id: "4",
      date: "2024-03-12T14:20:00Z",
      type: "expense",
      amount: 35.5,
      category: "Transportation",
      description: "Monthly bus pass",
    },
  ];

  return (
    <ComponentShowcase
      title="Finance Timeline"
      description="A chronological view of financial transactions, displaying dates, amounts, categories, and descriptions with color-coded transaction types."
      demo={
        <div className="sm:p-4">
          <h2 className="mb-6 text-xl font-semibold text-white">
            My Spending Timeline
          </h2>
          <ol className="relative border-l border-[#232326]">
            {transactions.map((item) => (
              <li key={item._id} className="mb-10 ml-4">
                <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-[#232326] bg-blue-500" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#88888C]">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      item.type === "expense"
                        ? "text-red-400"
                        : "text-green-400"
                    }`}
                  >
                    {item.type === "expense" ? "-" : "+"}$
                    {Math.abs(item.amount).toLocaleString()}
                  </span>
                </div>
                <div className="mt-1 text-base font-medium text-white">
                  {item.category}
                </div>
                <div className="text-sm text-[#B0B0B0]">{item.description}</div>
              </li>
            ))}
          </ol>
        </div>
      }
      code={`async function SpendingTimeline() {
  // Get current month's start and end dates
  const now = new Date();
  const startOfMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1,
  ).toISOString();
  const endOfMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
  ).toISOString();

  const transactions = await getTransactionsByDateRange(
    startOfMonth,
    endOfMonth,
  );

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">
        My Spending Timeline
      </h2>
      {transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">💰</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Transactions Recorded
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My financial tracking hasn't begun. I'll record my income and
            expenses here, with each transaction helping me maintain a clear
            overview of my finances.
          </p>
        </div>
      ) : (
        <ol className="relative border-l border-[#232326]">
          {transactions.map((item) => (
            <li key={item._id} className="mb-10 ml-4">
              <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-[#232326] bg-blue-500" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#88888C]">
                  {new Date(item.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                <span
                  className={\`text-sm font-semibold \${
                    item.type === "expense"
                      ? "text-red-400"
                      : "text-green-400"
                  }\`}
                >
                  {item.type === "expense" ? "-" : "+"}$
                  {Math.abs(item.amount).toLocaleString()}
                </span>
              </div>
              <div className="mt-1 text-base font-medium text-white">
                {item.category}
              </div>
              <div className="text-sm text-[#B0B0B0]">{item.description}</div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}`}
    />
  );
}
