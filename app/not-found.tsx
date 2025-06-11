import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Page Not Found
        </h2>
        <p className="mb-8 text-[#B0B0B0]">
          Sorry, the page you are looking for does not exist or has been moved.
          Please check the URL or return to the homepage.
        </p>
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">🔍</div>
          <h3 className="mb-2 text-lg font-medium text-white">404 Error</h3>
          <p className="mb-6 text-sm text-[#B0B0B0]">
            The requested page could not be found on this server.
          </p>
          <Link
            href="/"
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
          >
            Go back home
          </Link>
        </div>
      </section>
    </main>
  );
}
