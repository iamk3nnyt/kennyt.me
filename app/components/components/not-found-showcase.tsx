import { ComponentShowcase } from "@/components/component-showcase";

export function NotFoundShowcase() {
  return (
    <ComponentShowcase
      title="NotFound"
      description="A 404 page component for handling not found routes."
      demo={
        <div className="p-4">
          <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
            <div className="mb-4 text-4xl">🔍</div>
            <h3 className="mb-2 text-lg font-medium text-white">
              Page not found
            </h3>
            <p className="mb-4 text-sm text-[#B0B0B0]">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>
            <a
              href="/"
              className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
            >
              Go back home
            </a>
          </div>
        </div>
      }
      code={`import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
      <div className="mb-4 text-4xl">🔍</div>
      <h3 className="mb-2 text-lg font-medium text-white">Page not found</h3>
      <p className="mb-4 text-sm text-[#B0B0B0]">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
      >
        Go back home
      </Link>
    </div>
  );
}`}
    />
  );
}
