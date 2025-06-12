import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { Hero, MLBBStats, SeasonHistory } from "@/types/gaming";
import { Filter } from "mongodb";

// Hero operations
export async function getHeroes(filter: Filter<Hero> = {}) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Hero>(db, "heroes");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      name: 1,
      role: 1,
      specialty: 1,
      image: 1,
      order: 1,
    },
    sort: { order: 1 },
  });
}

export async function getHeroById(id: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<Hero>(db, "heroes");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      name: 1,
      role: 1,
      specialty: 1,
      image: 1,
      order: 1,
    },
  });
}

export async function createHero(data: Omit<Hero, keyof BaseDocument>) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Hero>(db, "heroes");

  return createOps.createOne(data);
}

export async function createManyHeroes(
  data: Array<Omit<Hero, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Hero>(db, "heroes");

  return createOps.createMany(data);
}

export async function updateHero(
  id: string,
  data: Partial<Omit<Hero, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const updateOps = new UpdateOperations<Hero>(db, "heroes");

  return updateOps.updateById(id, { $set: data });
}

export async function deleteHero(id: string) {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Hero>(db, "heroes");

  return deleteOps.deleteById(id);
}

export async function deleteAllHeroes() {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<Hero>(db, "heroes");

  return deleteOps.deleteMany({});
}

// Season History operations
export async function getSeasonHistory(filter: Filter<SeasonHistory> = {}) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<SeasonHistory>(db, "mlbb_seasons");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      period: 1,
      rank: 1,
      hero: 1,
      season: 1,
    },
    sort: { period: -1 },
  });
}

export async function getSeasonHistoryById(id: string) {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<SeasonHistory>(db, "mlbb_seasons");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      period: 1,
      rank: 1,
      hero: 1,
      season: 1,
    },
  });
}

export async function createSeasonHistory(
  data: Omit<SeasonHistory, keyof BaseDocument>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<SeasonHistory>(db, "mlbb_seasons");

  return createOps.createOne(data);
}

export async function createManySeasonHistory(
  data: Array<Omit<SeasonHistory, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<SeasonHistory>(db, "mlbb_seasons");

  return createOps.createMany(data);
}

export async function updateSeasonHistory(
  id: string,
  data: Partial<Omit<SeasonHistory, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const updateOps = new UpdateOperations<SeasonHistory>(db, "mlbb_seasons");

  return updateOps.updateById(id, { $set: data });
}

export async function deleteSeasonHistory(id: string) {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<SeasonHistory>(db, "mlbb_seasons");

  return deleteOps.deleteById(id);
}

export async function deleteAllSeasonHistory() {
  const db = client.db("kennyt");
  const deleteOps = new DeleteOperations<SeasonHistory>(db, "mlbb_seasons");

  return deleteOps.deleteMany({});
}

// MLBB Stats operations
export async function getMLBBStats() {
  const db = client.db("kennyt");
  const readOps = new ReadOperations<MLBBStats>(db, "mlbb_stats");

  return readOps.findOne(
    {},
    {
      projection: {
        _id: 0,
        matches: 1,
        winRate: 1,
        mvp: 1,
        lastUpdated: 1,
      },
    },
  );
}

export async function updateMLBBStats(
  data: Partial<Omit<MLBBStats, keyof BaseDocument>>,
) {
  const db = client.db("kennyt");
  const updateOps = new UpdateOperations<MLBBStats>(db, "mlbb_stats");

  // Update or create if doesn't exist
  const result = await updateOps.updateOne(
    {},
    { $set: { ...data, lastUpdated: new Date() } },
    { upsert: true },
  );

  return result;
}

// Helper functions
export async function getHeroesByRole(role: string) {
  return getHeroes({ role });
}

export async function getHeroesBySpecialty(specialty: string) {
  return getHeroes({ specialty });
}

export async function getSeasonHistoryByHero(hero: string) {
  return getSeasonHistory({ hero });
}

export async function getSeasonHistoryBySeason(season: string) {
  return getSeasonHistory({ season });
}

export async function getSeasonHistoryByRank(rank: string) {
  return getSeasonHistory({ rank });
}

// Seed operations
export async function seedHeroes() {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<Hero>(db, "heroes");
  const deleteOps = new DeleteOperations<Hero>(db, "heroes");

  const seed = [
    {
      name: "Aurora",
      role: "Mage",
      specialty: "Crowd Control/Poke",
      image:
        "https://static.wikia.nocookie.net/mobile-legends/images/3/30/Hero361-portrait.png",
      order: 1,
    },
    {
      name: "Paquito",
      role: "Fighter",
      specialty: "Chase/Damage",
      image:
        "https://static.wikia.nocookie.net/mobile-legends/images/a/a9/Hero1031-portrait.png",
      order: 2,
    },
    {
      name: "Lolita",
      role: "Tank/Support",
      specialty: "Guard/Crowd Control",
      image:
        "https://static.wikia.nocookie.net/mobile-legends/images/2/20/Hero201-portrait.png",
      order: 3,
    },
    {
      name: "Gusion",
      role: "Assassin",
      specialty: "Burst/Magic Damage",
      image:
        "https://static.wikia.nocookie.net/mobile-legends/images/a/a2/Hero561-portrait.png",
      order: 4,
    },
    {
      name: "Matilda",
      role: "Support",
      specialty: "Initiator/Guard",
      image:
        "https://static.wikia.nocookie.net/mobile-legends/images/9/92/Hero1021-portrait.png",
      order: 5,
    },
    {
      name: "Akai",
      role: "Tank",
      specialty: "Guard/Crowd Control",
      image:
        "https://static.wikia.nocookie.net/mobile-legends/images/9/9d/Hero091-portrait.png",
      order: 6,
    },
  ];

  // Clear existing heroes
  await deleteOps.deleteMany({});

  // Insert new heroes
  return createOps.createMany(seed);
}

export async function seedSeasonHistory() {
  const db = client.db("kennyt");
  const createOps = new CreateOperations<SeasonHistory>(db, "mlbb_seasons");
  const deleteOps = new DeleteOperations<SeasonHistory>(db, "mlbb_seasons");

  const seed = [
    {
      period: "2025/03 - 2025/06",
      rank: "Mythical Honor",
      hero: "Ling",
      season: "S36",
    },
    {
      period: "2024/12 - 2025/03",
      rank: "Legend III",
      hero: "Ling",
      season: "S35",
    },
    {
      period: "2024/09 - 2024/12",
      rank: "Mythic",
      hero: "Ling",
      season: "S34",
    },
    {
      period: "2024/06 - 2024/09",
      rank: "Mythical Glory",
      hero: "Natan",
      season: "S33",
    },
  ];

  // Clear existing season history
  await deleteOps.deleteMany({});

  // Insert new season history
  return createOps.createMany(seed);
}

export async function seedMLBBStats() {
  const db = client.db("kennyt");
  const updateOps = new UpdateOperations<MLBBStats>(db, "mlbb_stats");

  const seed = {
    matches: 3525,
    winRate: 51.04,
    mvp: 253,
    lastUpdated: new Date(),
  };

  // Update or create stats
  return updateOps.updateOne({}, { $set: seed }, { upsert: true });
}
