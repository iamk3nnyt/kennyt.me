export default function WorkoutLoading() {
  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Workout Journey
        </h2>
        <p className="mb-8 text-[#B0B0B0]">
          Tracking my fitness journey through various activities, from strength
          training to cardio and flexibility work. Each session is a step
          towards better health and well-being.
        </p>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Activity Timeline
        </h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="shimmer h-8 w-8 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="shimmer h-6 w-32 rounded-lg" />
                  <div className="shimmer h-4 w-16 rounded-lg" />
                </div>
                <div className="shimmer h-4 w-full rounded-lg" />
                <div className="flex items-center gap-2">
                  <div className="shimmer h-4 w-16 rounded-lg" />
                  <div className="shimmer h-4 w-20 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
