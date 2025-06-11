import { ReadOperations } from "@/lib/db/read";
import client from "@/lib/mongodb";
import { Transaction } from "@/types/finance";
import { Stats } from "./components";

export default async function FinancePage() {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Transaction>(db, "transactions");

  const transactions = await readOps.findMany(
    {},
    {
      projection: {
        _id: 1,
        amount: 1,
        category: 1,
        description: 1,
        date: 1,
        type: 1,
        month: 1,
        year: 1,
      },
      sort: { date: -1 },
    },
  );

  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-bold text-white">Finance</h2>
        <p className="mb-8 text-[#B0B0B0]">
          My personal finance tracking and insights. This page shows my monthly
          budget allocation, spending patterns, and financial goals. I use this
          to maintain a clear overview of my expenses and income streams.
        </p>
      </section>

      <Stats />

      <section className="mx-auto mb-16 max-w-2xl">
        {/* Spending Timeline */}
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
              My financial tracking hasn&apos;t begun. I&apos;ll record my
              income and expenses here, with each transaction helping me
              maintain a clear overview of my finances.
            </p>
          </div>
        ) : (
          <ol className="relative border-l border-[#232326]">
            {transactions.map((item) => (
              <li key={item._id} className="mb-10 ml-4">
                <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-[#232326] bg-blue-500" />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#88888C]">{item.date}</span>
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
        )}
      </section>
    </main>
  );
}
