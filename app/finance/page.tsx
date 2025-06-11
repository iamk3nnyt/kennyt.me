"use client";

import type { Transaction } from "@/app/api/finance/transactions/route";
import { ArrowUp, PiggyBank, Wallet } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const budgetStats = [
  {
    label: "Total Budget",
    value: 2500,
    icon: Wallet,
    color: "bg-blue-500/10 text-blue-500",
  },
  {
    label: "Total Spent",
    value: 1875,
    icon: ArrowUp,
    color: "bg-red-500/10 text-red-500",
  },
  {
    label: "Remaining",
    value: 625,
    icon: PiggyBank,
    color: "bg-green-500/10 text-green-500",
  },
];

export default function FinancePage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [prefetchedData, setPrefetchedData] = useState<{
    transactions: Transaction[];
    nextCursor: string | null;
    hasMore: boolean;
  } | null>(null);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Initial fetch
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("/api/finance/transactions");
        if (!response.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await response.json();
        setTransactions(data.transactions);
        setHasMore(data.hasMore);
        setNextCursor(data.nextCursor);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  // Prefetch next batch when we have a cursor
  useEffect(() => {
    if (!nextCursor || loadingMore || !hasMore) return;

    const prefetchNextBatch = async () => {
      try {
        const res = await fetch(
          `/api/finance/transactions?cursor=${encodeURIComponent(nextCursor)}`,
        );
        const data = await res.json();
        setPrefetchedData(data);
      } catch (error) {
        console.error("Error prefetching next batch:", error);
      }
    };

    prefetchNextBatch();
  }, [nextCursor, loadingMore, hasMore]);

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    if (!hasMore || isLoading || loadingMore) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0]?.isIntersecting && hasMore && nextCursor) {
          setLoadingMore(true);
          try {
            // Use prefetched data if available
            if (prefetchedData) {
              setTransactions((prev) => [
                ...prev,
                ...prefetchedData.transactions,
              ]);
              setHasMore(prefetchedData.hasMore);
              setNextCursor(prefetchedData.nextCursor);
              setPrefetchedData(null);
            } else {
              const res = await fetch(
                `/api/finance/transactions?cursor=${encodeURIComponent(nextCursor)}`,
              );
              const data = await res.json();
              setTransactions((prev) => [...prev, ...data.transactions]);
              setHasMore(data.hasMore);
              setNextCursor(data.nextCursor);
            }
          } catch (error) {
            console.error("Error loading more transactions:", error);
          } finally {
            setLoadingMore(false);
          }
        }
      },
      { threshold: 0.5 },
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      observer.disconnect();
    };
  }, [hasMore, isLoading, loadingMore, nextCursor, prefetchedData]);

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

      <section className="mx-auto mb-16 max-w-2xl">
        {/* Budget Statistics */}
        <h2 className="mb-6 text-xl font-semibold text-white">
          Monthly Budget
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {budgetStats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-start gap-2 rounded-2xl border border-[#232326] bg-[#18181B] p-5 shadow-sm"
            >
              <div
                className={`mb-2 flex items-center justify-center rounded-lg p-2 ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold text-white">
                {stat.label === "Total Budget" ||
                stat.label === "Total Spent" ||
                stat.label === "Remaining"
                  ? `$${stat.value.toLocaleString()}`
                  : stat.value}
              </div>
              <div className="text-xs font-medium tracking-wide text-[#B0B0B0] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        {/* Spending Timeline */}
        <h2 className="mb-6 text-xl font-semibold text-white">
          My Spending Timeline
        </h2>
        {isLoading ? (
          <ol className="relative border-l border-[#232326]">
            {[...Array(3)].map((_, i) => (
              <li key={i} className="mb-10 ml-4">
                <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-[#232326] bg-blue-500" />
                <div className="flex items-center justify-between pt-1">
                  <span className="shimmer h-4 w-24 rounded-lg" />
                  <span className="shimmer h-4 w-20 rounded-lg" />
                </div>
                <div className="shimmer mt-1 h-5 w-32 rounded-lg" />
                <div className="shimmer mt-1 h-4 w-48 rounded-lg" />
              </li>
            ))}
          </ol>
        ) : transactions.length === 0 ? (
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
          <>
            <ol className="relative border-l border-[#232326]">
              {transactions.map((item, idx) => (
                <li key={idx} className="mb-10 ml-4">
                  <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full border-2 border-[#232326] bg-blue-500" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[#88888C]">{item.date}</span>
                    <span
                      className={`text-sm font-semibold ${
                        item.amount < 0 ? "text-red-400" : "text-green-400"
                      }`}
                    >
                      {item.amount < 0 ? "-" : "+"}$
                      {Math.abs(item.amount).toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-1 text-base font-medium text-white">
                    {item.category}
                  </div>
                  <div className="text-sm text-[#B0B0B0]">
                    {item.description}
                  </div>
                </li>
              ))}
            </ol>
            {hasMore && (
              <div ref={observerTarget} className="mt-8 flex justify-center">
                {loadingMore && <div className="shimmer h-4 w-24 rounded-lg" />}
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}
