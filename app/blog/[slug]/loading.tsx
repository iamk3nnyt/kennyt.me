export default function ArticleLoading() {
  return (
    <main className="bg-[#111113] px-4 py-16 text-[#F3F3F3]">
      <article className="mx-auto max-w-2xl">
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
      </article>
    </main>
  );
}
