import { ComponentShowcase } from "@/components/component-showcase";
import { Crown } from "lucide-react";

export function GamingHistoryShowcase() {
  const seasons = [
    {
      season: "Season 28",
      rank: "Mythic",
      hero: "Layla",
      period: "Jan 2024",
    },
    {
      season: "Season 27",
      rank: "Legend",
      hero: "Franco",
      period: "Dec 2023",
    },
    {
      season: "Season 26",
      rank: "Epic",
      hero: "Eudora",
      period: "Nov 2023",
    },
  ];

  return (
    <ComponentShowcase
      title="Gaming History"
      description="A chronological display of my competitive journey in Mobile Legends: Bang Bang, showing rank progression and main heroes for each season."
      demo={
        <div className="sm:p-4">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Season History
          </h2>
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
        </div>
      }
      code={`import { Crown } from "lucide-react";
import { getSeasonHistory } from "@/lib/data/gaming";

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
}`}
    />
  );
}
