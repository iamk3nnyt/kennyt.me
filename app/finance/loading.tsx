import { Stats } from "./components";

export default function FinanceLoading() {
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
        <ol className="relative border-l border-[#232326]">
          {[...Array(5)].map((_, idx) => (
            <li key={idx} className="mb-10 ml-4">
              <div className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full border-2 border-[#232326] bg-[#232326]" />
              <div className="mb-1">
                <div className="shimmer h-6 w-48 rounded" />
              </div>
              <div className="mb-2">
                <div className="shimmer h-4 w-32 rounded" />
              </div>
              <div className="mb-2">
                <div className="shimmer h-4 w-full rounded" />
                <div className="shimmer mt-2 h-4 w-2/3 rounded" />
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
