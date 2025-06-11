"use client";

import type { SeasonHistory } from "@/app/api/gaming/seasons/route";
import { AppImage } from "@/components/app-image";
import { useAnimatedNumber } from "@/hooks/useAnimatedNumber";
import { Crown, Percent, Trophy, Users } from "lucide-react";
import { useEffect, useState } from "react";

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

const initialStats = [
  {
    label: "Matches",
    value: 0,
    icon: Users,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    label: "Win Rate",
    value: 0,
    icon: Percent,
    color: "bg-blue-500/10 text-blue-400",
  },
  {
    label: "MVP",
    value: 0,
    icon: Trophy,
    color: "bg-blue-500/10 text-blue-400",
  },
];

export default function GamingPage() {
  const [stats, setStats] = useState(initialStats);
  const [seasons, setSeasons] = useState<SeasonHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { current: animatedMatches } = useAnimatedNumber(stats[0].value);
  const { current: animatedWinRate } = useAnimatedNumber(
    stats[1].value,
    1000,
    true,
  );
  const { current: animatedMVP } = useAnimatedNumber(stats[2].value);

  useEffect(() => {
    // Trigger animation by updating values after component mount
    setStats([
      { ...stats[0], value: 3525 },
      { ...stats[1], value: 51.04 },
      { ...stats[2], value: 253 },
    ]);

    // Fetch season history
    const fetchSeasons = async () => {
      try {
        const response = await fetch("/api/gaming/seasons");
        if (!response.ok) {
          throw new Error("Failed to fetch season history");
        }
        const data = await response.json();
        setSeasons(data);
      } catch (error) {
        console.error("Error fetching season history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSeasons();
  }, [stats]);

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
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="flex flex-col items-start gap-2 rounded-2xl border border-[#232326] bg-[#18181B] p-5 shadow-sm"
            >
              <div
                className={`mb-2 flex items-center justify-center rounded-lg p-2 ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold text-white">
                {index === 0
                  ? animatedMatches
                  : index === 1
                    ? `${animatedWinRate}%`
                    : animatedMVP}
              </div>
              <div className="text-xs font-medium tracking-wide text-[#B0B0B0] uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">Main Heroes</h2>
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
      </section>

      <section className="mx-auto mb-16 max-w-2xl">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Season History
        </h2>
        {isLoading ? (
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
        ) : seasons.length === 0 ? (
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
    </main>
  );
}
