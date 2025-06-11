import { CreateOperations } from "@/lib/db/create";
import { BaseDocument } from "@/lib/db/types";
import client from "@/lib/mongodb";
import { Hero } from "@/types/gaming";
import { NextResponse } from "next/server";

const seedHeroes: Omit<Hero, keyof BaseDocument>[] = [
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

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<Hero>(db, "mlbb_heroes");

    // Clear existing heroes
    await db.collection("mlbb_heroes").deleteMany({});

    // Insert new heroes
    const result = await createOps.createMany(seedHeroes);

    return NextResponse.json({
      message: "Heroes seeded successfully",
      count: result.length,
    });
  } catch (error) {
    console.error("Error seeding heroes:", error);
    return NextResponse.json(
      { error: "Failed to seed heroes" },
      { status: 500 },
    );
  }
}
