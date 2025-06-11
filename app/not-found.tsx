import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center bg-[#111113] px-4 py-24 text-[#F3F3F3]">
      <div className="text-center">
        <div className="mb-4 text-6xl font-bold text-blue-500">404</div>
        <h1 className="mb-2 text-2xl font-semibold text-white">
          Page Not Found
        </h1>
        <p className="mb-6 text-[#B0B0B0]">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="rounded bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-400"
        >
          Go back home
        </Link>
      </div>
    </main>
  );
}
