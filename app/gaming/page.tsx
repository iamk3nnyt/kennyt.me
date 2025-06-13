import { AppImage } from "@/components/app-image";
import { getHeroes, getSeasonHistory } from "@/lib/data/gaming";
import { buildMetadata } from "@/lib/metadata";
import { Crown } from "lucide-react";
import type { Metadata } from "next";
import { Stats } from "./components";

export const metadata: Metadata = buildMetadata({
  type: "gaming",
  title: "Gaming - Kenny Tran",
  description:
    "Explore my gaming journey, achievements, and statistics. Track my progress across different games and seasons.",
  path: "/gaming",
  game: {
    name: "Overwatch 2",
    genre: "First-Person Shooter",
    publisher: "Blizzard Entertainment",
    url: "https://overwatch.blizzard.com",
  },
  image: {
    url: "/images/gaming/overwatch.jpg",
    width: 1200,
    height: 630,
    alt: "Gaming Stats - Kenny Tran",
  },
});

async function Heroes() {
  const heroes = await getHeroes();

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Main Heroes</h2>
      {heroes.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">⚔️</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Heroes Added
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My hero pool hasn&apos;t been added yet. I&apos;ll showcase my
            favorite heroes here, including their roles, specialties, and splash
            art.
          </p>
        </div>
      ) : (
        <div className="flex gap-8 overflow-x-auto p-0.5">
          {heroes.map((hero) => (
            <div
              key={hero.name}
              className="group relative h-[420px] max-w-xs min-w-[280px] flex-shrink-0 overflow-hidden rounded-2xl shadow-lg"
            >
              <AppImage
                src={hero.image}
                alt={`${hero.name} hero splash art`}
                className="absolute inset-0"
              />
              {/* Overlay */}
              <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
              {/* Content */}
              <div className="relative z-20 flex h-full flex-col justify-end p-6">
                <div className="mb-2">
                  <div className="text-2xl font-bold text-white drop-shadow-lg">
                    {hero.name}
                  </div>
                  <div className="text-xs font-medium tracking-wide text-blue-200 uppercase drop-shadow">
                    {hero.role} • {hero.specialty}
                  </div>
                </div>
              </div>
              {/* Card border effect */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-blue-500/30 transition-all ring-inset" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

async function History() {
  const seasons = await getSeasonHistory();

  return (
    <section className="mx-auto mb-16 max-w-2xl">
      <h2 className="mb-6 text-xl font-semibold text-white">Season History</h2>
      {seasons.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-[#232326] bg-[#18181B] p-8 text-center">
          <div className="mb-4 text-4xl">🏆</div>
          <h3 className="mb-2 text-lg font-medium text-white">
            No Season History
          </h3>
          <p className="text-sm text-[#B0B0B0]">
            My competitive journey hasn&apos;t begun. I&apos;ll track my rank
            progression and achievements here, from Epic to Mythic and beyond.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {seasons.map((season) => (
            <div
              key={season.period}
              className="group flex flex-col gap-4 rounded-xl border border-[#232326] bg-[#18181B] p-4 transition-colors hover:bg-[#1E1E21] sm:flex-row sm:items-center"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                <Crown className="h-5 w-5" />
              </div>
              <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col">
                  <div className="font-medium text-white">
                    {season.season} - {season.rank}
                  </div>
                  <div className="text-sm text-[#B0B0B0]">{season.hero}</div>
                </div>
                <div className="text-sm text-[#B0B0B0]">{season.period}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function GamingPage() {
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

      <Stats />
      <Heroes />
      <History />
    </main>
  );
}
