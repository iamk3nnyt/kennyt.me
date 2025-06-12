// lib/data/social.ts
import { CreateOperations } from "@/lib/db/create";
import { DeleteOperations } from "@/lib/db/delete";
import { ReadOperations } from "@/lib/db/read";
import { BaseDocument } from "@/lib/db/types";
import { UpdateOperations } from "@/lib/db/update";
import client from "@/lib/mongodb";
import { SocialLink } from "@/types/social";
import { Filter } from "mongodb";

// Read operations
export async function getSocialLinks(filter: Filter<SocialLink> = {}) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<SocialLink>(db, "social_links");

  return readOps.findMany(filter, {
    projection: {
      _id: 0,
      name: 1,
      url: 1,
      icon: 1,
      order: 1,
      isActive: 1,
    },
    sort: { order: 1 }, // Sort by order field
  });
}

export async function getSocialLinkById(id: string) {
  const db = client.db(process.env.DB);
  const readOps = new ReadOperations<SocialLink>(db, "social_links");

  return readOps.findById(id, {
    projection: {
      _id: 0,
      name: 1,
      url: 1,
      icon: 1,
      order: 1,
      isActive: 1,
    },
  });
}

// Create operations
export async function createSocialLink(
  data: Omit<SocialLink, keyof BaseDocument>,
) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<SocialLink>(db, "social_links");

  return createOps.createOne(data);
}

export async function createManySocialLinks(
  data: Array<Omit<SocialLink, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<SocialLink>(db, "social_links");

  return createOps.createMany(data);
}

// Update operations
export async function updateSocialLink(
  id: string,
  data: Partial<Omit<SocialLink, keyof BaseDocument>>,
) {
  const db = client.db(process.env.DB);
  const updateOps = new UpdateOperations<SocialLink>(db, "social_links");

  return updateOps.updateById(id, { $set: data });
}

// Delete operations
export async function deleteSocialLink(id: string) {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<SocialLink>(db, "social_links");

  return deleteOps.deleteById(id);
}

export async function deleteAllSocialLinks() {
  const db = client.db(process.env.DB);
  const deleteOps = new DeleteOperations<SocialLink>(db, "social_links");

  return deleteOps.deleteMany({});
}

// Seed operation
export async function seedSocialLinks() {
  const db = client.db(process.env.DB);
  const createOps = new CreateOperations<SocialLink>(db, "social_links");
  const deleteOps = new DeleteOperations<SocialLink>(db, "social_links");

  const seed = [
    {
      name: "GitHub",
      url: "https://github.com/iamk3nnyt",
      icon: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
      order: 1,
      isActive: true,
    },
    {
      name: "Twitter",
      url: "https://twitter.com/itsk3nny_",
      icon: "https://www.google.com/s2/favicons?domain=twitter.com&sz=64",
      order: 2,
      isActive: true,
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/itsk3nny",
      icon: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
      order: 3,
      isActive: true,
    },
    {
      name: "Dribbble",
      url: "https://dribbble.com/itsk3nny",
      icon: "https://www.google.com/s2/favicons?domain=dribbble.com&sz=64",
      order: 4,
      isActive: true,
    },
    {
      name: "YouTube",
      url: "https://youtube.com/@iamk3nnyt",
      icon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
      order: 5,
      isActive: true,
    },
    {
      name: "Indiehackers",
      url: "https://www.indiehackers.com/itsk3nny",
      icon: "https://www.google.com/s2/favicons?domain=indiehackers.com&sz=64",
      order: 6,
      isActive: true,
    },
    {
      name: "Upwork",
      url: "https://www.upwork.com/freelancers/~019a5657f93b409619",
      icon: "https://www.google.com/s2/favicons?domain=upwork.com&sz=64",
      order: 7,
      isActive: true,
    },
    {
      name: "Fiverr",
      url: "https://www.fiverr.com/ktra99",
      icon: "https://www.google.com/s2/favicons?domain=fiverr.com&sz=64",
      order: 8,
      isActive: true,
    },
    {
      name: "Hackernews",
      url: "https://news.ycombinator.com/user?id=itsk3nny",
      icon: "https://www.google.com/s2/favicons?domain=ycombinator.com&sz=64",
      order: 9,
      isActive: true,
    },
  ];

  // Clear existing links
  await deleteOps.deleteMany({});

  // Insert new links
  return createOps.createMany(seed);
}

// Helper functions for common queries
export async function getActiveSocialLinks() {
  return getSocialLinks({ isActive: true });
}

export async function getSocialLinkByName(name: string) {
  return getSocialLinks({ name });
}

export async function getSocialLinkByDomain(domain: string) {
  return getSocialLinks({
    url: { $regex: domain, $options: "i" },
  });
}

export async function getSocialLinksByOrderRange(
  startOrder: number,
  endOrder: number,
) {
  return getSocialLinks({
    order: {
      $gte: startOrder,
      $lte: endOrder,
    },
  });
}
