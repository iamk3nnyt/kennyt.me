export default function Loading() {
  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Writtings</h2>
        <p className="mb-8 text-[#B0B0B0]">
          Thoughts, tutorials, and stories on design, development, and the
          creative process. Here you&apos;ll find my latest articles and essays.
        </p>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Articles</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex gap-2 py-2">
              <div className="shimmer size-5 shrink-0 rounded" />
              <div className="shimmer h-5 w-full rounded" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
