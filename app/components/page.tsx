import { buildMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { BookmarksShowcase } from "./components/bookmarks-showcase";
import { ConnectShowcase } from "./components/connect-showcase";
import { ErrorShowcase } from "./components/error-showcase";
import { FeaturedShowcase } from "./components/featured-showcase";
import { FinanceCategoriesShowcase } from "./components/finance-categories-showcase";
import { FinanceStatsShowcase } from "./components/finance-stats-showcase";
import { FinanceTimelineShowcase } from "./components/finance-timeline-showcase";
import { GalleryShowcase } from "./components/gallery-showcase";
import { GamingHeroesShowcase } from "./components/gaming-heroes-showcase";
import { GamingHistoryShowcase } from "./components/gaming-history-showcase";
import { GamingStatsShowcase } from "./components/gaming-stats-showcase";
import { NotFoundShowcase } from "./components/not-found-showcase";
import { RoomShowcase } from "./components/room-showcase";
import { TechstackShowcase } from "./components/techstack-showcase";
import { TimelineShowcase } from "./components/timeline-showcase";
import { WorkoutTimelineShowcase } from "./components/workout-timeline-showcase";

export const metadata: Metadata = buildMetadata({
  type: "component",
  title: "Components - Kenny Tran",
  description:
    "Explore my collection of reusable UI components, from navigation bars to data visualizations. Each component is designed with performance and accessibility in mind.",
  path: "/components",
  image: {
    url: "/images/components/dashboard.jpg",
    width: 1200,
    height: 630,
    alt: "UI Components - Kenny Tran",
  },
});

export default function ComponentsPage() {
  return (
    <>
      <main className="bg-[#111113] px-4 pt-16 text-[#F3F3F3]">
        <section className="mx-auto mb-16 max-w-2xl">
          <h1 className="mb-6 text-xl font-semibold text-white">
            Component Library
          </h1>
          <p className="mb-8 text-[#B0B0B0]">
            A collection of reusable components used throughout kennyt.me. Each
            component is designed to be modular, accessible, and follows our
            design system. Feel free to explore, test, and copy the code for
            your own projects.
          </p>
        </section>

        <section className="mx-auto mb-16 max-w-2xl">
          <h2 className="mb-6 text-xl font-semibold text-white">
            UI Components
          </h2>
          <div className="flex flex-col gap-y-6">
            <GalleryShowcase />
            <TimelineShowcase />
            <FeaturedShowcase />
            <TechstackShowcase />
            <ConnectShowcase />
            <BookmarksShowcase />
            <RoomShowcase />
            <FinanceStatsShowcase />
            <FinanceCategoriesShowcase />
            <FinanceTimelineShowcase />
            <WorkoutTimelineShowcase />
            <GamingStatsShowcase />
            <GamingHeroesShowcase />
            <GamingHistoryShowcase />
            <ErrorShowcase />
            <NotFoundShowcase />
          </div>
        </section>
      </main>
    </>
  );
}
