import { AppImage } from "@/components/app-image";

const heroes = [
  {
    name: "Aurora",
    role: "Mage",
    specialty: "Crowd Control/Poke",
    image:
      "https://static.wikia.nocookie.net/mobile-legends/images/3/30/Hero361-portrait.png",
  },
  {
    name: "Paquito",
    role: "Fighter",
    specialty: "Chase/Damage",
    image:
      "https://static.wikia.nocookie.net/mobile-legends/images/a/a9/Hero1031-portrait.png",
  },
  {
    name: "Lolita",
    role: "Tank/Support",
    specialty: "Guard/Crowd Control",
    image:
      "https://static.wikia.nocookie.net/mobile-legends/images/2/20/Hero201-portrait.png",
  },
  {
    name: "Gusion",
    role: "Assassin",
    specialty: "Burst/Magic Damage",
    image:
      "https://static.wikia.nocookie.net/mobile-legends/images/a/a2/Hero561-portrait.png",
  },
  {
    name: "Matilda",
    role: "Support",
    specialty: "Initiator/Guard",
    image:
      "https://static.wikia.nocookie.net/mobile-legends/images/9/92/Hero1021-portrait.png",
  },
  {
    name: "Akai",
    role: "Tank",
    specialty: "Guard/Crowd Control",
    image:
      "https://static.wikia.nocookie.net/mobile-legends/images/9/9d/Hero091-portrait.png",
  },
];

export default function GamingLoading() {
  return (
    <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Gaming</h2>
        <p className="mb-8 text-[#B0B0B0]">
          My journey in Mobile Legends: Bang Bang, showcasing my progression
          through the ranks, favorite heroes, and key statistics. From strategic
          gameplay to team coordination, each season brings new challenges and
          achievements.
        </p>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">MLBB Stats</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-start gap-2 rounded-2xl border border-[#232326] bg-[#18181B] p-5 shadow-sm"
            >
              <div className="mb-2 h-9 w-9 rounded-lg bg-blue-500/10" />
              <div className="shimmer h-8 w-16 rounded-lg" />
              <div className="shimmer h-4 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Main Heroes</h2>
        <div className="flex gap-8 overflow-x-auto p-0.5">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="group relative h-[420px] max-w-xs min-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg"
            >
              {/* Shimmer background */}
              <div className="absolute inset-0 bg-[#18181B]" />
              {/* Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
              {/* Content */}
              <div className="relative z-20 flex h-full flex-col justify-end p-6">
                <div className="mb-2">
                  <div className="shimmer mb-2 h-8 w-32 rounded-lg" />
                  <div className="shimmer h-4 w-48 rounded-lg" />
                </div>
              </div>
              {/* Card border effect */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-blue-500/30 transition-all ring-inset" />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Season History
        </h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="group flex flex-col gap-4 rounded-xl border border-[#232326] bg-[#18181B] p-4 transition-colors hover:bg-[#1E1E21] sm:flex-row sm:items-center"
            >
              <div className="shimmer h-10 w-10 rounded-lg" />
              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-2">
                  <div className="shimmer h-5 w-32 rounded-lg" />
                  <div className="shimmer h-4 w-24 rounded-lg" />
                </div>
                <div className="shimmer h-4 w-24 rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
