// lib/data/room.ts
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { RoomItem } from "@/types/room";
import { Filter } from "mongodb";

// Read operations
export async function getRoomItems(filter: Filter<RoomItem> = {}) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<RoomItem>(db, "room_items");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      name: 1,
      category: 1,
      order: 1,
    },
    sort: { category: 1, order: 1 }, // Sort by category then order
  });
}

export async function getRoomItemById(id: string) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<RoomItem>(db, "room_items");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      name: 1,
      category: 1,
      order: 1,
    },
  });
}

// Create operations
export async function createRoomItem(data: Omit<RoomItem, keyof BaseDocument>) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<RoomItem>(db, "room_items");

  return createOps.createOne(data);
}

export async function createManyRoomItems(
  data: Array<Omit<RoomItem, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<RoomItem>(db, "room_items");

  return createOps.createMany(data);
}

// Update operations
export async function updateRoomItem(
  id: string,
  data: Partial<Omit<RoomItem, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const updateOps = new UpdateOperations<RoomItem>(db, "room_items");

  return updateOps.updateById(id, { $set: data });
}

// Delete operations
export async function deleteRoomItem(id: string) {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<RoomItem>(db, "room_items");

  return deleteOps.deleteById(id);
}

export async function deleteAllRoomItems() {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<RoomItem>(db, "room_items");

  return deleteOps.deleteMany({});
}

// Seed operation
export async function seedRoomItems() {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<RoomItem>(db, "room_items");
  const deleteOps = new DeleteOperations<RoomItem>(db, "room_items");

  const seed = [
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

  // Clear existing items
  await deleteOps.deleteMany({});

  // Insert new items
  return createOps.createMany(seed);
}

// Helper functions for common queries
export async function getRoomItemsByCategory(category: string) {
  return getRoomItems({ category });
}

export async function getRoomItemsByOrderRange(
  startOrder: number,
  endOrder: number,
) {
  return getRoomItems({
    order: {
      $gte: startOrder,
      $lte: endOrder,
    },
  });
}

export async function getRoomItemsByName(name: string) {
  return getRoomItems({
    name: { $regex: name, $options: "i" },
  });
}

export async function getRoomItemsByCategoryAndOrderRange(
  category: string,
  startOrder: number,
  endOrder: number,
) {
  return getRoomItems({
    category,
    order: {
      $gte: startOrder,
      $lte: endOrder,
    },
  });
}
