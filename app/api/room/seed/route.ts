import { NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { CreateOperations } from "@/lib/db/create";
import { RoomItem } from "@/types/room";
import { BaseDocument } from "@/lib/db/types";

const seedRoomItems: Omit<RoomItem, keyof BaseDocument>[] = [
  // Peripherals
  { name: "Razer Basilisk V3", category: "peripherals", order: 1 },
  {
    name: "Razer Mouse Pad Goliathus Extended Chroma",
    category: "peripherals",
    order: 2,
  },
  { name: "Razer Cynosa V2", category: "peripherals", order: 3 },
  { name: "Logitech Brio 100", category: "peripherals", order: 4 },
  {
    name: "Andersson Model ORH-C3000 Headset",
    category: "peripherals",
    order: 5,
  },

  // Computers
  { name: "Ideapad Pro 5 (AMD Ryzen 7)", category: "computers", order: 1 },
  { name: "Desire2 Laptop Stand", category: "computers", order: 2 },

  // Display
  {
    name: 'LG UltraGear 34GP63AP-B 34" 3440 x 1440 (UltraWide) HDMI 160Hz',
    category: "display",
    order: 1,
  },

  // Audio
  { name: "Jabra Elite Speaker", category: "audio", order: 1 },

  // Mobile
  { name: "iPhone 15", category: "mobile", order: 1 },
  { name: "Samsung Wireless Charger Trio", category: "mobile", order: 2 },

  // Gaming
  { name: "Nintendo Switch", category: "gaming", order: 1 },

  // Furniture
  { name: "Mittzon Skrivbord 160x80", category: "furniture", order: 1 },
  {
    name: "Snarum RBN 120x200 Medium Fast/Beige",
    category: "furniture",
    order: 2,
  },
  { name: "2x Aloe Vera Konstväxt, 17 cm", category: "furniture", order: 3 },

  // Wearables
  { name: "Fitbit Inspire 3", category: "wearables", order: 1 },
];

export async function POST(request: Request) {
  // Check for secret header
  const secret = request.headers.get("x-secret");
  if (secret !== process.env.SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<RoomItem>(db, "room_items");

    // Clear existing items
    await db.collection("room_items").deleteMany({});

    // Insert new items
    const result = await createOps.createMany(seedRoomItems);

    return NextResponse.json({
      message: "Room items seeded successfully",
      count: result.length,
    });
  } catch (error) {
    console.error("Error seeding room items:", error);
    return NextResponse.json(
      { error: "Failed to seed room items" },
      { status: 500 },
    );
  }
}
