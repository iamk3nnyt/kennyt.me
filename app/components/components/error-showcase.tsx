import { ComponentShowcase } from "@/components/component-showcase";
import Link from "next/link";

export function ErrorShowcase() {
  return (
    <ComponentShowcase
      title="Error"
      description="A reusable error component with retry functionality and home navigation."
      demo={
        <div className="sm:p-4">
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <h3 className="mb-2 text-lg font-medium text-white">
              Error Details
            </h3>
            <p className="mb-6 text-sm text-[#B0B0B0]">
              An unexpected error occurred
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600">
                Try Again
              </button>
              <Link
                href="/"
                className="rounded-lg border border-[#232326] bg-[#18181B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#232326]"
              >
                Go back home
              </Link>
            </div>
          </div>
        </div>
      }
      code={`"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Something went wrong!
        </h2>
        <p className="mb-8 text-[#B0B0B0]">
          We apologize for the inconvenience. An error has occurred while
          processing your request. Please try again or contact support if the
          problem persists.
        </p>
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">⚠️</div>
          <h3 className="mb-2 text-lg font-medium text-white">Error Details</h3>
          <p className="mb-6 text-sm text-[#B0B0B0]">
            {error.message || "An unexpected error occurred"}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={reset}
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="rounded-lg border border-[#232326] bg-[#18181B] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#232326]"
            >
              Go back home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}`}
    />
  );
}
