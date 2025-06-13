export default function ArticleLoading() {
  return (
    <main className="bg-[#111113] px-4 py-16 text-[#F3F3F3]">
      <article className="mx-auto max-w-2xl">
        {/* Featured Image shimmer */}
        <div className="relative mb-8 h-[400px] w-full overflow-hidden rounded-xl">
          <div className="shimmer h-full w-full" />
        </div>

        {/* Title shimmer */}
        <div className="mb-2">
          <div className="shimmer h-10 w-3/4 rounded-lg" />
        </div>

        {/* Date shimmer */}
        <div className="mb-8">
          <div className="shimmer h-4 w-32 rounded-lg" />
        </div>

        {/* Content shimmer */}
        <div className="space-y-6">
          {/* First paragraph */}
          <div className="space-y-2">
            <div className="shimmer h-4 w-full rounded-lg" />
            <div className="shimmer h-4 w-5/6 rounded-lg" />
            <div className="shimmer h-4 w-4/6 rounded-lg" />
          </div>

          {/* Heading */}
          <div className="shimmer h-8 w-1/3 rounded-lg" />

          {/* Second paragraph */}
          <div className="space-y-2">
            <div className="shimmer h-4 w-full rounded-lg" />
            <div className="shimmer h-4 w-5/6 rounded-lg" />
            <div className="shimmer h-4 w-4/6 rounded-lg" />
          </div>

          {/* List */}
          <div className="space-y-2">
            <div className="shimmer h-4 w-3/4 rounded-lg" />
            <div className="shimmer h-4 w-2/3 rounded-lg" />
            <div className="shimmer h-4 w-1/2 rounded-lg" />
          </div>

          {/* Final paragraph */}
          <div className="space-y-2">
            <div className="shimmer h-4 w-full rounded-lg" />
            <div className="shimmer h-4 w-3/4 rounded-lg" />
          </div>
        </div>

        {/* Related Articles shimmer */}
        <div className="mt-16 border-t border-[#232326] pt-8">
          <div className="mb-6">
            <div className="shimmer h-8 w-48 rounded-lg" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="relative h-56 w-full overflow-hidden rounded-lg">
                  <div className="shimmer h-full w-full" />
                </div>
                <div className="shimmer h-4 w-24 rounded-full" />
                <div className="shimmer h-6 w-3/4 rounded-lg" />
                <div className="space-y-2">
                  <div className="shimmer h-4 w-full rounded-lg" />
                  <div className="shimmer h-4 w-5/6 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Author Bio shimmer */}
        <div className="mt-16 border-t border-[#232326] pt-8">
          <div className="flex items-start gap-4">
            <div className="shimmer size-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="shimmer h-6 w-32 rounded-lg" />
              <div className="shimmer h-4 w-full rounded-lg" />
              <div className="shimmer h-4 w-3/4 rounded-lg" />
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
