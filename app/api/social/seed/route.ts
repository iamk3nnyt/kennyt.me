import { CreateOperations } from "@/lib/db/create";
import client from "@/lib/mongodb";
import { SocialLink } from "@/types/social";
import { NextResponse } from "next/server";

const seedSocialLinks: Omit<SocialLink, keyof SocialLink>[] = [
  {
    name: "GitHub",
    url: "https://github.com/iamk3nnyt",
    icon: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
    order: 1,
  },
  {
    name: "Twitter",
    url: "https://twitter.com/itsk3nny_",
    icon: "https://www.google.com/s2/favicons?domain=twitter.com&sz=64",
    order: 2,
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/itsk3nny",
    icon: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=64",
    order: 3,
  },
  {
    name: "Dribbble",
    url: "https://dribbble.com/itsk3nny",
    icon: "https://www.google.com/s2/favicons?domain=dribbble.com&sz=64",
    order: 4,
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@iamk3nnyt",
    icon: "https://www.google.com/s2/favicons?domain=youtube.com&sz=64",
    order: 5,
  },
  {
    name: "Indiehackers",
    url: "https://www.indiehackers.com/itsk3nny",
    icon: "https://www.google.com/s2/favicons?domain=indiehackers.com&sz=64",
    order: 6,
  },
  {
    name: "Upwork",
    url: "https://www.upwork.com/freelancers/~019a5657f93b409619",
    icon: "https://www.google.com/s2/favicons?domain=upwork.com&sz=64",
    order: 7,
  },
  {
    name: "Fiverr",
    url: "https://www.fiverr.com/ktra99",
    icon: "https://www.google.com/s2/favicons?domain=fiverr.com&sz=64",
    order: 8,
  },
  {
    name: "Hackernews",
    url: "https://news.ycombinator.com/user?id=itsk3nny",
    icon: "https://www.google.com/s2/favicons?domain=ycombinator.com&sz=64",
    order: 8,
  },
];

export async function POST() {
  try {
    const db = client.db("kennyt");
    const createOps = new CreateOperations<SocialLink>(db, "social_links");

    // Clear existing links
    await db.collection("social_links").deleteMany({});

    // Insert new links
    const result = await createOps.createMany(seedSocialLinks);

    return NextResponse.json({
      message: "Social links seeded successfully",
      count: result.length,
      links: result,
    });
  } catch (error) {
    console.error("Error seeding social links:", error);
    return NextResponse.json(
      { error: "Failed to seed social links" },
      { status: 500 },
    );
  }
}
