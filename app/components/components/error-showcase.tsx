"use client";

import { ComponentShowcase } from "@/components/component-showcase";

export function ErrorShowcase() {
  return (
    <ComponentShowcase
      title="Error"
      description="A reusable error component with retry functionality."
      demo={
        <div className="p-4">
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <h3 className="mb-2 text-lg font-medium text-white">
              Something went wrong
            </h3>
            <p className="mb-4 text-sm text-[#B0B0B0]">
              We encountered an error while loading this page. Please try again.
            </p>
            <button className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600">
              Try again
            </button>
          </div>
        </div>
      }
      code={`"use client";

import { useRouter } from "next/navigation";

export default function Error() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
      <div className="mb-4 text-4xl">⚠️</div>
      <h3 className="mb-2 text-lg font-medium text-white">
        Something went wrong
      </h3>
      <p className="mb-4 text-sm text-[#B0B0B0]">
        We encountered an error while loading this page. Please try again.
      </p>
      <button
        onClick={() => router.refresh()}
        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}`}
    />
  );
}
